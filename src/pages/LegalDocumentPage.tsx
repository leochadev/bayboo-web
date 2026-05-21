import './LegalDocumentPage.css'

type LegalDocumentPageProps = {
  title: string
  src: string
}

export default function LegalDocumentPage({ title, src }: LegalDocumentPageProps) {
  return (
    <main className="legal-page">
      <iframe className="legal-frame" src={src} title={title} allowFullScreen />
    </main>
  )
}
