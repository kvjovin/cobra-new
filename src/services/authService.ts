import * as api from "@/server/api";
import apiEndpoints from "@/server/apiRouteConstant";

async function login(params: {
  registrationCode: string;
  ssn: string;
}): Promise<any> {
  try {
    return await api.post(apiEndpoints.Auth.login, params);
  } catch (error: any) {
    console.log(error);
  }
}

const AuthService = {
  login,
};

export default AuthService;
