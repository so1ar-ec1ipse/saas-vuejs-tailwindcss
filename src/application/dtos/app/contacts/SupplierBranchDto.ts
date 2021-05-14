import { AppWorkspaceEntityDto } from "../AppWorkspaceEntityDto";
import { TransactionDto } from "../transactions/TransactionDto";
import { SupplierDto } from "./SupplierDto";

export interface SupplierBranchDto extends AppWorkspaceEntityDto {
  supplierId: string;
  supplier: SupplierDto;
  taxId: string;
  legalName: string;
  taxSystem: string;
  website: string;
  user: string;
  password: string;
  comments: string;
  transactionsCount: number;
  transactionsTotal: number;
  lastTransactionDate?: Date;
  transactions: TransactionDto[];
}
