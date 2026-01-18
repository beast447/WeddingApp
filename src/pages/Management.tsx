import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { db, auth } from '../lib/firebase'
import ProtectedRoute from '../components/ProtectedRoute'

interface RSVP {
  id: string
  name: string
  email: string
  attending: boolean
  allergies: string
  questions: string
  submittedAt: Timestamp | null
}

function ManagementDashboard() {
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'attending' | 'not-attending'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchRSVPs()
  }, [])

  const fetchRSVPs = async () => {
    try {
      const rsvpQuery = query(
        collection(db, 'rsvps'),
        orderBy('submittedAt', 'desc')
      )
      const snapshot = await getDocs(rsvpQuery)
      const rsvpData: RSVP[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as RSVP[]
      setRsvps(rsvpData)
    } catch (error) {
      console.error('Error fetching RSVPs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
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

  const stats = {
    total: rsvps.length,
    attending: rsvps.filter((r) => r.attending).length,
    notAttending: rsvps.filter((r) => !r.attending).length,
  }

  const formatDate = (timestamp: Timestamp | null) => {
    if (!timestamp) return 'N/A'
    return timestamp.toDate().toLocaleDateString('en-US', {
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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
                    <th className="text-left px-6 py-4 text-sm font-semibold text-sage-700">
                      Guest
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-sage-700">
                      Status
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-sage-700">
                      Allergies
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-sage-700">
                      Questions
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-sage-700">
                      Submitted
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-100">
                  {filteredRSVPs.map((rsvp) => (
                    <tr
                      key={rsvp.id}
                      className="hover:bg-sage-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-sage-800">{rsvp.name}</p>
                          <p className="text-sm text-sage-500">{rsvp.email}</p>
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
            onClick={fetchRSVPs}
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
