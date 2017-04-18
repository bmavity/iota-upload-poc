import React, { PropTypes } from 'react'

import styles from './WalletSidebar.css'

const CompanySeedEntry = ({ hasSeedSet, companySeed, setCompanySeed, updateSeedValue }) => {
  const seedActiveClass = hasSeedSet ? '' : 'active'
  const seedCollapseClass = hasSeedSet ? '' : 'in'
  const seedValue = hasSeedSet ? '' : companySeed

  return (
    <li className={`${styles.sidebarItem} ${seedActiveClass}`}>
      <div className={`collapse ${seedCollapseClass}`}>
        <div className="well">
          <div className="form-group">
            <input
              type="password"
              value={seedValue}
              className="form-control"
              placeholder="Company Seed"
              onChange={updateSeedValue}
            />
          </div>
          <button type="button" className="btn btn-default" onClick={setCompanySeed}>
            Set Seed
          </button>
        </div>
      </div>
    </li>
  )
}
CompanySeedEntry.propTypes = {
  // eslint-disable-next-line react/require-default-props
  companySeed: PropTypes.string,
  hasSeedSet: PropTypes.bool.isRequired,
  setCompanySeed: PropTypes.func.isRequired,
  updateSeedValue: PropTypes.func.isRequired,
}

export default CompanySeedEntry
