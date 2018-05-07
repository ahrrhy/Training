module.exports = {

    // Setting tasks
    options: {
        limit: 3
    },

    // Tasks for development
    devFirst: [
        'clean',
        'jshint'
    ],
    devSecond: [
        'sass:dev',
        'uglify'
    ],

    // Tasks for production
    prodFirst: [
        'clean',
        'jshint'
    ],
    prodSecond: [
        'sass:prod',
        'uglify'
    ],

    // Image tasks
    imgFirst: [
        'imagemin'
    ]
};