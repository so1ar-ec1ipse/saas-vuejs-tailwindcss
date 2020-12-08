import { TransactionDto } from '@/application/dtos/app/transactions/TransactionDto';
import { TransactionType } from '@/application/enum/app/TransactionType';
import { i18n } from '@/plugins/vue-i18n';

export const transactions: TransactionDto[] = [];

export const transactionCategories = [
  { id: 1, name: i18n.t("models.transaction.category") + " 1" },
  { id: 2, name: i18n.t("models.transaction.category") + " 2" },
];

for (let index = 1; index <= 10; index++) {
  const transaction: TransactionDto = {
    id: index,
    description: i18n.t("models.transaction.object") + " " + index,
    quantity: index,
    price: 1.5,
    amount: 0,
    date: new Date(),
    type: TransactionType.Expense,
    category:
      index % 2 === 0
        ? "Category 1"
        : "Category 2",
    image: ""
  };
  transaction.amount = transaction.quantity * transaction.price;
  transactions.push(transaction);
}

export const getExpensesResponse = {
  data: transactions,
};
