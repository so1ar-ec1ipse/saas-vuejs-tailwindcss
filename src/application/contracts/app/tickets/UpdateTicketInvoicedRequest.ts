import { TicketStatus } from "@/application/enums/app/transactions/TicketStatus";

export interface UpdateTicketInvoicedRequest {
  status: TicketStatus;
  website?: string;
  email?: string;
  phone?: string;
  comments?: string;
}
