import Container from "./container";
import Hero from "./Hero";

import Navbar from "./navbar";

export default function Lesson1() {
  return (
    <div className="relative h-screen bg-blue-100">
      <div className="absolute inset-0 mx-auto h-full w-full max-w-6xl">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-0 h-full w-px bg-linear-to-b from-neutral-300/50 via-neutral-300 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 h-full w-px bg-linear-to-b from-neutral-300/50 via-neutral-300 to-transparent" />
      </div>

      <Container>
        <Navbar />
        <Hero />
      </Container>
      <div className="relative w-full bg-blue-100 to-100% mask-b-from-50%">
        <div className="pointer-events-none absolute inset-x-0 right-0 z-0 h-px w-full bg-linear-to-b from-neutral-300/50 via-neutral-300 to-transparent" />
        <div className="mx-auto max-w-6xl p-4">
          <img
            src="/fintaImage.webp"
            alt="banner image"
            width={1000}
            height={1000}
            className="to b-80% w-full rounded-xl border-neutral-300 mask-b-from-40% object-cover object-top-left shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
