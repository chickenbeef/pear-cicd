import { APIGatewayProxyEvent } from 'aws-lambda';
import { getAll } from '../handlers/transactions/get-all';
import { create } from '../handlers/transactions/create';

export const handler = async (event: APIGatewayProxyEvent) => {
  console.log(`Caller: ${JSON.stringify(event.requestContext.authorizer)}`);
  try {
    // Handle different HTTP methods
    switch (event.httpMethod) {
      case 'GET':
        return await getAll(event.requestContext.authorizer);
      case 'POST':
        return await create(event.body);
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Invalid HTTP method' }),
        };
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};
