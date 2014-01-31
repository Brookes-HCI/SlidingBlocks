module.exports = function (grunt) {
    'use strict';
    var cwd = 'src';
    var buildDir = 'dist';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            build: {
                files: [{
                    expand: true,
                    cwd: cwd,
                    src: ['**/*.scss'],
                    dest: buildDir,
                    ext: '.css',
                    filter: function (filepath) {
                        var ignore = {
                            'variables.scss': true
                        };
                        return !ignore[filepath.split('/').pop()];
                    }
                }]
            }
        },
        jade: {
            options: {
                pretty: true
            },
            build: {
                files: [{
                    expand: true,
                    cwd: cwd,
                    src: ['**/*.jade'],
                    dest: buildDir,
                    ext: '.html'
                }]
            }
        },
        coffee: {
            build: {
                expand: true,
                cwd: cwd,
                src: ['**/*.coffee'],
                dest: buildDir,
                ext: '.js'
            }
        },
        watch: {
            sass: {
                files: [cwd + '/**/*.scss'],
                tasks: ['sass:build'],
                options: {
                    spawn: false
                }
            },
            jade: {
                files: [cwd + '/**/*.jade'],
                tasks: ['jade:build'],
                options: {
                    spawn: false
                }
            },
            coffee: {
                files: [cwd + '/**/*.coffee'],
                tasks: ['coffee:build'],
                options: {
                    spawn: false
                }
            }
        },
        'gh-pages': {
            options: {
                base: buildDir
            },
            src: '**/*'
        }
    });

    // Load the required plugins.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-gh-pages');

    // Tasks.
    grunt.registerTask('default', ['sass', 'jade', 'coffee']);
    grunt.registerTask('dist', ['default', 'gh-pages']);
};
