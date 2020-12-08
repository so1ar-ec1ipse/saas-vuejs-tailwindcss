import {AuthenticationService} from "@/services/api/master/users/AuthenticationService";
import {TenantService} from "@/services/api/master/tenants/TenantService";
import {TenantUsersService} from "@/services/api/master/tenants/TenantUsersService";
import {UserService} from "@/services/api/master/users/UserService";
import {TenantUserInvitationService} from "@/services/api/master/tenants/TenantUserInvitationService";
import {ResourceService} from "@/services/api/master/tenants/ResourceService";
import {TransactionService} from "@/services/api/app/transactions/TransactionService";
import { SubscriptionProductService } from './api/master/subscriptions/SubscriptionProductService';
import { SubscriptionManagerService } from './api/master/subscriptions/SubscriptionManagerService';

export class Services {

  // Master: Subscriptions
  subscriptionProducts: SubscriptionProductService;
  subscriptionManager: SubscriptionManagerService;

  // Master: Users
  authentication: AuthenticationService;
  users: UserService;

  // Master: Tenants
  tenants: TenantService;
  tenantUsers: TenantUsersService;
  tenantUserInvitations: TenantUserInvitationService;
  resources: ResourceService;

  // App: Transactions
  transactions: TransactionService;

  constructor() {
    this.subscriptionProducts = new SubscriptionProductService();
    this.subscriptionManager = new SubscriptionManagerService();

    this.authentication = new AuthenticationService();
    this.users = new UserService();

    this.tenants = new TenantService();
    this.tenantUsers = new TenantUsersService();
    this.tenantUserInvitations = new TenantUserInvitationService();
    this.resources = new ResourceService();
    this.transactions = new TransactionService();
  }
}

export default new Services();
