const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox',
    client_id: 'AQxnA0ZFAGtRPYksEsMTb8xevy86JZHsNVW8z8Ik6CpAtOr-jbPmOtrr-JiI1Izd1oFnrCKcc2u6wkxf',
    client_secret: 'EGwLpB8tdlYmTEFW8PDJV_-Jq8kesiWPPSkp_m9YuIGSFdwv2CcaPyWYcPedIyasbJViDZR--aa8yLg-'
})

module.exports = paypal;