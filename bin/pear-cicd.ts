#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PearPipelineStack as PearCiCdStack } from '../lib/pear-cicd-stack';
import { ACCOUNT, REGION } from '../lib/constants';

const app = new cdk.App();
new PearCiCdStack(app, 'PearCiCdStack', {
  env: {
    account: ACCOUNT,
    region: REGION,
  }
});

app.synth();