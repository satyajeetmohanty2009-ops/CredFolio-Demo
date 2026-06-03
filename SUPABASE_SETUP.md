# CredFolio Supabase + Gemini Setup

This prototype works locally without keys. To make it real-world, connect Supabase and Gemini.

## 1. Create Supabase Tables

1. Create a free Supabase project.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy your project URL and publishable/anon key.
5. Copy `config.example.js` values into `config.js`.

## 2. Deploy the Gemini Edge Function

Install the Supabase CLI, then from this folder run:

```powershell
supabase functions deploy recommend-skill --project-ref YOUR_PROJECT_REF
supabase secrets set GEMINI_API_KEY=YOUR_GEMINI_KEY --project-ref YOUR_PROJECT_REF
```

Or create a local ignored file named `supabase/.env.local`:

```text
GEMINI_API_KEY=YOUR_GEMINI_KEY
```

Then upload it securely:

```powershell
supabase secrets set --env-file supabase/.env.local --project-ref YOUR_PROJECT_REF
```

Then set:

```js
ENABLE_AI_EDGE_FUNCTION: true
```

in `config.js`.

## 3. Security Notes

- Keep the Gemini API key only in Supabase Edge Function secrets.
- The browser uses only the Supabase publishable/anon key.
- The current demo policies are intentionally open for hackathon testing. For production, replace them with authenticated role-based policies.
- RSA-PSS signing is implemented with Web Crypto. In production, the school private key should live in a secure admin-only environment, not a student browser.
- If an API key is ever pasted into chat, code, screenshots, or a public repo, rotate it before production use.
