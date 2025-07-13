import ExpiryMap from 'expiry-map'
import pMemoize from 'p-memoize'

import type * as types from './types'
import { api } from './config'

export const searchNotion = pMemoize(searchNotionImpl, {
  cacheKey: (args) => args[0]?.query,
  cache: new ExpiryMap(10_000)
})

async function searchNotionImpl(
  params: types.SearchParams
): Promise<types.SearchResults> {
  return fetch(api.searchNotion, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(async(res) => {
      if (res.ok) {
        return res
      }
      const errorBody = await res.text()
      const error: any = new Error(`${res.statusText}: ${errorBody}`)
      error.response = res
      throw error
    })
    .then((res) => res.json() as Promise<types.SearchResults>)

  // return ky
  //   .post(api.searchNotion, {
  //     json: params
  //   })
  //   .json()
}
