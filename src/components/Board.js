import React, { useState } from "react";
import Tile from "./Tile";
import { shuffle, isSolved, swap } from "../units/gameLogic";

function Board() {
  // 9 = rutor i spelet 
  //tom array, lägger in 9 nummer och sprider ut. 
  const [tiles, setTiles] = useState([...Array(9).keys()]);  
  const [isStarted, setIsStarted] = useState(false);


  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles)
    setTiles(shuffledTiles);
  }

  const swapTiles = (tileIndex) => {
    //if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(tiles, tiles[tileIndex] )
      setTiles(swappedTiles)
    //}
  }

  // Hanterar själva swap klicket och kallar på swapTiles funktionen
  const handleTileClick = (index) => {
    swapTiles(index)
  }

  //Funktion för att starta OM spelet = shuffle om bitarna. 
  const handleShuffleClick = () => {
    shuffleTiles()
  }

  //Funktion för att starta spelet + shuffla om bitarna.
  const handleStartClick = () => {
    shuffleTiles()
    setIsStarted(true)
  }

  //350 = spelets storlek , delat på 3 = rutor per rad. 
  const pieceWidth = Math.round(350 / 3);
  const pieceHeight = Math.round(350 / 3);
  const style = {
    width: 350,
    height: 350,
  };
  const hasWon = isSolved(tiles)

  return (
    <>
      {isStarted ?
      <>
      <ul style={style} className="board-wrapper">
        {tiles.map((tile, index) => (
          <Tile
            key={tile}
            index={index}
            tile={tile}
            width={pieceWidth}
            height={pieceHeight}
            handleTileClick={handleTileClick}
          />
        ))}
      </ul>
      <button onClick={() => handleShuffleClick()}>Slumpa om</button>
      </>
      : 
      <div className="start-wrapper">
        <h3>Redo? </h3>
        <button onClick={() => handleStartClick()}>Starta</button> 
      </div>}
      {hasWon && isStarted && <div>Vilket geni, du löste det </div>}
    </>
  );
}

export default Board;