import { sorted } from './sorter.js';
import { loadSliderAvailableHotels } from './slider_available.js';

const pickerForm = document.querySelector('.form-desktop-people__picker');
const peoplePicker = document.querySelector('.people-picker');
const sendFormButton = document.querySelector('#sendForm');
const available = document.querySelector('.available');
const availableUL = document.querySelector('.available__list');
const searchInput = document.querySelector('#search');
const childrenAgePicker = document.querySelector('.picker__age');
const childrenAgePickerSelect = document.querySelector('#age');
const adultsInput = document.querySelector('#adults');
const childrenInput = document.querySelector('#children');
const roomsInput = document.querySelector('#rooms');
const plusAdults = document.querySelector('.picker__adults button.plus');
const plusChildren = document.querySelector('.picker__children button.plus');
const plusRooms = document.querySelector('.picker__rooms button.plus');
const minusAdults = document.querySelector('.picker__adults button.minus');
const minusChildren = document.querySelector('.picker__children button.minus');
const minusRooms = document.querySelector('.picker__rooms button.minus');
const styleBorderDisable = '1px solid #CECECE';
const styleColorDisable = '#CECECE';
const styleBorderEnable = '1px solid #3077c6';
const styleColorEnable = '#3077c6';

const disableButtonOnLoad = () => {
  minusAdults.disabled = true;
  minusChildren.disabled = true;
  minusRooms.disabled = true;
  minusAdults.style.border = styleBorderDisable;
  minusAdults.style.color = styleColorDisable;
  minusChildren.style.border = styleBorderDisable;
  minusChildren.style.color = styleColorDisable;
  minusRooms.style.border = styleBorderDisable;
  minusRooms.style.color = styleColorDisable;
};

const setValue = () => {
  if (adultsInput.value > 30) {
    adultsInput.value = 30;
  } else if (adultsInput.value < 0) {
    adultsInput.value = 0;
  }
  if (childrenInput.value > 10) {
    childrenInput.value = 10;
  } else if (childrenInput.value < 0) {
    childrenInput.value = 0;
  }
  if (roomsInput.value > 30) {
    roomsInput.value = 30;
  } else if (roomsInput.value < 0) {
    roomsInput.value = 0;
  }
  peoplePicker.setAttribute(
    'value',
    `Adults - ${adultsInput.value} Child - ${childrenInput.value} Rooms - ${roomsInput.value}`
  );
};

const availableHotelsData = async (url) =>
  await fetch(url, { method: 'GET' })
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));

const setPickerVisibleClass = () => {
  pickerForm.classList.toggle('visible');
  disableButtonOnLoad();
};

const clickChildren = (e) => {
  e.preventDefault();

  if (e.target.classList.contains('plus')) {
    childrenInput.value++;
  } else if (e.target.classList.contains('minus')) {
    childrenInput.value--;
  }

  if (childrenInput.value <= 0) {
    minusChildren.style.border = styleBorderDisable;
    minusChildren.style.color = styleColorDisable;
    minusChildren.disabled = true;
    minusChildren.removeEventListener('click', clickChildren, true);
  } else {
    minusChildren.style.border = styleBorderEnable;
    minusChildren.style.color = styleColorEnable;
    minusChildren.disabled = false;
  }

  if (childrenInput.value >= 10) {
    plusChildren.style.border = styleBorderDisable;
    plusChildren.style.color = styleColorDisable;
    plusChildren.disabled = true;
    plusChildren.removeEventListener('click', clickChildren, true);
  } else {
    plusChildren.style.border = styleBorderEnable;
    plusChildren.style.color = styleColorEnable;
    plusChildren.disabled = false;
  }

  setValue();
};

const childrenAgePickerShow = (e) => {
  if (childrenInput.value >= 1) {
    childrenAgePicker.style.display = 'block';
    for (let i = childrenInput.value; i >= 2 && i < 11; i += 1) {
      if (i < 11) {
        const selectClone = childrenAgePickerSelect.cloneNode(true);
        selectClone.id = '';
        selectClone.classList = 'inner';
        childrenAgePickerSelect.parentNode.insertBefore(
          selectClone,
          childrenAgePickerSelect.nextSibling
        );
      }
    }
  }
};

const childrenAgePickerHide = (e) => {
  const removeLastSelect = document.querySelector('select.inner:last-child');
  if (childrenInput.value < 1) {
    childrenAgePicker.style.display = 'none';
  } else if (childrenInput.value >= 1) {
    removeLastSelect.remove();
  }
};

const clickAdults = (e) => {
  e.preventDefault();

  if (e.target.classList.contains('plus')) {
    adultsInput.value++;
  } else if (e.target.classList.contains('minus')) {
    adultsInput.value--;
  }

  if (adultsInput.value <= 0) {
    minusAdults.style.border = styleBorderDisable;
    minusAdults.style.color = styleColorDisable;
    minusAdults.disabled = true;
  } else {
    minusAdults.style.border = styleBorderEnable;
    minusAdults.style.color = styleColorEnable;
    minusAdults.disabled = false;
  }
  if (adultsInput.value >= 30) {
    plusAdults.style.border = styleBorderDisable;
    plusAdults.style.color = styleColorDisable;
    plusAdults.disabled = true;
  } else {
    plusAdults.style.border = styleBorderEnable;
    plusAdults.style.color = styleColorEnable;
    plusAdults.disabled = false;
  }

  setValue();
};

const clickRooms = (e) => {
  e.preventDefault();

  if (e.target.classList.contains('plus')) {
    roomsInput.value++;
  } else if (e.target.classList.contains('minus')) {
    roomsInput.value--;
  }

  if (roomsInput.value <= 0) {
    minusRooms.style.border = styleBorderDisable;
    minusRooms.style.color = styleColorDisable;
    minusRooms.disabled = true;
  } else {
    minusRooms.style.border = styleBorderEnable;
    minusRooms.style.color = styleColorEnable;
    minusRooms.disabled = false;
  }
  if (roomsInput.value >= 30) {
    plusRooms.style.border = styleBorderDisable;
    plusRooms.style.color = styleColorDisable;
    plusRooms.disabled = true;
  } else {
    plusRooms.style.border = styleBorderEnable;
    plusRooms.style.color = styleColorEnable;
    plusRooms.disabled = false;
  }

  setValue();
};

const allEventListener = () => {
  peoplePicker.addEventListener('click', setPickerVisibleClass);

  plusChildren.addEventListener('click', clickChildren);
  minusChildren.addEventListener('click', clickChildren);
  childrenInput.addEventListener('input', clickChildren);

  plusChildren.addEventListener('click', childrenAgePickerShow);
  minusChildren.addEventListener('click', childrenAgePickerHide);

  plusAdults.addEventListener('click', clickAdults);
  minusAdults.addEventListener('click', clickAdults);
  adultsInput.addEventListener('input', clickAdults);

  plusRooms.addEventListener('click', clickRooms);
  minusRooms.addEventListener('click', clickRooms);
  roomsInput.addEventListener('input', clickRooms);
};

// === export functoin === //

const filter = async () => {
  adultsInput.value = 0;
  childrenInput.value = 0;
  roomsInput.value = 0;

  setValue();
  allEventListener();

  const sendForm = (e) => {
    e.preventDefault();
    const childrenAgesArr = [];
    const selects = document.querySelectorAll('select');
    if (childrenInput.value > 0 && adultsInput.value > 0) {
      for (let i = 0; i <= childrenInput.value - 1; i += 1) {
        childrenAgesArr.push(selects[i].value);
      }
    }
    return childrenAgesArr;
  };

  const loadAvailable = async (e) => {
    const childrens = sendForm(e).toString();
    let urlAvailableHotel = '';
    if (!(availableUL.childNodes.length === 0)) {
      availableUL.innerHTML = '';
    }
    if (availableUL.childNodes.length === 0) {
      if (childrens === '' && adultsInput.value == 0 && roomsInput.value == 0) {
        urlAvailableHotel = `https://fe-student-api.herokuapp.com/api/hotels?search=${searchInput.value}`;
      } else if (childrens === '' && adultsInput.value == 0) {
        urlAvailableHotel = `https://fe-student-api.herokuapp.com/api/hotels?search=${searchInput.value}&rooms=${roomsInput.value}`;
      } else if (childrens === '' && roomsInput.value == 0) {
        urlAvailableHotel = `https://fe-student-api.herokuapp.com/api/hotels?search=${searchInput.value}&adults=${adultsInput.value}`;
      } else if (childrens === '') {
        urlAvailableHotel = `https://fe-student-api.herokuapp.com/api/hotels?search=${searchInput.value}&adults=${adultsInput.value}&rooms=${roomsInput.value}`;
      } else {
        urlAvailableHotel = `https://fe-student-api.herokuapp.com/api/hotels?search=${searchInput.value}&adults=${adultsInput.value}&children=${childrens}&rooms=${roomsInput.value}`;
      }

      const availableHotels = await availableHotelsData(urlAvailableHotel);
      const sortedAvailableHotels = sorted(availableHotels);

      if (!(sortedAvailableHotels.length === 0)) {
        available.classList.add('visible');
        sortedAvailableHotels.forEach((el) => {
          const li = document.createElement('li');
          const img = document.createElement('img');
          const hotelName = document.createElement('a');
          const hotelLocation = document.createElement('p');

          li.classList.add('available__list-item');
          img.src = el.imageUrl;
          hotelName.href = '#';
          hotelName.textContent += el.name;
          hotelLocation.textContent += `${el.city}, ${el.country}`;

          li.appendChild(img);
          li.appendChild(hotelName);
          li.appendChild(hotelLocation);

          availableUL.appendChild(li);

          availableUL.scrollIntoView({
            block: 'center',
            behavior: 'smooth'
          });
        });
      } else {
        available.classList.remove('visible');
        alert('Sorry, Please enter correct data');
      }
      await loadSliderAvailableHotels();
    }
  };

  sendFormButton.addEventListener('click', loadAvailable);
};

export { filter };
