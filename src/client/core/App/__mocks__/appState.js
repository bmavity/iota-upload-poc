// eslint-disable-next-line import/prefer-default-export
export const appState = jest.genMockFromModule('../appState')

export const stateUpdater = {
  addPayment: jest.fn(),
  updatePaymentStatus: jest.fn(),
}

appState.stateUpdater = stateUpdater
