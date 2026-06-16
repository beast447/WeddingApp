import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { submitRSVP, GuestInput } from '../lib/api'

interface FormData {
  name: string
  email: string
  attending: boolean
  allergies: string
  drinker: boolean
  questions: string
}

export default function RSVPForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    attending: false,
    allergies: '',
    drinker: true,
    questions: '',
  })
  const [additionalGuests, setAdditionalGuests] = useState<GuestInput[]>([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string
    email?: string
    guests?: string
  }>({})

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const validate = (): boolean => {
    const next: { name?: string; email?: string; guests?: string } = {}
    if (!formData.name.trim()) {
      next.name = 'Please enter your full name.'
    }
    const email = formData.email.trim()
    if (!email) {
      next.email = 'Please enter your email address.'
    } else if (!emailPattern.test(email)) {
      next.email = 'Please enter a valid email address.'
    }
    if (formData.attending && additionalGuests.some((g) => !g.name.trim())) {
      next.guests = 'Please enter a name for each guest, or remove the empty rows.'
    }
    setFieldErrors(next)
    return Object.keys(next).length === 0
  }

  const addGuest = () =>
    setAdditionalGuests((prev) => [
      ...prev,
      { name: '', isChild: false, drinker: false },
    ])

  const updateGuest = (index: number, patch: Partial<GuestInput>) =>
    setAdditionalGuests((prev) =>
      prev.map((g, i) => (i === index ? { ...g, ...patch } : g))
    )

  const removeGuest = (index: number) =>
    setAdditionalGuests((prev) => prev.filter((_, i) => i !== index))

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    let finalValue: string | boolean = value
    if (value === "yes") finalValue = true
    if (value === "no") finalValue = false

    setFormData((prev) => ({ ...prev, [name]: finalValue }))
    if (name === 'name' || name === 'email') {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!validate()) return
    setLoading(true)

    try {
      await submitRSVP({
        name: formData.name.trim(),
        email: formData.email.trim(),
        attending: formData.attending == true,
        allergies: formData.allergies.trim(),
        drinker: formData.drinker,
        questions: formData.questions.trim(),
        additionalGuests: formData.attending
          ? additionalGuests
              .map((g) => ({ ...g, name: g.name.trim() }))
              .filter((g) => g.name !== '')
          : [],
      })
      setSubmitted(true)
    } catch (err) {
      console.error('Error submitting RSVP:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'There was an error submitting your RSVP. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-sage-50 to-cream-100 dark:from-night-900 dark:via-night-800 dark:to-night-900 px-4 pt-20">
        <div className="max-w-md w-full text-center">
          <div className="relative overflow-hidden bg-white/80 dark:bg-night-800/80 backdrop-blur-sm rounded-3xl shadow-xl ring-1 ring-sage-200/60 dark:ring-white/10 p-8 animate-fade-in-up">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
            {/* Success Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-sage-100 to-sage-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <svg
                className="w-10 h-10 text-sage-600"
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

            <p className="font-script text-3xl text-gold-gradient mb-0">
              merci
            </p>
            <h2 className="font-serif text-3xl text-sage-800 dark:text-cream-100 mb-4">
              Thank You!
            </h2>
            <p className="text-sage-600 dark:text-sage-300 mb-6">
              {formData.attending === true
                ? "We're so excited you'll be joining us! We can't wait to celebrate with you."
                : "We're sorry you can't make it, but we appreciate you letting us know."}
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sage-700 dark:text-sage-300 hover:text-sage-900 dark:hover:text-cream-100 font-medium transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-sage-50 to-cream-100 dark:from-night-900 dark:via-night-800 dark:to-night-900 px-4 py-24">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <p className="font-script text-4xl text-gold-gradient mb-1">
            We hope you can join us
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-sage-800 dark:text-cream-100 mb-3 tracking-wide">
            RSVP
          </h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="rule-gold" />
            <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div className="rule-gold-rev" />
          </div>
          <p className="text-sage-600 dark:text-sage-300 max-w-md mx-auto">
            Please fill out the form below to let us know if you'll be celebrating with us.
          </p>
        </div>

        {/* Form Card */}
        <div className="relative overflow-hidden bg-white/80 dark:bg-night-800/80 backdrop-blur-sm rounded-3xl shadow-xl ring-1 ring-sage-200/60 dark:ring-white/10 p-6 sm:p-8 animate-fade-in-up animation-delay-200">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-sage-700 dark:text-sage-300 mb-2"
              >
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={120}
                aria-invalid={!!fieldErrors.name}
                className={`w-full px-4 py-3 bg-cream-50 dark:bg-night-700 border rounded-lg text-sage-800 dark:text-cream-100 placeholder-sage-400 dark:placeholder-sage-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  fieldErrors.name
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-sage-200 dark:border-night-600 focus:ring-sage-400'
                }`}
                placeholder="Enter your full name"
              />
              {fieldErrors.name && (
                <p className="text-rose-600 dark:text-rose-400 text-sm mt-1.5">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-sage-700 dark:text-sage-300 mb-2"
              >
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={254}
                aria-invalid={!!fieldErrors.email}
                className={`w-full px-4 py-3 bg-cream-50 dark:bg-night-700 border rounded-lg text-sage-800 dark:text-cream-100 placeholder-sage-400 dark:placeholder-sage-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  fieldErrors.email
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-sage-200 dark:border-night-600 focus:ring-sage-400'
                }`}
                placeholder="Enter your email address"
              />
              {fieldErrors.email && (
                <p className="text-rose-600 dark:text-rose-400 text-sm mt-1.5">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Attending Radio Buttons */}
            <div>
              <label className="block text-sm font-medium text-sage-700 dark:text-sage-300 mb-3">
                Will you be attending? <span className="text-rose-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={formData.attending === true}
                      onChange={handleChange}
                      required
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-sage-300 rounded-full peer-checked:border-sage-600 transition-colors" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-sage-600 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className="text-sage-700 dark:text-sage-300 group-hover:text-sage-800 dark:group-hover:text-cream-100 transition-colors">
                    Joyfully Accept
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={formData.attending === false}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-sage-300 rounded-full peer-checked:border-sage-600 transition-colors" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-sage-600 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className="text-sage-700 dark:text-sage-300 group-hover:text-sage-800 dark:group-hover:text-cream-100 transition-colors">
                    Regretfully Decline
                  </span>
                </label>
              </div>
            </div>

            {/* Drinker Radio Buttons */}
            <div>
              <label className="block text-sm font-medium text-sage-700 dark:text-sage-300 mb-3">
                Will you be drinking alcohol? <span className="text-rose-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="drinker"
                      value="yes"
                      checked={formData.drinker === true}
                      onChange={handleChange}
                      required
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-sage-300 rounded-full peer-checked:border-sage-600 transition-colors" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-sage-600 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className="text-sage-700 dark:text-sage-300 group-hover:text-sage-800 dark:group-hover:text-cream-100 transition-colors">
                    Yes
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="drinker"
                      value="no"
                      checked={formData.drinker === false}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-sage-300 rounded-full peer-checked:border-sage-600 transition-colors" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-sage-600 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className="text-sage-700 dark:text-sage-300 group-hover:text-sage-800 dark:group-hover:text-cream-100 transition-colors">
                    No
                  </span>
                </label>
              </div>
            </div>

            {/* Additional Guests */}
            {formData.attending && (
              <div>
                <label className="block text-sm font-medium text-sage-700 dark:text-sage-300 mb-2">
                  Additional Guests
                </label>
                <p className="text-sage-500 dark:text-sage-400 text-sm mb-3">
                  Add anyone joining you. Children are welcome. Plus-ones are
                  approved case-by-case — we’ll confirm by July 7th to the email
                  you provided above.
                </p>

                {additionalGuests.length > 0 && (
                  <div className="space-y-3 mb-3">
                    {additionalGuests.map((guest, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row gap-2 sm:items-center"
                      >
                        <input
                          type="text"
                          value={guest.name}
                          maxLength={120}
                          onChange={(e) => {
                            updateGuest(index, { name: e.target.value })
                            setFieldErrors((prev) => ({ ...prev, guests: undefined }))
                          }}
                          className="flex-1 px-4 py-2 bg-cream-50 dark:bg-night-700 border border-sage-200 dark:border-night-600 rounded-lg text-sage-800 dark:text-cream-100 placeholder-sage-400 dark:placeholder-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all"
                          placeholder={`Guest ${index + 1} full name`}
                        />
                        <div className="flex gap-1 bg-cream-50 dark:bg-night-700 border border-sage-200 dark:border-night-600 rounded-lg p-1">
                          <button
                            type="button"
                            onClick={() => updateGuest(index, { isChild: false })}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                              !guest.isChild
                                ? 'bg-sage-600 text-white'
                                : 'text-sage-600 dark:text-sage-300 hover:bg-sage-100 dark:hover:bg-night-600'
                            }`}
                          >
                            Adult
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              updateGuest(index, {
                                isChild: true,
                                drinker: false,
                              })
                            }
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                              guest.isChild
                                ? 'bg-sage-600 text-white'
                                : 'text-sage-600 dark:text-sage-300 hover:bg-sage-100 dark:hover:bg-night-600'
                            }`}
                          >
                            Child
                          </button>
                        </div>
                        {!guest.isChild && (
                          <div className="flex items-center gap-2 sm:ml-1">
                            <span className="text-sm font-semibold text-sage-800 dark:text-cream-100">
                              Is this guest going to want to drink?
                            </span>
                            <div className="flex gap-1 bg-cream-50 dark:bg-night-700 border border-sage-200 dark:border-night-600 rounded-lg p-1">
                              <button
                                type="button"
                                onClick={() =>
                                  updateGuest(index, { drinker: true })
                                }
                                className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                  guest.drinker
                                    ? 'bg-amber-500 text-white'
                                    : 'text-sage-600 dark:text-sage-300 hover:bg-sage-100 dark:hover:bg-night-600'
                                }`}
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 22h8M12 15v7M5 3h14l-6 9H11L5 3z"
                                  />
                                </svg>
                                Drinks
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  updateGuest(index, { drinker: false })
                                }
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                  !guest.drinker
                                    ? 'bg-sage-600 text-white'
                                    : 'text-sage-600 dark:text-sage-300 hover:bg-sage-100 dark:hover:bg-night-600'
                                }`}
                              >
                                None
                              </button>
                            </div>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeGuest(index)}
                          title="Remove guest"
                          className="px-3 py-2 text-sage-400 hover:text-rose-600 transition-colors"
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {fieldErrors.guests && (
                  <p className="text-rose-600 dark:text-rose-400 text-sm mb-3">
                    {fieldErrors.guests}
                  </p>
                )}

                <button
                  type="button"
                  onClick={addGuest}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-dashed border-sage-300 dark:border-night-600 rounded-lg text-sage-600 dark:text-sage-300 hover:bg-sage-50 dark:hover:bg-night-700 hover:border-sage-400 transition-colors text-sm font-medium"
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Add guest</span>
                </button>
              </div>
            )}

            {/* Allergies Field */}
            <div>
              <label
                htmlFor="allergies"
                className="block text-sm font-medium text-sage-700 dark:text-sage-300 mb-2"
              >
                Food Allergies / Dietary Restrictions
              </label>
              <textarea
                id="allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                rows={3}
                maxLength={1000}
                className="w-full px-4 py-3 bg-cream-50 dark:bg-night-700 border border-sage-200 dark:border-night-600 rounded-lg text-sage-800 dark:text-cream-100 placeholder-sage-400 dark:placeholder-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all resize-none"
                placeholder="Please let us know of any allergies or dietary requirements"
              />
            </div>

            {/* Questions Field */}
            <div>
              <label
                htmlFor="questions"
                className="block text-sm font-medium text-sage-700 dark:text-sage-300 mb-2"
              >
                Questions for the Couple
              </label>
              <textarea
                id="questions"
                name="questions"
                value={formData.questions}
                onChange={handleChange}
                rows={3}
                maxLength={1000}
                className="w-full px-4 py-3 bg-cream-50 dark:bg-night-700 border border-sage-200 dark:border-night-600 rounded-lg text-sage-800 dark:text-cream-100 placeholder-sage-400 dark:placeholder-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all resize-none"
                placeholder="Any questions or messages for Trevor & Stephanie?"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-shine w-full py-4 px-6 bg-sage-600 hover:bg-sage-700 disabled:bg-sage-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <span>Submit RSVP</span>
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back link */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sage-600 dark:text-sage-400 hover:text-sage-800 dark:hover:text-cream-100 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
