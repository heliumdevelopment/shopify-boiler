(function($, Shop) {
  $.fn.lightBox = function(options) {
    var self = this;
    
    // No sauce no burger
    if (this.length < 1) {
      return;
    }
    // Setup options
    var settings = $.extend({
      content: $(''),
      triggerEvent: 'click',
      speed: 300
    }, options);
    
    var filling = settings.content.children();
    
    // Don't do anything if no content was found
    if (settings.content.length < 1) {
      console.warn("Lightbox didn't find any content");
      return false;
    }
    
    // Look for the lightbox element or create one
    var box = $('#lightboxer').first();
    
    if (!box.length) {
      var close = $('<img/>').attr('src', Shop.assetUrl('close-dark.svg')).addClass('close-lightbox');
      var container = $('<section/>').addClass('lightbox-container');
      box = $('<div/>').attr('id', 'lightboxer').append(container).append(close).appendTo('body');
    } else {
      var container = box.find('.lightbox-container');
    }
    
    // Setup wistia play back
    var video = settings.content.find('.wistia_embed');
    var wistia_video = settings.content.find('.wistia_embed')[0];
    if (wistia_video) {
      if (wistia_video.wistiaApi) {
        wistia_video = wistia_video.wistiaApi;
      }
    }
    
    function playVideo() {
      setTimeout(function() {
        wistia_video.play();
      }, settings.speed);
    }
    
    function openBox() {
      container.removeClass('active').empty().append(settings.content.children());
      box.show();
      
      setTimeout(function() {
        box.addClass('active');
      }, 10)
      
      // Bring the contents in after the box has happened
      setTimeout(function() {
        container.addClass('active');
      }, 800);
      
      // Check for wistia video and play it
      if (wistia_video) {
        playVideo();
      }
    }
    
    function closeBox() {
      box.removeClass('active');
      container.removeClass('active').children().appendTo(settings.content);
      setTimeout(function() {
        box.hide();
      }, settings.speed);
      
      if (wistia_video) {
        wistia_video.pause();
      }
    }
    
    // Setup trigger events open box
    this.bind(settings.triggerEvent, function(event) {
      event.preventDefault();
      openBox();
    });
    
    // Set close event
    box.find('.close-lightbox').click(function() {
      closeBox();
    });
    
    // Add keystroke to close
    $(document).keyup(function(event) {
      if (event.which ==  27) {
        closeBox();
      }
    });
    
    return this;
  };
})(Theme.jQuery, Theme.Shop);