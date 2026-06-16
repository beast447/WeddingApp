import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchRSVPs, deleteRSVP, logout, RSVP } from '../lib/api'
import ProtectedRoute from '../components/ProtectedRoute'

type SortKey = 'name' | 'attending' | 'submittedAt'

const BEERS_PER_GUEST = 2
const AVG_BEER_PRICE = 1.1

function ManagementDashboard() {
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'attending' | 'not-attending'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('submittedAt')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const navigate = useNavigate()

  useEffect(() => {
    loadRSVPs()
  }, [])

  const loadRSVPs = async () => {
    try {
      const data = await fetchRSVPs()
      setRsvps(data)
    } catch (error) {
      console.error('Error fetching RSVPs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/admin')
  }

  const handleDelete = async (rsvp: RSVP) => {
    if (
      !window.confirm(
        `Delete ${rsvp.name}'s RSVP? This cannot be undone.`
      )
    )
      return
    try {
      await deleteRSVP(rsvp.id)
      setRsvps((prev) => prev.filter((r) => r.id !== rsvp.id))
    } catch (error) {
      console.error('Error deleting RSVP:', error)
      alert('Failed to delete RSVP. Please try again.')
    }
  }

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const filteredRSVPs = rsvps.filter((rsvp) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'attending' && rsvp.attending) ||
      (filter === 'not-attending' && !rsvp.attending)

    const matchesSearch =
      searchTerm === '' ||
      rsvp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rsvp.email.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const sortedRSVPs = [...filteredRSVPs].sort((a, b) => {
    let cmp = 0
    if (sortKey === 'name') {
      cmp = a.name.localeCompare(b.name)
    } else if (sortKey === 'attending') {
      cmp = Number(a.attending) - Number(b.attending)
    } else {
      cmp =
        new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
    }
    return sortDir === 'asc' ? cmp : -cmp
  })

  const emailGuests = () => {
    const emails = sortedRSVPs.map((r) => r.email).filter(Boolean)
    if (emails.length === 0) return
    window.location.href = `mailto:?bcc=${encodeURIComponent(emails.join(','))}`
  }

  const stats = {
    total: rsvps.length,
    attending: rsvps.filter((r) => r.attending).length,
    notAttending: rsvps.filter((r) => !r.attending).length,
    drinkers: rsvps.filter((r) => r.attending && r.drinker).length,
    attendingHeadcount: rsvps
      .filter((r) => r.attending)
      .reduce((sum, r) => sum + 1 + r.guests.length, 0),
  }

  const estimatedBeers = stats.drinkers * BEERS_PER_GUEST
  const estimatedAlcoholCost = estimatedBeers * AVG_BEER_PRICE

  const formatDate = (timestamp: string | null) => {
    if (!timestamp) return 'N/A'
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-sage-50 to-cream-100 px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-sage-800">
              RSVP Management
            </h1>
            <p className="text-sage-600 mt-1">
              View and manage your guest responses
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-sage-200 rounded-lg text-sage-700 hover:bg-sage-50 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-sage-200/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-sage-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sage-500 text-sm">Total Responses</p>
                <p className="font-serif text-3xl text-sage-800">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-sage-200/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sage-500 text-sm">Attending</p>
                <p className="font-serif text-3xl text-green-700">
                  {stats.attending}
                </p>
                <p className="text-sage-500 text-xs mt-0.5">
                  {stats.attendingHeadcount} total guests
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-sage-200/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-rose-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sage-500 text-sm">Not Attending</p>
                <p className="font-serif text-3xl text-rose-700">
                  {stats.notAttending}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-sage-200/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 21h8m-4-4v4m-5-9a5 5 0 0010 0V4H7v8zm10-4h2a2 2 0 010 4h-2"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sage-500 text-sm">Drinkers (attending)</p>
                <p className="font-serif text-3xl text-amber-700">
                  {stats.drinkers}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Estimated bar cost */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl shadow-lg p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="text-amber-700 text-sm font-medium">
              Estimated Bar Cost
            </p>
            <p className="text-amber-600/80 text-sm">
              {stats.drinkers} drinking guest{stats.drinkers === 1 ? '' : 's'} ×{' '}
              {BEERS_PER_GUEST} beers × ${AVG_BEER_PRICE.toFixed(2)} ={' '}
              {estimatedBeers} beers
            </p>
          </div>
          <p className="font-serif text-4xl text-amber-700">
            ${estimatedAlcoholCost.toFixed(2)}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-sage-200/50 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-cream-50 border border-sage-200 rounded-lg text-sage-800 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'All' },
                { value: 'attending', label: 'Attending' },
                { value: 'not-attending', label: 'Not Attending' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() =>
                    setFilter(option.value as 'all' | 'attending' | 'not-attending')
                  }
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    filter === option.value
                      ? 'bg-sage-600 text-white'
                      : 'bg-cream-50 text-sage-700 hover:bg-sage-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Email guests */}
            <button
              onClick={emailGuests}
              disabled={sortedRSVPs.length === 0}
              title="Opens your email client with these guests in BCC"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm bg-sage-600 text-white hover:bg-sage-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>Email {sortedRSVPs.length}</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-sage-200/50 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-sage-200 border-t-sage-600 rounded-full animate-spin" />
                <p className="text-sage-600 font-medium">Loading RSVPs...</p>
              </div>
            </div>
          ) : filteredRSVPs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-sage-500">
              <svg
                className="w-16 h-16 mb-4 text-sage-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-lg font-medium">No RSVPs found</p>
              <p className="text-sm">
                {searchTerm
                  ? 'Try adjusting your search terms'
                  : 'RSVPs will appear here once guests respond'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-sage-50 border-b border-sage-200">
                  <tr>
                    <th
                      onClick={() => toggleSort('name')}
                      className="text-left px-6 py-4 text-sm font-semibold text-sage-700 cursor-pointer select-none hover:text-sage-900"
                    >
                      Guest{sortKey === 'name' ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ''}
                    </th>
                    <th
                      onClick={() => toggleSort('attending')}
                      className="text-left px-6 py-4 text-sm font-semibold text-sage-700 cursor-pointer select-none hover:text-sage-900"
                    >
                      Status{sortKey === 'attending' ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ''}
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-sage-700">
                      Drinker
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-sage-700">
                      Allergies
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-sage-700">
                      Questions
                    </th>
                    <th
                      onClick={() => toggleSort('submittedAt')}
                      className="text-left px-6 py-4 text-sm font-semibold text-sage-700 cursor-pointer select-none hover:text-sage-900"
                    >
                      Submitted{sortKey === 'submittedAt' ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ''}
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-sage-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-100">
                  {sortedRSVPs.map((rsvp) => (
                    <tr
                      key={rsvp.id}
                      className="hover:bg-sage-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sage-800">
                              {rsvp.name}
                            </p>
                            {rsvp.guests.length > 0 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-sage-100 text-sage-700">
                                Party of {rsvp.guests.length + 1}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-sage-500">{rsvp.email}</p>
                          {rsvp.guests.length > 0 && (
                            <ul className="mt-2 space-y-1 border-l-2 border-sage-200 pl-3">
                              {rsvp.guests.map((g) => (
                                <li
                                  key={g.id}
                                  className="flex items-center gap-2 text-sm text-sage-600"
                                >
                                  <span>{g.name}</span>
                                  <span
                                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                                      g.isChild
                                        ? 'bg-amber-100 text-amber-700'
                                        : 'bg-sage-100 text-sage-600'
                                    }`}
                                  >
                                    {g.isChild ? 'Child' : 'Adult'}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                            rsvp.attending
                              ? 'bg-green-100 text-green-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              rsvp.attending ? 'bg-green-500' : 'bg-rose-500'
                            }`}
                          />
                          {rsvp.attending ? 'Attending' : 'Not Attending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sage-600 text-sm">
                          {rsvp.drinker ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sage-600 text-sm max-w-xs truncate">
                          {rsvp.allergies || '—'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sage-600 text-sm max-w-xs truncate">
                          {rsvp.questions || '—'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sage-500 text-sm">
                          {formatDate(rsvp.submittedAt)}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(rsvp)}
                          title="Delete RSVP"
                          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sage-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Refresh button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={loadRSVPs}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sage-600 hover:text-sage-800 transition-colors"
          >
            <svg
              className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Management() {
  return (
    <ProtectedRoute>
      <ManagementDashboard />
    </ProtectedRoute>
  )
}
