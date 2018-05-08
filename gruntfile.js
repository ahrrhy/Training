module.exports = function(grunt) {

    const mozjpeg = require('imagemin-mozjpeg');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                "esversion": 6,
                globals: {
                    jQuery: true,
                    $: true,
                    console: true,
                    "esversion": 6
                }
            },
            '<%= pkg.name %>': {
                src: ['src/js/**/*.js']
            }
        },

        concat: {
            dist: {
                src: ['src/js/*.js', 'src/js/**/*.js'],
                dest: 'dest/js/build.js'
            }
        },

        uglify: {
            options: {
                stripBanners: true,
                banner: '/* <%= pkg.name %> <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
            },

            build: {
                src: 'dest/js/build.js',
                dest: 'dest/js/build.min.js'
            }
        },

        cssmin: {
            with_banner: {
                options: {
                    banner: '/* Minified CSS */\n'
                },

                files: {
                    'dest/css/main.min.css' : ['src/css/ie.css', 'src/css/print.css', 'src/css/screen.css']
                }
            }
        },

        imagemin: {

            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['img/*.{png,jpg,gif}'],
                    dest: 'dest/'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dest/index.html': 'src/index.html'
                }
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'src/sass',
                    cssDir: 'src/css',
                    environment: 'production'
                }
            }
        },

        copy: {
            main: {
                expand: true,
                cwd: 'src',
                src: 'fonts/**/*',
                dest: 'dest/',
            },
        },

        watch: {
            options: {
                livereload: true
            },

            scripts: {
                files: ['src/js/*.js', 'src/js/**/*.js'],
                tasks: ['jshint', 'concat', 'uglify']
            },

            css: {
                files: ['src/sass/*.scss', 'src/sass/**/*.scss'],
                tasks: ['compass', 'cssmin', 'htmlmin']
            },

            livereload: {
                options: {
                    livereload: true
                },
                files: ['dest/*'],
            },

        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy', 'imagemin', 'jshint', 'concat', 'uglify', 'compass', 'cssmin', 'htmlmin', 'watch']);
};