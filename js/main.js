// question 6 ----------------------------------------------------
var user = "John Doe"
console.log(user);
var student = "Vlad"
console.log(student);
user = student
// in the variable user my name
console.log(user);

// question 7 ----------------------------------------------------

var test = 1
test = 1 + '1'
// 11
test -= 1
// 10
console.log(test);
var test = true ;
// true, if i write false in the console will output false
console.log(test);

// question 8 ----------------------------------------------------

var result = 1
var arr = [2, 3, 5, 8]
for (var i = 0; i < arr.length; i++) {
result *= arr[i];
}
console.log(result);

// question 9 ----------------------------------------------------

let arr2 = [2, 5, 8, 15, 0, 6, 20, 3]
for (let i = 0; i < arr2.length; i++) {   
	if (arr2[i] > 5 && arr2[i] < 10)
		console.log(arr2[i])               
}
// console.log(arr2.filter(elem=> elem>5 && elem<10)); another option without "for , if"

// question 10 ----------------------------------------------------

let arr3 = [2, 5, 8, 15, 0, 6, 20, 3];
for (let i = 0; i < arr3.length; i++) {
	if (arr3[i] % 2 == 0) {
		console.log(arr3[i]);
	}
}