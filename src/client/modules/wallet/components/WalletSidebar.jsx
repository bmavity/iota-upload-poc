import React, { Component, PropTypes } from 'react'

import styles from './WalletSidebar.css'


export default class WalletSidebar extends Component {
  static propTypes = {
    setCompanySeed: PropTypes.func.isRequired,
  }

  state = {
    companySeed: '',
  }

  updateSeed(evt) {
    const companySeed = evt.target.value
    this.setState(() => ({ companySeed }))
  }

  render() {
    const { setCompanySeed } = this.props

    return (
      <div className={styles.sidebar}>
        <h2>Company Wallet</h2>
        <ul className={styles.sidebarList}>
          <li className={`${styles.sidebarItem} active`}> {
            // eslint-disable-next-line jsx-a11y/href-no-hash
          } <a href="#" className={styles.sidebarAnchor} data-toggle="collapse" data-target="#setSeed" aria-expanded="false" aria-controls="setSeed">Seed to Receive Payment</a>
            <div className="collapse in" id="setSeed">
              <div className="well" id="enterSeed">
                <div className="form-group">
                  <input type="password" value={this.state.companySeed} className="form-control" placeholder="Company Seed" onChange={evt => this.updateSeed(evt)} />
                </div>
                <button type="button" id="seedSubmit" className="btn btn-default" onClick={() => setCompanySeed(this.state.companySeed)}>
                  Set Seed
                </button>
              </div>
            </div>
          </li>
          <li className={`${styles.sidebarItem} active`}> {
            // eslint-disable-next-line jsx-a11y/href-no-hash
          } <a href="#" className={styles.sidebarAnchor} data-toggle="collapse" data-target="#getAddresses" aria-expanded="false" aria-controls="getAddresses">My Addresses</a>
            <div className="collapse in" id="getAddresses">
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
