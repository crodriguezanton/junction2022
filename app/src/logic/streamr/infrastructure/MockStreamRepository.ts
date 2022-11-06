import {
  EStreamCategory,
  locationStreamCategories,
  musicStreamCategories,
} from "../domain/EStreamCategory";
import { Stream } from "../domain/Stream";

const streams = [
  new Stream(
    "0xD6c8F4952552B754B92951750674f2a3e01B8323/music-tracks",
    EStreamCategory.EXTENDED_MUSIC,
  ),
  new Stream(
    "0xD6c8F4952552B754B92951750674f2a3e01B8323/music-tracks",
    EStreamCategory.SOFT_MUSIC,
  ),
  new Stream(
    "0xD6c8F4952552B754B92951750674f2a3e01B8323/location",
    EStreamCategory.ACCURATE_LOCATION,
  ),
  new Stream(
    "0xD6c8F4952552B754B92951750674f2a3e01B8323/location",
    EStreamCategory.SOFT_LOCATION,
  ),
  new Stream(
    "0xD6c8F4952552B754B92951750674f2a3e01B8323/health",
    EStreamCategory.HEALTH,
  ),
  new Stream(
    "0xD6c8F4952552B754B92951750674f2a3e01B8323/banking",
    EStreamCategory.BANKING,
  ),
];

export class MockStreamRepository {
  public async findManyAvailable(): Promise<Stream[]> {
    return Promise.resolve(streams);
  }

  public async find(category: EStreamCategory): Promise<Stream> {
    const stream = streams.find(stream => stream.category === category);
    if (!stream) {
      // TODO: manage with NullObject pattern
      return {} as Stream;
    }
    return Promise.resolve(stream);
  }

  // TODO: criteria pattern
  public async findMusic(): Promise<Stream[]> {
    return Promise.resolve(
      streams.filter(stream => musicStreamCategories.includes(stream.category)),
    );
  }

  public async findLocation(): Promise<Stream[]> {
    return Promise.resolve(
      streams.filter(stream =>
        locationStreamCategories.includes(stream.category),
      ),
    );
  }
}
