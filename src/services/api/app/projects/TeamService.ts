import { ApiService, ApiServiceType } from "../../ApiService";
import {TeamDto} from "@/application/dtos/app/projects/TeamDto";

export class TeamService extends ApiService {
  constructor() {
    super("Team", ApiServiceType.TenantDatabase);
  }
  getAllTeams(active: boolean): Promise<TeamDto[]> {
    return new Promise((resolve, reject) => {
      super
        .getAll("GetAll/" + active)
        .then((response: TeamDto[]) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  get(id: string): Promise<TeamDto> {
    return super.get("Get", id);
  }
  create(data: TeamDto): Promise<TeamDto> {
    return super.post(data, "Create");
  }
  update(id: string, data: TeamDto): Promise<TeamDto> {
    return super.put(id, data, "Update");
  }
  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      super
        .delete(id, "Delete")
        .then((response: any) => {
          resolve(response);
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
