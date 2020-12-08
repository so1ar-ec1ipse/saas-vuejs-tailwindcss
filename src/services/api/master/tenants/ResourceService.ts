import store from "@/store";
import {ApiService, ApiServiceType} from "@/services/api/ApiService";
import {ResourceDto} from "@/application/dtos/master/common/ResourceDto";
import { resources } from '../users/FakeResourcesServer';

export class ResourceService extends ApiService {
  constructor() {
    super("Resource", ApiServiceType.MasterDatabase);
  }
  getAll(): Promise<ResourceDto[]> {
    return Promise.resolve(resources);
    // return super.getAll();
  }
  getMyResources(): Promise<ResourceDto[]> {
    return Promise.resolve(resources);
    // return super.getAll("GetMyResources");
  }
  download(id: string): Promise<any> {
    return Promise.resolve({});
    // return super.download(null, `Download/${id}`);
  }
  create(data: ResourceDto): Promise<ResourceDto> {
    return Promise.resolve(resources[0]);
    // return super.post(data);
  }
  upload(fileData: FormData, id: string): Promise<any> {
    return Promise.resolve(true);
    // return super.upload(fileData, `Upload/${id}`);
  }
  update(id: string, data: ResourceDto): Promise<ResourceDto> {
    return Promise.resolve(resources[0]);
    // return super.put(id, data);return Promise.resolve({});
  }
  delete(id: string) {
    return Promise.resolve(true);
  }
}
