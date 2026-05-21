import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import baybooLogo from '../assets/bayboo-logo.png'
import { supabase } from '../lib/supabase'
import './AuthPage.css'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [ready, setReady] = useState(false)
  const [message, setMessage] = useState('비밀번호 변경 링크를 확인하고 있어요.')
  const [status, setStatus] = useState<'checking' | 'ready' | 'success' | 'error'>(
    'checking',
  )
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const init = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        setReady(false)
        setStatus('error')
        setMessage('링크가 만료되었거나 올바르지 않습니다.')
        return
      }

      setReady(true)
      setStatus('ready')
      setMessage('새 비밀번호를 입력해 주세요.')
    }

    init()
  }, [])

  const changePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password.length < 8) {
      setStatus('error')
      setMessage('비밀번호는 8자 이상이어야 합니다.')
      return
    }

    if (password !== confirm) {
      setStatus('error')
      setMessage('비밀번호가 일치하지 않습니다.')
      return
    }

    setSubmitting(true)
    const { error } = await supabase.auth.updateUser({
      password,
    })
    setSubmitting(false)

    if (error) {
      setStatus('error')
      setMessage(error.message)
      return
    }

    await supabase.auth.signOut()
    setReady(false)
    setStatus('success')
    setMessage('비밀번호 변경이 완료되었습니다. 앱에서 다시 로그인해 주세요.')
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <img className="auth-logo" src={baybooLogo} alt="Bayboo AI" />
        <h1 className="auth-title">비밀번호 변경</h1>
        <p className={`auth-message ${status}`}>{message}</p>

        {ready && (
          <form className="auth-form" onSubmit={changePassword}>
            <div className="auth-field">
              <label htmlFor="password">새 비밀번호</label>
              <input
                id="password"
                className="auth-input"
                type="password"
                value={password}
                minLength={8}
                autoComplete="new-password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="auth-field">
              <label htmlFor="confirm-password">비밀번호 확인</label>
              <input
                id="confirm-password"
                className="auth-input"
                type="password"
                value={confirm}
                minLength={8}
                autoComplete="new-password"
                onChange={(event) => setConfirm(event.target.value)}
              />
            </div>
            <button className="auth-button" type="submit" disabled={submitting}>
              {submitting ? '변경 중...' : '비밀번호 변경'}
            </button>
          </form>
        )}
      </section>
    </main>
  )
}
