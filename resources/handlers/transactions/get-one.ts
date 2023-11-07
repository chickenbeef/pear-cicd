import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayEventDefaultAuthorizerContext } from 'aws-lambda';
import { randomUUID } from 'crypto';

const dynamodb = new DynamoDB({});

export async function getOne({ id }: { id: string }, authorizer?: APIGatewayEventDefaultAuthorizerContext) {
  const result = await dynamodb.send(
    new GetCommand({
      TableName: process.env.TRANSACTIONS_TABLE_NAME,
      Key: {
        transactionId: `${id}`,
      },
    }),
  );

  // transaction not found, return a 404
  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Transaction not found' }),
    };
  }
  await dynamodb.send(
    new PutCommand({
      TableName: process.env.AUDIT_TABLE_NAME,
      Item: {
        auditId: randomUUID(),
        user: { ...authorizer },
        time: Date.now,
        transactions: JSON.stringify(result.Item),
      },
    }),
  );

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
}
