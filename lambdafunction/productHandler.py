import json
import boto3
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('productData')

def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError

def lambda_handler(event, context):
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'content-type,authorization'
    }

    method = event.get('httpMethod') or event.get('requestContext', {}).get('http', {}).get('method', '')
    print("HTTP Method received:", method)

    print("HTTP Method received:", method)

    if method == 'GET':
        response = table.scan()
        items = response['Items']
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps(items, default=decimal_default)
        }

    else:
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps('Method bghdxgdxc not allowed')
        }
