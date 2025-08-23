import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async (request: Request) => {
  console.log('request', request)
  const payload = await getPayload({
    config: configPromise,
  })
  console.log('payload', payload)

  return Response.json({
    message: 'This is an example of a custom route.',
  })
}
