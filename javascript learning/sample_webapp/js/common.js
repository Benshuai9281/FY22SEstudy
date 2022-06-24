const ENV_NAME = 'sample-taro';

const AWS_IDENTITY_POOL_ID  = 'ap-northeast-1:3f5d9f66-760a-4261-aa9d-f73cc331900a';
const AWS_REGION            = 'ap-northeast-1';

isLocalHost = () => {
    const hostname = window.location.hostname;

    if (hostname.indexOf('localhost') > -1) {
        return true;
    } else if (hostname.indexOf('127.0.0.1') > -1) {
        return true;
    } else {
        return false;
    }
}

getCredentialsByIdentityPool = () => {
    return new Promise((resolve, reject) => {
        AWS.config.region = AWS_REGION;
        
        const credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: AWS_IDENTITY_POOL_ID
        });
        AWS.config.credentials = credentials;

        credentials.get(() => {
            resolve({
                accessKeyId: credentials.accessKeyId,
                secretAccessKey: credentials.secretAccessKey,
                sessionToken: credentials.sessionToken
            });
        })
    })
}
