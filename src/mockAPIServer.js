import { Response } from 'miragejs';

import {
    REGISTER_URL, LOGIN_URL, RECOMMENDATIONS_URL,
    SAVINGS_URL, GET_RUN_TEMPLATE_URL, GET_ACCOUNTS_URL,
    GET_USER_DETAILS, SCHEDULE_EVENT_URL, FORGOT_PASSWORD_URL,
    CHANGE_PASSWORD_URL, LOGOUT_URL, FORGOT_PASSWORD_RESET_URL, MOCK_ERROR, REFRESH_URL
} from './app/appConfig';

let attempt = 0;

var mockServer = {
    routes() {
        this.timing = 2000;
        this.passthrough('/media/**/**');
        this.passthrough('https://api.hsforms.com/submissions/v3/integration/submit/**/**');
        // this.passthrough(LOGIN_URL);
        this.post(REGISTER_URL, (schema, request) => {
            let response = JSON.parse(request.requestBody);
            response.id = 2;
            return response
        });
        this.post(SCHEDULE_EVENT_URL, (schema, request) => {
            attempt++;
            const response = {
                "accountId": "string",
                "annualSavings": 0,
                "applicationEnvironment": "string",
                "generatedDate": "string",
                "customerId": 0,
                "opportunityDescription": "string",
                "id": "string",
                "opportunityId": "string",
                "otherImpactedNodeIds": [
                    "string"
                ],
                "primaryImpactedNodeId": "string",
                "region": "string",
                "resourceId": "string",
                "scheduledAt": "string",
                "status": "string",
                "opportunityType": "string",
                "lastUpdatedDate": "string"
            };
      
            return attempt === 1 ? new Response(401, {}, {"Message":"User is not authorized to access this resource with an explicit deny"}) : response;
        });
        this.post(LOGIN_URL, (schema, request) => {
            let response = {
                "accessToken": "Old Token",
                "tokenType": "Tocken Type",
                "refreshToken": "Refresh token sent by server",
                "expirationDate": 10000
            }

            return response;
        });
        this.post(REFRESH_URL, (schema, request) => {
            let response = {
                "accessToken": "Refreshed token",
                "tokenType": "Tocken Type",
                "refreshToken": "RefRefresh token sent by server",
                "expirationDate": 10000
            }

            return response
        });
        this.post(FORGOT_PASSWORD_URL, (schema, request) => {
            let response = {
                "accessToken": "Some token sent by server",
                "tokenType": "Tocken Type",
                "refreshToken": "Refresh token sent by server",
                "expirationDate": 10000
            }

            return response
        });

        this.post(FORGOT_PASSWORD_RESET_URL, (schema, request) => {
            let response = {
                "accessToken": "Some token sent by server",
                "tokenType": "Tocken Type",
                "refreshToken": "Refresh token sent by server",
                "expirationDate": 10000
            }

            return response
        });

        this.post(CHANGE_PASSWORD_URL, (schema, request) => {
            let response = {
                "accessToken": "Some token sent by server",
                "tokenType": "Tocken Type",
                "refreshToken": "Refresh token sent by server",
                "expirationDate": 10000
            }

            return response
        });

        this.get(GET_RUN_TEMPLATE_URL, () => {
            const response = {
                snsTopicArn: "SNS Topic ARN",
                stackName: "Stack Name",
                tenantId: "Tenant ID",
                externalId: "External ID",
                templateLocation: "Template Location",
                region: "Region",
                trustedAccountId: "Trusted Account ID",
                url: "http://www.google.com"
            };
            return response;
        });

        this.get(LOGOUT_URL, () => {
            const response = {
                snsTopicArn: "SNS Topic ARN",
                stackName: "Stack Name",
                tenantId: "Tenant ID",
                externalId: "External ID",
                templateLocation: "Template Location",
                region: "Region",
                trustedAccountId: "Trusted Account ID",
                url: "http://www.google.com"
            };
            return response;
        });

        this.get(GET_ACCOUNTS_URL, () => {
        
            const response = [{"id":30,"accountId":"052072550456","accountNickname":null,"stackName":null,"lastScheduleDate":1612516354.060000000,"lastScheduleStatus":"Completed"}]
            return response; //new Response(403, {}, {"Message":"User is not authorized to access this resource with an explicit deny"});

        });

        this.get(GET_USER_DETAILS, () => {
            
            const response = {
                "phoneNumber": "Phone",
                "role": "Role",
                "companyName": "Compnay Name",
                "name": "Name Name",
                "id": 1,
                "username": "username"
            }
            return attempt === 5 ? new Response(401, {}, { "Message": "Unauthorized" }) : response;
        });
        this.get(MOCK_ERROR, () => {
            return new Response(401, { 'x-amzn-errortype': 'AccessDeniedException' }, { "Message": "User is not authorized to access this resource with an explicit deny" });
        });

        this.get(RECOMMENDATIONS_URL, () => {
            const response = [
                {
                    "id": "01cb1d61-42cb-4e2a-ba6d-fe7d19dfaa6a",
                    "region": "us-east-1",
                    "primaryImpactedNodeId": "052072550456/AWS::EC2::Volume/vol-073a037af3dc1dda2",
                    "otherImpactedNodeIds": [
                        "052072550456/AWS::EC2::Instance/i-01de1f7b0bc18499f"
                    ],
                    "resourceId": "vol-073a037af3dc1dda2",
                    "difficulty": 1,
                    "risk": 1,
                    "applicationEnvironment": "crm:test",
                    "annualSavings": 4.80,
                    "annualCost": 24.00,
                    "status": "Scheduled",
                    "scheduledAt": "2021-02-06T08:31:17.298Z",
                    "parameters": {
                        "VolumeSize": 20,
                        "VolumeType": "gp2"
                    },
                    "customerId": 31,
                    "accountId": "052072550456",
                    "opportunityType": "Gp2Gp3",
                    "opportunityDescription": "Update EBS volume from gp2 to gp3.",
                    "generatedDate": "2021-01-29T15:48:36.327022Z",
                    "lastUpdatedDate": "2021-01-29T15:48:36.327166Z"
                },
                {
                    "id": "62611a4c-0a8d-4d19-ba4c-3a3759363a35",
                    "region": "us-east-1",
                    "primaryImpactedNodeId": "052072550456/AWS::EC2::Volume/vol-0354b13ac9387f591",
                    "otherImpactedNodeIds": [
                        "052072550456/AWS::EC2::Instance/i-0e77091a9eac8f999"
                    ],
                    "resourceId": "vol-0354b13ac9387f591",
                    "difficulty": 1,
                    "risk": 2,
                    "applicationEnvironment": "crm:test",
                    "annualSavings": 4.80,
                    "annualCost": 24.00,
                    "status": "Completed",
                    "parameters": {
                        "VolumeSize": 20,
                        "VolumeType": "gp2"
                    },
                    "customerId": 31,
                    "accountId": "052072550456",
                    "opportunityType": "Gp2Gp3",
                    "opportunityDescription": "Update EBS volume from gp2 to gp3.",
                    "generatedDate": "2021-01-29T15:48:36.327244Z",
                    "lastUpdatedDate": "2021-02-02T20:11:39.576Z"
                },
                {
                    "id": "6332e6c2-6a39-4771-8d1d-51680ca272f5",
                    "region": "us-east-1",
                    "primaryImpactedNodeId": "052072550456/AWS::EC2::Volume/vol-0a06cf0cd743576e6",
                    "otherImpactedNodeIds": [
                        "052072550456/AWS::EC2::Instance/i-04790a551da08b60c"
                    ],
                    "resourceId": "vol-0a06cf0cd743576e6",
                    "difficulty": 1,
                    "risk": 3,
                    "applicationEnvironment": "crm:test",
                    "annualSavings": 30.72,
                    "annualCost": 153.60,
                    "status": "Completed",
                    "parameters": {
                        "VolumeSize": 128,
                        "VolumeType": "gp2"
                    },
                    "customerId": 31,
                    "accountId": "052072550456",
                    "opportunityType": "Gp2Gp3",
                    "opportunityDescription": "Update EBS volume from gp2 to gp3.",
                    "generatedDate": "2021-01-29T15:48:36.327391Z",
                    "lastUpdatedDate": "2021-02-02T19:11:18.898Z"
                },
                {
                    "id": "68f8cde1-85f9-42b9-825c-d359801a4150",
                    "region": "us-east-1",
                    "primaryImpactedNodeId": "052072550456/AWS::EC2::Volume/vol-03b640cc2676e9a3b",
                    "otherImpactedNodeIds": [
                        "052072550456/AWS::EC2::Instance/i-08f97f90e686800f4"
                    ],
                    "resourceId": "vol-03b640cc2676e9a3b",
                    "difficulty": 1,
                    "risk": 4,
                    "applicationEnvironment": "crm:test",
                    "annualSavings": 4.80,
                    "annualCost": 24.00,
                    "status": "Completed",
                    "parameters": {
                        "VolumeSize": 20,
                        "VolumeType": "gp2"
                    },
                    "customerId": 31,
                    "accountId": "052072550456",
                    "opportunityType": "Gp2Gp3",
                    "opportunityDescription": "Update EBS volume from gp2 to gp3.",
                    "generatedDate": "2021-01-29T15:48:36.327276Z",
                    "lastUpdatedDate": "2021-02-05T06:01:03.052Z"
                },
                {
                    "id": "7f12d376-b007-4fd2-bbf8-21873bff85b1",
                    "region": "us-east-1",
                    "primaryImpactedNodeId": "052072550456/AWS::EC2::Volume/vol-073ee6c77c5c26f5e",
                    "otherImpactedNodeIds": [
                        "052072550456/AWS::EC2::Instance/i-05a21957fefe965f9"
                    ],
                    "resourceId": "vol-073ee6c77c5c26f5e",
                    "difficulty": 1,
                    "risk": 5,
                    "applicationEnvironment": "crm:test",
                    "annualSavings": 4.80,
                    "annualCost": 24.00,
                    "status": "Completed",
                    "parameters": {
                        "VolumeSize": 20,
                        "VolumeType": "gp2"
                    },
                    "customerId": 31,
                    "accountId": "052072550456",
                    "opportunityType": "Gp2Gp3",
                    "opportunityDescription": "Update EBS volume from gp2 to gp3.",
                    "generatedDate": "2021-01-29T15:48:36.327305Z",
                    "lastUpdatedDate": "2021-02-03T18:26:34.455Z"
                },
                {
                    "id": "81a6606c-a9e4-4c6d-9fdc-6eb7b90b9ee4",
                    "region": "us-east-1",
                    "primaryImpactedNodeId": "052072550456/AWS::EC2::Volume/vol-098a8b6f86f222095",
                    "otherImpactedNodeIds": [
                        "052072550456/AWS::EC2::Instance/i-0fef5071e665655ee"
                    ],
                    "resourceId": "vol-098a8b6f86f222095",
                    "difficulty": 1,
                    "risk": 1,
                    "applicationEnvironment": "crm:test",
                    "annualSavings": 30.72,
                    "annualCost": 153.60,
                    "status": "Suggested",
                    "scheduledAt": "2021-02-05T15:04:00.000Z",
                    "parameters": {
                        "VolumeSize": 128,
                        "VolumeType": "gp2"
                    },
                    "customerId": 31,
                    "accountId": "052072550456",
                    "opportunityType": "Gp2Gp3",
                    "opportunityDescription": "Update EBS volume from gp2 to gp3.",
                    "generatedDate": "2021-01-29T15:48:36.32746Z",
                    "lastUpdatedDate": "2021-01-29T15:48:36.327466Z"
                },
                {
                    "id": "994d9ce2-cd6a-4821-ae34-04e01a620fd1",
                    "region": "us-east-1",
                    "primaryImpactedNodeId": "052072550456/AWS::EC2::Volume/vol-0ac5dbca9310e44f6",
                    "otherImpactedNodeIds": [
                        "052072550456/AWS::EC2::Instance/i-0292c5c8d9fe9d9a5"
                    ],
                    "resourceId": "vol-0ac5dbca9310e44f6",
                    "difficulty": 1,
                    "risk": 1,
                    "applicationEnvironment": "crm:test",
                    "annualSavings": 4.80,
                    "annualCost": 24.00,
                    "status": "Suggested",
                    "parameters": {
                        "VolumeSize": 20,
                        "VolumeType": "gp2"
                    },
                    "customerId": 31,
                    "accountId": "052072550456",
                    "opportunityType": "Gp2Gp3",
                    "opportunityDescription": "Update EBS volume from gp2 to gp3.",
                    "generatedDate": "2021-01-29T15:48:36.327333Z",
                    "lastUpdatedDate": "2021-01-29T15:48:36.327339Z"
                },
                {
                    "id": "da0f3927-887c-4160-bf73-db2a7817362e",
                    "region": "us-east-1",
                    "primaryImpactedNodeId": "052072550456/AWS::EC2::Volume/vol-0200a1ad04828f388",
                    "otherImpactedNodeIds": [
                        "052072550456/AWS::EC2::Instance/i-06855f1f0401c3aaa"
                    ],
                    "resourceId": "vol-0200a1ad04828f388",
                    "difficulty": 1,
                    "risk": 1,
                    "applicationEnvironment": "crm:test",
                    "annualSavings": 15.36,
                    "annualCost": 76.80,
                    "status": "Suggested",
                    "parameters": {
                        "VolumeSize": 64,
                        "VolumeType": "gp2"
                    },
                    "customerId": 31,
                    "accountId": "052072550456",
                    "opportunityType": "Gp2Gp3",
                    "opportunityDescription": "Update EBS volume from gp2 to gp3.",
                    "generatedDate": "2021-01-29T15:48:36.327363Z",
                    "lastUpdatedDate": "2021-01-29T15:48:36.327368Z"
                }
            ];
            return response;
        });
        this.get(SAVINGS_URL, () => {
            const response = {
                savings: {
                    realized: 283.99,
                    recommended: 333.99
                }
            }
            return response;
        });
    }
};

export default mockServer;