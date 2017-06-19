'use strict';

console.log('Loading function');

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    var outputMessage = "";
    var ordertype = event.params.Item.OrderType.toLowerCase();
    if (event.paymentSuccess === true) {

        outputMessage = event.params.Item.PaymentDetails.cardname + ", Thank you for your order - it will be ready for " + ordertype + " in 15 minutes";
    } else {
        outputMessage = event.params.Item.PaymentDetails.cardname + ", Sorry your payment didn't go through, please try again...";

    }

    callback(null, { "orderstatusText": outputMessage });

};
