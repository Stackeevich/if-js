const loadSliderAvailableHotels = async () => {
  let position = 0;
  const slidesToShow = 4;
  const slidesToScroll = 1;
  const container = document.querySelector(`.available-list__wrapper`);
  const track = document.querySelector('.available__list');
  const btnPrev = document.querySelector('.btn-prev-available');
  const btnNext = document.querySelector('.btn-next-available');
  const items = document.querySelectorAll('.available__list-item');
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

export { loadSliderAvailableHotels };
