import React, { useState } from "react";

interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
  created_at: string;
}

export default function GitUser() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<GithubUser | null>(null);

  async function handleSubmit() {
    if (userName.trim() === "") {
      setError("Please fill the input");
      return;
    }
    try {
      setError("");
      setLoading(true);

      const response = await fetch(`https://api.github.com/users/${userName}`);

      if (!response.ok) {
        setError("User not found");
        return;
      }

      const data = await response.json();

      setUser(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  console.log(user);

  return (
    <div>
      <input
        type="text"
        value={userName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserName(e.target.value)
        }
      />
      <button onClick={handleSubmit}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}> {error} </p>}
      {user && (
        <div>
          <h2>Found data</h2>
          <h3>Name</h3>
          <p>{user.name} </p>
          <h3>Image</h3>
          <img
            src={user.avatar_url}
            alt="profile pic"
            width={200}
            height={150}
          />
          <h3>Login</h3>
          {user.login}
          <p>followers</p> {user.followers}
          <p>following</p> {user.following}
          <div>public repo {user.public_repos}</div>
          redirectr:
          <a href={user.html_url} target="_blank">
            Link{" "}
          </a>
          <br />
          createdAt : {user.created_at}
        </div>
      )}
    </div>
  );
}
