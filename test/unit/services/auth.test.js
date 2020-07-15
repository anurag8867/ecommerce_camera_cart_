const chai = require("chai");
const assert = chai.assert;
const auth = require('../../../services/auth');
const authRepo = require('../../../repositories/auth');
const sinon = require('sinon');

describe(`Login and Generate User Token`, () => {
    before(function () {
        sinon.stub(authRepo, 'findUser').resolves({ id: 1, password: "$2b$12$kvfVkCpxNVB9DkhHX5PPCOr9w4xV1mmTVST5XqYE7Q7BYxeH.VbV6" });
    });
    after(function () {
        authRepo.findUser.restore(); // Unwraps the spy
    });
    it(`should login and give us a token'`, async function () {
        let resp = await auth.login("email11111q1", "password");
        assert.equal(resp.message, "Logged In Successfully, this token can be utilized for the further calls for this user");
        assert.isNotNull(resp.token);
    });
});

describe(`Do not Login for Wrong Password`, () => {
    before(function () {
        sinon.stub(authRepo, 'findUser').resolves({ id: 1, password: "$2b$12$kvfVkCpxNVB9DkhHX5PPCOr9w4xV1mmTVST5XqYE7Q7BYxeH.VbV6" });
    });
    after(function () {
        authRepo.findUser.restore(); // Unwraps the spy
    });
    it(`should not login because of wrong password'`, async function () {
        try {
            let resp = await auth.login("email11111q1", "passworda");
        } catch (e) {
            assert.equal(e.message, "Email password mismatch");
            assert.equal(e.status, "401");
        }
    });
});

describe(`Do not Login for because this user doesn't exist`, () => {
    before(function () {
        sinon.stub(authRepo, 'findUser').resolves(null);
    });
    after(function () {
        authRepo.findUser.restore(); // Unwraps the spy
    });
    it(`should not login because of this user doesn't exist with the application'`, async function () {
        try {
            let resp = await auth.login("email11111q1", "passworda");
        } catch (e) {
            assert.equal(e.message, "No User Found with the given email, We would like to request you to signup first");
            assert.equal(e.status, "404");
        }
    });
});

describe(`signup`, () => {
    before(function () {
        sinon.stub(authRepo, 'findUser').resolves(null);
        sinon.stub(authRepo, 'saveUser').resolves(true);
    });
    after(function () {
        authRepo.findUser.restore(); // Unwraps the spy
    });
    it(`should signup`, async function () {
        let resp = await auth.signup("email11111q1", "passworda");
        assert.equal(resp.message, "User Registered successfully, Please login with the same email");
        assert.equal(resp.status, 201);
        assert.isNotNull(resp.user);
    });
});

describe(`do not register/signup`, () => {
    before(function () {
        sinon.stub(authRepo, 'findUser').resolves(true);
    });
    after(function () {
        authRepo.findUser.restore(); // Unwraps the spy
    });
    it(`should not signup because of this user already exist with the application'`, async function () {
        try {
            let resp = await auth.signup("email11111q1", "passworda");
        } catch (e) {
            assert.equal(e.message, "A user with same email id found. Please login with the same email");
            assert.equal(e.status, 409);
        }
    });
});


describe(`Generate JWT`, () => {
    it(`should get All products added inside cart for this specific user`, async function () {
        try {
            let resp = await product.generateJwt("sindhuanurag2@gmail.com", "uuid");
            assert.isNotNull(resp);
        } catch (e) {
        }
    });
});