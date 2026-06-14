import { ReactNode } from 'react'
import { getToken } from '../lib/api'
import LoginForm from './LoginForm'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!getToken()) {
    return <LoginForm />
  }

  return <>{children}</>
}
