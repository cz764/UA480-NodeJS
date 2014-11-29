var makeAdder = function(x) {
	return function(y) {
		return y + x;
	}
};

var addTwo = makeAdder(2);
console.log(addTwo(5));
// should print out 7
