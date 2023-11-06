import * as PearCicdStack from '../lib/pear-cicd-stack';
import { App } from 'aws-cdk-lib';

test('DynamoDB Table Created', () => {
  const app = new App();
  const stack = new PearCicdStack.PearPipelineStack(app, 'TestStack');

  // Use Jest's expect to make assertions
  expect(stack.node.children.length).toBe(3); // Modify the number according to your actual number of resources
});
