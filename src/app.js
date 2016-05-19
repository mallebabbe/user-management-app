// note: alwas run node from the main root like $node src/app.js
var fs = require ( 'fs' )
var express = require ( 'express' )
var app = express()
var jsonREADER = require ( '../resources/json-file-reader') // include my fs.readFile module for json
var bodyParser = require('body-parser'); // include body parser 
// app.use bodyparser for ...
// add css
app.use(express.static('./public/css'));
app.use(express.static('./public/js'));

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
		title: "Search User"
	});
})
///////////////////////////////////////////////////////////

// AJAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX PART

app.post('/api', function ( req, res ){
	
	var searchName = req.body.userNameSearch.toLowerCase()
	console.log("Letter found ==> " + searchName)

	var userMatch = {}
	var totalUsers = []

	jsonREADER.readJSON('./resources/users.json', function ( jsonData, name ) {
		console.log("Search string received" )

		for (var i = 0; i < jsonData.length; i++) {

			var achternaam = jsonData[i].lastname.toLowerCase()
			var voornaam = jsonData[i].firstname.toLowerCase()
			var fullName = voornaam + " " + achternaam
			letterMatchFirstName = voornaam.indexOf(searchName)
			letterMatchLastName = achternaam.indexOf(searchName)
			letterMatchFullName = fullName.indexOf(searchName)

		// console.log("Letters found : " + letterMatchFirstName)

			if(letterMatchFirstName != -1 || letterMatchLastName != -1 || letterMatchFullName != -1) {
				userMatch = jsonData[i]
				totalUsers.push(userMatch)
				// console.log("total name : " + userMatch)
			} else {
				// console.log("Nooo")
			}
		}
		res.send(totalUsers) //userMatch
	})	
})


/////////////////////CHANGE LISTENER TO MAKE READABLE//////////////////////////////////
// route 3: takes in the post request from your form, then displays matching users on a new page.
app.post('/searchresult', function (req, res) {
// makes 1st letter of name upercase to make it easier for the user		
	var searchName = req.body.userNameSearch.toLowerCase()
	var storeUser = []

	jsonREADER.readJSON('./resources/users.json', function ( jsonData ) {
	console.log("Search post request received" + '\n' + "for the name : " + searchName )

		for (var i = 0; i < jsonData.length; i++) {
			var achternaam = jsonData[i].lastname.toLowerCase()
			var voornaam = jsonData[i].firstname.toLowerCase()
			var fullName = voornaam + " " + achternaam
			console.log("FULLNAMEE" + fullName)
			if( (searchName == voornaam || searchName == achternaam) || searchName == fullName) {
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
		title: "Register User"
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
