# Serverless-Ecommerce-WebApp

Project Overview

This is a fully serverless, full-stack e-commerce platform built on AWS. It includes:

A java/html based static frontend hosted on S3 and distributed via CloudFront

A secure backend API using API Gateway (HTTP API), Lambda, and DynamoDB

AWS WAF to secure CloudFront from malicious requests

Amazon Cognito for user authentication and secure access control

CORS configuration for seamless frontend-backend communication


**High-Level Architecture **

                 [Browser / Client]
                        |
          https://www.example.com (or your frontend domain)
                        |
             [CloudFront CDN + WAF + Cognito Auth]
                        |
                [S3 Static Website Hosting]
                        |
          +-----------------------------+
          |  API Calls to Backend APIs  |
          +-----------------------------+
                      ↓
            [API Gateway - HTTP API]
                      |
       ┌--------------┴---------------┐
       |                              |
**[Lambda: orderHandler]        [Lambda: productHandler]
       |                              |
[DynamoDB: ordersData]         [DynamoDB: productsData]**



**AWS Services Used in Your Project:
**

Amazon S3

Hosts static frontend website files (HTML, JS)

Amazon CloudFront

Content Delivery Network (CDN) to deliver frontend content globally and HTTPS

AWS WAF (Web Application Firewall)

Protects CloudFront distribution against common web attacks (SQL injection, XSS, bots)

Amazon API Gateway (HTTP API)

Exposes backend API endpoints for orders and products with low latency and CORS support

AWS Lambda

Serverless compute to handle business logic for orderHandler and productHandler

Amazon DynamoDB

NoSQL database to store order and product information in two separate tables

Amazon Cognito

User authentication and authorization service managing signup, login, and tokens

IAM (Identity and Access Management)

Secure permissions for Lambda functions to access DynamoDB

Amazon CloudWatch Logs

Logging and monitoring for Lambda function executions and troubleshooting

**End-to-End Request Flow**

**A. Frontend (Static Hosting)**

A static website (HTML/JS) is hosted on an S3 bucket.

CloudFront serves the site globally via HTTPS.

AWS WAF protects CloudFront from common attacks (e.g., SQL injection, bot traffic).

**B. Backend API (HTTP API)**

The user performs an action on the website (e.g., add product, place order).

Request sent to API Gateway's HTTP API endpoint.

API Gateway routes the request to the correct Lambda function:
/products → GET → productHandler
/orders → POST → orderHandler
/orders → OPTIONS → Lambda or Gateway CORS response

Lambda performs business logic and interacts with DynamoDB.

Response is returned

**Implementation Overview**

**Lambda Functions**

The backend is powered by two main Lambda functions: one dedicated to managing product data (productHandler), and the other handling order processing (orderHandler). These functions handle all CRUD operations related to products and orders, ensuring data integrity and smooth business logic execution.

**Security & Permissions**

Security is a priority, so IAM roles are tightly scoped to give each Lambda function only the permissions it needs—mainly actions like PutItem, GetItem, and Query on DynamoDB tables. This principle of least privilege reduces risk and keeps the environment secure.

**Database Setup**

Two DynamoDB tables form the backbone of the data layer. The productsData table stores product information such as IDs, names, prices, and categories. The ordersData table tracks customer orders, including quantities and timestamps. This separation allows efficient queries and easy scaling.

**Frontend Hosting**

The frontend app is hosted on Amazon S3 as a static website. CloudFront is configured on top of S3 to deliver content quickly across the globe while enforcing HTTPS. The setup includes Origin Access Control, restricting direct access to the S3 bucket and allowing only CloudFront to serve the files.

**API Gateway**

An HTTP API in API Gateway routes incoming requests to the appropriate Lambda functions. Endpoints for fetching products and placing orders are exposed here, with CORS enabled to allow cross-domain communication from the frontend.

**User Authentication**

Amazon Cognito manages user authentication seamlessly, handling user registration, login, and token validation. Cognito integrates with API Gateway and Lambda to ensure that only authenticated users can access protected endpoints.

**Frontend Integration**
The frontend communicates with backend APIs to display product listings and submit orders. Thanks to CORS configuration, these calls happen smoothly, creating a responsive and secure user experience.

**Security Layer with AWS WAF**

To protect the application from common web threats like SQL injection and cross-site scripting, AWS WAF is deployed on the CloudFront distribution. It leverages managed rule sets and custom monitoring to keep malicious traffic at bay.

**Benefits**

--> Fully serverless and scalable

--> No infrastructure to manage

--> Globally fast content delivery

--> Backend API securely integrated

--> CORS-ready for frontend use

--> Secure authentication with Cognito

