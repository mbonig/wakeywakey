import { CronOptions, Rule, RuleTargetInput, Schedule } from "@aws-cdk/aws-events";
import { Arn, Construct, Stack } from "@aws-cdk/core";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import { join } from "path";
import { LambdaFunction } from "@aws-cdk/aws-events-targets";
import { Ec2 } from "cdk-iam-floyd";

export interface WakeyWakeyProps {
  /**
   * An option CronOptions to specify the time of day to start the instance.
   *
   * @default {
      day: '*',
      hour: '12',
      minute: '0'
    }
   */
  readonly schedule?: CronOptions;
  /**
   * the instanceId of the EC2 instance you'd like started.
   */
  readonly instanceId: string;
}


/**
 * A construct that will build a Lambda and a CloudWatch Rule (cron schedule)
 * that will start the given ec2 instance at the specified time.
 *
 * Typically used when you've got ec2 instances that you only need during business hours
 * and want to reduce the costs of. Use in conjunciton with the Nightynight construct at
 * @matthewbonig/nightynight
 */
export class WakeyWakey extends Construct {
  constructor(scope: Construct, id: string, props: WakeyWakeyProps) {
    super(scope, id);
    const lambda = new NodejsFunction(this, 'handler', {
      entry: join(__dirname, 'wakeywakey.handler.js'),
      environment: {
        INSTANCE_ID: props.instanceId
      }
    });

    lambda.addToRolePolicy(new Ec2().allow().toDescribeInstances());
    lambda.addToRolePolicy(new Ec2().allow().toStartInstances().on(Arn.format({
      resourceName: props.instanceId,
      resource: 'instance',
      service: 'ec2'
    }, Stack.of(this))));

    let schedule = props.schedule || {
      day: '*',
      hour: '12',
      minute: '0'
    };
    const rule = new Rule(this, 'rule', {
      schedule: Schedule.cron(schedule)
    });

    rule.addTarget(new LambdaFunction(lambda, {
      event: RuleTargetInput.fromObject({})
    }));
  }
}
