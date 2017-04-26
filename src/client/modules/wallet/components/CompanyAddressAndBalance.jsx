// @flow
import React from 'react'

import styles from './WalletSidebar.css'

const CompanyAddressAndBalance = ({ companyBalance,
  hasCustomerAddress }: { companyBalance: ?number, hasCustomerAddress: boolean }) => {
  const itemClass = hasCustomerAddress ? 'active' : ''
  const collapseClass = hasCustomerAddress ? 'in' : ''

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

export default CompanyAddressAndBalance
