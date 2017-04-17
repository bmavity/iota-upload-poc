import { getAccountBalance } from '../../modules/wallet'

let toNotify
let state = {
  companySeed: null,
}

function updateState(updatedState) {
  state = updatedState
  toNotify(state)
}

function mergeState(patch) {
  return Object.assign({}, state, patch)
}

export function getAppState() {
  return state
}

export function connect(notifyOfStateChange) {
  toNotify = notifyOfStateChange
}

export const appActions = {
  setCompanySeed(seed) {
    updateState(mergeState({
      companySeed: seed,
    }))

    getAccountBalance(seed, (err, balance) => {
      if (err) {
        updateState({ companySeed: null })
      } else {
        updateState({ companyBalance: balance })
      }
    })
  },
}
