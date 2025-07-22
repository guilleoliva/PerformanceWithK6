 import { check, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { loadGlobalIds } from './utils/loadGlobalIds.js';
import { tinybirdScenario } from './scenarios/tinybirdScenario.js';
import { ENVIRONMENTS, TINYBIRD_CONFIG } from './config.js';
import { sendToDatadog } from './utils/datadog.js';

// Cargar global_ids desde CSV
const globalIds = loadGlobalIds('./data/global_ids.csv');

// Configuración basada en entorno
const env = __ENV.ENV || 'smoke';
const config = ENVIRONMENTS[env];

export const options = {
    scenarios: {
        tinybird_performance: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: config.vus / 2 },
                { duration: '1m', target: config.vus },
                { duration: config.duration, target: config.vus },
                { duration: '30s', target: 0 },
            ],
            gracefulRampDown: '30s',
        },
    },
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.01']
    }
};

export default function () {
    group('Tinybird API Test', () => {
        tinybirdScenario(globalIds);
    });
}

export function handleSummary(data) {
    // Enviar métricas a Datadog
    if (__ENV.DATADOG_API_KEY) {
        sendToDatadog(data, `tinybird_performance_${env}`);
    }
    
    // Generar reporte HTML
    const reportName = `reports/tinybird_${env}_report_${new Date().toISOString().replace(/[:.]/g, '-')}.html`;
    return {
        [reportName]: htmlReport(data),
        'stdout': textSummary(data, { indent: ' ', enableColors: true }),
    };
}