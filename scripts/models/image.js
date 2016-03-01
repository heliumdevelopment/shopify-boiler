Theme.Image = (function($) {
  var image_sizes =  "pico icon thumb small compact medium large grande 1024x1024 2048x2048 master original".split(" "); 
  
  function resize(url, size) {
    // Don't resize images that aren't from Shopify, duh!
    if (!url.contains("cdn.shopify.com")) {
      return url;
    }
    
    // Set size to nothing is no size is provided
    size = size ? size : "";
    
    // Pick apart the url and rebuild it
    var sizes = "_" + image_sizes.join("|_");
    var URL_SPLIT = new RegExp("("+sizes+")?(\\.(jpg|jpeg|png|gif)+\\??.*)", "i");
    var new_url = url.match(URL_SPLIT);
    var base = url.replace(new_url[0], "");
    
    return {
      original: base + new_url[2], // All sizing removed
      resized: base + "_" + size + new_url[2], // Image with new size
      // There could be case where image size prefixes are actually a part of
      // the filename, which would 404 the image. Here we supply another option
      // if that might be the case.
      appended: base + new_url[1] + "_" + size + new_url[2]
    };
  }
  
  function getOriginal(url, size) {
    var image = resize(url, size);
    return image.original ? image.original : image;
  }
  
  function getResized(url, size) {
    var image = resize(url, size);
    return image.resized ? image.resized : image;
  }
  
  function getAppended(url, size) {
    var image = resize(url, size);
    return image.appended ? image.appended : image;
  }
  
  return {
    sizes: image_sizes,
    original: getOriginal,
    resized: getResized,
    appended: getAppended
  }
})(Theme.jQuery);