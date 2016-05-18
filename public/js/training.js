// given an array of values, write a function that finds the index of where the value is located, and if nothing is found, returns -1.
// example: for ['apple', 'orange', 'pineapple']
// 'orange' returns '1'
// 'durian' returns '-1'

// now, write a function that finds all the indexes of 
// where the value is located and returns them in an array, 
// and if nothing is found, returns -1
// example: ['apple', 'orange', 'orange', 'pineapple']
// 'orange' returns [1,2]

var array1 = ['apple','orange', 'orange' ,'peer']

function fruitCounter(array, fruit) { 
 var slot = -1
 for (var i = 0; i < array.length; i++) {
 	if (array[i] == fruit) {
 		slot = 1
 	}
 }
 return slot
}

console.log(fruitCounter(array1, 'orange'))

var array1 = ['apple','orange', 'orange' ,'peer']
function value(array, fruit) {

var add = []
// var index = array.indexOf(fruit)

	for (var i = 0; i < array.length; i++) {
					console.log(array1[i])
		if ( array[i] == fruit) {
			console.log(array1[i])
			add.push(i)
		}
	}
	return add
}

console.log(value(array1,'orange'))

