import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import baybooLogo from '../assets/bayboo-logo.png'
import { supabase } from '../lib/supabase'
import './AuthPage.css'

type ResetPasswordPageProps = {
  language: 'en' | 'ko'
}

const resetCopy = {
  en: {
    title: 'Reset password',
    checking: 'Checking your password reset link.',
    ready: 'Enter your new password.',
    expired: 'This link is expired or invalid.',
    minLength: 'Password must be at least 8 characters.',
    mismatch: 'Passwords do not match.',
    success: 'Your password has been changed. Please sign in again from the app.',
    passwordLabel: 'New password',
    confirmLabel: 'Confirm password',
    submit: 'Change password',
    submitting: 'Changing...',
    currentLabel: 'English',
    otherLabel: '한국어',
    otherPath: '/reset-password/ko',
  },
  ko: {
    title: '비밀번호 변경',
    checking: '비밀번호 변경 링크를 확인하고 있어요.',
    ready: '새 비밀번호를 입력해 주세요.',
    expired: '링크가 만료되었거나 올바르지 않습니다.',
    minLength: '비밀번호는 8자 이상이어야 합니다.',
    mismatch: '비밀번호가 일치하지 않습니다.',
    success: '비밀번호 변경이 완료되었습니다. 앱에서 다시 로그인해 주세요.',
    passwordLabel: '새 비밀번호',
    confirmLabel: '비밀번호 확인',
    submit: '비밀번호 변경',
    submitting: '변경 중...',
    currentLabel: '한국어',
    otherLabel: 'English',
    otherPath: '/reset-password',
  },
}

export default function ResetPasswordPage({ language }: ResetPasswordPageProps) {
  const copy = resetCopy[language]
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [ready, setReady] = useState(false)
  const [message, setMessage] = useState(copy.checking)
  const [status, setStatus] = useState<'checking' | 'ready' | 'success' | 'error'>(
    'checking',
  )
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setMessage(copy.checking)
    setStatus('checking')

    const init = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        setReady(false)
        setStatus('error')
        setMessage(copy.expired)
        return
      }

      setReady(true)
      setStatus('ready')
      setMessage(copy.ready)
    }

    init()
  }, [copy])

  const changePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password.length < 8) {
      setStatus('error')
      setMessage(copy.minLength)
      return
    }

    if (password !== confirm) {
      setStatus('error')
      setMessage(copy.mismatch)
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
    setMessage(copy.success)
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <img className="auth-logo" src={baybooLogo} alt="Bayboo AI" />
        <h1 className="auth-title">{copy.title}</h1>
        <p className={`auth-message ${status}`}>{message}</p>

        {ready && (
          <form className="auth-form" onSubmit={changePassword}>
            <div className="auth-field">
              <label htmlFor="password">{copy.passwordLabel}</label>
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
              <label htmlFor="confirm-password">{copy.confirmLabel}</label>
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
              {submitting ? copy.submitting : copy.submit}
            </button>
          </form>
        )}

        <nav className="auth-language" aria-label="Language">
          <span>{copy.currentLabel}</span>
          <Link to={copy.otherPath}>{copy.otherLabel}</Link>
        </nav>
      </section>
    </main>
  )
}
