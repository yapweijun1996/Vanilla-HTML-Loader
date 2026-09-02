import { loaders } from '../loaders/index.js';

const targets = new Map([
  ['file-upload-queue', 'File Upload Queue'],
  ['file-download-manager', 'File Download Manager'],
  ['ocr-idp-pipeline', 'OCR Pipeline'],
  ['pdf-export-pipeline', 'Report Export'],
  ['media-transcoding-pipeline', 'Media Processing'],
  ['cross-system-data-sync', 'Cross-system Sync']
]);

const failures = [];
for (const [id, expectedName] of targets) {
  const loader = loaders.find(item => item.id === id);
  if (!loader) { failures.push(`${id}: missing from registry`); continue; }
  const stepCount = (loader.markup.match(/class="[^"]*\bvl-opv2-step\b[^"]*"/g) || []).length;
  const progressCount = (loader.markup.match(/role="progressbar"/g) || []).length;
  if (loader.name !== expectedName) failures.push(`${id}: expected name ${expectedName}, got ${loader.name}`);
  if (!/class="[^"]*\bvl-opv2\b/.test(loader.markup)) failures.push(`${id}: missing V2 root class`);
  if (!loader.css.includes('.vl-opv2-progress')) failures.push(`${id}: missing shared V2 progress styling`);
  if (progressCount !== 1) failures.push(`${id}: expected exactly 1 progressbar, got ${progressCount}`);
  if (stepCount > 3) failures.push(`${id}: expected at most 3 visible workflow steps, got ${stepCount}`);
  if (/Extracting fields<\/span>|Rendering pages<\/span>.*Packaging<\/span>.*Download ready<\/span>|Audio Processing<\/span>.*Video Processing<\/span>.*Thumbnailing<\/span>/s.test(loader.markup)) {
    failures.push(`${id}: legacy dense workflow labels remain visible`);
  }
}

const operations = loaders.filter(loader => loader.category === 'Operations');
if (operations.length !== 21) failures.push(`Operations registry count drifted: expected 21, got ${operations.length}`);

if (failures.length) {
  console.error('Operations Loader V2 verification FAILED');
  failures.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}

console.log('Operations Loader V2 verification PASS');
console.log(`  V2 flagship loaders  ${targets.size}`);
console.log(`  Operations total     ${operations.length}`);
console.log('  Progress bars        exactly 1 per flagship');
console.log('  Visible steps        max 3 per flagship');
