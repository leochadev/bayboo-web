import { Link } from 'react-router-dom'
import baybooLogo from './assets/bayboo-logo.png'
import './App.css'

type AppProps = {
  language: 'en' | 'ko'
}

const storeLinks = {
  appStore:
    import.meta.env.VITE_APP_STORE_URL ||
    'https://apps.apple.com/us/search?term=Bayboo%20AI',
  playStore:
    import.meta.env.VITE_PLAY_STORE_URL ||
    'https://play.google.com/store/search?q=Bayboo%20AI&c=apps',
}

const homeContent = {
  en: {
    eyebrow: 'Bayboo AI',
    copy: 'A warm AI experience for children and families is coming soon.',
    downloadLabel: 'Download the app',
    appStore: 'App Store',
    playStore: 'Google Play',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    currentLabel: 'English',
    otherLabel: '한국어',
    otherPath: '/ko',
  },
  ko: {
    eyebrow: 'Bayboo AI',
    copy: '아이와 가족을 위한 따뜻한 AI 경험을 준비하고 있습니다.',
    downloadLabel: '앱 다운로드',
    appStore: 'App Store',
    playStore: 'Google Play',
    privacy: '개인정보처리방침',
    terms: '이용약관',
    currentLabel: '한국어',
    otherLabel: 'English',
    otherPath: '/',
  },
}

function App({ language }: AppProps) {
  const content = homeContent[language]

  return (
    <main className="home-page">
      <section className="home-content">
        <img className="home-logo" src={baybooLogo} alt="Bayboo AI" />
        <p className="home-eyebrow">{content.eyebrow}</p>
        <h1 className="home-title">Bayboo AI</h1>
        <p className="home-copy">{content.copy}</p>
        <section className="store-downloads" aria-label={content.downloadLabel}>
          <a
            className="store-badge"
            href={storeLinks.appStore}
            target="_blank"
            rel="noreferrer"
            aria-label={content.appStore}
          >
            <svg className="store-badge-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.1 12.5c0-2.1 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.1-1.8-1.3-.1-2.6.8-3.3.8s-1.7-.8-2.8-.8c-1.5 0-2.8.8-3.6 2.2-1.5 2.7-.4 6.6 1.1 8.8.7 1.1 1.6 2.3 2.8 2.2 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1.1 2.7-2.2.8-1.2 1.1-2.4 1.1-2.4-.1-.1-2.4-1-2.4-3.5Zm-2-6.5c.6-.8 1.1-1.9.9-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.8-1.3Z" />
            </svg>
            <span>{content.appStore}</span>
          </a>
          <a
            className="store-badge"
            href={storeLinks.playStore}
            target="_blank"
            rel="noreferrer"
            aria-label={content.playStore}
          >
            <svg className="store-badge-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.4 3.2c-.3.3-.4.8-.4 1.4v14.8c0 .6.1 1.1.4 1.4l.1.1 8.3-8.8v-.2L4.5 3.1l-.1.1Z" />
              <path d="m15.5 15 2.8-1.6c.8-.5.8-1.3 0-1.8L15.5 10l-2.8 3 2.8 2Z" />
              <path d="m15.5 15-2.8-2.9-8.3 8.8c.5.5 1.2.5 2 .1l9.1-6Z" />
              <path d="M15.5 10 6.4 4c-.8-.5-1.5-.5-2-.1l8.3 8.8 2.8-2.7Z" />
            </svg>
            <span>{content.playStore}</span>
          </a>
        </section>
        <nav className="home-links" aria-label="Legal links">
          <Link to={language === 'ko' ? '/privacy-policy/ko' : '/privacy-policy'}>
            {content.privacy}
          </Link>
          <Link to={language === 'ko' ? '/terms/ko' : '/terms'}>
            {content.terms}
          </Link>
        </nav>
        <nav className="home-language" aria-label="Language">
          <span>{content.currentLabel}</span>
          <Link to={content.otherPath}>{content.otherLabel}</Link>
        </nav>
      </section>
    </main>
  )
}

export default App
