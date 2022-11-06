import { Cursor } from "./Cursor";

export interface SyncResponse<TData> {
  cursor?: Cursor;
  data: TData[];
}
