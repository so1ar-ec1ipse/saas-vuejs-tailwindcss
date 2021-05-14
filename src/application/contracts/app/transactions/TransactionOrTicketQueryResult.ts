import { TransactionOrTicketDto } from "@/application/dtos/app/transactions/TransactionOrTicketDto";
import { QueryResult } from "../../QueryResult";
import { SummaryResponse } from "../summaries/SummaryResponse";

export interface TransactionOrTicketQueryResult extends QueryResult<TransactionOrTicketDto> {
  summary?: SummaryResponse;
}
