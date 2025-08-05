import json
import boto3
from datetime import datetime
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ordersData')

def lambda_handler(event, context):
    print("xominf hwe")
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*'
    }

    try:
        body = json.loads(event['body'])
        body['orderId'] = str(uuid.uuid4())
        body['orderTime'] = datetime.utcnow().isoformat()

        table.put_item(Item=body)

        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'message': 'Order placed'})
        }
    except Exception as e:
        print("printing exception")
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }
