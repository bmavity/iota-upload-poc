// @flow
import React from 'react'

import sharedStyles from './WalletSidebar.css'
import styles from './CompanyAddressAndBalance.css'

type Props = {
  companyConfirmedBalance: ?number,
  companyPendingBalance: ?number,
  hasCompanyAddress: boolean,
}


// eslint-disable-next-line max-len
const CompanyAddressAndBalance = ({ companyConfirmedBalance, companyPendingBalance, hasCompanyAddress }: Props) => {
  const itemClass = hasCompanyAddress ? 'active' : ''
  const collapseClass = hasCompanyAddress ? 'in' : ''

  return (
    <li className={`${sharedStyles.sidebarItem} ${itemClass} ${styles.companyBalance}`}>
      <div className={`collapse ${collapseClass}`}>
        <div className="well">
          <div className="form-group">
            <h3 className={styles.balanceHeader}>Payment Received</h3>
            <p>Confirmed: {companyConfirmedBalance === null ? '--' : companyConfirmedBalance}</p>
            <p>Pending: {companyPendingBalance === null ? '--' : companyPendingBalance}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CompanyAddressAndBalance
