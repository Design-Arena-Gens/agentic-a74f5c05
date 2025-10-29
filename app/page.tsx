'use client'

import { useState } from 'react'

interface Language {
  id: string
  name: string
  flag: string
  nativeName: string
}

interface Lesson {
  id: string
  title: string
  description: string
  icon: string
}

interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

interface VocabWord {
  word: string
  translation: string
  example: string
}

const languages: Language[] = [
  { id: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { id: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { id: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  { id: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
  { id: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
  { id: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
]

const lessons: Record<string, Lesson[]> = {
  es: [
    { id: 'basics', title: 'Basic Phrases', description: 'Learn essential greetings and common expressions', icon: '👋' },
    { id: 'numbers', title: 'Numbers', description: 'Count from 0 to 100 in Spanish', icon: '🔢' },
    { id: 'food', title: 'Food & Dining', description: 'Order food and talk about meals', icon: '🍽️' },
    { id: 'travel', title: 'Travel', description: 'Navigate and ask for directions', icon: '✈️' },
  ],
  fr: [
    { id: 'basics', title: 'Basic Phrases', description: 'Essential French greetings and expressions', icon: '👋' },
    { id: 'numbers', title: 'Numbers', description: 'French counting and numerals', icon: '🔢' },
    { id: 'food', title: 'Food & Dining', description: 'French cuisine vocabulary', icon: '🍽️' },
    { id: 'travel', title: 'Travel', description: 'Getting around in France', icon: '✈️' },
  ],
  de: [
    { id: 'basics', title: 'Basic Phrases', description: 'Common German greetings', icon: '👋' },
    { id: 'numbers', title: 'Numbers', description: 'German numbers and counting', icon: '🔢' },
    { id: 'food', title: 'Food & Dining', description: 'German food vocabulary', icon: '🍽️' },
    { id: 'travel', title: 'Travel', description: 'Travel German essentials', icon: '✈️' },
  ],
  it: [
    { id: 'basics', title: 'Basic Phrases', description: 'Italian greetings and basics', icon: '👋' },
    { id: 'numbers', title: 'Numbers', description: 'Italian counting system', icon: '🔢' },
    { id: 'food', title: 'Food & Dining', description: 'Italian culinary terms', icon: '🍽️' },
    { id: 'travel', title: 'Travel', description: 'Travel in Italy', icon: '✈️' },
  ],
  pt: [
    { id: 'basics', title: 'Basic Phrases', description: 'Portuguese greetings', icon: '👋' },
    { id: 'numbers', title: 'Numbers', description: 'Portuguese numbers', icon: '🔢' },
    { id: 'food', title: 'Food & Dining', description: 'Portuguese food terms', icon: '🍽️' },
    { id: 'travel', title: 'Travel', description: 'Travel Portuguese', icon: '✈️' },
  ],
  ja: [
    { id: 'basics', title: 'Basic Phrases', description: 'Japanese greetings and basics', icon: '👋' },
    { id: 'hiragana', title: 'Hiragana', description: 'Learn the hiragana alphabet', icon: '✏️' },
    { id: 'food', title: 'Food & Dining', description: 'Japanese food vocabulary', icon: '🍽️' },
    { id: 'travel', title: 'Travel', description: 'Navigate Japan', icon: '✈️' },
  ],
}

const quizData: Record<string, Record<string, Question[]>> = {
  es: {
    basics: [
      {
        question: 'How do you say "Hello" in Spanish?',
        options: ['Adiós', 'Hola', 'Gracias', 'Por favor'],
        correctAnswer: 1,
      },
      {
        question: 'What does "Gracias" mean?',
        options: ['Please', 'Thank you', 'Sorry', 'Goodbye'],
        correctAnswer: 1,
      },
      {
        question: 'How do you say "Good morning"?',
        options: ['Buenas noches', 'Buenas tardes', 'Buenos días', 'Hasta luego'],
        correctAnswer: 2,
      },
      {
        question: 'What is "Please" in Spanish?',
        options: ['Perdón', 'Por favor', 'De nada', 'Mucho gusto'],
        correctAnswer: 1,
      },
      {
        question: 'How do you say "Goodbye"?',
        options: ['Hola', 'Buenos días', 'Adiós', 'Gracias'],
        correctAnswer: 2,
      },
    ],
    numbers: [
      {
        question: 'What is "Five" in Spanish?',
        options: ['Cuatro', 'Cinco', 'Seis', 'Siete'],
        correctAnswer: 1,
      },
      {
        question: 'How do you say "Ten"?',
        options: ['Nueve', 'Ocho', 'Diez', 'Once'],
        correctAnswer: 2,
      },
      {
        question: 'What number is "Veinte"?',
        options: ['15', '20', '25', '30'],
        correctAnswer: 1,
      },
    ],
  },
  fr: {
    basics: [
      {
        question: 'How do you say "Hello" in French?',
        options: ['Au revoir', 'Bonjour', 'Merci', "S'il vous plaît"],
        correctAnswer: 1,
      },
      {
        question: 'What does "Merci" mean?',
        options: ['Please', 'Thank you', 'Sorry', 'Goodbye'],
        correctAnswer: 1,
      },
      {
        question: 'How do you say "Please"?',
        options: ['Pardon', "S'il vous plaît", 'De rien', 'Enchanté'],
        correctAnswer: 1,
      },
    ],
  },
  de: {
    basics: [
      {
        question: 'How do you say "Hello" in German?',
        options: ['Auf Wiedersehen', 'Hallo', 'Danke', 'Bitte'],
        correctAnswer: 1,
      },
      {
        question: 'What does "Danke" mean?',
        options: ['Please', 'Thank you', 'Sorry', 'Goodbye'],
        correctAnswer: 1,
      },
      {
        question: 'How do you say "Good morning"?',
        options: ['Gute Nacht', 'Guten Abend', 'Guten Morgen', 'Tschüss'],
        correctAnswer: 2,
      },
    ],
  },
  it: {
    basics: [
      {
        question: 'How do you say "Hello" in Italian?',
        options: ['Arrivederci', 'Ciao', 'Grazie', 'Prego'],
        correctAnswer: 1,
      },
      {
        question: 'What does "Grazie" mean?',
        options: ['Please', 'Thank you', 'Sorry', 'Goodbye'],
        correctAnswer: 1,
      },
    ],
  },
  pt: {
    basics: [
      {
        question: 'How do you say "Hello" in Portuguese?',
        options: ['Tchau', 'Olá', 'Obrigado', 'Por favor'],
        correctAnswer: 1,
      },
      {
        question: 'What does "Obrigado" mean?',
        options: ['Please', 'Thank you', 'Sorry', 'Goodbye'],
        correctAnswer: 1,
      },
    ],
  },
  ja: {
    basics: [
      {
        question: 'How do you say "Hello" in Japanese?',
        options: ['Sayonara', 'Konnichiwa', 'Arigatou', 'Sumimasen'],
        correctAnswer: 1,
      },
      {
        question: 'What does "Arigatou" mean?',
        options: ['Please', 'Thank you', 'Sorry', 'Goodbye'],
        correctAnswer: 1,
      },
    ],
  },
}

const vocabularyData: Record<string, Record<string, VocabWord[]>> = {
  es: {
    basics: [
      { word: 'Hola', translation: 'Hello', example: 'Hola, ¿cómo estás?' },
      { word: 'Adiós', translation: 'Goodbye', example: 'Adiós, hasta mañana' },
      { word: 'Gracias', translation: 'Thank you', example: 'Gracias por tu ayuda' },
      { word: 'Por favor', translation: 'Please', example: 'Un café, por favor' },
      { word: 'Sí', translation: 'Yes', example: 'Sí, me gusta' },
      { word: 'No', translation: 'No', example: 'No, gracias' },
      { word: 'Buenos días', translation: 'Good morning', example: 'Buenos días, señor' },
      { word: 'Buenas tardes', translation: 'Good afternoon', example: 'Buenas tardes' },
      { word: 'Buenas noches', translation: 'Good night', example: 'Buenas noches, hasta mañana' },
      { word: '¿Cómo estás?', translation: 'How are you?', example: 'Hola, ¿cómo estás?' },
    ],
    food: [
      { word: 'Comida', translation: 'Food', example: 'Me gusta la comida mexicana' },
      { word: 'Agua', translation: 'Water', example: 'Un vaso de agua, por favor' },
      { word: 'Pan', translation: 'Bread', example: 'El pan está delicioso' },
      { word: 'Carne', translation: 'Meat', example: 'No como carne' },
      { word: 'Pescado', translation: 'Fish', example: 'El pescado está fresco' },
    ],
  },
  fr: {
    basics: [
      { word: 'Bonjour', translation: 'Hello', example: 'Bonjour, comment allez-vous?' },
      { word: 'Au revoir', translation: 'Goodbye', example: 'Au revoir, à bientôt' },
      { word: 'Merci', translation: 'Thank you', example: "Merci beaucoup pour votre aide" },
      { word: "S'il vous plaît", translation: 'Please', example: "Un café, s'il vous plaît" },
      { word: 'Oui', translation: 'Yes', example: "Oui, j'aime ça" },
      { word: 'Non', translation: 'No', example: 'Non, merci' },
    ],
  },
}

const flashcardData: Record<string, Record<string, Array<{ word: string; translation: string }>>> = {
  es: {
    basics: [
      { word: 'Hola', translation: 'Hello' },
      { word: 'Adiós', translation: 'Goodbye' },
      { word: 'Gracias', translation: 'Thank you' },
      { word: 'Por favor', translation: 'Please' },
      { word: '¿Cómo estás?', translation: 'How are you?' },
      { word: 'Buenos días', translation: 'Good morning' },
      { word: 'Buenas noches', translation: 'Good night' },
      { word: 'Lo siento', translation: "I'm sorry" },
      { word: 'De nada', translation: "You're welcome" },
      { word: 'Hasta luego', translation: 'See you later' },
    ],
  },
  fr: {
    basics: [
      { word: 'Bonjour', translation: 'Hello' },
      { word: 'Au revoir', translation: 'Goodbye' },
      { word: 'Merci', translation: 'Thank you' },
      { word: "S'il vous plaît", translation: 'Please' },
      { word: 'Comment allez-vous?', translation: 'How are you?' },
      { word: 'Pardon', translation: 'Excuse me' },
    ],
  },
}

export default function Home() {
  const [view, setView] = useState<'home' | 'lessons' | 'quiz' | 'flashcards' | 'vocabulary'>('home')
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [flashcardIndex, setFlashcardIndex] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)

  const handleLanguageSelect = (langId: string) => {
    setSelectedLanguage(langId)
    setView('lessons')
  }

  const handleLessonSelect = (lessonId: string, type: 'quiz' | 'flashcards' | 'vocabulary') => {
    setSelectedLesson(lessonId)
    setView(type)
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
    setFlashcardIndex(0)
    setShowTranslation(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answerIndex)
    const questions = quizData[selectedLanguage!]?.[selectedLesson!] || []

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }, 1500)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
  }

  const nextFlashcard = () => {
    const cards = flashcardData[selectedLanguage!]?.[selectedLesson!] || []
    setFlashcardIndex((flashcardIndex + 1) % cards.length)
    setShowTranslation(false)
  }

  const prevFlashcard = () => {
    const cards = flashcardData[selectedLanguage!]?.[selectedLesson!] || []
    setFlashcardIndex((flashcardIndex - 1 + cards.length) % cards.length)
    setShowTranslation(false)
  }

  const goBack = () => {
    if (view === 'lessons') {
      setView('home')
      setSelectedLanguage(null)
    } else {
      setView('lessons')
      setSelectedLesson(null)
    }
  }

  const renderHome = () => (
    <>
      <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: '#333', textAlign: 'center' }}>
        Choose a Language
      </h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
        Start your language learning journey today
      </p>
      <div className="language-grid">
        {languages.map((lang) => (
          <button
            key={lang.id}
            className="language-card"
            onClick={() => handleLanguageSelect(lang.id)}
          >
            <div className="flag">{lang.flag}</div>
            <h3>{lang.name}</h3>
            <p style={{ opacity: 0.9 }}>{lang.nativeName}</p>
          </button>
        ))}
      </div>
    </>
  )

  const renderLessons = () => {
    const lang = languages.find((l) => l.id === selectedLanguage)
    const langLessons = lessons[selectedLanguage!] || []

    return (
      <>
        <button className="back-btn" onClick={goBack}>
          ← Back
        </button>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: '#333' }}>
          {lang?.flag} {lang?.name} Lessons
        </h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Choose a lesson to start learning
        </p>
        <div className="lesson-list">
          {langLessons.map((lesson) => (
            <div key={lesson.id}>
              <div
                className="lesson-item"
                style={{ marginBottom: '10px' }}
              >
                <div className="lesson-icon">{lesson.icon}</div>
                <div className="lesson-info">
                  <h3>{lesson.title}</h3>
                  <p>{lesson.description}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginLeft: '60px', marginBottom: '10px' }}>
                {quizData[selectedLanguage!]?.[lesson.id] && (
                  <button
                    className="btn"
                    style={{ fontSize: '0.9rem', padding: '8px 16px' }}
                    onClick={() => handleLessonSelect(lesson.id, 'quiz')}
                  >
                    📝 Take Quiz
                  </button>
                )}
                {flashcardData[selectedLanguage!]?.[lesson.id] && (
                  <button
                    className="btn"
                    style={{ fontSize: '0.9rem', padding: '8px 16px' }}
                    onClick={() => handleLessonSelect(lesson.id, 'flashcards')}
                  >
                    🎴 Flashcards
                  </button>
                )}
                {vocabularyData[selectedLanguage!]?.[lesson.id] && (
                  <button
                    className="btn"
                    style={{ fontSize: '0.9rem', padding: '8px 16px' }}
                    onClick={() => handleLessonSelect(lesson.id, 'vocabulary')}
                  >
                    📚 Vocabulary
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }

  const renderQuiz = () => {
    const questions = quizData[selectedLanguage!]?.[selectedLesson!] || []
    const question = questions[currentQuestion]

    if (showResult) {
      const percentage = Math.round((score / questions.length) * 100)
      return (
        <div className="quiz-container">
          <button className="back-btn" onClick={goBack}>
            ← Back to Lessons
          </button>
          <div className="result-container">
            <h2>Quiz Complete! 🎉</h2>
            <div className="score">{percentage}%</div>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
              You got {score} out of {questions.length} questions correct
            </p>
            <div className="controls">
              <button className="btn" onClick={resetQuiz}>
                Try Again
              </button>
              <button className="btn btn-secondary" onClick={goBack}>
                Back to Lessons
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="quiz-container">
        <button className="back-btn" onClick={goBack}>
          ← Back to Lessons
        </button>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="question-card">
          <div className="question-number">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <div className="question-text">{question.question}</div>
          <div className="answer-options">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`answer-btn ${
                  selectedAnswer === index
                    ? index === question.correctAnswer
                      ? 'correct'
                      : 'incorrect'
                    : selectedAnswer !== null && index === question.correctAnswer
                    ? 'correct'
                    : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="stats">
          <div className="stat-card">
            <div className="stat-value">{score}</div>
            <div className="stat-label">Correct</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{currentQuestion}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>
      </div>
    )
  }

  const renderFlashcards = () => {
    const cards = flashcardData[selectedLanguage!]?.[selectedLesson!] || []
    const card = cards[flashcardIndex]

    if (!card) {
      return (
        <div>
          <button className="back-btn" onClick={goBack}>
            ← Back to Lessons
          </button>
          <p style={{ textAlign: 'center', color: '#666' }}>
            No flashcards available for this lesson yet.
          </p>
        </div>
      )
    }

    return (
      <>
        <button className="back-btn" onClick={goBack}>
          ← Back to Lessons
        </button>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: '#333', textAlign: 'center' }}>
          Flashcards
        </h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
          Card {flashcardIndex + 1} of {cards.length}
        </p>
        <div className="flashcard" onClick={() => setShowTranslation(!showTranslation)}>
          <div className="word">{card.word}</div>
          {showTranslation && <div className="translation">{card.translation}</div>}
        </div>
        <div className="flashcard-hint">Click to reveal translation</div>
        <div className="controls">
          <button className="btn btn-secondary" onClick={prevFlashcard}>
            ← Previous
          </button>
          <button className="btn" onClick={nextFlashcard}>
            Next →
          </button>
        </div>
      </>
    )
  }

  const renderVocabulary = () => {
    const vocab = vocabularyData[selectedLanguage!]?.[selectedLesson!] || []

    return (
      <>
        <button className="back-btn" onClick={goBack}>
          ← Back to Lessons
        </button>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: '#333' }}>
          Vocabulary List
        </h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          {vocab.length} words to learn
        </p>
        <div className="vocabulary-grid">
          {vocab.map((item, index) => (
            <div key={index} className="vocab-card">
              <div className="vocab-word">{item.word}</div>
              <div className="vocab-translation">{item.translation}</div>
              <div className="vocab-example">{item.example}</div>
            </div>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🌍 Language Learning App</h1>
        <p>Master new languages through interactive lessons and exercises</p>
      </div>

      <div className="content">
        {view === 'home' && renderHome()}
        {view === 'lessons' && renderLessons()}
        {view === 'quiz' && renderQuiz()}
        {view === 'flashcards' && renderFlashcards()}
        {view === 'vocabulary' && renderVocabulary()}
      </div>
    </div>
  )
}
