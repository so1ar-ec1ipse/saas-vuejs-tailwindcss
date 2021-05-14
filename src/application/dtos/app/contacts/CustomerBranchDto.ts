import { AppWorkspaceEntityDto } from "../AppWorkspaceEntityDto";
import { TransactionDto } from "../transactions/TransactionDto";
import { CustomerDto } from "./CustomerDto";

export interface CustomerBranchDto extends AppWorkspaceEntityDto {
  customerId: string;
  customer: CustomerDto;
  taxId: string;
  legalName: string;
  cfdiUse: string;
  transactionsCount: number;
  transactionsTotal: number;
  lastTransactionDate?: Date;
  transactions: TransactionDto[];
}
