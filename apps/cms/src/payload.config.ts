import path from 'path'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { fileURLToPath } from 'url'

import Pages from './collections/Pages'
import Media from './collections/Media'
import ContactSubmissions from './collections/ContactSubmissions'
import Features from './collections/Features'
import Users from './collections/Users'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  secret: process.env.PAYLOAD_SECRET!,
  cors: [process.env.WEB_ORIGIN || 'http://localhost:3000'],
  csrf: [process.env.WEB_ORIGIN || 'http://localhost:3000'],
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' – Restroworks CMS',
    },
  },
  localization: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI!,
  }),
  collections: [Users, Pages, Media, ContactSubmissions, Features],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
