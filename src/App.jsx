import React from "react"
import Die from "./components/Die.jsx"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        let allDiceHeld= true
        let allDiceValue = true
        const firstDieValue = dice[0].value

        dice.forEach(die => {
            if(die.isHeld === false) {
                allDiceHeld = false
            }

            if(die.value !== firstDieValue) {
                allDiceValue = false
            }
        })

        if(allDiceHeld && allDiceValue) {
            setTenzies(true)
        }
    }, [dice])

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
        if(tenzies) {
            setTenzies(false)
            setDice(allNewDice())
        } else {
            setDice(prevDice =>
                prevDice.map(die => {
                    return die.isHeld === false ?
                        generateNewDie() :
                        die
                }))
        }
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
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>

            <button className="roll-dice" onClick={rollDice}>
                {tenzies ? "New Game" : "Roll" }
            </button>
        </main>
    )
}
