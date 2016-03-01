module.exports = function(grunt) {
  // The order of JS files that get loaded
  var build_files = ['scripts/app/app.js', 
        'scripts/lib/*.js',
        'scripts/helpers/*.js',
        'scripts/models/*.js',
        'scripts/plugins/*.js',
        'scripts/controllers/*.js',
        'scripts/views/*.js'
        ];
  
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          watch: true,
          config: 'config/compass.rb'
        }
      }
    },
    watch: {
      css: {
        files: ['sass/**/*.scss', 'sass/**/*.sass'],
        tasks: ['compass']
      },
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
        dest: 'assets/<%= pkg.name %>.min.js'
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
        dest: 'assets/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  // Compass module
  grunt.loadNpmTasks('grunt-contrib-compass');
  
  // Concat
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  
  grunt.loadNpmTasks('grunt-contrib-watch');
};