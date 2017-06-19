'use strict';

console.log('Loading function');

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

exports.handler = (event, context, callback) => {

    var params = {
        Item: {
            OrderId: parseInt(event.orderid),
            OrderDate: Date.now(),
            CustomerId: event.customerid,
            OrderType: event.ordertype,
            OrderStatus: "Not Confirmed",
            OrderItems: {
                "Item1": event.orderitem1,
                "Item2": event.orderitem2,
                "Item3": event.orderitem3,
                "Item4": event.orderitem4,
            },

            OrderTotal: event.ordertotal,
            PaymentType: event.paymenttype,
            PaymentDetails: {
                "cardnumber": event.cardnumber,
                "cardname": event.cardname,
                "zipcode": event.zipcode,
                "securitycode": event.securitycode,
                "billingaddress": event.billingaddress,
                "expirydate": event.expirydate
            },
            PaymentApproved: false

        },

        TableName: 'Orders'

    };

    console.log(params);

    docClient.put(params, function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, params);
        }

    }
    );
};
