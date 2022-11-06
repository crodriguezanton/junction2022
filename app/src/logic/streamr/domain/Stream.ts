import { EStreamCategory } from "./EStreamCategory";

export class Stream {
  constructor(
    public readonly id: string,
    public readonly category: EStreamCategory,
  ) {}
}
