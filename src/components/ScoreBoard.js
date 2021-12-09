import React from "react"

const ScoreBoard = ({ score }) => {
    return (
        <div className="score-board">
            <h1>Score is:</h1>
            <h2>{score}</h2>
        </div>
    )
}

export default ScoreBoard