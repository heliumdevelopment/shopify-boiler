(function($) {

  // Document ready
  $(function() {

    var searchSubmit = $('.search-modal').find('.icon-ui-search');

    searchSubmit.on('click', function(e) {
      var form = searchSubmit.closest('form');
      if(form.find('#search-field').val().length > 0) form.submit();
    });

  }); // End document ready

})(Theme.jQuery);
