//загружаем все скрипты только после того, как документ html будет полностью готов
$(document).ready(function () {

	//слайдер
	const slider = tns({
		container: '.carousel__wrapper',
		items: 1,
		slideBy: 'page',
		autoplay: false,
		// убрали кастомные стрелочки
		controls: false,
		// разместили кружочки внизу слайдера
		navPosition: "bottom"
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
		//this ссылается на определенный таб, то есть нажали на второй - выберется второй таб
		$(this)
			// при нажатии на определенный таб ($(this)), добавляем ему класс активности (.addClass('catalog__tab_active')), а у всех других табов класс активности убираем (siblings().removeClass)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			//В ближайщем родительском элементе (.closest('div.container')) ищем классы с контентом, который появляется при переключении между вкладками (find('div.catalog__content')), и убираем у них класс активности (removeClass('catalog__content_active')), а при нажатии на вкладку (eq($(this).index()), контенту, соответствующему этой вкладке, добавляем класс активности (addClass('active'))
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
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

	//функция с названием toggleSlide и переменной item, где item - это изменяемое название класса (классы для кнопок "подробнее" и "назад")
	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			});
		});
	};

	//задали переменные с названием класса для функций
	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');



	//модальные окна

	//вызываем модальное окно 1 (id="consultation")
	//обращаемся к дата-атрибуту-кнопке (дата атрибут указывается через квадратные скобки). При клике на кнопку будет срабатывать следующая функция:
	$('[data-modal=consultation]').on('click', function () {
		//класс overlay и модальное окно с id="consultation" будут медленно появляться на странице за счет плавного изменения прозрачности (fadeIn())
		$('.overlay, #consultation').fadeIn('slow');
	});

	//вызываенм модально окно 2 (id="order") и отображаем правильное название пульсометра в модальном окне 2
	//для каждой выбранной кнопки (each) будет выполняться следующая функция, где i отвечает за номер элемента
	$('.button_catalog').each(function (i) {
		//взяли именно ту кнопку ($(this)), на которую нажимаем в данный момент
		$(this).on('click', function () {
			//внутри модального окна берем класс modal__descr и помещаем внутрь текст из класса catalog-item__subtitle, беря при этом текст с определенной нумерацией
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});

	//закрываем все модальные окна при клике на крестик
	//при клике на крестик, будет выполняться следующая функция:
	$('.modal__close').on('click', function () {
		//перечисленные классы и id будут медленно исчезать со страницы за счет плавного изменения прозрачности (fadeIn())
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
	});

	//закрываем все модальные окна при клике на фон
	const overlay = document.querySelector('.overlay');
	const modal = document.querySelector('.modal');

	overlay.addEventListener('click', (event) => {
		if (event.target === overlay) {
			overlay.style.display = 'none';
			modal.style.display = 'none';
		}
	});


	//валидация форм (такой код работает только при подлючении скрипта)

	//задаем функцию для валидации формы, где validateForms - название функции, form - переменная, значения корторой задаем ниже
	function validateForms(form) {
		//обратились ко всем тегам form, существующим на страницу и задали им валидацию
		$(form).validate({
			rules: {
				//сделали поля обязательными для заполнения (выполняется по аотрибуту name). В html теперь не надо прописывать required для инпутов
				name: "required",
				phone: "required",
				//для email прописываем составное правило
				email: {
					required: true,
					//проверяем, действительно ли пользователь ввел email
					email: true
				}
			},
			messages: {
				name: "Пожалуйста, введите свое имя",
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
					required: "Пожалуйста, введите адрес своей электронной почты",
					email: "Неправильно введен адрес электронной почты"
				}
			},
		});
	};

	//задаем значения для переменной form, для каждой используемой формы надо задать свой id
	validateForms('#consultation-form');
	validateForms('#consultation form');
	validateForms('#order form');


	//маска для ввода номера телефона (взяли с сайта), при этом во всех инпутах с номером телефона необходимо убрать type="number" 
	$('input[name=phone]').mask("+7 (999) 999-99-99");


	//отправка сообщений на почту через локальный сервер с технологией AJAX (то есть без перезагрузки страницы)

	//обращаемся ко всем формам, сущесвующим на сайте ($('form')) и когда они будут отправляться будет выполняться определенная функция с дополнительным аргументом (e - event)
	$('form').submit(function (e) {
		//отменяем стандартное поведение браузера, когда после отправки формы страница перезагружается
		e.preventDefault();
		//отправляем форму на почту при помощи метода ajax, который есть внутри jquery (специальная технология взаимодействия с сервером , которая не требует выполнения перезагрузки)

		//если форма не прошла валидацию, то следующая фнукция не будет выполняться (то есть отправка данных на сервер не произодет)
		if (!$(this).valid()) {
			return;
		}

		$.ajax({
			//отдаем данные серверу
			type: "POST",
			//какой обработчик будет обрабатывать запрос (куда будем отправлять данные формы)
			url: "mailer/smart.php",
			//какие данные будут отправлять на сервер. Взяли данные именно из той формы, с которой работает пользователь. Serialize преобразует значения набора элементов в строку данных.
			data: $(this).serialize()
			//после того, как операция выполнена, будет выполняться еше одна функция
		}).done(function () {
			//внутри данной формы мы находим инпуты и обнуляем их значение (value)
			$(this).find("input").val("");
			//после отправки письма из форм с перечисленными id эти формы исчезают и медленно появляется окошко с благодарностью
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			//все формы на сайте обновляются (очищаются)
			$('form').trigger('reset');
		});
		//
		return false;
	});


	//пролистывание вверх при нажатии на стреловку вверх

	//на всем окне браузера отслеживается скролинг страницы пользователем, во время которого будет происходить функция
	$(window).scroll(function () {
		//если у страницы при скролинге отсчиталось больше 1600px
		if ($(this).scrollTop() > 1600) {
			//стрелочка появилась
			$('.page-up').fadeIn();
			//если сверху отступ составляет меньше 1600px
		} else {
			//стрелочка исчезает
			$('.page-up').fadeOut()
		}
	});


	//плавный скролинг вверх
	//берем все ссылки, параметр href которых начинается с # и задаем им определенную функцию, котоая будет срабатывать при клике
	$("a[href^='#']").click(function () {
		// задаем переменную с названием _href и получаем в эту переменную то значение, которые было в атрибуте (attr) href. Например, при нажатии на стрелочку вверх мы получим переменную const '#up'
		const _href = $(this).attr("href");
		// для html и body задаем анимацию
		$('html, body').animate({
			//при нажатии на ссылку, проистываем до блока с определенным id
			scrollTop: $(_href).offset().top + "px"
		});
		return false;
	});

});
