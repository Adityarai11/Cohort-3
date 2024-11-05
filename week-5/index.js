//map,filter ,arow fns

// function sum (a,b){
//     return a+b;
// }
// const sum = (a,b)=>{
//     return a+b;
// }

// const ans =  sum(8,2);
// console.log(ans);

//***map********************* */

const arr = [1,2,3,4,5];
// const newarray = [];

// for(let i = 0;i<input.length;i++){
//     newarray.push(input[i]*2);
// }

// console.log(newarray);

// function multi(i) {
//     return i * 3;
// }

// const ans =  input.map(multi);
// console.log(ans);

const newArray = [];

for (let i = 0; i < arr.length; i++) {
    
    if(arr[i]%2 == 0){
        newArray.push(arr[i])
    }
}
console.log(newArray);