/*
 * Made by WebDesignCrowd
 * http://webdesigncrowd.com
 *
 */
 
(function($){
	$(function(){

	  // Fixed header animates in after scrolling past welcome
	  $('#navbar').affix({
        offset: {
          top: function () {
              if(site.url != site.base_script_url) return (this.top = -50)
              // return (this.top = $('.section.welcome').height() - 70)
              return (this.top = 50)
            }
        }
      });

    // sitebuild auto reload
    if (site.host.substr(0,10) == 'localhost.') {
      setInterval(function () {
        $.ajax({
          url: site.base_script_url,
          type: "GET",
          data: {reloadSitebuild: 1},
          dataType: "json",
          // async: true,
          // cache: true,
          success: function ( data, textStatus, jqXHR ) {
            // if(typeof console !== 'undefined') console.log( data );
            if (data.reload) {
              window.location.reload(); 
            }
          },
          error: function ( jqXHR, textStatus, errorThrown ) {
            // if(typeof console !== 'undefined') console.log( textStatus );
          },
          complete: function ( jqXHR, textStatus ) {
            // if(typeof console !== 'undefined') console.log( textStatus );
            // if(typeof console !== 'undefined') console.log( jqXHR.responseJSON );
          },
        });
      }, 2000);
    }
    
    // MixItUp Grid
    $(function(){
      $('.gallery').mixitup({
        easing: 'snap',
        resizeContainer: true
      });
		});
    
    // client tab init
    $(document).off('click.tab.data-api');
    $('a.tab').hover(function () { $(this).tab('show'); });
    
    // Tooltip init
    $(".service-icon i").tooltip();
    $(".social-media a").tooltip();
      
    // custom parallax 
    $(window).scroll(function() {
      var top = $(window).scrollTop();
      var width = $(window).width();
      var bottom = top + $(window).height();
      if (top == 0) {
        mmSlider1_step($('#mmSlider1'), 1, $('#mmSlider1').data('pos'));
        // $('#mmSlider1').css('opacity', '0').fadeIn(400);
      }
      if (width > 768) {
        $("img.background").css({top: 1 * Math.abs(top / 2)});
      }
      else {
        if (top > $(".section.welcome").height()) { $(".section.welcome").css("visibility", "hidden"); }
        else { $(".section.welcome").css("visibility", "visible"); }
      }
      
      $(".parallax").each(function() {
        if ((bottom > $(this).offset().top) && (width > 768)) {
          if ($(this).offset().top > top ) {
            var parallax = (Math.abs(top - $(this).offset().top) / 2);
          }
          else {
            var parallax = ($(this).offset().top - top) / 2;            
          }
          $(this).css("backgroundPosition", ("0px " + (parseInt(parallax)).toString() + "px"));
        }
        else {
          $(this).css("backgroundPosition", "0px 0px");
        }
      });
    });

    // Smooth Scrolling
    $("a.navbar-brand[href^='#'], ul.nav li a[href^='#'], a.scroll-down").click(function(e) {
       e.preventDefault();
       $('html, body').animate({ scrollTop: $(this.hash).offset().top-50 }, 600);
    });
    $("a.navbar-brand[href^='"+site.base_script_url+"#'], ul.nav li a[href^='"+site.base_script_url+"#'], a.scroll-down[href^='"+site.base_script_url+"#']").click(function(e) {
      var target = $(this).attr('href');
      target = target.substring(0, target.length-this.hash.length);
       if (target == site.url) {
          e.preventDefault();
         $('html, body').animate({ scrollTop: $(this.hash).offset().top-50 }, 600);
       }
    });
    
    // Small Navbar closes Open toggle menus 
    $("ul.nav li a[href^='#']").click(function () {
      $(".navbar-collapse.in").collapse('hide');
    });

    // you want to enable the pointer events only on click;
    $('#contact iframe').addClass('scrolloff'); // set the pointer events to none on doc ready
    $('#contact').on('click', function () {
        $('#contact iframe').removeClass('scrolloff'); // set the pointer events true on click
    });
    // you want to disable pointer events when the mouse leave the canvas area;
    $("#contact iframe").mouseleave(function () {
        $('#contact iframe').addClass('scrolloff'); // set the pointer events to none when mouse leaves the map area
    });

	}); // end of document ready
})(jQuery); // end of jQuery name space