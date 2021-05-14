import { PeriodRequest } from "@/application/contracts/app/shared/PeriodRequest";
import { CustomerBranchDto } from "@/application/dtos/app/contacts/CustomerBranchDto";
import { ApiService, ApiServiceType } from "../../ApiService";

export class ClienteService extends ApiService {
  constructor() {
    super("Cliente", ApiServiceType.TenantDatabase);
  }
  adminGetAll(request: PeriodRequest): Promise<CustomerBranchDto[]> {
    return super.getAll(`Admin/GetAll?` + super.toQueryString(request));
  }
  getAllClientes(request: PeriodRequest): Promise<CustomerBranchDto[]> {
    return super.getAll(`GetAll?` + super.toQueryString(request));
  }
  get(id: string): Promise<CustomerBranchDto> {
    return super.get("Get", id);
  }
  create(data: CustomerBranchDto): Promise<CustomerBranchDto> {
    return super.post(data);
  }
  update(id: string, data: CustomerBranchDto): Promise<CustomerBranchDto> {
    return super.put(id, data);
  }
  delete(id: string): Promise<any> {
    return super.delete(id);
  }
  adminDelete(id: string): Promise<any> {
    return super.delete(id, "Admin/Delete");
  }
}
