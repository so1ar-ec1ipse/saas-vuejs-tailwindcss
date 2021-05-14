import store from "@/store";
import { ApiService, ApiServiceType } from "@/services/api/ApiService";
import { ResourceDto } from "@/application/dtos/master/common/ResourceDto";

export class AdminService extends ApiService {
  constructor() {
    super("Admin", ApiServiceType.MasterDatabase);
  }
  scanTickets() {
    return this.post(null, "ScanTickets");
  }
  scanTenantTickets(tenantId: string) {
    return this.post(null, "ScanTenantTickets/" + tenantId);
  }
}
