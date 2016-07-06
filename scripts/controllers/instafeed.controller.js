(function($) {
  $(function() {
    var instafeedContainer = $('#instafeed');
    if (instafeedContainer.length) {
      (function(){

        // Fills with new images
        function fillFeed(response) {

          // Maintain the same height
          instafeedContainer.height(instafeedContainer.height()); // Hard set the height

          instafeedContainer.empty();

          $(response.data).each(function() {
            this.image = this.images.standard_resolution.url;
            var height = this.images.standard_resolution.height;
            var width = this.images.standard_resolution.width;

            var bit = '<a href="{{ link }}" data-insta-link="instagram://media?id={{id}}" class="insta-bit"><img src="{{image}}" /></a>';

            bit = Mustache.render(bit, this);
            bit = $(bit).appendTo(instafeedContainer);

            // Resolve overflow
            var bit_aspect = bit.outerHeight() / bit.outerWidth();
            var image_aspect = height / width;

            if (image_aspect > bit_aspect) {
              bit.addClass('landscape');
            } else {
              bit.addClass('portrait');
            }

          });

          // Reset container height to auto
          setTimeout(function(){
            instafeedContainer.height('auto');
          }, 150);
        }

        var instafeed = new Instafeed({
            get: 'user',
            mock: true,
            userId: 1650298879,
            accessToken: '1650298879.6070f30.d6212fe5488f4645afdf3136612b9f45',
            limit: 12,
            resolution: 'low_resolution',
            success: function(response) {
              fillFeed(response);
            }
        });

        instafeed.run();

        $('#instafeed').on('click', '.insta-bit', function(event) {
          event.preventDefault();
          var self = $(this);
          if (Modernizr.touch) {
            if (confirm("Open with Instagram app?")) {
              window.location = self.attr('data-insta-link');
            } else {
              window.location = self.attr('href');
            }

          } else {
            window.open(self.attr('href'));
          }

        });
      })();
    }
  });
})(Theme.jQuery);
