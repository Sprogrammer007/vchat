'use strict';

module.exports = function(grunt) {
  // #### Load all grunt tasks
  require('matchdep').filterDev(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: ['src/coffee/*.coffee'],
        tasks: ['coffee:main', 'uglify:js'],
        options: {
          livereload: true,
          spawn: false
        }
      },
      css: {
        files: ['src/sass/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true,
          spawn: false
        }
      },
      express: {
        files:  ['app.js', 'model/*.js', 'routes/*.js'],
        tasks:  ['express:dev'],
        options: {
           spawn: false
        }
      }
    },
    uglify: {
      options: {
        mangle: true,
        compress: true,
        banner: "/* Vulcun Chat */\n"
      },
      js: {
        files: [{
          expand: true,
          cwd: 'src/js',
          src: '*.js',
          dest: 'public/js',
          ext: '.min.js'
        }]
      }
    },
    coffee: {
      main: {
        options: {
          bare: true
        },
        expand: true,
        flatten: true,
        cwd: 'src/coffee',
        src: ['*.coffee'],
        dest: 'src/js',
        ext: '.js'
      }

    },
    
    sass: {
      app: {
        options: {
          style: 'compressed'
        },
        files: {
          'public/css/main.css': 'src/sass/main.scss'
        }
      }
    },
    
    express: {
      options: {
        script: 'bin/www',
        output: 'Vulcun Chat is running'
      },
      dev: {
        options: {}
      },
      test: { 
        options: {
          node_env: 'testing'
        }
      }
    },
    execute: {
      createDB: {
        src: ['database.js']
      },
      populate: {
        src: ['populate.js']
      }
    }
  })

  // Default task(s).
  grunt.registerTask('default');
  grunt.registerTask('server', ['express:dev']);
};