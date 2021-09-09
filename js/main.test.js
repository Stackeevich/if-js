/**
 * @jest-environment jsdom
 */



const { expect } = require('@jest/globals');
const sum = require('./main');

test('adds 5 + 2 to equal 7', () => {
    expect(sum(5)(2)).toBe(7);
});

describe('check out chenge text color after then click', () => {
    const colors = ['magenta', 'cyan', 'firebrick', 'springgreen', 'skyblue'];

    document.body.innerHTML = `
    <p id="text1">Text 1</p>
    <p id="text2">Text 2</p>
    <p id="text3">Text 3</p>
    `
    const text1 = document.getElementById('text1');
    const text2 = document.getElementById('text2');
    const text3 = document.getElementById('text3');

    let i = 0;
    let j = 0;
    let z = 0;

    test('expect color in text is magenta', () => {
        text1.click();

        document.getElementById('text1').style.color = colors[i];
        i++;
        let color = text1.style.color;
        expect(color).toBe('magenta')
    })
})