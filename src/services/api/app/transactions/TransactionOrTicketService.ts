import { ApiService, ApiServiceType } from "../../ApiService";
import {GetTransactionsOrTicketsRequest} from "@/application/contracts/app/tickets/GetTransactionsOrTicketsRequest";
import {TransactionOrTicketQueryResult} from "@/application/contracts/app/transactions/TransactionOrTicketQueryResult";

export class TransactionOrTicketService extends ApiService {
  constructor() {
    super("TransactionOrTicket", ApiServiceType.TenantDatabase);
  }
  adminGetAllTransactionsOrTickets(request: GetTransactionsOrTicketsRequest): Promise<TransactionOrTicketQueryResult> {
    return super.getAll(`Admin/GetAll?` + super.toQueryString(request));
  }
  getAllTransactionsOrTickets(
    request: GetTransactionsOrTicketsRequest,
    admin: boolean
  ): Promise<TransactionOrTicketQueryResult> {
    if (admin) {
      return super.getAll(`Admin/GetAll?` + super.toQueryString(request));
    }
    return super.getAll(`GetAll?` + super.toQueryString(request));
  }
}
