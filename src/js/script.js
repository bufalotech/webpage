///////////////////////////////
// Smart Resize
///////////////////////////////

(function($,sr) {
    var debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args);
                    timeout = null;
            };
            if (timeout)
                clearTimeout(timeout); else if (execAsap)
                func.apply(obj, args);
                timeout = setTimeout(delayed, threshold || 100);
        };
    }
  
    // smartresize 
    jQuery.fn[sr] = function(fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };
})

(jQuery,'smartresize');


$(function() {

///////////////////////////////
// Fix the Home Height
///////////////////////////////

    var setHomeBannerHeight = function(){
        var homeHeight= $(window).height();
        $('#overlay-1').height(homeHeight);
    }

    setHomeBannerHeight();

///////////////////////////////
// One page Smooth Scrolling
///////////////////////////////

$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
            return false;
        }
    }
});

///////////////////////////////
// Center Home Slideshow Text
///////////////////////////////

function centerHomeBannerText() {
    var bannerText = jQuery('#wrapper .starting-text');
    var bannerTextTop = (jQuery('#wrapper').actual('height')/2) - (jQuery('#wrapper .starting-text').actual('height')/2) - 20;
    bannerText.css('padding-top', bannerTextTop+'px');
    bannerText.show();
}

centerHomeBannerText();

jQuery(window).smartresize(function() {
    setHomeBannerHeight();
    centerHomeBannerText();
});
    
});

$(document).ready(function(){
    new WOW().init();
		$("#client-speech").owlCarousel
		({
			autoPlay: 5000,
			navigation : false, // Show next and prev buttons
			slideSpeed : 1000,
			paginationSpeed : 1000,
			singleItem:false
		});

    var setHomeBannerHeight = function(){
   var homeHeight= $(window).height();
   $('#overlay-1').height(homeHeight);
    }
    setHomeBannerHeight();  

       
	});





$(document).ready(function(){

  var menu = $('#navigation > .navbar');
  var origOffsetY = $('#bottom').offset().top;

  function scroll() {
     if ($(window).scrollTop() > origOffsetY) {
        menu.addClass('navbar-white');
     } else {
        menu.removeClass('navbar-white');
     }
  }

  document.onscroll = scroll;

});

/* Contact Form */
$(document).ready(function(){

    var form =$('.contact_form');
    form.submit(function(e){

        e.preventDefault();


        if ( $('.contact_name').val() != '' &
             $('.contact_email').val() != '' &
              $('.contact_message').val() != '' ) {

                Email.send({
                    SecureToken : "e0e72f2e-aa5e-4dc1-b5a1-7427acb713ea",
                    To : 'brunomartintenaglia@gmail.com',
                    From : $('.contact_email').val(),
                    Subject : "Nuevo mensaje desde la web",
                    Body : "Nombre: " + $('.contact_name').val() + " <br> Correo: " + $('.contact_email').val() +"<br> Mensaje: " + $('.contact_message').val()
                }).then(
                  
                );

                $('.contact_name').val("");
                $('.contact_email').val("");
                $('.contact_message').val("");

                form.find('.alert').hide();
                form.append('<div class="alert alert--success">Gracias por escribirnos, pronto nos pondremos en contacto!</div>');

            return;

        } else {
            e.preventDefault();
            alert('Complete todos los campos del formulario')
        }
    });

});



function uploadFileToServer()
{
  var file = event.srcElement.files[0];
   var reader = new FileReader();
   reader.readAsBinaryString(file);
   reader.onload = function () {
       var dataUri = "data:" + file.type + ";base64," + btoa(reader.result);
       Email.send({
            SecureToken : "e0e72f2e-aa5e-4dc1-b5a1-7427acb713ea",
            To : 'brunomartintenaglia@gmail.com',
            From : 'brunomartintenaglia@gmail.com',
           Subject : "CV desde la pagina web",
           Body : "Sending file:" + file.name,
           Attachments : [
          	{
          		name : file.name,
          		data : dataUri
          	}]
       }).then(
         
       );

       $('.cv-upload-success').append('<div class="alert alert--success">Hemos recibido tu CV, pronto nos pondremos en contacto!</div>');
   };
   reader.onerror = function() {
       console.log('there are some problems');
   };
}