let mqtt;
const reconnectTimeout  = 2000;
const mqttTimeout       = 3;

// AWS IoT Coreへの接続設定
const AWS_HOST              = 'a1euu16ezxl6p9-ats.iot.ap-northeast-1.amazonaws.com';
const BROKER_HOST           = AWS_HOST;
const BROKER_PORT           = 443; // Websocketのポート (TLSで接続する. 変更しない)
const TOPIC_NAME            = 'KM/groupH/e13971/Signal';

// clientの設定
const RANDOM_CLIENT_ID = Math.random().toString(32).substring(2);
const CLIENT_NAME = ENV_NAME + '-webapp-' + RANDOM_CLIENT_ID;

// メッセージ
const MSG_SERVER_CONNECTION_LOST  = 'MQTT サーバーへのコネクションが切れました';
const MSG_SERVER_CONNECTION_RETRY = 'MQTT サーバーへの接続をリトライしています';
const MSG_SERVER_CONNECTION_READY = 'MQTT サーバーへの接続に成功しました (HOST:PORT)';

// ステータス
const STATUS_SERVER_DISCONNECTED    = 'Disconnected';
const STATUS_SERVER_FAILED          = 'Failed to connect';
const STATUS_SERVER_CONNECTED       = 'Connected';
const STATUS_SERVER_CONNECTING      = 'Connecting to HOST:PORT';


function getSignatureKey(key, date, region, service) {
	const kDate = AWS.util.crypto.hmac('AWS4' + key, date, 'buffer');
	const kRegion = AWS.util.crypto.hmac(kDate, region, 'buffer');
	const kService = AWS.util.crypto.hmac(kRegion, service, 'buffer');
	const kCredentials = AWS.util.crypto.hmac(kService, 'aws4_request', 'buffer');
	return kCredentials;
};


function getSignedUrl(host, region, credentials) {
	const datetime = AWS.util.date.iso8601(new Date()).replace(/[:\-]|\.\d{3}/g, '');
	const date = datetime.substr(0, 8);
 
	const method = 'GET';
	const protocol = 'wss';
	const uri = '/mqtt';
	const service = 'iotdevicegateway';
	const algorithm = 'AWS4-HMAC-SHA256';
 
	const credentialScope = date + '/' + region + '/' + service + '/' + 'aws4_request';
	let canonicalQuerystring = 'X-Amz-Algorithm=' + algorithm;
	canonicalQuerystring += '&X-Amz-Credential=' + encodeURIComponent(credentials.accessKeyId + '/' + credentialScope);
	canonicalQuerystring += '&X-Amz-Date=' + datetime;
	canonicalQuerystring += '&X-Amz-SignedHeaders=host';
 
	const canonicalHeaders = 'host:' + host + '\n';
	const payloadHash = AWS.util.crypto.sha256('', 'hex')
	const canonicalRequest = method + '\n' + uri + '\n' + canonicalQuerystring + '\n' + canonicalHeaders + '\nhost\n' + payloadHash;
 
	const stringToSign = algorithm + '\n' + datetime + '\n' + credentialScope + '\n' + AWS.util.crypto.sha256(canonicalRequest, 'hex');
	const signingKey = getSignatureKey(credentials.secretAccessKey, date, region, service);
	const signature = AWS.util.crypto.hmac(signingKey, stringToSign, 'hex');
 
	canonicalQuerystring += '&X-Amz-Signature=' + signature;
	if (credentials.sessionToken) {
		canonicalQuerystring += '&X-Amz-Security-Token=' + encodeURIComponent(credentials.sessionToken);
	}
 
	var requestUrl = protocol + '://' + host + uri + '?' + canonicalQuerystring;
	return requestUrl;
};


// 接続が切断された場合の処理
function onConnectionLost() {
    console.error(STATUS_SERVER_DISCONNECTED);
    document.getElementById('status').innerHTML = STATUS_SERVER_DISCONNECTED;
    document.getElementById('messages').innerHTML = MSG_SERVER_CONNECTION_LOST;
    connected_flag = 0;
}


// 接続に失敗した場合の処理
function onFailure(message) {
    console.error(STATUS_SERVER_FAILED);
    console.error(message);
    document.getElementById('messages').innerHTML = MSG_SERVER_CONNECTION_RETRY;
    setTimeout(mqttConnect, reconnectTimeout);
}


// メッセージを受信した場合の処理
function onMessageArrived(r_message) {
    out_msg = 'Message : ' + r_message.payloadString;
    console.log('Message received ', r_message.payloadString);
    console.log(out_msg);
    document.getElementById('messages').innerHTML = out_msg;
    //受け取ったMQTT Message を JSON 形式でパースする
    json = JSON.parse(r_message.payloadString);
    //console.log(json.deviceName);
    console.log(json.door);
    if ((json.door == 'open') && (json.status == "wait")) {
        weather.fetchWeather("Hachiouji");
        weatherfc.fetchWeather("Hachiouji");
        }
        //雨判断
        //if 雨
        //通知機能
    if (json.status == 'inhome'){
        document.getElementById('info').innerHTML = "☁ お帰りなさい！ ☁";
    }
    if (json.status == 'outhome'){
        document.getElementById('info').innerHTML = "☁ 良い一日を！ ☁";
    }
    if (json.key == 'aru'){
        document.getElementById('info').innerHTML = "☁ 忘れ物確認して！ ☁";
    }
    if (json.record == 'start'){
        document.getElementById("RecStart").click();
    }
    if (json.record == 'stop'){
        document.getElementById("RecStop").click();
    }
    if (json.record == 'play'){
        document.body.querySelector("#audio_play").play();
    }
}


// 接続完了した場合の処理
function onConnected(recon, url) {
    console.log(' in onConnected ' + reconn);
}


// 接続中の処理
function onConnect() {
    console.log(STATUS_SERVER_CONNECTED);
    document.getElementById('messages').innerHTML = MSG_SERVER_CONNECTION_READY.replace('HOST', BROKER_HOST).replace('PORT', BROKER_PORT);
    connected_flag = 1;
    document.getElementById('status').innerHTML = STATUS_SERVER_CONNECTED;
    console.log('on Connect ' + connected_flag);
    mqtt.subscribe(TOPIC_NAME);
}


// 切断の処理
function disconnect() {
    if (connected_flag == 1)
        mqtt.disconnect();
}


// 接続開始の処理
function mqttConnect() {
    console.log((STATUS_SERVER_CONNECTING).replace('HOST', BROKER_HOST).replace('PORT', BROKER_PORT));

    getCredentialsByIdentityPool()
    .then((credentials) => {
        REQUEST_URL = getSignedUrl(AWS_HOST, AWS_REGION, credentials);
        mqtt = new Paho.MQTT.Client(REQUEST_URL, CLIENT_NAME)
        mqtt.onConnectionLost = onConnectionLost;
        mqtt.onMessageArrived = onMessageArrived;
        mqtt.onConnected = onConnected;

        options = {
            useSSL: true,
            timeout: mqttTimeout,
            mqttVersion: 4,
            onSuccess: onConnect,
            onFailure: onFailure,
        };
        mqtt.connect(options); //connect
        return false;
    });
}


// 信号機のボタンがクリックされた場合の処理
function amedesu() {
        const payload = {
            "device": "Webapp",
            "rain": "yes"
        };
        const json_msg = JSON.stringify(payload);
        const topic = TOPIC_NAME;
        console.log(json_msg);
        message = new Paho.MQTT.Message(json_msg);
        message.destinationName = topic;
        mqtt.send(message);
}
