import React from "react"
import Die from "./components/Die.jsx"
import { nanoid } from "nanoid"

export default function App() {
    const [dice, setDice] = React.useState(allNewDice())

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const randomNumbers = []

        for (let i = 0; i < 10; i++) {
          randomNumbers.push(generateNewDie())
        }

        return randomNumbers
    }

    function rollDice() {
        setDice(prevDice =>
            prevDice.map(die => {
                return die.isHeld === false ?
                    generateNewDie() :
                    die
            }))
    }

    function holdDice(id) {
        setDice(prevDice =>
            prevDice.map(die => {
                return die.id === id ?
                    { ...die, isHeld: !die.isHeld } :
                    die
            })
        )
    }

    const diceElements = dice.map(die =>
        <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
    )

    return (
        <main>
            <div className="dice-container">
                {diceElements}
            </div>

            <button className="roll-dice" onClick={rollDice}>Roll</button>
        </main>
    )
}
