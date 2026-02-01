import React from "react";
import Container from "./100days/contailer";

const challange = [
  {
    day: 1,
    name: "Color generator",
  },
];

export default function Home() {
  return (
    <Container className=" border">
      {/* <div>
        <h1>100 days challange</h1>
        <ol>
          {challange.map((challange, index) => (
            <ol key={index} className="flex gap-3 py-10">
              <span>{challange.day}</span>
              <h2>{challange.name} </h2>
            </ol>
          ))}
        </ol>
      </div> */}
      <h1>Helo</h1>
    </Container>
  );
}
