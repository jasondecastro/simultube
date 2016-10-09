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

// export function fetchMessages() {
//   const url = 'https://flowers-endpoint.herokuapp.com/api/v1/messages'
//
//   const messages = fetch(url,
//   {
//     method: 'GET',
//     headers: {
//       'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
//     }
//   })
//   .then(response => {
//     return response.json()
//   }).then(responseBody => {
//     return responseBody.data
//   })
//
//   return {
//     type: 'FETCH_MESSAGES',
//     payload: messages
//   }
// }

export function fetchUsers() {
  const url = 'https://flowers-endpoint.herokuapp.com/api/v1/users'

  const users = fetch(url,
  {
    headers: {
      'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
    }
  })
  .then(response => {
    return response.json()
  }).then(responseBody => {
    return responseBody.data
  })

  return {
    type: 'FETCH_USERS',
    payload: users
  }
}

export function fetchVideos() {
  const url = 'https://flowers-endpoint.herokuapp.com/api/v1/videos'

  const videos = fetch(url,
  {
    headers: {
      'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
    }
  })
  .then(response => {
    return response.json()
  }).then(responseBody => {
    return responseBody.data
  })

  return {
    type: 'FETCH_VIDEOS',
    payload: videos
  }
}


export function newMessage(newMessageObject) {
  return {
    type: 'NEW_MESSAGE',
    payload: newMessageObject
  }
}

export function newVideo(newVideoObject) {
  return {
    type: 'NEW_VIDEO',
    payload: newVideoObject
  }
}

export function newUser(newUserObject) {
  return {
    type: 'NEW_USER',
    payload: newUserObject
  }
}

export function changeUser(changedUserObject) {
  return {
    type: 'CHANGE_USER',
    payload: changedUserObject
  }
}

export function destroyUser(userToDestroyID) {
  return {
    type: 'DESTROY_USER',
    payload: userToDestroyID
  }
}

export function removeCurrentVideo(videoToDestroyID) {
  return {
    type: 'DESTROY_VIDEO',
    payload: videoToDestroyID
  }
}