import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { token, loginBody, user } from './mocks/login';
import UserModel from '../database/models/UserModel';
chai.use(chaiHttp);

const { expect } = chai;
const OK_STATUS = 200;

describe('Teste de integração da rota /login', () => {

  afterEach(function () {
    sinon.restore();
  });

  it('Retorna o token caso o login seja feito corretamente', async function () {
    sinon.stub(UserModel, 'findOne').resolves(user);
    sinon.stub(bcryptjs, 'compareSync').resolves(true);

    const signMock = sinon.mock(jwt);
    signMock.expects('sign').returns(token.token);

    const response = await chai.request(app).post('/login').send(loginBody);
    expect(response.status).to.be.equal(OK_STATUS);
    expect(response.body).to.deep.equal(token);
  })
});