export class HttpStreamrClientPublisher {
  public static async publish(streamId: string, message: any): Promise<void> {
    fetch(`http://10.84.110.242:7171/streams/${encodeURIComponent(streamId)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer MjZkZjA2Yzk4OWNmNGI5ZThkOTJiMGYxYThhZDBkYzQ",
      },
      body: JSON.stringify(message),
    })
      .then(console.log)
      .catch((err: any) => {
        console.log("Broker error, do not worry", err);
      });
  }
}
