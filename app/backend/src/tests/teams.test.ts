import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import teamsMock from './mocks/teams';
import Teams from '../database/models/TeamsModel';
chai.use(chaiHttp);

const { expect } = chai;
const OK_STATUS = 200;

describe('Teste de integração da rota /teams', () => {

  afterEach(function () {
    sinon.restore();
  });

  it('Retorna todos os times do banco de dados quando usado get /teams', async function () {
    sinon.stub(Teams, 'findAll').resolves(teamsMock);
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.equal(OK_STATUS);
    expect(response.body).to.deep.equal(teamsMock);
  })

  it('Retorna o time com o id do banco de dados quando usado o get /teams:id', async function () {
    sinon.stub(Teams, 'findByPk').resolves(teamsMock[0]);
    const response = await chai.request(app).get('/teams/:id');
    expect(response.status).to.be.equal(OK_STATUS);
    expect(response.body).to.deep.equal(teamsMock[0]);
  })
});
