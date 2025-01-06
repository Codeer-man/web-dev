import { useEffect, useState } from "react";

export default function UseCase() {
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
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchedData();
  }, []);
  return (
    <div className="container">
      <h1 className="heading">Post List</h1>

      {loading && <p className="loading"> Loading... </p>}
      {error && <p className="error">Error</p>}
      
      {!loading && !error && data.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 5).map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
