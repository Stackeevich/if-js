//  ----------------- ex №5 -----------------

function sum(a){
    let x = a;
    return function(b){ return x + b;};
}

console.log(sum(5)(2));

// module.exports = sum; 

//  ----------------- ex №6 -----------------

let colors = ['magenta', 'cyan', 'firebrick', 'springgreen', 'skyblue'];
let p_collect = document.getElementsByTagName('p');

let p1 = function() {
	let k = 0;
	return function() {
		this.style.color = colors[k];
		k++;
		if (k == colors.length){k=0};
	}
}

for (let i = 0; i < p_collect.length; i++) {
	p_collect[i].addEventListener('click', p1());
}

