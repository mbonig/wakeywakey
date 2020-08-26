#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { WakeywakeyStack } from '../lib/wakeywakey-stack';

const app = new cdk.App();
new WakeywakeyStack(app, 'WakeywakeyStack', {});
