import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Card } from "./Card";
import update from "immutability-helper";
import { ItemTypes } from "./ItemTypes";
const style = {
  width: 400,
};
const ITEMS = [
  {
    id: 1,
    text: "Write a cool JS library",
    ITEMS: [
      {
        id: 1,
        text: "Write a cool JS library",
      },
      {
        id: 2,
        text: "Make it generic enough",
      },
      {
        id: 3,
        text: "Write README",
      },
      {
        id: 4,
        text: "Create some examples",
      },
      {
        id: 5,
        text: "Spam in Twitter and IRC to promote it",
      },
      {
        id: 6,
        text: "???",
      },
      {
        id: 7,
        text: "PROFIT",
      },
    ],
  },
  {
    id: 2,
    text: "Make it generic enough",
  },
  {
    id: 3,
    text: "Write README",
  },
  {
    id: 4,
    text: "Create some examples",
  },
  {
    id: 5,
    text: "Spam in Twitter and IRC to promote it",
  },
  {
    id: 6,
    text: "???",
  },
  {
    id: 7,
    text: "PROFIT",
  },
];
export default () => {
  //전체 배열받오고
  const [cards, setCards] = useState(ITEMS);

  // 해당카드의 위치를 변경
  const moveCard = (id, atIndex) => {
    const { card, index } = findCard(id);
    setCards(
      update(cards, {
        $splice: [
          [index, 1],
          [atIndex, 0, card],
        ],
      })
    );
  };
  // 특정 카드를 찾기
  const findCard = (id) => {
    const card = cards.filter((c) => `${c.id}` === id)[0];
    return {
      card,
      index: cards.indexOf(card),
    };
  };

  // 변경할 아이템의 타입
  const [droped, drop] = useDrop({ accept: ItemTypes.CARD });
  return (
    <>
      <div
        ref={(ref) => {
          drop(ref);
        }}
        style={style}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            id={`${card.id}`}
            text={card.text}
            moveCard={moveCard}
            findCard={findCard}
            items={card.ITEMS}
          />
        ))}
      </div>
    </>
  );
};
