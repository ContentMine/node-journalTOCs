[![NPM version](https://badge.fury.io/js/journaltocs.svg)][npm]
[![license MIT](http://b.repl.ca/v1/license-MIT-brightgreen.png)][license]
[![Downloads](http://img.shields.io/npm/dm/journaltocs.svg)][downloads]
[![Build Status](https://secure.travis-ci.org/ContentMine/node-journalTOCs.png?branch=master)][travis]
[![Dependency Status](https://gemnasium.com/ContentMine/node-journalTOCs.png)][gemnasium]
[![Coverage Status](https://img.shields.io/coveralls/ContentMine/node-journalTOCs.svg)][coveralls]
[![Code Climate](https://codeclimate.com/github/ContentMine/node-journalTOCs.png)][codeclimate]

[npm]: http://badge.fury.io/js/node-journalTOCs
[travis]: http://travis-ci.org/ContentMine/node-journalTOCs
[coveralls]: https://coveralls.io/r/ContentMine/node-journalTOCs
[gemnasium]: https://gemnasium.com/ContentMine/node-journalTOCs
[license]: https://github.com/ContentMine/node-journalTOCs/blob/master/LICENSE-MIT
[codeclimate]: https://codeclimate.com/github/ContentMine/node-journalTOCs
[downloads]: https://nodei.co/npm/node-journalTOCs

# journalTOCs [![Build Status](https://secure.travis-ci.org/ContentMine/node-journalTOCs.png?branch=master)](http://travis-ci.org/ContentMine/node-journalTOCs)

> JournalTOCs API client and cli

This is a very simple wrapper for the [JournalTOCs API](http://www.journaltocs.ac.uk/develop.php) that exposes methods for searching journals by keyword or ISSN and retrieving articles by journal ISSN.

## Installation

```sh
$ npm install --save journaltocs
```

## Documentation

The _(Journals)_ API is supported. The other APIs are not supported (if you particularly want them, please open an issue requesting them).

## Examples

```js
// load the module
var JournalTOCs = require('journaltocs');
var email = "your@email.com"
var jt = new JournalTOCs(email);


// find journals matching a query
var query = jt.findJournals('bioinformatics');
var bioinf_journals;

query.on('result', function(result) {
  // result is an array of objects, one per journal
  console.log(result);
  bioinf_journals = result;

  // get ISSN of the first match
  var issn = bioinf_journals[0]['prism:issn'];
});


// get details of the journal
query2 = jt.journalDetails('1460-2059');

query2.on('result', function(result) {
  // result is an object with details of the journal
  console.log(result.title); // Bioinformatics
});

// get latest articles from the journal
query3 = jt.journalArticles('1460-2059');

query3.on('result', function(result) {
  // result is an array of objects, one per article
  console.log(result[0]);
});

```

## Contributing

This is intended to be a lightweight client, so new features should be discussed first on the issue tracker. However, bug reports are welcome.


## License

Copyright (c) 2014 Shuttleworth Foundation
Licensed under the MIT license.
