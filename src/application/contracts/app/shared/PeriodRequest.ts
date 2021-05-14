import { Period } from "@/application/enums/app/common/Period";

export interface PeriodRequest {
  period: Period;
  withDetails: boolean;
}
