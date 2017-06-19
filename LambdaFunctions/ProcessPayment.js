'use strict';

console.log('Loading function');


exports.handler = (event, context, callback) => {
    console.log(event);

    if (event.Item.PaymentDetails.cardnumber === "1111111111111111") {

        callback(null, { "paymentSuccess": true, "params": event });
        //callback('Something went wrong');
    } else {
        callback(null, { "paymentSuccess": false, "params": event });
    }
};
