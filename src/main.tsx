import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import AuthCallbackPage from './pages/AuthCallbackPage'
import LegalDocumentPage from './pages/LegalDocumentPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import './index.css'

const legalDocuments = {
  privacyKo: {
    title: '개인정보처리방침',
    src: 'https://diamond-ash-1d5.notion.site/ebd//13a9cb56dc39488d9414ffd8dc904f8a',
  },
  privacyEn: {
    title: 'Privacy Policy',
    src: 'https://diamond-ash-1d5.notion.site/ebd//7f82750ed52e434b80422e2e42d4de05',
  },
  termsKo: {
    title: '이용약관',
    src: 'https://diamond-ash-1d5.notion.site/ebd//594235187fd6470481eece7dd6a58a6b',
  },
  termsEn: {
    title: 'Terms of Service',
    src: 'https://diamond-ash-1d5.notion.site/ebd//4317813141044b2092989c358a0b4652',
  },
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/privacy-policy"
          element={<LegalDocumentPage {...legalDocuments.privacyKo} />}
        />
        <Route
          path="/privacy-policy/ko"
          element={<LegalDocumentPage {...legalDocuments.privacyKo} />}
        />
        <Route
          path="/privacy-policy/en"
          element={<LegalDocumentPage {...legalDocuments.privacyEn} />}
        />
        <Route
          path="/terms"
          element={<LegalDocumentPage {...legalDocuments.termsKo} />}
        />
        <Route
          path="/terms/ko"
          element={<LegalDocumentPage {...legalDocuments.termsKo} />}
        />
        <Route
          path="/terms/en"
          element={<LegalDocumentPage {...legalDocuments.termsEn} />}
        />
        <Route path="*" element={<div>잘못된 접근입니다.</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
