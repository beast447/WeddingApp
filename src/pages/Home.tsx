import { Link } from 'react-router-dom'
import CountdownTimer from '../components/CountdownTimer'
import PhotoGallery from '../components/PhotoGallery'
import eightyFour from '../assets/eighty-four.png'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-sage-50 to-rose-50" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-sage-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/10 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 pt-20 pb-12 max-w-4xl mx-auto">
          {/* Decorative top flourish */}
          <div className="flex justify-center mb-6">
            <svg className="w-24 h-8 text-gold-500" viewBox="0 0 100 30" fill="currentColor">
              <path d="M0 15 Q25 0 50 15 Q75 30 100 15" stroke="currentColor" strokeWidth="1" fill="none"/>
            </svg>
          </div>

          {/* Save the Date text */}
          <p className="text-sage-600 uppercase tracking-[0.3em] text-sm font-medium mb-4">
            Save the Date
          </p>

          {/* Names */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-sage-800 mb-2">
            Trevor
          </h1>
          <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-gold-500 my-4">
            &
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-sage-800 mb-8">
            Stephanie
          </h1>

          {/* Date */}
          <div className="mb-8">
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-sage-700 mb-2">
              August 1st, 2026
            </p>
            <div className="flex items-center justify-center gap-3 text-sage-600">
              <div className="w-12 h-px bg-sage-300" />
              <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span className="text-sm sm:text-base">The Eighty Four • Riner, Virginia</span>
              <div className="w-12 h-px bg-sage-300" />
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-12">
            <CountdownTimer />
          </div>

          {/* CTA Button */}
            <Link
              to="/rsvp"
              className="inline-flex items-center gap-2 px-8 py-4 bg-sage-600 hover:bg-sage-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>RSVP Now</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
      </section>

      {/* Photo Gallery Section */}
      <PhotoGallery />
      
      {/* Details Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-sage-800 mb-6">
            Join Us for Our Special Day
          </h2>
          <p className="text-sage-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            We are so excited to celebrate our love with you! Please save the date 
            and join us at The Eighty Four in beautiful Riner, Virginia for an unforgettable 
            celebration of our journey together.
          </p>

          {/* Venue Card */}
          <div className="bg-gradient-to-br from-cream-50 to-sage-50 rounded-2xl p-8 shadow-lg border border-sage-100">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Venue Icon */}
              <div className="bg-sage-100 flex items-center justify-center">
                <img src={eightyFour} alt="A picture of the Eighty Four"/>
              </div>
              
              {/* Venue Details */}
              <div className="text-center md:text-left">
                <h3 className="font-serif text-2xl text-sage-800 mb-2">The Eighty Four</h3>
                <p className="text-sage-600 mb-1">Riner, Virginia</p>
                <p className="text-sage-600 mb-1">5178 Webbs Mill Rd N, Riner, VA 24149</p>
                <p className="text-sage-500 text-sm">August 1st, 2026</p>
              </div>
            </div>
          </div>

          {/* RSVP reminder */}
          <div className="mt-12">
            <p className="text-sage-500 mb-4">More details coming soon!</p>
            <Link
              to="/rsvp"
              className="border-solid border-blue inline-flex items-center gap-2 text-sage-700 hover:text-sage-900 font-medium transition-colors"
            >
              <span>Let us know if you can make it</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-sage-800 text-center">
        <p className="font-serif text-xl text-cream-100 mb-2">
          Trevor & Stephanie
        </p>
        <p className="text-sage-400 text-sm">
          August 1st, 2026 • Floyd, Virginia
        </p>
        <div className="flex justify-center mt-4">
          <svg className="w-6 h-6 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </footer>
    </div>
  )
}
