export const stateStorageKey = 'syno-music-app'

/**
 * Save the state object to local storage
 * @param Object state 
 */
export const saveStateToLocalStorage = (state) => {
    try {
      // TODO : Choose what to store in localStorage
      const serializedState = JSON.stringify({ profiles: state.profiles })
      localStorage.setItem(stateStorageKey, serializedState)
    } catch (err) {
      // Ignore write errors.
      console.error(err)
    }
  }