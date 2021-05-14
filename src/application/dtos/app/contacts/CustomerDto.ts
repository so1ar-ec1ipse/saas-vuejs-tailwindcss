import { AppWorkspaceEntityDto } from "../AppWorkspaceEntityDto";
import { CustomerBranchDto } from "./CustomerBranchDto";

export interface CustomerDto extends AppWorkspaceEntityDto {
  name: string;
  taxId: string;
  branches: CustomerBranchDto[];
}
