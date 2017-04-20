// eslint-disable-next-line import/prefer-default-export
export const appState = jest.genMockFromModule('../appState')

export const appActions = {
  makePayment: jest.fn(),
}

appState.appActions = appActions
