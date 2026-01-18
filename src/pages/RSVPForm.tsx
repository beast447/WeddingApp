import { useState, FormEvent } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { Link } from 'react-router-dom'

interface FormData {
  name: string
  email: string
  attending: string
  allergies: string
  drinker: string
  questions: string
}

export default function RSVPForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    attending: '',
    allergies: '',
    drinker: '',
    questions: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await addDoc(collection(db, 'rsvps'), {
        ...formData,
        attending: formData.attending === 'yes',
        submittedAt: serverTimestamp(),
      })
      setSubmitted(true)
    } catch (err) {
      console.error('Error submitting RSVP:', err)
      setError('There was an error submitting your RSVP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-sage-50 to-cream-100 px-4 pt-20">
        <div className="max-w-md w-full text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-sage-200/50 p-8 animate-fade-in-up">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
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

            <h2 className="font-serif text-3xl text-sage-800 mb-4">
              Thank You!
            </h2>
            <p className="text-sage-600 mb-6">
              {formData.attending === 'yes'
                ? "We're so excited you'll be joining us! We can't wait to celebrate with you."
                : "We're sorry you can't make it, but we appreciate you letting us know."}
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sage-700 hover:text-sage-900 font-medium transition-colors"
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
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-sage-50 to-cream-100 px-4 py-24">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <p className="text-sage-600 uppercase tracking-[0.2em] text-sm font-medium mb-2">
            We hope you can join us
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-sage-800 mb-4">
            RSVP
          </h1>
          <p className="text-sage-600 max-w-md mx-auto">
            Please fill out the form below to let us know if you'll be celebrating with us.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-sage-200/50 p-6 sm:p-8 animate-fade-in-up animation-delay-200">
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
                className="block text-sm font-medium text-sage-700 mb-2"
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
                className="w-full px-4 py-3 bg-cream-50 border border-sage-200 rounded-lg text-sage-800 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-sage-700 mb-2"
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
                className="w-full px-4 py-3 bg-cream-50 border border-sage-200 rounded-lg text-sage-800 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all"
                placeholder="Enter your email address"
              />
            </div>

            {/* Attending Radio Buttons */}
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-3">
                Will you be attending? <span className="text-rose-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={formData.attending === 'yes'}
                      onChange={handleChange}
                      required
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-sage-300 rounded-full peer-checked:border-sage-600 transition-colors" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-sage-600 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className="text-sage-700 group-hover:text-sage-800 transition-colors">
                    Joyfully Accept
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={formData.attending === 'no'}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-sage-300 rounded-full peer-checked:border-sage-600 transition-colors" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-sage-600 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className="text-sage-700 group-hover:text-sage-800 transition-colors">
                    Regretfully Decline
                  </span>
                </label>
              </div>
            </div>

            {/* Drinker Radio Buttons */}
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-3">
                Will you be drinking alcohol? <span className="text-rose-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="drinker"
                      value="yes"
                      checked={formData.drinker === 'yes'}
                      onChange={handleChange}
                      required
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-sage-300 rounded-full peer-checked:border-sage-600 transition-colors" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-sage-600 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className="text-sage-700 group-hover:text-sage-800 transition-colors">
                    Yes
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="drinker"
                      value="no"
                      checked={formData.drinker === 'no'}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-sage-300 rounded-full peer-checked:border-sage-600 transition-colors" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-sage-600 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className="text-sage-700 group-hover:text-sage-800 transition-colors">
                    No
                  </span>
                </label>
              </div>
            </div>

            {/* Allergies Field */}
            <div>
              <label
                htmlFor="allergies"
                className="block text-sm font-medium text-sage-700 mb-2"
              >
                Food Allergies / Dietary Restrictions
              </label>
              <textarea
                id="allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-cream-50 border border-sage-200 rounded-lg text-sage-800 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all resize-none"
                placeholder="Please let us know of any allergies or dietary requirements"
              />
            </div>

            {/* Questions Field */}
            <div>
              <label
                htmlFor="questions"
                className="block text-sm font-medium text-sage-700 mb-2"
              >
                Questions for the Couple
              </label>
              <textarea
                id="questions"
                name="questions"
                value={formData.questions}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-cream-50 border border-sage-200 rounded-lg text-sage-800 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all resize-none"
                placeholder="Any questions or messages for Trevor & Stephanie?"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-sage-600 hover:bg-sage-700 disabled:bg-sage-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
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
            className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-800 transition-colors"
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
