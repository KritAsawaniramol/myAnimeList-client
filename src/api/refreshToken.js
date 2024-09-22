import axios from "axios";
import {
  setAccessToken,
  setRefreshToken,
  getCredentialID,
  getRefreshToken,
} from "../auth/authClientStore";
import { sendUnprotectedReq } from './useApi';


export const refreshToken = async () => {
  return sendUnprotectedReq.post("/auth/refresh-token", {
    credential_id: parseInt(getCredentialID()),
    refresh_token: getRefreshToken(),
  }).then((res) => {
    setAccessToken(res.data.access_token);
    setRefreshToken(res.data.refresh_token);
    return res.data.access_token
  }).catch((err) => {
    console.log(err);
    throw err;
  })
};