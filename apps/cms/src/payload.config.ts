import path from 'path'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { fileURLToPath } from 'url'

import Pages from './collections/Pages'
import Media from './collections/Media'
import ContactSubmissions from './collections/ContactSubmissions'
import Features from './collections/Features'
import Users from './collections/Users'
import SiteSettings from './globals/SiteSettings'
import SeoDefaults from './globals/SeoDefaults'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  secret: process.env.PAYLOAD_SECRET!,
  cors: ['http://localhost:3001', 'http://localhost:3000'],
  csrf: ['http://localhost:3001'],
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' – Restroworks CMS',
    },
  },
  // i18n: {
  //   fallbackLanguage: 'en',
  //   supportedLanguages: {
  //     en: { label: 'English', value: 'en' },
  //     es: { label: 'Español', value: 'es' },
  //   } as Record<string, { label: string; value: string }>,
  // },
  localization: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI!,
  }),
  collections: [Users, Pages, Media, ContactSubmissions, Features],
  globals: [SiteSettings, SeoDefaults],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
