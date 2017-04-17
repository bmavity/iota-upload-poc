import Iota from 'iota.lib.js'

import { iotaConfig } from '../../../shared/config'

const wallet = new Iota(iotaConfig)


// eslint-disable-next-line import/prefer-default-export
export function getAccountBalance(seed, cb) {
  wallet.api.getAccountData(seed, (err, accountData) => {
    if (err) return cb(err)

    let address
    console.log('Account data', accountData)

    // Update address
    if (!address && accountData.addresses[0]) {
      address = wallet.utils.addChecksum(accountData.addresses[accountData.addresses.length - 1])
    }

    const balance = accountData.balance
    return cb(null, balance)
  })
}
