import React, { PropTypes } from 'react'

import styles from './WalletSidebar.css'

const AddressGenerationMessage = ({ isGeneratingAddress }) => {
  const itemClass = isGeneratingAddress ? 'active' : ''
  const collapseClass = isGeneratingAddress ? 'in' : ''

  return (
    <li className={`${styles.sidebarItem} ${itemClass}`}>
      <div className={`collapse ${collapseClass}`}>
        <div className="genAddress__div">
          <div id="overlay">
            <div className="panel panel-danger">
              <div className="panel-heading">Generating Address</div>
              <div className="panel-body">
                <p>
                  Currently generating your payment address. This can take
                  anywhere between 1 - 20 minutes
                  so be patient. Once your address is generated, it will
                  appear in the Payment Information section.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
AddressGenerationMessage.propTypes = {
  isGeneratingAddress: PropTypes.bool.isRequired,
}

export default AddressGenerationMessage
