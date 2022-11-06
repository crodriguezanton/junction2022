/* eslint-disable no-dupe-class-members */
import { env } from "../../env";
import { LastFM } from "../plugins/aggregators/lastfm/LastFM";
import { FakeBank } from "../plugins/fake-bank/FakeBank";
import { DataFetcherView } from "./DataFetcherView";
import { SyncResponse } from "./SyncResponse";
import { Plugin } from "./Plugin";
import { Health } from "../plugins/health/Health";

interface PersonalIdentifiableInformation {
  name: string;
  email: string;
  phone: string;
}

type LifecycleEvent = "start";
type SyncEvent = "sync" | "synced" | "syncError";

export class DataFetcher {
  private plugins: Plugin[] = [];
  private view?: DataFetcherView;
  private lifeCycleListeners: Map<LifecycleEvent, (data?: unknown) => void>;
  private pluginListeners: Map<
    string,
    Map<SyncEvent, (data?: unknown) => void>
  >;
  constructor() {
    this.plugins = [new LastFM(env.lastFM), new FakeBank(), new Health()];
    this.pluginListeners = new Map();
    this.lifeCycleListeners = new Map();
  }

  addView(view: DataFetcherView) {
    this.view = view;
    this.view.init(this);
    this.view.setPlugins(this.plugins);
    return this;
  }

  setupSync(plugin: string, timeStepSeconds: number = 10) {
    const pluginInstance = this.plugins.find(p => p.name === plugin);
    setInterval(() => this.sync(pluginInstance!), timeStepSeconds * 1000);
  }

  addPlugin(plugin: Plugin) {
    this.plugins.push(plugin);
  }

  on(event: LifecycleEvent, callback: (data?: unknown) => void) {
    this.lifeCycleListeners.set(event, callback);
  }

  subscribe(plugin: string) {
    return {
      on: (
        event: SyncEvent,
        callback: (data: SyncResponse<unknown>) => void,
      ) => {
        const listeners = this.pluginListeners.get(plugin) || new Map();
        listeners.set(event, callback);
        this.pluginListeners.set(plugin, listeners);
        return () => {
          listeners.delete(event);
        };
      },
    };
  }

  createAccount(_pii: PersonalIdentifiableInformation) {
    // create account
  }

  launch() {
    this.lifeCycleListeners.get("start")?.();
  }

  async sync(plugin: string): Promise<void>;
  async sync(plugin: Plugin): Promise<void>;
  async sync(plugin: Plugin | string): Promise<void> {
    const plgn =
      typeof plugin === "string"
        ? this.plugins.find(p => p.name === plugin)
        : plugin;

    const newData = await plgn!.sync();
    if (newData.length) {
      this.emit(plgn!.name, "sync", newData);
    } else {
      console.log("No new data");
    }
  }

  getDataForPlugin(plugin: string) {
    // get data for plugin
    return this.plugins.find(p => p.name === plugin)!.getData();
  }

  private emit(plugin: string, event: SyncEvent, data: unknown) {
    const listeners = this.pluginListeners.get(plugin);
    listeners?.get(event)?.(data);
  }
}
