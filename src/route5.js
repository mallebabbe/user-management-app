app.post('/list-new-users' , function ( req , res ) {
	var newPerson = {}
console.log(newPerson)
	var firstname = req.body.newUserFirstName.charAt(0).toUpperCase() + req.body.newUserFirstName.slice(1)
	var lastname = req.body.newUserLastName.charAt(0).toUpperCase() + req.body.newUserLastName.slice(1)
	var email = req.body.newUserEmail
		newPerson = {
			"firstname": firstname,
			"lastname": lastname,
			"email": email
		}
console.log("New Person object looks like :" + "\n" + newPerson)
var userListJSON = []
var completeList = []
jsonREADER.readJSON('./resources/users.json', function ( jsonData ) {
	userListJSON = jsonData
})

console.log("Userlist old json : " + "\n" + userListJSON)

userListJSON.push(newPerson)

fs.writeFile('./resources/users.json' , JSON.stringify(completeList), function ( err ) {
		if(err) {
			console.log("Error in writeFile :" + err)
			throw err;
		}	
// (Once that is complete.....), (redirects to the route that displays all your users) (from part 0).
	jsonREADER.readJSON('./resources/users.json', function ( jsonData ) {
			res.render('index', {
				allUsers: jsonData
			});
		})
	})
})
// or

app.post('/list-new-users' , function ( req , res ) {
	console.log("ALL USERS : post request received!")
	
	var newUser = req.body
	console.log("THIS IS THE BODY : " + req.body)
	var userList = fs.readFileSync('./resources/users.json')
	var users = JSON.parse(userList)
	users.push(newUser) 
	var users = JSON.stringify(users)
	fs.writeSync('./resources/users.json')
	res.redirect('/')
}) 
