import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';
import { ITransaction } from '../../../types';

const dynamodb = new DynamoDB({});

export async function create(body: string | null) {
  const uuid = randomUUID();

  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing body' }),
    };
  }

  // Parse the body and validate types
  const bodyParsed = JSON.parse(body) as ITransaction;

  await dynamodb.send(
    new PutCommand({
      TableName: process.env.TRANSACTIONS_TABLE_NAME,
      Item: {
        transactionId: `${uuid}`,
        ...bodyParsed,
      },
    }),
  );

  console.log(`Transaction saved ${uuid}`);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Transaction Saved' }),
  };
}
