import * as sinon from 'sinon';
import * as chai from 'chai';
import * as fs from 'fs';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import teamsMock from './mocks/teams';
chai.use(chaiHttp);

const { expect } = chai;
const OK_STATUS = 200;

describe('Teste do método get /teams', () => {
  beforeEach(function () {
    sinon.stub(fs.promises, 'readFile').resolves(JSON.stringify(teamsMock));
  });

  afterEach(function () {
    sinon.restore();
  });

  it('Retorna todos os times do banco de dados', async function () {
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.equal(OK_STATUS);
    expect(response.body).to.deep.equal(teamsMock);
  })
});
