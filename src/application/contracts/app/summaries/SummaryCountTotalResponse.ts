import {TicketDto} from "@/application/dtos/app/transactions/TicketDto";
import {TransactionDto} from "@/application/dtos/app/transactions/TransactionDto";
import { SummaryCountTotalType } from "@/application/enums/app/transactions/SummaryCountTotalType";

export interface SummaryCountTotalResponse {
  type: SummaryCountTotalType;
  name: string;
  description: string;
  color?: string;
  ticketsTotal: number;
  ticketsCount: number;
  expenseTotal: number;
  expenseCount: number;
  incomeTotal: number;
  incomeCount: number;
  incomePercentageTotal: number;
  incomePercentageCount: number;
  expensePercentageTotal: number;
  expensePercentageCount: number;
  lastTicket?: TicketDto;
  lastTransaction?: TransactionDto;
  transactions?: TransactionDto[];
  tickets?: TicketDto[];
  transactionDetails?: TransactionDto[];
  id?: string;
}
