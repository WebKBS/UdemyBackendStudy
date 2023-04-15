const greetUser = (greetingPrefix, userName = "default") => {
  console.log(greetingPrefix + " " + "Hello" + " " + userName);
};

// greetUser("Hi");
// greetUser();

// function sum(numbers) {
//   let result = 0;
//   for (const num of numbers) {
//     result += num;
//   }
//   return result;
// }

// console.log(sum([1, 2, 3]));

function sum(...numbers) {
  let result = 0;

  for (const num of numbers) {
    result += num;
  }
  return result;
}

const inputNumvers = [1, 2, 5, 6, 87, 22];

console.log(sum(...inputNumvers));

const obj = {
  name: "kim",
  age: 30,
};

console.log(obj);
