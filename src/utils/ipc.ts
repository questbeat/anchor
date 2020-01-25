export const QUERY_ITEMS = 'QUERY_ITEMS'
export const SET_QUERY = 'SET_QUERY'

export interface QueryItemsMessage {
  type: typeof QUERY_ITEMS
  payload: {
    query: string
  }
}

export interface SetQueryMessage {
  type: typeof SET_QUERY
  payload: {
    query: string
  }
}

export type MessageTypes = QueryItemsMessage | SetQueryMessage

export const queryItems = (query: string): QueryItemsMessage => {
  return {
    type: QUERY_ITEMS,
    payload: { query },
  }
}

export const setQuery = (query: string): SetQueryMessage => {
  return {
    type: SET_QUERY,
    payload: { query },
  }
}

export const sendMessage = async (message: MessageTypes) => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, response => {
      if (response) {
        resolve(response)
      } else {
        reject(chrome.runtime.lastError)
      }
    })
  })
}
