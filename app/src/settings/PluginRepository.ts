import { EStreamCategory } from "../logic/streamr/domain/EStreamCategory";
import { Plugin } from "../models/Plugin";

const allPlugins = [
  {
    name: "Spotify",
    key: "LastFM",
    backgroundColor: "rgb(29, 185, 84)",
    logo: require("../media/plugins/spotify.png"),
    enabled: true,
    category: EStreamCategory.EXTENDED_MUSIC,
    connectedByCurrentUser: true,
    texts: {
      connect: "247K data reclaims",
      monetize: "156K people monetizing",
    },
    settings: [
      { text: "Musical Genres", enabled: true },
      { text: "Specific Artists", enabled: true },
      { text: "Specific Songs", enabled: true },
    ],
  },
  {
    name: "Location History",
    key: "location-history",
    backgroundColor: "rgb(26, 110, 219)",
    logo: require("../media/plugins/location.png"),
    enabled: true,
    category: EStreamCategory.ACCURATE_LOCATION,
    connectedByCurrentUser: true,
    texts: {
      connect: "123K data reclaims",
      monetize: "85K people monetizing",
    },
    settings: [
      { text: "Home / Work Location", enabled: false },
      { text: "Navigation Routes", enabled: true },
      { text: "Visited Places", enabled: true },
    ],
  },
  {
    name: "iOS Health",
    key: "ios-health",
    backgroundColor: "rgb(255, 45, 85)",
    logo: require("../media/plugins/ios-health.png"),
    enabled: true,
    category: EStreamCategory.HEALTH,
    connectedByCurrentUser: true,
    texts: {
      connect: "89K data reclaims",
      monetize: "33K people monetizing",
    },
    settings: [
      { text: "Sleep metrics", enabled: true },
      { text: "Sports activity", enabled: true },
      { text: "Heart rate", enabled: true },
    ],
  },
  {
    name: "Amazon Alexa",
    key: "amazon-alexa",
    backgroundColor: "rgb(49, 196, 243)",
    logo: require("../media/plugins/alexa.png"),
    enabled: false,
    category: EStreamCategory.SOFT_LOCATION,
    connectedByCurrentUser: false,
    texts: {
      connect: "63K data reclaims",
      monetize: "12K people monetizing",
    },
    settings: [
      { text: "Voice queries", enabled: false },
      { text: "Apps connected", enabled: true },
      { text: "Shopping transactions", enabled: false },
    ],
  },
  {
    name: "ING",
    key: "FakeBank",
    backgroundColor: "#ff6200",
    logo: require("../media/plugins/ing.png"),
    enabled: false,
    category: EStreamCategory.BANKING,
    connectedByCurrentUser: true,
    texts: {
      connect: "58K data reclaims",
      monetize: "15K people monetizing",
    },
    settings: [
      { text: "Checking Account Transactions", enabled: true },
      { text: "Credit Card", enabled: false },
      { text: "Credit Score", enabled: false },
    ],
  },
];

export class PluginRepository {
  private readonly plugins = allPlugins;

  public findAll(): Plugin[] {
    return this.plugins;
  }

  public findHighlighted(): Plugin[] {
    return [
      this.plugins.find(plugin => plugin.key === "LastFM")!,
      this.plugins.find(plugin => plugin.key === "location-history")!,
      this.plugins.find(plugin => plugin.key === "amazon-alexa")!,
    ];
  }

  public findOne(key: string): Plugin {
    return this.plugins.find((plugin: Plugin) => plugin.key === key)!;
  }

  public enable(key: string, value: boolean): void {
    const plugin = this.plugins.find((plugin: Plugin) => plugin.key === key)!;
    plugin.enabled = value;
  }
}
