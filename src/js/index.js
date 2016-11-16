require('react');

var container = require('./container');

document.body.prepend(container());
document.body.prepend('<link href="https://fonts.googleapis.com/css?family=Roboto:400,300,700" rel="stylesheet" type="text/css">');

require('./app');
