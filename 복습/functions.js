const greetUser = (greetingPrefix, userName = "default") => {
  console.log(greetingPrefix + " " + "Hello" + " " + userName);
};

greetUser("Hi");
greetUser();
