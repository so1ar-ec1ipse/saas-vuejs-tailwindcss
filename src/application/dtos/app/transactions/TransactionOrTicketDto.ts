import { TicketDto } from "@/application/dtos/app/transactions/TicketDto";
import { TransactionDto } from "@/application/dtos/app/transactions/TransactionDto";

export interface TransactionOrTicketDto {
  ticket: TicketDto;
  transaction: TransactionDto;
  createdAt: Date;
  modifiedAt?: Date;
  createdByUserName: string;
  createdByUserEmail: string;
  companyName: string;
  companyLegalName: string;
  companyTaxId: string;
  issuerTaxId: string;
  issuerLegalName: string;
  receiverTaxId: string;
  receiverLegalName: string;
}
