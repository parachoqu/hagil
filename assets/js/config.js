	

/*Amplicar fotos-------------------------------------------  xxx--------------------------        */	


/*
http://ashleydw.github.io/lightbox/
Para configurar amplicação
<a href="https://unsplash.it/1200/768.jpg?image=251" data-toggle="lightbox">
    <img src="https://unsplash.it/600.jpg?image=251" class="img-fluid">
</a>*/
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

/*Fotos em carrosel-------------------------------------------  xxx--------------------------        */	

/* 
(function($) {
    "use strict";

    // manual carousel controls
    $('.next').click(function(){ $('.carousel').carousel('next');return false; });
    $('.prev').click(function(){ $('.carousel').carousel('prev');return false; });
    
    $('#postsCarousel .carousel-item').each(function(){
      var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));
      
      if (next.next().length>0) {
        next.next().children(':first-child').clone().appendTo($(this));
      }
      else {
      	$(this).siblings(':first').children(':first-child').clone().appendTo($(this));
      }
    });
    
})(jQuery); */







/*Carrosel deslizante em disposivos mobile-------------------------------------------  xxx--------------------------        */




$(function() {
 $("#slide_produto").swipe({

  swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

    if (direction == 'left') $(this).carousel('next');
    if (direction == 'right') $(this).carousel('prev');

  },
  allowPageScroll:"vertical"

});
	
 $("#slide_produtos").swipe({

  swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

    if (direction == 'left') $(this).carousel('next');
    if (direction == 'right') $(this).carousel('prev');

  },
  allowPageScroll:"vertical"

});
	
	
	
});






/*Slider-------------------------------------------  xxx--------------------------        */	
/*
	$('#banner').carousel({
		interval: 2000

	})
*/

/*Slider produto-------------------------------------------  xxx--------------------------        */	
/*	$('#slide_produto').carousel({
		interval: 2500

	})*/
 
	$(document).ready(function() {
		/*Menu efeito hover-------------------------------------------  xxx--------------------------        */
		$('li.nav-item').hover(function() {
			$(this).find('.submenu').stop(true, true).delay(200).fadeIn(500);
		}, function() {
			$(this).find('.submenu').stop(true, true).delay(200).fadeOut(500);
		});

		$('div.dropdown').hover(function() {
			$(this).find('.dropdown-submenu').stop(true, true).delay(200).fadeIn(500);
		}, function() {
			$(this).find('.dropdown-submenu').stop(true, true).delay(200).fadeOut(500);
		});
 




 

	/*Menu fixo-------------------------------------------  xxx--------------------------        */


 
		// Custom 
		var stickyToggle = function(sticky, stickyWrapper, scrollElement) {
			var stickyHeight = sticky.outerHeight();
			var stickyTop = stickyWrapper.offset().top;
			if (scrollElement.scrollTop() >= stickyTop) {
				stickyWrapper.height(stickyHeight);
				sticky.addClass("is-sticky");
			} else {
				sticky.removeClass("is-sticky");
				stickyWrapper.height('auto');
			}
		};

		// Find all data-toggle="sticky-onscroll" elements
		$('[data-toggle="sticky-onscroll"]').each(function() {
			var sticky = $(this);
			var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
			sticky.before(stickyWrapper);
			sticky.addClass('sticky');

			// Scroll & resize events
			$(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function() {
				stickyToggle(sticky, stickyWrapper, $(this));
			});

			// On page load
			stickyToggle(sticky, stickyWrapper, $(window));
		});
	});



 




	/*URL AMIGAVEL DA BUSCA-------------------------------------------  xxx--------------------------        */


$('#buscar').submit(function(){
		// pega url principal	
   	var url= $('*[name="url_buscar"]').val();
	var negocio= $('*[name=negocio]').val();
	var imovel = $('*[name=imovel]').val();	
	 var estado = $('*[name=estado]').val();
   	var cidade = $('*[name=cidade]').val();
   	var bairro = $('*[name=bairro]').val();
	var quartos = $('*[name=quartos]').val();
	var valor = $('*[name=valor_maximo]').val();
	var codigo = $('*[name=codigo]').val();
	//buscar-imovel/negocio/tipo/estado/cidade/bairro/valor
	alert(bairro);
	if(codigo==''){
	 if(negocio==''){negocio='negocio-todos';}
	 if(imovel==''){imovel='imovel-todos';}
	 if(cidade==''){cidade='cidade-todas';}
	 if(bairro==''){bairro='bairro-todos';}
	 if(quartos==''){quartos='quartos-todos';}
	 if(valor==''){valor='valor-todos';}
	url=url+'imoveis-buscar/'+negocio+'/'+imovel+'/'+estado+'/'+cidade+'/'+bairro+'/'+quartos+'/'+valor;
	}
	else{url=url+'imoveis-buscar/'+estado+'/'+codigo;}
 
	//buscar-imovel/negocio/tipo/estado/cidade/bairro/quartos/valor
	//url=url+'imoveis-buscar/'+negocio+'/'+imovel+'/'+estado+'/'+cidade+'/'+bairro+'/'+quartos+'/'+valor;
	 
   window.location= url;
   return false;
});







	/* ----------------------------------------------------------- */
	/*  Botão Top
	/* ----------------------------------------------------------- */

	//Check to see if the window is top if not then display button

	$(window).scroll(function () {
		if ($(this).scrollTop() > 300) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});

	//Click event to scroll to top

	$('.scrollToTop').click(function () {

		$('html, body').animate({
			scrollTop: 0
		}, 800);
		return false;
	});





    
$(document).ready(function(){
    
	var clickEvent = false;
	$('#myCarousel').carousel({
		interval:   4000	
	}).on('click', '.list-group li', function() {
			clickEvent = true;
			$('.list-group li').removeClass('active');
			$(this).addClass('active');		
	}).on('slid.bs.carousel', function(e) {
		if(!clickEvent) {
			var count = $('.list-group').children().length -1;
			var current = $('.list-group li.active');
			current.removeClass('active').next().addClass('active');
			var id = parseInt(current.data('slide-to'));
			if(count == id) {
				$('.list-group li').first().addClass('active');	
			}
		}
		clickEvent = false;
	});
})

$(window).load(function() {
    var boxheight = $('#myCarousel .carousel-inner').innerHeight();
    var itemlength = $('#myCarousel .item').length;
    var triggerheight = Math.round(boxheight/itemlength+1);
	$('#myCarousel .list-group-item').outerHeight(triggerheight);
});	
	










