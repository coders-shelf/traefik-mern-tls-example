# Traefik & Let's Encrypt Example

このプロジェクトは [traefik-mern-example](https://github.com/coders-shelf/traefik-mern-example)を Let's Encrypt で TLS 対応させたプロジェクトになります。

`reverse-proxy/`は traefik の設定,`frontend/`は 簡単な React アプリ,`backend/`は Express による API サーバーになります。
React アプリは Express と簡単な通信を行います。(Express は MongoDB から読み出したデータを返します)

詳しくは[ブログ](https://coders-shelf.com/traefik-lets-encrypt/)を参考にしてください。

---

docker, docker-compose が利用可能なサーバー上で実行することを想定しています。 実際に動かすにはメールアドレス、ドメインが必要です。

実行前に以下の手順が必要になります。

## reverse-proxy

traefik では以下の手順が必要です。

1. traefik.yml でメールアドレスを書き換えてください

2. dynamic_conf.yml でドメインを書き換えてください

3. 管理画面に Basic 認証をかけるため、ユーザ名とパスワードを用意します

   `$ echo $(htpasswd -nb user password)`でユーザ名とパスワードを生成できます。

   生成したユーザ名とパスワードを`reverse-proxy > config > .htpasswd`に配置してください。

   例：プロジェクトルートで`$ echo $(htpasswd -nb adminUser adminPassword) > ./reverse-proxy/config/.htpasswd`

4. .env に MongoDB サービスに必要なユーザ名、パスワードを記入してください

## frontend

.env ファイルをコピーし、.env.production を作成します。REACT_APP_BASE_URL の値を用意したバックエンド用の URL に変更します。(例：https://api.example.com)

docker-compose.yml でドメインを書き換えてください

## backend

.env.example ファイルをコピーし、.env を作成します。
MongoDB サービスに必要なユーザ名、パスワードを記入してください。

docker-compose.yml でドメインを書き換えてください

# 実行

事前にDockerネットワークを作成しておきます。

`docker network create web-services`

`docker network create backend-db`

実行の際はそれぞれ`sudo docker-compose up -d`でサービスを立ち上げます。
