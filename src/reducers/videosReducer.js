export default function videosReducer(state=[], action) {
  switch (action.type) {
    case 'FETCH_VIDEOS':
      return action.payload
    case 'NEW_VIDEO':
      return [...state, action.payload]
    case 'DESTROY_VIDEO':
      let videoIndex = state.findIndex(video => parseInt(video.id, 10) === action.payload)
      return [...state.slice(0, videoIndex), ...state.slice(videoIndex + 1)]
    default:
      return state
  }
}
