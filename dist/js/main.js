$(".accordion-item").click(function () {
  $(this).toggleClass("active");
  $(this)
    .children(".item-header")
    .children(".accordion-item-btn")
    .toggleClass("accordion-item-btn-open");
});


$(function () {
  $("#callbackform").validate({
    rules: {
      
      email: {
        required: true,
        email: true,
      },
      phone: {
        required: true,
      },
      name: {
        required: true,
       lettersonly: true,
      },
	  customCheckbox: {
		required: true,
	  }
    },
    messages: {
      name: "Введите свое имя",
      email: "Введите ваш email",
      phone: "Введите ваш номер телефона",
	  customCheckbox: 'Подтвердите ваше согласие с условиями'
    },
    submitHandler: function (form) {
      form.submit();
    },
  });
});
jQuery.validator.addMethod(
   "lettersonly",
   function (value, element) {
     return this.optional(element) || /^[a-zA-ZА-Яа-я-ё\s]+$/i.test(value);
   },
   "Incorrect format"
 );
// iMask

var element = document.getElementById("imask-phone");
var maskOptions = {
  placeholder: "+{000}(00)000-00-00",
  mask: "+{375}(00)000-00-00",
};
var mask = IMask(element, maskOptions);



var swiper = new Swiper(".mySwiper", {
  spaceBetween: 15,
  direction: "horizontal",
  slidesPerView: "auto",
  freeMode: true,
  loop: true,
  autoplay: {
    delay: 1,
    disableOnInteraction: false
  },
  slidesPerView: 'auto',
  speed: 9000,
  grabCursor: true,
  mousewheelControl: true,
  keyboardControl: true,
  scrollbar: {
    el: ".swiper-scrollbar",
  },
  breakpoints: {
    400: {
      spaceBetween: 30
    }
  }
  // mousewheel: true,
});

var swiper = new Swiper(".swiperClient", {
	spaceBetween: 15,
	direction: "horizontal",
	slidesPerView: 2,
	freeMode: true,
	loop: true,
	autoplay: {
	  delay: 1,
	  disableOnInteraction: false
	},
	speed: 9000,
	grabCursor: true,
	mousewheelControl: true,
	keyboardControl: true,
	// scrollbar: {
	//   el: ".swiper-scrollbar",
	// },
	breakpoints: {
	  400: {
		spaceBetween: 30
	  },
	  768: {
		slidesPerView: 3,

	  },
	  1024: {
		slidesPerView: 4,

	  }
	}
	// mousewheel: true,
  });
  

//Resize textarea
jQuery(document).ready(function ($){
  // Start JS
    function elasticArea() {
      $('.callback-textarea').each(function(index, element) {
         var elasticElement = element,
            $elasticElement = $(element),
            initialHeight = initialHeight || $elasticElement.height(),
            delta = parseInt( $elasticElement.css('paddingBottom') ) + parseInt( $elasticElement.css('paddingTop') ) || 0,
            resize = function() {
              $elasticElement.height(initialHeight);
              $elasticElement.height( elasticElement.scrollHeight - delta );
          };
        $elasticElement.on('input change keyup', resize);
        resize();
      });
    };
  elasticArea();
  // END JS
  });


// Calculator 
var nds = 20;
			var commission = 0;
			var amount_for_discount = 0;
			var input = $('.sum-input #input-num');


			$('.radio-box .logo-service').on('click', function (event) {
				input.val("");
				input.removeClass('success error');
				$('.count-info').removeClass("show");
				$('#count-form').removeClass("show");
				commission = $(this).data('commission');
				$('#discount-input').val(0);
				$('#commission-input').val(commission);
				$('.radio-box .logo-service').removeClass('active');
				$('.amount').text("-- RUB");
				$(this).addClass('active');
				input.attr('placeholder', 'минимум ' + $(this).data('min_amount'));
				input.attr('min', $(this).data('min_amount'));
				input.focus();
			});

			input.on("focusin", function () {
				$(this).removeClass('success error');
				$('#count-info').removeClass("show");
			});


			function get_data() {
				elem = $("#input-num");
				$('.discount').text('');
				var inputval = elem.val();
				var active = $('.radio-box .logo-service.active');
				if ((parseInt(inputval) == inputval) && (inputval > (active.data('min_amount') - 1))) {
					elem.addClass('success');
					$('#commission-input').val(active.data('commission'));
					let i = 1;
					while (active.data('amount_for_discount_' + i)) {
						amount_for_discount = active.data('amount_for_discount_' + i);
						if ((amount_for_discount - 1) < inputval) {
							$('#discount-input').val(active.data('discount_' + i));
							$('#commission-input').val(active.data('commission_' + i));
						}
						i++;
					}
					if ($('#discount-input').val() > 0) {
						$('.discount').text('Ваша скидка ' + $('#discount-input').val() + '%');
					}
					if ($('#commission-input').val() > 0) {
						$('.discount').text('Комиссия ' + $('#commission-input').val() + '%');
					}
					return;
				} else {
					elem.addClass('error');

				}
			}

			function go_count() {
				if ($('.radio-box .logo-service.active').hasClass("tiktok")) {
					calculateTikTok();
				} else {
					calculate();
				}

			}

			input.on("focusout", function () {
				get_data();
			});

			function calculate() {
				if (input.hasClass("success")) {
					var discount = Number($('#discount-input').val());

					var commis = Number($('#commission-input').val());

					var inp = Number($('.sum-input input.success').val());

					var sum_commission = (inp / 100) * commis;

					var sum_discount = (inp / 100) * discount;

					// var total = inp + sum_commission - sum_discount;

					var total = inp - sum_commission + sum_discount;


					var sum_nds = (total / 100) * nds;

					// var am = total + sum_nds;
					var am = total;
					//console.log('итого ' + am);
					$('.amount').text((Math.ceil(am * 100) / 100).toLocaleString('ru-RU') + ' BYN');
					$('.count-info').addClass("show");
					$('#count-form').addClass("show");
				} else {
          			$('.count-info').removeClass("show");
					console.log("error");
				}
			}

			function calculateTikTok() {
				if (input.hasClass("success")) {
					var discount = Number($('#discount-input').val());
					//console.log('скидка ' + discount);
					var commis = Number($('#commission-input').val());
					//console.log('комиссия ' + commis);
					var inp = Number($('.sum-input input.success').val());
					//console.log('сумма ' + inp);
					var sum_commission = (inp / 100) * commis;
					//console.log('сумма комиссии ' + sum_commission);
					var sum_discount = (inp / 100) * discount;
					//console.log('сумма скидки ' + sum_discount);
					var am = inp + sum_commission - sum_discount;
					//console.log('Сумма без НДС: ' + am);
					var sum_nds = (am / 100) * nds;
					//console.log('сумма ндс ' + sum_nds);
					// var am_nds = am + sum_nds;
					var am_nds = am;

					//console.log('Сумма с НДС: ' + am_nds);
					$('.amount').text((Math.ceil(am_nds * 100) / 100).toLocaleString('ru-RU') + ' BYN');
					$('.count-info').addClass("show");
					$('#count-form').addClass("show");
				} else {
					console.log("error");
				}
			}


			$('.button-count').on('click', function () {
				go_count();
			});

			document.getElementById('sum-input').addEventListener('submit', function (e) {
				e.preventDefault();
				get_data();
				go_count();
			});

let headerFix = document.querySelector('.header');
let wrapperFix = document.querySelector('.wrapper')
let scrollpos = window.pageYOffset

wrapperFix.style.paddingTop = 25 + headerFix.clientHeight + 'px'

