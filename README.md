# HomeCare

Deployment-ready PWA prototype for home and commercial maintenance services.

## Publish this version

1. Create a GitHub repository called `homecare` and upload this project.
2. In the repository, open **Settings → Pages**, set **Source** to **GitHub Actions**, and push the included workflow.
3. GitHub will publish it for free at `https://YOUR-GITHUB-USERNAME.github.io/homecare/`.

The included `.github/workflows/deploy-pages.yml` file deploys each push to the `main` branch automatically.

## What is included

- Responsive customer service discovery UI
- Booking flow with service, time, address and mobile validation
- Cash-on-service booking confirmation for prototype testing
- PWA manifest and offline caching

## Required before accepting real customer bookings

- Server-side database, login/OTP, and admin/provider dashboards
- Optional future payment gateway (cash on service is the current payment method)
- SMS/WhatsApp notifications and live provider dispatch
- Privacy policy, terms, support and cancellation policy
- Cloud environment variables and secure API implementation
