import { useState } from 'react'
import TestApi from './components/TestApi'
import Header from './components/Header'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <h1>ESPN Props Analysis</h1>
        <TestApi />
      </main>
    </div>
  )
}

export default App
