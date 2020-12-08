import { TransactionType } from "@/application/enum/app/TransactionType";
import { AppEntityDto } from "../AppEntityDto";

export interface TransactionDto extends AppEntityDto {
  type: TransactionType;
  description: string;
  quantity: number;
  price: number;
  amount: number;
  date: Date;
  category: string;
  image: string;
}
