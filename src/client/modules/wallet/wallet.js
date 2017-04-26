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


// eslint-disable-next-line max-len
export function makePayment(paymentSeed, customerAddress, value, cb) {
  const transfer = [{
    address: customerAddress,
    value: parseInt(value, 10),
  }]

  // eslint-disable-next-line <no-consol></no-consol>e
  console.log('Sending Transfer', transfer)

  // We send the transfer from this seed, with depth 4 and minWeightMagnitude 18
  iota.api.sendTransfer(paymentSeed, 4, 18, transfer, (err) => {
    if (err) return cb(err)

    return cb(null, value)
  })
}

export function setCompanySeed(seed) {
  // Update UI with Company seed
  stateUpdater.setCompanySeed(seed)

  // Deterministically generates a new address
  // with checksum for the specified seed
  iota.api.getNewAddress(seed, { checksum: true }, (err, address) => {
    if (err) {
      // If there was an error generating an address
      // reset the seed to allow for reentry
      stateUpdater.setCompanySeed(null)
    } else {
      // Update the UI with the Company address
      stateUpdater.setCompanyAddress(address)
    }
  })
}

export function setCustomerSeed(seed) {
  // Update UI with Customer seed
  stateUpdater.setCustomerSeed(seed)

  // Gets account information for the specified seed
  iota.api.getAccountData(seed, (err, accountData) => {
    if (err) {
      // If there was an error getting the account data
      // reset the seed to allow for reentry
      stateUpdater.setCustomerSeed(null)
    } else {
      // Update the UI with the Customer balance
      stateUpdater.setCustomerBalance(accountData.balance)
    }
  })
}
