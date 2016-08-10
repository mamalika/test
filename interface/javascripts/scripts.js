$(document).ready(function() {
    if ($(window).width() < 1000) {
        $('.productTrigger').click(function() {
            $('body').addClass('ovh');
        });
        $('.productOverLay .fa-close').click(function() {
            $('body').removeClass('ovh');
        });
    }
    
   $('.productTrigger').click(function(e) {
      $('.productOverLay ').removeClass('productOverLayShow');
      $(this).next('.productOverLay').addClass('productOverLayShow');
      e.stopPropagation();
   });
   function closeProductOverLay(){
      $('.productOverLay ').removeClass('productOverLayShow');
   }
   $('.productOverLay').click(function(e) {
      e.stopPropagation();
   });
   $(document).keyup(function(e) {
      if (e.keyCode == 27) {
          closeProductOverLay();
      }
   });
   $('body, .fa-close').click(function() {
      closeProductOverLay();
   });
   $(window).load(function(){
        $(".productOverLayInner").mCustomScrollbar({ });
   });

   // var keys = {37: 1, 38: 1, 39: 1, 40: 1};
   // function preventDefault(e) {
   //   e = e || window.event;
   //   if (e.preventDefault)
   //       e.preventDefault();
   //   e.returnValue = false;
   // }
   // function preventDefaultForScrollKeys(e) {
   //     if (keys[e.keyCode]) {
   //         preventDefault(e);
   //         return false;
   //     }
   // }
   // function disableScroll() {
   //   if (window.addEventListener)
   //       window.addEventListener('DOMMouseScroll', preventDefault, false);
   //   window.onwheel = preventDefault;
   //   window.onmousewheel = document.onmousewheel = preventDefault;
   //   window.ontouchmove  = preventDefault;
   //   document.onkeydown  = preventDefaultForScrollKeys;
   // }
   // function enableScroll() {
   //     if (window.removeEventListener)
   //         window.removeEventListener('DOMMouseScroll', preventDefault, false);
   //     window.onmousewheel = document.onmousewheel = null;
   //     window.onwheel = null;
   //     window.ontouchmove = null;
   //     document.onkeydown = null;
   // }
   if ( $(window).width() > 1024 ) {
        $('.navTrigger').hide();
        $(window).scroll(function() {
            if ($(this).scrollTop() > 1){
                $('.navTrigger').fadeIn(100);
                $('.navTrigger').addClass('navTriggerMoved');
            }else{
                $('.navTrigger').removeClass('navTriggerMoved');
                $('.navTrigger').fadeOut(700);
            }
        });
    }

    var overlayNav = $('.overlayNav'),
        overlayContent = $('.overlayContent'),
        navigation = $('.fullNav'),
        toggleNav = $('.navTrigger');

    layerInit();
    $(window).on('resize', function(){
        window.requestAnimationFrame(layerInit);
    });

    toggleNav.on('click', function(){
        if(!toggleNav.hasClass('close-nav')) {
            toggleNav.addClass('close-nav');

            overlayNav.children('span').velocity({
                translateZ: 0,
                scaleX: 1,
                scaleY: 1,
            }, 1000, 'easeInCubic', function(){
                navigation.addClass('fade-in');
            });
        } else {
            toggleNav.removeClass('close-nav');

            overlayContent.children('span').velocity({
                translateZ: 0,
                scaleX: 1,
                scaleY: 1,
            }, 50, 'easeInCubic', function(){
                navigation.removeClass('fade-in');

                overlayNav.children('span').velocity({
                    translateZ: 0,
                    scaleX: 0,
                    scaleY: 0,
                }, 1000);

            });
        }
    });

    $('.fullNav').click(function() {
        $(this).removeClass('fade-in');
        $('.navTrigger ').removeClass('close-nav');

        overlayContent.children('span').velocity({
            translateZ: 0,
            scaleX: 1,
            scaleY: 1,
        }, 50, 'easeInCubic', function(){
            navigation.removeClass('fade-in');

            overlayNav.children('span').velocity({
                translateZ: 0,
                scaleX: 0,
                scaleY: 0,
            }, 1000);
        });
    });

    function layerInit(){
        var diameterValue = (Math.sqrt( Math.pow($(window).height(), 2) + Math.pow($(window).width(), 2))*2);
        overlayNav.children('span').velocity({
            scaleX: 0,
            scaleY: 0,
            translateZ: 0,
        }, 500).velocity({
            height : diameterValue+'px',
            width : diameterValue+'px',
            top : -(diameterValue/2)+'px',
            left : -(diameterValue/2)+'px',
        }, 0);

        overlayContent.children('span').velocity({
            scaleX: 0,
            scaleY: 0,
            translateZ: 0,
        }, 500).velocity({
            height : diameterValue+'px',
            width : diameterValue+'px',
            top : -(diameterValue/2)+'px',
            left : -(diameterValue/2)+'px',
        }, 0);
    }

    $('a[href^="#"]').bind('click.smoothscroll',function (e) {
        e.preventDefault();
        var target = this.hash,
        $target = $(target);
        $('html, body').stop().animate( {
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        } );
    });

    function changeCycleHeight($obj) {
        var firstImg = $obj.find('img:first');
        var finalHeight = ($obj.width()/firstImg.attr('width'))*firstImg.attr('height');
        $obj.css({'height':finalHeight, 'max-height':finalHeight});
        $obj.find('.Pager').css('visibility', 'visible');
        $obj.find('.sliderBtn').css('visibility', 'visible');
    }

    if($('#main-slideshow').cycle)
    {
        $('#main-slideshow').on({
            'cycle-bootstrap': function( event, opts ) {
                changeCycleHeight($(this));
            }
        });

        $('#main-slideshow').cycle({
            speed:1000,
            timeout:3000,
            slides:"> div.sliderItem",
            next:".next",
            prev:".prev",
            pager:"> .pager",
            pauseOnHover:true,
            fx:"fade"
        });
    }

    $(window).resize(function () {
        changeCycleHeight($('#main-slideshow'));
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > window.innerHeight*2) {
            $('.backTop').fadeIn(1500);
        } else {
            $('.backTop').fadeOut();
        }
    });
    $('.backTop').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });



//--------------------------------/ End document ready
});

