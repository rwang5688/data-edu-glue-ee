import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as glue from 'aws-cdk-lib/aws-glue';
import { Construct } from "constructs";

export class DataEduGlueEeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Parameter: Raw bucket name
    const RawBucketName = new cdk.CfnParameter(this, 'RawBucketName', {
      type: 'String',
      default: 'dataedu-raw-123456abcdefghijklmnopqrstuvwxyz',
      description: 'Raw bucket name.',
    });
    const rawBucketPath = 's3://'+RawBucketName.valueAsString;

    // IAM Role for Fetch Demo Data Lambda Execution Role
    const glueCrawlerRole = new iam.Role(this, 'dataeduGlueCrawlerRole', {
      assumedBy: new iam.ServicePrincipal('glue.amazonaws.com'),
      roleName: 'dataedu-glue-crawler-role-name',
    });

    // Add AmazonS3FullAccess in order to acccess raw data bucket
    glueCrawlerRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSGlueServiceRole')
    );
    
    // Add AmazonS3FullAccess in order to acccess raw data bucket
    glueCrawlerRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess')
    );

    // sisdemo_crawler: Crawls sisdemo folder; creates db_raw_sisdemo tables
    const sisdemoCrawler = new glue.CfnCrawler(this, 'dataeduSisdemoCrawler', {
      role: glueCrawlerRole.roleArn,
      targets: {
        s3Targets: [{
          path: rawBucketPath+'sisdb/sisdemo/',
        }],
      },
    
      // the properties below are optional
      databaseName: 'db_raw_sisdemo',
      description: 'SIS demo data crawler.',
      name: 'dataedu-sisdemo-crawler',
    });

    // lmsdemo_crawler: Crawls lmsdemo folder; creates db_raw_lmsdemo tables
    const lmsdemoCrawler = new glue.CfnCrawler(this, 'dataedLmsdemoCrawler', {
      role: glueCrawlerRole.roleArn,
      targets: {
        s3Targets: [{
          path: rawBucketPath+'lmsapi/',
        }],
      },
    
      // the properties below are optional
      databaseName: 'db_raw_lmsdemo',
      description: 'LMS demo data crawler.',
      name: 'dataedu-lmsdemo-crawler',
    });
  }
}

