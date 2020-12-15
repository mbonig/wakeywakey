import { SynthUtils } from '@aws-cdk/assert';
import { App, Stack } from '@aws-cdk/core';
import { WakeyWakey } from '../src/wakeywakey';

test('default snapshot', () => {
  const app = new App();
  const stack = new Stack(app, 'test-stack');
  // WHEN
  new WakeyWakey(stack, 'wakeywakey', { instanceId: 'asdfasdfasdf' });

  // THEN
  expect(SynthUtils.synthesize(stack)).toMatchSnapshot();
});

test('overriden cronoptions', () => {
  const app = new App();
  const stack = new Stack(app, 'test-stack');
  // WHEN
  new WakeyWakey(stack, 'wakeywakey', {
    instanceId: 'wakeywakey',
    schedule: {
      minute: '15',
      hour: '4',
    },
  });

  // THEN
  expect(SynthUtils.synthesize(stack)).toMatchSnapshot();
});
