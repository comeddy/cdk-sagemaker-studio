import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import * as sagemaker from 'aws-cdk-lib/aws-sagemaker';
import { Role, ServicePrincipal, ManagedPolicy } from 'aws-cdk-lib/aws-iam';

export class CdkSagemakerStudioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const region = props?.env?.region;
    
    // create a SageMakerExecutionRole-${region}-cdk for the SageMaker Studio
    let sagemakerExecutionRole = new Role(this, 'SageMakerExecutionRole', {
      assumedBy: new ServicePrincipal('sagemaker.amazonaws.com'),
      roleName: `SageMakerExecutionRole-${region}-cdk`,
      description: 'SageMaker execution role'
    });  
    
    sagemakerExecutionRole.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName('AmazonSageMakerFullAccess')
    );

    const userSettings = {
      executionRole: sagemakerExecutionRole.roleArn,
    }

    // create a SageMaker domain
    const defaultVpc = ec2.Vpc.fromLookup(this, 'DefaultVpc', {
      isDefault: true
    });

    const vpcSubnets = defaultVpc.selectSubnets({
      subnetType: ec2.SubnetType.PUBLIC
    });

    const domain = new sagemaker.CfnDomain(this, 'SageMakerDomain', {
      authMode: 'IAM',
      domainName: 'SageMakerDomain',
      defaultUserSettings: userSettings,
      subnetIds: vpcSubnets.subnetIds,
      vpcId: defaultVpc.vpcId,
    });

    const profile = {'team': 'data-sciences', 'name': 'youngjin'}
    new sagemaker.CfnUserProfile(this, 'SageMakerUserProfile', {
      domainId: domain.attrDomainId,
      userProfileName: `${profile.team}-${profile.name}`,
      userSettings: userSettings,
    });
  }  
}

