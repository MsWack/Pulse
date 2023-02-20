//Устанавливаем стартовый индекс слайда по умолчанию:
let slideIndex = 1;
//Вызываем функцию, которая реализована ниже:
showSlides(slideIndex);

// Вперед/назад элементы управления (Увеличиваем индекс на n — показываем следующий слайд)
function plusSlides(n) {
	showSlides(slideIndex += n);
}

// Устанавливаем текущий слайд (эемент управления - кружочек под слайдом)
function currentSlide(n) {
	showSlides(slideIndex = n);
}
//функция перелистывания
function showSlides(n) {
	let i;
	//Обращаемся к элементам с названием класса "carousel__slide", то есть к картинкам:
	let slides = document.getElementsByClassName("carousel__slide");
	let dots = document.getElementsByClassName("dot");
	//Проверяем количество слайдов:
	if (n > slides.length) { slideIndex = 1 }
	if (n < 1) { slideIndex = slides.length }
	//Проходим по каждому слайду в цикле for:
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	//Делаем элемент блочным:
	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active";
}