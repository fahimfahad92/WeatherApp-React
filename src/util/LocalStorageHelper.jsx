const getArrayFromLocalStorage = (key) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
};

const setItemInLocalStorageAsArray = (key, value) => {
  const itemsArray = getArrayFromLocalStorage(key);
  localStorage.setItem(key, JSON.stringify([...itemsArray, value]));
};

const removeItemFromLocalStorageArray = (key, valueToBeRemoved) => {
  const itemArray = getArrayFromLocalStorage(key);
  const updatedItemArray = itemArray.filter(function (currentValue) {
    return currentValue !== valueToBeRemoved;
  });
  localStorage.setItem(key, JSON.stringify([...updatedItemArray]));
};

export {
  getArrayFromLocalStorage,
  removeItemFromLocalStorageArray,
  setItemInLocalStorageAsArray,
};
