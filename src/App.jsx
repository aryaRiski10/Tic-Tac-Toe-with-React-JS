import { useState } from 'react'
import './App.css'

function Square({ value, onSquareClick }) {

  return (
    <button className="square" onClick={onSquareClick}>{value}</button >
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return false
}

export default function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), player: null, squareIndex: null }])
  const [xIsNext, setXIsNext] = useState(true)

  const currentSquares = history[history.length - 1].squares

  function handleClick(i) {
    if (currentSquares[i] || calculateWinner(currentSquares)) return

    const nextSquares = currentSquares.slice()
    const player = xIsNext ? 'X' : 'O'
    nextSquares[i] = player
    setXIsNext(!xIsNext)
    setHistory([...history, { squares: nextSquares, player, squareIndex: i }])
  }

  function resetGame() {
    setHistory([{ squares: Array(9).fill(null), player: null, squareIndex: null }])
    setXIsNext(true)
  }

  const winner = calculateWinner(currentSquares)
  let status = ''
  if (winner) {
    status = `The winner is ${winner}`
  } else if (!currentSquares.includes(null)) {
    status = `It's a draw!`
  } else {
    status = `Next player is ${xIsNext ? 'X' : 'O'}`
  }

  const moves = history.slice(1).map((step, move) => (
    <li key={move}>
      {`Move ${move + 1}: Player ${step.player} on square ${step.squareIndex + 1}`}
    </li>
  ))

  return (
    <div className="game">
      <div className='game-board'>
        <div className="statusWinner">{status}</div>
        <div className="board">
          {currentSquares.map((square, i) => {
            return <Square key={i} value={currentSquares[i]} onSquareClick={() => handleClick(i)} />
          })}
        </div>
        <button className='reset-btn' onClick={resetGame}>Reset Game</button>
      </div>

      <div className='game-info'>
        <h3 style={{ margin: 0 }}>Moveset</h3>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
