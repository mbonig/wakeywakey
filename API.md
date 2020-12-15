# API Reference

**Classes**

Name|Description
----|-----------
[WakeyWakey](#matthewbonig-wakeywakey-wakeywakey)|A construct that will build a Lambda and a CloudWatch Rule (cron schedule) that will start the given ec2 instance at the specified time.


**Structs**

Name|Description
----|-----------
[WakeyWakeyProps](#matthewbonig-wakeywakey-wakeywakeyprops)|*No description*



## class WakeyWakey  <a id="matthewbonig-wakeywakey-wakeywakey"></a>

A construct that will build a Lambda and a CloudWatch Rule (cron schedule) that will start the given ec2 instance at the specified time.

Typically used when you've got ec2 instances that you only need during business hours
and want to reduce the costs of. Use in conjunciton with the Nightynight construct at

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new WakeyWakey(scope: Construct, id: string, props: WakeyWakeyProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[WakeyWakeyProps](#matthewbonig-wakeywakey-wakeywakeyprops)</code>)  *No description*
  * **instanceId** (<code>string</code>)  the instanceId of the EC2 instance you'd like started. 
  * **schedule** (<code>[CronOptions](#aws-cdk-aws-events-cronoptions)</code>)  An option CronOptions to specify the time of day to start the instance. __*Default*__: { day: '*', hour: '12', minute: '0' }




## struct WakeyWakeyProps  <a id="matthewbonig-wakeywakey-wakeywakeyprops"></a>






Name | Type | Description 
-----|------|-------------
**instanceId** | <code>string</code> | the instanceId of the EC2 instance you'd like started.
**schedule**? | <code>[CronOptions](#aws-cdk-aws-events-cronoptions)</code> | An option CronOptions to specify the time of day to start the instance.<br/>__*Default*__: { day: '*', hour: '12', minute: '0' }



