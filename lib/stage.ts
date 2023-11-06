import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AppStack } from './app-stack';

export class AppStage extends cdk.Stage {
  constructor(scope: Construct, stageName: string, props?: cdk.StageProps) {
    super(scope, stageName, props);

    const lambdaStack = new AppStack(this, 'LambdaStack', stageName);
  }
}
