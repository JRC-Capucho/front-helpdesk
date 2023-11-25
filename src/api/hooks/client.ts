import Connection from "../Connection";
import client from "../settings/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  set: (id: string | null, data: any) => {
    const config = client.set(id, data);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return Connection.useApiResult(...config);
  },
  get: (id: string | null) => {
    const config = client.list(id);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return Connection.useApiResult(...config);
  },
  delete: (id: string) => {
    const config = client.delete(id);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return Connection.useApiResult(...config);
  },
};
