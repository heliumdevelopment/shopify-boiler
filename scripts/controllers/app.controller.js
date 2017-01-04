(function($) {

  // Document ready
  $(function() {

    $('#shopify-section-slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 6000
    });

    $('#shopify-section-quote').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: true,
      autoplay: false
    });

    $('.icon-ui-cart').on('click', function(e) {
      openQuickCart();
    });

    $('.quick-cart .close').on('click', function(e) {
      closeQuickCart();
    });

    $('.cart-overlay').on('click', function(e) {
      closeQuickCart();
    });

    // The mobile nav grabber
    $('.grabber').on('click', function(e) {
      var cur = $(e.currentTarget);

      if(!cur.hasClass('closable')) {
        cur.addClass('closable');
        openNav();
      } else {
        cur.removeClass('closable');
        closeNav();
      }

    });

    // The search modal window
    $('.icon-ui-search').on('click', function(e) {
      openSearch();
    });

    $('.search-modal .overlay').on('click', function(e) {
      closeSearch();
    });


    // Methods
    var openNav = function() {
      $('.mobile-nav').addClass('show')
    };

    var closeNav = function() {
      $('.mobile-nav').removeClass('show')
    };

    var openQuickCart = function() {
      $('.cart-overlay').fadeIn(200);
      $('body').addClass('slide');
      $('.quick-cart').addClass('slide');
      $('.quick-cart-fixed-content').css('height', $(window).height());
    }

    var closeQuickCart = function() {
      $('.cart-overlay').fadeOut(200);
      $('.quick-cart').removeClass('slide');
      $('body').removeClass('slide');
    };

    var openSearch = function() {
      closeQuickCart();
      closeNav();
      $('.search-modal').fadeIn(200);

      // focus on the search field when it opens
      $('#search-field').focus();
    };

    var closeSearch = function() {
      $('.search-modal').fadeOut(200);
    };


  }); // End document ready

})(Theme.jQuery);
