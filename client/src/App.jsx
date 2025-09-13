import { useState } from 'react'
import './App.css'
import Header from "./components/header"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div>
        hello guys
      </div>
    </>
  )
}

export default App
