import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

export const Car1d = ({ id, text, moveCard, findCard }) => {
  // 현재 대상의 아이디
  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD1, id, originalIndex },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveCard(droppedId, originalIndex);
      }
    },
  });
  const [, drop] = useDrop({
    accept: ItemTypes.CARD1,
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findCard(id);
        moveCard(draggedId, overIndex);
      }
    },
  });
  const opacity = isDragging ? 0 : 1;
  return (
    <div
      ref={(node) => {
        drag(drop(node));
      }}
      style={{ ...style, opacity }}
    >
      {text}
    </div>
  );
};
