// @flow
import { makePayment } from '../../modules/wallet'

let toNotify
let state = {
  companyBalance: null,
  companySeed: null,
  customerAddress: null,
  customerBalance: null,
  customerSeed: null,
  files: {},
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

function updateFile(fileId, paymentId, payment) {
  const file = state.files[fileId] || { payments: {} }
  return Object.assign({}, file, {
    payments: Object.assign({}, file.payments, {
      [paymentId]: payment,
    }),
  })
}

export function getAppState() {
  return state
}

export function connect(notifyOfStateChange: (state: any) => void) {
  toNotify = notifyOfStateChange
}

export const appActions = {
  makePayment(fileId: string, paymentAmount: number) {
    const file = state.files[fileId]
    const payments = (file && file.payments) || {}
    const paymentId = Object.keys(payments).length + 1
    const updatedFile = updateFile(fileId, paymentId, {
      amount: paymentAmount,
      status: 'processing',
    })

    // eslint-disable-next-line no-console
    console.log(file, payments, updatedFile)
    updateState(mergeState({ files: Object.assign({}, state.files, { [fileId]: updatedFile }) }))

    makePayment(state.customerSeed, state.customerAddress, paymentAmount, (err) => {
      updateState(mergeState({
        files: Object.assign({}, state.files, {
          [fileId]: updateFile(fileId, paymentId, {
            status: err ? 'error' : 'pending',
          }),
        }),
      }))
    })
  },
}


export const stateUpdater = {
  setCompanyAddress(address: string) {
    updateState(mergeState({
      customerAddress: address,
    }))
  },
  setCompanySeed(seed: string) {
    updateState(mergeState({
      companySeed: seed,
    }))
  },
  setCustomerBalance(balance: ?number) {
    updateState(mergeState({
      customerBalance: balance,
    }))
  },
  setCustomerSeed(seed: string) {
    updateState(mergeState({
      customerSeed: seed,
    }))
  },
}
