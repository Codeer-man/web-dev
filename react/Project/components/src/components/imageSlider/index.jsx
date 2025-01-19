import React, { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

export default function ImageSlider({ url, limit = 5 }) {
  const [image, setImage] = useState([]);
  const [errorMsg, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Set initial index to 0

  const fetchingData = async (GetUrl) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${GetUrl}?page=1&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      setImage(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      fetchingData(url);
    }
  }, [url]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? image.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === image.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (errorMsg) {
    return <div>Error: {errorMsg}</div>;
  }

  return (
    <div className="relative w-full max-w-xl mx-auto">
  
      <div className="relative">
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2"
        >
          <BsArrowLeftCircleFill size={30} />
        </button>

        {image && image.length > 0 && (
          <img
            src={image[currentIndex].download_url}
            alt={image[currentIndex].id}
            key={image[currentIndex].id}
            className="w-full h-64 object-cover rounded-md shadow-lg"
          />
        )}

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2"
        >
          <BsArrowRightCircleFill size={30} />
        </button>
      </div>

      <div className="flex justify-center mt-4">
        {image.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 mx-1 rounded-full ${
              currentIndex === index
                ? "bg-gray-800"
                : "bg-gray-400 hover:bg-gray-600"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
