import { useState, useMemo } from 'react'

const steps = [
  {
    key: 'feeling',
    label: 'How are you feeling right now?',
    placeholder: 'Describe your emotional state in a few words...'
  },
  {
    key: 'area',
    label: 'What part of your life do you need direction in?',
    placeholder: 'e.g., career, growth, mindset, purpose, relationship, decision-making'
  },
  {
    key: 'challenge',
    label: "What is the main challenge or confusion you're currently facing?",
    placeholder: 'Write it as simply and honestly as you can...'
  },
  {
    key: 'desired_outcome',
    label: 'What outcome or clarity do you hope to receive from this session?',
    placeholder: 'What would feel helpful to know or decide?'
  },
  {
    key: 'action_timeline',
    label: 'How soon do you hope to take action?',
    placeholder: 'e.g., today, this week, soon, not sure'
  }
]

export default function QuestionFlow({ onComplete }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const current = steps[index]
  const progress = useMemo(() => Math.round(((index) / steps.length) * 100), [index])

  const handleNext = async () => {
    if (index < steps.length - 1) {
      setIndex(index + 1)
    } else {
      // submit
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reflections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feeling: answers.feeling || '',
          area: answers.area || '',
          challenge: answers.challenge || '',
          desired_outcome: answers.desired_outcome || '',
          action_timeline: answers.action_timeline || ''
        })
      })
      const data = await res.json()
      onComplete(data)
    }
  }

  return (
    <section className="py-12 px-6 max-w-3xl mx-auto">
      <div className="mb-4">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-400 transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-sm text-gray-600 mt-2">Step {index + 1} of {steps.length}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <p className="text-gray-900 text-lg font-medium">{current.label}</p>
        <textarea
          className="mt-4 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-400 p-4 min-h-[140px]"
          placeholder={current.placeholder}
          value={answers[current.key] || ''}
          onChange={(e) => setAnswers({ ...answers, [current.key]: e.target.value })}
        />

        <div className="mt-6 flex items-center justify-between">
          <button
            className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-800 disabled:opacity-40"
            onClick={() => setIndex(Math.max(0, index - 1))}
            disabled={index === 0}
          >
            Back
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
            onClick={handleNext}
          >
            {index < steps.length - 1 ? 'Next' : 'See my Direction Summary'}
          </button>
        </div>
      </div>
    </section>
  )
}
