# Config definitions
require 'sass-globbing'

@assets_dir = "assets"
css_dir = @assets_dir
sass_dir = "sass"
sourcemap = false
# output_style = :compressed

# Saves CSS files as liquid
on_stylesheet_saved do |filename|
  if File.exists?(filename)
    # Break up the path
    path = File.dirname(filename) + "/"
    file = File.basename(filename, ".*")
    extension = ".css.liquid"

    # Move the file to new location
    FileUtils.mv filename, path + file + extension
  end
end
