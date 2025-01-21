import { useState } from "react";
import data from "./data";

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [multipleSelection, setMultipleSelection] = useState([]);
  const [enableMultiple, setEnableMultiple] = useState(false);

  const handleSingleSelected = (prev) => {
    setSelected(prev === selected ? null : prev);
  };

  const handleMultipleSelection = (id) => {
    setMultipleSelection((prevSelections) =>
      prevSelections.includes(id)
        ? prevSelections.filter((item) => item !== id)
        : [...prevSelections, id]
    );
  };

  const handleButton = () => {
    setEnableMultiple(!enableMultiple);
    setSelected(null);
    setMultipleSelection([]);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="mb-4 text-center">
        <button
          onClick={handleButton}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          {enableMultiple
            ? "Disable Multiple Selection"
            : "Enable Multiple Selection"}
        </button>
      </div>

      {data && data.length > 0 ? (
        data.map((dataItem) => (
          <div key={dataItem.id} className="mb-2">
            <div
              onClick={
                enableMultiple
                  ? () => handleMultipleSelection(dataItem.id)
                  : () => handleSingleSelected(dataItem.id)
              }
              className={`cursor-pointer p-4 rounded-lg shadow-md border ${
                multipleSelection.includes(dataItem.id)
                  ? "bg-blue-100 border-blue-500"
                  : selected === dataItem.id
                  ? "bg-blue-100 border-blue-500"
                  : "bg-white border-gray-300"
              } hover:bg-blue-50 transition duration-300`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-xl">{dataItem.title}</h3>
                <span
                  className={`${
                    multipleSelection.includes(dataItem.id) ||
                    selected === dataItem.id
                      ? "text-blue-600"
                      : "text-gray-500"
                  } text-xl`}
                >
                  {multipleSelection.includes(dataItem.id) ||
                  selected === dataItem.id
                    ? "-"
                    : "+"}
                </span>
              </div>

              {(selected === dataItem.id ||
                multipleSelection.includes(dataItem.id)) && (
                <div className="mt-4 text-gray-700">{dataItem.content}</div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">Data not found</div>
      )}
    </div>
  );
}
