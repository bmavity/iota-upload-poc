// @flow
import Iota from 'iota.lib.js'

import { iotaConfig } from '../../../shared/config'

const wallet = new Iota(iotaConfig)


// eslint-disable-next-line import/prefer-default-export
export function getAccountBalance(seed: string, cb: (err: ?Error, balance: ?number) => void) {
  wallet.api.getAccountData(seed, (err, accountData) => {
    if (err) return cb(err)

    return cb(null, accountData.balance)
  })
}

export function generateAddress(seed: string, cb: (err: ?Error, address: ?string) => void) {
  wallet.api.getNewAddress(seed, { checksum: true }, (err, address) => {
    if (err) return cb(err)

    return cb(null, address)
  })
}

// eslint-disable-next-line max-len
export function makePayment(paymentSeed: string, paymentAddress: string, value: number, cb: (err: ?Error, value: ?number) => void) {
  const transfer = [{
    address: paymentAddress,
    value: parseInt(value, 10),
  }]

  // eslint-disable-next-line no-console
  console.log('Sending Transfer', transfer)

  // We send the transfer from this seed, with depth 4 and minWeightMagnitude 18
  wallet.api.sendTransfer(paymentSeed, 4, 18, transfer, (err) => {
    if (err) return cb(err)

    return cb(null, value)
  })
}
