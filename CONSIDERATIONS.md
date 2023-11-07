# Questions

> Kindly list any security considerations you would want Pear Payments to note with regards to building online financial services and any changes you deem would be vital for the security of this service

1. Data Encryption: Enable [DynamoDB encryption at rest](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/EncryptionAtRest.html). If you choose to enable caching on API Gateway, enable cache encryption. API Gateway only exposes HTTPS endpoints and Lambda is invoked with the Lambda API so encryption in transit is enabled by default. If switching to a custom domain, enforce a minimum TLS version.

2. Access management: Create separate groups for merchants and admin users and add additional validation to the Lambdas. Merchants should only be able to view their own transactions. Enable MFA in Cognito.

3. Monitoring: Lambda sends logs to CloudWatch by default. Customise the CloudWatch alarms as needed.

4. Compliance: Ensure compliance with relevant financial industry regulations and standards, such as PCI DSS, GDPR, or HIPAA, etc.

5. Updates: Since this solution uses serverless, patching of the underlying hardware is done automatically. Keep the pipeline dependencies updated frequently and update to new resource versions as they are released (e.g. Lambda with NodeJS 20.x).

6. Secure Deployment Pipeline: Add security scanning of dependencies to the pipeline, add more tests for the CDK code and the Lambda functions.

7. DDoS Mitigation: Consider using WAF in front of API gateway to mitigate attacks.

8. Runbook: Create a runbook that the team can refer to for common issues and standard operating procedures.

9. Data Backup and Recovery: Consider replicating DB over multiple regions in case of a region wide outage. Enable Point-in-time recovery in DDB to be able to restore to a specific time.

10. Employee Training: Ensure that all employees are trained in security best practices and aware of potential security threats, such as phishing and social engineering attacks.

11. Security Testing: Conduct regular security testing, including penetration testing and vulnerability scanning, to identify and remediate weaknesses in the system. Have security tests performed by a 3rd party vendor to simulate a real world attack and receive an unbiased result.

12. Access Control Reviews: Regularly review and audit user access permissions to ensure that employees have the least privilege necessary for their roles. Follow the principle of least privilege.
