const loadSliderHotels = () => {
  let position = 0;
  const slidesToShow = 4;
  const slidesToScroll = 1;
  const container = document.querySelector(`.recommend-list__wrapper`);
  const track = document.querySelector('.recommend__list');
  const btnPrev = document.querySelector('.btn-prev');
  const btnNext = document.querySelector('.btn-next');
  const items = document.querySelectorAll('.recommend__list-item');
  const itemCount = items.length;
  const itemWidth = container.clientWidth / slidesToShow;
  const movePosition = slidesToScroll * itemWidth;

  items.forEach((e) => {
    e.style.minWidth = `${itemWidth}px`;
  });

  const btn = () => {
    const setPosition = () => {
      track.style.transform = `translateX(${position}px)`;
    };
    btnPrev.addEventListener('click', () => {
      const itemsLeft = Math.abs(position) / itemWidth;
      position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
      track.style.transform = `translateX(${position}px)`;
      btnNext.disabled = position <= -(itemCount - slidesToShow) * itemWidth;
      btnPrev.disabled = position === 0;
      setPosition();
    });
    btnNext.addEventListener('click', () => {
      const itemsRight = Math.abs(position) + (slidesToShow * itemWidth) / itemWidth;
      position -= itemsRight >= slidesToScroll ? movePosition : itemsRight * itemWidth;
      track.style.transform = `translateX(${position}px)`;
      btnNext.disabled = position <= -(itemCount - slidesToShow) * itemWidth;
      btnPrev.disabled = position === 0;
      setPosition();
    });
  };
  btn();
};

export { loadSliderHotels };
