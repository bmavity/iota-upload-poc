import Iota from 'iota.lib.js'

import { iotaConfig } from '../../../shared/config'

console.log(Iota)

const wallet = new Iota(iotaConfig)

console.log(wallet)

// eslint-disable-next-line import/prefer-default-export
export function getAccountBalance(seed) {
  wallet.api.getAccountData(seed, (err, accountData) => {
    let address
    console.log('Account data', accountData)

    // Update address
    if (!address && accountData.addresses[0]) {
      address = wallet.utils.addChecksum(accountData.addresses[accountData.addresses.length - 1])

      // updateAddressHTML(address)
    }

    const balance = accountData.balance
    console.log(balance)

    // Update total balance
    // updateBalanceHTML(balance)
  })
}
