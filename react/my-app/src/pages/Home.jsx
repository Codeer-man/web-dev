import { Child } from "./contactus"

export default function Home() {

  const message = "hello pokhara"
  return (
    <div className="h-screen w-screen"  >
      <h1>This is Home page</h1>
      <Child ContactMessage={message}/>
    </div>
  )
}
