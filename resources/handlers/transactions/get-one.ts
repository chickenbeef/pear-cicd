import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { GetCommand } from '@aws-sdk/lib-dynamodb';

const dynamodb = new DynamoDB({});

export async function getOne({ id }: { id: string }) {
  console.log('Stage Name is: ' + process.env.stage);
  const result = await dynamodb.send(
    new GetCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        transactionId: `${id}`,
      },
    })
  );

  // transaction not found, return a 404
  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Transaction not found' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
}