# Serverless-Ecommerce-WebApp

Project Overview

This is a fully serverless, full-stack e-commerce platform built on AWS. It includes:

A java/html based static frontend hosted on S3 and distributed via CloudFront

A secure backend API using API Gateway (HTTP API), Lambda, and DynamoDB

AWS WAF to secure CloudFront from malicious requests

Amazon Cognito for user authentication and secure access control

CORS configuration for seamless frontend-backend communication


Core AWS Services Used

Service

Description

Amazon S3

Static website hosting

Amazon CloudFront

Global CDN with HTTPS support

AWS WAF

Secures CloudFront with web ACL rules

API Gateway (HTTP API)

Backend routing with CORS

AWS Lambda

Stateless backend logic

Amazon DynamoDB

NoSQL database for products & orders

Amazon Cognito

Authentication for user login/signup

IAM Roles

Least-privilege permissions for Lambda

CloudWatch Logs

Logs for debugging & monitoring




