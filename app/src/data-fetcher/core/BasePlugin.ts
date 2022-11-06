import { MemoryRepository } from "../utils/MemoryRepository";
import { Cursor } from "./Cursor";
import { Plugin } from "./Plugin";
import { SyncResponse } from "./SyncResponse";

export abstract class BasePlugin<TData = unknown> implements Plugin<TData> {
  protected readonly repository = new MemoryRepository<TData>();
  constructor(public readonly name: string) {}
  abstract register(): Promise<void>;
  protected abstract internalSync(
    cursor?: Cursor,
  ): Promise<SyncResponse<TData>>;
  protected abstract diff(
    storedData: TData[],
    fetchedData: TData[],
  ): { added: TData[] };

  public async sync(cursor?: Cursor): Promise<TData[]> {
    const storedData = this.repository.getAll();
    const response = await this.internalSync(cursor);
    if (storedData) {
      const diff = this.diff(storedData, response.data);
      if (diff.added) {
        this.repository.add(diff.added);
        return diff.added;
      }
    }
    return [];
  }

  public getData(): TData[] {
    return this.repository.getAll();
  }
}
