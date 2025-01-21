import React, { useState } from "react";
import MenuList from "./menu-list";
import { NavLink } from "react-router-dom";

export default function MenuItem({ item }) {
  const [displayChildren, setDisplayChildren] = useState(false);

  const handletoggleChildren = (getcurrenttitle) => {
    setDisplayChildren((prevState) => ({
      ...prevState,
      [getcurrenttitle]: !prevState[getcurrenttitle],
    }));
  };

  return (
    <li className="mb-2">
      <div
        className="flex justify-between items-center gap-4 p-2 bg-gray-100 rounded-md shadow-md cursor-pointer hover:bg-gray-200 transition-colors"
        onClick={() => handletoggleChildren(item.title)}
      >
        <NavLink className="font-medium text-gray-800" to={item.path}>
          {item.title}
        </NavLink>

        {item && item.children && item.children.length > 0 && (
          <span className="text-gray-600 font-bold text-lg">
            {displayChildren[item.title] ? "-" : "+"}
          </span>
        )}
      </div>

      {item &&
      item.children &&
      item.children.length > 0 &&
      displayChildren[item.title] ? (
        <ul className="pl-6 mt-2 border-l-2 border-gray-300">
          <MenuList list={item.children} />
        </ul>
      ) : null}
    </li>
  );
}
