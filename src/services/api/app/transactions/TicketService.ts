import { GetTicketsRequest } from "@/application/contracts/app/tickets/GetTicketsRequest";
import { TicketDto } from "@/application/dtos/app/transactions/TicketDto";
import { UpdateTicketInvoicedRequest } from "@/application/contracts/app/tickets/UpdateTicketInvoicedRequest";
import { UploadTicketsRequest } from "@/application/contracts/app/tickets/UploadTicketsRequest";
import { ApiService, ApiServiceType } from "../../ApiService";

export class TicketService extends ApiService {
  constructor() {
    super("Ticket", ApiServiceType.TenantDatabase);
  }
  adminGetAll(request: GetTicketsRequest): Promise<TicketDto[]> {
    return super.getAll(`Admin/GetAll?` + super.toQueryString(request));
  }
  getAllTickets(request: GetTicketsRequest): Promise<TicketDto[]> {
    return super.getAll(`GetAll?` + super.toQueryString(request));
  }
  adminGet(id: string): Promise<TicketDto> {
    return super.get("Admin/Get", id);
  }
  getTicket(id: string, admin: boolean): Promise<TicketDto> {
    if (admin) {
      return super.get("Admin/Get", id);
    }
    return super.get("Get", id);
  }
  create(data: TicketDto): Promise<TicketDto> {
    return super.post(data);
  }
  uploadTickets(data: UploadTicketsRequest): Promise<any> {
    return super.post(data, "UploadTickets");
  }
  adminReadTicket(id: string): Promise<TicketDto> {
    return super.post(undefined, "Admin/ReadTicket/" + id);
  }
  downloadAll(): Promise<any> {
    return super.download(null, `DownloadAll`);
  }
  uploadXmlAndPdf(fileData: FormData, ticket: TicketDto): Promise<TicketDto> {
    return super.post(fileData, "UploadXmlAndPdf/" + ticket.id);
  }
  uploadNewImage(fileData: FormData, ticket: TicketDto): Promise<TicketDto> {
    return super.post(fileData, "UploadNewImage/" + ticket.id);
  }
  uploadNewPdf(fileData: FormData, ticket: TicketDto): Promise<any> {
    return super.post(fileData, "UploadNewPdf/" + ticket.id);
  }
  uploadErrorImages(
    ticket: TicketDto,
    error: string,
    fileData?: FormData
  ): Promise<TicketDto> {
    return super.post(
      fileData,
      "UploadErrorImages/" + ticket.id + "?error=" + error
    );
  }
  update(id: string, data: TicketDto): Promise<TicketDto> {
    return super.put(id, data);
  }
  updateInvoiced(
    id: string,
    request: UpdateTicketInvoicedRequest
  ): Promise<TicketDto> {
    return super.put(id, request, "UpdateInvoiced");
  }
  delete(id: string): Promise<any> {
    return super.delete(id);
  }
  adminDelete(id: string): Promise<any> {
    return super.delete(id, "Admin/Delete");
  }
}
