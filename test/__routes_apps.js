// const expect = require('chai').expect;
// const request = require('supertest');
//
// describe('App Routes', () => {
//   let server;
//
//   beforeEach(() => {
//     server = require('../src/server');
//   });
//
//   afterEach(() => {
//     server.close();
//   });
//
//   // Test for Multiple Apps
//   it('GET /api/v1/apps returns multiple apps', (done) => {
//     request(server)
//       .get('/api/v1/apps')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect((res) => {
//         const tmpApps = res.body;
//
//         // Save one single app from the list to test on in later tests
//         this.tstAppIgnored = tmpApps[0];
//
//         expect(tmpApps.length).to.be.above(0);
//       })
//       .end(done);
//   });
//
//   // Test for a single app
//   it('GET /api/v1/apps/:id returns an obj with id, title, description, and releaseDate', (done) => {
//     request(server)
//       .get('/api/v1/apps/' + this.tstAppIgnored.id)
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect((res) => {
//         const tmpApp = res.body;
//
//         expect(tmpApp).to.have.property('id');
//         expect(tmpApp).to.have.property('title');
//         expect(tmpApp).to.have.property('description');
//       })
//       .end(done);
//   });
// });
