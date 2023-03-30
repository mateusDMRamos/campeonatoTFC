import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { 
  token,
  loginBody,
  user,
  noEmailLoginBody,
  wrongLoginBody,
  invalidEmailBody, 
  tokenVerify
} from './mocks/login';
import UserModel from '../database/models/UserModel';
chai.use(chaiHttp);

const { expect } = chai;
const OK_STATUS = 200;
const LACKING_FIELDS_STATUS = 400;
const INVALID_FIELDS_STATUS = 401;
const lackingFieldsMessage = 'All fields must be filled';
const invalidFieldsMessage = 'Invalid email or password';

describe('Teste de integração da rota POST /login', () => {

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

  it('Retorna erro caso o login seja feito sem email', async function () {
    sinon.stub(UserModel, 'findOne').resolves(user);
    sinon.stub(bcryptjs, 'compareSync').resolves(true);

    const response = await chai.request(app).post('/login').send(noEmailLoginBody);
    expect(response.status).to.be.equal(LACKING_FIELDS_STATUS);
    expect(response.body).to.deep.equal({ message: lackingFieldsMessage });
  });

  it('Retorna erro caso o login seja feito com email e senha fora do formato válido', async function () {
    sinon.stub(UserModel, 'findOne').resolves(user);
    sinon.stub(bcryptjs, 'compareSync').resolves(true);

    const response = await chai.request(app).post('/login').send(wrongLoginBody);
    expect(response.status).to.be.equal(INVALID_FIELDS_STATUS);
    expect(response.body).to.deep.equal({ message: invalidFieldsMessage });
  });

  it('Retorna erro caso o login seja feito com email que não está cadastrado', async function () {
    sinon.stub(UserModel, 'findOne').resolves();
    sinon.stub(bcryptjs, 'compareSync').resolves(false);

    const response = await chai.request(app).post('/login').send(invalidEmailBody);
    expect(response.status).to.be.equal(INVALID_FIELDS_STATUS);
    expect(response.body).to.deep.equal({ message: invalidFieldsMessage });
  });
});


describe('Teste de integração da rota GET /login/role', () => {

  afterEach(function () {
    sinon.restore();
  });

  it('Retorna a role caso o token enviado seja válido', async function () {
    sinon.stub(UserModel, 'findOne').resolves(user);
    sinon.stub(bcryptjs, 'compareSync').resolves(true);

    const signMock = sinon.mock(jwt);
    signMock.expects('verify').returns(tokenVerify);

    const response = await  chai.request(app).get('/login/role').send(loginBody);
    expect(response.status).to.be.equal(OK_STATUS);
    expect(response.body).to.deep.equal({ role: user.role });
  })
});