import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeight, setWeight, calculateBMR } from "../../store/BMI";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Calculator() {
  const dispatch = useDispatch();
  const bmi = useSelector((state) => state.bmi.bmi);
  const [bmiData, setBmiData] = useState(0);

  const [input, setInput] = useState({
    height: "",
    weight: "",
  });

  const handleCalculate = () => {
    dispatch(setHeight(input.height));
    dispatch(setWeight(input.weight));
    dispatch(calculateBMR());
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const card = useRef();
  useGSAP(() => {
    gsap.from(card.current.children, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      className="h-screen w-screen  flex flex-col justify-center items-center bg-gradient-to-br from-blue-300 via-pink-200 to-purple-300 font-poppins"
      ref={card}
    >
      <h1
        id="header"
        className="text-3xl font-semibold text-center mb-6 text-blue-700 drop-shadow-sm"
      >
        BMI Calculator
      </h1>
      <div className="bg-white/80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full sm:w-96 border border-gray-200">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Height (cm)
            </label>
            <input
              type="number"
              placeholder="Enter your height"
              name="height"
              value={input.height}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Weight (kg)
            </label>
            <input
              type="number"
              placeholder="Enter your weight"
              name="weight"
              value={input.weight}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-inner"
            />
          </div>
          <div className="text-center">
            <button
              onClick={handleCalculate}
              className=" mt-4 py-2 px-6 bg-gradient-to-r from-blue-500 to bg-pink-500  text-white rounded-lg hover:opacity-90 transition-all cursor-pointer hover:scale-110"
            >
              Calculate
            </button>
          </div>
        </div>

        {bmi && (
          <div className="mt-6 w-full text-center text-lg font-medium text-gray-800">
            <p>
              Your BMI is:
              <span className="font-bold text-blue-600 ml-1">{bmi}</span>
            </p>
            {bmi < 17.5 && (
              <div className="text-red-600 mt-2 font-semibold animate-pulse">
                You are considered underweight.
              </div>
            )}
            {bmi >= 17.5 && bmi <= 25 && (
              <div className="text-green-600 mt-2 font-semibold">
                You are in a healthy range.
              </div>
            )}
            {bmi > 25 && bmi <= 35 && (
              <div className="text-yellow-600 mt-2 font-semibold">
                You are considered overweight.
              </div>
            )}
            {bmi > 35 && (
              <div className="text-red-700 mt-2 font-semibold">
                You are considered obese.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
