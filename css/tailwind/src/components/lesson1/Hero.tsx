export default function Hero() {
  return (
    <div className=" w-full flex items-center  flex-col px-4 py-2 my-20">
      <button className=" border rounded-full bg-gray-200/50  hover:bg-gray-300 border-none px-4 py-1 text-sm font-semibold cursor-pointer  transistion duration-200 text-gray-800">
        We're hiring Founding Ruby Enginere
      </button>

      <div>
        <h1 className=" text-6xl font-medium text-center mt-8 tracking-tight">
          Magically simplify <br></br> accounting and taxes
        </h1>
        <p className=" max-w-xl text-gray-500 text-xl text-center mt-4 font-medium">
          Automated bookkeeping. Effortless tax filing. Financial clarity. Set
          up in 10 mins. Back to building by 8:30am.
        </p>
      </div>
      <div className=" mt-8 flex gap-2 items-center relative z-10">
        <button className="px-4 py-2 bg-[#2579F4] font-bold  shadow-lg tracking-wide  text-white rounded-lg text-shadow-lg cursor-pointer transistion duration-200 hover:bg-blue-700 ">
          Get Started
        </button>
        <button className="  cursor-pointer px-4 py-2 font-semibold  rounded-lg hover:bg-gray-300 transistion duration-500 tracking-wider">
          Pricing &rarr;
        </button>
      </div>
      <p className="text-xs font-medium text-gray-400 mt-6">
        For US-based startups.
      </p>
    </div>
  );
}
