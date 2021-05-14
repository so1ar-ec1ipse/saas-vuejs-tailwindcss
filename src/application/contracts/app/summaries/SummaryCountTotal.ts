import {TicketStatus} from "@/application/enums/app/transactions/TicketStatus";

export interface SummaryCountTotal {
  status: TicketStatus;
  count: number;
  total: number;
}
