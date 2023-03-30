import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import token from './mocks/login';
import UserModel from '../database/models/UserModel';
chai.use(chaiHttp);

const { expect } = chai;
const OK_STATUS = 200;

describe('Teste de integração da rota /login', () => {

  afterEach(function () {
    sinon.restore();
  });

  it('Retorna o token caso o login seja feito corretamente', async function () {
    sinon.stub(UserModel, 'findOne').resolves();
    const response = await chai.request(app).post('/login');
    expect(response.status).to.be.equal(OK_STATUS);
    expect(response.body).to.deep.equal(token);
  })
});