/** @type {import('next').NextConfig} */

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')


module.exports = (phase) => {
  // when started in development mode `next dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  console.log(`isDev:${isDev} isProd:${isProd} isStaging:${isStaging}`)

  const env = {
    APP_URI: (() => {
      if (isDev) return 'http://localhost:3000'
      if (isProd) return 'https://next-pubsub.vercel.app'
      return 'APP_URI:not'
    })(),
  }

  return {
    env,
    reactStrictMode: true,
  }
}