import { LastFMTrack } from "../data-fetcher";
import { EStreamCategory } from "./streamr/domain/EStreamCategory";

export interface MusicData {
  album: string;
  artist: string;
  name: string;
  image?: string;
}

export class MusicDataMapper {
  public map(data: LastFMTrack): MusicData {
    const image = data.image.find(elem => elem.size === "large");
    return {
      album: "un album jeje",
      artist: data.artist["#text"],
      name: data.name,
      image: image ? image["#text"] : undefined,
    };
  }

  public getCategory() {
    return EStreamCategory.EXTENDED_MUSIC;
  }
}
