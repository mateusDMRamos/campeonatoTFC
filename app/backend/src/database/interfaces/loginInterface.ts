interface LoginBody {
  email: string,
  password: string,
}

interface ITokenResponse {
  validated: boolean,
  token?: string,
}

interface IDecoded {
  data: {
    email: string
  }
}

export {
  ITokenResponse,
  LoginBody,
  IDecoded,
};
