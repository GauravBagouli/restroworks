import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <main className="home">
      <div className="content text-center">

        <Image
          alt="RestroWorks CMS"
          height={80}
          src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
          width={80}
          priority
          className="mx-auto"
        />

        {!user && (
          <h1 className="mt-6 text-3xl font-bold text-gray-800">
            Welcome to <span className="text-blue-600">RestroWorks CMS</span>
          </h1>
        )}

        {user && (
          <h1 className="mt-6 text-3xl font-bold text-gray-800">
            Welcome back, <span className="text-blue-600">{user.email}</span> 👋
          </h1>
        )}

        <p className="mt-2 text-gray-600">Manage Pages, Blocks, Media and features with ease.</p>

        <div className="links mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            className="admin bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_self"
          >
            Go to Admin Panel
          </a>
          <a
            className="docs border border-gray-300 hover:border-blue-500 px-6 py-3 rounded-lg shadow-sm transition"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
    </main>
  )
}
