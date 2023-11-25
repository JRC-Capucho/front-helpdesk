// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login: (email: string, password: string): [Object, Object | null] => [
    {
      url: "/user/login",
      method: "POST",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json:charset=UTF-8",
      },
      params: {
        email: email,
        password: password,
      },
    },
    null,
  ],
  session: (): [Object, Object | null] => [
    {
      url: "/user/session",
      method: "GET",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json:charset=UTF-8",
      },
    },
    null,
  ],
};
