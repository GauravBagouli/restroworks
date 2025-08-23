# Restroworks Monorepo

This repository is a monorepo that hosts both the **CMS (Payload + Next.js)** and the **Web Frontend (Next.js)** for the Restroworks platform.

## Clone & Install

`git clone https://github.com/your-org/restroworks.git`

`cd restroworks`

`npm install --legacy-peer-deps`

## Project Structure

```
restroworks/
│── apps/
│   ├── cms/   → Payload CMS app (content management + API)
│   ├── web/   → Web frontend app (public website consuming CMS data)
│── package.json
│── README.md
```

## Setup Instructions

### Setup Environment Variables

* **apps/cms/.env**

```
PAYLOAD_SECRET=Secret_key
MONGODB_URI=MongoDB-URL
PAYLOAD_PUBLIC_SERVER_URL=cms_url
WEB_ORIGIN=web_url
PORT=3000
```

* **apps/web/.env.local**
  ```
  NEXT_PUBLIC_CMS_URL=cms_url
  NEXT_PUBLIC_SITE_URL=web_url
  ```

### Prerequisites

- Node.js **>=18.20.2 or >=20.9.0**
- npm
- MongoDB (for CMS database)

### Run CMS

```bash
npm run dev:cms
```

### Run Web Frontend

```bash
npm run dev:web
```

### Run Both

```bash
npm run dev
```

## CMS Modeling Choices

I designed the CMS with a few guiding principles:

1. **Pages are flexible:** Instead of hardcoding page templates, I use a `Pages` collection where each entry is a slug (like `/about`, `/menu`) and holds a sequence of content  **blocks** . This gives editors full freedom without needing dev work for every new page.
2. **Blocks over fields**: Blocks (e.g., Hero, Text + Image, CTA, Menu Grid) let me create reusable building blocks. Editors can stack and reorder them however they like, keeping content modular.
3. **Globals for shared data:** Things like navigation, footer links, or site settings are modeled as  **Globals** . This avoids repetition and ensures that updating them reflects everywhere.
4. **Rich Text with Lexical**: I picked the Lexical editor for structured rich content. It integrates cleanly with Payload and allows us to add custom nodes later (links, buttons, etc.).

## Working With Pages & Blocks

###  Creating a Page

1. Go to **Pages** in the CMS admin.
2. Click  **Create New Page** .
3. Fill in:

   * **Title** → used internally and as `<title>`.
   * **Slug** → determines the URL (e.g. `/home`).
   * **Layout Blocks** → add as many as you want (hero, features, cta, etc.).

###  Editing a Page

* Open an existing page, adjust blocks, save → instantly reflects on the frontend after reload.

### Adding Blocks

* Inside a page, click  **Add Block** .
* Choose from available types (Hero, Feature List, CTA etc.).
* Reorder via drag-and-drop.
* Save → Payload automatically exposes these blocks in the API.

## Frontend (Web) Notes

* The web app fetches data from Payload using the REST or GraphQL API.
* Pages are resolved by slug → if you add `/home` in CMS, the frontend automatically serves `/home`.
* Each block type in CMS has a matching React component in `apps/web/components/blocks/*`.

## Deployment

- CMS requires MongoDB
- Web can be deployed to Vercel/Render or any serverless deployement services.
- CMS can be deployed as node js application on services like Render.
