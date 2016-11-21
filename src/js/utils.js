// NOTE: Utility Functions

// NOTE: Require data files.
// FIX: THERE MUST BE A BETTER WAY TO DO THIS!
const data_20161024 = require('../data/20161024.json')
const data_20161031 = require('../data/20161031.json')
const data_20161107 = require('../data/20161107.json')
const data_20161121 = require('../data/20161121.json')
const data_20161127 = require('../data/20161127.json')

// NOTE: Get words from all lists.
export function getSpellingWords(list) {
  if (list === null) {
    return false
  }

  console.info(eval('data_' + list))
  return eval('data_' + list).spellingWords
}

// NOTE: Get URL Parameters
export function getUrlParam(name) {
  const urlParams = new URLSearchParams(location.search);
  // console.log(urlParams.has(name));

  if ( urlParams.has(name) ) {
    return urlParams.get(name)
  } else {
    return null
    // return 'No param by that name.'
  }
}

// NOTE: Get words from all lists.
// NOTE: Reference => https://developers.google.com/web/updates/2015/03/introduction-to-fetch
export function fetchSpellingWords(list) {
  console.info('../data/' + list + '.json')

  fetch('../data/' + list + '.json')
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
