const QUEUE_NAME = "seb2022-queue-benshuai-guo";
const QUEUE_BASE_URL = "https://sqs.ap-northeast-1.amazonaws.com/715811686143";

const REQUEST_EMAIL_ELM_ID = "targetEmail";
const RESPONSE_STATUS_ELM_ID = "gotStauts";
const RESPONSE_INFORMATION_TABLE_ELM_ID = "gotInformationTable";

let sqs = null;
let isWaiting = false;
let random_request_id = null;

function callFlow() {
    if (isWaiting) {
        console.warn('still waiting response');
        return;
    } else {
        isWaiting = true;
        showLoading();

        document.getElementById(RESPONSE_STATUS_ELM_ID).innerText = '呼出し中...';

        let email = document.getElementById(REQUEST_EMAIL_ELM_ID).value;
        message = {
            targetEmail: email
        }

        getCredentialsByIdentityPool()
        .then((credentials) => {
            AWS.config.region = AWS_REGION;
            AWS.config.credentials = credentials;
            sqs = new AWS.SQS();
    
            random_request_id = Math.random().toString(32).substring(2);
            sending_message = Object.assign(message, {requestId: random_request_id})
            return sqs.sendMessage({
                MessageBody: JSON.stringify(sending_message),
                QueueUrl: `${QUEUE_BASE_URL}/${QUEUE_NAME}-request`
            }).promise()
        })
        .then(() => {
            return receiveQueueMessage()
        })
        .then((res) => {
            document.getElementById(RESPONSE_STATUS_ELM_ID).innerText = '呼出し成功';
            hideLoading();
            isWaiting = false;

            // レスポンス受信後にしたいこと
            const responseBody = JSON.parse(res.Body);

            const departmentColumnName = document.createElement('td');
            const departmentColumnValue = document.createElement('td');
            departmentColumnName.innerText = '部署名';
            departmentColumnValue.innerText = responseBody.department;
            const departmentRowElm = document.createElement('tr');
            departmentRowElm.appendChild(departmentColumnName);
            departmentRowElm.appendChild(departmentColumnValue);

            const personNameColumnName = document.createElement('td');
            const personNameColumnValue = document.createElement('td');
            personNameColumnName.innerText = '氏名';
            personNameColumnValue.innerText = responseBody.lastName + ' ' + responseBody.firstName;
            const personNameRowElm = document.createElement('tr');
            personNameRowElm.appendChild(personNameColumnName);
            personNameRowElm.appendChild(personNameColumnValue);


            const relatedPeopleColumnName = document.createElement('td');
            const relatedPeopleColumnValue = document.createElement('td');
            relatedPeopleColumnName.innerText = '関連するユーザー';
            relatedPeopleColumnValue.innerText = JSON.stringify(responseBody.relatedPeople);
            const releatedPeopleRowElm = document.createElement('tr');
            releatedPeopleRowElm.appendChild(relatedPeopleColumnName);
            releatedPeopleRowElm.appendChild(relatedPeopleColumnValue);

            const informationTableElm = document.getElementById(RESPONSE_INFORMATION_TABLE_ELM_ID);
            informationTableElm.appendChild(departmentRowElm);
            informationTableElm.appendChild(personNameRowElm);
            informationTableElm.appendChild(releatedPeopleRowElm);
        })
        .catch((error) => {
            document.getElementById(RESPONSE_STATUS_ELM_ID).innerText = '呼出し失敗';
            hideLoading();
            isWaiting = false;

            console.warn('Calling backend queue failed.');
            console.error(error);
        });
    }
}

function receiveQueueMessage(retry=0) {
    return new Promise((resolve, reject) => {
        if (retry >= 10) {
            reject(new Error('Retry exceeded'));
        }
        else {
            let responseMessage = null;
            sqs.receiveMessage({
                QueueUrl: `${QUEUE_BASE_URL}/${QUEUE_NAME}-response`,
                MaxNumberOfMessages: 10,
                WaitTimeSeconds: 20
            })
            .promise()
            .then((data) => {
                let found = data.Messages ? data.Messages.find((v) => JSON.parse(v.Body).requestId === random_request_id) : undefined;
                if (found) {
                    return found
                }
                else {
                    return receiveQueueMessage(retry + 1);
                }
            })
            .then((res) => {
                resolve(res);
                sqs.deleteMessage({
                    QueueUrl: `${QUEUE_BASE_URL}/${QUEUE_NAME}-response`,
                    ReceiptHandle: res.ReceiptHandle
                })
                .promise()
            })
            .then(() => {return})
            .catch((error) => {
                reject(error);
            })
        }
    })
}
