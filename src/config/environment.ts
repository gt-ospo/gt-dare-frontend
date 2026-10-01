/**
 * Environment Configuration
 *
 * Provides build-time, environment-tier configuration: which backend to talk to,
 * which WebSocket URL to use, and whether the app is running locally vs. in
 * staging/production.
 *
 * Feature flags used to live here. They now come from the backend — see
 * ``src/api/featureFlags.ts``, ``src/redux/featureFlagsSlice.ts``, and
 * ``src/hooks/useFeatureFlag.ts``. The admin manages flag values in Django
 * admin (``/admin/feature_flags/featureflag/``) at three levels: app default,
 * per-AccessCodeGroup override, per-user override.
 *
 * The ``VITE_APP_ENVIRONMENT`` variable still selects between deployment tiers
 * for URLs and other build-time concerns.
 */

export type AppEnvironment =
  | 'local'
  | 'dare-staging'
  | 'dare-production'
  | 'gt-production'

export interface EnvironmentConfig {
  environment: AppEnvironment
  isLocal: boolean
  isDareStaging: boolean
  isDareProduction: boolean
  isGtProduction: boolean
  apiUrl: string
  websocketUrl: string
  socraticBooksUrl?: string
}

function getEnvironment(): AppEnvironment {
  const env = import.meta.env.VITE_APP_ENVIRONMENT as AppEnvironment | undefined

  if (
    !env ||
    !['local', 'dare-staging', 'dare-production', 'gt-production'].includes(env)
  ) {
    console.warn(
      `Invalid or missing VITE_APP_ENVIRONMENT: "${env}". Defaulting to "local".`
    )
    return 'local'
  }

  return env
}

/**
 * The page's own origin, for deployments that serve the API under it through a
 * reverse proxy.
 *
 * Vite inlines ``VITE_*`` at build time, so a bundle built with an absolute
 * backend URL only works when reached at exactly that address — a tunnel, a
 * different port, or a later move to HTTPS each need their own rebuild. Leaving
 * ``VITE_DJANGO_BACKEND_URL`` empty makes the bundle origin-agnostic instead,
 * which is what a same-origin proxy deployment wants. Set the variable
 * explicitly when the API really does live somewhere else.
 */
function currentOrigin(): string {
  return typeof window === 'undefined' ? '' : window.location.origin
}

function currentWebsocketOrigin(): string {
  if (typeof window === 'undefined') return ''
  const scheme = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  return `${scheme}//${window.location.host}`
}

function buildEnvironmentConfig(): EnvironmentConfig {
  const environment = getEnvironment()

  return {
    environment,
    isLocal: environment === 'local',
    isDareStaging: environment === 'dare-staging',
    isDareProduction: environment === 'dare-production',
    isGtProduction: environment === 'gt-production',
    apiUrl: import.meta.env.VITE_DJANGO_BACKEND_URL || currentOrigin(),
    websocketUrl:
      import.meta.env.VITE_WEBSOCKET_URL || currentWebsocketOrigin(),
    socraticBooksUrl: import.meta.env.VITE_SOCRATIC_BOOKS_URL,
  }
}

export const config: EnvironmentConfig = buildEnvironmentConfig()

export const isLocal = config.isLocal
export const isDareStaging = config.isDareStaging
export const isDareProduction = config.isDareProduction
export const isGtProduction = config.isGtProduction

if (config.isLocal) {
  console.log('🚀 DARE Environment Configuration:', {
    environment: config.environment,
    apiUrl: config.apiUrl,
    websocketUrl: config.websocketUrl,
  })
}

export default config
