import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import baybooLogo from '../assets/bayboo-logo.png'
import { supabase } from '../lib/supabase'
import './AuthPage.css'

type AuthCallbackPageProps = {
  language: 'en' | 'ko'
}

const authCopy = {
  en: {
    title: 'Bayboo',
    checking: 'Checking your verification link.',
    success: 'Email verification is complete. Please return to the app and sign in.',
    error: 'This verification link is expired or invalid.',
    currentLabel: 'English',
    otherLabel: '한국어',
    otherPath: '/auth/callback/ko',
  },
  ko: {
    title: 'Bayboo',
    checking: '인증 링크를 확인하고 있어요.',
    success: '이메일 인증이 완료되었습니다. 앱으로 돌아가 로그인해 주세요.',
    error: '인증 링크가 만료되었거나 올바르지 않습니다.',
    currentLabel: '한국어',
    otherLabel: 'English',
    otherPath: '/auth/callback',
  },
}

export default function AuthCallbackPage({ language }: AuthCallbackPageProps) {
  const copy = authCopy[language]
  const [message, setMessage] = useState(copy.checking)
  const [status, setStatus] = useState<'checking' | 'success' | 'error'>('checking')

  useEffect(() => {
    setMessage(copy.checking)
    setStatus('checking')

    const check = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        setStatus('error')
        setMessage(copy.error)
        return
      }

      setStatus('success')
      setMessage(copy.success)
    }

    check()
  }, [copy])

  return (
    <main className="auth-page">
      <section className="auth-card" aria-live="polite">
        <img className="auth-logo" src={baybooLogo} alt="Bayboo AI" />
        <h1 className="auth-title">{copy.title}</h1>
        <p className={`auth-message ${status}`}>{message}</p>
        <nav className="auth-language" aria-label="Language">
          <span>{copy.currentLabel}</span>
          <Link to={copy.otherPath}>{copy.otherLabel}</Link>
        </nav>
      </section>
    </main>
  )
}
