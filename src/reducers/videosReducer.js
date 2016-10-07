export default function videosReducer(state=[], action) {
  switch (action.type) {
    case 'FETCH_VIDEOS':
      debugger
      return action.payload
    case 'NEW_VIDEO':
      return [...state, action.payload]
    default:
      return state
  }
}
