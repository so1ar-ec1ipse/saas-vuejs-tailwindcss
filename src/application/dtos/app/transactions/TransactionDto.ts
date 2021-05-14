import { AppWorkspaceEntityDto } from "../AppWorkspaceEntityDto";
import { TransactionDetailDto } from "./TransactionDetailDto";
import { TicketDto } from "@/application/dtos/app/transactions/TicketDto";
import { CfdiDto } from "@/application/dtos/app/cfdis/CfdiDto";
import { WorkspaceDto } from "../workspaces/WorkspaceDto";
import { SupplierBranchDto } from "../contacts/SupplierBranchDto";
import {TransactionType} from "@/application/enums/app/transactions/TransactionType";
import {CustomerBranchDto} from "@/application/dtos/app/contacts/CustomerBranchDto";
import {ProjectDto} from "@/application/dtos/app/projects/ProjectDto";

export interface TransactionDto extends AppWorkspaceEntityDto {
  workspaceId: string;
  workspace: WorkspaceDto;
  ticketId: string | null;
  ticket: TicketDto;
  type: TransactionType;
  currency: string;
  date: string;
  category: string;
  subtotal: number;
  discount: number;
  taxes: number;
  total: number;
  cfdiId: string | null;
  cfdi: CfdiDto;
  customerBranchId: string | null;
  customerBranch: CustomerBranchDto;
  supplierBranchId: string | null;
  supplierBranch: SupplierBranchDto;
  details: TransactionDetailDto[];
  categories?: string[];
  projectId?: string | null;
  project?: ProjectDto;
}
