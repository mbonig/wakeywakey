# Wakeywakey!

***
This project has been deprecated and the WakeyWakey construct has been moved to the NightyNight library [here](https://github.com/mbonig/nightynight). 
Please do not use this library.
***

Do you have a EC2 instance that you only need during certain hours of the day? Do you want to reduce it's cost? Are you using the [@matthewbonig/nightynight](https://github.com/mbonig/nightynight) construct to shut it down every night? Do you want to start it up in the morning?

That's the Wakeywakey construct. It's very simple. Give it an `instanceId` and it will create a Lambda and a CloudWatch Event Rule to fire the lambda at a specific time of day. If the instance is stopped, it is started.

# This is a pre-release!

This is a quick first-draft. All the options that will likely need to be added to accomodate a large
number of use-cases are still needed. If you'd like to make requests or help update this construct, please
open an [Issue](https://github.com/mbonig/wakeywakey/issues) or a [PR](https://github.com/mbonig/cicd-spa-website/pulls).

# What is creates

![arch.png](./arch.png)

* A Rule that will, on a given schedule, fire a lambda. 
* A Lambda with permissions to describe ec2 instances. It will read the instance by the given `instanceId` and then start the instance if it's in a stopped state.

# Example:

```typescript

export class WakeyWakeyStack extends Stack {

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new WakeyWakey(this, 'wakeywakey', {instanceId: 'i-123123123123'});
  }
}

```

This will start the instance with id `i-123123123123` at (the default) 4am GMT.


## Contributing

Please open Pull Requests and Issues on the [Github Repo](https://github.com/mbonig/wakeywakey).

## License

MIT
