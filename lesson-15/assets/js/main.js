// поиск отелей
const sectionEl = document.querySelector('.avail-hotels');
const availHotelsContentDiv = document.querySelector('#avail-hotels-content');
const homeGuestContentDiv = document.querySelector('#home-guest-content');
const formEl = document.querySelector('.search-form');
const filterRelatedEl = document.querySelector('.filter-related');
const availNotEl = document.querySelector('#avail-not');

const takeFormValue = (event) => {
  event.preventDefault();

  const search = formEl.querySelector('[name="destination"]');
  const adults = document.querySelector('#numberAdults');
  const rooms = document.querySelector('#numberRooms');
  const children = document.querySelectorAll('select');

  const childrenArr = [];
  children.forEach((child) => {
    childrenArr.push(child.value);
  });

  const values = {
    search: search.value,
    adults: adults.innerHTML,
    children: childrenArr.join(','),
    rooms: rooms.innerHTML,
  };

  const url = new URL('https://fe-student-api.herokuapp.com/api/hotels');
  const params = {
    search: values.search,
    adults: values.adults,
    children: values.children,
    rooms: values.rooms,
  };
  url.search = new URLSearchParams(params).toString();

  const searchAvail = (data) => {
    sectionEl.classList.remove('filter-hidden');
    availHotelsContentDiv.innerHTML = '';

    if (data.length !== 0) {
      data.forEach((elem) => {
        availHotelsContentDiv.innerHTML += `
        <div class="avail-hotels-box box">
          <a href="#" class="avail-hotels-photo-link">
            <img class="avail-hotels-photo photo" src=${elem.imageUrl} alt="hotel_leopold">
          </a>
          <p class="home-hotel-name home-text"><a href="#">${elem.name}</a></p>
          <p class="home-destination home-text"><a href="#">${elem.city}, ${elem.country}</a></p>
        </div>
    `;
      });
      availNotEl.classList.add('filter-hidden');

    } else {
      sectionEl.classList.add('filter-hidden');
      availNotEl.classList.remove('filter-hidden');
    };
  };

  const getRequest = (url) => {
    if(params.search.length !== 0) {
      fetch(url)
        .then(response => response.json())
        .then(data => searchAvail(data))
        .catch(err => console.log('This is error', err));
      filterRelatedEl.classList.add('filter-hidden');
    } else {
      sectionEl.classList.add('filter-hidden');
      availNotEl.classList.add('filter-hidden');
    }
  };

  getRequest(url);

};

formEl.addEventListener('submit', takeFormValue);

// Сортировка пузырьком секции Homes guests loves

function loadSlider() {
  $(".slick__wrapper").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  });
}

const guestSectionMaker = document.querySelector('#home-sectoin-content');

const pushFetchData = (data) => {
    if(data.length !== 0) {
        data.forEach((elem) => {
            guestSectionMaker.innerHTML += `
        <div class="favorite-item box">
        <a href="#" class="avail-hotels-photo-link">
        <img class="avail-hotels-photo photo" src=${elem.imageUrl} alt="hotel_leopold">
      </a>
      <p class="home-hotel-name home-text"><a href="#">${elem.name}</a></p>
      <p class="home-destination home-text"><a href="#">${elem.city}, ${elem.country}</a></p>
    </div>
    `;
        })}
    loadSlider();
};

const sessionStorageCheck = async () => {
    const res = await getData();
    pushFetchData(res);
};

sessionStorageCheck();

async function getData () {
    const response = await fetch('https://fe-student-api.herokuapp.com/api/hotels/popular')
    const result = await response.json();
    return result;
}

// сам фильтр
const relatedEl = document.querySelector('.related');

const adultsEl = document.querySelector('#adults');
const childrenEl = document.querySelector('#children');
const roomsEl = document.querySelector('#rooms');

const changeElPlusAdults = document.querySelector('#changePlusAdults');
const changeElMinusAdults = document.querySelector('#changeMinusAdults');
const changeDisabledElPlusAdults = document.querySelector('#changeDisabledPlusAdults');
const changeDisabledMinusAdultEl = document.querySelector('#changeDisabledMinusAdults');
const changeElPlusChildren = document.querySelector('#changePlusChildren');
const changeElMinusChildren = document.querySelector('#changeMinusChildren');
const changeDisabledPlusChildrenEl = document.querySelector('#changeDisabledPlusChildren');
const changeDisabledMinusChildrenEl = document.querySelector('#changeDisabledMinusChildren');
const changeElPlusRooms = document.querySelector('#changePlusRooms');
const changeElMinusRooms = document.querySelector('#changeMinusRooms');
const changeDisabledElPlusRooms = document.querySelector('#changeDisabledPlusRooms');
const changeDisabledMinusRoomEl = document.querySelector('#changeDisabledMinusRooms');

const filterAge = document.querySelector('.filter-age');
const filterQuestEl = document.querySelector('.filter-related-quest');

let counterAdults = 1;
let counterChildren = 0;
let counterRooms = 1;

// открывается фильтр
const showFilter = (event) => {
  filterRelatedEl.classList.toggle('filter-hidden');
};
relatedEl.addEventListener('click', showFilter);

// + взрослые
const plusAdults = (event) => {
  if (counterAdults < 30) {
    const numberEl = document.querySelector('#numberAdults');

    counterAdults++;

    numberEl.innerHTML = counterAdults;
    adultsEl.innerHTML = `${'&nbsp;'} ${counterAdults} ${'Adults'}`;

    changeElMinusAdults.classList.remove('filter-disabled');
    changeDisabledMinusAdultEl.classList.remove('change-disabled');
  }

  if (counterAdults >= 30) {
    changeElPlusAdults.classList.add('filter-disabled');
    changeDisabledElPlusAdults.classList.add('change-disabled');
  }
};

changeElPlusAdults.addEventListener('click', plusAdults);

// - взрослые
const minusAdults = (event) => {
  if (counterAdults > 1) {
    const numberEl = document.querySelector('#numberAdults');
    counterAdults--;
    numberEl.innerHTML = counterAdults;
    adultsEl.innerHTML = `${'&nbsp;&nbsp;'}${counterAdults} ${'Adults'}`;
    changeElPlusAdults.classList.remove('filter-disabled');
    changeDisabledElPlusAdults.classList.remove('change-disabled');
  }

  if (counterAdults <= 1) {
    changeElMinusAdults.classList.add('filter-disabled');
    changeDisabledMinusAdultEl.classList.add('change-disabled');
  }
};

changeElMinusAdults.addEventListener('click', minusAdults);

// + дети и появл секция
const plusChildren = (event) => {
  if (counterChildren !== -1) {
    filterQuestEl.classList.remove('filter-hidden');
    filterAge.classList.remove('filter-hidden');
    filterRelatedEl.classList.add('filter-related-newheight');
  }

  if (counterChildren < 10) {
    const numberEl = document.querySelector('#numberChildren');
    counterChildren++;
    numberEl.innerHTML = counterChildren;
    childrenEl.innerHTML = `${'&nbsp;—'} ${counterChildren} ${'Children'}`;
    changeElMinusChildren.classList.remove('filter-disabled');
    changeDisabledMinusChildrenEl.classList.remove('change-disabled');
  }

  if (counterChildren >= 10) {
    changeElPlusChildren.classList.add('filter-disabled');
    changeDisabledPlusChildrenEl.classList.add('change-disabled');
  }
};

changeElPlusChildren.addEventListener('click', plusChildren);

//  - дети и появл секция
const minusChildren = (event) => {
  if (counterChildren === 1) {
    filterQuestEl.classList.add('filter-hidden');
    filterAge.classList.add('filter-hidden');
  }

  if (counterChildren > 0) {
    const numberEl = document.querySelector('#numberChildren');
    counterChildren--;
    numberEl.innerHTML = counterChildren;
    childrenEl.innerHTML = `${'&nbsp;—'} ${counterChildren} ${'Children'}`;
    changeElPlusChildren.classList.remove('filter-disabled');
    changeDisabledPlusChildrenEl.classList.remove('change-disabled');
  }

  if (counterChildren <= 0) {
    changeElMinusChildren.classList.add('filter-disabled');
    changeDisabledMinusChildrenEl.classList.add('change-disabled');
    filterRelatedEl.classList.remove('filter-hidden');
    filterRelatedEl.classList.remove('filter-related-newheight');
  }
  changeElPlusChildren.addEventListener('click', addChildSelect);
};

changeElMinusChildren.addEventListener('click', minusChildren);

// + комнаты
const plusRooms = (event) => {
  if (counterRooms < 30) {
    const numberEl = document.querySelector('#numberRooms');
    counterRooms++;
    numberEl.innerHTML = counterRooms;
    roomsEl.innerHTML = `${'&nbsp;—'} ${counterRooms} ${'Rooms'}`;
    changeElMinusRooms.classList.remove('filter-disabled');
    changeDisabledMinusRoomEl.classList.remove('change-disabled');
  }

  if (counterRooms >= 30) {
    changeElPlusRooms.classList.add('filter-disabled');
    changeDisabledElPlusRooms.classList.add('change-disabled');
  }
};

changeElPlusRooms.addEventListener('click', plusRooms);

// - комнаты
const minusRooms = (event) => {
  if (counterRooms > 1) {
    const numberEl = document.querySelector('#numberRooms');
    counterRooms--;
    numberEl.innerHTML = counterRooms;
    roomsEl.innerHTML = `${'&nbsp;—'} ${counterRooms} ${'Rooms'}`;
    changeElPlusRooms.classList.remove('filter-disabled');
    changeDisabledElPlusRooms.classList.remove('change-disabled');
  }

  if (counterRooms <= 1) {
    changeElMinusRooms.classList.add('filter-disabled');
    changeDisabledMinusRoomEl.classList.add('change-disabled');
  }
};

changeElMinusRooms.addEventListener('click', minusRooms);

// добавляем список детей
const addChildSelect = () => {
  const oneChildSelect = document.createElement('select');
  oneChildSelect.classList.add('select-child-age');
  oneChildSelect.innerHTML = `
<option value="0">0 years old</option>
<option value="1">1 years old</option>
<option value="2">2 years old</option>
<option value="3">3 years old</option>
<option value="4">4 years old</option>
<option value="5">5 years old</option>
<option value="6">6 years old</option>
<option value="7">7 years old</option>
<option value="8">8 years old</option>
<option value="9">9 years old</option>
<option value="10">10 years old</option>
<option value="11">11 years old</option>
<option value="12">12 years old</option>
<option value="13">13 years old</option>
<option value="14">14 years old</option>
<option value="15">15 years old</option>
<option value="16">16 years old</option>
<option value="17">17 years old</option>`;

  filterAge.insertAdjacentElement('beforeend', oneChildSelect);
  if (counterChildren > 9) {
    changeElPlusChildren.removeEventListener('click', addChildSelect);
  }
};

changeElPlusChildren.addEventListener('click', addChildSelect);

// удаляем список детей
const removeChildSelect = () => {
  const selects = document.querySelectorAll('.select-child-age');
  if (selects.length <= 0) return;
  return selects[selects.length - 1].remove();
};

changeElMinusChildren.addEventListener('click', removeChildSelect);