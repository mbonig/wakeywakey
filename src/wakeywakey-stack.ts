import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { WakeyWakey } from './wakeywakey';

export class WakeywakeyStack extends Stack {

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new WakeyWakey(this, 'nighty-night', { instanceId: 'i-123123123123' });
  }
}
