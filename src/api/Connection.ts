import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

/**
 * Function that intercepts errors (401), and returns a promise with the error message
 * @type {Function} errorInterceptor
 */

const errorInterceptor = (error: AxiosError) => {
  if (error.message === "Network Error") {
    return Promise.reject(new Error("Network Error."));
  }

  if (error.response?.status === 401) {
    // Do something
  }

  return Promise.reject(error);
};

/**
 * Function that intercepts responses, and returns a promise with the response
 * @type {Function} responseInterceptor
 */
const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

/**
 * Class that creates a connection with the API
 * @class Connection
 */
class Connection {
  private api: AxiosInstance;

  public constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3333",
    });
  }

  /**
   * Function that returns a promise with the response of the API
   *  @public useApiResult
   *  @returns {Promise<[any, number]>} Promise with the response of the API
   */
  public useApiResult(
    request: Object,
    settings: Object | null
  ): Promise<[any, number]> {
    var api = this.api;

    if (settings != null) {
      api = axios.create(settings);
    }

    api.interceptors.response.use(
      (response) => responseInterceptor(response),
      (error) => errorInterceptor(error)
    );

    return new Promise((resolve, reject) => {
      try {
        api(request)
          .then((res) => {
            resolve(res.data);
          })
          .catch((res) => {
            reject(res);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
}

const connection = new Connection();

export default connection;
