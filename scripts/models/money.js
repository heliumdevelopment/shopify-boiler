Theme.Money = (function() {
  // Set and remove dollar sign
  return {
    format: function(value) {
      var money = value.toString().replace("$", "");

      // Does it already have a period?
      if(/\./.test(money)){
        var place = money.indexOf(".");
        money = "$" + money.slice(0, place + 3);
      } else {
        var dollar = money.slice(0, money.length - 2);
        var cents = money.slice(-2);
        money = "$" + dollar + "." + cents;
      }
      return money.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
})();