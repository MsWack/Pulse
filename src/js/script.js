const slider = tns({
	container: '.carousel__wrapper',
	items: 1,
	slideBy: 'page',
	autoplay: false,
	controls: false, // убрали кастомные стрелочки
	navPosition: "bottom" // разместили кружочки внизу слайдера
});


document.querySelector('.prev').addEventListener('click', function () { // назначаем созданные вручную кнопки для перелистывания слайдов
	slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () { // назначаем созданные вручную кнопки для перелистывания слайдов
	slider.goTo('next');
});