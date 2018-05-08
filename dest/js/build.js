;(function () {
    var a = 'someVal';
    console.log(a);
})();
var a = (function () {
    console.log('b');
    console.log('c');
    return 'try';
})();