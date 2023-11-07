import { APIGatewayProxyEvent } from 'aws-lambda';
import { getAll } from '../handlers/audit/get-all';

export const handler = async (event: APIGatewayProxyEvent) => {
  console.log(`Caller: ${JSON.stringify(event.requestContext.authorizer)}`);
  try {
    // Handle different HTTP methods
    switch (event.httpMethod) {
      case 'GET':
        return await getAll();
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
