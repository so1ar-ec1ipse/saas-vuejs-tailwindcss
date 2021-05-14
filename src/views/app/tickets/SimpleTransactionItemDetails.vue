<template>
  <div v-if="id">
    <div class="px-4 py-3">
      <div class="flex justify-between items-start">
        <span class="w-full">
          <div
            class="max-w-lg mx-auto mt-2 w-full text-gray-600 text-sm space-y-1 p-0.5"
          >
            <div class="flex">
              <div class="w-full max-w-lg mx-auto sm:p-5">
                <div class="flex justify-between font-medium mb-2 text-xs">
                  <div class="truncate">
                    {{ $t("models.transaction.description") }}
                  </div>
                  <div>{{ $t("models.transaction.quantity") }}</div>
                </div>
                <div
                  v-for="(detail, index) in details"
                  :key="index"
                  class="flex justify-between border-b border-gray-300 border-dashed"
                >
                  <div class="truncate">
                    {{ detail.description }}
                  </div>
                  <div>${{ detail.total | decimalFormat }}</div>
                </div>
                <div
                  class="flex justify-between border-b border-gray-300 border-dashed"
                >
                  <div class="truncate font-medium">
                    {{ $t("models.transaction.subtotal") }}
                  </div>
                  <div>${{ subtotal | decimalFormat }}</div>
                </div>
                <div
                  class="flex justify-between border-b border-gray-300 border-dashed"
                >
                  <div class="truncate font-medium">
                    {{ $t("models.transaction.taxes") }}
                  </div>
                  <div>${{ taxes | decimalFormat }}</div>
                </div>
                <div
                  class="flex justify-between border-b border-gray-300 border-dashed"
                >
                  <div class="truncate font-medium">
                    {{ $t("models.transaction.total") }}
                  </div>
                  <div>${{ total | decimalFormat }}</div>
                </div>
                <div class="flex pt-3" v-if="ticket && ticket.image">
                  <img class="h-auto w-full" :src="ticket.image" />
                </div>
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { UserDto } from "@/application/dtos/master/users/UserDto";
import { TransactionDetailDto } from "@/application/dtos/app/transactions/TransactionDetailDto";
import { TransactionType } from "@/application/enums/app/transactions/TransactionType";
import { TicketDto } from "@/application/dtos/app/transactions/TicketDto";
import { CfdiDto } from "@/application/dtos/app/cfdis/CfdiDto";
@Component({
  components: {}
})
export default class SimpleTransactionItemDetails extends Vue {
  @Prop() id!: string;
  @Prop() createdAt!: Date;
  @Prop() createdByUser!: UserDto;
  @Prop() ticketId!: string;
  @Prop() ticket!: TicketDto;
  @Prop() type!: TransactionType;
  @Prop() currency!: string;
  @Prop() date!: Date;
  @Prop() category!: string;
  @Prop() subtotal!: number;
  @Prop() taxes!: number;
  @Prop() total!: number;
  @Prop() cfdi!: CfdiDto;
  @Prop() details!: TransactionDetailDto[];
  avatarText() {
    if (
      this.ticket.createdByUser?.firstName &&
      this.ticket.createdByUser?.lastName
    ) {
      return (
        this.ticket.createdByUser?.firstName[0] +
        this.ticket.createdByUser?.lastName[0]
      );
    } else if (this.ticket.createdByUser?.firstName) {
      return this.ticket.createdByUser?.firstName[0];
    } else {
      return "?";
    }
  }
  transactionType() {
    return TransactionType[this.type];
  }
}
</script>
