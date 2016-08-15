const expect = require('chai').expect;
const request = require('supertest');
const utils = require('../src/lib/utilities');

let tstData = {};
function getTstData() {
  return tstData;
}
function setTstData(data) {
  tstData = data;
}

const tests = [
  {
    desc: 'Adds a user, should return obj with id and name.',
    method: 'POST',
    payload: {
      name: 'tstName',
    },
    route: '/api/v1/users',
    statusCode: 201,
    success: (res, done) => {
      setTstData(res.body);

      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('name');

      done();
    },
  },
  {
    desc: 'Returns multiple users, should be above 0.',
    method: 'GET',
    route: '/api/v1/users',
    statusCode: 200,
    success: (res, done) => {
      expect(res.body.length).to.be.above(0);

      done();
    },
  },
  {
    desc: 'Returns single user, should return obj with id and name.',
    method: 'GET',
    // route: `/api/v1/users/${this.tstDataIgnore.id}`,
    route: '/api/v1/users/' + getTstData().id,
    statusCode: 200,
    success: (res, done) => {
      utils.debug(res.body);

      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('name');

      done();
    },
  },
  // {
  //   desc: 'Adds an app, should return obj with id, title and description.',
  //   method: 'POST',
  //   payload: {
  //     name: 'tstName',
  //   },
  //   route: '/api/v1/users',
  //   statusCode: 201,
  //   success: (res, done) => {
  //     this.tstDataIgnore = res.body;
  //
  //     expect(res.body).to.have.property('id');
  //     expect(res.body).to.have.property('name');
  //
  //     done();
  //   },
  // },
  // {
  //   desc: 'Returns multiple users, should be above 0.',
  //   method: 'GET',
  //   route: '/api/v1/users',
  //   statusCode: 200,
  //   success: (res, done) => {
  //     expect(res.body.length).to.be.above(0);
  //
  //     done();
  //   },
  // },
];

describe('Routes', () => {
  let server;

  beforeEach(() => {
    server = require('../src/server');
  });

  afterEach(() => {
    server.close();
  });

  tests.forEach((test) => {
    it(`${test.method} ${test.route} ${test.desc}`, (done) => {
      if (test.method === 'GET') {
        request(server)
        .get(test.route)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(test.statusCode)
        .end((err, res) => {
          if (err) {
            utils.debug(err);
          } else {
            test.success(res, done);
          }
        });
      } else if (test.method === 'POST') {
        request(server)
        .post(test.route)
        .send(test.payload)
        .expect(test.statusCode)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            utils.debug(err);
          } else {
            test.success(res, done);
          }
        });
      }
    });
  });
});
