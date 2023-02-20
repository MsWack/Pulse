// весь код взяли на сайте slick

$(document).ready(function () { // обратились ко всему документу html, когда он будет полностью готов
	$('.carousel__wrapper').slick({ // все настройки для слайдера можно найти на сайте slick
		speed: 1200, // скорость прокрцтки слайдов
		adaptiveHeight: true, // высота слайда будет подстраиваться под высоту картинки в нем
		prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left.svg"</button>',
		nextArrow: '<button type="button" class="slick-next"><img src="../icons/right.svg"</button>',
		responsive: [ 
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					dots: true
				}
			}
		]
	});
});