# Cloudflare Worker Setup (Payments + Contact)

1. Copy [cloudflare/mentoria-payments-worker/wrangler.toml.example](/C:/Users/Mihika/OneDrive/Desktop/DC_John/cloudflare/mentoria-payments-worker/wrangler.toml.example) to `wrangler.toml`.
2. Create D1 DB and run [schema.sql](/C:/Users/Mihika/OneDrive/Desktop/DC_John/cloudflare/mentoria-payments-worker/schema.sql).
3. Add Worker secrets (do not commit these values):
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `RAZORPAY_WEBHOOK_SECRET`
4. Set Worker vars:
   - `CORS_ORIGIN` (for example `https://oversimplify.in`)
   - `SANITY_PROJECT_ID`
   - `SANITY_DATASET`
5. Ensure CLI auth is set with `CLOUDFLARE_API_TOKEN`.
6. Deploy worker and copy URL.
7. In frontend `.env.local`, set:
   - `NEXT_PUBLIC_CF_WORKER_URL=https://<your-worker>.workers.dev`
8. Rebuild and deploy static site.

## Endpoints used by frontend
- `POST /coupon/validate`
- `POST /checkout/order`
- `POST /checkout/verify`
- `POST /lead/contact`
