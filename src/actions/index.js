export function fetchTopics() {
  const url = 'https://flowers-endpoint.herokuapp.com/api/v1/topics'

  const topics = fetch(url)
    .then(response => {
      return response.json()
    })
    .then(responseBody => {
      const topics = responseBody.data.map(data => {
        return data.attributes.topic
      })

      return topics
    })

  return {
    type: 'FETCH_TOPICS',
    payload: topics
  }
}