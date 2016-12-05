$(document).ready(function() {

  if(localStorage.getItem('newsletterShown') == 'true') {
    console.log('tue....');
  } else {
    console.log('falseeeeee')
    localStorage.setItem('newsletterShown', 'true');

    var modal = $('#newsletter-modal'),
        close = modal.find('.modal-close'),
        bkgd = modal.find('.bkgd'),
        content = modal.find('.newsletter-content');

    // show the modal
    modal.addClass('show');

    setTimeout(function() {
      bkgd.addClass('show');
      close.addClass('show');
    }, 1000)

    setTimeout(function() {
      content.addClass('show');
    }, 1500)

    bkgd.on('click', function() {
      modal.fadeOut(200);
    });

    close.on('click', function() {
      modal.fadeOut(200);
    });

  }

});
