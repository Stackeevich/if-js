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
          <a href="#">
            <img class="favorite-item__img photo" src=${elem.imageUrl} alt="hotel_leopold">
          </a>
          <p class="favorite-item__title">${elem.name}</p>
          <p class="favorite-item__descr">${elem.city}, ${elem.country}</p>
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