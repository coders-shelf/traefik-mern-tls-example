var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// mongoose接続設定
const mongoose = require('mongoose');
const uri = `mongodb://mongoAdmin:mongoPassword@mongo-example/traefik-test?authSource=admin`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// 初期データ挿入のための設定
const { Schema } = mongoose;
const SampleSchema = new Schema({
  message: String,
});
const Sample = mongoose.model('Sample', SampleSchema);
const initialData = {
  message: 'Hello World with MongoDB',
};

mongoose.connect(uri, options).then(
  () => {
    // 接続に成功した場合はテスト用のデータを作成する

    // 保存されているデータを削除
    Sample.remove({}, (err) => {
      if (err) console.log(err);
    });
    // データの挿入
    Sample.create(initialData, (err) => {
      if (err) console.log(err);
    });
  },
  (err) => {
    // 接続エラー
    console.log(err);
  }
);

// 簡易的にCORS設定
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // GET, OPTIONSのみ許可
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  // Content-Typeヘッダーを許可
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', function (req, res, next) {
  Sample.findOne(initialData)
    .then((data) => {
      res.status(200).json({
        message: data.message,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'DB ERROR',
      });
    });
});

module.exports = app;
