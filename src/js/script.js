$(document).ready(function () { //загружаем все скрипты только после того, как документ html будет полностью готов

	//слайдер
	const slider = tns({
		container: '.carousel__wrapper',
		items: 1,
		slideBy: 'page',
		autoplay: false,
		controls: false, // убрали кастомные стрелочки
		navPosition: "bottom" // разместили кружочки внизу слайдера
	});
	// назначаем созданные вручную кнопки для перелистывания слайдов (код взяли с сайта)
	document.querySelector('.prev').addEventListener('click', function () {
		slider.goTo('prev');
	});
	document.querySelector('.next').addEventListener('click', function () {
		slider.goTo('next');
	});


	//табы (вкладки)
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () { //знак $ - обращаемся к определенному элементу на странице
		$(this) //this ссылается на определенный таб, то есть нажали на второй - выберется второй таб
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active') // при нажатии на определенный таб ($(this)), добавляем ему класс активности (.addClass('catalog__tab_active')), а у всех других табов класс активности убираем (siblings().removeClass)
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active'); //В ближайщем родительском элементе (.closest('div.container')) ищем классы с контентом, который появляется при переключении между вкладками (find('div.catalog__content')), и убираем у них класс активности (removeClass('catalog__content_active')), а при нажатии на вкладку (eq($(this).index()), контенту, соответствующему этой вкладке, добавляем класс активности (addClass('active'))
	});

	/* //изменение карточки товара при нажатии на кнопку "подробнее" (неоптимизировано)
	$('.catalog-item__link').each(function (i) {//берем кнопку "подробнее" ($(.catalog-item__link)) и для каждого такого элемента (то есть для каждой кнопки "подробнее") прописываем определенную функцию (each(function(i))), где i отвечает за номер элемента
		$(this).on('click', function (e) {//взяли именно ту кнопку, на которую нажимаем в данный момент
			e.preventDefault(); // отменили стандартное поведение браузера, когда при нажатии на ссылку он переходит в начало страницы
			$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active'); //переключаем класс активности для контента, при нажатии на конкретную кнопку "подробнее" (eq(i)). То есть если класса нет, он добавится, если есть - уберется Если не поставить eq(i), то переключение класса будет происходить у всех элементов
			$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active'); //перелючаем класс активности для списка
		});
	});

	//изменение карточки товара при нажатии на кнопку "назад" (неоптимизировано)
	$('.catalog-item__back').each(function (i) {
		$(this).on('click', function (e) {
			e.preventDefault();
			$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
			$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
		});
	}); */


	//изменение карточки товара при нажатии на кнопку "подробнее" и "назад" (оптимизировано)
	function toggleSlide(item) { //функция с названием toggleSlide и переменной item, где item - это изменяемое название класса (классы для кнопок "подробнее" и "назад")
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			});
		});
	};

	toggleSlide('.catalog-item__link'); //задали переменные с названием класса для функции
	toggleSlide('.catalog-item__back');


	//модальные окна


	//вызываем модальное окно 1 (id="consultation")
	$('[data-modal=consultation]').on('click', function () {//обращаемся к дата-атрибуту-кнопке (дата атрибут указывается через квадратные скобки). При клике на кнопку будет срабатывать следующая функция:
		$('.overlay, #consultation').fadeIn('slow'); //класс overlay и модальное окно с id="consultation" будут медленно появляться на странице за счет плавного изменения прозрачности (fadeIn())
	});

	//вызываенм модально окно 2 (id="order") и отображаем правильное название пульсометра в модальном окне 2
	$('.button_catalog').each(function (i) { //для каждой выбранной кнопки (each) будет выполняться следующая функция, где i отвечает за номре элемента
		$(this).on('click', function () {//взяли именно ту кнопку ($(this)), на которую нажимаем в данный момент
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());//внутри модального окна берем класс modal__descr и помещаем внутрь текст из класса catalog-item__subtitle, ,беря при этом текст с определенной нумерацией
			$('.overlay, #order').fadeIn('slow');
		});
	});


	//закрываем все модальные окна
	$('.modal__close').on('click', function () { //при клике на крестик, будет выполняться следующая функция:
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow'); //перечисленные классы и id будут медленно исчезать со страницы за счет плавного изменения прозрачности (fadeIn())
	});

});


