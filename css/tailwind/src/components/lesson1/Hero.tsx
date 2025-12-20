export default function Hero() {
  return (
    <div className="my-20 flex w-full flex-col items-center px-4 py-2">
      <button className="transistion cursor-pointer rounded-full border border-none bg-gray-200/50 px-4 py-1 text-sm font-semibold text-gray-800 duration-200 hover:bg-gray-300">
        We're hiring Founding Ruby Enginere
      </button>

      <div>
        <h1 className="mt-8 text-center text-6xl font-medium tracking-tight">
          Magically simplify <br></br> accounting and taxes
        </h1>
        <p className="mt-4 max-w-xl text-center text-xl font-medium text-gray-500">
          Automated bookkeeping. Effortless tax filing. Financial clarity. Set
          up in 10 mins. Back to building by 8:30am.
        </p>
      </div>
      <div className="relative z-10 mt-8 flex items-center gap-2">
        <button className="transistion cursor-pointer rounded-lg bg-[#2579F4] px-4 py-2 font-bold tracking-wide text-white shadow-lg duration-200 text-shadow-lg hover:bg-blue-700">
          Get Started
        </button>
        <button className="transistion cursor-pointer rounded-lg px-4 py-2 font-semibold tracking-wider duration-500 hover:bg-gray-300">
          Pricing &rarr;
        </button>
      </div>
      <p className="mt-6 text-xs font-medium text-gray-400">
        For US-based startups.
      </p>
    </div>
  );
}
