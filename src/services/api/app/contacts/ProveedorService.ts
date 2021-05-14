import { PeriodRequest } from "@/application/contracts/app/shared/PeriodRequest";
import { SupplierBranchDto } from "@/application/dtos/app/contacts/SupplierBranchDto";
import { ApiService, ApiServiceType } from "../../ApiService";

export class ProveedorService extends ApiService {
  constructor() {
    super("Proveedor", ApiServiceType.TenantDatabase);
  }
  adminGetAll(request: PeriodRequest): Promise<SupplierBranchDto[]> {
    return super.getAll(`Admin/GetAll?` + super.toQueryString(request));
  }
  getAllProveedores(request: PeriodRequest): Promise<SupplierBranchDto[]> {
    return super.getAll(`GetAll?` + super.toQueryString(request));
  }
  get(id: string): Promise<SupplierBranchDto> {
    return super.get("Get", id);
  }
  create(data: SupplierBranchDto): Promise<SupplierBranchDto> {
    return super.post(data);
  }
  update(id: string, data: SupplierBranchDto): Promise<SupplierBranchDto> {
    return super.put(id, data);
  }
  delete(id: string): Promise<any> {
    return super.delete(id);
  }
  adminDelete(id: string): Promise<any> {
    return super.delete(id, "Admin/Delete");
  }
}
