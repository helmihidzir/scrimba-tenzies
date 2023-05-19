import React from "react"
import Die from "./components/Die.jsx"

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())

  function allNewDice() {
    const randomNumbers = [];

    for (let i = 0; i < 10; i++) {
      randomNumbers.push(Math.ceil(Math.random() * 6))
    }

    return randomNumbers
  }
  function rollDice() {
    setDice(allNewDice())
  }

  const diceElements = dice.map(die => <Die value={die} />)

  return (
    <main>
      <div className="dice-container">
        {diceElements}
      </div>

      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  )
}
