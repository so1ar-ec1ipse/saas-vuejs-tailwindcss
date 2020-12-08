import { FileType, ResourceDto } from '@/application/dtos/master/common/ResourceDto';
import { TenantUserRole } from '@/application/enum/master/TenantUserRole';
import { i18n } from '@/plugins/vue-i18n';

export const resources: ResourceDto[] = [];
for (let index = 1; index < 5; index++) {
  const resource: ResourceDto = {
    id: "",
    title: i18n.t("models.resource.object") + " " + index,
    description: i18n.t("models.resource.description") + " " + index,
    type: ".zip",
    tiers: index % 2 === 0 ? [1, 2, 3] : [3],
    roles:
      index % 2 === 0
        ? [TenantUserRole.Admin, TenantUserRole.Owner]
        : [TenantUserRole.Admin],
    hasFile: true,
    needsPermission: index % 2 !== 0,
    needsUpgrade: index % 2 !== 0,
  };
  resources.push(resource);
}
export const getResourcesFakeResponse = {
  data: resources,
};
