// @flow
import React from 'react'

import styles from './WalletSidebar.css'

const PaymentAddressAndBalance = ({ companyBalance,
  hasPaymentAddress }: { companyBalance: ?number, hasPaymentAddress: boolean }) => {
  const itemClass = hasPaymentAddress ? 'active' : ''
  const collapseClass = hasPaymentAddress ? 'in' : ''

  return (
    <li className={`${styles.sidebarItem} ${itemClass} ${styles.companyBalance}`}>
      <div className={`collapse ${collapseClass}`}>
        <div className="well">
          <div className="form-group">
            <h3>Payment Received: <span>{companyBalance}</span></h3>
          </div>
        </div>
      </div>
    </li>
  )
}

export default PaymentAddressAndBalance
