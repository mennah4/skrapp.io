// Returns a complixity of O(n log n) due to the hash map

function transformArray(arr) {
  const map = new Map();

  function transform(n) {
    if (n === 1) return 1;
    if (map.has(n)) return map.get(n);

    if (n % 2 === 0) {
      map.set(n, transform(n / 2));
    } else {
      map.set(n, transform(n * 3 + 1));
    }

    return map.get(n);
  }

  return arr.map(transform);
}



console.log(transformArray([6, 12, 3, 4]));
console.log(transformArray([1, 2, 3, 4]));
console.log(transformArray([1, 2, 3, 4, 5]));
console.log(transformArray([1, 2, 3, 4, 5, 6]));