import baybooLogo from './assets/bayboo-logo.png'
import './App.css'

function App() {
  return (
    <main className="home-page">
      <section className="home-content">
        <img className="home-logo" src={baybooLogo} alt="Bayboo AI" />
        <h1 className="home-title">Bayboo AI</h1>
        <p className="home-copy">아이와 가족을 위한 따뜻한 AI 경험을 준비하고 있습니다.</p>
        <nav className="home-links" aria-label="Legal links">
          <a href="/privacy-policy">개인정보처리방침</a>
          <a href="/terms">이용약관</a>
        </nav>
      </section>
    </main>
  )
}

export default App
