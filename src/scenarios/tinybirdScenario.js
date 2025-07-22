import { check } from 'k6';
import http from 'k6/http';
import { TINYBIRD_CONFIG } from '../config.js';

export function tinybirdScenario(globalIds) {
    const globalId = globalIds[Math.floor(Math.random() * globalIds.length)].global_id;
    
    const params = {
        headers: {
            'accept': 'application/json',
        },
        tags: {
            global_id: globalId
        }
    };
    
    const url = `${TINYBIRD_CONFIG.baseUrl}?global_id=${globalId}&token=${TINYBIRD_CONFIG.token}`;
    const res = http.get(url, params);
    
    // Verificaciones básicas
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time < 500ms': (r) => r.timings.duration < 500,
        'has valid json response': (r) => {
            try {
                JSON.parse(r.body);
                return true;
            } catch (e) {
                return false;
            }
        }
    });
    
    return res;
}