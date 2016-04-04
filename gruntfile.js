module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      all: ['js/*.js', 'www/js/*.js']
    },
    uglify: {
      client: {
        src: 'www/js/droppr-client.js',
        dest: 'dist/client/js/droppr-client.min.js'
      },
      server: {
        src: 'js/droppr.js',
        dest: 'dist/server/js/droppr.min.js'
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