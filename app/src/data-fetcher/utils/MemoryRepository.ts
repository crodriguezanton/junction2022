export class MemoryRepository<T> {
  private store: T[] = [];

  public getAll(): T[] {
    return this.store;
  }

  public add(value: T[]): void {
    this.store.push(...value);
  }
}
