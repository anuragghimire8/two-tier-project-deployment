terraform{
    backend "s3"{
        bucket = "ec2-terraform-2025"
        key = "ec2-terraform/terraform.tfstate"
        region = "eu-central-1"
        dynamodb_table = "dynamo-terraform"
    }
}


provider "aws" {
  region = "eu-central-1"
}