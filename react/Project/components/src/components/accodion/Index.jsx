import { useState } from "react";
import data from "./data";
export default function () {
  const [singleselection, setSingleSelection] = useState(null);
  const [enableMultipleSelection, setEnableMultipleSelection] = useState(false);
  const [multipleSelection, setMultipleSelection] = useState([]);

  function handleSingleSelection(id) {
    if (singleselection === id) {
      setSingleSelection(null);
    } else {
      setSingleSelection(id);
    }
  }

  function handleMultipleSelection(id) {
    if (multipleSelection.includes(id)) {
      setMultipleSelection((prev) => prev.filter((accId) => accId !== id));
    } else {
      setMultipleSelection((prev) => [...prev, id]);
    }
  }
  console.log(multipleSelection);

  return (
    <div>
      <h2>Accordian</h2>
      <div>
        <button
          onClick={() => {
            setEnableMultipleSelection((prev) => !prev);
            setMultipleSelection([]);
            setSingleSelection("");
          }}
        >
          {enableMultipleSelection
            ? "Disable Multiple Selection"
            : "Enable Multiple Selection"}
        </button>
        <div>
          {data && data.length > 0 ? (
            data.map((dataI) => (
              <div key={dataI.id}>
                <div>
                  <h3
                    onClick={
                      enableMultipleSelection
                        ? () => handleMultipleSelection(dataI.id)
                        : () => handleSingleSelection(dataI.id)
                    }
                  >
                    {dataI.title}
                  </h3>
                  <span>+</span>
                </div>
                {enableMultipleSelection ? (
                  multipleSelection.includes(dataI.id) ? (
                    <div>{dataI.content}</div>
                  ) : null
                ) : singleselection === dataI.id ? (
                  <div>{dataI.content} </div>
                ) : null}
              </div>
            ))
          ) : (
            <div>No data foudn</div>
          )}
        </div>
      </div>
    </div>
  );
}
