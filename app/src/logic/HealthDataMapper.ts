import moment from "moment";
import { HealthValue } from "react-native-health";
import { EStreamCategory } from "./streamr/domain/EStreamCategory";

export interface HealthData {
  timestamp: moment.Moment;
  heartRate: number;
}

export class HealthDataMapper {
  public map(data: HealthValue): HealthData {
    return {
      timestamp: moment(data.startDate),
      heartRate: data.value,
    };
  }

  public getCategory() {
    return EStreamCategory.HEALTH;
  }
}
