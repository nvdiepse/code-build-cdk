#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { SrcStack } from "../lib/src-stack";
import { CodeBuildStack } from "../lib/code-build-stack";

const app = new cdk.App();
new SrcStack(app, "SrcStack", {});
new CodeBuildStack(app, "CodeBuildStack", {});
