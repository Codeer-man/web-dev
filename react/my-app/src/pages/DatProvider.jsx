import { createContext, useEffect, useState } from "react";
import Login from "./login";


export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const responce = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!responce.ok) {
          throw new Error("Failed to fetch");
        }
        const result = await responce.json();
        setData(result);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchedData();
  }, []);
  return (
    <div>
      <DataContext.Provider value={{ data, loading, error }}>
        <Login/>
      </DataContext.Provider>
    </div>
  );
}
