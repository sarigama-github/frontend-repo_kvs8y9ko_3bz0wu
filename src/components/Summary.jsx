export default function Summary({ payload, onExportPDF, onExportXLSX, onSendEmail }) {
  const { id, summary } = payload || {}
  const items = [
    { label: 'Feeling', value: summary?.feeling },
    { label: 'Area', value: summary?.area },
    { label: 'Challenge', value: summary?.challenge },
    { label: 'Desired Outcome', value: summary?.desired_outcome },
    { label: 'Action Timeline', value: summary?.action_timeline },
    { label: 'Distilled', value: summary?.distilled },
    { label: 'Guidance', value: (summary?.guidance || []).map((g, i) => `• ${g}`).join('\n') },
    { label: 'Message', value: summary?.message },
  ]

  return (
    <section className="py-12 px-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-2xl font-semibold tracking-tight">Your Direction Summary</h2>
        <p className="text-gray-600 mt-2">A simple interpretation of your responses with gentle guidance.</p>

        <div className="mt-6 space-y-4">
          {items.map(({ label, value }) => (
            <div key={label}>
              <p className="text-sm text-gray-500 uppercase tracking-wider">{label}</p>
              <pre className="whitespace-pre-wrap text-gray-900 bg-gray-50 rounded-lg p-3 mt-1">{value || '—'}</pre>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button onClick={onExportPDF} className="w-full bg-black text-white rounded-lg py-3 hover:bg-gray-800">Download PDF</button>
          <button onClick={onExportXLSX} className="w-full bg-gray-900 text-white rounded-lg py-3 hover:bg-black">Download Excel</button>
          <button onClick={onSendEmail} className="w-full bg-yellow-400 text-black rounded-lg py-3 hover:bg-yellow-300">Send to Email</button>
        </div>

        <p className="text-xs text-gray-500 mt-3">We generate files on the fly. Email sending is simulated in this environment.</p>
      </div>
    </section>
  )
}
