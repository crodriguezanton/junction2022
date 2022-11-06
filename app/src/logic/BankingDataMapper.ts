import { FakeBankData } from "../data-fetcher/plugins/fake-bank/FakeBankData";
import { EStreamCategory } from "./streamr/domain/EStreamCategory";

export interface BankingData {
  date: string;
  amount: number;
  currency: string;
  description: string;
  category: string;
  account: string;
}

export class BankingDataMapper {
  public map(data: FakeBankData): BankingData {
    return {
      date: data.date,
      amount: data.amount,
      currency: data.currency,
      description: data.description,
      category: data.category,
      account: data.account,
    };
  }

  public getCategory() {
    return EStreamCategory.BANKING;
  }
}
