import Connection from "../Connection";
import access from "../settings/access";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const config = access.session();

  return Connection.useApiResult(...config);
};
