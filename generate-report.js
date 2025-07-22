const fs = require('fs');
const path = require('path');
const { htmlReport } = require('k6-html-reporter');

const reportDir = path.join(__dirname, 'reports');
if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
}

const summary = JSON.parse(fs.readFileSync('summary.json', 'utf8'));
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const reportName = `tinybird_full_report_${timestamp}.html`;
const reportPath = path.join(reportDir, reportName);

fs.writeFileSync(reportPath, htmlReport(summary));
console.log(`Report generated at ${reportPath}`);