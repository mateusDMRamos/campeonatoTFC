import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import matchesData from './mocks/matches';
chai.use(chaiHttp);

const { expect } = chai;
const OK_STATUS = 200;

describe('Teste de integração da rota GET /matches', () => {

  afterEach(function () {
    sinon.restore();
  });

  it('Retorna a lista de partidas', async function () {
    sinon.stub(MatchesModel, 'findAll').resolves(matchesData);

    const response = await chai.request(app).get('/matches');
    expect(response.status).to.be.equal(OK_STATUS);
    expect(response.body).to.deep.equal({ message: matchesData });
  })
});