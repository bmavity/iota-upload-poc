// @flow
import { generateAddress, getAccountBalance, makePayment } from '../../modules/wallet'

let toNotify
let state = {
  companyBalance: null,
  companySeed: null,
  files: {},
  paymentAddress: null,
  paymentBalance: null,
  paymentSeed: null,
}

function updateState(updatedState) {
  state = updatedState
  if (toNotify) {
    toNotify(state)
  }
}

function mergeState(patch) {
  return Object.assign({}, state, patch)
}

export function getAppState() {
  return state
}

export function connect(notifyOfStateChange: (state: any) => void) {
  toNotify = notifyOfStateChange
}

export const appActions = {
  makePayment(fileId: string, paymentAmount: number) {
    updateState(mergeState({
      files: Object.assign({}, state.files, { fileId: { isProcessingPayment: true } }),
    }))
    makePayment(state.paymentSeed, state.paymentAddress, paymentAmount, (err) => {
      console.log(err)
    })
  },

  setCompanySeed(seed: string) {
    updateState(mergeState({
      companySeed: seed,
    }))

    generateAddress(seed, (err, paymentAddress) => {
      if (err) {
        updateState(mergeState({ companySeed: null }))
      } else {
        updateState(mergeState({ paymentAddress }))
      }
    })
  },

  setPaymentSeed(seed: string) {
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
