import { AppWorkspaceEntityDto } from '../AppWorkspaceEntityDto';
import { TransactionDto } from './TransactionDto';

export interface TransactionDetailDto extends AppWorkspaceEntityDto {
    transactionId: string;
    transaction: TransactionDto;
    description: string;
    quantity: number;
    price: number;
    subtotal: number;
    taxes: number;
    total: number;
    category: string;
}
