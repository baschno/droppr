module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      all: ['js/*.js', 'www/js/*.js']
    },
    uglify: {
      client: {
        src: 'www/js/blackhole.js',
        dest: 'dist/client/js/blackhole.min.js'
      },
      server: {
        src: 'js/server.js',
        dest: 'dist/server/js/server.min.js'
      },
      store: {
        'src': 'js/store.js',
        'dest': 'dist/server/js/store.min.js'
      }
    },
    watch: {
      files: ['js/*.js', 'www/js/*.js'],
      tasks: [
        'jshint:all',
        'uglify:client',
      ]
    }
});
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.registerTask('default', ['jshint', 'uglify']);
};