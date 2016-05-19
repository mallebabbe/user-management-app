$('document').ready ( function ( ) {
	console.log("DOM is ready")
	$('#searchfield').keyup ( function( ) {
		// var showNames = []
		var inputLetters = {
			userNameSearch: $(this).val( ),
			// ajax: true
		} 
		console.log(inputLetters)

		if (inputLetters.userNameSearch) {
			$.post('/api', inputLetters, function (data) {
				console.log(data)
				var $this = $('#displayname').empty()
				for (x in data) {
					$($this).append('<li><a href="mailto:' + data[x].email + '">' + data[x].firstname + ' ' + data[x].lastname +'</a></li>');
				};
			});
		} else {
			$("#displayname").empty();
		}
	})
}) 

			// $ ('#firstname').text (data.firstname)
			// $ ('#lastname').text (data.lastname)
			// $ ('#email').text (data.email)
			// $('searchfield').autocomplete
