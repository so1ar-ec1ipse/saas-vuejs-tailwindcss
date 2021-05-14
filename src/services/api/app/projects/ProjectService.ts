import { ApiService, ApiServiceType } from "../../ApiService";
import { SummaryCountTotalResponse } from "@/application/contracts/app/summaries/SummaryCountTotalResponse";
import { ProjectStatus } from "@/application/enums/app/projects/ProjectStatus";
import { Colors } from "@/application/enums/app/common/Colors";
import {ProjectDto} from "@/application/dtos/app/projects/ProjectDto";
import {ProjectMemberDto} from "@/application/dtos/app/projects/ProjectMemberDto";

export class ProjectService extends ApiService {
  constructor() {
    super("Project", ApiServiceType.TenantDatabase);
  }
  getAllProjects(activos: boolean): Promise<ProjectDto[]> {
    return new Promise((resolve, reject) => {
      super
        .getAll("GetAll/" + activos)
        .then((response: ProjectDto[]) => {
          resolve(response);
          //   store.commit("tenant/proyectos", response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  getSummary(id: string): Promise<SummaryCountTotalResponse> {
    return super.get("GetSummary", id);
  }
  get(id: string): Promise<ProjectDto> {
    return super.get("Get", id);
  }
  create(data: ProjectDto): Promise<ProjectDto> {
    return super.post(data, "Create");
  }
  addMember(id: string, data: any): Promise<ProjectMemberDto> {
    return super.post(data, "AddMember/" + id);
  }
  update(id: string, data: ProjectDto): Promise<ProjectDto> {
    return super.put(id, data, "Update");
  }
  updateStatusAndColor(id: string, status: ProjectStatus, color: Colors): Promise<ProjectDto> {
    return super.putRaw(`UpdateStatusAndColor/${id}?color=${color}&status=${status}`);
  }
  removeMember(id: string): Promise<any> {
    return super.putRaw("RemoveMember/" + id);
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
