import { AppWorkspaceEntityDto } from "../AppWorkspaceEntityDto";
import { TransactionDto } from "../transactions/TransactionDto";

export interface CfdiXmlPdfDto extends AppWorkspaceEntityDto {
  nombreArchivo: string;
  xml?: string;
  pdf?: string;
  transaction?: TransactionDto;
  error?: string;
}
