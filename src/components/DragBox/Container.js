import React, { useState } from "react";
import update from "immutability-helper";
import { ITEMS, ItemType } from "./data";
import Block from "./Block";
import { useDrop } from "react-dnd";

export default () => {
  const [Blocks, setBlocks] = useState(ITEMS);

  const moveBlock = (id, atIndex) => {
    const { block, index } = findBlock(id);
    console.log(Blocks);
    setBlocks(
      update(Blocks, {
        $splice: [
          [index, 1],
          [atIndex, 0, block],
        ],
      })
    );
    console.log(Blocks);
  };
  const findBlock = (id) => {
    // 찾으려고 하는 아이디값
    const block = Blocks.filter((b) => `${b.id}` === id)[0];
    // 해당 아이디와 배열 위치 판별
    return {
      block,
      index: Blocks.indexOf(block),
    };
  };
  // drop 이 가능한 영역
  const [, drop] = useDrop({ accept: ItemType.block });
  return (
    <div ref={drop} style={{ width: 700 }}>
      {Blocks.map((item) => (
        <Block
          id={item.id}
          moveBlock={moveBlock}
          findBlock={findBlock}
          key={item.id}
        >
          {item.text}
        </Block>
      ))}
    </div>
  );
};
