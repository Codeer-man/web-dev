// const promise = new Promise((resolve, reject) => {
//   const allwentwell = true;

//   if (allwentwell) {
//     resolve("Everything is good");
//   } else {
//     reject("oops! something went wrong");
//   }
// });

// console.log(promise);

// Pending in promise
// then and catch

// const promise2 = new Promise((resolve, reject) => {
//   const num = Math.floor(Math.random() * 100);

//   setTimeout(() => {
//     if (num < 4) {
//       resolve(`You are in right track ${num}`);
//     } else {
//       reject("You are in wrong track");
//     }
//   }, 2000);
// });

// promise2
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// promise all

// const promiseONe = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("promise one resolved");
//   }, 2000);
// });

// const promiseTwo = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("promise Two resolved");
//   }, 2000);
// });

// Promise.all([promiseONe, promiseTwo])
//   .then((value) => console.log(value[0], value[1]))
//   .catch((err) => console.error(err));


