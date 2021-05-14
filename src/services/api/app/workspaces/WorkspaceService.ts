import { ApiService, ApiServiceType } from "../../ApiService";
import store from "@/store";
import {WorkspaceUserDto} from "@/application/dtos/app/workspaces/WorkspaceUserDto";
import {WorkspaceDto} from "@/application/dtos/app/workspaces/WorkspaceDto";

export class WorkspaceService extends ApiService {
  constructor() {
    super("Workspace", ApiServiceType.TenantDatabase);
  }
  adminGetAll(): Promise<WorkspaceDto[]> {
    return super.getAll(`Admin/GetAll`);
  }
  getAllWorkspaces(saveInStore: boolean = false): Promise<WorkspaceDto[]> {
    return new Promise((resolve, reject) => {
      super
        .getAll("GetAll")
        .then((response: WorkspaceDto[]) => {
          resolve(JSON.parse(JSON.stringify(response)));
          if (saveInStore) {
            store.commit("tenant/workspaces", response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  get(id: string): Promise<WorkspaceDto> {
    return super.get("Get", id);
  }
  create(data: WorkspaceDto): Promise<WorkspaceDto> {
    return super.post(data);
  }
  addUser(id: string, data: WorkspaceUserDto): Promise<WorkspaceUserDto> {
    return super.post(data, "AddUser/" + id);
  }
  update(id: string, data: WorkspaceDto): Promise<WorkspaceDto> {
    return super.put(id, data);
  }
  removeUser(id: string): Promise<any> {
    return super.putRaw("RemoveUser/" + id);
  }
  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      super
        .delete(id)
        .then((response: any) => {
          resolve(this.getAll());
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  adminDelete(id: string): Promise<any> {
    return super.delete(id, "Admin/Delete");
  }
}
