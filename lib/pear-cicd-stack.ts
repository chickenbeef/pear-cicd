import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep, Step } from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { AppStage } from './stage';
import { ACCOUNT, REGION } from './constants';

export class PearPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'PearPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('chickenbeef/pear-cicd', 'main'), //Remember to change
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });

    const testingStage = pipeline.addStage(
      new AppStage(this, 'test', {
        env: { account: ACCOUNT, region: REGION },
      }),
    );

    testingStage.addPre(new ShellStep('Run Unit Tests', { commands: ['npm install', 'npm test'] }));
    testingStage.addPost(new ManualApprovalStep('Manual approval before production'));

    const prodStage = pipeline.addStage(
      new AppStage(this, 'prod', {
        // This would ideally be a separate prod account
        env: { account: ACCOUNT, region: REGION },
      }),
    );
  }
}
