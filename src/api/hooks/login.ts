import Connection from "../Connection";
import access from "../settings/access";

// eslint-disable-next-line import/no-anonymous-default-export
export default (email: string, pass: string) => {
  const config = access.login(email, pass);

  return Connection.useApiResult(...config);
};
