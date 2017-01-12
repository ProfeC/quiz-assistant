// NOTE: Utility Functions
import React from 'react'

// NOTE: Require data files.
// FIX: THERE MUST BE A BETTER WAY TO DO THIS!
const data_navigation = require('../data/navigation.json')
const data_20161024 = require('../data/20161024.json')
const data_20161031 = require('../data/20161031.json')
const data_20161107 = require('../data/20161107.json')
const data_20161121 = require('../data/20161121.json')
const data_20161127 = require('../data/20161127.json')
const data_20170109 = require('../data/20170109.json')

// NOTE: Get requested lists.
export function getList(list) {
  // console.info('utils.getList')
  // console.info(eval('data_' + list))
  if (list === null) {
    return false
  }

  return eval('data_' + list)
}

// NOTE: Get spelling words.
export function getSpellingWords(list) {
  if (list === null) {
    return false
  }

  // console.info('utils.getSpellingWords()')
  // console.info(eval('data_' + list))
  return eval('data_' + list)
}

// NOTE: Get number of items.
export function getCount(someArray) {

  if (someArray === null) {
    return false
  }

  console.info('utils.getCount')
  console.info(someArray)
  return someArray.length
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
    // console.log(data);
    // console.log(data.spellingWords);
    return data.spellingWords;
  })
  .catch( function( err ) {
    console.error('Fetch Error!', err);
  });
}

export function checkEnter(e, ...props) {
  if (e.key === 'Enter') {
    // console.log($r)
    console.info(props)

    // handleSpellingCheck(e)
  }
}

export function handleSpellingCheck (e, ...props) {

    // alert('Text field value is: ' + this.state.currentSpelling + '\n\nThe word was: ' + this.state.currentWord)

  if (this.state.currentSpelling === this.state.currentWord) {
      // alert('Spellings match...')
    this.setState({
      spellingMatches: true,
      spellingChecked: true
    })
  } else {
      // alert('Spellings don\'t match...')
    this.setState({
      spellingMatches: false,
      spellingChecked: true
    })
  }
}

// NOTE: Timer Functions
export function startTimer (time, id, myCallback) {
  // console.info('utils.startTimer(\'' + id + '\')')
  // console.log(time)
  // console.log(id)
  // console.log(myCallback)
  id = setInterval(
    myCallback,
    time
  )
  // console.info("\n*** Timer Started ***\n")
}

export function stopTimer (id) {
  console.info('utils.stopTimer(\'' + id + '\')')
  clearInterval(id)
  // console.info("\n*** Timer Stopped ***\n")
}
