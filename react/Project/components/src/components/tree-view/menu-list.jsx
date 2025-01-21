import React from "react";
import MenuItem from "./menu-item";

export default function MenuList({ list = [] }) {
  console.log(list);
  return (
    <ul>
      {list && list.length
        ? list.map((listItem) => <MenuItem item={listItem} key={listItem.id} />)
        : null}
    </ul>
  );
}
