import { UploadCfdisRequest } from "@/application/contracts/app/cfdis/UploadCfdisRequest";
import { CfdiDto } from "@/application/dtos/app/cfdis/CfdiDto";
import { CfdiXmlPdfDto } from "@/application/dtos/app/cfdis/CfdiXmlPdfDto";
import { ApiService, ApiServiceType } from "../../ApiService";

export class CfdiService extends ApiService {
  constructor() {
    super("Cfdi", ApiServiceType.TenantDatabase);
  }
  adminGetAll(): Promise<CfdiDto[]> {
    return super.getAll("Admin/GetAll");
  }
  getAll(): Promise<CfdiDto[]> {
    return super.getAll();
  }
  get(id: string): Promise<CfdiDto> {
    return super.get("Get", id);
  }
  create(data: CfdiDto): Promise<CfdiDto> {
    return super.post(data);
  }
  readCfdis(data: UploadCfdisRequest): Promise<CfdiXmlPdfDto[]> {
    return super.post(data, "ReadCfdis");
  }
  uploadCfdis(data: UploadCfdisRequest): Promise<any> {
    return super.post(data, "UploadCfdis");
  }
  download(id: string, fileType: string): Promise<CfdiDto> {
    return super.download(undefined, `Download/${id}/${fileType}`);
  }
  update(id: string, data: CfdiDto): Promise<CfdiDto> {
    return super.put(id, data);
  }
  delete(id: string): Promise<any> {
    return super.delete(id);
  }
  adminDelete(id: string): Promise<any> {
    return super.delete(id, "Admin/Delete");
  }
}
