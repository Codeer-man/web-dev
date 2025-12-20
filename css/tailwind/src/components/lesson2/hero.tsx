export default function Hero() {
  return (
    <div className="my-35 flex flex-col items-center">
      {/* bg-clip-text: makes the background the shape if the text */}
      <h1 className="max-w-3xl bg-linear-to-b from-neutral-50 to-neutral-500 bg-clip-text text-center text-7xl leading-tight font-bold tracking-tight text-transparent">
        Unleash the power of <br /> intutive finance
      </h1>
      {/* Selection */}
      <p className="mt-10 max-w-2xl text-center text-xl font-medium text-neutral-500 selection:bg-neutral-100">
        Say goodbye to the outdated financial tools. Every small business owner
        regardless of the background, can now manage there business like a pro.
        Simple.Intutive. Ans never boring
      </p>

      <div className="mx-auto mt-10 flex w-full max-w-xl items-center gap-3">
        <input
          type="text"
          placeholder="Enter your email"
          className="focus:ring-primary flex-1 rounded-xl border border-neutral-500 px-4 py-2 text-white transition duration-200 placeholder:text-neutral-600 focus:border-none focus:ring-1 focus:outline-none"
        />
        <button className="relative cursor-pointer rounded-xl border border-neutral-700 px-4 py-2 text-neutral-100">
          <div className="via-primary absolute inset-x-0 -bottom-px h-px w-full bg-linear-to-r from-transparent to-transparent" />
          Join Waitlist
        </button>
      </div>
    </div>
  );
}
