import { EStreamCategory } from "./streamr/domain/EStreamCategory";

export interface LocationData {
  coordinate: string;
}

export class LocationDataMapper {
  public map(data: any): LocationData {
    return {
      coordinate: "TODO",
    };
  }

  public getCategory() {
    return EStreamCategory.ACCURATE_LOCATION;
  }
}
