import json
import os
from urllib.parse import parse_qsl
try:
    from botocore.vendored import requests
except ImportError:
    import requests



HOSTNAME = os.environ.get('hostname', 'https://underdog.0x3c.net');



def lambda_handler(event, context):
    # read the cart
    try:
        body = parse_qsl(event.get('body'))
        for (key, val) in body:
            if key == 'cart':
                cart = json.loads(val)
                break
        else:
            return response("Failed to parameters", 401)
    except Exception:
        return response("Failed to read cart", 401)

    # validate prices
    r = requests.get("{}/shop_inventory.json".format(HOSTNAME))
    if r.status_code != 200:
        return response("Failed to read item prices", 500)
    schema = r.json()
    for item in cart['items']:
        if item['price'] != schema[item['name']]:
            return response("Invalid price detected")

    return response("Cart validated successfully")

def response(body, status=200):
    return {
        'isBase64Encoded': False,
        'statusCode': status,
        'headers': {'Content-type': 'text/plain'},
        'body': body
        }

