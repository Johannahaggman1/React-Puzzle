// Funktion som gör att pusslet går att lösa även om vi slumpar om. 
export function isSolvable(tiles) {
    let product = 1;
    for (let i = 1, l = 9 - 1; i <= l; i++) {
      for (let j = i + 1, m = l + 1; j <= m; j++) {
        product *= (tiles[i - 1] - tiles[j - 1]) / (i - j);
      }
    }
    return Math.round(product) === 1;
  }
  
  //Kollar om puzzlet är löst. 
  export function isSolved(tiles) {
    for (let i = 0, l = tiles.length; i < l; i++) {
      if (tiles[i] !== i) {
        return false;
      }
    }
    return true;
  }
  
  //index på klickad ruta
  export function getIndex(row, col) {
    return parseInt(row, 10) * 350 + parseInt(col, 10);
  }
  
  // Ger oss index på vilken rad och kolumn (returnerar row index + col index)
  export function getMatrixPosition(index) {
    return {
      row: Math.floor(index / 3),
      col: index % 3,
    };
  }
  
  // tar fram vilket positon varje ruta har i pixlar
  export function getVisualPosition(row, col, width, height) {
    return {
      x: col * width,
      y: row * height,
    };
  }
  
  //Blanda om nummerordningen
  export function shuffle(tiles) {
    const shuffledTiles = [
      ...tiles
        .filter((t) => t !== tiles.length - 1)
        .sort(() => Math.random() - 0.5),
      tiles.length - 1,
    ];
    return isSolvable(shuffledTiles) && !isSolved(shuffledTiles)
      ? shuffledTiles
      : shuffle(shuffledTiles);
  }

  //Funktion för att byta plats på pjäser
  export function swap(tiles, index) {
    let tilesResult = [...tiles];
    let emptyIndex = tilesResult.indexOf(8);
    let targetIndex = tilesResult.indexOf(index);
    const dif = Math.abs(targetIndex - emptyIndex);
    let indexPosition = getMatrixPosition(targetIndex);
    let emptyPosition = getMatrixPosition(emptyIndex);
    if (indexPosition.col === emptyPosition.col || indexPosition.row === emptyPosition.row) {
      if (dif === 1 || dif === 3) {
        tilesResult[emptyIndex] = index;
        tilesResult[targetIndex] = 8;
      }
      if (dif === 2 || dif === 6) {
        const middleIndex = Math.round((targetIndex + emptyIndex)/2);
        const middleValue = tilesResult[middleIndex];
        tilesResult[emptyIndex] = middleValue;
        tilesResult[middleIndex] = index;
        tilesResult[targetIndex] = 8;
      }
    }
    return tilesResult;
  }
