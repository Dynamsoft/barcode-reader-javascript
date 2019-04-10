module.exports = function (grunt) {

    grunt.initConfig({
        browserify: {
            all: {
                src: 'dbr.min.js',
                dest: 'bundle.js',
                options: {
                    transform: ['debowerify', 'decomponentify', 'deamdify', 'deglobalify'],
                },
            },
        },
    });
    grunt.loadNpmTasks('grunt-browserify');

    // Default task(s).
    grunt.registerTask('default', ['grunt-browserify']);

};