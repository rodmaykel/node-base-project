var assert = require('assert');
var should = require('should');
var supertest = require('supertest');
var app = require('../app');
var logger = require('../lib/logger');

var LOG = false;

describe('Sample', function(){

  before(function(){
    logger.d('sample.test', "Sample test: started");
  }) // before
  
  describe('#sample_success', function(){
    before(function(){
      logger.d('sample.test', "#sample_success: started");
    }) // before


    beforeEach(function(){
      logger.d('sample.test', "===================================================");
    }) // before
    
    
    it('sample dummy test', function(done){
      done();
    }) // it

    it('sample should response success:1', function(done){
      supertest(app)
        .get('/sample')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if (err) return done(err);
          should.equal(res.body.success, 1);
          done();
        });
    }) // it
    
    
    after(function(done) {
      logger.d('sample.test', "Sample test: finished");
      done();
    }) // after

  }); // describe
});


