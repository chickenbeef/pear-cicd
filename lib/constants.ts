import { JsonSchemaType } from 'aws-cdk-lib/aws-apigateway';

export const ACCOUNT = '269051030962'
// export const ACCOUNT = '709608147459'

export const REGION = 'eu-west-1'

export const REQUEST_JSON_SCHEMA = {
  type: JsonSchemaType.OBJECT,
  required: ['transaction-id', 'merchant-id', 'amount', 'card', 'datetime', 'user'],
  properties: {
    'transaction-id': { type: JsonSchemaType.INTEGER },
    'merchant-id': { type: JsonSchemaType.INTEGER },
    amount: { type: JsonSchemaType.INTEGER },
    datetime: { type: JsonSchemaType.STRING },
    user: {
      type: JsonSchemaType.OBJECT,
      properties: {
        id: { type: JsonSchemaType.STRING },
        name: { type: JsonSchemaType.STRING },
        surname: { type: JsonSchemaType.STRING },
      },
    },
    card: {
      type: JsonSchemaType.OBJECT,
      properties: {
        number: { type: JsonSchemaType.INTEGER },
        'expiry-date': { type: JsonSchemaType.STRING },
      },
    },
  },
};
