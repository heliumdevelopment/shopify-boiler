(function($) {

  // Document ready
  $(function() {

    Theme.Cart.get(function(r) {

      CartJS.init(r);

      var qty = CartJS.cart.item_count;

      if(qty > 0) {
        $('.cart-count').html('('+CartJS.cart.item_count+')');
      }

    });
  }); // End document ready

})(Theme.jQuery);


(function($) {


    //cache
    // $showcartbtn = $('.cart-btn');
    // $modal = $('#cart');
    // $addform = $('#add-to-cart-form');
    // $addbtn = $('#product-add');
    var $quickcart = $('.quick-cart'),
        $wrap = $quickcart.find('.cart-items');

    // render cart. This is intended to both draw the cart
    // on page load, and then re-draw the cart whenever
    // something is added to it.
    var renderCart = function(isAdded) {

      // trying to reset cart, just in case it was cached and
      // had the data from the PREVIOUS request (on page load)
      var cart = null;

      cart = Theme.Cart.get(function(r) {
        var $template = $('#cart-template').html();

        console.log('CART: ', r);

        // empty whatever is currently there
        $wrap.empty();

        // loop through all the items and render the template
        for(var i = 0; i < r.items.length; i++) {

          // add my own formatted_price to the response (remove the .00)
          var curprice = Shopify.formatMoney(r.items[i].line_price);
          var sub = curprice.substring(0, curprice.length-3);
          r.items[i].formatted_price = sub;

          var output = Mustache.render($template, r.items[i]);
          $wrap.append($.parseHTML(output));
        }

        // then set the subtotal at the bottom of the cart
        var subtotal = Shopify.formatMoney(r.total_price);
        var subsubtotal = subtotal.substring(0, subtotal.length-3);
        $quickcart.find('.subtotal').html(subsubtotal);

        // if we're calling renderCart from the add button
        // then show the cart right away
        // if(isAdded) {
        //   showCart();
        //   updateCartQuantity(r.item_count);
        // }

      }, true);
    };

    // show the modal window
    var showCart = function() {
      // $modal.fadeIn('fast');
      // $('.grabber').removeClass('closable');
      // $('.mobile-nav').removeClass('show');
      // $('.mobile-nav-overlay').removeClass('show');
    }

    // update the cart quantity in the header
    var updateCartQuantity = function(qty) {
      //$('.cart-qty').empty().html(qty);
    }

    // on page load, call render cart
    renderCart();

    // this shows the modal window
    // $showcartbtn.on('click', function(e) {
    //   showCart();
    // });
    //
    // // close the modal when the overlay is clicked on
    // $modal.find('.overlay').on('click', function(e) {
    //   $modal.fadeOut('fast');
    // });

    // on add-to-cart click, capture that click and then add the product
    // to the cart via ajax
    // $addbtn.on('click', function(e) {
    //   var cur = $(e.currentTarget);
    //   cur.addClass('disabled');
    //   Theme.Cart.add($('#add-to-cart-form')[0], function(r) {
    //
    //     // call renderCart
    //     setTimeout(function() {
    //       renderCart('added');
    //       cur.removeClass('disabled');
    //     }, 1000);
    //
    //   });
    // });

})(Theme.jQuery, Theme.Cart);
