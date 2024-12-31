import { useState } from "react"


export default function Aboutus() {
  const [count,setCount] =useState(0);

  const IncreaseCount = ()=>{
    setCount(count+1)
  }
  return (
    <div>
      <h1>current count{count} </h1>
    <button onClick={IncreaseCount}>Increase</button>

    </div>
  )
}
