import React, { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

export default function ImageSlider({ url, limit = 5 }) {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageloading, setImageLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      setImageLoading(true);
      const res = await fetch(`${url}?page=1&limit=${limit}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setImages(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError(error.message);
    } finally {
      setImageLoading(false);
    }
  };

  useEffect(() => {
    if (url) fetchImages();
  }, [url]);

  const increaseIndex = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const reverseIndex = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [images]);

  if (error) return <p className="text-center mt-10">Error: {error}</p>;
  if (!images.length && imageloading)
    return <p className="text-center mt-10">Loading images...</p>;

  return (
    <div className="relative w-full max-w-xl mx-auto p-4">
      {imageloading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-lg">
        {images.length > 0 && (
          <img
            onLoad={() => setImageLoading(false)}
            src={images[currentIndex].download_url}
            alt={images[currentIndex].author}
            className={`w-full h-full object-cover object-center transition-all duration-500 ${
              imageloading ? "blur-sm scale-105" : ""
            }`}
          />
        )}

        <button
          onClick={reverseIndex}
          className="absolute top-1/2 left-4 -translate-y-1/2 text-white hover:scale-110 transition"
        >
          <BsArrowLeftCircleFill size={40} />
        </button>

        <button
          onClick={increaseIndex}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-white hover:scale-110 transition"
        >
          <BsArrowRightCircleFill size={40} />
        </button>
      </div>
      <div className="mt-2 w-full flex flex-1 justify-between items-center">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
            }}
            className={`w-4 h-4 rounded-full ${
              index === currentIndex ? "bg-slate-700" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
