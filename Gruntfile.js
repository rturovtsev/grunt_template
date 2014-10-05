module.exports = function (grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // 2. Настройка для объединения файлов находится тут
        stylus: {
          compile: {
            options: {
              compress: false,
              paths: ['www/common/css/import']
            },
            files: {
              'www/common/css/style.css': 'www/common/css/style.styl'
            }
          }
        },


        jshint: {
          all: ['Gruntfile.js', 'www/common/js/style.js']
        },


        sprite: {
            all: {
                src: ['www/common/img/forsprites/*.png'],
                destImg: 'www/common/img/sprite.png',
                destCSS: 'www/common/css/sprites.styl',
                imgPath: '../img/sprite/sprite.png',
                algorithm: 'binary-tree',
                padding: 2,
                engine: 'pngsmith',
                cssFormat: 'stylus',
                cssTemplate: 'www/common/css/stylus.template.mustache',
                imgOpts: {
                    'format': 'png'
                }
            }
        },

        // imagemin: {
        //     dynamic: {
        //         files: [{
        //             expand: true,
        //             cwd: 'www/common/img/simple/',
        //             src: ['*.{png,jpg,gif}'],
        //             dest: 'www/common/img/'
        //         }]
        //     }
        // },

        watch: {
            css: {
                files: ['www/common/css/*.styl'],
                tasks: ['stylus'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            scripts: {
                files: ['www/common/js/*.js'],
                tasks: ['jshint'],
                options: {
                    interrupt: true,
                }
            },
            sprite: {
                files: ['www/common/img/forsprites/*.{png,jpg,gif}'],
                tasks: ['sprite:all'],
                options: {
                    event: ['added']
                }
            }
            // images: {
            //   files: ['www/common/img/simple/*.{png,jpg,gif}'],
            //   tasks: ['imagemin'],
            //   options: {
            //       spawn: false,
            //   }
            // }
        }
    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-imagemin');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['stylus', 'jshint', 'sprite', 'watch']);
};