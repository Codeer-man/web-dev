import { useContext } from "react";
import { Data } from "./page";

export default function Context() {
  const name = useContext(Data);

  return <div>I am the {name}</div>;
}
