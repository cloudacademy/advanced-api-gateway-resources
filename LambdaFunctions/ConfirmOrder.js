'use strict';

console.log('Loading function');

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

exports.handler = (event, context, callback) => {


    var params = {
        Key: { OrderId: event.params.Item.OrderId },
        AttributeUpdates: {
            OrderStatus: {
                Action: 'PUT',
                Value: 'Confirmed'
            },
            PaymentApproved: {
                Action: 'PUT',
                Value: true
            }
        },
        TableName: event.params.TableName,
        ReturnValues: 'ALL_NEW'
    };

    //update the table
    docClient.update(params, function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, { "paymentSuccess": event.paymentSuccess, "params": event.params });
        }

    }
    );
};
