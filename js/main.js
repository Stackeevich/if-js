//  ----------------- ex №5 -----------------
function sum(a) {
	return function(b) {
		return a + b;
	}
}
	console.log(sum(5)(2));

// module.exports = sum; 

//  ----------------- ex №6 -----------------

const colors = ['magenta', 'cyan', 'firebrick', 'springgreen', 'skyblue'];

const text1 = document.getElementById('text1');
const text2 = document.getElementById('text2');
const text3 = document.getElementById('text3');

const changeTextColor = () => {
	let i = 0;

	return function (event) {
		event.target.style.color = colors[i];
		i++;
		if (i >= colors.length) {
			i = 0;
		}
	}
}

const changeColor1 = changeTextColor();
const changeColor2 = changeTextColor();
const changeColor3 = changeTextColor();

text1.addEventListener('click', changeColor1);
text2.addEventListener('click', changeColor2);
text3.addEventListener('click', changeColor3);