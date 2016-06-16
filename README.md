# Helium Boiler Shopify Theme
This theme provides a starting point for building fully custom [Shopify](http://shopify.com) themes. It's meant to be highly customizable and uses Grunt to locally compile Sass and JS. Even though Shopify does have a Sass compiler, this is significantly more developer friendly.

## Development Overview
Assuming libraries are properly installed, here's a list of terminal commands to get going:
> `bundle install`

> `npm install`

> `grunt watch`

---

### Production Overview
To minify JS and CSS, run:
> `grunt build`

This will create `application.js` and `styles.css` within the assets directory.

---

## Working with Sass
Sass is being compiled by Ruby, use [Bundler](http://bundler.io/) to get any needed gems with `gem install bundler`. Once bundler is installed, run `bundle insall` to fetch any gems necessary.

---
## JavaScript
This theme uses [Grunt](http://gruntjs.com/) to compile all the JavaScript files
into one file to be used by theme theme. You'll need [npm](https://www.npmjs.com/)
installed in order to use Grunt. Once installed, run `npm install`. This will
install Grunt and ready run the compressor.

Run `grunt watch` to watch all the files within the `scripts` folder. When a
change is detected, Grunt will combine all the files into `assets/application.js`.
By default the file will be annotated with source references for debugging. When
you want to run the product compression, run `grunt build` without watch and
the processor will be fully compressed.

---

### JavaScript and Liquid
Although it is possible to use Liquid code inside liquid extended JS files, we
chose not to use this method since it can get messy and is error prone. Instead,
just output the data directly from any template into a JS object. Eg.
```
<!-- templates/product.liquid -->
<script type="text/javascript">
  // Assign an object based on Shopify product
  Shopify.current_product = {{ product | json }};

  // Later in your scripts you then have access to this liquidated object
  alert(Shopify.current_product.title);
</script>
```
