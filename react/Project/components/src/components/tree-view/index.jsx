import React from "react";

import menu from "./data";
import MenuList from "./menu-list";

export default function SlideMenu({ Menus }) {
    console.log(menu);
    
  return (
    <div>
      <MenuList list={menu} />
    </div>
  );
}
