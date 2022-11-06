import { Plugin } from "./Plugin";
import { DataFetcher } from "./DataFetcher";

export interface DataFetcherView {
  init(app: DataFetcher): void;
  setPlugins(plugins: Plugin[]): void;
}
