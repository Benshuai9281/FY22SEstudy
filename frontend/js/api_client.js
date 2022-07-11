const API_BASE_PATH = ENV_NAME;
const API_BASE_URL = (isLocalHost()) ? `http://localhost:8000/${API_BASE_PATH}` : `https://gkng4il0w6.execute-api.ap-northeast-1.amazonaws.com/v1/${API_BASE_PATH}`;

function callApi(url, method, data=null) {
    return new Promise((resolve, reject) => {
        getCredentialsByIdentityPool()
        .then((credentials) => {
            // V4クラスのインスタンスを作成
            const req = new AWS.HttpRequest(url, AWS_REGION);
            req.method = method;
            req.headers.host = 'gkng4il0w6.execute-api.ap-northeast-1.amazonaws.com';
            req.body = data ? JSON.stringify(data) : null;
            
            // SigV4署名
            const signer = new AWS.Signers.V4(req, 'execute-api', true);
            signer.addAuthorization(credentials, AWS.util.date.getDate());
            
            const headers = req.headers;
            delete headers['host'];
              
            return axios({
                url: req.endpoint.href,
                method: method,
                data: data,
                headers: req.headers
            })
        })
        .then((res) => {
            resolve(res.data);
        })
        .catch((error) => {
            console.warn('Calling backend API failed.')
            console.error(error);
            reject(error.message)
        })
    });
}

function getDatetime() {
    const url = `${API_BASE_URL}/datetime`;

    callApi(url, 'GET')
    .then((res) => {
        document.getElementById('gotDatetime').innerText = '現在の時刻: ' + res.datetime
    })
}

function getMessage() {
    const url = `${API_BASE_URL}/hello`;

    callApi(url, 'GET')
    .then((res) => {
        document.getElementById('gotMessage').innerText = res.message
    })
}

function listObject() {
    const url = `${API_BASE_URL}/signalRecord`;

    callApi(url, 'GET')
    .then((res) => {
        document.getElementById('gotObjects').innerText = '';
        for (let item of res) {
            document.getElementById('gotObjects').innerHTML += JSON.stringify(item) + '<br>';
        }

        if (res.length > 0) {
            updateSignalImageByApiResponse(res[0]['signalData']['LED'])
        }
    })
}

function getObject() {
    const objectId = document.getElementById('objectId').value;

    if (!objectId) {
        document.getElementById('gotObjects').innerText = 'IDを入力してください';
        return
    }
    else if (!objectId.match(/\w+/)) {
        document.getElementById('gotObjects').innerText = '半角英数字で入力してください';
        return
    }
    else {
        const url = `${API_BASE_URL}/signalRecord/${objectId}`;

        callApi(url, 'GET')
        .then((res) => {
            document.getElementById('gotObjects').innerText = '';
            for (let item of res) {
                document.getElementById('gotObjects').innerHTML += JSON.stringify(item) + '<br>';
            }

            if (res.length > 0) {
                updateSignalImageByApiResponse(res[0]['signalData']['LED'])
            }
        })
    }
}

function putObject() {
    const objectId = document.getElementById('objectId').value;
    
    if (!objectId) {
        document.getElementById('gotObjects').innerText = 'IDを入力してください';
        return
    }
    else if (!objectId.match(/\w+/)) {
        document.getElementById('gotObjects').innerText = '半角英数字で入力してください';
        return
    }
    else {
        const url = `${API_BASE_URL}/signalRecord`;

        const signalColor = document.getElementById('trafic_signal_name').innerText;

        callApi(url, 'PUT', {
            'objectId': objectId,
            'signalData': {
                'LED': signalColor,
                'device': CLIENT_NAME
            }
        })
        .then(() => {
            document.getElementById('gotObjects').innerText = '保存されました';
        })
    }
}

function deleteObject() {
    const objectId = document.getElementById('objectId').value;
    
    if (!objectId) {
        document.getElementById('gotObjects').innerText = 'IDを入力してください';
        return
    }
    else if (!objectId.match(/\w+/)) {
        document.getElementById('gotObjects').innerText = '半角英数字で入力してください';
        return
    }
    else {
        const url = `${API_BASE_URL}/signalRecord/${objectId}`;

        callApi(url, 'DELETE')
        .then(() => {
            document.getElementById('gotObjects').innerText = '削除されました';
        });
    }
}

function updateSignalImageByApiResponse(color=null) {
    if (color == 'BLUE') {
        document.getElementById('trafic_signal').src = "./img/signal_blue.png";
    }
    else if (color == 'YELLOW') {
        document.getElementById('trafic_signal').src = './img/signal_yellow.png';
    }
    else if (color == 'RED') {
        document.getElementById('trafic_signal').src = './img/signal_red.png';
    } else {
        document.getElementById('trafic_signal').src = './img/signal_AUTO.png';
    }

    document.getElementById('trafic_signal_name').innerText = color ?? 'AUTO';
}
