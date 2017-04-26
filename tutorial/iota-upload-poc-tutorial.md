![PoC Overview](./images/poc-overview.png)

This is a tutorial on how to develop a proof-of-concept upload application using IOTA as a payment strategy. While IOTA was designed to enable the Internet-of-Things, its lack of fees also makes it great for micropayments, allowing it to be used for on-demand or pay-as-you-go services. In this tutorial, we will explore what a pay-as-you-go uploading service could look like.

We assume that you are already familiar with the basics of using the [IOTA JavaScript API](https://github.com/iotaledger/iota.lib.js) to generate addresses and make payments. If not, please review the [introductory level tutorial](https://learn.iota.org/tutorial/payments-and-messaging-leaderboard), and come back afterward to continue.

### Project Structure
The project is divided into client and server components, but we will focus only on the client, as it has all of the logic. In places, the client uses ES6 syntax, and the UI is developed using React. It is not necessary to be familiar with either, as the application logic is encapsulated from the UI. Those curious about the server code can review it directly, as it is short and commented.

### Setup
Ensure you have two seeds, including one to a wallet that has a balance.

## Functionality Overview
In this section, we’ll discuss the functionality we require and demonstrate how it is performed. There are two actors in this example, and both are shown on the same page. First, we will be simulating a company which is selling the upload service, and secondly, we will simulate a customer using that service.

### Company
The company is providing the upload service. To do this, the company will require a seed for the company wallet. Ideally, the company payment address would be provided to the client from the server, but in our case, it is easier to allow entry of the company seed in the UI. To do so, open the panel on the right hand side of the screen and enter in a seed.
Once the seed is entered, **the wallet data will be loaded** and a payment address will be generated. This will be populated in the main section of the application.

### Customer
To use the upload service, the customer must provide a seed to a wallet that has a balance. Once the balance is verified, the upload portion of the application becomes active. The upload component is provided by http://uppy.io which has a slick interface allowing for multiple resumable uploads. Once the customer starts to upload the files, the software will monitor the upload progress, and after the threshold of 1 mb has been reached, it will pause the upload and create a transaction with a payment based on the number of bytes uploaded. Once the transaction is successful, the upload resumes until the 1mb threshold has been met again. When the file is fully uploaded, one final payment is made. 

## Code
Now that we’ve had an overview of the application features, let’s take a look at some of the code. We will be focusing on the _wallet.js_, _payments.js_, _uploadManager.js_, and _uploader.js_ files. These files will be using APIs from [iota.lib.js](https://github.com/iotaledger/iota.lib.js) and [Uppy](https://github.com/transloadit/uppy). Feel free to review the docs for each if you need any further information. You will also likely notice the stateUpdater object in the following code samples. It is used to update the UI state.

### Generating the Company Address
When a Company seed is entered and the Set Seed button is clicked,the setCompanySeed function is called, which updates the UI and makes a standard call to the iota.lib.js API to generate the address. This should be familiar to anyone who has read the [leaderboard example](https://learn.iota.org/tutorial/payments-and-messaging-leaderboard). After the address is generated, the UI is updated again.

```javascript
export function setCompanySeed(seed) {
  // Update UI with Company seed
  stateUpdater.setCompanySeed(seed)

  // Deterministically generates a new address 
  // with checksum for the specified seed
  iota.api.getNewAddress(seed, { checksum: true }, (err, address) => {
    if (err) {
      // If there was an error generating an address
      // reset the seed to allow for reentry
      stateUpdater.setCompanySeed(null)
    } else {
      // Update the UI with the Company address
      stateUpdater.setCompanyAddress(address)
    }
  })
}
```

### Verifying the Customer Balance
To verify the Customer balance, the Customer will need to enter a seed. Once the seed is entered, the UI is updated with seed, the account information is retrieved from the API, and the Customer balance is set in the UI.

```javascript
export function setCustomerSeed(seed) {
  // Update UI with Customer seed
  stateUpdater.setCustomerSeed(seed)

  // Gets account information for the specified seed
  iota.api.getAccountData(seed, (err, accountData) => {
    if (err) {
      // If there was an error getting the account data
      // reset the seed to allow for reentry
      stateUpdater.setCustomerSeed(null)
    } else {
      // Update the UI with the Customer balance
      stateUpdater.setCustomerBalance(accountData.balance)
    }
  })
}
```

### Uploading a File


## Exercises
1.	IOTA addresses are secure for multiple payments as long as nobody spends from the address. To ensure that a company can spend in the middle of an upload:
    1.	generate a new address for each payment
    1.	add the file id as a message to the transaction so that transactions can be rolled up into a full payment.
1.	Next

