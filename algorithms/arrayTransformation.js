// Returns a complixity of o(n*m) due to the nested while loop

function arrayTransformation(arr) {
    console.time('arrayTransformation');
  for (let i = 0; i < arr.length; i++) {
    while (arr[i] !== 1) {
      if (arr[i] % 2 === 0) {
        arr[i] /= 2;
      } else {
        arr[i] = arr[i] * 3 + 1;
      }
    }
  }
  console.timeEnd('arrayTransformation');
  return arr;
}


console.log(arrayTransformation([6, 2, 3, 4]));
console.log(arrayTransformation([1, 2, 3, 4]));
console.log(arrayTransformation([1, 2, 3, 4, 5]));
console.log(arrayTransformation([1, 2, 3, 4, 5, 6]));