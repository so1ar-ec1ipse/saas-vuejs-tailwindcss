export interface SubscriptionUpdateProductRequest {
  id: string;
  tier: number;
  title: string;
  description: string;
  badge: string;
  active: boolean;
  image: string;
  maxUsers: number;
}
