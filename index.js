const stringHash = require("string-hash");
const { v4: uuidv4 } = require("uuid");
let uidArray = [];
let sortedArray = [];
let unSortedArray = [];
console.log(new Date().toISOString());

for (let i = 0; i < 100000; i++) {
  uidArray.push(uuidv4().toString());
}

console.log("uidArray Ready : ", uidArray.length, new Date().toISOString());

for (let i = 0; i < uidArray.length; i++) {
  const hash = stringHash(uidArray[i]);
  console.log(`i: ${i}`);
  unSortedArray.push({ [hash]: uidArray[i] });
  if (sortedArray.length > 0) {
    const index = sortedArray.findIndex((e) => Object.keys(e)[0] > hash);
    sortedArray.splice(index, 0, { [hash]: uidArray[i] });
  } else {
    sortedArray.push({ [hash]: uidArray[i] });
  }
}

console.log(
  "sortedArray Ready : ",
  sortedArray.length,
  new Date().toISOString()
);

console.log(
  "unSortedArray Ready : ",
  unSortedArray.length,
  new Date().toISOString()
);

function binarySearch(arr, val) {
  return new Promise((resolve, reject) => {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
      let mid = Math.floor((start + end) / 2);

      if (parseInt(Object.keys(arr[mid])[0], 10) === parseInt(val, 10)) {
        resolve(mid);
      }

      if (val < Object.keys(arr[mid])[0]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    reject(-1);
  });
}

function normalSearch(arr, val) {
  return new Promise((resolve, reject) => {
    const ind = arr.findIndex((e) => Object.values(e)[0] === val);
    ind === -1 ? reject(-1) : resolve(ind);
  });
}

const toFind = uidArray[47306];

console.log(
  "Binary Search",
  binarySearch(sortedArray, stringHash(toFind)),
  new Date().toISOString(),
  sortedArray.find((e) => Object.keys(e) === stringHash(toFind))
);

console.log(
  "Normal Search",
  normalSearch(unSortedArray, toFind),
  new Date().toISOString()
);
