import { TicketGeneralStatus } from "@/application/enums/app/transactions/TicketGeneralStatus";

export interface GetTicketsRequest {
  tenantId?: string;
  status?: TicketGeneralStatus;
}
