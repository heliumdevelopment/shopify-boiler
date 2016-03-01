Theme.Shop = (function($) {
  // Utility methods for the shop
  
  // Get shop products
  function allProducts(callback) {
    return $.getJSON('/products.json?limit=1000', function(response) {
      Shopify.all_products = response;
      callback(response.products);
    });
  }
  
  // Create an asset url
  function assetUrl(asset) {
    var url = Shopify.baseAssetUrl;
    return url.path + asset + "?" + url.version;
  }
  
  function isMobile() {
    return $(window).width() < 500;
  }
  
  return {
    products: allProducts,
    assetUrl: assetUrl,
    isMobile: isMobile
  }
})(Theme.jQuery);