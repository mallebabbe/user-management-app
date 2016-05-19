// check if DOM got loaded
$('document').ready ( function ( ) {
	console.log("DOM is ready")
// var used by setTimeout
var fireRequest = true
// in the searchfield, letters will be displayed one a the time because of the .keyup
$('#searchfield').keyup ( function( ) {
//var inputLetters that contains an object with a key userNameSearch that stores the letters from #searchfield 	
var inputLetters = {
	userNameSearch: $(this).val( )
}
		/// when inputLetters.userNameSearch contains values
		if (inputLetters.userNameSearch) {
			// and if canfirerequest is true
			if (fireRequest) {
				/// set to false afterwards
				fireRequest = false
			// ajax gets loaded
			$.post('/api', inputLetters, function (data) {

			// if (inputLetters.userNameSearch)
			$('#results').empty()
			$('#displayname').empty()

			for (person in data) {
				$('#results').append('<option>' + data[person].firstname + " " + data[person].lastname + '</option>')
				$('#displayname').append('<option>' + data[person].firstname + " " + data[person].lastname + '</option>')
			}
			console.log("this is the data : " + data)
		})
		}
		setTimeout(function() {
			fireRequest = true
		}, 300)
	}
})
})




