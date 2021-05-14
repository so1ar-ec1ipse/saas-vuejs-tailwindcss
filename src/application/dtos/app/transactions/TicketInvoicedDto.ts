import { AppWorkspaceEntityDto } from "../AppWorkspaceEntityDto";
import { TicketDto } from "./TicketDto";

export interface TicketInvoicedDto extends AppWorkspaceEntityDto {
  ticketId: string;
  ticket: TicketDto;
  website: string;
  email: string;
  phone: string;
  comments: string;
}
