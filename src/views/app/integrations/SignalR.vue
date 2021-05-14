<template>
  <div>
    <div>
      <form @submit.prevent>
        <div class="shadow overflow-hidden sm:rounded-sm">
          <div class="px-4 py-5 bg-white sm:p-6">
            <div class="grid grid-cols-6 gap-2">
              <div class="col-span-6 sm:col-span-2">
                <label
                  for="passwordCurrent"
                  class="block text-sm font-medium leading-5 text-gray-700"
                  >User</label
                >
                <input
                  required
                  :disabled="true"
                  v-model="userName"
                  class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
              <div class="col-span-6 sm:col-span-4">
                <label
                  for="password"
                  class="block text-sm font-medium leading-5 text-gray-700"
                  >Message</label
                >
                <input
                  ref="message"
                  v-model="message"
                  class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              v-on:click="submitCard"
              class="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-sm text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out"
            >
              {{ $t("shared.send") }}
            </button>
          </div>
        </div>
      </form>

      <div
        class="mt-3"
        v-for="(item, index) in messages"
        v-bind:key="index + 'itemMessage'"
      >
        <div class>
          <b>{{ item.user }}:</b>
          {{ item.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
import { SignalService } from "../../../plugins/SignalR";
import * as signalR from "@aspnet/signalr";

@Component({
  components: { SuccessModal, ErrorModal, ConfirmModal },
})
export default class SignalR extends BaseComponent {
  $refs!: {
    message: HTMLInputElement;
  };
  userName: string = this.$store.state.account.user.email;
  message: string = "";
  messages: object[] = [];
  connection!: signalR.HubConnection;
  hubUrl!: string;
  created() {
    this.hubUrl = process.env.VUE_APP_SERVER_URL + "globalHub";
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl)
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.connection
      .start()
      .then((response) => {
        this.joinGroup();
        return true;
      })
      .catch((err) => {
        return console.error(
          "Could not connect to Hub '" + this.hubUrl + "':" + err.toString()
        );
      });
  }
  mounted() {
    const self = this;
    this.connection.on("ReceiveMessage", (user, message) => {
      self.messages.push({ user, message });
    });
  }
  async joinGroup() {
    this.connection
      .invoke("JoinGroup", this.$store.state.tenant.current?.id)
      .then((response) => {
        console.log("JoinGroup Success:" + JSON.stringify(response));
      })
      .catch((err) => {
        console.log("JoinGroup Error:" + JSON.stringify(err));
      });
  }
  submitCard() {
    if (this.message) {
      this.connection
        .invoke(
          "SendMessage",
          this.$store.state.tenant.current.id,
          this.userName,
          this.message
        )
        .then((response) => {
          this.message = "";
          this.$refs.message.focus();
        })
        .catch((err) => {
          return console.error(err.toString());
        });
    }
  }
}
</script>
