import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemType } from "./data";
import { ItemTypes } from "../ItemTypes";

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

export default ({ id, children, findBlock, moveBlock }) => {
  // 기존 아이디
  const originInddex = findBlock(id).index;
  console.log(originInddex);
  // item 현재 이동하려고 하는 블록, id, 기존의 위치
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemType.block, id, originInddex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (_, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveBlock(droppedId, originalIndex);
      }
    },
  });
  const [, drop] = useDrop({
    accept: ItemType.block,
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findBlock(id);
        moveBlock(draggedId, overIndex);
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} style={style}>
      {children}
    </div>
  );
};
