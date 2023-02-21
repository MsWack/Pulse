$(document).ready(function () {
	$('.carousel__wrapper').slick({
		speed: 1200,
		adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
		responsive: [
			{
				breakpoint: 768, // 767px и ниже
				settings: {
					dotsClass: 'slick-dots',
					dots: true,
					arrows: false
				}
			}
		]
	});

});