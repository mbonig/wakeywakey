const { AwsCdkConstructLibrary, NodePackageManager } = require('projen');

let dependencies = [
  'cdk-iam-floyd',
];
const project = new AwsCdkConstructLibrary({
  name: '@matthewbonig/wakeywakey',
  description: 'A CDK construct that will automatically start a stopped EC2 instance at a given time.',
  authorAddress: 'matthew.bonig@gmail.com',
  authorName: 'Matthew Bonig',
  cdkVersion: '1.89.0',
  repository: 'https://github.com/mbonig/wakeywakey',
  defaultReleaseBranch: 'master',
  packageManager: NodePackageManager.NPM,
  bin: {
    wakeywakey: 'bin/wakeywakey.js',
  },
  deps: dependencies,
  peerDeps: dependencies,
  devDeps: [
    'yarn@^1.22.10',
    'esbuild@^0.8.22',
  ],
  cdkDependencies: [
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-events',
    '@aws-cdk/aws-events-targets',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-lambda-nodejs',
    '@aws-cdk/core',
  ],
  keywords: [
    'cdk',
    'ec2',
  ],
  python: {
    module: 'mbonig.wakeywakey',
    distName: 'mbonig.wakeywakey',
  },
  dependabot: true,
  buildWorkflow: true,
  releaseWorkflow: false,
});

project.compileTask.exec('jsii --silence-warnings=reserved-word --no-fix-peer-dependencies && jsii-docgen && cp src/wakeywakey.handler.ts lib/wakeywakey.handler.ts');

project.addFields({
  main: 'lib/wakeywakey.js',
  types: 'lib/wakeywakey.d.ts',
  awscdkio: {
    twitter: 'mattbonig',
  },
  public: true,
});

project.gitignore.exclude('cdk.context.json', '.cdk.staging/', '.idea/', '.parcel-cache/', 'cdk.out/');
project.npmignore.exclude('cdk.context.json', '.cdk.staging/', '.idea/', '.parcel-cache/', 'cdk.out/');
project.npmignore.include('lib/wakeywakey.handler.ts');
project.synth();
