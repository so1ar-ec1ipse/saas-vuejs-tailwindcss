import { AuthenticationService } from "@/services/api/master/users/AuthenticationService";
import { TenantService } from "@/services/api/master/tenants/TenantService";
import { TenantUsersService } from "@/services/api/master/tenants/TenantUsersService";
import { UserService } from "@/services/api/master/users/UserService";
import { TenantUserInvitationService } from "@/services/api/master/tenants/TenantUserInvitationService";
import { ResourceService } from "@/services/api/master/tenants/ResourceService";
import { TransactionService } from "@/services/api/app/transactions/TransactionService";
import { SubscriptionProductService } from "./api/master/subscriptions/SubscriptionProductService";
import { SubscriptionManagerService } from "./api/master/subscriptions/SubscriptionManagerService";
import { TicketService } from "./api/app/transactions/TicketService";
import { WorkspaceService } from "./api/app/workspaces/WorkspaceService";
import { TransactionOrTicketService } from "./api/app/transactions/TransactionOrTicketService";
import { CfdiService } from "./api/app/cfdis/CfdiService";
import { ProveedorService } from "./api/app/contacts/ProveedorService";
import { ClienteService } from "./api/app/contacts/ClienteService";
import { DashboardService } from "./api/app/dashboards/DashboardService";
import { ProjectService } from "./api/app/projects/ProjectService";
import { TeamService } from "./api/app/projects/TeamService";

class Services {
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

  // App
  cfdis: CfdiService;
  transactions: TransactionService;
  tickets: TicketService;
  workspaces: WorkspaceService;
  transactionsOrTickets: TransactionOrTicketService;
  suppliers: ProveedorService;
  customers: ClienteService;
  dashboard: DashboardService;

  projects: ProjectService;
  teams: TeamService;

  constructor() {
    this.subscriptionProducts = new SubscriptionProductService();
    this.subscriptionManager = new SubscriptionManagerService();

    this.authentication = new AuthenticationService();
    this.users = new UserService();

    this.tenants = new TenantService();
    this.tenantUsers = new TenantUsersService();
    this.tenantUserInvitations = new TenantUserInvitationService();
    this.resources = new ResourceService();
    this.cfdis = new CfdiService();
    this.transactions = new TransactionService();
    this.tickets = new TicketService();
    this.workspaces = new WorkspaceService();
    this.transactionsOrTickets = new TransactionOrTicketService();
    this.suppliers = new ProveedorService();
    this.customers = new ClienteService();
    this.dashboard = new DashboardService();

    this.projects = new ProjectService();
    this.teams = new TeamService();
  }
}

export default new Services();
