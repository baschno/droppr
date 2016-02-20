# scsw
SCSW - Skeleton of a secure (https) server and client with websockets

### Installation
Clone repository
    npm install
    bower install

### create certificate
    mkdir ssl
    cd ssl
    openssl genrsa -out key.pem
    openssl req -new -key key.pem -out csr.pem
    openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
    rm csr.pem
