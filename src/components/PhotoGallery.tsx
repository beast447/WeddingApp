interface Photo {
  id: number
  src: string
  alt: string
}

// Placeholder photos - replace with actual couple photos
const photos: Photo[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
    alt: 'Couple photo 1',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop',
    alt: 'Couple photo 2',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&h=600&fit=crop',
    alt: 'Couple photo 3',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop',
    alt: 'Couple photo 4',
  },
]

export default function PhotoGallery() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream-50 to-sage-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl text-center text-sage-800 mb-12 animate-fade-in">
          Our Journey Together
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg shadow-lg animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sage-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Decorative element */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-400" />
            <svg 
              className="w-6 h-6 text-gold-500 animate-float" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-400" />
          </div>
        </div>
      </div>
    </section>
  )
}
