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
$ ( 'option' ) .click( function() {
	$('#searchfield').val($(this).val())
	console.log('clicked')
})
		/// when inputLetters.userNameSearch contains values
		if (inputLetters.userNameSearch) {
			// and if canfirerequest is true
			if (fireRequest) {
				/// set to false afterwards
				fireRequest = false
			// ajax gets loaded here
			$.post('/api', inputLetters, function (data) {
			// the results get narrowed after the results are more specified, so no matches gets filtered out
			$('#results').empty()
			$('#displayname').empty()
			// add the results as options to a list under the #searchfield 
			for (person in data) {
				$('#results').append('<option>' + data[person].firstname + " " + data[person].lastname + '</option>')
				$('#displayname').append('<option>' + data[person].firstname + " " + data[person].lastname + '</option>')
			}
		})
		}
		// after 300ms a new ajax call gets available to prevent spamming
		setTimeout(function() {
			fireRequest = true
		}, 300)
	}
})

})




