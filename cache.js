const Cache = require('node-cache');

const cache2 = new Cache();
const cache1 = new Cache();

module.exports = { cache1, cache2 };


// cache1 and cache2 are independent of each other.
// Anything stored in cache1 is not accessible by cache2.