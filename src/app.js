// note: alwas run node from the main root like $node src/app.js
var fs = require ( 'fs' )
var express = require ( 'express' )
var app = express()
var jsonREADER = require ( '../resources/json-file-reader') // include my fs.readFile module for json
var bodyParser = require('body-parser'); // include body parser 
// app.use bodyparser for ...

app.use(bodyParser.urlencoded({ extended:true }))

app.set('views', './src/views'); // to set jade as the view engine for all files in directory: views 
app.set('view engine', 'jade');

// part 0
// route 1: renders a page that displays all your users.
app.get('/', function (req, res) { 
// call the readfile module to make the jsonfile readable
	jsonREADER.readJSON('./resources/users.json', function ( jsonData ) {
		res.render('index', {
			title: "User Management App",
			allUsers: jsonData
		});
	})
});

// route 2 : renders a page that displays a form which is your search bar.
app.get('/searchform', function ( req, res ) {
	res.render('searchform', {
	});
})
// route 3: takes in the post request from your form, then displays matching users on a new page.
app.post('/searchresult', function (req, res) {
// makes 1st letter of name upercase to make it easier for the user		
	var searchName = req.body.userNameSearch.charAt(0).toUpperCase() + req.body.userNameSearch.slice(1)
	var storeUser = []

	jsonREADER.readJSON('./resources/users.json', function ( jsonData ) {
	console.log("Search post request received" + '\n' + "for the name : " + searchName )

		for (var i = 0; i < jsonData.length; i++) {
			if( searchName == jsonData[i].firstname || searchName == jsonData[i].lastname) {
				console.log("Object match found with : " + searchName)
				storeUser.push(jsonData[i].firstname, jsonData[i].lastname, jsonData[i].email)
				console.log(storeUser)
			}
		}		
		if (storeUser.length > 0)
			res.send("Firstname: " + storeUser[0].toString() + "<br>" + "Lastname: " + storeUser[1].toString() + "<br>" + "Email: " + storeUser[2].toString())
		else {
			res.send("No match found." + "<br>" + "Try another name")
		}
	})
})

// Part 2 = Create two more routes:
// route 4: renders a page with three forms on it (first name, last name, and email) 
app.get('/register', function ( req,res ) {
	res.render('newuserform', {
		title: "Search User"
	})
})

// route 5: takes in the post request from the 'create user' form, 
app.post('/register' , function ( req , res ) {
	console.log("ALL USERS : post request received!")

	var newUser = req.body
	console.log("THIS IS THE BODY : " + req.body)
	var userList = fs.readFileSync('./resources/users.json')
	var users = JSON.parse(userList)
	users.push(newUser) 
	var userJSON = JSON.stringify(users)
	fs.writeFileSync('./resources/users.json', userJSON)
	res.redirect('/')
}) 

// set localhost on port 3000
var server = app.listen(3000, function () {
	console.log('User app listening on port: ' + server.address().port);
});
