import { BasePlugin } from "../../core/BasePlugin";
import { Privacy } from "../../core/Privacy";
import { SyncResponse } from "../../core/SyncResponse";

export class FakeBank extends BasePlugin {
  constructor() {
    super("FakeBank");
  }
  register(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  setupPrivacy(_privacy: Privacy): void {
    throw new Error("Method not implemented.");
  }
  authorize(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  protected internalSync(): Promise<SyncResponse<FakeTrans>> {
    return Promise.resolve({ data: fakeTransactions });
  }
  protected diff(
    _storedData: FakeTrans[],
    _fetchedData: FakeTrans[],
  ): { added: FakeTrans[] } {
    const added = _fetchedData.filter(
      d => !_storedData.some(s => s.id === d.id),
    );

    return { added };
  }
}

interface FakeTrans {
  id: string;
  date: string;
  amount: number;
  currency: string;
  description: string;
  category: string;
  account: string;
};

const fakeTransactions: FakeTrans[] = [
  {
    id: "1",
    date: "2020-01-01",
    amount: 2000,
    currency: "EUR",
    description: "Salary",
    category: "Salary",
    account: "Salary account",
  },
  {
    id: "2",
    date: "2020-01-02",
    amount: -3,
    currency: "EUR",
    description: "Coffee",
    category: "Food",
    account: "Salary account",
  },
  {
    id: "3",
    date: "2020-01-03",
    amount: -30,
    currency: "EUR",
    description: "Meal at some restaurant",
    category: "Food",
    account: "Salary account",
  },
  {
    id: "4",
    date: "2020-01-04",
    amount: -15.99,
    currency: "EUR",
    description: "Spotify subscription",
    category: "Internet",
    account: "Salary account",
  },
];
