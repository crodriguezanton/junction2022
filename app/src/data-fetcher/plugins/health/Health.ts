import { BasePlugin } from "../../core/BasePlugin";
import { Privacy } from "../../core/Privacy";
import { SyncResponse } from "../../core/SyncResponse";
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from "react-native-health";

export class Health extends BasePlugin {
  constructor() {
    super("ios-health");
  }
  register(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  setupPrivacy(_privacy: Privacy): void {
    throw new Error("Method not implemented.");
  }
  authorize(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  protected internalSync(): Promise<SyncResponse<HealthValue>> {
    return new Promise((resolve, reject) => {
      const permissions = {
        permissions: {
          read: [
            AppleHealthKit.Constants.Permissions.Steps,
            AppleHealthKit.Constants.Permissions.HeartRate,
            AppleHealthKit.Constants.Permissions.SleepAnalysis,
          ],
        },
      } as HealthKitPermissions;

      AppleHealthKit.initHealthKit(permissions, (error: string) => {
        /* Called after we receive a response from the system */

        if (error) {
          console.log("[ERROR] Cannot grant permissions!");
        }

        /* Can now read or write to HealthKit */

        const options = {
          startDate: new Date(2022, 1, 1).toISOString(),
        };

        AppleHealthKit.getHeartRateSamples(
          options,
          (callbackError: string, results: HealthValue[]) => {
            if (callbackError) {
              console.log("[ERROR] Cannot get heart rate samples!");
              reject(callbackError);
            }

            console.log("Heart rate samples: ", results);
            resolve({ data: results.reverse() });
          },
        );
      });
    });
  }
  protected diff(
    _storedData: HealthValue[],
    _fetchedData: HealthValue[],
  ): { added: HealthValue[] } {
    return {
      added: _fetchedData.filter(
        ({ id }) => !_storedData.find(item => item.id === id),
      ),
    };
  }
}
