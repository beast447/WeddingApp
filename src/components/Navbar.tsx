import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/rsvp', label: 'RSVP' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-50/90 dark:bg-night-900/90 backdrop-blur-md border-b border-sage-200/50 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-2xl font-medium text-sage-800 dark:text-cream-100 hover:text-sage-600 dark:hover:text-cream-200 transition-colors tracking-wide"
          >
            T <span className="font-script text-3xl text-gold-gradient align-middle">&</span> S
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                  isActive(link.path)
                    ? 'text-sage-700 dark:text-cream-100 border-b-2 border-gold-500 pb-1'
                    : 'text-sage-600 dark:text-sage-300 hover:text-sage-800 dark:hover:text-cream-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-sage-700 dark:text-sage-200 hover:text-sage-900 dark:hover:text-cream-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-sage-200/50 dark:border-white/10 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                    isActive(link.path)
                      ? 'text-sage-700 dark:text-cream-100'
                      : 'text-sage-600 dark:text-sage-300 hover:text-sage-800 dark:hover:text-cream-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
