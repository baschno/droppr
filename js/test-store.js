var Storage = require('./storage');

storage = new Storage();

storage.getUniqueFilename('./', 'test-01-10.js.txt', function(fullFileName) {
  console.log(fullFileName);
});
storage.getUniqueFilename('./', 'server.js', function(fullFileName) {
  console.log(fullFileName);
});
storage.getUniqueFilename('./', 'foo.bar', function(fullFileName) {
  console.log(fullFileName);
});