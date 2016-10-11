export default function usersReducer(state=[], action) {
  switch (action.type) {
    case 'FETCH_USERS':
      return action.payload
    case 'NEW_USER':
      return [...state, action.payload]
    case 'CHANGE_USER':
      let changedUserIndex = state.findIndex( user => user.id === action.payload.id )
      return [...state.slice(0,changedUserIndex), action.payload, ...state.slice(changedUserIndex+1)]
    case 'DESTROY_USER':
      let userIndex = state.findIndex(user => parseInt(user.id, 10) === action.payload)
      return [...state.slice(0, userIndex), ...state.slice(userIndex + 1)]
    default:
      return state
  }
}

