import React, { Component, PropTypes } from 'react'

import styles from './WalletSidebar.css'


export default class WalletSidebar extends Component {
  static propTypes = {
    companyBalance: PropTypes.number.isRequired,
    companySeed: PropTypes.string.isRequired,
    setCompanySeed: PropTypes.func.isRequired,
  }

  state = {
    companySeed: '',
  }

  updateSeedValue(evt) {
    const companySeed = evt.target.value
    this.setState(() => ({ companySeed }))
  }

  render() {
    const { companyBalance, companySeed, setCompanySeed } = this.props
    const seedValue = companySeed ? '' : this.state.companySeed
    const seedActiveClass = companySeed ? '' : 'active'
    const seedCollapseClass = companySeed ? '' : 'in'
    const balanceActiveClass = companySeed ? 'active' : ''
    const balanceCollapseClass = companySeed ? 'in' : ''

    return (
      <div className={styles.sidebar}>
        <h2>Company Wallet</h2>
        <ul className={styles.sidebarList}>
          <li className={`${styles.sidebarItem} ${seedActiveClass}`}>
            <div className={`collapse ${seedCollapseClass}`}>
              <div className="well">
                <div className="form-group">
                  <input
                    type="password"
                    value={seedValue}
                    className="form-control"
                    placeholder="Company Seed"
                    onChange={evt => this.updateSeedValue(evt)}
                  />
                </div>
                <button type="button" className="btn btn-default" onClick={() => setCompanySeed(this.state.companySeed)}>
                  Set Seed
                </button>
              </div>
            </div>
          </li>
          <li className={`${styles.sidebarItem} ${balanceActiveClass} ${styles.companyBalance}`}>
            <div className={`collapse ${balanceCollapseClass}`}>
              <div className="well">
                <div className="form-group">
                  <h3>Balance: <span>{companyBalance}</span></h3>
                </div>
              </div>
            </div>
          </li>
          <li className={`${styles.sidebarItem}`}> {
            // eslint-disable-next-line jsx-a11y/href-no-hash
          } <a href="#" className={styles.sidebarAnchor} data-toggle="collapse" data-target="#getAddresses" aria-expanded="false" aria-controls="getAddresses">My Addresses</a>
            <div className="collapse" id="getAddresses">
              <div className="genAddress__div">
                <div id="overlay">
                  <div className="panel panel-danger">
                    <div className="panel-heading">Generating Address</div>
                    <div className="panel-body">
                      <p>
                        Currently generating your address. This can take
                        anywhere between 1 - 20minutes
                        so be patient. Once your address was generated this note will disappear.
                      </p>
                    </div>
                  </div>
                </div>
                <button type="button" id="genAddress" className="btn btn-success">Generate Address</button>
                <div id="allAddresses" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}
