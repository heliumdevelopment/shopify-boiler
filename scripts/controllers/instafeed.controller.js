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

            var square = $('#square-png').attr('src');
            console.log(square);

            var bit = '<a href="{{ link }}" data-insta-link="instagram://media?id={{id}}" class="insta-bit"><img class="insta-ghost" src="'+ square +'" /><img class="insta-image" src="{{image}}" /></a>';

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
            userId: 3298275066,
            accessToken: '3298275066.1677ed0.8e136827b5b34a69ad5d31be9c3f7f68',
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
