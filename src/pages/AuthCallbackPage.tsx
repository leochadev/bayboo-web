import { useEffect, useState } from 'react'
import baybooLogo from '../assets/bayboo-logo.png'
import { supabase } from '../lib/supabase'
import './AuthPage.css'

export default function AuthCallbackPage() {
  const [message, setMessage] = useState('인증을 확인하고 있어요.')
  const [status, setStatus] = useState<'checking' | 'success' | 'error'>('checking')

  useEffect(() => {
    const check = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        setStatus('error')
        setMessage('인증 링크가 만료되었거나 올바르지 않습니다.')
        return
      }

      setStatus('success')
      setMessage('이메일 인증이 완료되었습니다. 앱으로 돌아가 로그인해 주세요.')
    }

    check()
  }, [])

  return (
    <main className="auth-page">
      <section className="auth-card" aria-live="polite">
        <img className="auth-logo" src={baybooLogo} alt="Bayboo AI" />
        <h1 className="auth-title">Bayboo</h1>
        <p className={`auth-message ${status}`}>{message}</p>
      </section>
    </main>
  )
}
