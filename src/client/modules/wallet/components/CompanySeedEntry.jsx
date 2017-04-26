// @flow
import React from 'react'

import styles from './WalletSidebar.css'

type Props = {
  companySeed: string,
  hasSeedSet: boolean,
  setCompanySeed: (seed: string) => void,
  updateSeedValue: (evt: Event & { currentTarget: HTMLInputElement }) => void,
}

const CompanySeedEntry = ({ hasSeedSet, companySeed, setCompanySeed, updateSeedValue }: Props) => {
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

export default CompanySeedEntry
