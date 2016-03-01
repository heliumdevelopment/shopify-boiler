module.exports = function(grunt) {
  // The order of JS files that get loaded
  var build_files = ['scripts/app/app.js', 
        'scripts/lib/*.js',
        'scripts/models/*.js',
        'scripts/plugins/*.js',
        'scripts/controllers/*.js'
        ];
  
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: ['scripts/**/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false
        },
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>*/\n'
      },
      build: {
        src: build_files,
        dest: 'assets/<%= pkg.name %>.js'
      }
    },
    concat: {
      options: {
        banner: '/*! <%= pkg.name %>*/\n',
        beautfiy: true,
        process: function(src, filepath) {
          return '//------ ' + filepath + '\n' + src;
        }
      },
      build: {
        src: build_files,
        dest: 'assets/<%= pkg.name %>.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  // Concat
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  
  grunt.loadNpmTasks('grunt-contrib-watch');
};