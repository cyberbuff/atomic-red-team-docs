## How to write atomics for cloud

There are several ways to write an atomic against a AWS/Azure/GCP environments, but these are the three ways to simulate
an attack against cloud using Atomic Red Team:

1. **Command Line Interface (CLI)**- All major cloud providers have their CLI (Command Line Interface) tools available,
   each specific to a particular cloud provider for example: AWS CLI, Azure CLI, Gcloud CLI

While authoring an atomic using this method, the user will ensure these tools are installed and configured in the
prerequisites section and then use the same CLI tools to attack the cloud environment.

TLDR; Use the CLI tools to create appropriate resources in your cloud environment and then simulate the attack using
specific command line arguments

Example :
[AWS CloudWatch Log Stream Deletes](https://github.com/redcanaryco/atomic-red-team/blob/8ec0ff54c6a0c4b90ea5abb6a61571c588ad08cc/atomics/T1562.008/T1562.008.yaml#L357) -
We use the aws cli to create and delete a cloud watch log stream

2. **Using Terraform and Cloud CLI tools**

In this method of writing an atomic, we will be using a combination of terraform and cloud cli tools to simulate an
attack. However, when using this there are terraform files needed in a specific directory structure. Let’s take this
example:

[**AWS - CloudTrail Changes (T1562.008-1)
**](https://github.com/redcanaryco/atomic-red-team/blob/8ec0ff54c6a0c4b90ea5abb6a61571c588ad08cc/atomics/T1562.008/T1562.008.yaml#L4)

In the above atomic, we are using terraform to create and configure a cloudtrail as a part of the pre-requisites and
then update/stop/delete the cloudtrail using the AWS CLI tool command.

Terraform files:
For the desired atomic, create a folder in the src directory with the atomic test number.
Eg: T1562.008/src/T1562.008-1/

In this folder, there are two terraform files needed to create/configure appropriate resource like create S3 bucket in
AWS, configure cloudtrail.

- [T1562.008-1.tf](https://github.com/redcanaryco/atomic-red-team/blob/master/atomics/T1562.008/src/T1562.008-1/T1562.008-1.tf) :
  This file is essentially a set of instructions that define the resources that Terraform should create, modify, or
  delete in a cloud environment.

- [Terraform.tfvars](https://github.com/redcanaryco/atomic-red-team/blob/master/atomics/T1562.008/src/T1562.008-1/terraform.tfvars):
  This file is a file format used by Terraform to define values for variables used in a Terraform configuration file (
  .tf file)

Invoke-AtomicRedTeam can programmatically identify these files to execute this new flavor of atomics. When you execute
pre-reqs, the code will run `terraform init` and `terraform apply -auto-approve` to create a `.tfstate`
and `tfvars.json` file based on the input arguments.

In the execution section: we can simply run AWS CLI commands to simulate the attack and
during clean up: we would run `terraform destroy -auto-approve` to destroy the resources.

3. **Using third party tools **

One such example of this method is using [Stratus Red Team](https://github.com/DataDog/stratus-red-team), an open source
tool developed by DataDog.

Example - [AWS - Retrieve EC2 Password Data using stratus](https://github.com/redcanaryco/atomic-red-team/blob/c967af10603d9bb3d577af000098fab2bb95b527/atomics/T1552/T1552.yaml#L4)
