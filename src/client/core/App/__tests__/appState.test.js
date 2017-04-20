import { appActions } from '../appState'
import { generateAddress, getAccountBalance, makePayment } from '../../../modules/wallet'

jest.mock('../../../modules/wallet/wallet')

const argNames = {
  paymentAddress: 1,
  paymentAmount: 2,
  paymentSeed: 0,
}

function getArgValue(mockFunc, arg) {
  return mockFunc.mock.calls[0][argNames[arg]]
}


describe('appActions, when making a payment', () => {
  beforeAll(() => {
    generateAddress.mockImplementation((_, cb) => cb(null, 'payment address'))
    getAccountBalance.mockImplementation((_, cb) => cb(null, null))

    appActions.setCompanySeed('company seed')
    appActions.setPaymentSeed('payment seed')
    appActions.makePayment('a file id', 57000000)
  })

  it('should have the proper seed', () => {
    expect(getArgValue(makePayment, 'paymentSeed')).toBe('payment seed')
  })

  it('should send to the proper address', () => {
    expect(getArgValue(makePayment, 'paymentAddress')).toBe('payment address')
  })

  it('should have the proper amount', () => {
    expect(getArgValue(makePayment, 'paymentAmount')).toBe(57)
  })
})
