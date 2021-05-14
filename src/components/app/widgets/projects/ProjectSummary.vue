<template>
  <div class="w-full">
    <div class="flex-1 min-w-0 flex justify-between text-xs">
      <p class="font-medium text-gray-900 truncate">
        <span>
          <div class="flex items-center space-x-2 text-xs font-normal">
            <div class="h-2 w-2 rounded-full" :class="projectColor()"></div>
            <div>{{ nombre }}</div>
          </div>
        </span>
      </p>
      <div class="flex items-center space-x-1 text-gray-700">
        <p v-if="loading">...</p>
        <p>${{ total | numberFormat }}</p>
      </div>
    </div>
    <div class="text-gray-400 flex-1 min-w-0 flex justify-between text-xs">
      <div class="font-medium text-gray-400 truncate">
        <div class="flex items-center text-xs font-normal space-x-1 truncate">
          <!-- <div>{{ usuarios.length }} miembros</div> -->
          <div v-if="summary && summary.expenseCount > 0">
            {{ summary.expenseCount }} gastos
          </div>
          <div v-if="summary && summary.ticketsCount > 0">
            {{ summary.ticketsCount }} pendientes
          </div>
        </div>
      </div>
    </div>
    <div v-if="false" class="flex-1 min-w-0 flex justify-between text-xs">
      <div class="font-medium text-gray-900 truncate">
        <div class="flex items-center space-x-2 text-xs font-normal">
          <div>
            ${{ summary.ticketsTotal | numberFormat }} ({{
              summary.ticketsCount
            }}
            tickets)
          </div>
        </div>
      </div>
      <div class="font-medium text-gray-900 truncate">
        <div class="flex items-center space-x-2 text-xs font-normal">
          <div>
            ${{ summary.expenseTotal | numberFormat }} ({{
              summary.expenseCount
            }}
            egresos)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "@/components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
import { ProjectDto } from "../../../../application/dtos/app/projects/ProjectDto";
import { Prop } from "vue-property-decorator";
import * as projectHelpers from "@/application/modules/projects/ProjectHelpers";
import { SummaryCountTotalResponse } from "@/application/contracts/app/summaries/SummaryCountTotalResponse";
import { SummaryCountTotalType } from "@/application/enums/app/transactions/SummaryCountTotalType";

@Component({
  components: { SuccessModal, ErrorModal, ConfirmModal }
})
export default class ProyectoResumenComponent extends BaseComponent {
  @Prop({ default: 0, type: String }) id;
  @Prop({ default: "", type: String }) nombre;
  @Prop({ default: "", type: Number }) color;
  @Prop({ default: [] }) usuarios;
  private summary: SummaryCountTotalResponse = {
    type: SummaryCountTotalType.PROJECT,
    name: "",
    description: "",
    ticketsTotal: 0,
    ticketsCount: 0,
    expenseTotal: 0,
    expenseCount: 0,
    incomeTotal: 0,
    incomeCount: 0,
    incomePercentageTotal: 0,
    incomePercentageCount: 0,
    expensePercentageTotal: 0,
    expensePercentageCount: 0
  };
  mounted() {
    this.loading = true;
    this.services.projects
      .getSummary(this.id)
      .then((response: SummaryCountTotalResponse) => {
        this.summary = response;
      })
      .finally(() => {
        this.loading = false;
      });
  }
  projectColor() {
    return projectHelpers.getProjectColor(this.color);
  }
  get total() {
    if (this.summary) {
      return this.summary.ticketsTotal + this.summary.expenseTotal;
    }
    return 0;
  }
}
</script>
