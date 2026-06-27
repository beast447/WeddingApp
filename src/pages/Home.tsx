import { useState } from 'react'
import { Link } from 'react-router-dom'
import CountdownTimer from '../components/CountdownTimer'
import newHarvest from '../assets/newharvest.png'
import PhotoGallery from "../components/PhotoGallery"

const quickFacts = [
  {
    label: 'When',
    value: 'August 1st, 2026',
    sub: 'Ceremony at 3:00 PM',
    path: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    label: 'Where',
    value: 'New Harvest Ministries',
    sub: 'Willis, Virginia',
    path: 'M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
  },
  {
    label: 'Dress Code',
    value: 'Semi-Formal',
    sub: 'Semi-Formal attire requested',
    path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  },
]

const schedule = [
  {
    time: '3:00 PM',
    title: 'Ceremony',
    desc: 'Join us as we say "I do."',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
  {
    time: '4:00 PM',
    title: 'Cocktail Hour',
    desc: 'Drinks, hors d’oeuvres & mingling.',
    icon: 'M8 22h8M12 11v11M5 3h14l-7 8-7-8z',
  },
  {
    time: '5:00 PM',
    title: 'Dinner & Toasts',
    desc: 'A seated dinner to celebrate together.',
    icon: 'M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-1.5-.454M9 6v3m3-3v3m3-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11m16-11v11',
  },
  {
    time: '6:00 PM – 9:00 PM',
    title: 'Reception',
    desc: 'Hit the floor with the newlyweds.',
    icon: 'M9 19V6l12-3v13M9 19a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z',
  },
]

const faqs = [
  {
    q: 'When should I RSVP by?',
    a: 'Please RSVP by July 10th, 2026 so we can finalize our headcount with the venue.',
  },
  {
    q: 'Can I bring a plus-one?',
    a: 'Plus-ones are approved on a case-by-case basis. If you’d like to bring one, add them in the guests section when you RSVP — we’ll send a confirmation to the email you signed up with no later than July 7th.',
  },
  {
    q: 'Are children welcome?',
    a: 'Yes! Children are warmly welcome — just add them as guests when you RSVP.',
  },
  {
    q: 'What should I wear?',
    a: 'Dust off your favorite celebration outfits! Think cocktail-length dresses, stylish separates, or a sharp suit and tie (or no tie, your choice!). Bring your dancing shoes, but leave the jeans at home.',
  },
  {
    q: 'Is the ceremony indoors or outdoors?',
    a: 'Both the ceremony and reception are indoors, so you’ll be comfortable rain or shine.',
  },
  {
    q: 'Is the reception at a different location?',
    a: 'Yes — the ceremony is at New Harvest Ministries in Willis, and the reception follows at the Floyd County Moose Lodge in Floyd, about a 15-minute drive away.',
  },
  {
    q: 'Where do I park?',
    a: 'Free on-site parking is available at the venue. Carpooling is encouraged.',
  },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-sage-50 to-rose-50 dark:from-night-950 dark:via-night-900 dark:to-night-800 animate-gradient" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-sage-200/30 dark:bg-sage-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-200/30 dark:bg-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/10 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 pt-24 pb-12 max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <svg className="w-24 h-8 text-gold-500" viewBox="0 0 100 30" fill="currentColor">
              <path d="M0 15 Q25 0 50 15 Q75 30 100 15" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          </div>

          <p className="text-sage-600 dark:text-sage-300 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium mb-4">
            Save the Date
          </p>

          {/* Names */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-sage-800 dark:text-cream-100 mb-2 tracking-wide drop-shadow-sm">
            Trevor
          </h1>
          <p className="font-script text-6xl sm:text-7xl md:text-8xl text-gold-gradient leading-none my-1">
            &
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-sage-800 dark:text-cream-100 mb-8 tracking-wide drop-shadow-sm">
            Stephanie
          </h1>

          {/* Date */}
          <div className="mb-8">
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-sage-700 dark:text-sage-200 mb-2">
              August 1st, 2026
            </p>
            <div className="flex items-center justify-center gap-3 text-sage-600 dark:text-sage-400">
              <div className="w-8 sm:w-12 h-px bg-sage-300 dark:bg-sage-600" />
              <svg className="w-4 h-4 text-gold-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="text-xs sm:text-base">New Harvest Ministries • Willis, Virginia</span>
              <div className="w-8 sm:w-12 h-px bg-sage-300 dark:bg-sage-600" />
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-12">
            <CountdownTimer />
          </div>

          {/* CTA Button */}
          <Link
            to="/rsvp"
            className="btn-shine inline-flex items-center gap-2 px-8 py-4 bg-sage-600 hover:bg-sage-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <span>RSVP Now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <div className="mt-4 flex justify-center">
          <Link
            to="https://www.myregistry.com/wedding-registry/stephanie-buckland-and-trevor-king-check-virginia/5341299/giftlist"
            className="btn-shine inline-flex items-center gap-2 px-8 py-4 bg-sage-600 hover:bg-sage-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <span>Wedding Registry</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section id="details" className="py-12 sm:py-16 px-4 bg-white dark:bg-night-900 scroll-mt-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {quickFacts.map((fact) => (
            <div
              key={fact.label}
              className="hover-lift text-center bg-gradient-to-br from-cream-50 to-sage-50 dark:from-night-800 dark:to-night-700 rounded-2xl p-6 shadow-lg ring-1 ring-sage-100 dark:ring-white/10"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-sage-100 dark:bg-night-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-sage-600 dark:text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={fact.path} />
                </svg>
              </div>
              <p className="text-sage-500 dark:text-sage-400 text-xs uppercase tracking-[0.2em] mb-1">{fact.label}</p>
              <p className="font-serif text-xl text-sage-800 dark:text-cream-100">{fact.value}</p>
              <p className="text-sage-500 dark:text-sage-400 text-sm mt-1">{fact.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-cream-50 to-sage-50 dark:from-night-900 dark:to-night-800">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-script text-3xl sm:text-4xl text-gold-gradient mb-1">our story</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-sage-800 dark:text-cream-100 mb-4">How We Got Here</h2>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="rule-gold" />
            <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div className="rule-gold-rev" />
          </div>
          <p className="text-sage-600 dark:text-sage-300 text-base sm:text-lg leading-relaxed mb-4">
           Our story has been one of unmeasurable love, growth, patience, laughter, and support. If you asked either of us, I think we'd both say that we are still absolutely flabbergasted to have made it this far. From the first date to our now wedding day, we have been so thankful to share our unwavering love and happiness with you.
          </p>
          <p className="text-sage-600 dark:text-sage-300 text-base sm:text-lg leading-relaxed">
            Everyone has seen that one movie, read that one book, or heard that one song and wished for a love like that one;
            we are truly blessed to have found that love within each other. From traveling, going through life's big changes, and becoming parents to the two sweetest (and cutest) kitties, every day has been a new start to the greatest adventure ever taken. 
          </p>
        </div>
      </section>

      {/* Photo Gallery */}
      <PhotoGallery />


      {/* Schedule / Timeline */}
      <section className="py-16 sm:py-20 px-4 bg-white dark:bg-night-900">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-script text-3xl sm:text-4xl text-gold-gradient mb-1">the celebration</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-sage-800 dark:text-cream-100 mb-4">Schedule of Events</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="rule-gold" />
              <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <div className="rule-gold-rev" />
            </div>
          </div>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-[1.65rem] sm:left-1/2 top-2 bottom-2 w-0.5 rounded-full bg-gradient-to-b from-gold-400/60 via-sage-300 to-gold-400/60 dark:from-gold-500/40 dark:via-night-600 dark:to-gold-500/40 sm:-translate-x-1/2" />
            <div className="space-y-10">
              {schedule.map((item, i) => (
                <div
                  key={item.title}
                  className={`relative flex items-start gap-4 sm:gap-0 sm:items-center ${
                    i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* icon medallion */}
                  <div className="z-10 shrink-0 w-14 h-14 sm:absolute sm:left-1/2 sm:-translate-x-1/2 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-night-900">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={item.icon} />
                    </svg>
                  </div>
                  {/* card */}
                  <div className={`flex-1 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-14 sm:text-right' : 'sm:pl-14'}`}>
                    <div className="hover-lift bg-white dark:bg-night-800 rounded-2xl p-5 shadow-md hover:shadow-xl ring-1 ring-sage-100 dark:ring-white/10">
                      <span
                        className={`inline-block px-3 py-1 rounded-full bg-gold-400/20 text-gold-600 dark:bg-gold-400/15 dark:text-gold-400 text-xs font-semibold uppercase tracking-[0.15em] mb-2 ${
                          i % 2 === 0 ? 'sm:ml-auto' : ''
                        }`}
                      >
                        {item.time}
                      </span>
                      <h3 className="font-serif text-2xl text-sage-800 dark:text-cream-100 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-sage-500 dark:text-sage-400 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Venue & Travel */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-sage-50 to-cream-50 dark:from-night-800 dark:to-night-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-script text-3xl sm:text-4xl text-gold-gradient mb-1">getting there</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-sage-800 dark:text-cream-100">Venue & Travel</h2>
          </div>

          {/* Venue Card */}
          <div className="hover-lift bg-white dark:bg-night-800 rounded-2xl p-6 sm:p-8 shadow-lg ring-1 ring-sage-100 dark:ring-white/10 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              <div className="overflow-hidden rounded-xl shadow-md ring-1 ring-sage-200/60 shrink-0">
                <img
                  src={newHarvest}
                  alt="A picture of New Harvest Ministries"
                  className="w-full md:w-64 h-48 object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="text-center md:text-left">
                <p className="text-gold-600 dark:text-gold-400 text-xs uppercase tracking-[0.2em] mb-1">The Ceremony</p>
                <h3 className="font-serif text-2xl text-sage-800 dark:text-cream-100 mb-2">New Harvest Ministries</h3>
                <p className="text-sage-600 dark:text-sage-300 mb-1">6236 Floyd Hwy S, Willis, VA 24380</p>
                <p className="text-sage-500 dark:text-sage-400 text-sm mb-4">Indoors • Free on-site parking</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=New+Harvest+Ministries+6236+Floyd+Hwy+S+Willis+VA+24380"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine inline-flex items-center gap-2 px-5 py-2.5 bg-sage-600 hover:bg-sage-700 text-white text-sm font-medium rounded-full shadow-md transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>

          {/* Reception Venue */}
          <div className="hover-lift bg-white dark:bg-night-800 rounded-2xl p-6 sm:p-8 shadow-lg ring-1 ring-sage-100 dark:ring-white/10 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              <div className="w-full md:w-64 h-48 shrink-0 rounded-xl bg-gradient-to-br from-sage-100 to-cream-100 dark:from-night-700 dark:to-night-600 flex items-center justify-center ring-1 ring-sage-200/60">
                <svg className="w-16 h-16 text-sage-500 dark:text-gold-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 11h.01M15 11h.01" />
                </svg>
              </div>
              <div className="text-center md:text-left">
                <p className="text-gold-600 dark:text-gold-400 text-xs uppercase tracking-[0.2em] mb-1">The Reception</p>
                <h3 className="font-serif text-2xl text-sage-800 dark:text-cream-100 mb-2">Floyd County Moose Lodge</h3>
                <p className="text-sage-600 dark:text-sage-300 mb-1">444 Floyd Hwy S, Floyd, VA 24091</p>
                <p className="text-sage-500 dark:text-sage-400 text-sm mb-4">Indoors • About 15 minutes from the ceremony</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Floyd+County+Moose+Lodge+444+Floyd+Hwy+S+Floyd+VA+24091"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine inline-flex items-center gap-2 px-5 py-2.5 bg-sage-600 hover:bg-sage-700 text-white text-sm font-medium rounded-full shadow-md transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 px-4 bg-white dark:bg-night-900">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-script text-3xl sm:text-4xl text-gold-gradient mb-1">good to know</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-sage-800 dark:text-cream-100">Frequently Asked</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const open = openFaq === i
              return (
                <div
                  key={faq.q}
                  className="bg-gradient-to-br from-cream-50 to-sage-50 dark:from-night-800 dark:to-night-700 rounded-xl ring-1 ring-sage-100 dark:ring-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={open}
                  >
                    <span className="font-medium text-sage-800 dark:text-cream-100">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 shrink-0 text-sage-500 dark:text-sage-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-sage-600 dark:text-sage-300 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Registry + Final CTA */}
      <section className="relative py-20 sm:py-24 px-4 overflow-hidden bg-gradient-to-br from-sage-600 to-sage-800 dark:from-night-800 dark:to-night-950">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="relative max-w-2xl mx-auto text-center">
          <svg className="w-10 h-10 text-gold-400 mx-auto mb-4 animate-float" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <p className="font-script text-3xl sm:text-4xl text-gold-300 mb-1">with gratitude</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">Your Presence Is the Present</h2>
          <p className="text-cream-100/90 leading-relaxed mb-8 max-w-lg mx-auto">
            Your love and support mean the world to us. Should you wish to give a gift, a registry
            will be available here soon. Most of all, we can't wait to celebrate with you.
          </p>
          <Link
            to="/rsvp"
            className="btn-shine inline-flex items-center gap-2 px-8 py-4 bg-white text-sage-700 font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <span>RSVP Now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-gradient-to-b from-sage-800 to-sage-900 dark:from-night-950 dark:to-black text-center">
        <p className="font-script text-4xl text-cream-100 mb-1">Trevor &amp; Stephanie</p>
        <p className="text-sage-400 text-sm">August 1st, 2026 • Willis, Virginia</p>
        <div className="flex justify-center mt-4">
          <svg className="w-6 h-6 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </footer>
    </div>
  )
}
