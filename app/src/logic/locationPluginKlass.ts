import { LatLng, UserLocationChangeEvent } from "react-native-maps";
import { BasePlugin } from "../data-fetcher/core/BasePlugin";
import { SyncResponse } from "../data-fetcher/core/SyncResponse";

export interface LocationAPI {
  onLocationChange: (callback: (e: UserLocationChangeEvent) => void) => void;
}

export const locationPluginKlass = (locationAPI: LocationAPI) => {
  return class LocationPlugin extends BasePlugin<LatLng> {
    register(): Promise<void> {
      throw new Error("Method not implemented.");
    }

    private readonly cache: LatLng[];
    constructor() {
      super("Location");
      this.cache = [];
      locationAPI.onLocationChange(this.addToCache.bind(this));
    }

    protected internalSync(): Promise<SyncResponse<LatLng>> {
      return Promise.resolve({ data: this.cache.splice(0) });
    }
    protected diff(
      _storedData: LatLng[],
      fetchedData: LatLng[],
    ): { added: LatLng[] } {
      return { added: fetchedData };
    }

    private addToCache(e: UserLocationChangeEvent) {
      if (e.nativeEvent.coordinate) {
        this.cache.push(e.nativeEvent.coordinate);
      }
    }
  };
};
