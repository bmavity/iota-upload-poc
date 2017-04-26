import { appActions, stateUpdater } from '../appState'
import { getAccountBalance, makePayment } from '../../../modules/wallet'

jest.mock('../../../modules/wallet/wallet')

const argNames = {
  companyAddress: 1,
  paymentAmount: 2,
  customerSeed: 0,
}

function getArgValue(mockFunc, arg) {
  return mockFunc.mock.calls[0][argNames[arg]]
}


describe('appActions, when making a payment', () => {
  beforeAll(() => {
    getAccountBalance.mockImplementation((_, cb) => cb(null, null))

    // This needs to be migrated to wallet tests
    stateUpdater.setCompanySeed('company seed')
    stateUpdater.setCompanyAddress('company address')
    stateUpdater.setCustomerSeed('customer seed')
    appActions.makePayment('a file id', 57)
  })

  it('should have the proper seed', () => {
    expect(getArgValue(makePayment, 'customerSeed')).toBe('customer seed')
  })

  it('should send to the proper address', () => {
    expect(getArgValue(makePayment, 'companyAddress')).toBe('company address')
  })

  it('should have the proper amount', () => {
    expect(getArgValue(makePayment, 'paymentAmount')).toBe(57)
  })
})
