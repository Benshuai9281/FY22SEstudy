from datetime import datetime, timedelta, timezone
from typing import Union
import re

import boto3
from boto3.dynamodb.conditions import Key, Attr

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

APP_NAME = 'benshuai-guo'
dynamodb_table = boto3.resource('dynamodb').Table('seb2022-table')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

t_delta = timedelta(hours=9)
JST = timezone(t_delta, 'JST')


class SignalRecordModel(BaseModel):
    objectId: str
    signalData: dict
    createDate: Union[str, None] = None


@app.get(f'/{APP_NAME}/datetime')
def get_datetime():
    return {
        'datetime': datetime.now(),
        'server': 'fastapi'
    }


@app.get(f'/{APP_NAME}/hello')
def get_message():
    return {
        'message': 'こんにちは世界！これはサーバーからの応答です。'
    }


# 自分のアプリが書き込んだデータを全て取得する
@app.get(f'/{APP_NAME}/signalRecord')
def get_signal_record():
    # データベースの検索条件を設定。自分のアプリが書き込んだデータだけ取得
    options = {
        'KeyConditionExpression': Key('owner').eq(APP_NAME),
    }

    # 検索を実行
    records = dynamodb_table.query(**options)

    # itemに変換
    items = []
    for record in records['Items']:
        item = SignalRecordModel(
            objectId=record['objectId'],
            signalData=record['signalData'],
            createDate=record['createDate'],
        )
        items.append(item)
    
    # レスポンス
    return items


# ObjectIDを指定してデータを取得する
@app.get(f'/{APP_NAME}/signalRecord/{{object_id}}')
def get_signal_record(object_id):
    # データベースの検索条件を設定。自分のアプリが書き込んだデータだけ取得
    options = {
        'KeyConditionExpression': Key('owner').eq(APP_NAME) & Key('objectId').eq(object_id),
    }

    # 検索を実行
    records = dynamodb_table.query(**options)

    # itemに変換
    items = []
    for record in records['Items']:
        item = SignalRecordModel(
            objectId=record['objectId'],
            signalData=record['signalData'],
            createDate=record['createDate'],
        )
        items.append(item)
    
    # レスポンス
    return items


# データを書き込む
@app.put(f'/{APP_NAME}/signalRecord')
def put_signal_record(item: SignalRecordModel):
    # 現在時刻を代入
    item.createDate = datetime.now(JST).isoformat()

    # オブジェクトIDが半角英数字でなければ拒否
    if re.match(r'\w+', item.objectId) is None:
        raise HTTPException(status_code=400, detail="objectId is invalid.")

    # データベースへ書き込み(put_item)
    dynamodb_table.put_item(Item={
        'owner': APP_NAME,
        'objectId': item.objectId,
        'signalData': item.signalData,
        'createDate': item.createDate,
    })

    # レスポンス
    return item


# データを削除する
@app.delete(f'/{APP_NAME}/signalRecord/{{object_id}}')
def get_signal_record(object_id):

    # 削除を実行
    records = dynamodb_table.delete_item(
        Key={
            'owner': APP_NAME,
            'objectId': object_id,
        },
    )

    return
