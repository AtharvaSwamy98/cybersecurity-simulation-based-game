import { CognitoUserPool } from "amazon-cognito-identity-js";
const poolData = {
    UserPoolId: "us-east-1_ls39ghs",
    ClientId: "als894ygnsl8ynslg48ysg4"
}
export default new CognitoUserPool(poolData);