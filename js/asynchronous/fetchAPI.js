async function fetchData() {
  const apiUrl ="https://dummyjson.com/RESOURCE/?limit=10&skip=5&select=key1,key2,key3";

  try {
    const fetch = await fetch(apiUrl);
    if (!fetch.ok) {
      throw new Error(`HTTP error! status: ${fetch.status}`);
    }

    const data = await fetch.json();

    console.log(data);
  } catch (error) {
    console.error("Error fetching the data:", error);
  }
}

fetchData();
