import Container from "./container";
import Hero from "./Hero";

import Navbar from "./navbar";

export default function Lesson1() {
  return (
    <div className="h-screen relative  bg-blue-100">
      <div className="max-w-6xl mx-auto absolute inset-0 h-full w-full">
        <div className=" absolute inset-y-0 left-0 h-full w-px bg-linear-to-b from-neutral-300/50 via-neutral-300 to-transparent pointer-events-none z-0" />
        <div className=" absolute inset-y-0 right-0 h-full w-px bg-linear-to-b from-neutral-300/50 via-neutral-300 to-transparent pointer-events-none z-0" />
      </div>

      <Container>
        <Navbar />
        <Hero />
      </Container>
      <div className=" relative w-full bg-blue-100 mask-b-from-50% to-100% ">
        <div className=" absolute inset-x-0 right-0 w-full h-px bg-linear-to-b from-neutral-300/50 via-neutral-300 to-transparent pointer-events-none z-0" />
        <div className="max-w-6xl mx-auto p-4">
          <img
            src="/fintaImage.webp"
            alt="banner image"
            width={1000}
            height={1000}
            className="w-full rounded-xl object-cover object-top-left border-neutral-300 shadow-lg mask-b-from-40% to b-80% "
          />
        </div>
      </div>
    </div>
  );
}
