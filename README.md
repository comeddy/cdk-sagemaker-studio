# Prerequisite

* Sign in to the [AWS Management Console](https://console.aws.amazon.com/)
* Go to [Cloud9](https://console.aws.amazon.com/cloud9/) environment. and Click Open IDE

NodeJS Installed
* `nvm install node` or `brew install node`
* `node -v` and `npm -v`

AWS CDK command line installed
* `npm install -g aws-cdk` or `npm install -g aws-cdk@2.88.0 --force`
* `cdk --version`
  This cdk test on 2.88.0 (build 5d497f9)

* `npm install aws-cdk-lib`
* `npm install constructs`

# Step 1 - Cloud9 instance role change to role
1. Cloud9을 위한 IAM 역할 생성
   IAM > role 생성(역할 만들기) > EC2 사용사례 선택    
2. Role 만들고 Cloud9 권한 설정
   AdministratorAccess 권한설정 후 역할이름을 `devops-workshop-admin` 만듭니다.
   Cloud9의 Manage EC2 instance > 작업(보안) > IAM 역할수정 > `devops-workshop-admin` 연결
3. 기존 자격증명 파일 제거  
   Cloud9의 AWS SETTING > Credentials(AWS managed temporary credentials: disable)
4. aws sts get-caller-identity 명령어로 변경확인
  `aws sts get-caller-identity` 
```
{
    "Arn": "arn:aws:sts::045364116382:assumed-role/devops-workshop-admin/i-00a2ff1a3281076d4"
}
```
# Step 2 - Clone the code Github repo
`git clone https://github.com/comeddy/cdk-sagemaker-studio.git`<br>
`cd cdk-sagemaker-studio`

`bin/cdk-sagemaker-studio.ts` - 메인 CDK 앱과 스택이 정의된 엔트리 포인트 파일입니다.<br>
`lib/cdk-sagemaker-studio-stack.ts` -  스튜디오 도메인, 스튜디오 사용자 프로필 및 스튜디오 사용자 앱을 정의하는 세이지메이커 스튜디오 스택 파일입니다.
# Step 3 - Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands
* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests

## run code commands
* `cdk synth`       emits the synthesized CloudFormation template
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state

## Sagemaker Execution Role
Sagemaker Execution Role은 Cloud9이 실행된 region의 IAM 역할에 아래네이밍으로 생성/소멸됩니다.<br>
region이 us-east-1일 경우<br>
```SageMakerExecutionRole-us-east-1-cdk```

region이 ap-northeast-2 일 경우<br>
```SageMakerExecutionRole-ap-northeast-2-cdk```

## Mac 노트북에서 실행시 Sagemaker Execution Role
로컬 시스템에서는 aws config region으로 반경됩니다.<br>
* `vi ~/.aws/config`

```
[default]
region = us-east-1
output = json
```