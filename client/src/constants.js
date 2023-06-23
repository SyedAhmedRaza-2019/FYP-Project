const getLocalItem = (name) => {
  return localStorage.getItem(name);
};
const setLocalItem = (name, value) => {
  return localStorage.setItem(name, value);
};


export { getLocalItem , setLocalItem}