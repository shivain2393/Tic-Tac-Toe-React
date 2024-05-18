import { useState } from 'react'
import Game from './components/Game'
import GithubButton from './components/GithubButton';
import './App.css'

function App() {

  const[startBtn, setStartBtn] = useState(false);

  return (
    <>
    <div className="container">
      <h1>Tic Tac Toe</h1>
      {!startBtn && <button className='animatedBtn' onClick={() => {setStartBtn(true)}}>Start</button>}
      {startBtn && <Game></Game>}
      <GithubButton/>
    </div>
    </>
  )
}

export default App
