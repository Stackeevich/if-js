const sorted = (arr) => {
  const array = arr;
  for (let i = 0; i < array.length; i += 1) {
    for (let m = 0; m < array.length - 1 - i; m += 1) {
      if (array[m].name > array[m + 1].name) {
        const temp = array[m];
        array[m] = array[m + 1];
        array[m + 1] = temp;
      }
    }
  }

  return array;
};

export { sorted };
