var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var supertest = require('supertest');
var app = require('../../../app');
var logger = require('../../../lib/logger');
var ping_model = require('../../../models/ping_model');

var TAG = "ping.test";

describe('api:v1:ping', function(){

  before(function(){
    
  });// before
  
  describe('#ping:success', function(){
    before(function(){
      logger.d(TAG, "#ping:success started");
      sinon
        .stub(ping_model, 'check')
        .yields(0);
    }); // before
    after(function(done) {
      ping_model.check.restore();
      logger.d(TAG, "#ping:success finished");
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
  }); // describe

  describe('#ping:error', function(){
    before(function(done){
      logger.d(TAG, "#ping:error: started");
      sinon
        .stub(ping_model, 'check')
        .yields(-1);
      done();
    }); // before
    after(function(done) {
      ping_model.check.restore();
      logger.d(TAG, "#ping:error finished");
      done();
    }); // after

    beforeEach(function(){
      logger.d(TAG, "===================================================");
    }); // before
    
    it('ping should response status:error', function(done){
      supertest(app)
        .get('/api/v1/ping')
        .expect(500)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if (err) return done(err);
          should.equal(res.body.status, "error");
          done();
        });
    }); // it
    
  }); // describe


});
