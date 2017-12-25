
var api = {};

// pad a number ( 2 to 02 )
api.pad = function (n) {

    return String('0' + n).slice(-2);

};

for (var prop in api) {

    exports[prop] = api[prop];

}
