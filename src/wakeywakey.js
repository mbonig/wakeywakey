"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WakeyWakey = void 0;
const aws_events_1 = require("@aws-cdk/aws-events");
const core_1 = require("@aws-cdk/core");
const aws_lambda_nodejs_1 = require("@aws-cdk/aws-lambda-nodejs");
const path_1 = require("path");
const aws_events_targets_1 = require("@aws-cdk/aws-events-targets");
const cdk_iam_floyd_1 = require("cdk-iam-floyd");
/**
 * A construct that will build a Lambda and a CloudWatch Rule (cron schedule)
 * that will start the given ec2 instance at the specified time.
 *
 * Typically used when you've got ec2 instances that you only need during business hours
 * and want to reduce the costs of. Use in conjunciton with the Nightynight construct at
 * @matthewbonig/nightynight
 */
class WakeyWakey extends core_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        const lambda = new aws_lambda_nodejs_1.NodejsFunction(this, 'handler', {
            entry: path_1.join(__dirname, 'wakeywakey.handler.js'),
            environment: {
                INSTANCE_ID: props.instanceId
            }
        });
        lambda.addToRolePolicy(new cdk_iam_floyd_1.Ec2().allow().toDescribeInstances());
        lambda.addToRolePolicy(new cdk_iam_floyd_1.Ec2().allow().toStartInstances().on(core_1.Arn.format({
            resourceName: props.instanceId,
            resource: 'instance',
            service: 'ec2'
        }, core_1.Stack.of(this))));
        let schedule = props.schedule || {
            day: '*',
            hour: '12',
            minute: '0'
        };
        const rule = new aws_events_1.Rule(this, 'rule', {
            schedule: aws_events_1.Schedule.cron(schedule)
        });
        rule.addTarget(new aws_events_targets_1.LambdaFunction(lambda, {
            event: aws_events_1.RuleTargetInput.fromObject({})
        }));
    }
}
exports.WakeyWakey = WakeyWakey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FrZXl3YWtleS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndha2V5d2FrZXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0RBQW1GO0FBQ25GLHdDQUFzRDtBQUN0RCxrRUFBNEQ7QUFDNUQsK0JBQTRCO0FBQzVCLG9FQUE2RDtBQUM3RCxpREFBb0M7QUFvQnBDOzs7Ozs7O0dBT0c7QUFDSCxNQUFhLFVBQVcsU0FBUSxnQkFBUztJQUN2QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakIsTUFBTSxNQUFNLEdBQUcsSUFBSSxrQ0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDakQsS0FBSyxFQUFFLFdBQUksQ0FBQyxTQUFTLEVBQUUsdUJBQXVCLENBQUM7WUFDL0MsV0FBVyxFQUFFO2dCQUNYLFdBQVcsRUFBRSxLQUFLLENBQUMsVUFBVTthQUM5QjtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxtQkFBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxtQkFBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBRyxDQUFDLE1BQU0sQ0FBQztZQUN4RSxZQUFZLEVBQUUsS0FBSyxDQUFDLFVBQVU7WUFDOUIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsT0FBTyxFQUFFLEtBQUs7U0FDZixFQUFFLFlBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsSUFBSTtZQUMvQixHQUFHLEVBQUUsR0FBRztZQUNSLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLEdBQUc7U0FDWixDQUFDO1FBQ0YsTUFBTSxJQUFJLEdBQUcsSUFBSSxpQkFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7WUFDbEMsUUFBUSxFQUFFLHFCQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNsQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksbUNBQWMsQ0FBQyxNQUFNLEVBQUU7WUFDeEMsS0FBSyxFQUFFLDRCQUFlLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztTQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDRjtBQTlCRCxnQ0E4QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDcm9uT3B0aW9ucywgUnVsZSwgUnVsZVRhcmdldElucHV0LCBTY2hlZHVsZSB9IGZyb20gXCJAYXdzLWNkay9hd3MtZXZlbnRzXCI7XG5pbXBvcnQgeyBBcm4sIENvbnN0cnVjdCwgU3RhY2sgfSBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xuaW1wb3J0IHsgTm9kZWpzRnVuY3Rpb24gfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWxhbWJkYS1ub2RlanNcIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgTGFtYmRhRnVuY3Rpb24gfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWV2ZW50cy10YXJnZXRzXCI7XG5pbXBvcnQgeyBFYzIgfSBmcm9tIFwiY2RrLWlhbS1mbG95ZFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFdha2V5V2FrZXlQcm9wcyB7XG4gIC8qKlxuICAgKiBBbiBvcHRpb24gQ3Jvbk9wdGlvbnMgdG8gc3BlY2lmeSB0aGUgdGltZSBvZiBkYXkgdG8gc3RhcnQgdGhlIGluc3RhbmNlLlxuICAgKlxuICAgKiBAZGVmYXVsdCB7XG4gICAgICBkYXk6ICcqJyxcbiAgICAgIGhvdXI6ICcxMicsXG4gICAgICBtaW51dGU6ICcwJ1xuICAgIH1cbiAgICovXG4gIHJlYWRvbmx5IHNjaGVkdWxlPzogQ3Jvbk9wdGlvbnM7XG4gIC8qKlxuICAgKiB0aGUgaW5zdGFuY2VJZCBvZiB0aGUgRUMyIGluc3RhbmNlIHlvdSdkIGxpa2Ugc3RhcnRlZC5cbiAgICovXG4gIHJlYWRvbmx5IGluc3RhbmNlSWQ6IHN0cmluZztcbn1cblxuXG4vKipcbiAqIEEgY29uc3RydWN0IHRoYXQgd2lsbCBidWlsZCBhIExhbWJkYSBhbmQgYSBDbG91ZFdhdGNoIFJ1bGUgKGNyb24gc2NoZWR1bGUpXG4gKiB0aGF0IHdpbGwgc3RhcnQgdGhlIGdpdmVuIGVjMiBpbnN0YW5jZSBhdCB0aGUgc3BlY2lmaWVkIHRpbWUuXG4gKlxuICogVHlwaWNhbGx5IHVzZWQgd2hlbiB5b3UndmUgZ290IGVjMiBpbnN0YW5jZXMgdGhhdCB5b3Ugb25seSBuZWVkIGR1cmluZyBidXNpbmVzcyBob3Vyc1xuICogYW5kIHdhbnQgdG8gcmVkdWNlIHRoZSBjb3N0cyBvZi4gVXNlIGluIGNvbmp1bmNpdG9uIHdpdGggdGhlIE5pZ2h0eW5pZ2h0IGNvbnN0cnVjdCBhdFxuICogQG1hdHRoZXdib25pZy9uaWdodHluaWdodFxuICovXG5leHBvcnQgY2xhc3MgV2FrZXlXYWtleSBleHRlbmRzIENvbnN0cnVjdCB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBXYWtleVdha2V5UHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIGNvbnN0IGxhbWJkYSA9IG5ldyBOb2RlanNGdW5jdGlvbih0aGlzLCAnaGFuZGxlcicsIHtcbiAgICAgIGVudHJ5OiBqb2luKF9fZGlybmFtZSwgJ3dha2V5d2FrZXkuaGFuZGxlci5qcycpLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgSU5TVEFOQ0VfSUQ6IHByb3BzLmluc3RhbmNlSWRcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxhbWJkYS5hZGRUb1JvbGVQb2xpY3kobmV3IEVjMigpLmFsbG93KCkudG9EZXNjcmliZUluc3RhbmNlcygpKTtcbiAgICBsYW1iZGEuYWRkVG9Sb2xlUG9saWN5KG5ldyBFYzIoKS5hbGxvdygpLnRvU3RhcnRJbnN0YW5jZXMoKS5vbihBcm4uZm9ybWF0KHtcbiAgICAgIHJlc291cmNlTmFtZTogcHJvcHMuaW5zdGFuY2VJZCxcbiAgICAgIHJlc291cmNlOiAnaW5zdGFuY2UnLFxuICAgICAgc2VydmljZTogJ2VjMidcbiAgICB9LCBTdGFjay5vZih0aGlzKSkpKTtcblxuICAgIGxldCBzY2hlZHVsZSA9IHByb3BzLnNjaGVkdWxlIHx8IHtcbiAgICAgIGRheTogJyonLFxuICAgICAgaG91cjogJzEyJyxcbiAgICAgIG1pbnV0ZTogJzAnXG4gICAgfTtcbiAgICBjb25zdCBydWxlID0gbmV3IFJ1bGUodGhpcywgJ3J1bGUnLCB7XG4gICAgICBzY2hlZHVsZTogU2NoZWR1bGUuY3JvbihzY2hlZHVsZSlcbiAgICB9KTtcblxuICAgIHJ1bGUuYWRkVGFyZ2V0KG5ldyBMYW1iZGFGdW5jdGlvbihsYW1iZGEsIHtcbiAgICAgIGV2ZW50OiBSdWxlVGFyZ2V0SW5wdXQuZnJvbU9iamVjdCh7fSlcbiAgICB9KSk7XG4gIH1cbn1cbiJdfQ==