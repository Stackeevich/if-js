// Header form people
const adultsChildrenRooms = document.getElementById('peopleFilter');
const minusAdults = document.getElementById('minus-adults');
const plusAdults = document.getElementById('plus-adults');
const minusChildren = document.getElementById('minus-children');
const plusChildren = document.getElementById('plus-children');
const minusRoom = document.getElementById('minus-room');
const plusRoom = document.getElementById('plus-room');
const formPeople = document.getElementById('filter-people');
const inscriptionPeople = document.getElementById('Adults-Children-Room');

const filterCounts = {
  adults: {
    min: 0,
    max: 30,
    current: 2
  },
  children: {
    min: 0,
    max: 10,
    current: 0,
    maximumAge: 17
  },
  rooms: {
    min: 0,
    max: 30,
    current: 1
  }
}

const addSelectChildren = () =>{
  const select = document.createElement('select');
  for (let i = 0; i < filterCounts.children.maximumAge; i++) {
    select.insertAdjacentHTML('beforeend',`<option>${i + 1} years old</option>`);
  }
  return select;
}

const choosePeopleOn = (event) => {
  formPeople.classList.remove('header__display-none');
  inscriptionPeople.classList.add('header__input-border');
  checkInCheckOutOff();
  event.stopPropagation();
}

const choosePeopleOf = (event) => {
  formPeople.classList.add('header__display-none');
  inscriptionPeople.classList.remove('header__input-border');
  event.stopPropagation();
}

const more = (event) => {
  const count = (countVariant, max) => {
    if (countVariant < max) {
      countVariant++;
      if (countVariant === max) event.target.classList.add('header__no-activity');
      if (countVariant !== 0) event.target.previousElementSibling.previousElementSibling.classList.remove('header__no-activity');
    } else {
      countVariant;
    }
    event.target.previousElementSibling.innerHTML = `${countVariant}`;
    return countVariant;
  }

  if (event.target.getAttribute('id') === 'plus-adults'){
    filterCounts.adults.current = count(filterCounts.adults.current, filterCounts.adults.max);

  } else if (event.target.getAttribute('id') === 'plus-children') {
    filterCounts.children.current = count(filterCounts.children.current, filterCounts.children.max);
    if (filterCounts.children.current === 1) {
      document.getElementById('header__childs-age').classList.remove('header__display-none');
    }
    
    document.getElementById('header__childs-age').appendChild(addSelectChildren()); 

  } else {
    filterCounts.rooms.current = count(filterCounts.rooms.current, filterCounts.rooms.max);
  }
  inscriptionPeople.innerHTML = `${filterCounts.adults.current} Adults - ${filterCounts.children.current} Children - ${filterCounts.rooms.current} Room`;
  event.stopPropagation();
}

const smoller = (event) => {
  const count = (countVariant, max) => {
    if (countVariant > 0) { 
      countVariant--;
      if (countVariant !== max) event.target.nextElementSibling.nextElementSibling.classList.remove('header__no-activity');
      if (countVariant === 0) event.target.classList.add('header__no-activity');
    } else {
      countVariant;
    }
    event.target.nextElementSibling.innerHTML = `${countVariant}`;
    return countVariant;
  }

  if (event.target.getAttribute('id') === 'minus-adults'){
    filterCounts.adults.current = count(filterCounts.adults.current, filterCounts.adults.max);
  
  } else if (event.target.getAttribute('id') === 'minus-children') {
    filterCounts.children.current = count(filterCounts.children.current, filterCounts.children.max);
    if (filterCounts.children.current === 0) {
      document.getElementById('header__childs-age').classList.add('header__display-none');
    }
    document.getElementById('header__childs-age').removeChild(document.querySelector('select')); 
  
  } else {
    filterCounts.rooms.current = count(filterCounts.rooms.current, filterCounts.rooms.max);
  }
  inscriptionPeople.innerHTML = `${filterCounts.adults.current} Adults - ${filterCounts.children.current} Children - ${filterCounts.rooms.current} Room`;
  event.stopPropagation();
}

adultsChildrenRooms.addEventListener('click', choosePeopleOn);
document.body.addEventListener('click', choosePeopleOf);
plusAdults.addEventListener('click', more);
minusAdults.addEventListener('click', smoller);
plusChildren.addEventListener('click', more);
minusChildren.addEventListener('click', smoller);
plusRoom.addEventListener('click', more);
minusRoom.addEventListener('click', smoller);

// Header calendar

const nextMonthRight = document.getElementById('second-month-calendar-right');
const previousMonthLeft = document.getElementById('second-month-calendar-left');
const currentMonth = document.getElementById('first-month-calendar');
const currentMonthNext = document.getElementById('second-month-calendar');
const checkInCheckOut = document.getElementById('chose-date');
const calendarBlock = document.getElementById('calendar-block');

const dateUser = {
  checkInDate: 28,
  checkInDateInMonth: false,
  checkOutDate: 10,
  checkOutDateInMonth: true,
};

let countFirstMonth = 0;
let countSecondMonth = 1;
let chooseDateCurrent = 0;
let chooseDateCurrentEnd = 63;
let labelIn = 'Check-in';
let labelOut = 'Check-out';
const todayDate = new Date();
const arrayWeek = [7, 1, 2, 3, 4, 5, 6];

const checkInCheckOutOn = (event) => {
  calendarBlock.classList.remove('header__display-none');
  checkInCheckOut.classList.add('header__input-border');
  event.stopPropagation();
}

function checkInCheckOutOff(event) {
  calendarBlock.classList.add('header__display-none');
  checkInCheckOut.classList.remove('header__input-border');
}

const changeInscriptionDate = () => checkInCheckOut.innerHTML = `${labelIn} - ${labelOut}`;

const сurrentMonth = (nextMonth) => new Date(todayDate.getFullYear(), todayDate.getMonth() + nextMonth, 1);

const whatStartDayWeek = (nextMonth) => arrayWeek[(new Date(сurrentMonth(nextMonth).getFullYear(), сurrentMonth(nextMonth).getMonth(), 1)).getDay()];

const howMatchDaysInMonth = (nextMonth) => new Date(сurrentMonth(nextMonth).getFullYear(), сurrentMonth(nextMonth).getMonth() + 1, 0).getDate();

const getCalendarMonth = (daysInMonth, daysInWeek, dayOfWeek, daysUser) => {
  const amountDayInMonth = (daysInMonth + (dayOfWeek - 1)) % daysInWeek === 0 
    ? daysInMonth + (dayOfWeek - 1) 
    : (daysInWeek - (daysInMonth + (dayOfWeek - 1)) % daysInWeek + daysInMonth + (dayOfWeek - 1));  
  let month = [];
  let weekOfCalendar = [];
  let dataDay = {};
  for (let day = 1; day <= amountDayInMonth; day++) {

    if (day <= dayOfWeek - 1) {
      dataDay.dayOfMonth = daysInMonth - (dayOfWeek - 1) + day;
      dataDay.notCurrentMonth = true;
      dataDay.currentDay = false;
      
      if (daysUser.checkInDateInMonth) {
        dataDay.selectedDay = false;
      } else {
        dataDay.selectedDay = daysUser.checkInDate <= dataDay.dayOfMonth;
      }

      weekOfCalendar.push(dataDay);
      dataDay = {};

    } else if (day <= daysInMonth + (dayOfWeek - 1)) {
      dataDay.dayOfMonth = day - (dayOfWeek - 1);
      dataDay.notCurrentMonth = false;
      
      if (!daysUser.checkInDateInMonth && !daysUser.checkOutDateInMonth) {
        dataDay.selectedDay = true;
      } else if (daysUser.checkOutDateInMonth) {
        dataDay.selectedDay = dataDay.dayOfMonth <= daysUser.checkOutDate;
      } else {
        dataDay.selectedDay = dataDay.dayOfMonth >= daysUser.checkInDate;
      }
      
      dataDay.currentDay = todayDate.getDate() === dataDay.dayOfMonth;
      weekOfCalendar.push(dataDay);
      dataDay = {};

    } else {
      dataDay.dayOfMonth = day - (dayOfWeek - 1) - daysInMonth;
      dataDay.notCurrentMonth = true;
      dataDay.currentDay = false;
      
      if (daysUser.checkOutDateInMonth) {
        dataDay.selectedDay = false;
      } else {
        dataDay.selectedDay = dataDay.dayOfMonth <= daysUser.checkOutDate;
      }
      weekOfCalendar.push(dataDay);
      dataDay = {};
    }

    if (weekOfCalendar.length === daysInWeek) {
      month.push(weekOfCalendar);
      weekOfCalendar = [];
    }
  }

  return month;
}

const newWeek = (week, dataMonth, anyMonth) => {
  const newWeekElement = document.createElement('div');
  for (let i = 0; i < 7; i++){
    const newDayElement = document.createElement('p');
    
    if (dataMonth[week][i].notCurrentMonth){
      newDayElement.innerHTML = '';
      newDayElement.setAttribute('class', 'header__countday-of-week-none');
    } else {
      newDayElement.innerHTML = `${dataMonth[week][i].dayOfMonth}`;
      newDayElement.setAttribute('class', 'header__countday-of-week');
      newDayElement.setAttribute('id', `${dataMonth[week][i].dayOfMonth}`);
      if (dataMonth[week][i].dayOfMonth < todayDate.getDate() && anyMonth === 0) {
        newDayElement.style.color = 'var(--secondary-text)';
        newDayElement.setAttribute('past','day-has-passed');
      }
      if (dataMonth[week][i].currentDay && anyMonth === 0) newDayElement.style.color = 'var(--primary)';
    }
    
    newWeekElement.appendChild(newDayElement);
  }
  newWeekElement.setAttribute('class', 'header__count-day-of-week');
  return newWeekElement;
}

const fillingOfTheMonth = (countFirst, countSecond) => {
  const newElement = () => {
    const newMonthElement = document.createElement('div');
    newMonthElement.setAttribute('class', `header__number-of-days`);
    return newMonthElement;
  }
  
  let dataFirstMonth = getCalendarMonth(howMatchDaysInMonth(countFirst), 7, whatStartDayWeek(countFirst), dateUser);
  currentMonth.appendChild(newElement());
  for (let q = 0; q < dataFirstMonth.length; q++)
  document.querySelector('.header__number-of-days').appendChild(newWeek(q, dataFirstMonth, countFirst));

  let dataSecondMonth = getCalendarMonth(howMatchDaysInMonth(countSecond), 7, whatStartDayWeek(countSecond), dateUser);
  currentMonthNext.appendChild(newElement());
  for (let q = 0; q < dataSecondMonth.length; q++)
  document.querySelector('#second-month-calendar .header__number-of-days').appendChild(newWeek(q, dataSecondMonth, countSecond));
}

fillingOfTheMonth(countFirstMonth, countSecondMonth);

const letMonth = (count) => {
  let newMonth = new Date();
  return new Date(newMonth.setMonth(newMonth.getMonth() + count));
}

const choseMonth = (count) => {
  const nameMonth = document.createElement('p');
  nameMonth.appendChild(document.createTextNode(`${letMonth(count).toLocaleDateString('en-us', { year: 'numeric', month: 'long'})}`));
  nameMonth.setAttribute('class', 'header__month-year');
  return nameMonth;
}  

document.querySelector('#first-month-calendar div:first-of-type').appendChild(choseMonth(0));
document.querySelector('#second-month-calendar div:first-of-type').appendChild(choseMonth(countSecondMonth));

const rewritingMonths = () => {
  document.querySelector('#first-month-calendar .header__number-of-days').remove();
  document.querySelector('#second-month-calendar .header__number-of-days').remove();
  document.querySelector('#second-month-calendar .header__month-year').remove();
  document.querySelector('#second-month-calendar div:first-of-type').appendChild(choseMonth(countSecondMonth));
}

nextMonthRight.addEventListener('click', (event) => {
  countSecondMonth++;
  rewritingMonths();
  previousMonthLeft.classList.remove('header__display-none');
  fillingOfTheMonth(countFirstMonth, countSecondMonth);
  event.stopPropagation();
});

previousMonthLeft.addEventListener('click', (event) => {
  countSecondMonth--;
  rewritingMonths();
  if ( countSecondMonth === 1) previousMonthLeft.classList.add('header__display-none');
  fillingOfTheMonth(countFirstMonth, countSecondMonth);
  event.stopPropagation();
});

const changeLabeIn = (numberDay, numberMonth) => {
  labelIn = (`${numberDay}.${letMonth(numberMonth).toLocaleDateString('en-us', { month: '2-digit'})}.${letMonth(numberMonth).toLocaleDateString('en-us', { year: 'numeric' })}`);
}

const changeLabeOut = (numberDay, numberMonth) => {
  labelOut = (`${numberDay}.${letMonth(numberMonth).toLocaleDateString('en-us', { month: '2-digit'})}.${letMonth(numberMonth).toLocaleDateString('en-us', { year: 'numeric' })}`);
}

currentMonth.addEventListener('click', (event) => {
  
  if (chooseDateCurrent!== 0 && chooseDateCurrentEnd !== 63 && event.target.hasAttribute('id') && !event.target.hasAttribute('past')) {
    document.querySelectorAll('.header__countday-of-week').forEach((n) => n.setAttribute('class','header__countday-of-week'));
    chooseDateCurrent = 0;
    chooseDateCurrentEnd = 63;
    event.target.classList.toggle('background-color__date');
    chooseDateCurrent = event.target.id;
    labelOut = 'Check-out';
    changeLabeIn(chooseDateCurrent, countFirstMonth);
    
  } else if (event.target.id !== chooseDateCurrent && event.target.id >= todayDate.getDate() && chooseDateCurrent > Number(event.target.id)){
    document.querySelectorAll('.header__countday-of-week').forEach((n) => n.setAttribute('class','header__countday-of-week'));
    event.target.classList.toggle('background-color__date');
    chooseDateCurrent = event.target.id;
    changeLabeIn(chooseDateCurrent, countFirstMonth);
    
  } else if (event.target.id >= todayDate.getDate() && Number(event.target.id) > chooseDateCurrent && chooseDateCurrent !== 0 && Number(event.target.id) < chooseDateCurrentEnd) {
    event.target.classList.toggle('background-color__date');
    chooseDateCurrentEnd = event.target.id;
    
    document.querySelectorAll('#first-month-calendar .header__countday-of-week').forEach((n) => {
      if (Number(n.innerHTML) > chooseDateCurrent && Number(n.innerHTML) < chooseDateCurrentEnd) {
        n.setAttribute('class','header__countday-of-week background-color__intermediate-dates');
      };
    });

    changeLabeOut(chooseDateCurrentEnd, countFirstMonth);
    changeInscriptionDate();
    checkInCheckOutOff();
    
  } else if (event.target.id >= todayDate.getDate()) {
    
    event.target.classList.toggle('background-color__date');
    chooseDateCurrent = event.target.id;
    changeLabeIn(chooseDateCurrent, countFirstMonth);
    
  }

  if (document.querySelector('.background-color__date') === null) {
    labelIn = 'Check-in';
    labelOut = 'Check-out';
  }
  changeInscriptionDate();
  event.stopPropagation();
});

currentMonthNext.addEventListener('click', (event) => {

  if (chooseDateCurrent!== 0 && chooseDateCurrentEnd !== 63 && event.target.hasAttribute('id')) {
    document.querySelectorAll('.header__countday-of-week').forEach((n) => n.setAttribute('class','header__countday-of-week'));
    chooseDateCurrent = 0;
    chooseDateCurrentEnd = 63;
    event.target.classList.toggle('background-color__date');
    chooseDateCurrent = howMatchDaysInMonth(0) + Number(event.target.id);
    labelOut = 'Check-out';
    changeLabeIn(Number(event.target.id), countSecondMonth);
    
  } else if (howMatchDaysInMonth(0) + Number(event.target.id) !== chooseDateCurrent && chooseDateCurrent > howMatchDaysInMonth(0) + Number(event.target.id) && event.target.hasAttribute('id')) {
    document.querySelectorAll('.header__countday-of-week').forEach((n) => n.setAttribute('class','header__countday-of-week'));
    event.target.classList.toggle('background-color__date');
    chooseDateCurrent = howMatchDaysInMonth(0) + Number(event.target.id);
    changeLabeIn(Number(event.target.id), countSecondMonth);
    
  } else if ( Number(event.target.id) + howMatchDaysInMonth(0) > chooseDateCurrent && chooseDateCurrent !== 0 && Number(event.target.id) + howMatchDaysInMonth(0) < chooseDateCurrentEnd && event.target.hasAttribute('id')) {
    event.target.classList.toggle('background-color__date');
    chooseDateCurrentEnd = howMatchDaysInMonth(0) + Number(event.target.id);
    
    document.querySelectorAll('#first-month-calendar .header__countday-of-week').forEach((n) => {
      if (chooseDateCurrent < howMatchDaysInMonth(0) && Number(n.innerHTML) > chooseDateCurrent) {
        n.setAttribute('class','header__countday-of-week background-color__intermediate-dates');
      };
    });

    document.querySelectorAll('#second-month-calendar .header__countday-of-week').forEach((n) => {
      if (howMatchDaysInMonth(0) + Number(n.innerHTML) > chooseDateCurrent && howMatchDaysInMonth(0) + Number(n.innerHTML) < chooseDateCurrentEnd) {
        n.setAttribute('class','header__countday-of-week background-color__intermediate-dates');
      };
    });

    changeLabeOut(Number(event.target.id), countSecondMonth);  
    changeInscriptionDate();
    checkInCheckOutOff();
    
  } else if (Number(event.target.id) !== 0 && (/\d/g).test(event.target.id) && (event.target.id).length <= 2) {
    event.target.classList.toggle('background-color__date');
    chooseDateCurrent = howMatchDaysInMonth(0) + Number(event.target.id);
    changeLabeIn(Number(event.target.id), countSecondMonth);
    
  }

  if (document.querySelector('.background-color__date') === null) {
    labelIn = 'Check-in';
    labelOut = 'Check-out';
  }

  changeInscriptionDate();
  event.stopPropagation();
});

checkInCheckOut.addEventListener('click', checkInCheckOutOn);
checkInCheckOut.addEventListener('click', choosePeopleOf);
document.body.addEventListener('click', checkInCheckOutOff);