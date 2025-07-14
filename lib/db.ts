import Keyv from '@keyvhq/core'
import KeyvRedis from '@keyvhq/redis'

import { Pool } from '@neondatabase/serverless';
import { isRedisEnabled, redisNamespace, redisUrl } from './config'

let db: Keyv
if (isRedisEnabled) {
  const keyvRedis = new KeyvRedis(redisUrl!)
  db = new Keyv({ store: keyvRedis, namespace: redisNamespace || undefined })
} else {
  db = new Keyv()
}

export { db }

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

export { pool };