// Credits to https://codepen.io/unindented/pen/QNWdRQ
// Funktion som gör att även om vi slumpar om så ska puzzlet fortfarande va lösbart
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
  
  // Get the linear index from a row/col pair.
  // Här får vi ut index, dvs på rutan du klickat på (inte själva numret utan platsen på spelplanen 0-9) 
  export function getIndex(row, col) {
    return parseInt(row, 10) * 350 + parseInt(col, 10);
  }
  
  // Get the row/col pair from a linear index.
  // Ger oss index på vilken rad och kolumn (returnerar row index och col index)
  export function getMatrixPosition(index) {
    return {
      row: Math.floor(index / 3),
      col: index % 3,
    };
  }
  
  // tar fram vilket positon varje ruta har i pixlar. 
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
        //sorterar rutorna random. 
        .sort(() => Math.random() - 0.5),
      tiles.length - 1,
    ];
    //Kollar så att det går att lösa och ser till att den inte returnerar ett pussel som redan är löst. 
    return isSolvable(shuffledTiles) && !isSolved(shuffledTiles)
      ? shuffledTiles
      //annars (:) shuffla om. 
      : shuffle(shuffledTiles);
  }
  
  //Kollar om kan flytta. 
  export function canSwap(srcIndex, destIndex) {
    const { row: srcRow, col: srcCol } = getMatrixPosition(srcIndex);
    const { row: destRow, col: destCol } = getMatrixPosition(destIndex);
    return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
  }
  

/*   export function updatePosition(tiles, index) {
    //let {positions} = this.state;
    const tilesResult = [...tiles];
  //Letar upp index 8 (tomma rutan) 
    let emptyIndex = tilesResult.indexOf(8);
  //Rutan man klickat på (index)
    let targetIndex = tilesResult.indexOf(index);
    //Räkna ut skillnad mellan vald och aktuell ruta, via index i array (och inte position i rutnätet)
    const dif = Math.abs(targetIndex - emptyIndex);
  //Räknar ut diffen i arrayn, om jämte = 1, eller 3 (en ruta i kolumnen) så sätts nya värden i de två positionerna i arrayn.
    if (dif === 1 || dif === 3) {
      tilesResult[emptyIndex] = index;
  //Flyttar 
        tilesResult[targetIndex] = 8;
        //this.setState({tilesResult});
        return tilesResult;
  //Uppterar positionerna och 
  //2 = om en ifrån på samma rad, 6 = en ifrån kolumn
    } else if (dif === 2 || dif === 6) {
       // const oldTargetIndex = tilesResult[targetIndex];
            tilesResult[emptyIndex] = index;
      //Flyttar 
            tilesResult[targetIndex] = 8;
            //this.setState({tilesResult});
            return tilesResult;
    } else {
      
    }
  } */
  //Funktionen som flyttar rutorna/ pjäserna. 
  export function swap(tiles, src, dest) {
    const tilesResult = [...tiles];
    [tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
    return tilesResult;
  }

  export function swap2(tiles, index) {
    let tilesResult = [...tiles];
    let emptyIndex = tilesResult.indexOf(8);
    let targetIndex = tilesResult.indexOf(index);
    const dif = Math.abs(targetIndex - emptyIndex);
    let indexPosition = getMatrixPosition(targetIndex);
    let emptyPosition = getMatrixPosition(emptyIndex);
    console.log(indexPosition, emptyPosition);
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
