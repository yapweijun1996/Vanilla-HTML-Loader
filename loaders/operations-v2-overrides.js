const OPERATIONS_V2_BASE_CSS = `.vl-opv2 {
  --opv2-ink: #172033;
  --opv2-muted: #657187;
  --opv2-line: #dce5f0;
  --opv2-soft: color-mix(in srgb, var(--loader-accent) 9%, #ffffff);
  width: 200px;
  height: 126px;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 29px 1fr 5px 14px;
  gap: 5px;
  padding: 8px 9px 7px;
  overflow: hidden;
  border: 1px solid var(--opv2-line);
  border-radius: 13px;
  background: linear-gradient(160deg, #ffffff, #f8fbff 72%, color-mix(in srgb, var(--loader-accent) 5%, #ffffff));
  color: var(--opv2-ink);
  box-shadow: 0 8px 22px rgba(15, 23, 42, .08);
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
}
.vl-opv2-head { min-width:0; display:grid; grid-template-columns:26px minmax(0,1fr) auto; align-items:center; gap:7px; }
.vl-opv2-icon { width:26px; height:26px; display:grid; place-items:center; border-radius:8px; background:var(--opv2-soft); color:var(--loader-accent); font:800 13px/1 system-ui,sans-serif; }
.vl-opv2-copy { min-width:0; display:grid; gap:1px; }
.vl-opv2-context { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:var(--opv2-ink); font:800 9px/1.15 system-ui,sans-serif; }
.vl-opv2-status { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:var(--opv2-muted); font:650 8px/1.15 system-ui,sans-serif; }
.vl-opv2-state { min-width:0; padding:3px 5px; border-radius:999px; background:color-mix(in srgb,var(--loader-accent) 10%,#fff); color:color-mix(in srgb,var(--loader-accent) 78%,#17346d); font:800 6.5px/1 system-ui,sans-serif; white-space:nowrap; }
.vl-opv2-state.is-paused { background:#fff6dc; color:#8a5a00; }
.vl-opv2-state.is-error, .vl-opv2-state.is-failed { background:#fff0f1; color:#b42332; }
.vl-opv2-state.is-done { background:#eaf8f1; color:#147a4c; }
.vl-opv2-visual { min-height:0; position:relative; display:grid; place-items:center; overflow:hidden; }
.vl-opv2-progress { height:5px; overflow:hidden; border-radius:999px; background:#e8eef7; }
.vl-opv2-progress-fill { display:block; width:0; height:100%; border-radius:inherit; background:var(--loader-accent); box-shadow:0 0 7px color-mix(in srgb,var(--loader-accent) 24%,transparent); transition:width .25s ease; }
.vl-opv2-meta { min-width:0; display:grid; grid-template-columns:minmax(0,1fr) auto auto; align-items:center; gap:7px; color:var(--opv2-muted); font:650 7.5px/1 system-ui,sans-serif; }
.vl-opv2-meta > span { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.vl-opv2-percent { color:var(--opv2-ink); font-size:8.5px; }
.vl-opv2-steps { width:156px; display:grid; grid-template-columns:repeat(3,1fr); align-items:start; position:relative; }
.vl-opv2-steps::before { content:''; position:absolute; left:24px; right:24px; top:10px; height:1px; background:#d7e1ee; }
.vl-opv2-step { position:relative; z-index:1; display:grid; place-items:center; gap:3px; color:#8793a6; font:700 7px/1 system-ui,sans-serif; text-align:center; }
.vl-opv2-step::before { content:''; width:18px; height:18px; box-sizing:border-box; border:1px solid #cbd6e5; border-radius:50%; background:#fff; }
.vl-opv2-step.is-active { color:color-mix(in srgb,var(--loader-accent) 84%,#16346f); }
.vl-opv2-step.is-active::before { border:5px solid color-mix(in srgb,var(--loader-accent) 22%,#fff); background:var(--loader-accent); box-shadow:0 0 0 2px color-mix(in srgb,var(--loader-accent) 12%,transparent); animation:vl-opv2-node-pulse calc(var(--loader-speed) * 1.1) ease-in-out infinite; }
.vl-opv2-step.is-done::before { border-color:color-mix(in srgb,var(--loader-accent) 42%,#cbd6e5); background:color-mix(in srgb,var(--loader-accent) 14%,#fff); }
.vl-opv2.has-warning { --opv2-line:#efc7cb; }
.vl-opv2-sr { position:absolute!important; width:1px!important; height:1px!important; overflow:hidden!important; clip:rect(0 0 0 0)!important; white-space:nowrap!important; }
@keyframes vl-opv2-node-pulse { 0%,100% { transform:scale(.88); } 50% { transform:scale(1.08); } }
@media (prefers-reduced-motion: reduce) { .vl-opv2 *, .vl-opv2 *::before, .vl-opv2 *::after { animation-play-state:paused!important; } }
}`;

function updateProgress(root, progress, trackSelector, fillSelector, percentSelector) {
  const safe = Math.max(0, Math.min(100, Number(progress) || 0));
  root.querySelector(trackSelector)?.setAttribute('aria-valuenow', String(Math.round(safe)));
  const fill = root.querySelector(fillSelector); if (fill) fill.style.width = `${safe}%`;
  const percent = root.querySelector(percentSelector); if (percent) percent.textContent = `${Math.round(safe)}%`;
  return safe;
}
function updateState(root, selector, status) {
  const el = root.querySelector(selector); if (!el) return;
  const label = status || 'Active';
  const map = { Active:'is-active', Paused:'is-paused', Retrying:'is-paused', Error:'is-error', Failed:'is-failed', Completed:'is-done' };
  el.textContent = label; el.classList.remove('is-active','is-paused','is-error','is-failed','is-done'); el.classList.add(map[label] || 'is-active');
}
function updateThreeSteps(root, selector, activeIndex) {
  root.querySelectorAll(selector).forEach((step,index) => { step.classList.toggle('is-done', index < activeIndex); step.classList.toggle('is-active', index === activeIndex); });
}
function etaText(seconds) { const safe=Math.max(0,Math.round(Number(seconds)||0)); return String(Math.floor(safe/60)).padStart(2,'0')+':'+String(safe%60).padStart(2,'0'); }

const fileUploadQueue = {
  description: 'A simplified upload queue focused on one active state, a clear transfer animation, and one overall progress signal.',
  markup: `<div class="vl-upload-queue vl-opv2" role="region" aria-label="File upload queue">
  <div class="vl-opv2-head">
    <span class="vl-opv2-icon" aria-hidden="true">↑</span>
    <span class="vl-opv2-copy"><strong class="vl-upload-name vl-opv2-context">invoice.pdf</strong><span class="vl-upload-stage vl-opv2-status">Uploading files</span></span>
    <span class="vl-upload-status vl-opv2-state is-active">Active</span>
  </div>
  <div class="vl-opv2-visual vl-upload-visual" aria-hidden="true">
    <span class="vl-upload-file-token is-pdf">PDF</span><span class="vl-upload-file-token is-xls">XLS</span><span class="vl-upload-file-token is-img">IMG</span>
    <span class="vl-upload-path"></span><span class="vl-upload-cloud">↑</span>
  </div>
  <div class="vl-upload-track vl-opv2-progress" role="progressbar" aria-label="Upload progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="72"><span class="vl-upload-fill vl-opv2-progress-fill" style="width:72%"></span></div>
  <div class="vl-opv2-meta"><span class="vl-upload-count">1 / 3 files</span><strong class="vl-upload-percent vl-opv2-percent">72%</strong><span class="vl-upload-eta">ETA 00:24</span></div>
  <span class="vl-opv2-sr" data-file-id="invoice" data-name="invoice.pdf" data-progress="72" data-status="active"></span>
  <span class="vl-opv2-sr" data-file-id="products" data-name="products.xlsx" data-progress="0" data-status="queued"></span>
  <span class="vl-opv2-sr" data-file-id="photo" data-name="photo.jpg" data-progress="100" data-status="done"></span>
</div>`,
  css: `${OPERATIONS_V2_BASE_CSS}
.vl-upload-visual { grid-template-columns:28px 28px 28px 42px; gap:5px; align-items:center; }
.vl-upload-file-token { width:25px; height:30px; display:grid; place-items:center; border:1px solid #d8e1ed; border-radius:6px; background:#fff; font:800 6px/1 system-ui,sans-serif; box-shadow:0 4px 10px rgba(15,23,42,.06); animation:vl-upload-token calc(var(--loader-speed) * 1.7) ease-in-out infinite; }
.vl-upload-file-token.is-pdf { color:#cb3a4a; animation-delay:-.55s; }
.vl-upload-file-token.is-xls { color:#16845b; animation-delay:-.3s; }
.vl-upload-file-token.is-img { color:#6d51c7; animation-delay:-.05s; }
.vl-upload-path { position:absolute; left:24px; right:37px; bottom:7px; border-top:1px dashed color-mix(in srgb,var(--loader-accent) 35%,#d5dfec); }
.vl-upload-cloud { width:38px; height:25px; display:grid; place-items:center; border-radius:14px 14px 11px 11px; background:color-mix(in srgb,var(--loader-accent) 10%,#fff); color:var(--loader-accent); font:900 18px/1 system-ui; box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--loader-accent) 18%,#dbe5f1); animation:vl-upload-cloud calc(var(--loader-speed) * 1.15) ease-in-out infinite; }
@keyframes vl-upload-token { 0%,100% { transform:translateY(2px); opacity:.62; } 50% { transform:translateY(-3px); opacity:1; } }
@keyframes vl-upload-cloud { 0%,100% { transform:translateY(1px); } 50% { transform:translateY(-2px); } }`,
  js: `AppLoader.updateFile = function (fileId, progress, status = '') {
  const root = loaderElement.querySelector('.vl-upload-queue');
  const item = root && root.querySelector('[data-file-id="' + fileId + '"]');
  if (!root || !item) return;
  const value = Math.max(0, Math.min(100, Number(progress) || 0));
  item.dataset.progress = String(value);
  item.dataset.status = status || (value >= 100 ? 'done' : value > 0 ? 'active' : 'queued');
  root.querySelector('.vl-upload-name').textContent = item.dataset.name || fileId;
  root.querySelector('.vl-upload-stage').textContent = value >= 100 ? 'Upload complete' : status === 'error' ? 'Upload failed' : 'Uploading files';
  const items = [...root.querySelectorAll('[data-file-id]')];
  const average = items.reduce((sum, node) => sum + (Number(node.dataset.progress) || 0), 0) / Math.max(1, items.length);
  const complete = items.filter(node => Number(node.dataset.progress) >= 100).length;
  root.querySelector('.vl-upload-track').setAttribute('aria-valuenow', String(Math.round(average)));
  root.querySelector('.vl-upload-fill').style.width = average + '%';
  root.querySelector('.vl-upload-percent').textContent = Math.round(average) + '%';
  root.querySelector('.vl-upload-count').textContent = complete + ' / ' + items.length + ' files';
  const state = root.querySelector('.vl-upload-status');
  state.textContent = status === 'error' ? 'Error' : average >= 100 ? 'Completed' : 'Active';
  state.className = 'vl-upload-status vl-opv2-state ' + (status === 'error' ? 'is-error' : average >= 100 ? 'is-done' : 'is-active');
};`
};

const fileDownloadManager = {
  description: 'A focused download state with a large cloud-transfer animation, one progress bar, file-size progress and ETA.',
  markup: `<div class="vl-file-download-manager vl-opv2" role="region" aria-label="File download manager" data-speed="4.8">
  <div class="vl-opv2-head">
    <span class="vl-opv2-icon" aria-hidden="true">↓</span>
    <span class="vl-opv2-copy"><strong class="vl-download-file vl-opv2-context">data_backup_2026.zip</strong><span class="vl-download-stage vl-opv2-status">Downloading files</span></span>
    <span class="vl-download-status vl-opv2-state is-active">Active</span>
  </div>
  <div class="vl-opv2-visual vl-download-visual" aria-hidden="true"><span class="vl-download-cloud"></span><span class="vl-download-arrow">↓</span><span class="vl-download-stream s1"></span><span class="vl-download-stream s2"></span><span class="vl-download-stream s3"></span></div>
  <div class="vl-download-track vl-opv2-progress" role="progressbar" aria-label="Download progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="48"><span class="vl-download-fill vl-opv2-progress-fill" style="width:48%"></span></div>
  <div class="vl-opv2-meta"><span class="vl-download-size">58 MB / 120 MB</span><strong class="vl-download-percent vl-opv2-percent">48%</strong><span class="vl-download-eta">ETA 00:13</span></div>
  <span class="vl-download-speed vl-opv2-sr">4.8 MB/s</span><span class="vl-download-queued vl-opv2-sr">Queued: 1</span>
</div>`,
  css: `${OPERATIONS_V2_BASE_CSS}
.vl-download-cloud { width:58px; height:27px; border-radius:22px 22px 14px 14px; background:color-mix(in srgb,var(--loader-accent) 11%,#fff); box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--loader-accent) 19%,#d7e1ee); }
.vl-download-arrow { position:absolute; left:50%; top:9px; color:var(--loader-accent); font:900 25px/1 system-ui; animation:vl-download-arrow calc(var(--loader-speed) * 1.05) ease-in-out infinite; }
.vl-download-stream { position:absolute; bottom:5px; width:3px; height:3px; border-radius:50%; background:color-mix(in srgb,var(--loader-accent) 65%,#fff); animation:vl-download-stream calc(var(--loader-speed) * 1.15) ease-in-out infinite; }
.vl-download-stream.s1 { left:42%; animation-delay:-.5s; }.vl-download-stream.s2 { left:50%; animation-delay:-.25s; }.vl-download-stream.s3 { left:58%; }
@keyframes vl-download-arrow { 0%,100% { transform:translate(-50%,-3px); opacity:.55; } 50% { transform:translate(-50%,5px); opacity:1; } }
@keyframes vl-download-stream { 0%,100% { transform:translateY(-6px); opacity:0; } 50% { transform:translateY(3px); opacity:1; } }`,
  applyControls(container, values) {
    const root = container.querySelector('.vl-file-download-manager'); if (!root) return;
    const progress = updateProgress(root, values.progress, '.vl-download-track', '.vl-download-fill', '.vl-download-percent');
    const speed = Math.max(.5, Number(values.speed) || 4.8), total = 120, downloaded = Math.round(total * progress / 100);
    root.querySelector('.vl-download-stage').textContent = values.stage === 'Complete' ? 'Download complete' : `${values.stage || 'Downloading'} files`;
    root.querySelector('.vl-download-size').textContent = `${downloaded} MB / ${total} MB`;
    root.querySelector('.vl-download-speed').textContent = `${speed.toFixed(1)} MB/s`;
    root.querySelector('.vl-download-eta').textContent = `ETA ${etaText(Math.max(0,total-downloaded)/speed)}`;
    root.querySelector('.vl-download-queued').textContent = progress >= 100 ? 'Queued: 0' : 'Queued: 1';
    root.setAttribute('data-speed', String(speed));
    updateState(root, '.vl-download-status', values.status || 'Active');
  },
  js: `AppLoader.setProgress=function(value){const r=loaderElement.querySelector('.vl-file-download-manager');if(!r)return;const p=Math.max(0,Math.min(100,Number(value)||0)),t=120,d=Math.round(t*p/100),s=Math.max(.5,Number(r.getAttribute('data-speed'))||4.8),e=Math.round(Math.max(0,t-d)/s);r.querySelector('.vl-download-track').setAttribute('aria-valuenow',String(Math.round(p)));r.querySelector('.vl-download-fill').style.width=p+'%';r.querySelector('.vl-download-percent').textContent=Math.round(p)+'%';r.querySelector('.vl-download-size').textContent=d+' MB / '+t+' MB';r.querySelector('.vl-download-eta').textContent='ETA '+String(Math.floor(e/60)).padStart(2,'0')+':'+String(e%60).padStart(2,'0');};
AppLoader.setSpeed=function(value){const r=loaderElement.querySelector('.vl-file-download-manager');if(!r)return;const s=Math.max(.5,Number(value)||4.8);r.setAttribute('data-speed',String(s));r.querySelector('.vl-download-speed').textContent=s.toFixed(1)+' MB/s';};
AppLoader.setStage=function(value){const r=loaderElement.querySelector('.vl-file-download-manager');if(r)r.querySelector('.vl-download-stage').textContent=value==='Complete'?'Download complete':(value||'Downloading')+' files';};
AppLoader.setStatus=function(value){const e=loaderElement.querySelector('.vl-download-status');if(!e)return;const l=value||'Active',m={Active:'is-active',Paused:'is-paused',Retrying:'is-paused',Failed:'is-failed',Completed:'is-done'};e.textContent=l;e.className='vl-download-status vl-opv2-state '+(m[l]||'is-active');};`
};

const ocrPipeline = {
  name: 'OCR Pipeline',
  description: 'A three-step document extraction workflow with one primary stage, readable document progress and a compact ETA.',
  markup: `<div class="vl-ocr-pipeline vl-opv2" role="region" aria-label="OCR pipeline" data-confidence="88">
  <div class="vl-opv2-head">
    <span class="vl-opv2-icon" aria-hidden="true">⌗</span>
    <span class="vl-opv2-copy"><strong class="vl-ocr-file vl-opv2-context">invoice_batch_2026-08.csv</strong><span class="vl-ocr-stage vl-opv2-status">Uploading documents</span></span>
    <span class="vl-ocr-status vl-opv2-state is-active">Active</span>
  </div>
  <div class="vl-opv2-visual"><div class="vl-ocr-steps vl-opv2-steps" aria-label="Upload, OCR, Validate"><span class="vl-ocr-step vl-opv2-step is-active" data-step="Upload">Upload</span><span class="vl-ocr-step vl-opv2-step" data-step="OCR">OCR</span><span class="vl-ocr-step vl-opv2-step" data-step="Validate">Validate</span></div></div>
  <div class="vl-ocr-progress vl-opv2-progress" role="progressbar" aria-label="OCR progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="34"><span class="vl-ocr-fill vl-opv2-progress-fill" style="width:34%"></span></div>
  <div class="vl-opv2-meta"><span class="vl-ocr-docs">8 / 24 docs</span><strong class="vl-ocr-percent vl-opv2-percent">34%</strong><span class="vl-ocr-eta">ETA 01:20</span></div>
  <span class="vl-ocr-confidence vl-opv2-sr">Accuracy 88%</span><span class="vl-ocr-fields vl-opv2-sr">45 / 132 fields</span><span class="vl-ocr-failed vl-opv2-sr">Failed: 0</span>
</div>`,
  css: `${OPERATIONS_V2_BASE_CSS}
.vl-ocr-pipeline[data-confidence="100"] .vl-opv2-icon { box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--loader-accent) 22%,transparent); }
.vl-ocr-pipeline.has-warning .vl-opv2-icon { color:#b42332; background:#fff0f1; }`,
  applyControls(container, values) {
    const root = container.querySelector('.vl-ocr-pipeline'); if (!root) return;
    const progress = updateProgress(root, values.progress, '.vl-ocr-progress', '.vl-ocr-fill', '.vl-ocr-percent');
    const stage = values.stage || 'Uploading', confidence = Math.max(0, Math.min(100, Number(values.confidence) || 0)), failed = Math.max(0, Math.round(Number(values.failed) || 0));
    const stageMap = { Uploading:0, OCR:1, 'Extracting fields':1, Validating:2, Completed:2 };
    const labels = { Uploading:'Uploading documents', OCR:'Reading document text', 'Extracting fields':'Extracting fields', Validating:'Validating extraction', Completed:'Extraction complete' };
    root.querySelector('.vl-ocr-stage').textContent = labels[stage] || stage;
    updateThreeSteps(root, '.vl-ocr-step', stageMap[stage] ?? 0);
    root.querySelector('.vl-ocr-docs').textContent = `${Math.round(24 * progress / 100)} / 24 docs`;
    root.querySelector('.vl-ocr-fields').textContent = `${Math.round(132 * progress / 100)} / 132 fields`;
    root.querySelector('.vl-ocr-confidence').textContent = `Accuracy ${confidence}%`;
    root.querySelector('.vl-ocr-eta').textContent = `ETA ${etaText((100-progress)*1.2)}`;
    root.querySelector('.vl-ocr-failed').textContent = `Failed: ${failed}`;
    root.setAttribute('data-confidence', String(confidence)); root.classList.toggle('has-warning', failed > 0);
    updateState(root, '.vl-ocr-status', values.status || 'Active');
  },
  js: `const ocrStageGroup={Uploading:0,OCR:1,'Extracting fields':1,Validating:2,Completed:2};
function setOcrSteps(root,index){root.querySelectorAll('.vl-ocr-step').forEach((s,i)=>{s.classList.toggle('is-done',i<index);s.classList.toggle('is-active',i===index);});}
AppLoader.setProgress=function(value,fields,confidence){const r=loaderElement.querySelector('.vl-ocr-pipeline');if(!r)return;const p=Math.max(0,Math.min(100,Number(value)||0)),c=Math.max(0,Math.min(100,Number(confidence)||88));r.querySelector('.vl-ocr-progress').setAttribute('aria-valuenow',String(Math.round(p)));r.querySelector('.vl-ocr-fill').style.width=p+'%';r.querySelector('.vl-ocr-percent').textContent=Math.round(p)+'%';r.querySelector('.vl-ocr-docs').textContent=Math.round(24*p/100)+' / 24 docs';r.querySelector('.vl-ocr-fields').textContent=(Number.isFinite(Number(fields))?Math.max(0,Math.round(Number(fields))):Math.round(132*p/100))+' / 132 fields';r.querySelector('.vl-ocr-confidence').textContent='Accuracy '+c+'%';r.querySelector('.vl-ocr-eta').textContent='ETA '+String(Math.floor(Math.max(0,(100-p)*1.2)/60)).padStart(2,'0')+':'+String(Math.round(Math.max(0,(100-p)*1.2))%60).padStart(2,'0');};
AppLoader.setStage=function(value){const r=loaderElement.querySelector('.vl-ocr-pipeline');if(!r)return;const m={Uploading:'Uploading documents',OCR:'Reading document text','Extracting fields':'Extracting fields',Validating:'Validating extraction',Completed:'Extraction complete'};r.querySelector('.vl-ocr-stage').textContent=m[value]||value||'Uploading documents';setOcrSteps(r,ocrStageGroup[value]??0);};
AppLoader.setStatus=function(value){const e=loaderElement.querySelector('.vl-ocr-status');if(!e)return;const l=value||'Active',m={Active:'is-active',Paused:'is-paused',Retrying:'is-paused',Error:'is-error',Completed:'is-done'};e.textContent=l;e.className='vl-ocr-status vl-opv2-state '+(m[l]||'is-active');};
AppLoader.setFailed=function(value){const r=loaderElement.querySelector('.vl-ocr-pipeline');if(!r)return;const f=Math.max(0,Math.round(Number(value)||0));r.querySelector('.vl-ocr-failed').textContent='Failed: '+f;r.classList.toggle('has-warning',f>0);};`
};

const reportExport = {
  name: 'Report Export',
  description: 'A compact export workflow with a central document animation, one progress bar, page progress and ETA.',
  markup: `<div class="vl-report-export vl-opv2" role="region" aria-label="Report export progress" data-assets="0">
  <div class="vl-opv2-head">
    <span class="vl-opv2-icon" aria-hidden="true">▤</span>
    <span class="vl-opv2-copy"><strong class="vl-report-file vl-opv2-context">monthly-financial-summary.pdf</strong><span class="vl-report-stage vl-opv2-status">Preparing export</span></span>
    <span class="vl-report-status vl-opv2-state is-active">Active</span>
  </div>
  <div class="vl-opv2-visual vl-report-visual" aria-hidden="true"><span class="vl-report-orbit outer"></span><span class="vl-report-orbit inner"></span><span class="vl-report-doc">▤</span></div>
  <div class="vl-report-progress vl-opv2-progress" role="progressbar" aria-label="Export progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="41"><span class="vl-report-fill vl-opv2-progress-fill" style="width:41%"></span></div>
  <div class="vl-opv2-meta"><span class="vl-report-pages">82 / 200 pages</span><strong class="vl-report-percent vl-opv2-percent">41%</strong><span class="vl-report-eta">ETA 00:53</span></div>
  <span class="vl-report-size vl-opv2-sr">3.8 MB</span><span class="vl-report-assets vl-opv2-sr">0 assets</span><span class="vl-report-failed vl-opv2-sr">Failed pages: 0</span>
</div>`,
  css: `${OPERATIONS_V2_BASE_CSS}
.vl-report-doc { width:27px; height:34px; display:grid; place-items:center; border-radius:7px; background:var(--loader-accent); color:#fff; font:900 15px/1 system-ui; box-shadow:0 7px 16px color-mix(in srgb,var(--loader-accent) 22%,transparent); animation:vl-report-doc calc(var(--loader-speed) * 1.25) ease-in-out infinite; }
.vl-report-orbit { position:absolute; border:2px solid color-mix(in srgb,var(--loader-accent) 26%,transparent); border-right-color:var(--loader-accent); border-radius:50%; animation:vl-report-orbit calc(var(--loader-speed) * 2.1) linear infinite; }
.vl-report-orbit.outer { width:66px; height:66px; }.vl-report-orbit.inner { width:48px; height:48px; animation-direction:reverse; animation-duration:calc(var(--loader-speed) * 1.55); }
@keyframes vl-report-orbit { to { transform:rotate(360deg); } }
@keyframes vl-report-doc { 0%,100% { transform:scale(.94); } 50% { transform:scale(1.05); } }`,
  applyControls(container, values) {
    const root = container.querySelector('.vl-report-export'); if (!root) return;
    const progress = updateProgress(root, values.progress, '.vl-report-progress', '.vl-report-fill', '.vl-report-percent');
    const stage = values.stage || 'Preparing data', assets = Math.max(0, Math.round(Number(values.assets) || 0)), failed = Math.max(0, Math.round(Number(values.failed) || 0));
    const labels = { 'Preparing data':'Preparing export', 'Rendering pages':'Rendering pages', Packaging:'Packaging report', 'Download ready':'Download ready' };
    root.querySelector('.vl-report-stage').textContent = labels[stage] || stage;
    root.querySelector('.vl-report-pages').textContent = `${Math.round(200 * progress / 100)} / 200 pages`;
    root.querySelector('.vl-report-size').textContent = `${(9.2 * progress / 100).toFixed(1)} MB`;
    root.querySelector('.vl-report-eta').textContent = `ETA ${etaText((100-progress)*.9)}`;
    root.querySelector('.vl-report-assets').textContent = `${assets} assets`; root.querySelector('.vl-report-failed').textContent = `Failed pages: ${failed}`;
    root.setAttribute('data-assets', String(assets)); root.classList.toggle('has-warning', failed > 0);
    updateState(root, '.vl-report-status', values.status || 'Active');
  },
  js: `AppLoader.setProgress=function(value,sizeMB,assets){const r=loaderElement.querySelector('.vl-report-export');if(!r)return;const p=Math.max(0,Math.min(100,Number(value)||0)),a=Math.max(0,Math.round(Number(assets)||0)),e=Math.round(Math.max(0,(100-p)*.9));r.querySelector('.vl-report-progress').setAttribute('aria-valuenow',String(Math.round(p)));r.querySelector('.vl-report-fill').style.width=p+'%';r.querySelector('.vl-report-percent').textContent=Math.round(p)+'%';r.querySelector('.vl-report-pages').textContent=Math.round(200*p/100)+' / 200 pages';r.querySelector('.vl-report-size').textContent=(Math.max(0,Number(sizeMB)||9.2)*p/100).toFixed(1)+' MB';r.querySelector('.vl-report-eta').textContent='ETA '+String(Math.floor(e/60)).padStart(2,'0')+':'+String(e%60).padStart(2,'0');r.querySelector('.vl-report-assets').textContent=a+' assets';};
AppLoader.setStage=function(value){const r=loaderElement.querySelector('.vl-report-export');if(!r)return;const m={'Preparing data':'Preparing export','Rendering pages':'Rendering pages',Packaging:'Packaging report','Download ready':'Download ready'};r.querySelector('.vl-report-stage').textContent=m[value]||value||'Preparing export';};
AppLoader.setStatus=function(value){const e=loaderElement.querySelector('.vl-report-status');if(!e)return;const l=value||'Active',m={Active:'is-active',Paused:'is-paused',Retrying:'is-paused',Error:'is-error',Completed:'is-done'};e.textContent=l;e.className='vl-report-status vl-opv2-state '+(m[l]||'is-active');};
AppLoader.setAssets=function(value){const r=loaderElement.querySelector('.vl-report-export');if(r)r.querySelector('.vl-report-assets').textContent=Math.max(0,Math.round(Number(value)||0))+' assets';};
AppLoader.setFailed=function(value){const r=loaderElement.querySelector('.vl-report-export');if(!r)return;const f=Math.max(0,Math.round(Number(value)||0));r.querySelector('.vl-report-failed').textContent='Failed pages: '+f;r.classList.toggle('has-warning',f>0);};`
};

const mediaProcessing = {
  name: 'Media Processing',
  description: 'A simplified media-processing state with a film-frame motion cue, one progress bar, concise throughput data and ETA.',
  markup: `<div class="vl-media-transcode vl-opv2" role="region" aria-label="Media processing progress" data-failed="0" data-speed="24.3">
  <div class="vl-opv2-head">
    <span class="vl-opv2-icon" aria-hidden="true">▶</span>
    <span class="vl-opv2-copy"><strong class="vl-media-file vl-opv2-context">promo_clip_2026.mov</strong><span class="vl-media-stage vl-opv2-status">Uploading media</span></span>
    <span class="vl-media-status vl-opv2-state is-active">Active</span>
  </div>
  <div class="vl-opv2-visual vl-media-visual" aria-hidden="true"><span class="vl-media-frame left"></span><span class="vl-media-ring"></span><span class="vl-media-play">▶</span><span class="vl-media-frame right"></span></div>
  <div class="vl-media-progress vl-opv2-progress" role="progressbar" aria-label="Media processing progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="25"><span class="vl-media-fill vl-opv2-progress-fill" style="width:25%"></span></div>
  <div class="vl-opv2-meta"><span class="vl-media-stats">32 / 128 tracks</span><strong class="vl-media-percent vl-opv2-percent">25%</strong><span class="vl-media-eta">ETA 00:08</span></div>
  <span class="vl-media-speed vl-opv2-sr">24.3 fps</span><span class="vl-media-bitrate vl-opv2-sr">5.2 Mbps</span><span class="vl-media-failed vl-opv2-sr">Failed: 0</span>
</div>`,
  css: `${OPERATIONS_V2_BASE_CSS}
.vl-media-visual { grid-template-columns:17px 50px 17px; gap:6px; }
.vl-media-frame { width:12px; height:35px; border:2px solid color-mix(in srgb,var(--loader-accent) 27%,#cdd8e7); border-radius:4px; position:relative; }
.vl-media-frame::before, .vl-media-frame::after { content:''; position:absolute; left:2px; right:2px; height:3px; border-radius:2px; background:color-mix(in srgb,var(--loader-accent) 30%,#d7e1ef); }
.vl-media-frame::before { top:5px; }.vl-media-frame::after { bottom:5px; }
.vl-media-ring { position:absolute; width:48px; height:48px; border:2px dashed color-mix(in srgb,var(--loader-accent) 54%,transparent); border-radius:50%; animation:vl-media-ring calc(var(--loader-speed) * 1.7) linear infinite; }
.vl-media-play { width:34px; height:34px; display:grid; place-items:center; border-radius:50%; background:color-mix(in srgb,var(--loader-accent) 10%,#fff); color:var(--loader-accent); font:900 16px/1 system-ui; animation:vl-media-play calc(var(--loader-speed) * 1.1) ease-in-out infinite; }
@keyframes vl-media-ring { to { transform:rotate(360deg); } }
@keyframes vl-media-play { 0%,100% { transform:scale(.9); } 50% { transform:scale(1.05); } }`,
  applyControls(container, values) {
    const root = container.querySelector('.vl-media-transcode'); if (!root) return;
    const progress = updateProgress(root, values.progress, '.vl-media-progress', '.vl-media-fill', '.vl-media-percent');
    const stage = values.stage || 'Uploading', speed = Math.max(1, Number(values.speed) || 24.3), failed = Math.max(0, Math.round(Number(values.failed) || 0));
    const labels = { Uploading:'Uploading media', 'Audio Processing':'Processing audio', 'Video Processing':'Processing video', Thumbnailing:'Creating thumbnail', Finalizing:'Finalizing media' };
    const processed = Math.round(128 * progress / 100), remaining = Math.max(0,128-processed);
    root.querySelector('.vl-media-stage').textContent = labels[stage] || stage; root.querySelector('.vl-media-stats').textContent = `${processed} / 128 tracks`;
    root.querySelector('.vl-media-speed').textContent = `${speed.toFixed(1)} fps`; root.querySelector('.vl-media-eta').textContent = `ETA ${etaText(remaining / Math.max(1,speed/2))}`;
    root.querySelector('.vl-media-bitrate').textContent = `${(3 + progress*.08).toFixed(1)} Mbps`; root.querySelector('.vl-media-failed').textContent = `Failed: ${failed}`;
    root.setAttribute('data-speed', String(speed)); root.classList.toggle('has-warning', failed > 0); root.style.setProperty('--opv2-media-speed', `${Math.max(.55,24/speed)}s`);
    updateState(root, '.vl-media-status', values.status || 'Active');
  },
  js: `AppLoader.setProgress=function(value,bitrate,fps){const r=loaderElement.querySelector('.vl-media-transcode');if(!r)return;const p=Math.max(0,Math.min(100,Number(value)||0)),s=Math.max(1,Number(fps)||Number(r.getAttribute('data-speed'))||24.3),done=Math.round(128*p/100),rem=Math.max(0,128-done),e=Math.round(rem/Math.max(1,s/2));r.querySelector('.vl-media-progress').setAttribute('aria-valuenow',String(Math.round(p)));r.querySelector('.vl-media-fill').style.width=p+'%';r.querySelector('.vl-media-percent').textContent=Math.round(p)+'%';r.querySelector('.vl-media-stats').textContent=done+' / 128 tracks';r.querySelector('.vl-media-speed').textContent=s.toFixed(1)+' fps';r.querySelector('.vl-media-eta').textContent='ETA '+String(Math.floor(e/60)).padStart(2,'0')+':'+String(e%60).padStart(2,'0');r.querySelector('.vl-media-bitrate').textContent=(Number(bitrate)||5.2).toFixed(1)+' Mbps';};
AppLoader.setStage=function(value){const r=loaderElement.querySelector('.vl-media-transcode');if(!r)return;const m={Uploading:'Uploading media','Audio Processing':'Processing audio','Video Processing':'Processing video',Thumbnailing:'Creating thumbnail',Finalizing:'Finalizing media'};r.querySelector('.vl-media-stage').textContent=m[value]||value||'Uploading media';};
AppLoader.setStatus=function(value){const e=loaderElement.querySelector('.vl-media-status');if(!e)return;const l=value||'Active',m={Active:'is-active',Paused:'is-paused',Retrying:'is-paused',Error:'is-error',Completed:'is-done'};e.textContent=l;e.className='vl-media-status vl-opv2-state '+(m[l]||'is-active');};
AppLoader.setFailed=function(value){const r=loaderElement.querySelector('.vl-media-transcode');if(!r)return;const f=Math.max(0,Math.round(Number(value)||0));r.querySelector('.vl-media-failed').textContent='Failed: '+f;r.classList.toggle('has-warning',f>0);};`
};

const crossSystemSync = {
  name: 'Cross-system Sync',
  description: 'A source-to-target synchronization view with a central transfer motion, one progress signal, record count and ETA.',
  markup: `<div class="vl-system-sync vl-opv2" role="region" aria-label="Cross-system synchronization" data-conflicts="2" data-rate="42">
  <div class="vl-opv2-head">
    <span class="vl-opv2-icon" aria-hidden="true">↻</span>
    <span class="vl-opv2-copy"><strong class="vl-system-title vl-opv2-context">ERP → WMS</strong><span class="vl-system-stage vl-opv2-status">Syncing records</span></span>
    <span class="vl-system-status vl-opv2-state is-active">Active</span>
  </div>
  <div class="vl-opv2-visual vl-system-visual" aria-hidden="true"><span class="vl-system-endpoint source">DB</span><span class="vl-system-link"><i></i><b>↻</b></span><span class="vl-system-endpoint target">☁</span></div>
  <div class="vl-system-progress vl-opv2-progress" role="progressbar" aria-label="Sync progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="58"><span class="vl-system-fill vl-opv2-progress-fill" style="width:58%"></span></div>
  <div class="vl-opv2-meta"><span class="vl-system-records">3,128 / 6,420 records</span><strong class="vl-system-percent vl-opv2-percent">58%</strong><span class="vl-system-eta">ETA 01:19</span></div>
  <span class="vl-system-rate vl-opv2-sr">42/s</span><span class="vl-system-conflicts vl-opv2-sr">Conflicts: 2</span><span class="vl-system-latency vl-opv2-sr">p95: 280ms</span>
</div>`,
  css: `${OPERATIONS_V2_BASE_CSS}
.vl-system-visual { grid-template-columns:36px 72px 36px; gap:6px; }
.vl-system-endpoint { width:34px; height:34px; display:grid; place-items:center; border:1px solid #d7e1ee; border-radius:50%; background:#fff; color:color-mix(in srgb,var(--loader-accent) 76%,#43536c); font:800 8px/1 system-ui,sans-serif; }
.vl-system-link { width:72px; height:36px; position:relative; display:grid; place-items:center; }
.vl-system-link::before { content:''; position:absolute; left:0; right:0; top:50%; border-top:1px dashed color-mix(in srgb,var(--loader-accent) 38%,#d5dfeb); }
.vl-system-link b { position:relative; z-index:2; width:31px; height:31px; display:grid; place-items:center; border-radius:50%; background:var(--loader-accent); color:#fff; font:900 16px/1 system-ui; box-shadow:0 5px 13px color-mix(in srgb,var(--loader-accent) 25%,transparent); animation:vl-system-spin calc(var(--loader-speed) * 1.25) linear infinite; }
.vl-system-link i { position:absolute; z-index:3; left:0; top:16px; width:5px; height:5px; border-radius:50%; background:var(--loader-accent); animation:vl-system-packet calc(var(--loader-speed) * 1.3) ease-in-out infinite; }
.vl-system-sync.has-warning .vl-system-link b { background:#b42332; }
@keyframes vl-system-spin { to { transform:rotate(360deg); } }
@keyframes vl-system-packet { 0% { transform:translateX(0); opacity:0; } 15% { opacity:1; } 85% { opacity:1; } 100% { transform:translateX(67px); opacity:0; } }`,
  applyControls(container, values) {
    const root = container.querySelector('.vl-system-sync'); if (!root) return;
    const progress = updateProgress(root, values.progress, '.vl-system-progress', '.vl-system-fill', '.vl-system-percent');
    const records = Math.max(0, Math.min(6420, Math.round(Number(values.records) || 0))), rate = Math.max(1, Math.round(Number(values.rate) || 42));
    const conflicts = Math.max(0, Math.round(Number(values.conflicts) || 0)), latency = Math.max(0, Math.round(Number(values.latency) || 0)), stage = values.stage || 'Extracting';
    const labels = { Extracting:'Reading source data', Transforming:'Transforming records', Reconciling:'Reconciling records', Validating:'Validating sync', 'Warehouse ready':'Sync complete' };
    root.querySelector('.vl-system-stage').textContent = labels[stage] || stage; root.querySelector('.vl-system-records').textContent = `${records.toLocaleString()} / 6,420 records`;
    root.querySelector('.vl-system-rate').textContent = `${rate}/s`; root.querySelector('.vl-system-eta').textContent = `ETA ${etaText(Math.max(0,6420-records)/rate)}`;
    root.querySelector('.vl-system-conflicts').textContent = `Conflicts: ${conflicts}`; root.querySelector('.vl-system-latency').textContent = `p95: ${latency}ms`;
    root.setAttribute('data-conflicts', String(conflicts)); root.setAttribute('data-rate', String(rate)); root.classList.toggle('has-warning', conflicts > 0);
    root.style.setProperty('--opv2-sync-speed', `${Math.max(.55,100/rate)}s`); updateState(root, '.vl-system-status', values.status || 'Active');
  },
  js: `AppLoader.setProgress=function(value,totalRecords,syncedRecords){const r=loaderElement.querySelector('.vl-system-sync');if(!r)return;const p=Math.max(0,Math.min(100,Number(value)||0)),t=Math.max(1,Math.round(Number(totalRecords)||6420)),n=Math.max(0,Math.min(t,Math.round(Number(syncedRecords)||t*p/100))),rate=Math.max(1,Number(r.getAttribute('data-rate'))||42),e=Math.round(Math.max(0,t-n)/rate);r.querySelector('.vl-system-progress').setAttribute('aria-valuenow',String(Math.round(p)));r.querySelector('.vl-system-fill').style.width=p+'%';r.querySelector('.vl-system-percent').textContent=Math.round(p)+'%';r.querySelector('.vl-system-records').textContent=n.toLocaleString()+' / '+t.toLocaleString()+' records';r.querySelector('.vl-system-eta').textContent='ETA '+String(Math.floor(e/60)).padStart(2,'0')+':'+String(e%60).padStart(2,'0');};
AppLoader.setStage=function(value){const r=loaderElement.querySelector('.vl-system-sync');if(!r)return;const m={Extracting:'Reading source data',Transforming:'Transforming records',Reconciling:'Reconciling records',Validating:'Validating sync','Warehouse ready':'Sync complete'};r.querySelector('.vl-system-stage').textContent=m[value]||value||'Syncing records';};
AppLoader.setStatus=function(value){const e=loaderElement.querySelector('.vl-system-status');if(!e)return;const l=value||'Active',m={Active:'is-active',Paused:'is-paused',Retrying:'is-paused',Error:'is-error',Completed:'is-done'};e.textContent=l;e.className='vl-system-status vl-opv2-state '+(m[l]||'is-active');};
AppLoader.setConflicts=function(value){const r=loaderElement.querySelector('.vl-system-sync');if(!r)return;const c=Math.max(0,Math.round(Number(value)||0));r.querySelector('.vl-system-conflicts').textContent='Conflicts: '+c;r.setAttribute('data-conflicts',String(c));r.classList.toggle('has-warning',c>0);};
AppLoader.setLatency=function(value){const r=loaderElement.querySelector('.vl-system-sync');if(r)r.querySelector('.vl-system-latency').textContent='p95: '+Math.max(0,Math.round(Number(value)||0))+'ms';};`
};

export const operationsV2Overrides = {
  'file-upload-queue': fileUploadQueue,
  'file-download-manager': fileDownloadManager,
  'ocr-idp-pipeline': ocrPipeline,
  'pdf-export-pipeline': reportExport,
  'media-transcoding-pipeline': mediaProcessing,
  'cross-system-data-sync': crossSystemSync
};
