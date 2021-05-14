import { Module } from "vuex";
import { RootState, TicketsState } from "@/types/stateTypes";
import { WorkspaceDto } from "@/application/dtos/app/workspaces/WorkspaceDto";
import { TicketDto } from "@/application/dtos/app/transactions/TicketDto";

export const state: TicketsState = {
  email: "",
  workspaces: [],
  tickets: [],
};

export const tickets: Module<TicketsState, RootState> = {
  namespaced: true,
  state,
  mutations: {
    reset(state, payload: string) {
      state.email = "";
      state.workspaces = [];
      state.tickets = [];
    },
    email(state, payload: string) {
      state.email = payload;
    },
    tickets(state, payload: TicketDto[]) {
      let sum = 0;
      payload.forEach((element) => {
        const stringLength = element.image.length;
        const sizeInBytes =
          4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
        const sizeInKb = sizeInBytes / 1000;
        sum += sizeInKb / 1024;
      });
      console.log("length: " + sum);
      if (sum <= 10) {
        state.tickets = payload;
      }
    },
  },
};
