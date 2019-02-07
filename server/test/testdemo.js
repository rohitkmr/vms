var should = require('should');
var app = require('../server');
var request = require('supertest');

describe('GET /api/visitors', function () {

    it('test', function (done) {
        request(app)
            .get('/')
            .expect(400)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    });
});