import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { SharedArray } from 'k6/data';
import { CSV_CONFIG } from '../config.js';

export function loadGlobalIds(filePath) {
    return new SharedArray('global_ids', function() {
        const data = open(filePath);
        return papaparse.parse(data, CSV_CONFIG).data;
    });
}