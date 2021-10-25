//  ----------------- ex №5 -----------------

function sum(a) {
	return function(b) {
		return a + b;
	}
}
	console.log(sum(5)(2));

//  ----------------- ex №6 -----------------


const colors = ['magenta', 'cyan', 'firebrick', 'springgreen', 'skyblue'];
const tagP = document.querySelectorAll('p');
const changeFun = () => {
  let colNumber = 0;
  return function (a) {
    a.target.style.color = colors[colNumber];
    colNumber++;
    if (colNumber === colors.length) {
      colNumber = 0;
    }
  };
};
for (let i = 0; i < tagP.length; i++) {
  tagP[i].addEventListener('click', changeFun());
}