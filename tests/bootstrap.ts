import { assert } from '@japa/assert'
import { apiClient } from '@japa/api-client'
import app from '@adonisjs/core/services/app'
import type { Config } from '@japa/runner/types'
import { pluginAdonisJS } from '@japa/plugin-adonisjs'
import { sessionApiClient } from '@adonisjs/session/plugins/api_client'
import testUtils from '@adonisjs/core/services/test_utils'

// Registramos el plugin apiClient para realizar peticiones a nuestra app dentro de las pruebas
// ApiClient coloca automaticamente el host y puerto, si no le colocamos como parámetro el que queremos, especialmente útil para pruebas mientras corremos el servidor de desarrollo
export const plugins: Config['plugins'] = [
  assert(),
  apiClient(),
  sessionApiClient(app),
  pluginAdonisJS(app),
]

// Añadimos el runnerHook, diciendole a Japa que ejecute todas nuestras migraciones de base de datos antes de comenzar la suite de pruebas
// De este modo, la base de datos de pruebas siempre tendrá la estrcutura más reciente
export const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>> = {
  setup: [() => testUtils.db().migrate()],
  teardown: [],
}

export const configureSuite: Config['configureSuite'] = (suite) => {
  if (['browser', 'functional', 'e2e'].includes(suite.name)) {
    return suite.setup(() => testUtils.httpServer().start())
  }
}
