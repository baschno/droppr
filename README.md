# Droppr
Upload files and clipboard data through a simple HTML input field to the server.
The server responds the URL from where the resource can be accessed via HTTP.

### Installation

##### Clone repository
    cd
    clone https://github.com/sikr/drppr.git
    cd droppr

##### create directory
    mkdir www/uploads
    mkdir ssl

##### Set up modules and components
    npm install
    bower install

##### create certificate
    mkdir ssl
    cd ssl
    openssl genrsa -out key.pem
    openssl req -new -key key.pem -out csr.pem
    openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
    rm csr.pem
