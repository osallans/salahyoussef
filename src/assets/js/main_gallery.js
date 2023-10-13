$(function () {

    "use strict";
  // Frontpage slider
    // ----------------------------------------------------------------

    var arrowIcons = [
        '<span class="icon icon-chevron-left"></span>',
        '<span class="icon icon-chevron-right"></span>'
    ];


    $.each($(".owl-slider"), function (i, n) {

        var $n = $(n);

        $n.owlCarousel({
            autoplay: $n.data("autoplay"),
            autoplayTimeout: 6000,
            autoplayHoverPause: true,
            items: 1,
            loop: true,
            // spacing
            margin: 10,
            stagePadding: 0,
            // navigation
            nav: true,
            dots: false,
            navText: arrowIcons,
            // animation effects
            smartSpeed: 950,
            onTranslated: startAnimation,
            onTranslate: resetAnimation,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut'
        });

        resetAnimation(); // reset effects all on initalization
        startAnimation(); // start animation on first slide

        function startAnimation(event) {
            // find active slide
            var activeItem = $(n).find('.owl-item.active'),
                timeDelay = 100;

            $.each(activeItem.find('.animated'), function (j, m) {
                // catch active slide
                var item = $(m);
                item.css('animation-delay', timeDelay + 'ms');
                timeDelay = timeDelay + 180;
                // add animation
                item.removeClass('fadeOut');
                item.addClass(item.data('start'));
            });
        }

        function resetAnimation(event) {
            // catch all slides
            var items = $(n).find('.owl-item');
                // for each add animation end
                $.each(items.find('.animated'), function (j, m) {
                    var item = $(m);
                    item.removeClass(item.data('start'));
                    item.addClass('fadeOut');
                });
        }
        var navHeight = $('nav').height();

        if ($(n).hasClass('owl-slider-fullscreen')) {
            $('.header-content .item').height($(window).height() - navHeight);
        }

    });


    $.each($(".owl-icons"), function (i, n) {

        $(n).owlCarousel({
            items: 6,
            loop: true,
            // spacing
            margin: 0,
            stagePadding: 0,
            // navigation
            nav: true,
            dots: false,
            navText: arrowIcons,
            // animation effects
            smartSpeed: 950,
            responsive: {
                0: {
                    items: $(n).data("icons-sm"),
                    nav: true
                },
                600: {
                    items: $(n).data("icons-md"),
                    nav: false
                },
                1000: {
                    items: $(n).data("icons-lg"),
                    nav: true,
                    loop: false
                }
            }
        });

    });
       // Checkout login / register
    // ----------------------------------------------------------------

    var loginWrapper = $('.login-wrapper'),
        loginBtn = loginWrapper.find('.btn-login'),
        regBtn = loginWrapper.find('.btn-register'),
        signUp = loginWrapper.find('.login-block-signup'),
        signIn = loginWrapper.find('.login-block-signin');

    loginBtn.on('click', function () {
        signIn.slideDown();
        signUp.slideUp();
    });

    regBtn.on('click', function () {
        signIn.slideUp();
        signUp.slideDown();
    });

    $.each($(".owl-product-gallery"), function (i, n) {

        $(n).owlCarousel({
            items: 1,
            loop: true,
            // spacing
            margin: 0,
            stagePadding: 0,
            // navigation
            nav: true,
            dots: false,
            navText: arrowIcons,
            // animation effects
            smartSpeed: 950
        });

    });
    // Filters toggle functions
    // ----------------------------------------------------------------

    // Check if some filter boxes has class active
    // then show hidden filters
    $('.filters .filter-box').each(function () {
        if ($(this).hasClass('active')) {
            $(this).find('.filter-content').show();
        }
    });

    // Toggle filter function
    $('.filters .title').on('click', function (e) {
        var $this = $(this),
            $parent = $this.parent();
        $parent.toggleClass('active');

        if ($parent.hasClass('active')) {
            $parent.find('.filter-content').slideDown(300);
        }
        else {
            $parent.find('.filter-content').slideUp(200);
        }
    });

    // Update filter results - close dropdown filters
    // ----------------------------------------------------------------

    $('.filters .filter-update').on('click', function (e) {
        $(this).closest('.filter-box')
            .removeClass('active')
            .find('.filter-content').slideUp(200);
    });

    // Show hide filters (only for mobile)
    // ----------------------------------------------------------------

    $('.toggle-filters-mobile').on('click', function () {
        $('.filters').addClass('active');
    });
    $('.toggle-filters-close').on('click', function () {
        $('.filters').removeClass('active');
        $('html,body').animate({
            scrollTop: $('body').offset().top
        }, 800);
        return false;
    });

});



