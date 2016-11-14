// NOTE: Utility Functions

// NOTE: Get URL Parameters
export function getUrlParam(name) {
	const urlParams = new URLSearchParams(location.search);
	console.log(urlParams.has(name));
	if ( urlParams.has(name) ) {
		return urlParams.get(name);
	} else {
		return 'No param by that name.';
	}
}

// NOTE: Get words from all lists.
// NOTE: Reference => https://developers.google.com/web/updates/2015/03/introduction-to-fetch
export function getWords(list) {
	fetch('./data/' + list + '.json')
		.then(
			function( response ) {
				if ( response.status != 200 ) {
					console.log('Something went all wonky! Status Code: ' + response.status);
					return;
				}

				response.json().then(function(data) {
					console.log(data);
				});
			}
		)
		.catch( function( err ) {
			console.error('Fetch Error!', err);
		});

	// this.setState({spellingWordsCount: this.state.spellingWords.length});
	// this.setState({
	// 	spellingWords: week2.spellingWords,
	// 	spellingWordsCount: week2.spellingWords.length
	// });

	console.log(Utils.getUrlParam('list'));
}
