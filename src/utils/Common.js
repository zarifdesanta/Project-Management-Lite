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

export const toggleView = (isView, id, display) => {
  if (isView) {
    document.getElementById(id).style.display = display;
    document.getElementById(id).style.animation =
      "field-open-anim 0.4s forwards";
  } else {
    document.getElementById(id).style.animation =
      "field-close-anim 0.25s forwards";
  }
};
