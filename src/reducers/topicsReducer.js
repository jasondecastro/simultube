export default function topicsReducer(state=[], action) {
  switch (action.type) {
    case 'FETCH_TOPICS':
      return action.payload
    default:
      return state
  }
}

