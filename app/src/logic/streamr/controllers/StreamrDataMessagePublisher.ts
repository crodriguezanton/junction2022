import { DataMessage } from "../domain/DataMessage";
import { MockStreamRepository } from "../infrastructure/MockStreamRepository";
import { HttpStreamrClientPublisher } from "../infrastructure/HttpStreamrClientPublisher";

export class StreamrDataMessagePublisher {
  public async publish(dataMessage: DataMessage): Promise<void> {
    const stream = await new MockStreamRepository().find(dataMessage.streamCategory);
    await HttpStreamrClientPublisher.publish(stream.id, dataMessage.message)
  }
}
