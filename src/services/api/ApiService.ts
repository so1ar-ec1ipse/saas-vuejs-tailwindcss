import server from "@/plugins/axios-helper";
import { AxiosRequestConfig, ResponseType } from "axios";

export class ApiService {
  tenantDatabase: boolean;
  controller: string;
  constructor(controller: string, type: ApiServiceType) {
    this.controller = controller + "/";
    this.tenantDatabase = type === ApiServiceType.TenantDatabase;
  }
  protected getAll(method: string = "GetAll", headers?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      server
        .get(this.controller + `${method}`, {
          masterDatabase: !this.tenantDatabase,
          headers,
        })
        .then((response) => {
          if (response.status === 204) {
            // Not found
            resolve([]);
          } else {
            resolve(response.data);
          }
        })
        .catch((error) => {
          console.log("error: " + JSON.stringify(error));
          reject(error);
        });
    });
  }
  protected getAllWithBody(
    body: any,
    method: string = "GetAll",
    headers?: any
  ): Promise<any[]> {
    return new Promise((resolve, reject) => {
      server
        .get(this.controller + `${method}`, {
          params: {
            body,
          },
          masterDatabase: !this.tenantDatabase,
          headers,
        })
        .then((response) => {
          if (response.status === 204) {
            // Not found
            resolve([]);
          } else {
            resolve(response.data);
          }
        })
        .catch((error) => {
          console.log("error: " + JSON.stringify(error));
          reject(error);
        });
    });
  }

  protected get(method: string, id: string = "", headers?: any): Promise<any> {
    if (id) {
      method += "/" + id;
    }
    return new Promise((resolve, reject) => {
      server
        .get(this.controller + method, {
          masterDatabase: !this.tenantDatabase,
          headers,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  protected post(
    data: any,
    method: string = "Create",
    headers?: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      server
        .post(this.controller + `${method}`, data, {
          masterDatabase: !this.tenantDatabase,
          headers,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  protected download(
    data: any,
    method: string = "Download",
    headers?: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      server
        .post(this.controller + `${method}`, data, {
          masterDatabase: !this.tenantDatabase,
          responseType: "blob",
          headers,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  protected upload(
    fileData: FormData,
    method: string = "Upload"
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      server
        .post(this.controller + `${method}`, fileData, {
          masterDatabase: !this.tenantDatabase,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  protected put(
    id: string,
    data: any,
    method: string = "Update",
    headers?: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      server
        .put(this.controller + `${method}/${id}`, data, {
          masterDatabase: !this.tenantDatabase,
          headers,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  protected putRaw(
    method: string = "Update"
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      server
        .put(this.controller + `${method}`, null, {
          masterDatabase: !this.tenantDatabase
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  protected delete(
    id: string,
    method: string = "Delete",
    headers?: any
  ): Promise<any> {
    if (id) {
      method += "/" + id;
    }
    return new Promise((resolve, reject) => {
      server
        .delete(this.controller + `${method}`, {
          masterDatabase: !this.tenantDatabase,
          headers,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  protected toQueryString(obj) {
    const parts: string[] = [];
    if (obj) {
      for (const property in obj) {
        if (property) {
          const value = obj[property];
          if (value != null) {
            const valueStr = encodeURIComponent(value);
            if (valueStr !== "") {
              parts.push(
                encodeURIComponent(property) + "=" + encodeURIComponent(value)
              );
            }
          }
        }
      }
    }
    return parts.join("&");
  }
}
export enum ApiServiceType {
  MasterDatabase,
  TenantDatabase,
}
