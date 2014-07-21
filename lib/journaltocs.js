/*
 * journaltocs
 * https://github.com/ContentMine/node-journalTOCs
 *
 * Copyright (c) 2014 Shuttleworth Foundation
 * Written by Richard Smith-Unna <richard@contentmine.org>
 * Licensed under the MIT license.
 */

'use strict';
var FeedParser = require('feedparser')
  , request = require('request');

// Create a new JournalTOCs instance.
//
// A JournalTOCs instance is a controller for API access
// using a specific email address.
//
// @param {String} email user email address
var JournalTOCs = function(email) {
  this.baseURL = 'http://www.journaltocs.ac.uk/api';
  this.email = email;
}

// Query the Journals API with a search string to find
// journals with matching names.
//
// @param {String} query search query
JournalTOCs.prototype.findJournals = function(query, cb) {

}

// Query the Journals API with an ISSN to get detailed
// information about a specific journal.
//
// @param {String} issn journal ISSN
JournalTOCs.prototype.journalDetails = function(issn, cb) {

}

// Query the Journals API with an ISSN to get the
// latest articles from a specific journal.
//
// @param {String} issn journal ISSN
JournalTOCs.prototype.journalArticles = function(issn, cb) {

}

// Query the Articles API with a search string to find
// articles whose metadata matches the query.
//
// If query is a String, the entire phrase is matched.
// If query is an Array of Strings, articles with metadata
// matching all terms are matched.
//
// @param {String, Array} query search query
JournalTOCs.prototype.articles = function(query, cb) {

}

// Query the User API with an email address to find
// journals being followed by a particular user.
//
// @param {String} email user email address
JournalTOCs.prototype.user = function(email, cb) {

}
