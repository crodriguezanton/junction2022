import { BasePlugin } from "../src/data-fetcher/core/BasePlugin";
import prompt from "prompt";
import { DataFetcher } from "../src/data-fetcher/core/DataFetcher";
import { DataFetcherView } from "../src/data-fetcher/core/DataFetcherView";
import { Plugin } from "../src/data-fetcher/core/Plugin";

export class AppView implements DataFetcherView {
  private plugins: BasePlugin[];
  private app!: DataFetcher;
  constructor() {
    this.plugins = [];
  }

  init(app: DataFetcher) {
    this.app = app;
    this.app.addPlugin(new TestPlugin());
    this.app.on("start", () => {
      this.renderLaunch();
      this.renderSelection();
    });
  }
  setPlugins(plugins: BasePlugin[]) {
    this.plugins = plugins;
  }

  private renderLaunch() {
    console.log("Select a plugin to sync");
    this.plugins.forEach((plugin, i) => {
      console.log(`${i + 1}. ${plugin.name}`);
    });
  }

  private renderSelection() {
    //capture user input
    prompt.start();
    prompt.get(["plugin"], async (err, result) => {
      const plugin = this.plugins[parseInt(result.plugin.toString()) - 1];
      await this.renderSync(plugin);
    });
  }

  private async renderSync(plugin: BasePlugin) {
    console.log(`Syncing ${plugin.name}`);
    //register for sync events
    this.app.subscribe(plugin.name).on("sync", (syncData: unknown) => {
      console.log(JSON.stringify(syncData, null, 2));
    });
    await this.app.sync(plugin);
    this.app.setupSync(plugin.name, 2);
  }
}

class TestPlugin implements Plugin {
  name = "TestPlugin";
  private history: unknown[] = [];
  register(): Promise<void> {
    // TODO: Implement
    return Promise.resolve();
  }
  sync(): Promise<unknown[]> {
    const data = Math.random();
    this.history.push(data);
    return Promise.resolve([data]);
  }
  getData(): unknown[] {
    return this.history;
  }
}
