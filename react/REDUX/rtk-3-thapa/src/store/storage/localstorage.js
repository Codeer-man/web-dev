export const loadState = () => {
  try {
    const getData = localStorage.getItem("getItem");
    if (getData === null) {
      return undefined;
    }
    return JSON.parse(getData);
  } catch (error) {
    console.error("could not read");
    throw new Error("error");
  }
};

export const saveState = (state) => {
  try {
    const data = JSON.stringify(state);
    localStorage.setItem("getItem", data);
  } catch (error) {
    throw new Error(error);
  }
};
