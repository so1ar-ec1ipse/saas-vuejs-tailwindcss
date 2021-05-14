import { AppEntityDto } from "../AppEntityDto";
import { WorkspaceUserDto } from "./WorkspaceUserDto";
import {ProjectDto} from "@/application/dtos/app/projects/ProjectDto";

export interface WorkspaceDto extends AppEntityDto {
  name: string;
  taxId: string;
  legalName: string;
  cfdiUse: string;
  addressStreet?: string;
  addressExterior?: string;
  addressInterior?: string;
  addressNeighborhood?: string;
  addressCity?: string;
  addressZip?: string;
  addressState?: string;
  addressCountry?: string;
  default?: boolean;
  ticketCount?: number;
  users: WorkspaceUserDto[];
  projects?: ProjectDto[];
}
