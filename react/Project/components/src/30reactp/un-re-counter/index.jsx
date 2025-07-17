import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

export default function CounterUnRe() {

  const [history,setHistory] = useState([0])
  const [position,setPosition]= useState(0)

  const currentNumber = history[position]

  function addToHistory(newValue){
    
    
    const newNum= history.slice(0,position +1)
    setHistory([...newNum,newValue])

    setPosition(position +1)
  }

  function decrease(){
    addToHistory(currentNumber-1)
  }

  function increase(){
    
    addToHistory(currentNumber +1)
  }
  
  console.log(currentNumber);
  
  function undo(){
    if(position > 0){
      setPosition(position -1)
    }
  }

  function redo(){
    if(position < history.length -1){
      setPosition(position +1)
    }
  }
console.log(history);

  return (
    <div className="space-y-5 w-full m-auto text-center">
      <h2>Counter undo and redo app</h2>
      <p>{currentNumber}</p>
      <div className="flex gap-3 items-center justify-center">
        <button
          onClick={decrease}
          className="border-2 border-indigo-400 rounded-md p-1"
        >
          <BiMinus size={20} className="font-semibold text-lg" />
        </button>
        <button
          onClick={increase}
          className="border-2 border-indigo-400 rounded-md p-1"
        >
          <BiPlus size={20} />
        </button>
      </div>
      <div className="flex gap-2 items-center disabled:cursor-not-allowed justify-between">
        <button disabled={position === 0} onClick={undo } className="border-2 p-2 rounded-md">undo</button>
            <p>{position} / {history.length -1}</p>
        <button disabled={position === history.length -1} onClick={redo} className="border-2 p-2 rounded-md">redo</button>
      </div>
    </div>
  );
}
