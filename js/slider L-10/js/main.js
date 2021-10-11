(function ($) {
  $(function () {
    $("ul.tabs__items").on("click", "li:not(.tabs__item-active)", function () {
      $(this)
        .addClass("tabs__item-active")
        .siblings()
        .removeClass("tabs__item-active")
        .closest("div.container")
        .find("div.tabs__content")
        .removeClass("tabs__content-active")
        .eq($(this).index())
        .addClass("tabs__content-active");
    });
  });
})(jQuery);

$(document).ready(function () {
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
});

const data = [
  {
    name: "Hotel Leopold",
    city: "Saint Petersburg",
    country: "Russia",
    imageUrl:
      "https://res.cloudinary.com/intellectfox/image/upload/v1610379365/fe/hotel-leopold_mflelk.jpg",
  },
  {
    name: "Apartment Sunshine",
    city: "Santa Cruz de Tenerife",
    country: "Spain",
    imageUrl:
      "https://res.cloudinary.com/intellectfox/image/upload/v1610379364/fe/apartment-sunshine_vhdlel.jpg",
  },
  {
    name: "Villa Kunerad",
    city: "Vysokie Tatry",
    country: "Slowakia",
    imageUrl:
      "https://res.cloudinary.com/intellectfox/image/upload/v1610379365/fe/villa-kunerad_gdbqgv.jpg",
  },
  {
    name: "Hostel Friendship",
    city: "Berlin",
    country: "Germany",
    imageUrl:
      "https://res.cloudinary.com/intellectfox/image/upload/v1610379364/fe/hostel-friendship_aw6tn7.jpg",
  },
  {
    name: "Radisson Blu Hotel",
    city: "Kyiv",
    country: "Ukraine",
    imageUrl:
      "https://res.cloudinary.com/intellectfox/image/upload/v1610379365/fe/radisson-blu-hotel_jwtowg.jpg",
  },
  {
    name: "Paradise Hotel",
    city: "Guadalupe",
    country: "Mexico",
    imageUrl:
      "https://res.cloudinary.com/intellectfox/image/upload/v1610379365/fe/paradise-hotel_i6whae.jpg",
  },
  {
    name: "Hotel Grindewald",
    city: "Interlaken",
    country: "Switzerland",
    imageUrl:
      "https://res.cloudinary.com/intellectfox/image/upload/v1610379365/fe/hotel-grindewald_zsjsmy.jpg",
  },
  {
    name: "The Andaman Resort",
    city: "Port Dickson",
    country: "Malaysia",
    imageUrl:
      "https://res.cloudinary.com/intellectfox/image/upload/v1610379365/fe/the-andaman-resort_d2xksj.jpg",
  },
];

const homesInfoPanel = document.querySelector(".favorite-wrapper");

function hotelsItem(arr) {
  arr.map((item) => { const hotelsItem = document.createElement("div");
    hotelsItem.classList.add("guests-Homes");
    hotelsItem.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}">
      <div class="favorite-item__title">${item.name}</div>
      <div class="favorite-item__descr">${item.city}, ${item.country}</div>`;
    homesInfoPanel.append(hotelsItem);
  });
}

hotelsItem(data);