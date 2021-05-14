import { WhoInvoices } from "@/application/enums/app/cfdis/WhoInvoices";
import { SummaryCountTotal } from "./SummaryCountTotal";

export interface SummaryResponse {
  whoInvoices: WhoInvoices;
  monthlyTickets: number;
  ticketsRemaining: number;
  ticketsByStatus: SummaryCountTotal[];
  incomeTotal: number;
  expenseTotal: number;
  incomeCount: number;
  expenseCount: number;
}
