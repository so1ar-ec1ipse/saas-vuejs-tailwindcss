import { TransactionDto } from "@/application/dtos/app/transactions/TransactionDto";
import { ApiService, ApiServiceType } from "../../ApiService";

export class TransactionService extends ApiService {
  constructor() {
    super("Transaction", ApiServiceType.TenantDatabase);
  }
  adminGetAll(): Promise<TransactionDto[]> {
    return super.getAll("Admin/GetAll");
  }
  getAll(): Promise<TransactionDto[]> {
    return super.getAll();
  }
  get(id: string): Promise<TransactionDto> {
    return super.get("Get", id);
  }
  create(data: TransactionDto): Promise<TransactionDto> {
    return super.post(data);
  }
  update(id: string, data: TransactionDto): Promise<TransactionDto> {
    return super.put(id, data);
  }
  delete(id: string): Promise<any> {
    return super.delete(id);
  }
  adminDelete(id: string): Promise<any> {
    return super.delete(id, "Admin/Delete");
  }
}
