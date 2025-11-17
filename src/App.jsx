import { useState } from 'react'
import Hero from './components/Hero'
import QuestionFlow from './components/QuestionFlow'
import Summary from './components/Summary'

function App() {
  const [stage, setStage] = useState('home') // home | flow | summary
  const [result, setResult] = useState(null)

  const handleComplete = (data) => {
    setResult(data)
    setStage('summary')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const exportFile = async (fmt) => {
    if (!result?.id) return
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/reflections/${result.id}/export?format=${fmt}`
    const res = await fetch(url)
    const blob = await res.blob()
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `direction-summary.${fmt === 'xlsx' ? 'xlsx' : 'pdf'}`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const sendEmail = async () => {
    const email = prompt('Where should we send your summary?')
    if (!email || !result?.id) return
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reflections/${result.id}/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    alert('If this were a production environment, your summary would be on its way!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      {stage === 'home' && (
        <>
          <Hero onStart={() => setStage('flow')} />
          <section className="px-6 py-12 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold">A short, gentle journey</h2>
            <p className="text-gray-600 mt-2">Simple, conversational prompts help you uncover what matters and where to begin. Your answers create a clear summary you can keep or share.</p>
          </section>
        </>
      )}

      {stage === 'flow' && (
        <QuestionFlow onComplete={handleComplete} />
      )}

      {stage === 'summary' && (
        <Summary
          payload={result}
          onExportPDF={() => exportFile('pdf')}
          onExportXLSX={() => exportFile('xlsx')}
          onSendEmail={sendEmail}
        />
      )}

      <footer className="py-8 text-center text-sm text-gray-500">Made with a calm, supportive spirit.</footer>
    </div>
  )
}

export default App
