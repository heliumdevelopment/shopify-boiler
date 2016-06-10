(function($) {
  // Document ready
  $(function() {


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
      $('nav').css('top', 0);
    };

    var close = function() {
      $('nav').css('top', '-100%');
    };

    console.log('bruh');
    $(window).on('resize', function(e) {
      console.log('in resize', $(window).width)
      if($(window).width() > 768) {
        console.log('in')
        $('nav').css('top', 'auto');
        return;
      }
    });



  }); // End document ready
})(Theme.jQuery);
