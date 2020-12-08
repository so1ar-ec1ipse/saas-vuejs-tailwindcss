import { TransactionDto } from "@/application/dtos/app/transactions/TransactionDto";
import { ApiService, ApiServiceType } from "../../ApiService";
import { transactions } from './FakeTransactionServer';

export class TransactionService extends ApiService {
  constructor() {
    super("Transaction", ApiServiceType.TenantDatabase);
  }
  adminGetAll(): Promise<TransactionDto[]> {
    return Promise.resolve(transactions);
    // return super.getAll("Admin/GetAll");
  }
  getAll(): Promise<TransactionDto[]> {
    return Promise.resolve(transactions);
    // return super.getAll();
  }
  get(id: string): Promise<TransactionDto> {
    return Promise.resolve(transactions[0]);
    // return super.get("Get", id);
  }
  create(data: TransactionDto): Promise<TransactionDto> {
    return Promise.resolve(transactions[0]);
    // return super.post(data);
  }
  update(id: string, data: TransactionDto): Promise<TransactionDto> {
    return Promise.resolve(transactions[0]);
    // return super.put(id, data);
  }
  delete(id: string): Promise<any> {
    return Promise.resolve(true);
    // return super.delete(id);
  }
  adminDelete(id: string): Promise<any> {
    return Promise.resolve(true);
    // return super.delete(id, "Admin/Delete");
  }
}
