export const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
  // console.log("saved", key);
};

export const loadData = (key) => {
  // console.log("getting", key, "data");
  return JSON.parse(localStorage.getItem(key));
};

export const clearAll = () => {
  localStorage.clear();
  // console.log("all cleared");
};
