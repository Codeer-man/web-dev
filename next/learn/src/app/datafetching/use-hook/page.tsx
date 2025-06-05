"use client";
import React, { useEffect, useState } from "react";

enum Igender {
  MALE = "male",
  FEMALE = "female",
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: Igender;
}

interface UserResponse {
  users: User[]; // 🔁 Note: API returns `users`, not `user`
}

function fetchUserData(): Promise<UserResponse> {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
}

export default function UseHook() {
  const [userData, setUserData] = useState<UserResponse | null>(null);

  useEffect(() => {
    fetchUserData().then(setUserData);
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <UserList users={userData.users} />
    </div>
  );
}

function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.firstName} {user.lastName} - {user.gender}, {user.age}
        </li>
      ))}
    </ul>
  );
}
