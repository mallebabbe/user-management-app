// make sure npm express is installed and include: var jsonREADER = require ( '../resources/json-file-reader') to the app.js
var fs = require ( 'fs')
// create a function around the fs.readFile to be able to call the function fs.readFile

// note jsonData is declares outside this module
function readJSON ( filename, callback  ) {
	fs.readFile( filename, function (err, data) {
		if (err) {
			console.log("error broski" + err);
			throw err
		}
	// VARIABLE!!!!!!!!!!!!!!!!!! not included here. normally 'var jsonData'	
		jsonData = JSON.parse(data)

		console.log("JSON file objects : " + jsonData.length)
// with the callback function I make the variable jsondata available outside the function
		callback(jsonData)
	})
}

module.exports.readJSON = readJSON
