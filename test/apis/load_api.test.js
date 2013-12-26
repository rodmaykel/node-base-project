var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var supertest = require('supertest');
var app = require('../../app');
var logger = require('../../lib/logger');
var ping_model = require('../../models/ping_model');
var TAG = "load_api.test";

describe('api:load_api', function(){

  before(function(){
    
  });// before
  
  describe('#load_api', function(){
    before(function(){
      logger.d(TAG, "#load_api: started");
      sinon
        .stub(ping_model, 'check')
        .yields(0);
    }); // before
    after(function(done) {
      ping_model.check.restore();
      logger.d(TAG, "#load_api: finished");
      done();
    }); // after

    beforeEach(function(){
      logger.d(TAG, "===================================================");
    }); // before
    
    it('valid api version and endpoint should return ok', function(done){
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

    it('invalid api version should return 404', function(done){
      supertest(app)
        .get('/api/v2/ping')
        .expect(404)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if (err) return done(err);
          should.equal(res.body.error.code, "404");
          should.equal(res.body.error.message, "Invalid API version");
          done();
        });
    }); // it

    it('invalid endpoint should return 404', function(done){
      supertest(app)
        .get('/api/v1/invalid_endpoint')
        .expect(404)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if (err) return done(err);
          should.equal(res.body.error.code, "404");
          should.equal(res.body.error.message, "Invalid API endpoint");          
          done();
        });
    }); // it

  }); // describe
});