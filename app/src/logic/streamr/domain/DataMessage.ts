import { EStreamCategory } from "./EStreamCategory";

export class DataMessage {
  constructor(
    public readonly streamCategory: EStreamCategory,
    public readonly message: any,
  ) {}
}
