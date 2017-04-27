// @flow
let toNotify
let state = {
  companyAddress: null,
  companyConfirmedBalance: null,
  companyPendingBalance: null,
  companySeed: null,
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
  return Object.assign({}, state)
}

export function connect(notifyOfStateChange: (state: any) => void) {
  toNotify = notifyOfStateChange
}


export const stateUpdater = {
  addPayment(fileId: string, paymentId: string, paymentAmount: number) {
    const updatedFile = updateFile(fileId, paymentId, {
      amount: paymentAmount,
      status: 'processing',
    })
    updateState(mergeState({ files: Object.assign({}, state.files, { [fileId]: updatedFile }) }))
    updateState(mergeState({ companyPendingBalance: state.companyPendingBalance + paymentAmount }))
  },
  setCompanyAddress(address: string) {
    updateState(mergeState({
      companyAddress: address,
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
  updatePaymentStatus(fileId: string, paymentId: string, status: string) {
    updateState(mergeState({
      files: Object.assign({}, state.files, {
        [fileId]: updateFile(fileId, paymentId, { status }),
      }),
    }))
  },
}
