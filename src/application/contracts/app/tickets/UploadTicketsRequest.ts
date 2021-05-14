import { TicketDto } from "@/application/dtos/app/transactions/TicketDto";

export interface UploadTicketsRequest {
  tickets: TicketDto[];
  scan: boolean;
  waitUntilAdded: boolean;
  rejectDuplicated: boolean;
  newProjectName?: string;
  selectedProjectId?: string;
}
