// test.js
var Test = {};
Test.install = function (Vue, options) {
    Vue.prototype.$msg = 'Hello World';
}
module.exports = Test;