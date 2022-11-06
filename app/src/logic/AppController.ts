import { Alert } from "react-native";
import { DataFetcher } from "../data-fetcher";
import { SyncResponse } from "../data-fetcher/core/SyncResponse";
import { PluginRepository } from "../settings/PluginRepository";
import { factoryDataMapper } from "./FactoryDataMapper";
import { StreamrDataMessagePublisher } from "./streamr/controllers/StreamrDataMessagePublisher";
import { DataMessage } from "./streamr/domain/DataMessage";
import { EStreamCategory } from "./streamr/domain/EStreamCategory";

class AppController {
  private readonly dataFetcher: DataFetcher;
  private repository!: PluginRepository;
  private viewListeners: { [key: string]: (data: any) => void };

  constructor() {
    // TODO: associate to "plugin key"
    this.dataFetcher = new DataFetcher();
    this.repository = new PluginRepository();
    this.viewListeners = {};
    this.setupPlugin("LastFM", false);
    this.setupPlugin("FakeBank", false);
    this.setupPlugin("ios-health", false);
  }

  private onNewData(pluginName: string, data: any[]) {
    const mapper = factoryDataMapper(pluginName);
    const mappedData = data.map(item => mapper.map(item));
    try {
      const cb = this.viewListeners[pluginName];
      cb?.call(
        null,
        this.dataFetcher.getDataForPlugin(pluginName).map(d => mapper.map(d)),
      );
      console.log("sell", this.canSellData(pluginName));
      if (this.canSellData(pluginName)) {
        void this.publishMany(
          mapper.getCategory(),
          data.map(d => mapper.map(d)),
        );
      }
    } catch (error) {
      console.log("err", error);
    }
  }

  private async setupPlugin(pluginName: string, canSellData: boolean) {
    this.dataFetcher
      .subscribe(pluginName)
      .on("sync", (response: SyncResponse<any>) =>
        this.onNewData(pluginName, response as any),
      );
    this.repository.enable(pluginName, canSellData);
    this.enable(pluginName, canSellData);
    this.dataFetcher.setupSync(pluginName, 2);
  }

  public async subscribePluginView(
    pluginName: string,
    setData: (a: any) => void,
  ) {
    console.log("subscribePluginView", pluginName);
    console.log("viewListeners", this.viewListeners[pluginName]);
    if (!this.viewListeners[pluginName]) {
      this.viewListeners[pluginName] = d => {
        console.log("onNewData");
        setData(d);
      };
    } else {
      await this.dataFetcher.sync(pluginName);
      setData(this.dataFetcher.getDataForPlugin(pluginName));
    }
  }

  public enable(pluginName: string, canSellData: boolean) {
    this.repository.enable(pluginName, canSellData);
    if (canSellData) {
      this.setupPlugin(pluginName, canSellData, () => {});
    }
  }

  public getProvider(pluginName: string) {
    return this.repository.findOne(pluginName);
  }

  public canSellData(pluginName: string) {
    return this.repository.findOne(pluginName).enabled;
  }

  public getAllPluginDataMapped(pluginName: string) {
    const mapper = factoryDataMapper(pluginName);
    return this.dataFetcher
      .getDataForPlugin(pluginName)
      .map(item => mapper.map(item));
  }

  public async publishMany(
    category: EStreamCategory,
    messages: any[] = [],
  ): Promise<void> {
    for (const message of messages) {
      await new StreamrDataMessagePublisher().publish(
        new DataMessage(category, message),
      );
    }
  }
}

export const appController = new AppController();
