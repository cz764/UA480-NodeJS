/** Flattening **/
var arrays = [[1, 2, 3], [4, 5], [6]];
console.log(arrays.reduce(function(a,b){
	return a.concat(b);
}));
// → [1, 2, 3, 4, 5, 6]
// =============================
// 
/**Every and Then Some**/
function every(array, predicate) {
  var result = true;
  array.forEach(function(curElem){
    if (!predicate(curElem)) result = false;
  });
  return result;
}

function some(array, predicate) {
  var result = false;
  array.forEach(function(curElem) {
    if (predicate(curElem)) result = true; 
  });
  return result;
}

console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false