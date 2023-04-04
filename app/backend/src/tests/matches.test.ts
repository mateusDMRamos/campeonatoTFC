import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import matchesData, { goalsReqBody } from './mocks/matches';
import { tokenVerify } from './mocks/login';
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
    expect(response.body).to.deep.equal(matchesData);
  })

  it('Retorna corretamente ao enviar um patch para /matches/:id/finish com token válido', async function () {
    sinon.stub(MatchesModel, 'update').resolves();

    const signMock = sinon.mock(jwt);
    signMock.expects('verify').returns(tokenVerify);

    const response = await chai.request(app).patch('/matches/1/finish');
    expect(response.status).to.be.equal(OK_STATUS);
    expect(response.body).to.deep.equal({ message: 'Finished' });
  })


  it('Retorna corretamente ao enviar um patch para /matches/:id com token válido', async function () {
    sinon.stub(MatchesModel, 'update').resolves();

    const signMock = sinon.mock(jwt);
    signMock.expects('verify').returns(tokenVerify);

    const response = await chai.request(app).patch('/matches/1').send(goalsReqBody);
    expect(response.status).to.be.equal(OK_STATUS);
    expect(response.body).to.deep.equal({ message: 'Match updated' });
  })

  it('Retorna as partidas filtradas com inProgress True', async function () {
    const inProgressMatch = [matchesData[1]];
    sinon.stub(MatchesModel, 'findAll').resolves(inProgressMatch);

    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.be.equal(OK_STATUS);
    expect(response.body).to.deep.equal(inProgressMatch);
  })

  it('Retorna as partidas filtradas com inProgress false', async function () {
    const endedMatch = [matchesData[0]];
    sinon.stub(MatchesModel, 'findAll').resolves(endedMatch);

    const response = await chai.request(app).get('/matches?inProgress=false');
    expect(response.status).to.be.equal(OK_STATUS);
    expect(response.body).to.deep.equal(endedMatch);
  })
});