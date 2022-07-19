import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as glue from 'aws-cdk-lib/aws-glue';
import { Construct } from "constructs";

export class DataEduGlueEeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Parameter: Raw bucket name
    const RawBucketName = new cdk.CfnParameter(this, "RawBucketName", {
      type: "String",
      default: "dataedu-raw-123456abcdefghijklmnopqrstuvwxyz",
      description: "Raw bucket name",
    });

    // IAM Role for Fetch Demo Data Lambda Execution Role
    const glueCrawlerRole = new iam.Role(this, "dataeduGlueCrawlerRole", {
      assumedBy: new iam.ServicePrincipal("glue.amazonaws.com"),
      roleName: "dataedu-glue-crawler-role",
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
    /*
    const cfnCrawler = new glue.CfnCrawler(this, 'dataeduSisdemoCrawler', {
      role: 'role',
      targets: {
        catalogTargets: [{
          databaseName: 'databaseName',
          tables: ['tables'],
        }],
        dynamoDbTargets: [{
          path: 'path',
        }],
        jdbcTargets: [{
          connectionName: 'connectionName',
          exclusions: ['exclusions'],
          path: 'path',
        }],
        mongoDbTargets: [{
          connectionName: 'connectionName',
          path: 'path',
        }],
        s3Targets: [{
          connectionName: 'connectionName',
          dlqEventQueueArn: 'dlqEventQueueArn',
          eventQueueArn: 'eventQueueArn',
          exclusions: ['exclusions'],
          path: 'path',
          sampleSize: 123,
        }],
      },
    
      // the properties below are optional
      classifiers: ['classifiers'],
      configuration: 'configuration',
      crawlerSecurityConfiguration: 'crawlerSecurityConfiguration',
      databaseName: 'databaseName',
      description: 'description',
      name: 'name',
      recrawlPolicy: {
        recrawlBehavior: 'recrawlBehavior',
      },
      schedule: {
        scheduleExpression: 'scheduleExpression',
      },
      schemaChangePolicy: {
        deleteBehavior: 'deleteBehavior',
        updateBehavior: 'updateBehavior',
      },
      tablePrefix: 'tablePrefix',
      tags: tags,
    });
    */
  }
}

