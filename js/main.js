//  ----------------- ex №5 -----------------

function sum(a){
    var x = a;
    return function(b){ return x + b;};
}

console.log(sum(5)(2));

// module.exports = sum; 

//  ----------------- ex №6 -----------------

var colors = ['magenta', 'cyan', 'firebrick', 'springgreen', 'skyblue'];
var p_collect = document.getElementsByTagName('p');

var p1 = function() {
	var k = 0;
	return function() {
		this.style.color = colors[k];
		k++;
		if (k == colors.length){k=0};
	}
}

for (var i = 0; i < p_collect.length; i++) {
	p_collect[i].addEventListener('click', p1());
}