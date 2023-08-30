import { store } from "../../models/store";
import { getAcceessToken, getMe } from "../../utils/rest/auth";

export const authenticate = async (): Promise<void> => {
  try {
    const user = await getMe();

    if (user) {
      store.session.updateUser(user);
    }
  } catch (error) {
    console.log("features.authenticate updateUser", error);
  }

  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const accessToken = await getAcceessToken(refreshToken);
      if (accessToken) {
        store.session.setAccessToken(accessToken.access);
      }
    }
  } catch (error) {
    console.log("features.authenticate getAccessToken", error);
  }
};
