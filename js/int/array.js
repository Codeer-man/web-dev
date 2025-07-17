const { index } = require("drizzle-orm/gel-core");

const arr = [1,2,4,"gyan",false]

//* push 
arr.push({"mane":"sdg"},[ { name: 'manish', age: '23' }, { name: 'manish', age: '23' } ])
// console.log(arr);

// * pop
console.log(arr.pop(),"pop"); //remove the last and return's it

//* shift 
console.log(arr.shift(),"shift"); //remove the first index and return itt

//* unshift 
arr.unshift("start from here") ;// console.log(arr); add in beginning 

const num = [1,2,3,4]
//* splice 
// splice(remove,replace,insert) allows these things 
num.splice(0,2,5) //this first 0 and 2 are index  from where 
// to start and end and 5 and 6 are replace to replace the value of 
num.splice(0,0,"start",6,7,"8") // to insert number using splice 0 and 0 to not remove
num.splice(4) // remove all elements after 4 th index
// console.log(splice);

//* sort 
num.sort() // sort in accending
//* reverse 
num.reverse() //sort in decending
// console.log(splice);

//! all the build in method makes the copy of the array  and does not edit the original array
//! they make shallow copy ie let copy = [...array]

const array2= [1,2,3,4,"man",{name:"manish"},[1,23,4]]

// *slice 
const slice =array2.slice(3,6)  //return the shallow index from 3rd to 5th index
console.log(array2,"no change");
console.log(slice,"changed");

//* concat  //combines 2 array
// const array3=["sdkg",3,"re"]
// const array4 = array2.concat(array3) 
// console.log(array4);


//*incluse check if the array container the thing we input and return boolean
console.log(array2.includes(3));

//* indexof check if the index exists and reutrn 1 and -1
console.log(array2.indexOf(3));

//* join  convert arrya in to string
// console.log(array2.join(","));

// manage the Object to use join
// const result = array2.map(item =>
//   typeof item === "object" && !Array.isArray(item)
//     ? JSON.stringify(item)
//     : item
// ).join("-");


//! iteration method
 //*forEach runs function for each element or index used much in dom manupilation
 let iteration = [5,6,47,8]

iteration.forEach((value,index,array)=> {
    // console.log(`the value of index ${index} is ${value}`);
    // console.log(array,"");
    // console.log(value +2);
    
}) //accepts higher order function / parent function / callback fun // does not return value

//* map  same as forEach but map return new array as copy of old array, used much in react

// const map =iteration.map((value,index,array) =>{
//     return value*2
// })
// console.log(map);

//* filter  returns array that pass the condition

// let even = iteration.filter((value ,index,a)=>{
//     return value %2 === 0
// })
// console.log(even);

//*  reduce reduct the value like finding total  of array
//* iteration.reduce((accumulator,currentValue,index,array)=>{},initialvalue)
const add = iteration.reduce((accumulator,currentvalue) => {
    return accumulator + currentvalue
},0)
console.log("total is",add);

//* find find the same index and return fist match value otherwise return undefined

const find = iteration.find((value)=> (
    value > 2
))
console.log(find);

//* some return true if any  element pass the test