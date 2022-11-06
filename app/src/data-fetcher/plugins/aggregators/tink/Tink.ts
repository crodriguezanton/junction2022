import { BasePlugin } from "../../../core/BasePlugin";
import { Cursor } from "../../../core/Cursor";
import { Privacy } from "../../../core/Privacy";
import { SyncResponse } from "../../../core/SyncResponse";

export class Tink extends BasePlugin {
  constructor() {
    super("Tink");
  }
  public sync(_cursor?: Cursor | undefined): Promise<unknown[]> {
    throw new Error("Method not implemented.");
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
  internalSync(): Promise<SyncResponse<unknown>> {
    throw new Error("Method not implemented.");
  }
  protected diff(
    _storedData: unknown[],
    _fetchedData: unknown[],
  ): { added: unknown[] } {
    throw new Error("Method not implemented.");
  }
}
