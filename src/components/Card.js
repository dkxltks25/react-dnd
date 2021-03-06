import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { Car1d } from "./Card1";
import update from "immutability-helper";

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

export const Card = ({ id, text, moveCard, findCard, items }) => {
  // 현재 대상의 아이디
  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, originalIndex },
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
    accept: ItemTypes.CARD,
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findCard(id);
        moveCard(draggedId, overIndex);
      }
    },
  });
  const opacity = isDragging ? 0 : 1;
  //전체 배열받오고
  const [cards1, setCards1] = useState(items);

  // 해당카드의 위치를 변경
  const moveCard1 = (id, atIndex) => {
    const { card, index } = findCard1(id);
    console.log(cards1);
    setCards1(
      update(cards1, {
        $splice: [
          [index, 1],
          [atIndex, 0, card],
        ],
      })
    );
  };
  // 특정 카드를 찾기
  const findCard1 = (id) => {
    const card = cards1.filter((c) => `${c.id}` === id)[0];
    return {
      card,
      index: cards1.indexOf(card),
    };
  };
  const [, drop1] = useDrop({ accept: ItemTypes.CARD1 });
  return (
    <div
      ref={(node) => {
        //console.log(node.offsetHeight);
        drop1(node);
        drag(drop(node));
      }}
      style={{ ...style, opacity }}
    >
      {text}
      {items &&
        items.map((i) => (
          <Car1d
            key={i.id}
            id={`${i.id}`}
            text={i.text}
            moveCard={moveCard1}
            findCard={findCard1}
          />
        ))}
    </div>
  );
};
