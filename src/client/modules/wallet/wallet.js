import Iota from 'iota.lib.js'

import { iotaConfig } from '../../../shared/config'

const wallet = new Iota(iotaConfig)


// eslint-disable-next-line import/prefer-default-export
export function getAccountBalance(seed, cb) {
  wallet.api.getAccountData(seed, (err, accountData) => {
    if (err) return cb(err)

    return cb(null, accountData.balance)
  })
}

export function generateAddress(seed, cb) {
  wallet.api.getNewAddress(seed, { checksum: true }, (err, address) => {
    if (err) return cb(err)

    return cb(null, address)
  })
}
