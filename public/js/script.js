$('document').ready ( function ( ) {
	console.log("DOM is ready")

		// var canFireRequest = true

		$('#searchfield').keyup ( function( ) {

			var inputLetters = {
				userNameSearch: $(this).val( ),
				ajax: true
			} 
			console.log(inputLetters)

			$.post('/api', inputLetters, function (data) {

			// if (inputLetters.userNameSearch)
			$('#results').empty()

			for (person in data) {
				$('#results').append('<option>' + data[person].firstname + " " + data[person].lastname + '</option>')
			}
		})

		})
	})
