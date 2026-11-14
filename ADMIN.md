# IBA admin console

The admin console at **`/admin`** edits the resources shown in two places:

- the **Resources library** (`/library`, the "Browse the Library" catalogue): every item
- the **home page knowledge base** ("Powered by the Community"): the first six items marked *Feature on the home page*

Both read one file, `src/data/resources.json`. Every item needs a **title, summary, link and thumbnail**, plus a platform, format, topic and level; the console will not publish an item with any of these missing. The date is optional.

It also edits the **Photo Gallery** on `/gallery` ("IBA in the News & Gallery"): open **Photo Gallery → Event photos**, add a photo, its caption, event, location and date, and press **Publish**. Photos are stored in `public/images/gallery/`. Visitors can filter by event, so keep each event's name spelled the same way. The page's **In the News** section lists every Resources item whose format is **News** or **Press Release**.

## How editing works

1. Open `https://<your-site>/admin` and choose **Login with GitHub**.
2. Open **Resources → Resources library & home page hub**.
3. Add, edit, reorder (drag) or remove items. Upload a thumbnail with the image field (JPG or PNG, about 1084 × 924 px; cards show it at 542:462 without cropping).
4. Press **Publish**. The console commits the change to `main` on GitHub, and Vercel redeploys the site, usually within a minute or two.

Only GitHub accounts with **write access** to `Bhavyabatra19/IBA-Web` can publish. Anyone else can sign in but GitHub will refuse to save.

## One-time setup (about 5 minutes)

Sign-in uses a GitHub OAuth app and two small Vercel functions in this repo (`api/auth.js`, `api/callback.js`).

1. **Create the GitHub OAuth app.** GitHub → Settings → Developer settings → OAuth Apps → *New OAuth App*:
   - Application name: `IBA Admin`
   - Homepage URL: `https://<your-site>`
   - Authorization callback URL: `https://<your-site>/api/callback`

   Register it, then **Generate a new client secret**. Keep the Client ID and the secret.
2. **Add them to Vercel.** Vercel → the IBA-Web project → Settings → Environment Variables (Production):
   - `OAUTH_GITHUB_CLIENT_ID` = the Client ID
   - `OAUTH_GITHUB_CLIENT_SECRET` = the client secret
3. **Redeploy** the project (Deployments → latest → Redeploy) so the functions pick up the variables.
4. Open `https://<your-site>/admin` and sign in.

`<your-site>` is the production domain the site is served on. The callback URL must match it exactly. Sign-in from a Vercel preview URL needs that URL added as the callback instead, so use the production domain for editing.

Optional: set `OAUTH_GITHUB_SCOPE` to `public_repo` to ask GitHub for narrower access while the repository is public (the default is `repo`).

## Files

| File | What it is |
| --- | --- |
| `public/admin/index.html` | The console (Decap CMS 3.17.1) and its fields |
| `src/data/resources.json` | The resources list it edits |
| `src/data/gallery.json` | The photo gallery list it edits |
| `public/images/gallery/` | Where uploaded gallery photos go |
| `public/images/resources/` | Where uploaded thumbnails go |
| `api/auth.js`, `api/callback.js` | GitHub sign-in |

# Let's Talk form → email

The enquiry form posts to `api/enquiry.js`, which emails each enquiry to **hello@indiablockchainalliance.org** through [Resend](https://resend.com), with **Reply-To** set to the person who wrote. Until it is set up, the form tells visitors it is not connected and offers "Email us instead", so no enquiry is lost silently.

## One-time setup

1. Create a Resend account and **add the domain** `indiablockchainalliance.org` (Resend → Domains). Add the DNS records it shows at the domain's DNS provider and wait for it to verify.
2. Create an **API key** (Resend → API Keys, "Sending access").
3. In Vercel → the IBA-Web project → Settings → Environment Variables (Production), add:
   - `RESEND_API_KEY` = the API key
   - `ENQUIRY_FROM` = `IBA Website <website@indiablockchainalliance.org>` (any address on the verified domain)
   - optional: `ENQUIRY_TO` to send somewhere other than hello@indiablockchainalliance.org
4. Redeploy, then send a test enquiry from the site.

Without `ENQUIRY_FROM` on a verified domain, Resend only delivers to the email address of the Resend account itself, which is useful for a first test.
