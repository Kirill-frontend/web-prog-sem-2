export default async function request(url: string, method = 'GET', body: any, headers: any = {}) {
  try {
    if (body) {
      body = JSON.stringify(body)
      headers['Content-type'] = 'application/json'      
    }

    const response = await fetch(url, { method, body, headers })
    const json = response.json()

    return json
  } catch (e) {
    throw e
  }

}