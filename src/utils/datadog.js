import http from 'k6/http';
import { DATADOG_CONFIG } from '../config.js';

export function sendToDatadog(metrics, testName) {
    if (!DATADOG_CONFIG.apiKey || !DATADOG_CONFIG.appKey) {
        console.log('Datadog credentials not provided, skipping upload');
        return;
    }

    const url = `https://api.${DATADOG_CONFIG.site}/api/v1/series`;
    const now = Math.floor(Date.now() / 1000);
    const series = [];
    
    // Procesar métricas principales
    ['http_req_duration', 'http_reqs', 'iteration_duration'].forEach(metric => {
        if (metrics[metric]) {
            series.push({
                metric: `k6.${metric}.avg`,
                points: [[now, metrics[metric].values.avg || 0]],
                type: 'gauge',
                tags: [
                    `test_name:${testName}`,
                    `env:${__ENV.ENV || 'unknown'}`
                ]
            });
            
            series.push({
                metric: `k6.${metric}.p95`,
                points: [[now, metrics[metric].values['p(95)'] || 0]],
                type: 'gauge',
                tags: [
                    `test_name:${testName}`,
                    `env:${__ENV.ENV || 'unknown'}`
                ]
            });
        }
    });
    
    // Enviar datos a Datadog
    const payload = JSON.stringify({ series });
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'DD-API-KEY': DATADOG_CONFIG.apiKey
        },
        timeout: '10s'
    };
    
    const res = http.post(url, payload, params);
    
    check(res, {
        'Datadog upload successful': (r) => r.status === 202,
    });
}