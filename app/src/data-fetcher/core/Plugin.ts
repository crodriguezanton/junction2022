import { Cursor } from "./Cursor";

export interface Plugin<TData = unknown> {
  name: string;
  register(): Promise<void>;
  sync(cursor?: Cursor): Promise<TData[]>;
  getData(): TData[];
}
