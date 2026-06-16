import { useCallback, useEffect, useState } from 'react'

// Auto-import every image in the WeddingPhotos folder (add/remove files freely).
const modules = import.meta.glob('../assets/WeddingPhotos/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}', {
  eager: true,
  import: 'default',
})

const photos = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src as string)

const INTERVAL = 4500

export default function PhotoGallery() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback((delta: number) => {
    setIndex((prev) => (prev + delta + photos.length) % photos.length)
  }, [])

  useEffect(() => {
    if (paused || photos.length <= 1) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [paused])

  if (photos.length === 0) return null

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream-50 to-sage-50 dark:from-night-800 dark:to-night-900">
      <div className="max-w-4xl mx-auto">
        <p className="font-script text-3xl sm:text-4xl text-center text-gold-gradient mb-1">memories</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-center text-sage-800 dark:text-cream-100 mb-10 animate-fade-in">
          Our Journey Together
        </h2>

        <div
          className="group relative aspect-[4/5] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-sage-200/60 dark:ring-white/10 bg-sage-100 dark:bg-night-800"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          {/* Slides */}
          {photos.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Trevor and Stephanie — photo ${i + 1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover transition-all ease-out ${
                i === index
                  ? 'opacity-100 scale-105 duration-[5000ms]'
                  : 'opacity-0 scale-100 duration-1000'
              }`}
            />
          ))}

          {/* Gradient for control legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Prev / Next */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 dark:bg-night-900/60 backdrop-blur-sm text-sage-800 dark:text-cream-100 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity hover:bg-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 dark:bg-night-900/60 backdrop-blur-sm text-sage-800 dark:text-cream-100 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity hover:bg-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
            {index + 1} / {photos.length}
          </div>

          {/* Dots */}
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 px-4 flex-wrap">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Decorative element */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-400" />
            <svg className="w-6 h-6 text-gold-500 animate-float" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-400" />
          </div>
        </div>
      </div>
    </section>
  )
}
