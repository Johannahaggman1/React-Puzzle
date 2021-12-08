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

  export function swap(tiles, index) {
    let tilesResult = [...tiles];
    //lediga luckan
    let emptyIndex = tilesResult.indexOf(8);
    //Klickade rutan
    let targetIndex = tilesResult.indexOf(index);
    //Avståndet mellan lediga luckan och klickade luckan 
    const dif = Math.abs(targetIndex - emptyIndex);
    //Få raden och kolumen för den klickade rutan
    let indexPosition = getMatrixPosition(targetIndex);
    //Få raden och kolumnen för den tomma rutan 
    let emptyPosition = getMatrixPosition(emptyIndex);
    //Om klickade rutans kolumn index = tomma rutans kolumn index, eller klickade rutans rad index = tomma rutans rad index
    if (indexPosition.col === emptyPosition.col || indexPosition.row === emptyPosition.row) {
      //Om diffen är 1 eller 3 så är klickade och tomma brevid varanda och vi byter plats på dem
      if (dif === 1 || dif === 3) {
        tilesResult[emptyIndex] = index;
        tilesResult[targetIndex] = 8;
      }
      //om dif är 2 eller 6 så är de ett steg ifrån varandra. 
      if (dif === 2 || dif === 6) {
        //klickade rutans index + tomma rutan index / 2 
        const middleIndex = Math.round((targetIndex + emptyIndex)/2);
        const middleValue = tilesResult[middleIndex];
        //Lediga rutan får middleValue dvs värdet emellan dem 
        tilesResult[emptyIndex] = middleValue;
        //mellan rutan får klickade rutans värde
        tilesResult[middleIndex] = index;
        //klickade rutan hoppar till tomma rutan. 
        tilesResult[targetIndex] = 8;
      }
    }
    return tilesResult;
  }
