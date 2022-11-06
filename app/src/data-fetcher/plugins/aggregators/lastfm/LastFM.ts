import { BasePlugin } from "../../../core/BasePlugin";
import { SyncResponse } from "../../../core/SyncResponse";
import { request } from "../../../utils/HTTPRequester";
import { LastFMLRegistrationData } from "./LastFMLRegistrationData";
import { LastFMTrack, LastFMTrackHistory } from "./LastFMTrackHistory";

export class LastFM extends BasePlugin<LastFMTrack> {
  private static URL = "https://ws.audioscrobbler.com/2.0/";
  constructor(private readonly data: LastFMLRegistrationData) {
    super("LastFM");
  }

  register(): Promise<void> {
    // TODO: Implement
    return Promise.resolve();
  }

  protected async internalSync(): Promise<SyncResponse<LastFMTrack>> {
    const data = await this.getTrackHistory();
    return { data };
  }

  protected diff(
    storedData: LastFMTrack[],
    fetchedData: LastFMTrack[],
  ): { added: LastFMTrack[] } {
    const added = fetchedData.filter(
      d => !storedData.some(s => s.name === d.name),
    );

    return { added };
  }

  private async getTrackHistory(): Promise<LastFMTrack[]> {
    const { username, apiKey } = this.data;
    const method = "user.getrecenttracks";
    const rawData = await request<LastFMTrackHistory>(LastFM.URL, {
      method: "get",
      params: { method, username, api_key: apiKey },
    });
    return this.filter(rawData);
  }

  private filter(rawData: LastFMTrackHistory): LastFMTrack[] {
    return rawData.recenttracks.track;
  }
}
