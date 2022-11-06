export interface LastFMTrackHistory {
  recenttracks: {
    track: Array<LastFMTrack>;
    "@attr": {
      user: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
}

export interface LastFMTrack {
  artist: {
    "#text": string;
  };
  image: {
    "#text": string;
    size: string;
  }[];
  name: string;
  date: {
    uts: string;
  };
}
