var gimmeFunction = function() {
	var a = "closure!";

	return function() {
		console.log(a);
		console.log("This is Jane!");
	}
}

var myFunction = gimmeFunction();
myFunction();
