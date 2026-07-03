// state management
// the ui does not change

import { useState } from "react";

type Quote = {
  quote: string;
  author: string;
};
const quotes: Quote[] = [
  {
    quote: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    quote:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    quote: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
  },
  {
    quote: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
  },
  {
    quote: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  {
    quote: "Dream big and dare to fail.",
    author: "Norman Vaughan",
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    quote: "Opportunities don't happen. You create them.",
    author: "Chris Grosser",
  },
  {
    quote: "Hard work beats talent when talent doesn't work hard.",
    author: "Tim Notke",
  },
  {
    quote:
      "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
];

export default function Quote() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function generateQuote() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * 10);
    } while (randomIndex === currentIndex);

    setCurrentIndex(randomIndex);
  }
  console.log(currentIndex);

  return (
    <div>
      <h1>Quote of the day</h1>
      <h1>Quote:</h1> <span>{quotes[currentIndex].quote} </span> <br />
      <h3>Authod</h3>
      <p>{quotes[currentIndex].author}</p>
      <button onClick={() => generateQuote()}>Generate qoute</button>
    </div>
  );
}
