import { WhoInvoices } from "@/application/enums/app/cfdis/WhoInvoices";
import { GetTransactionOrTicketFilter } from "@/application/enums/app/transactions/GetTransactionOrTicketFilter";
import { TicketGeneralStatus } from "@/application/enums/app/transactions/TicketGeneralStatus";
import { FilterRequest } from "../shared/FilterRequest";

export interface GetTransactionsOrTicketsRequest extends FilterRequest {
  tenantId?: string;
  filter: GetTransactionOrTicketFilter;
  ticketStatus?: TicketGeneralStatus;
  createdByUserId?: string;
  workspaceId?: string;
  customerId?: string;
  supplierId?: string;
  category?: string;
  projectId?: string;
  onlyPendingTickets: boolean;
  withImage: boolean;
  whoInvoices?: WhoInvoices;
}
