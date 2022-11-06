import { BankingDataMapper } from "./BankingDataMapper";
import { HealthDataMapper } from "./HealthDataMapper";
import { LocationDataMapper } from "./LocationDataMapper";
import { MusicDataMapper } from "./MusicDataMapper";

const musicDataMapperSingleton = new MusicDataMapper();
const locationDataMapperSingleton = new LocationDataMapper();
const healthDataMapperSingleton = new HealthDataMapper();
const bankingDataMapperSingleton = new BankingDataMapper();

export const factoryDataMapper = (pluginName: string): any => {
  switch (pluginName) {
    case "LastFM":
      return musicDataMapperSingleton;
    case "location-history":
      return locationDataMapperSingleton;
    case "ios-health":
      return healthDataMapperSingleton;
    case "FakeBank":
      return bankingDataMapperSingleton;
    default:
      throw new Error("plugin not supported");
  }
};
