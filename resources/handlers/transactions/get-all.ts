import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayEventDefaultAuthorizerContext } from 'aws-lambda';
import { randomUUID } from 'crypto';

const dynamodb = new DynamoDB({});

export async function getAll(authorizer?: APIGatewayEventDefaultAuthorizerContext) {
  const result = await dynamodb.send(
    new ScanCommand({
      TableName: process.env.TRANSACTIONS_TABLE_NAME,
    }),
  );
  await dynamodb.send(
    new PutCommand({
      TableName: process.env.AUDIT_TABLE_NAME,
      Item: {
        auditId: randomUUID(),
        user: { ...authorizer },
        time: Date.now,
        transactions: JSON.stringify(result.Items),
      },
    }),
  );

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items),
  };
}
