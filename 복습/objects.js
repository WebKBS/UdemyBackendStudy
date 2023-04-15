// const job = {
//   title: "Developer",
//   location: "New York",
//   salary: 50000,
// };

// console.log(new Date().toISOString());

// const job2 = {
//   title: "Cook",
//   location: "Pusan",
//   salary: 35000,
// };

class Job {
  constructor(jobTitle, price, salary) {
    this.title = jobTitle;
    this.location = price;
    this.salary = salary;
  }

  descripbe() {
    console.log(`I'm a ${this.title}`);
  }
}

//const developer = new Job("Developer", "Newyork", 5000);
const cook = new Job("cook", "Pusan", 3000);
console.log(cook.descripbe());
