export interface ResourceCreateRequest {
  title: string;
  description: string;
  type: string;
  tiers: number[];
  roles: number[];
}
