import { Link } from 'react-router-dom'
import baybooLogo from './assets/bayboo-logo.png'
import './App.css'

type AppProps = {
  language: 'en' | 'ko'
}

const homeContent = {
  en: {
    eyebrow: 'Bayboo AI',
    copy: 'A warm AI experience for children and families is coming soon.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    currentLabel: 'English',
    otherLabel: '한국어',
    otherPath: '/ko',
  },
  ko: {
    eyebrow: 'Bayboo AI',
    copy: '아이와 가족을 위한 따뜻한 AI 경험을 준비하고 있습니다.',
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
