import Connection from "../Connection";
import sector from "../settings/sector";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  set: (id: string | null, data: any) => {
    const config = sector.set(id, data);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return Connection.useApiResult(...config);
  },
  get: (id: string | null) => {
    const config = sector.sectorList(id);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return Connection.useApiResult(...config);
  },
  delete: (id: string) => {
    const config = sector.delete(id);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return Connection.useApiResult(...config);
  },
};
