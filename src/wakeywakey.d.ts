import { CronOptions } from "@aws-cdk/aws-events";
import { Construct } from "@aws-cdk/core";
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
export declare class WakeyWakey extends Construct {
    constructor(scope: Construct, id: string, props: WakeyWakeyProps);
}
