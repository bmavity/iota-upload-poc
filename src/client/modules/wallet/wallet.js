import Iota from 'iota.lib.js'

import { stateUpdater } from '../../core/App'
import { iotaConfig } from '../../../shared/config'

const iota = new Iota(iotaConfig)


export function generateAddress(seed, cb) {
  iota.api.getNewAddress(seed, { checksum: true }, (err, address) => {
    if (err) return cb(err)

    return cb(null, address)
  })
}

export function getAccountBalance(seed, cb) {
  iota.api.getAccountData(seed, (err, accountData) => {
    if (err) return cb(err)

    return cb(null, accountData.balance)
  })
}

// eslint-disable-next-line max-len
export function makePayment(paymentSeed, paymentAddress, value, cb) {
  const transfer = [{
    address: paymentAddress,
    value: parseInt(value, 10),
  }]

  // eslint-disable-next-line no-console
  console.log('Sending Transfer', transfer)

  // We send the transfer from this seed, with depth 4 and minWeightMagnitude 18
  iota.api.sendTransfer(paymentSeed, 4, 18, transfer, (err) => {
    if (err) return cb(err)

    return cb(null, value)
  })
}

export function setCompanySeed(seed) {
  stateUpdater.setCompanySeed(seed)

  iota.api.getNewAddress(seed, { checksum: true }, (err, address) => {
    if (err) {
      stateUpdater.setCompanySeed(null)
    } else {
      stateUpdater.setCompanyAddress(address)
    }
  })
}
