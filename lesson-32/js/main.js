import { loadSliderHotels } from './slider.js';
import { sorted } from './sorter.js';
import { filter } from './filter.js';

const responseHotelsData = async (url) =>
  await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));

const getHotelsData = async (url) => {
  const preLoadedData = sessionStorage.getItem('cacheHotels');
  if (!preLoadedData) {
    const hotelsData = await responseHotelsData(url, {});
    sessionStorage.setItem('cacheHotels', JSON.stringify(hotelsData));

    return hotelsData;
  }
  return JSON.parse(preLoadedData);
};

const loadData = async () => {
  const hotelsData = await getHotelsData('https://fe-student-api.herokuapp.com/api/hotels/popular');

  const sortHotelData = sorted(hotelsData);

  sortHotelData.forEach((el) => {
    const recList = document.querySelector('.recommend__list');
    const li = document.createElement('li');
    const img = document.createElement('img');
    const hotelName = document.createElement('a');
    const hotelLocation = document.createElement('p');
    li.classList.add('recommend__list-item');
    img.src = el.imageUrl;
    hotelName.href = '#';
    hotelName.textContent += el.name;
    hotelLocation.textContent += `${el.city}, ${el.country}`;
    li.appendChild(img);
    li.appendChild(hotelName);
    li.appendChild(hotelLocation);
    recList.appendChild(li);
  });
  loadSliderHotels();
};

loadData();
filter();
