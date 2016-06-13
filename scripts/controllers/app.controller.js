(function($) {

  // Document ready
  $(function() {


    // match height on the grids
    $('.grid .grid-item').matchHeight({maxWidth:600});


    $('.grabber').on('click', function(e) {
      var cur = $(e.currentTarget);

      if(!cur.hasClass('closable')) {
        cur.addClass('closable');
        open();
      } else {
        cur.removeClass('closable');
        close();
      }

    });

    var open = function() {
      $('.mobile-nav nav').css('top', 0);
    };

    var close = function() {
      $('.mobile-nav nav').css('top', '-100%');
    };


  }); // End document ready

})(Theme.jQuery);
