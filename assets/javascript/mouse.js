$(function($) {
	$(".about-text").on('click', function () {
		$("body").addClass("about-on");
	});

	$(".about-close").on('click', function () {
		$("body").removeClass("about-on");
	});
	
	//Education page
	
	$(".education-text").on('click', function () {
		$("body").addClass("education-on");
	});

	$(".education-close").on('click', function () {
		$("body").removeClass("education-on");
	});
	
	//Essay portfolio page
	
	$(".essay").on('click', function () {
		$("body").addClass("essay-on");
	});

	$(".essay-close").on('click', function () {
		$("body").removeClass("essay-on");
	});



	//Essay portfolio page
	
	$(".rapi").on('click', function () {
		$("body").addClass("rapi-on");
	});

	$(".rapi-close").on('click', function () {
		$("body").removeClass("rapi-on");
	});

	
	//cloeopatra portfolio page
	
	$(".cloeopatra").on('click', function () {
		$("body").addClass("cloeopatra-on");
	});

	$(".cloeopatra-close").on('click', function () {
		$("body").removeClass("cloeopatra-on");
		
	});

	
	//Adventofcode portfolio page
	
	$(".adventofcode").on('click', function () {
		$("body").addClass("adventofcode-on");
	});

	$(".adventofcode-close").on('click', function () {
		$("body").removeClass("adventofcode-on");
	});

	$(".website").on('click', function () {
		$("body").addClass("website-on");
	});
	$(".website-close").on('click', function () {
		$("body").removeClass("website-on");
	});
  });
  