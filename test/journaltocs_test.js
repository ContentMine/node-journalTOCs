var JournalTOCs = require('../lib/journaltocs.js'),
    should = require('should'),
    EventEmitter2 = require('eventemitter2').EventEmitter2;

TEST_EMAIL = "richardsmith404@gmail.com";

describe("JournalTOCs", function() {

  describe("()", function() {

    it("should set the email address", function() {
      var email = "your@email.com";
      var jt = new JournalTOCs(email);
      jt.email.should.equal(email);
    });

  });

  describe(".findJournals()", function() {

    it("should return an event emmiter", function() {
      var jt = new JournalTOCs(TEST_EMAIL);
      var fetcher = jt.findJournals('molecular');
      fetcher.should.be.an.instanceOf(EventEmitter2);
    });

    it("should fetch matching journals", function(done) {
      var jt = new JournalTOCs(TEST_EMAIL);

      // here we search for 'bioinformatics', and we expect the
      // journal Bioinformatics (http://bioinformatics.oxfordjournals.org/)
      // to be in the results.
      var fetcher = jt.findJournals('bioinformatics');

      fetcher.on('result', function(result) {
        var bioinf_issn = "1460-2059";
        var issns = result.map(function(x) {
          if (x.hasOwnProperty('prism:eissn')) {
            return x['prism:eissn']['#'];
          } else if (x.hasOwnProperty('prism:issn')) {
            return x['prism:issn']['#'];
          } else {
            return 'NA';
          }
        });
        issns.indexOf(bioinf_issn).should.be.above(-1);
        done();
      });
    });

  });

  describe(".journalDetails()", function() {

    it("should return an event emmiter", function() {
      var jt = new JournalTOCs(TEST_EMAIL);
      var fetcher = jt.journalDetails('1533-290X');
      fetcher.should.be.an.instanceOf(EventEmitter2);
    });

    it("should get details of a journal", function(done) {
      var jt = new JournalTOCs(TEST_EMAIL);

      // here we get the details of the journal Bioinformatics using its issn
      // and expect the title to be correct.
      var fetcher = jt.journalDetails('1460-2059');

      fetcher.on('result', function(result) {
        result[0].should.have.property('title', 'Bioinformatics');
        done();
      });

    });

  });

  describe(".journalArticles()", function() {

    it("should return an event emmiter", function() {
      var jt = new JournalTOCs(TEST_EMAIL);
      var fetcher = jt.journalArticles('1533-290X');
      fetcher.should.be.an.instanceOf(EventEmitter2);
    });

    it("should get a list of articles from a journal", function(done) {
      var jt = new JournalTOCs(TEST_EMAIL);

      // here we get the details of the journal Bioinformatics using its issn
      // and expect the title to be correct.
      var fetcher = jt.journalArticles('1460-2059');

      fetcher.on('result', function(results) {
        results.forEach(function(result) {
          result.should.have.property('dc:identifier');
        });
        done();
      });
    });

  });


});
