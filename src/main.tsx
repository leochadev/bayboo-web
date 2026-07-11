import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import AuthCallbackPage from './pages/AuthCallbackPage'
import LegalDocumentPage from './pages/LegalDocumentPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import privacyEn from './legal/privacy.en.md?raw'
import privacyKo from './legal/privacy.ko.md?raw'
import termsEn from './legal/terms.en.md?raw'
import termsKo from './legal/terms.ko.md?raw'
import './index.css'

const legalDocuments = {
  privacyKo: {
    title: '개인정보처리방침',
    markdown: privacyKo,
  },
  privacyEn: {
    title: 'Privacy Policy',
    markdown: privacyEn,
  },
  termsKo: {
    title: '이용약관',
    markdown: termsKo,
  },
  termsEn: {
    title: 'Terms of Service',
    markdown: termsEn,
  },
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App language="en" />} />
        <Route path="/en" element={<App language="en" />} />
        <Route path="/ko" element={<App language="ko" />} />
        <Route path="/auth/callback" element={<AuthCallbackPage language="en" />} />
        <Route path="/auth/callback/en" element={<AuthCallbackPage language="en" />} />
        <Route path="/auth/callback/ko" element={<AuthCallbackPage language="ko" />} />
        <Route path="/reset-password" element={<ResetPasswordPage language="en" />} />
        <Route path="/reset-password/en" element={<ResetPasswordPage language="en" />} />
        <Route path="/reset-password/ko" element={<ResetPasswordPage language="ko" />} />
        <Route
          path="/privacy-policy"
          element={<LegalDocumentPage {...legalDocuments.privacyEn} />}
        />
        <Route
          path="/privacy-policy/en"
          element={<LegalDocumentPage {...legalDocuments.privacyEn} />}
        />
        <Route
          path="/privacy-policy/ko"
          element={<LegalDocumentPage {...legalDocuments.privacyKo} />}
        />
        <Route
          path="/terms"
          element={<LegalDocumentPage {...legalDocuments.termsEn} />}
        />
        <Route
          path="/terms/en"
          element={<LegalDocumentPage {...legalDocuments.termsEn} />}
        />
        <Route
          path="/terms/ko"
          element={<LegalDocumentPage {...legalDocuments.termsKo} />}
        />
        <Route path="*" element={<div>Page not found.</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
