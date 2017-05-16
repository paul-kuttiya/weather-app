var path = require('path');
var src = path.join(__dirname, "public/javascripts"),
    dist = path.join(__dirname, "public/dist");

module.exports = function(grunt) {
  grunt.initConfig({
    // concat: {
    //   components: {
    //     src: 
    //     [
          // `${src}/app.js`,
        // ],
        // dest: `${dist}/components.js`,
    //   },
    // },
    bower_concat: {
      all: {
        dest: `${dist}/lib.js`,
        dependencies: {
          //underscore with jquery as dependencies
          "underscore": "jquery",
          "backbone": "underscore",
        }
      }
    },
    handlebars: {
      all: {
        files: {
          "public/javascripts/handlebars_templates.js": ["handlebars/**/*.hbs"]
        },
        options: {
          processContent: removeWhitespace,
          processName: extractFileName,          
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          "public/dist/lib.min.js": [`${dist}/lib.js`],
          // "public/dist/components.min.js": [`${dist}/components.js`],
          // "public/dist/router.min.js": [`${src}/router.js`],
          // "public/dist/handlebars_templates.min.js": [`${src}/handlebars_templates.js`],
        }
      }
    },
  });

  [
    "grunt-bower-concat",
    'grunt-contrib-concat',
    "grunt-contrib-uglify",
    "grunt-contrib-handlebars"
  ].forEach(function(task) {
    grunt.loadNpmTasks(task);
  });

  grunt.registerTask("default", ['concat', "bower_concat", "uglify"])
};

function removeWhitespace(template) {
  return template.replace(/ {2,}/mg, "").replace(/\r|\n/mg, "");
};

function extractFileName(file) {
  return file.match(/\/(.+)\.hbs$/).pop();
};