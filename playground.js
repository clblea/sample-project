//promise

//3 state Pending, Fulfilled, Rejected
/* 
const myPromise = new Promise((resolve, reject) => {
        const error = false;
        if (!error) {
            resolve("Promise resolved");
        } else {
            reject("Promise rejected");
        }
    });

console.log(myPromise);

const anotherPromise = new Promise((resolve, reject) => {
    setTimeout(function() {
        resolve("anotherPromise resolved");
    }, 3000);
    });

console.log(); */

const myUsers = {
    userList: [],
};

const myFun = async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const jsonUserData = await response.json();
    return jsonUserData;
};

// myFun();

const anotherFun = async() => {
    const data = await myFun();
    myUsers.userList = data;
    console.log(myUsers.userList)
};
 anotherFun();


/* const users = fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
     return response.jason();
 })
.then((data) => {
    data.forEach((user) => {
        console.log(user);
    });       
}); */
   
// console.log(users);

/* myPromise.then((value) => {
     return value + "bucket";
 })
  .then((newVALUE) => {
      console.log(newVALUE);
  
 })
 .catch((err) => {
     console.log(err);
 })

 anotherPromise.then((value) => {
     console.log(value);
 });
 */