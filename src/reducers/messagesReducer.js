export default function messagesReducer(state=[], action) {
  switch (action.type) {
    case 'FETCH_MESSAGES':
      return action.payload
    default:
      return state
  }
}

