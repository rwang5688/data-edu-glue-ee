#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DataEduGlueEeStack } from '../lib/data-edu-glue-ee-stack';

const app = new cdk.App();
new DataEduGlueEeStack(app, 'DataEduGlueEeStack');
