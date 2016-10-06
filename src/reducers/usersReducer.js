export default function usersReducer(state=[], action) {
  switch (action.type) {
    case 'FETCH_USERS':
      return action.payload
    case 'NEW_USER':
      return [...state, action.payload]
    case 'CHANGE_USER':
      //find this user in state, by their id
      //reassign their attributes (nickname, room_id)
      //return new state with all users 
      let changedUserIndex = state.findIndex( user => user.id === action.payload.id )
      return [...state.slice(0,changedUserIndex), action.payload, ...state.slice(changedUserIndex+1)]
    default:
      return state
  }
}

