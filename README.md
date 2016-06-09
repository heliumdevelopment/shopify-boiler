# Boiler Shopify Theme
At Helium, this theme will be one to be used as a base for custom themes we build.
This should be improved on over time and refined based the standards we take up.
For now, we'll be using Grunt to compile Sass and JS.

## Working with Compasss and Sass
You'll need Compass installed to precompile the Sass for this theme. If you
have bundler installed, just run `bundle install` and compass will get installed
and be ready to use. Otherwise just run `gem install compass`.

Once compass is installed run `compass watch`. This will watch everything in the
`sass` directory and copy to `styles.css.liquid`. Note that by default files
won't be compressed for debugging purposes. By search to uncomment
`output_style = :compressed` from within `config/compass.rb` when pushing to
production.



---
## JavaScript
This theme uses [Grunt](http://gruntjs.com/) to compile all the JavaScript files
into one file to be used by theme theme. You'll need [npm](https://www.npmjs.com/)
installed in order to use Grunt. Once installed, run `npm install`. This will
install Grunt and ready run the compressor.

Run `grunt watch` to watch all the files within the `scripts` folder. When a
change is detected, Grunt will combine all the files into `assets/application.js`.
By default the file will be annotated with source references for debugging. When
you want to run the product compression, just run `grunt` without watch and
the processor will be fully compressed.

### JavaScript and Liquid
Although it is possible to use Liquid code inside liquid extended JS files, we
chose not to use this method since it can get messy and is error-prone. Instead,
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
