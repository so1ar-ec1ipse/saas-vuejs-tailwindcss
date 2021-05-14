import { ApiService, ApiServiceType } from "../../ApiService";
import { SummaryResponse } from "@/application/contracts/app/summaries/SummaryResponse";
import { PeriodRequest } from "@/application/contracts/app/shared/PeriodRequest";
import { SummaryCountTotalResponse } from "@/application/contracts/app/summaries/SummaryCountTotalResponse";
import { SummaryCountTotalType } from "@/application/enums/app/transactions/SummaryCountTotalType";

export class DashboardService extends ApiService {
  constructor() {
    super("Dashboard", ApiServiceType.TenantDatabase);
  }
  adminGetSummaryCountTotal(
      type: SummaryCountTotalType,
      tenantId: string,
      periodRequest: PeriodRequest
  ): Promise<SummaryCountTotalResponse[]> {
    return super.get(
        `/Admin/GetSummaryCountTotal/${type}/${tenantId}?` +
        super.toQueryString(periodRequest)
    );
  }
  getSummary(periodRequest: PeriodRequest): Promise<SummaryResponse> {
    return super.get(`GetSummary?` + super.toQueryString(periodRequest));
  }
  getSummaryCountTotal(
    type: SummaryCountTotalType,
    periodRequest?: PeriodRequest,
    id?: string
  ): Promise<SummaryCountTotalResponse[]> {
    let query = super.toQueryString(periodRequest);
    if (id) {
      query += "&id=" + id;
    }
    return super.get(
      `GetSummaryCountTotal/${type}?` + query
    );
  }
}
