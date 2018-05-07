module.exports = {
    // Settings for Development
    dev: {
        options: {
            outputStyle: 'nested',
            sourceMap: true
        },
        files: [{
            expand: true,
            cwd: 'src/sass',
            src: ['*.scss', 'parts/*.scss', 'parts/*/*.scss'],
            dest: 'dist/styles',
            ext: '.css'
        }]
    },
    // Settings for Production
    prod: {
        options: {
            outputStyle: 'compressed',
            sourceMap: false
        },
        files: [{
            expand: true,
            cwd: 'src/sass',
            src: ['*.scss', 'parts/*.scss', 'parts/*/*.scss'],
            dest: 'dist/styles',
            ext: '.css'
        }]
    }
};