import React from "react";
import { Motion, spring } from "react-motion";
import { getMatrixPosition, getVisualPosition } from "../units/gameLogic";

function Tile({ tile, index, width, height, handleTileClick }) {
  const { row, col } = getMatrixPosition(index);
  const visualPos = getVisualPosition(row, col, width, height);
  const tileStyle = {
    width: `calc(100% / 3)`,
    height: `calc(100% / 3`,
    translateX: visualPos.x,
    translateY: visualPos.y,
  };

  const motionStyle = {
    translateX: spring(visualPos.x),
    translateY: spring(visualPos.y)
  }

  return (
    <Motion style={motionStyle}>
      {({ translateX, translateY }) => (
        <li
          style={{
            width: tileStyle.width,
            height: tileStyle.height,
            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
            opacity: tile === 9 - 1 ? 0 : 1,
          }}
          className="tile"
          onClick={() => handleTileClick(index)}
        >
          {tile + 1}
       </li>
       )}
       </Motion>
  );
}

export default Tile;