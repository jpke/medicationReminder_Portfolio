global.databaseUri = 'mongodb://localhost/medList';

import chai from 'chai';
import chaiHttp from 'chai-http';
import {runServer, app} from '../../server/index.js';
import mongoose from 'mongoose';
import UrlPattern from 'url-pattern';

import User from '../../models/user-model';
import Medications from '../../models/medication-model';

const should = chai.should();

chai.use(chaiHttp);

before(function(done) {
    runServer(function() {
        console.log("this runs");
        done();
    })
});

describe.only('Users', function() {
    it('should add user on POST', function(done) {
        chai.request(app)
            .post('/user')
            .send({
                'username': "testUser",
                'password': 'testPassword',
                'email': 'testEmail'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('string');
                res.body.should.equal("account created");
                done();
            });
    });
    it('should not add repeated username on POST', function(done) {
        chai.request(app)
            .post('/user')
            .auth('testUser', 'testPassword')
            .send({
                'username': "testUser",
                'password': 'testPassword',
                'email': 'testEmail'})
            .end(function(err, res) {
                should.not.equal(err, null);
                res.should.have.status(409);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.equal({message: "Username already taken."});
                done();
            });
    });
    it('should modify user account on PUT', function(done) {
        chai.request(app)
            .PUT('/user')
            .auth('testUser', 'testPassword')
            .send({
                'username': 'changedUserName',
                'password': 'changedPassWord',
                'email': 'changedEmail'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('string');
                res.body.should.equal("account updated");
                done();
            });
    });
    it('should delete user account on DELETE', function(done) {
        chai.request(app)
            .DELETE('/user')
            .auth('changedUserName', 'changedPassWord')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('string');
                res.body.should.equal("account deleted");
                done();
            });
    });
});

describe('Medications', function() {
    before(function(done) {
        chai.request(app)
            .send({
                'username': "testUser",
                'password': 'testPassword',
                'email': 'testEmail'})          
            .end(function(err, res) {
                should.equal(err,null);
                done();
            });
        done()
    });
    it('should add medication reminder on POST', function(done) {
        chai.request(app)
            .post('/mediciation')
            .send({'name': 'Peppers'})
            .end(function(err, res) {
                err.should.not.be.null;
                err.should.have.status(409);
                res.should.be.json;
                done();
            });
    });
    it('should not POST if id exists', function(done) {
        chai.request(app)
            .post('/items')
            .send({'name': 'Peppers', 'id': 3})
            .end(function (err, res) {
                err.should.not.be.null;
                res.should.have.status(409);
                res.should.be.json;
                done();
            });
    });
    it('should not POST if body data does not exist', function(done) {
        chai.request(app)
            .post('/items')
            .send()
            .end(function(err,res){
                err.should.not.be.null;
                res.should.have.status(400);
                res.should.be.json;
                done();
            });
    });
    it('should not POST without valid json', function(done) {
        chai.request(app)
        .post('/items')
        .send(variable = "variable")
        .end(function(err, res) {
            err.should.not.be.null;
            res.body.should.equal('item name missing');
            res.should.have.status(400);
            res.should.be.json;
            done();
        });
    });
    it('should edit an item on PUT', function(done) {
        chai.request(app)
        .put('/items/3')
        .send({'name': 'Pepper', 'id': 3})
        .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('id');
            res.body.name.should.be.a('string');
            res.body.id.should.be.a('number');
            res.body.name.should.equal('Pepper');
            storage.items.should.be.a('array');
            storage.items.should.have.length(4);
            storage.items[2].should.be.a('object');
            storage.items[2].should.have.property('id');
            storage.items[2].should.have.property('name');
            storage.items[2].id.should.be.a('number');
            storage.items[2].name.should.be.a('string');
            storage.items[2].name.should.equal('Pepper');
            done();
        })
    });
    it('should not PUT without id in endpoint', function(done) {
        chai.request(app)
        .put('/items')
        .send({'name': 'Pepper', 'id': 3})
        .end(function(err, res) {
            err.should.not.be.null;
            res.should.have.status(400);
            res.body.should.equal('id param missing');
            res.should.be.json;
            done();
        })
    });
    it('should not PUT with different endpoint and body id', function(done) {
        chai.request(app)
        .put('/items/2')
        .send({'name': 'Pepper', 'id': 3})
        .end(function(err, res) {
            err.should.not.be.null;
            res.should.have.status(400);
            res.body.should.equal('bad request');
            res.should.be.json;
            done();
        })
    });
    it('PUT to id that doesn\'t exist', function(done) {
        chai.request(app)
        .put('/items/5')
        .send({'name': 'Donut', 'id': 5})
        .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('id');
            res.body.name.should.be.a('string');
            res.body.id.should.be.a('number');
            res.body.name.should.equal('Donut');
            storage.items.should.be.a('array');
            storage.items.should.have.length(5);
            storage.items[4].should.be.a('object');
            storage.items[4].should.have.property('id');
            storage.items[4].should.have.property('name');
            storage.items[4].id.should.be.a('number');
            storage.items[4].name.should.be.a('string');
            storage.items[4].name.should.equal('Donut');
            // storage.items[4].should.equal(res.body);
            done();
        });
    });
    it('should not PUT without body data', function(done) {
        chai.request(app)
        .put('/items/2')
        .send()
        .end(function(err, res) {
            err.should.not.be.null;
            res.should.have.status(400);
            res.body.should.equal('bad request');
            res.should.be.json;
            done();
        });
    });
    it('should not put without valid json', function(done) {
        chai.request(app)
        .put('/items/2')
        .send(variable = "variable")
        .end(function(err, res) {
            err.should.not.be.null;
            res.should.have.status(400);
            res.body.should.equal('bad request');
            res.should.be.json;
            done();
        });
    });
    it('should DELETE an item on delete', function(done) {
        chai.request(app)
        .delete('/items/5')
        .send({'name': 'Donut', 'id': 5})
        .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.length(4);
            JSON.stringify(storage.items).should.equal(JSON.stringify(res.body));
            done();
        });
    });
    it('should not DELETE id that doesn\'t exist', function(done) {
        chai.request(app)
        .delete('/items/6')
        .send({'name': 'Cake', 'id': 6})
        .end(function(err, res) {
            err.should.not.be.null;
            res.should.have.status(404);
            res.should.be.json;
            res.body.should.equal('item not found');
            storage.items.should.have.length(4);
            done();
        });
    });
    it('should not DELETE without id in endpoint', function(done) {
        chai.request(app)
        .delete('/items')
        .send({'name': 'Pepper', 'id': 3})
        .end(function(err, res) {
            err.should.not.be.null;
            res.should.have.status(400);
            res.body.should.equal('id param missing');
            res.should.be.json;
            done();
        });
    });
});