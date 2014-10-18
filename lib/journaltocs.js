/*
 * journaltocs
 * https://github.com/ContentMine/node-journalTOCs
 *
 * Copyright (c) 2014 Shuttleworth Foundation
 * Written by Richard Smith-Unna <richard@contentmine.org>
 * Licensed under the MIT license.
 */

var FeedParser = require('feedparser')
  , request = require('request')
  , EventEmitter2 = require('eventemitter2').EventEmitter2;

// Create a new JournalTOCs instance.
//
// A JournalTOCs instance is a controller for API access
// using a specific email address.
//
// @param {String} email user email address
var JournalTOCs = function(email) {
  this.baseURL = 'http://www.journaltocs.ac.uk/api/';
  this.email = email;
  this.userStr = '?user=' + this.email;
}

// Run a query against the journalTOCs API
//
JournalTOCs.prototype.runQuery = function(url) {
  var req = request(url);
  var parser = new FeedParser();
  var emitter = new EventEmitter2();

  req.on('error', function (error) {
    // handle any request errors
  });

  req.on('response', function (res) {
    var stream = this;

    if (res.statusCode != 200) {
      emitter.emit('error', new Error('Bad status code'));
    }

    stream.pipe(parser);
  });

  parser.on('error', function(error) {
    emitter.emit('error', error);
  });

  var items = [];

  parser.on('readable', function() {

    var stream = this
      , meta = this.meta
      , item;

    while (item = stream.read()) {
      items.push(item);
    }

  });

  parser.on('end', function() {
    emitter.emit('result', items);
  });

  return emitter;

}

// Query the Journals API with a search string to find
// journals with matching names.
//
// @param {String} query search query
// @return {EventEmitter2}
JournalTOCs.prototype.findJournals = function(query) {
  var url = this.baseURL + 'journals/' + query + this.userStr;
  return this.runQuery(url);
}

// Query the Journals API with an ISSN to get detailed
// information about a specific journal.
//
// @param {String} issn journal ISSN
// @return {EventEmitter2}
JournalTOCs.prototype.journalDetails = function(issn) {
  var url = this.baseURL + 'journals/' + issn + this.userStr;
  return this.runQuery(url);
}

// Query the Journals API with an ISSN to get the
// latest articles from a specific journal.
//
// @param {String} issn journal ISSN
// @return {EventEmitter2}
JournalTOCs.prototype.journalArticles = function(issn) {
  var args = this.userStr + '&output=articles';
  var url = this.baseURL + 'journals/' + issn + args;
  return this.runQuery(url);
}

module.exports = JournalTOCs;
