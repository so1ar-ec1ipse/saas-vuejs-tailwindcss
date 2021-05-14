import { SubscriptionProductDto } from "@/application/dtos/master/subscriptions/SubscriptionProductDto";
import { WhoInvoices } from "@/application/enums/app/cfdis/WhoInvoices";
import { SubscriptionBillingPeriod } from "@/application/enums/master/subscriptions/SubscriptionBillingPeriod";
import { SubscriptionPriceType } from "@/application/enums/master/subscriptions/SubscriptionPriceType";

const products: SubscriptionProductDto[] = [
  {
    id: undefined,
    serviceId: "",
    tier: 1,
    title: "Básico 🦄",
    image: "",
    description: "La opción perfecta para tu nuevo negocio.",
    custom: false,
    prices: [
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.MONTHLY,
        price: 99,
        currency: "mxn",
        trialDays: 14,
        active: true,
        mode: 0
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.MONTHLY,
        price: 5,
        currency: "usd",
        trialDays: 14,
        active: true,
        mode: 0
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.MONTHLY,
        price: 399,
        currency: "mxn",
        trialDays: 14,
        active: true,
        mode: 1
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.MONTHLY,
        price: 20,
        currency: "usd",
        trialDays: 14,
        active: true,
        mode: 1
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.YEARLY,
        price: 829,
        currency: "mxn",
        trialDays: 14,
        active: true,
        mode: 0
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.YEARLY,
        price: 42,
        currency: "usd",
        trialDays: 14,
        active: true,
        mode: 0
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.YEARLY,
        price: 3349,
        currency: "mxn",
        trialDays: 14,
        active: true,
        mode: 1
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.YEARLY,
        price: 207,
        currency: "usd",
        trialDays: 14,
        active: true,
        mode: 1
      },
    ],
    features: [
      {
        id: undefined,
        order: 1,
        key: "monthlyTickets",
        value: "30",
        included: true,
        translateInFrontend: true,
      },
      {
        id: undefined,
        order: 2,
        key: "oneUser",
        value: "1",
        included: true,
        translateInFrontend: true,
      },
      {
        id: undefined,
        order: 3,
        key: "oneWorkspace",
        value: "1",
        included: true,
        translateInFrontend: true,
      },
      {
        id: undefined,
        order: 4,
        key: "whatsApp",
        value: "",
        included: false,
        translateInFrontend: true,
      },
      {
        id: undefined,
        order: 5,
        key: "onboarding30min",
        value: "",
        included: false,
        translateInFrontend: true,
      },
      {
        id: undefined,
        order: 6,
        key: "prioritySupport",
        value: "",
        included: false,
        translateInFrontend: true,
      },
    ],
    badge: "",
    active: true,
    maxUsers: 1,
  },
  {
    id: undefined,
    serviceId: "",
    tier: 2,
    title: "Esencial 🚀",
    image: "",
    description: "Recomendado para empresas en crecimiento.",
    custom: false,
    prices: [
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.MONTHLY,
        price: 499,
        currency: "mxn",
        trialDays: 14,
        active: true,
        mode: 0
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.MONTHLY,
        price: 1249,
        currency: "mxn",
        trialDays: 14,
        active: true,
        mode: 1
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.MONTHLY,
        price: 24,
        currency: "usd",
        trialDays: 14,
        active: true,
        mode: 0
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.MONTHLY,
        price: 63,
        currency: "usd",
        trialDays: 14,
        active: true,
        mode: 1
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.YEARLY,
        price: 4190,
        currency: "mxn",
        trialDays: 14,
        active: true,
        mode: 0
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.YEARLY,
        price: 10475,
        currency: "mxn",
        trialDays: 14,
        active: true,
        mode: 1
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.YEARLY,
        price: 209,
        currency: "usd",
        trialDays: 14,
        active: true,
        mode: 0
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.YEARLY,
        price: 522,
        currency: "usd",
        trialDays: 14,
        active: true,
        mode: 1
      },
    ],
    features: [
      {
        id: undefined,
        order: 1,
        key: "monthlyTickets",
        value: "100",
        included: true,
        translateInFrontend: true,
      },
      {
        id: undefined,
        order: 2,
        key: "maxNumberOfUsers",
        value: "3",
        included: true,
        translateInFrontend: true,
      },
      {
        id: undefined,
        order: 3,
        key: "maxNumberOfWorkspaces",
        value: "2",
        included: true,
        translateInFrontend: true,
      },
      {
        id: undefined,
        order: 4,
        key: "whatsApp",
        value: "",
        included: true,
        translateInFrontend: true,
      },
      {
        id: undefined,
        order: 5,
        key: "onboarding30min",
        value: "",
        included: false,
        translateInFrontend: true,
      },
      {
        id: undefined,
        order: 6,
        key: "prioritySupport",
        value: "",
        included: false,
        translateInFrontend: true,
      },
    ],
    badge: "recommended",
    active: true,
    maxUsers: 3,
  },
  {
    id: undefined,
    serviceId: "",
    tier: 3,
    title: "Profesional 💼",
    image: "",
    description: "Pensado en profesionales con equipos grandes.",
    custom: false,
    prices: [
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.MONTHLY,
        price: 1199,
        currency: "mxn",
        trialDays: 14,
        active: true,
        mode: 0
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.MONTHLY,
        price: 2999,
        currency: "mxn",
        trialDays: 14,
        active: true,
        mode: 1
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.MONTHLY,
        price: 59,
        currency: "usd",
        trialDays: 14,
        active: true,
        mode: 0
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.MONTHLY,
        price: 147,
        currency: "usd",
        trialDays: 14,
        active: true,
        mode: 1
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.YEARLY,
        price: 9999,
        currency: "mxn",
        trialDays: 14,
        active: true,
        mode: 0
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.YEARLY,
        price: 24999,
        currency: "mxn",
        trialDays: 14,
        active: true,
        mode: 1
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.YEARLY,
        price: 499,
        currency: "usd",
        trialDays: 14,
        active: true,
        mode: 0
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.YEARLY,
        price: 1249,
        currency: "usd",
        trialDays: 14,
        active: true,
        mode: 1
      },
    ],
    features: [
      {
        id: undefined,
        order: 1,
        key: "monthlyTickets",
        value: "300",
        included: true,
        translateInFrontend: true,
      },
      {
        id: undefined,
        order: 2,
        key: "maxNumberOfUsers",
        value: "10",
        included: true,
        translateInFrontend: true,
      },
      {
        id: undefined,
        order: 3,
        key: "maxNumberOfWorkspaces",
        value: "5",
        included: true,
        translateInFrontend: true,
      },
      {
        id: undefined,
        order: 4,
        key: "whatsApp",
        value: "",
        included: true,
        translateInFrontend: true,
      },
      {
        id: undefined,
        order: 5,
        key: "onboarding30min",
        value: "",
        included: true,
        translateInFrontend: true,
      },
      {
        id: undefined,
        order: 6,
        key: "prioritySupport",
        value: "",
        included: false,
        translateInFrontend: true,
      },
    ],
    badge: "",
    active: true,
    maxUsers: 10,
  },
  {
    id: undefined,
    serviceId: "",
    tier: 4,
    title: "Corporativo/Despacho 🏢",
    image: "",
    description: "Para empresas con muchos colaboradores.",
    custom: true,
    prices: [
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.MONTHLY,
        price: 7499,
        currency: "mxn",
        trialDays: 14,
        active: false,
        mode: 0
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.MONTHLY,
        price: 18749,
        currency: "mxn",
        trialDays: 14,
        active: false,
        mode: 1
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.MONTHLY,
        price: 374,
        currency: "usd",
        trialDays: 14,
        active: false,
        mode: 0
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.MONTHLY,
        price: 935,
        currency: "usd",
        trialDays: 14,
        active: false,
        mode: 1
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.YEARLY,
        price: 62999,
        currency: "mxn",
        trialDays: 14,
        active: false,
        mode: 0
      },
       {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.YEARLY,
        price: 157497,
        currency: "mxn",
        trialDays: 14,
        active: false,
        mode: 1
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.YEARLY,
        price: 3149,
        currency: "usd",
        trialDays: 14,
        active: false,
        mode: 0
      },
      {
        id: undefined,
        serviceId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.YEARLY,
        price: 7872,
        currency: "usd",
        trialDays: 14,
        active: false,
        mode: 1
      },
    ],
    features: [
      {
        id: undefined,
        order: 1,
        key: "monthlyTickets",
        value: "1,000+",
        included: true,
        translateInFrontend: true,
        customUnitPrice: 5,
        customMinValue: 1000
      },
      {
        id: undefined,
        order: 2,
        key: "moreThanUsers",
        value: "25",
        included: true,
        translateInFrontend: true,
        customUnitPrice: 50,
        customMinValue: 25
      },
      {
        id: undefined,
        order: 3,
        key: "moreThanWorkspaces",
        value: "10",
        included: true,
        translateInFrontend: true,
        customUnitPrice: 50,
        customMinValue: 10
      },
      {
        id: undefined,
        order: 4,
        key: "whatsApp",
        value: "",
        included: true,
        translateInFrontend: true,
      },
      {
        id: undefined,
        order: 5,
        key: "onboarding2hrs",
        value: "",
        included: true,
        translateInFrontend: true,
      },
      {
        id: undefined,
        order: 6,
        key: "prioritySupport",
        value: "",
        included: true,
        translateInFrontend: true,
      },
    ],
    badge: "",
    active: true,
    maxUsers: 30
  },
];

const periods = [SubscriptionBillingPeriod.MONTHLY, SubscriptionBillingPeriod.YEARLY];
const whoInvoices = [WhoInvoices.TENANT, WhoInvoices.ADMIN];
const currencies = ["mxn", "usd"];

// TODO
const basePrice = 99; // on MXN
const factorSuperiorPlan = 2; // x2 each plan increase
const factorEachSuperiorPlan = 2.5; // +250% plan increase
const factorWhoInvoices = 3.02; // +302%
const factorYearly = 8.4; // -30% yearly
const factorUsd = 0.05; // 20 USD -> MXN

products.forEach(product => {
  product.prices = [];
  periods.forEach((billingPeriod: SubscriptionBillingPeriod) => {
    whoInvoices.forEach((mode: WhoInvoices) => {
      currencies.forEach((currency: string) => {
        let currentPrice: number = basePrice;
        if (product.tier > 1) {
          currentPrice = currentPrice
            * (product.tier - 1) * factorSuperiorPlan
            * (product.tier - 1) * factorEachSuperiorPlan;
        }
        if (mode !== WhoInvoices.TENANT) {
          currentPrice = currentPrice * (mode * factorWhoInvoices);
        }
        if (billingPeriod === SubscriptionBillingPeriod.YEARLY) {
          currentPrice = currentPrice * factorYearly;
        }
        if (currency === "usd") {
          currentPrice = currentPrice * factorUsd;
        } else {
          currentPrice = Math.round(currentPrice);
          let strPrice = currentPrice.toString();
          while (strPrice.substr(strPrice.length - 2, strPrice.length) !== '99') {
            currentPrice += 1;
            strPrice = currentPrice.toString();
          }
        }
        currentPrice = Math.round(currentPrice);
        product.prices.push({
          id: undefined,
          serviceId: "",
          type: SubscriptionPriceType.RECURRING,
          billingPeriod,
          price: currentPrice,
          currency,
          trialDays: mode === WhoInvoices.TENANT && product.tier === 1 ? 7 : 0,
          active: true,
          mode
        });
      });
    });
  });
});

export const defaultProducts = products;
