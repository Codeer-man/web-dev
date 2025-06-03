import React from "react";

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
  user: User[];
}
async function UserData(): Promise<UserResponse> {
  return fetch("https://dummyjson.com/users").then((data) => data.json());
}

export default function UseHook() {
  return <div>UseHook</div>;
}
