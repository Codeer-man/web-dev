import { use } from "react";

async function fetchData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  return res.json();
}

const Use = () => {
  const data = use(fetchData());
  console.log(data);

  return <div>{data}</div>;
};

export default Use;
