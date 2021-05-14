import store from "@/store";
import { ApiService, ApiServiceType } from "@/services/api/ApiService";
import { ResourceDto } from "@/application/dtos/master/common/ResourceDto";

export class ResourceService extends ApiService {
  constructor() {
    super("Resource", ApiServiceType.MasterDatabase);
  }
  getAll(): Promise<ResourceDto[]> {
    return super.getAll();
  }
  getMyResources(): Promise<ResourceDto[]> {
    return super.getAll("GetMyResources");
  }
  download(id: string): Promise<any> {
    return super.download(null, `Download/${id}`);
  }
  create(data: ResourceDto): Promise<ResourceDto> {
    return super.post(data);
  }
  upload(fileData: FormData, id: string): Promise<any> {
    return super.upload(fileData, `Upload/${id}`);
  }
  update(id: string, data: ResourceDto): Promise<ResourceDto> {
    return super.put(id, data);
  }
  delete(id: string) {
    return super.delete(id);
  }
}
