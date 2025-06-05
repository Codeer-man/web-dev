"use client";

import React, { useEffect, useState } from "react";

export default function UseEffectFetching() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function fetchUser() {
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/users");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {data && data.map((data) => <div key={data.id}>{data.userName}</div>)}
    </div>
  );
}
