import { AppWorkspaceEntityDto } from "../AppWorkspaceEntityDto";
import { SupplierBranchDto } from "./SupplierBranchDto";

export interface SupplierDto extends AppWorkspaceEntityDto {
  name: string;
  taxId: string;
  branches: SupplierBranchDto[];
}
