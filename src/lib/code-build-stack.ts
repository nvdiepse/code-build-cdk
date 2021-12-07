import * as cdk from "@aws-cdk/core";
import * as codebuild from "@aws-cdk/aws-codebuild";

export interface CodeBuildStackProps extends cdk.StackProps {}

export class CodeBuildStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: CodeBuildStackProps) {
    super(scope, id, props);
    this.codeBuildInstall();
  }

  private codeBuildInstall() {
    new codebuild.Project(this, "Codebuild", {
      projectName: "ma-build",
      buildSpec: codebuild.BuildSpec.fromObject({
        version: "0.2",
        phases: {
          install: {
            commands: [
              'echo "Install Aws CDK"',
              "npm install -g aws-cdk",
              "cdk --version",
              "npm install -g typescript",
              'echo "Install NodeJS"',
              "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash",
              "command -v nvm",
              "nvm install 14",
              "nvm use 14",
              "nvm alias default 14",
              "node --version",
              "yum install git",
              "git --version",
            ],
          },
          build: {
            commands: [
              "git clone https://github.com/nvdiepse/aws-cdk-ma",
              "ls",
              "cd /aws-cdk-ma",
              "cdk deploy --all",
            ],
          },
        },
      }),
      environment: {
        privileged: true,
        buildImage: codebuild.LinuxBuildImage.AMAZON_LINUX_2_ARM_2,
      },
      environmentVariables: {},
    });
  }
}
