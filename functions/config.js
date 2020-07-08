
module.exports = {
    algolia: {
        app_id: process.env.ALGOLIA_APP_ID,
        api_key: process.env.ALGOLIA_API_KEY,
        index_name: process.env.ALGOLIA_INDEX_NAME
    },
    accountKey: {
        type: process.env.ACCOUNT_TYPE,
        project_id: process.env.ACCOUNT_PROJECT_ID,
        private_key_id: process.env.ACCOUNT_PRIVATE_KEY_ID,
        private_key: process.env.ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'), // https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
        client_email: process.env.ACCOUNT_CLIENT_EMAIL,
        client_id: process.env.ACCOUNT_CLIENT_ID,
        auth_uri: process.env.ACCOUNT_AUTH_URI,
        token_uri: process.env.ACCOUNT_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.ACCOUNT_CLIENT_X509_CERT_URL
    }
}