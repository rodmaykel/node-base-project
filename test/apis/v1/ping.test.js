var assert = require('assert');
var should = require('should');
var supertest = require('supertest');
var app = require('../../../app');
var logger = require('../../../lib/logger');

var TAG = "ping.test";

describe('api:v1:ping', function(){

  before(function(){
    
  });// before
  
  describe('#ping', function(){
    before(function(){
      logger.d(TAG, "#ping: started");
    }); // before
    after(function(done) {
      logger.d(TAG, "#ping: finished");
      done();
    }); // after

    beforeEach(function(){
      logger.d(TAG, "===================================================");
    }); // before
    
    it('ping should response status:ok', function(done){
      supertest(app)
        .get('/api/v1/ping')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if (err) return done(err);
          should.equal(res.body.status, "ok");
          done();
        });
    }); // it

    // TODO: add test for database down
    
  }); // describe
});