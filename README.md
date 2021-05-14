<p align="center">
    <a href="https://netcoresaas.com"><img width="800" src="https://demo.netcoresaas.com/img/logo-light.81711512.png" alt="NetcoreSaas" /></a>
</p>

<h1><a href="https://vue.netcoresaas.com">Frontend demo</a></h1>
<p>Use <b>test1@gmail.com</b>, password <b>testpass</b> or create an account (with a fake Stripe card) to test the app.</p>

### What's new in v2.0.0?

- [x] **Workspaces**: Each tenant has its own workspaces
- [x] **Projects**: Every user can add project
- [x] **Files**: Upload multiple files (receipts)
- [x] **Dashboard**: Transactions summary
- [ ] OCR: Only with [NetcoreSaas backend](https://netcoresaas.com)

### Features

- [x] Marketing pages (landing, pricing, contact, blog)
- [x] Admin pages (tenants, products, resources)
- [x] App pages (dashboard, receipts, transactions, organization, members, subscription, profile)
- [x] Multi-tenant/organization: _(Each tenant is an organization)_
- [x] Multi-role _(Owner, Admin, Member, Guest)_
- [x] Multi-theme _(TailwindCSS based)_
- [x] Multi-language _(English, spanish and hindi)_
- [x] Fake server _(simulating a backend implementation on some services)_
- [x] Integrations:
  - [x] Authentication: [Google](https://developers.google.com/identity/sign-in/web)
  - [x] Conversations: [Intercom](https://intercom.com), [Drift](http://drift.com)
  - [x] Analytics: [Google](http://analytics.google.com), [Mixpanel](http://mixpanel.com), [Hotjar](https://www.hotjar.com)
  - [x] Logging: [Sentry](http://sentry.io), [Logrocket](http://logrocket.com)
  - [x] Newsletter: [Mailchimp](http://mailchimp.com) mailing list
  - [x] Forms: [Formspree](https://formspree.io)
  - [x] Blog: [Ghost](https://ghost.org) at /blog page
  - [ ] [Stripe](http://stripe.com): Only with [NetcoreSaas backend](https://netcoresaas.com)

### :link: Links

- [Frontend v2.0.0 demo](https://vue.netcoresaas.com): This project
- [NetcoreSaas v2.0.0 demo](https://demo.netcoresaas.com)
- [NetcoreSaas](https://netcoresaas.com): Commercial product with .NET 5 backend

### :wrench: Setup

1. `git clone https://github.com/netcoresaas/saas-vuejs-tailwindcss`
2. `npm install`
3. `npm run serve`
4. _Optional_: Update variables on any integration you want to use on `.env.development` and `.env.production`

### :computer: Contribute

This is my first open source project so I still don't know how to make a contribution guide, but feel free to open issues.

### :speech_balloon: Contact me

If you need help you can find me on [twitter](https://twitter.com/alexandromtzg) or [send me an email](mailto:help@netcoresaas.com).

### [NET 5 Backend](https://netcoresaas.com)

If you [purchase a license](https://netcoresaas.com/pricing), you'll be able to:

- [x] Download the full codebase with a working NET 5 backend, check out the [demo](https://demo.netcoresaas.com)
- [x] Use PostgreSQL, MySQL or any EF supported database
- [x] Setup your Stripe pricing (products/subscriptions)
- [x] Send SMTP or [Postmark](https://postmarkapp.com) emails (welcome, invited, password reset)
- [x] Scan images text with OCR using Azure
