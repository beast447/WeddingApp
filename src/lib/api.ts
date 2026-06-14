const BASE_URL = import.meta.env.VITE_API_URL ?? ''

export function getToken(): string | null {
  return localStorage.getItem('auth_token')
}

export function setToken(token: string): void {
  localStorage.setItem('auth_token', token)
}

export function clearToken(): void {
  localStorage.removeItem('auth_token')
}

export async function login(email: string, password: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error('Invalid credentials')
  const { token } = await res.json()
  setToken(token)
}

export async function logout(): Promise<void> {
  clearToken()
}

export interface RSVPPayload {
  name: string
  email: string
  attending: boolean
  allergies: string
  drinker: string
  questions: string
}

export async function submitRSVP(data: RSVPPayload): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/rsvps`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to submit RSVP')
}

export interface RSVP {
  id: string
  name: string
  email: string
  attending: boolean
  allergies: string
  questions: string
  submittedAt: string | null
}

export async function fetchRSVPs(): Promise<RSVP[]> {
  const res = await fetch(`${BASE_URL}/api/rsvps`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  if (!res.ok) throw new Error('Failed to fetch RSVPs')
  return res.json()
}
