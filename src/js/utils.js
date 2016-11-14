// NOTE: Utility Functions

export const sqa = {};

// NOTE: Get URL Parameters
export function getUrlParam(name) {
	const urlParams = new URLSearchParams(location.search);
	// console.log(urlParams.has(name));

	if ( urlParams.has(name) ) {
		return urlParams.get(name);
	} else {
		return 'No param by that name.';
	}
}

// NOTE: Get words from all lists.
// NOTE: Reference => https://developers.google.com/web/updates/2015/03/introduction-to-fetch
export function getSpellingWords(list) {
	fetch('./data/' + list + '.json')
	.then(
		function( response ) {
			if ( response.status != 200 ) {
				console.error('Something went all wonky! Status Code: ' + response.status);
				return;
			}

			return response.json();
		})
	.then(function(data) {
		console.log(data);
		console.log(data.spellingWords);
		return data.spellingWords;
	})
	.catch( function( err ) {
		console.error('Fetch Error!', err);
	});
}
