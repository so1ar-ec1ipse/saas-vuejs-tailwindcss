import * as signalR from "@aspnet/signalr";
import { HubConnectionState } from "@aspnet/signalr";
import store from "../store";

class SignalR {
  private connection!: signalR.HubConnection;
  private hubUrl!: string;
  public async startConnection(): Promise<boolean> {
    try {
      // this.hubUrl = process.env.VUE_APP_SERVER_URL + "globalHub";
      // this.connection = new signalR.HubConnectionBuilder()
      //   .withUrl(this.hubUrl)
      //   .configureLogging(signalR.LogLevel.Information)
      //   .build();
      // await this.connection
      //   .start()
      //   .then((response) => {
      //     this.joinGroup();
      //     return true;
      //   })
      //   .catch((err) => {
      //     return console.error(
      //       "Could not connect to Hub '" + this.hubUrl + "':" + err.toString()
      //     );
      //   });
    } catch (error) {
      console.log("signal error: " + error);
    }
    return false;
  }
  public closeConnection() {
    try {
      // if (
      //   this.connection &&
      //   this.connection.state === HubConnectionState.Connected
      // ) {
      //   this.connection.invoke("LeaveGroup", store.state.tenant.current?.id);
      //   // .then((response) => {
      //   //   console.log("LeaveGroup Success:" + JSON.stringify(response));
      //   // })
      //   // .catch((err) => {
      //   //   console.log("LeaveGroup Error:" + JSON.stringify(err));
      //   // });
      // }
    } catch (error) {
      console.log("signal error: " + error);
    }
  }
  public async on(
    methodName: string,
    newMethod: (...args: any[]) => void
  ): Promise<void> {
    if (!this.connection) {
      await this.startConnection();
    }
    if (this.connection) {
      this.connection.on(methodName, newMethod);
    }
  }
  public async invoke<T = any>(methodName: string, ...args: any[]): Promise<T> {
    if (this.connection === null) {
      await this.startConnection();
    }
    return new Promise((resolve, reject) => {
      if (this.connection) {
        this.connection
          .invoke(methodName, args)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  }
  private async joinGroup() {
    if (this.connection && store.state.tenant?.current) {
      await this.connection.invoke("JoinGroup", store.state.tenant.current?.id);
      // .then((response) => {
      //   console.log("JoinGroup Success:" + JSON.stringify(response));
      // })
      // .catch((err) => {
      //   console.log("JoinGroup Error:" + JSON.stringify(err));
      // });
    }
  }
}
export const SignalService = new SignalR();
