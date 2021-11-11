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

const homeGuestContentDiv = document.querySelector('#home-sectoin-content');

const pushFetchData = (data) => {
    if(data.length !== 0) {
        data.forEach((elem) => {
            homeGuestContentDiv.innerHTML += `
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

const sessionStorageCheck = () => {
    if (sessionStorage.getItem('homes-data')) {
        const data = JSON.parse(sessionStorage.getItem('homes-data'));
        pushFetchData(data);
    } else {
        fetch('https://fe-student-api.herokuapp.com/api/hotels/popular')
            .then(response => response.json())
            .then(data => sessionStorage.setItem('homes-data', JSON.stringify(data)))
            .catch(err => console.log('This is error', err));
    }
};

sessionStorageCheck()

