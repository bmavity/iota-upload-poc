// @flow
import React from 'react'

import styles from './WalletSidebar.css'

const CompanyAddressAndBalance = ({ companyBalance,
  hasCompanyAddress }: { companyBalance: ?number, hasCompanyAddress: boolean }) => {
  const itemClass = hasCompanyAddress ? 'active' : ''
  const collapseClass = hasCompanyAddress ? 'in' : ''

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
