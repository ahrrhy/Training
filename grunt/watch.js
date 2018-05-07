module.exports = {

    options: {
        spawn: false,
        livereload: true
    },

    scripts: {
        files: [
            'src/js/*.js'
        ],
        tasks: [
            'jshint',
            'uglify'
        ]
    },

    styles: {
        files: [
            'src/sass/*.scss',
            'src/sass/parts/*.scss',
            'src/sass/parts/*/*.scss'
        ],
        tasks: [
            'sass:dev'
        ]
    },
};