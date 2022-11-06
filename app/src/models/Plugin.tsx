import { ImageSourcePropType } from "react-native";
import { EStreamCategory } from "../logic/streamr/domain/EStreamCategory";

interface Setting {
  text: string;
  enabled: boolean;
}

interface Texts {
  connect: string;
  monetize: string;
}

export type textKeys = keyof Texts;

export interface Plugin {
  name: string;
  key: string;
  logo: ImageSourcePropType;
  backgroundColor: string;
  enabled: boolean;
  category: EStreamCategory;
  texts: Texts;
  settings: Setting[];
  connectedByCurrentUser: boolean;
}
