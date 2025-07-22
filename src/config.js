export const ENVIRONMENTS = {
    smoke: {
        vus: 5,
        duration: '1m',
        requestsPerVu: 10
    },
    load: {
        vus: 20,
        duration: '5m',
        requestsPerVu: 50
    },
    stress: {
        vus: 50,
        duration: '10m',
        requestsPerVu: 100
    }
};

export const TINYBIRD_CONFIG = {
    baseUrl: 'https://api.us-east.aws.tinybird.co/v0/pipes/edp_propensionprestamos.json',
    token: __ENV.TINYBIRD_TOKEN || 'p.eyJ1IjogIjJiZDc2ZmU1LTg3ZWEtNDE2Mi04NDE0LWQ4Mzk0ZDg5YmFkMSIsICJpZCI6ICJkMjcyZTg3Ni00NDg3LTRjNzQtODEwYi1mYWE1NzUzMGUzMGQiLCAiaG9zdCI6ICJ1cy1lYXN0LWF3cyJ9.UbX4ZqS9YHSDlxRPxsHqB7Y_xfoJRxDBIeDepK21F1E'
};

export const DATADOG_CONFIG = {
    apiKey: __ENV.DATADOG_API_KEY || '',
    appKey: __ENV.DATADOG_APP_KEY || '',
    site: __ENV.DATADOG_SITE || 'us5.datadoghq.com'
};

export const CSV_CONFIG = {
    delimiter: ",",
    header: true
};