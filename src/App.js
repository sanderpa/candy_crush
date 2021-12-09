import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ScoreBoard from "./components/ScoreBoard";
import Red from './img/red.png';
import Blue from './img/blue.png';
import Yellow from './img/yellow.png';
import Green from './img/green.png';
import Orange from './img/orange.png';
import Purple from './img/purple.png';
import Blank from './img/blank.png';

const width = 8;
const colorsOfCandies = [
  Red,
  Blue,
  Yellow,
  Green,
  Orange,
  Purple
]

/* eslint-disable */
const App = () => {
  const [currentColorArea, setCurrentColorArea] = useState ([]);
  const [squareBeingDragged, setSquereBeingDragged] = useState (null);
  const [squareBeingReplaced, setSquereBeingReplaced] = useState (null);
  const [scoreDisplay, setScoreDisplay] = useState(0);
  

  const checkOfColumnForThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnForThree = [i, i + width, i + width * 2];
      const desidedColor = currentColorArea[i];
      const isBlank = currentColorArea[i] === Blank;

      if (columnForThree.every(square => currentColorArea[square] === desidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3);
        columnForThree.forEach(square => currentColorArea[square] =  Blank);
        return true;
      };
    }
  }

  
  const checkOfRowForThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowForThree = [i, i + 1, i + 2];
      const desidedColor = currentColorArea[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];
      const isBlank = currentColorArea[i] === Blank;

      if (notValid.includes(i)) continue;
      
      if (rowForThree.every(square => currentColorArea[square] === desidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3);
        rowForThree.forEach(square => currentColorArea[square] =  Blank);
        return true;
      };
    }
  }

  const checkOfColumnForFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnForFour = [i, i + width, i + width * 2, i + width * 3];
      const desidedColor = currentColorArea[i];
      const isBlank = currentColorArea[i] === Blank;

      if (columnForFour.every(square => currentColorArea[square] === desidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4);
        columnForFour.forEach(square => currentColorArea[square] =  Blank);
        return true;
      };
    }
  }

  const checkOfRowForFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowForFour = [i, i + 1, i + 2, i + 3];
      const desidedColor = currentColorArea[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
      const isBlank = currentColorArea[i] === Blank;

      if (notValid.includes(i)) continue;
      
      if (rowForFour.every(square => currentColorArea[square] === desidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4);
        rowForFour.forEach(square => currentColorArea[square] =  Blank);
        return true;
      };
    }
  }

  const moveSquereBelove = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArea[i] === Blank) {
        let randomColour = Math.floor(Math.random() * colorsOfCandies.length);
        currentColorArea[i] = colorsOfCandies[randomColour];
      };
      
      if ((currentColorArea[i + width]) === Blank) {
        currentColorArea[i + width] = currentColorArea[i];
        currentColorArea[i] = Blank;
      };
    };
  }

  const dragStart = (e) => {
    setSquereBeingDragged(e.target);
  }

  const dragDrop = (e) => {
    setSquereBeingReplaced(e.target);
  }

  const dragEnd = (e) => {

    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'));
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'));

    currentColorArea[squareBeingReplacedId] = squareBeingDragged.getAttribute('src'); 
    currentColorArea[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src'); 

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnForFour = checkOfColumnForFour();
    const isARowForFour = checkOfRowForFour();
    const isAColumnForThree = checkOfColumnForThree();
    const isARowForThree = checkOfRowForThree();

    if (squareBeingReplacedId && validMove && (isAColumnForFour || isARowForFour || isAColumnForThree || isARowForThree)) {
      setSquereBeingDragged(null);
    } else {
      currentColorArea[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src');
      currentColorArea[squareBeingDraggedId] = squareBeingDragged.getAttribute('src');
      setCurrentColorArea([...currentColorArea]);
    }
  }

  const createField = () => {
    let randomColorArea = [];
    for (let i = 0; i < width * width; i++) {
      let randomColor = colorsOfCandies[Math.floor(Math.random() * colorsOfCandies.length)];
      randomColorArea.push(randomColor);
    }
    setCurrentColorArea(randomColorArea);
  }

  useEffect(() => {
    createField();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkOfColumnForFour();
      checkOfRowForFour();
      checkOfColumnForThree();
      checkOfRowForThree();
      moveSquereBelove();
      setCurrentColorArea([...currentColorArea]);
    }, 50);
    return () => (clearInterval(timer));

  }, [checkOfColumnForFour, checkOfRowForFour, checkOfColumnForThree, checkOfRowForThree, moveSquereBelove, currentColorArea]);

  return (
    <div className="app">
      <div className="title">Candy Crush</div>
      <div className="game">
        {currentColorArea.map((colorsOfCandies, index) => (
          <img 
              key={index}
              src={colorsOfCandies}
              alt={colorsOfCandies}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) =>  e.preventDefault()}
              onDragEnter={(e) =>  e.preventDefault()}
              onDragLeave={(e) =>  e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
          />
        ))}

      </div>
      <ScoreBoard score = {scoreDisplay}/>
    </div>
  );
}

export default App;
