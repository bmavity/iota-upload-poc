import { getAccountBalance } from '../../modules/wallet'

let toNotify
let state = {
  companyBalance: null,
  companySeed: null,
  paymentAddress: null,
  paymentBalance: null,
  paymentSeed: null,
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
        updateState(mergeState({ companySeed: null }))
      } else {
        updateState(mergeState({ companyBalance: balance, paymentAddress: 'hi' }))
      }
    })
  },

  setPaymentSeed(seed) {
    updateState(mergeState({
      paymentSeed: seed,
    }))

    getAccountBalance(seed, (err, balance) => {
      if (err) {
        updateState(mergeState({ paymentSeed: null }))
      } else {
        updateState(mergeState({ paymentBalance: balance }))
      }
    })
  },
}
