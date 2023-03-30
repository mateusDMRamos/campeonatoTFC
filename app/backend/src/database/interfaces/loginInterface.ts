interface LoginBody {
  email: string,
  password: string,
}

interface ITokenResponse {
  validated: boolean,
  token?: string,
}

export {
  ITokenResponse,
  LoginBody,
};
