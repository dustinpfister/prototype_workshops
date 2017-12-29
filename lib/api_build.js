
let pub = {};

// my log method
pub.log = function (mess) {

    if (typeof mess === 'string') {

        console.log(this.wsName + ' : ' + mess);

    } else {

        console.log(this.wsName + ' :');
        console.log(mess);
        console.log('********** **********');
    }

};

exports.getAPI = function (ws) {

    let api = {

        wsName: ws.name

    };

    for (let prop in pub) {

        api[prop] = pub[prop].bind(api);

    }
	
	return api;

}

/*
for (let prop in api) {

Object.defineProperty(exports, prop, {

value: api[prop],
configurable: true,
writable: false,
enumerable: false

});

}
*/
