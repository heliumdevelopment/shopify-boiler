Theme.jQuery(function($) {
  //cache
  var $quickcart = $('.quick-cart'),
      $wrap = $quickcart.find('.cart-items'),
      $addbtn = $('.btn-add');

  // render cart. This is intended to both draw the cart
  // on page load, and then re-draw the cart whenever
  // something is added to it.
  var renderCart = function(isAdded) {

    // trying to reset cart, just in case it was cached and
    // had the data from the PREVIOUS request (on page load)
    var cart = null;

    cart = Theme.Cart.get(function(r) {
      var $template = $('#cart-template').html();

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
      if(isAdded) {
        showCart();
      }

      updateCartQuantity(r.item_count)

      var items = $('.cart-has-items');
      var noitems = $('.cart-no-items');

      if(r.item_count == 0) {
        noitems.fadeIn(0);
        items.fadeOut(0);
      } else {
        noitems.fadeOut(0);
        items.fadeIn(0);
      }

      // remove all listeners on buttons that match my parameters
      // then add the same listeners
      // this is so we don't duplicate the functionality and stack the listeners
      $('.cart-items').find('.qty-input').off('keyup', updateQty);
      $('.cart-items').find('.qty-input').on('keyup', updateQty);

      $('.cart-items').find('.remove').off('click', removeItem);
      $('.cart-items').find('.remove').on('click', removeItem);

    }, true);
  };

  var updateQty = function(e) {
    var cur = $(e.currentTarget),
        qty = cur.val(),
        id = cur.data('variant-id');

    // post to cart and update the qty
    $.ajax({
      url: '/cart/change.js',
      data: 'id='+id+'&quantity='+qty,
      dataType: 'json',
      success: function(cart) {
        onSuccess(cart)
      }
    });


  };

  var removeItem = function(e) {
    var cur = $(e.currentTarget),
        id = cur.data('variant-id');

    // set the quantity to 0
    $.ajax({
      url: '/cart/change.js',
      data: 'id='+id+'&quantity=0',
      dataType: 'json',
      success: function(cart) {
        onSuccess(cart);
      }
    });

  };

  var onSuccess = function(r) {
    var $template = $('#cart-template').html();

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


    updateCartQuantity(r.item_count)

    var items = $('.cart-has-items');
    var noitems = $('.cart-no-items');

    if(r.item_count == 0) {
      noitems.fadeIn(0);
      items.fadeOut(0);
    } else {
      noitems.fadeOut(0);
      items.fadeIn(0);
    }

    // remove all listeners on buttons that match my parameters
    // then add the same listeners
    // this is so we don't duplicate the functionality and stack the listeners
    $('.cart-items').find('.qty-input').off('blur', updateQty);
    $('.cart-items').find('.qty-input').on('blur', updateQty);

    $('.cart-items').find('.remove').off('click', removeItem);
    $('.cart-items').find('.remove').on('click', removeItem);
  };

  // show the modal window
  var showCart = function() {
    $('.cart-overlay').fadeIn(200);
    $('body').addClass('slide');
    $('body').css('overflow', 'hidden');
    $('.quick-cart-fixed-content').css('height', $(window).height());
  }

  // update the cart quantity in the header
  var updateCartQuantity = function(qty) {
    $('.cart-count').empty().html("(" + qty + ")");
  }

  // on page load, call render cart
  renderCart();

  // on add-to-cart click, capture that click and then add the product
  // to the cart via ajax
  $addbtn.on('click', function(e) {
    var cur = $(e.currentTarget),
        text = cur.text();

    cur.addClass('disabled');
    cur.text('Adding...');

    Theme.Cart.add($('#add-to-cart-form')[0], function(r) {

      // call renderCart
      setTimeout(function() {
        renderCart('added');
        cur.removeClass('disabled');
        cur.text(text);
      }, 1000);

    });
  });
});
