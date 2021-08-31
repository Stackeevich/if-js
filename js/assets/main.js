//  -----------------------------------    ex - 5    ---------------------------------------------------------------
var str = "qawseddesw"; //false  !!!  qawswaq - true
function palindrome(str) {
    for (var i = 0, j = str.length - 1; i < j; i++, j--) {
         if(str[i] != str[j])
// функция сравнивает посимвольно с начала и с конца и проверяем совпадают ли символы в слове
           return false;
    }
    return true; 
}
// var str = prompt('Введите строку:');  print some word как вариант ввода слова
console.log(palindrome(str));

//  -----------------------------------    ex - 6    ---------------------------------------------------------------

// вывод сразу 2х значений (min,max) как для примера сам пробовал тыкать
var number = [21, 35, 45, 43, 234 , 123, 547, 124]

for(i=0, k=0; i<number.length; i++) {
  for(j=0; j<i; j++) {
    if(number[i]>number[j]) {
      k = number[i];
      number[i] = number[j];
      number[j] = k;
    }
  }
}
console.log('max: '+ number[0]);
console.log('min: '+ number[number.length-1]);

// min (a,b) -------- №6.1 

var minarr = [0.13, 0.67, 1.1, 2, 3];
var minarr = Math.min(...minarr);
console.log(minarr);

// max(e,y) ------ №6.2

var max_arr = [12, 14, 35];
var maxNum = 0;
for(i=0;i<max_arr.length;i++) {
   if(max_arr[i]>maxNum){
    var max = max_arr[i];
   }
}
console.log(max);

// c исп. тернарного оператора. 6.3
var minArr = [5.5, 3.2, 3, 2.2, 7, 4];
var resultMin = minArr.reduce(function (a,b) {
    return parseFloat(a) < parseFloat(b) ? a : b;
});
console.log(resultMin);

var maxArr = [5.5, 3.2, 3, 2.2, 7, 4];
var resultMax = maxArr.reduce(function (a,b) {
    return parseFloat(a) > parseFloat(b) ? a : b;
});
console.log(resultMax);

//  -----------------------------------    ex - 7    ---------------------------------------------------------------
// честно долго искал как, нашел, разобрался 
function replaceZero(number) {
    const numStr = `${number}`;
    if (numStr.includes('0')) {
      return `${number}`.replaceAll('0', 'zero');
    }
    return number;
  }
     
console.log([80, 23, 40, 45, 17, 20, 36, 100, 51, 90].map(replaceZero).join(', '));
   
