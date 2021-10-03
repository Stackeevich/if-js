const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const text3 = document.getElementById("text3");
// It also works with hex
const colors = {
  data: ['#FF00FF', 'cyan', '#B22222', 'springgreen', 'skyblue'],
  [Symbol.iterator]() {
    return this;
  },
 
//  next() each time it is called,
//  it returns the next value and checks if the search is over.
//  + Initialize iteration state 
  next() {
    if (this.current === undefined || 
      this.current === this.data.length) {
      this.current = 0;
    }
    return {
      value: this.data[this.current++],
      done: false, 
    };
  },
};
// taken from a example
const changeStyle = (id) => (event) => {
  event.target.style.color = id.next().value;
};
// changes color on click
const pText = [text1, text2, text3];
for (let i = 0; i < pText.length; i++) {
  pText[i].addEventListener("click", changeStyle(Object.assign({}, colors)));
}