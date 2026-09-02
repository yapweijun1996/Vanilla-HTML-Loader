import { operationsV2Overrides } from './operations-v2-overrides.js';

const baseOperationLoaders = [
  {
    id: 'file-upload-queue',
    name: 'File Upload Queue',
    category: 'Operations',
    tech: 'CSS + JavaScript',
    description: 'A multi-file upload state with active progress, queued work, completed items, and a production update API.',
    markup: `<div class="vl-upload-queue is-demo" aria-label="File upload progress">
  <div class="vl-upload-row is-active" data-file-id="invoice">
    <div class="vl-upload-meta"><span class="vl-upload-name">invoice.pdf</span><strong class="vl-upload-status">72%</strong></div>
    <div class="vl-upload-track" role="progressbar" aria-label="invoice.pdf" aria-valuemin="0" aria-valuemax="100" aria-valuenow="72"><span style="width:72%"></span></div>
  </div>
  <div class="vl-upload-row" data-file-id="products">
    <div class="vl-upload-meta"><span class="vl-upload-name">products.xlsx</span><strong class="vl-upload-status">Queued</strong></div>
    <div class="vl-upload-track" role="progressbar" aria-label="products.xlsx" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span style="width:0%"></span></div>
  </div>
  <div class="vl-upload-row is-complete" data-file-id="photo">
    <div class="vl-upload-meta"><span class="vl-upload-name">photo.jpg</span><strong class="vl-upload-status">Done</strong></div>
    <div class="vl-upload-track" role="progressbar" aria-label="photo.jpg" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100"><span style="width:100%"></span></div>
  </div>
</div>`,
    css: `.vl-upload-queue {
  width: min(250px, 84vw);
  display: grid;
  gap: 9px;
  color: #172033;
  font: 700 11px/1.25 system-ui, sans-serif;
}
.vl-upload-row { display: grid; gap: 5px; padding: 8px 10px; border: 1px solid color-mix(in srgb, var(--loader-accent) 10%, #dfe5ee); border-radius: 9px; background: #fff; box-shadow: 0 5px 16px rgba(23, 32, 51, .05); }
.vl-upload-meta { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.vl-upload-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.vl-upload-status { color: #667085; font-size: 10px; font-variant-numeric: tabular-nums; }
.vl-upload-row.is-active .vl-upload-status { color: var(--loader-accent); }
.vl-upload-row.is-complete .vl-upload-status { color: #138a5b; }
.vl-upload-track { height: 6px; overflow: hidden; border-radius: 999px; background: color-mix(in srgb, var(--loader-accent) 10%, #e7ecf4); }
.vl-upload-track span { display: block; height: 100%; border-radius: inherit; background: var(--loader-accent); transition: width .3s ease; }
.vl-upload-queue.is-demo .vl-upload-row.is-active .vl-upload-track span { animation: vl-upload-demo calc(var(--loader-speed) * 3.4) ease-in-out infinite; }
.vl-upload-row.is-complete .vl-upload-track span { background: #18a66d; }
.vl-upload-row.is-error { border-color: #f1b9bf; background: #fff8f8; }
.vl-upload-row.is-error .vl-upload-status { color: #c43d4b; }
.vl-upload-row.is-error .vl-upload-track span { background: #d9485a; animation: none; }
@keyframes vl-upload-demo { 0%, 100% { width: 36%; } 55% { width: 78%; } 80% { width: 92%; } }`,
    js: `AppLoader.updateFile = function (fileId, progress, status = '') {
  const queue = loaderElement.querySelector('.vl-upload-queue');
  const row = loaderElement.querySelector('[data-file-id="' + fileId + '"]');
  if (!queue || !row) return;
  queue.classList.remove('is-demo');
  const value = Math.max(0, Math.min(100, Number(progress) || 0));
  const track = row.querySelector('[role="progressbar"]');
  const fill = row.querySelector('.vl-upload-track span');
  const statusElement = row.querySelector('.vl-upload-status');
  row.classList.remove('is-active', 'is-complete', 'is-error');
  if (status === 'error') row.classList.add('is-error');
  else if (value >= 100) row.classList.add('is-complete');
  else if (value > 0) row.classList.add('is-active');
  track.setAttribute('aria-valuenow', String(value));
  fill.style.width = value + '%';
  statusElement.textContent = status || (value >= 100 ? 'Done' : Math.round(value) + '%');
};`
  },
  {
    id: 'file-download-manager',
    name: 'File Download Manager',
    category: 'Operations',
    tech: 'CSS + JavaScript',
    description: 'A practical file download tracker with stage, live speed, ETA, and resumable status controls.',
    markup: `<div class="vl-file-download-manager" role="region" aria-label="File download manager" data-speed="4.8">
  <div class="vl-download-head">
    <div>
      <strong class="vl-download-file">data_backup_2026.zip</strong>
      <p class="vl-download-stage">Downloading</p>
    </div>
    <span class="vl-download-status is-active">Active</span>
  </div>
  <div class="vl-download-meta">
    <span class="vl-download-speed">4.8 MB/s</span>
    <span class="vl-download-eta">ETA 00:58</span>
  </div>
  <div class="vl-download-track" role="progressbar" aria-label="Download progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="48">
    <span class="vl-download-fill" style="width:48%"></span>
  </div>
  <div class="vl-download-foot">
    <span class="vl-download-size">58 MB / 120 MB</span>
    <span class="vl-download-queued">Queued: 1</span>
  </div>
</div>`,
    css: `.vl-file-download-manager {
  width: min(255px, 84vw);
  display: grid;
  gap: 8px;
  padding: 12px;
  border: 1px solid color-mix(in srgb, var(--loader-accent) 10%, #dfe5ee);
  border-radius: 11px;
  background: #fff;
  color: #172033;
  font-family: system-ui, sans-serif;
  box-shadow: 0 8px 20px rgba(22, 32, 59, .08);
}
.vl-download-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.vl-download-file {
  display: block;
  font-size: 12px;
  max-width: 165px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.vl-download-stage {
  margin: 4px 0 0;
  color: #667085;
  font-size: 11px;
}
.vl-download-status {
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: #0f766e;
  background: color-mix(in srgb, var(--loader-accent) 16%, #edfbf8);
}
.vl-download-status.is-paused {
  color: #9a6d00;
  background: #fff4d6;
}
.vl-download-status.is-failed {
  color: #b42318;
  background: #ffe2df;
}
.vl-download-status.is-done {
  color: #047857;
  background: #dcfce7;
}
.vl-download-meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: #667085;
  font-size: 11px;
}
.vl-download-track {
  width: 100%;
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
  background: color-mix(in srgb, var(--loader-accent) 11%, #e7ecf5);
}
.vl-download-fill {
  display: block;
  height: 100%;
  width: 48%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--loader-accent), color-mix(in srgb, var(--loader-accent) 78%, #fff));
  transition: width .25s ease;
}
.vl-download-foot {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #667085;
  font-variant-numeric: tabular-nums;
}`
,
    controls: [
      { type: 'range', key: 'progress', label: 'Progress', min: 0, max: 100, step: 1, defaultValue: 48, suffix: '%', full: true },
      { type: 'range', key: 'speed', label: 'Speed (MB/s)', min: 0.5, max: 40, step: 0.5, defaultValue: 4.8, suffix: ' MB/s', full: true },
      {
        type: 'select',
        key: 'stage',
        label: 'Stage',
        defaultValue: 'Downloading',
        full: true,
        options: [
          { value: 'Scanning', label: 'Scanning' },
          { value: 'Downloading', label: 'Downloading' },
          { value: 'Verifying', label: 'Verifying' },
          { value: 'Complete', label: 'Complete' }
        ]
      },
      {
        type: 'select',
        key: 'status',
        label: 'State',
        defaultValue: 'Active',
        full: true,
        options: [
          { value: 'Active', label: 'Active' },
          { value: 'Paused', label: 'Paused' },
          { value: 'Retrying', label: 'Retrying' },
          { value: 'Failed', label: 'Failed' },
          { value: 'Completed', label: 'Completed' }
        ]
      }
    ],
    applyControls(container, values) {
      const manager = container.querySelector('.vl-file-download-manager');
      if (!manager) return;

      const progress = Math.max(0, Math.min(100, Number(values.progress) || 0));
      const speed = Math.max(0.5, Number(values.speed) || 4.8);
      const total = 120;
      const downloaded = Math.round((total * progress) / 100);
      const remaining = Math.max(0, total - downloaded);
      const eta = speed > 0 ? Math.round(remaining / speed) : 0;
      const etaText = String(Math.floor(eta / 60)).padStart(2, '0') + ':' + String(eta % 60).padStart(2, '0');
      const stage = values.stage || 'Downloading';
      const status = values.status || 'Active';
      const statusClassMap = { Active: 'is-active', Paused: 'is-paused', Retrying: 'is-paused', Failed: 'is-failed', Completed: 'is-done' };
      const statusEl = manager.querySelector('.vl-download-status');
      const fill = manager.querySelector('.vl-download-fill');

      manager.querySelector('.vl-download-stage').textContent = stage;
      manager.querySelector('.vl-download-size').textContent = `${downloaded} MB / ${total} MB`;
      manager.querySelector('.vl-download-speed').textContent = `${speed.toFixed(1)} MB/s`;
      manager.setAttribute('data-speed', String(speed));
      manager.querySelector('.vl-download-eta').textContent = `ETA ${etaText}`;
      manager.querySelector('.vl-download-track').setAttribute('aria-valuenow', String(Math.round(progress)));
      fill.style.width = `${progress}%`;
      manager.querySelector('.vl-download-queued').textContent = progress >= 100 ? 'Queued: 0' : 'Queued: 1';

      statusEl.textContent = status;
      statusEl.classList.remove('is-active', 'is-paused', 'is-failed', 'is-done');
      statusEl.classList.add(statusClassMap[status] || 'is-active');
    },
    js: `AppLoader.setProgress = function (value) {
  const manager = loaderElement.querySelector('.vl-file-download-manager');
  if (!manager) return;

  const total = 120;
  const progress = Math.max(0, Math.min(100, Number(value) || 0));
  const downloaded = Math.round(total * (progress / 100));
  const remaining = Math.max(0, total - downloaded);
  const speedText = manager.querySelector('.vl-download-speed');
  const currentSpeed = Number(manager.getAttribute('data-speed')) || Number(speedText && speedText.textContent.replace(/[^\\d.]/g, '')) || 0;
  const eta = currentSpeed > 0 ? Math.round(remaining / currentSpeed) : 0;
  const etaText = String(Math.floor(eta / 60)).padStart(2, '0') + ':' + String(eta % 60).padStart(2, '0');

  const track = manager.querySelector('.vl-download-track');
  const fill = manager.querySelector('.vl-download-fill');
  const size = manager.querySelector('.vl-download-size');
  const etaEl = manager.querySelector('.vl-download-eta');

  track && track.setAttribute('aria-valuenow', String(Math.round(progress)));
  fill && (fill.style.width = progress + '%');
  size && (size.textContent = downloaded + ' MB / ' + total + ' MB');
  etaEl && (etaEl.textContent = 'ETA ' + etaText);
};

AppLoader.setSpeed = function (value) {
  const manager = loaderElement.querySelector('.vl-file-download-manager');
  if (!manager) return;
  const speed = Math.max(0, Number(value) || 0);
  const track = manager.querySelector('.vl-download-speed');
  if (track) {
    track.textContent = speed.toFixed(1) + ' MB/s';
  }
  manager.setAttribute('data-speed', String(speed));
};

AppLoader.setStage = function (value) {
  const manager = loaderElement.querySelector('.vl-download-stage');
  if (manager) manager.textContent = value || 'Downloading';
};

	AppLoader.setStatus = function (value) {
	  const manager = loaderElement.querySelector('.vl-download-status');
	  if (!manager) return;
	  const status = value || 'Active';
	  const statusClassMap = { Active: 'is-active', Paused: 'is-paused', Retrying: 'is-paused', Failed: 'is-failed', Completed: 'is-done' };
	  manager.textContent = status;
	  manager.classList.remove('is-active', 'is-paused', 'is-failed', 'is-done');
	  manager.classList.add(statusClassMap[status] || 'is-active');
	};`
	  },
  {
    id: 'cloud-sync-progress',
    name: 'Cloud Sync Progress',
    category: 'Operations',
    tech: 'CSS + JavaScript',
    description: 'A practical cloud sync pipeline loader that tracks Scanning, Uploading, Syncing, and Verified stages.',
    markup: `<div class="vl-cloud-sync" role="region" aria-label="Cloud sync progress">
  <div class="vl-cloud-sync-head">
    <div>
      <strong class="vl-cloud-sync-file">documents.xlsx</strong>
      <p class="vl-cloud-sync-subtitle">Team Workspace</p>
    </div>
    <span class="vl-cloud-status is-active">Active</span>
  </div>
  <div class="vl-cloud-sync-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="18">
    <span class="vl-cloud-progress-fill" style="width:18%"></span>
  </div>
  <div class="vl-cloud-sync-meta">
    <span class="vl-cloud-sync-progress-text">18% synced</span>
    <span class="vl-cloud-sync-stage">Scanning</span>
    <span class="vl-cloud-sync-eta">ETA 04:12</span>
  </div>
  <div class="vl-cloud-sync-steps">
    <span class="vl-cloud-step is-active" data-step="Scanning">Scanning</span>
    <span class="vl-cloud-step" data-step="Uploading">Uploading</span>
    <span class="vl-cloud-step" data-step="Syncing">Syncing</span>
    <span class="vl-cloud-step" data-step="Verified">Verified</span>
  </div>
  <div class="vl-cloud-sync-foot">
    <span class="vl-cloud-sync-items">18 / 100 records</span>
    <span class="vl-cloud-sync-retry">Retries: 0</span>
  </div>
</div>`,
    css: `.vl-cloud-sync {
  width: min(255px, 84vw);
  display: grid;
  gap: 8px;
  padding: 11px;
  border: 1px solid color-mix(in srgb, var(--loader-accent) 12%, #d3deeb);
  border-radius: 11px;
  background: #fff;
  color: #172033;
  font-family: system-ui, sans-serif;
  font-size: 11px;
  box-shadow: 0 8px 24px rgba(17, 24, 39, .07);
}
.vl-cloud-sync-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.vl-cloud-sync-file {
  display: block;
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
}
.vl-cloud-sync-subtitle {
  margin: 3px 0 0;
  color: #6b7280;
}
.vl-cloud-sync-progress {
  position: relative;
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: color-mix(in srgb, var(--loader-accent) 12%, #e9eef7);
}
.vl-cloud-progress-fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  width: 18%;
  background: linear-gradient(90deg, var(--loader-accent), color-mix(in srgb, var(--loader-accent) 84%, #ffffff));
  transition: width .25s ease;
}
.vl-cloud-sync-meta {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  color: #667085;
  font-variant-numeric: tabular-nums;
}
.vl-cloud-status {
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: #0f766e;
  background: color-mix(in srgb, var(--loader-accent) 16%, #edfbf8);
}
.vl-cloud-status.is-paused { color: #9a6d00; background: #fff4d6; }
.vl-cloud-status.is-error { color: #b42318; background: #ffe2df; }
.vl-cloud-status.is-done { color: #047857; background: #dcfce7; }
.vl-cloud-sync-steps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 5px;
}
.vl-cloud-step {
  border: 1px solid #d9e2ef;
  border-radius: 999px;
  padding: 4px 6px;
  text-align: center;
  background: #fff;
  color: #6b7280;
}
.vl-cloud-step.is-active {
  border-color: color-mix(in srgb, var(--loader-accent) 40%, #8fb0ff);
  color: var(--loader-accent);
  font-weight: 800;
}
.vl-cloud-step.is-done {
  border-color: #17a34a;
  color: #16a34a;
  background: #e7f6ea;
}
.vl-cloud-sync-foot {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #6b7280;
  font-variant-numeric: tabular-nums;
}`,
    controls: [
      { type: 'range', key: 'progress', label: 'Synced percentage', min: 0, max: 100, step: 1, defaultValue: 18, suffix: '%', full: true },
      {
        type: 'select',
        key: 'stage',
        label: 'Stage',
        defaultValue: 'Scanning',
        full: true,
        options: [
          { value: 'Scanning', label: 'Scanning' },
          { value: 'Uploading', label: 'Uploading' },
          { value: 'Syncing', label: 'Syncing' },
          { value: 'Verified', label: 'Verified' }
        ]
      },
      {
        type: 'select',
        key: 'status',
        label: 'Status',
        defaultValue: 'Active',
        full: true,
        options: [
          { value: 'Active', label: 'Active' },
          { value: 'Paused', label: 'Paused' },
          { value: 'Retrying', label: 'Retrying' },
          { value: 'Error', label: 'Error' },
          { value: 'Completed', label: 'Completed' }
        ]
      },
      { type: 'range', key: 'retries', label: 'Retries', min: 0, max: 20, step: 1, defaultValue: 0, full: true }
    ],
    applyControls(container, values) {
      const sync = container.querySelector('.vl-cloud-sync');
      if (!sync) return;

      const progress = Math.max(0, Math.min(100, Number(values.progress) || 0));
      const stage = values.stage || 'Scanning';
      const status = values.status || 'Active';
      const retries = Math.max(0, Math.round(Number(values.retries) || 0));
      const totalItems = 100;
      const doneItems = Math.round((totalItems * progress) / 100);
      const remaining = totalItems - doneItems;
      const etaSeconds = progress > 0 ? Math.ceil((100 - progress) * 2.4) : 0;
      const etaText = String(Math.floor(etaSeconds / 60)).padStart(2, '0') + ':' + String(etaSeconds % 60).padStart(2, '0');
      const stageOrder = ['Scanning', 'Uploading', 'Syncing', 'Verified'];
      const stepIndex = stageOrder.indexOf(stage);

      sync.querySelector('.vl-cloud-progress-fill').style.width = `${progress}%`;
      sync.querySelector('.vl-cloud-sync-progress').setAttribute('aria-valuenow', String(Math.round(progress)));
      sync.querySelector('.vl-cloud-sync-progress-text').textContent = `${Math.round(progress)}% synced`;
      sync.querySelector('.vl-cloud-sync-stage').textContent = stage;
      sync.querySelector('.vl-cloud-sync-eta').textContent = `ETA ${etaText}`;
      sync.querySelector('.vl-cloud-sync-items').textContent = `${doneItems} / ${totalItems} records`;
      sync.querySelector('.vl-cloud-sync-retry').textContent = `Retries: ${retries}`;
      sync.querySelectorAll('.vl-cloud-step').forEach((stepEl, index) => {
        if (index < stepIndex) {
          stepEl.classList.add('is-done');
          stepEl.classList.remove('is-active');
        } else if (index === stepIndex) {
          stepEl.classList.add('is-active');
          stepEl.classList.remove('is-done');
        } else {
          stepEl.classList.remove('is-active', 'is-done');
        }
      });

      const statusEl = sync.querySelector('.vl-cloud-status');
      const statusMap = { Active: 'is-active', Paused: 'is-paused', Retrying: 'is-paused', Error: 'is-error', Completed: 'is-done' };
      statusEl.textContent = status === 'Retrying' ? 'Retrying' : status;
      statusEl.classList.remove('is-active', 'is-paused', 'is-error', 'is-done');
      statusEl.classList.add(statusMap[status] || 'is-active');
    },
    js: `AppLoader.setProgress = function (value) {
  const sync = loaderElement.querySelector('.vl-cloud-sync');
  if (!sync) return;
  const safe = Math.max(0, Math.min(100, Number(value) || 0));
  const fill = sync.querySelector('.vl-cloud-progress-fill');
  const progressText = sync.querySelector('.vl-cloud-sync-progress-text');
  const items = sync.querySelector('.vl-cloud-sync-items');
  const meter = sync.querySelector('.vl-cloud-sync-progress');
  const totalItems = 100;
  const syncedItems = Math.round(totalItems * (safe / 100));
  const remaining = totalItems - syncedItems;
  const etaSeconds = safe > 0 ? Math.ceil((100 - safe) * 2.4) : 0;
  const eta = String(Math.floor(etaSeconds / 60)).padStart(2, '0') + ':' + String(etaSeconds % 60).padStart(2, '0');
  fill && (fill.style.width = safe + '%');
  meter && meter.setAttribute('aria-valuenow', String(Math.round(safe)));
  progressText && (progressText.textContent = Math.round(safe) + '% synced');
  items && (items.textContent = syncedItems + ' / ' + totalItems + ' records');
  sync.querySelector('.vl-cloud-sync-eta').textContent = 'ETA ' + eta;
};

AppLoader.setStage = function (value) {
  const sync = loaderElement.querySelector('.vl-cloud-sync');
  if (!sync) return;
  const stage = sync.querySelector('.vl-cloud-sync-stage');
  const steps = sync.querySelectorAll('.vl-cloud-step');
  const stageOrder = ['Scanning', 'Uploading', 'Syncing', 'Verified'];
  const index = stageOrder.indexOf(value);
  stage && (stage.textContent = value || 'Scanning');
  steps.forEach((step, idx) => {
    if (idx < index) {
      step.classList.remove('is-active');
      step.classList.add('is-done');
    } else if (idx === index) {
      step.classList.remove('is-done');
      step.classList.add('is-active');
    } else {
      step.classList.remove('is-active', 'is-done');
    }
  });
};

AppLoader.setStatus = function (value) {
  const sync = loaderElement.querySelector('.vl-cloud-sync');
  if (!sync) return;
  const statusEl = sync.querySelector('.vl-cloud-status');
  const map = { Active: 'is-active', Paused: 'is-paused', Retrying: 'is-paused', Error: 'is-error', Completed: 'is-done' };
  const label = value || 'Active';
  statusEl.textContent = label === 'Retrying' ? 'Retrying' : label;
  statusEl.classList.remove('is-active', 'is-paused', 'is-error', 'is-done');
  statusEl.classList.add(map[label] || 'is-active');
};

AppLoader.setRetries = function (value) {
  const sync = loaderElement.querySelector('.vl-cloud-sync');
  if (!sync) return;
  const retries = Math.max(0, Math.round(Number(value) || 0));
  const retryEl = sync.querySelector('.vl-cloud-sync-retry');
  retryEl && (retryEl.textContent = 'Retries: ' + retries);
};`
  },
  {
    id: 'backup-restore-progress',
    name: 'Backup & Restore Progress',
    category: 'Operations',
    tech: 'CSS + JavaScript',
    description: 'A realistic backup pipeline tracker showing backup, compression, upload, verification, and restore phases.',
    markup: `<div class="vl-backup-restore" role="region" aria-label="Backup and restore progress" data-warnings="0">
  <div class="vl-backup-head">
    <div>
      <strong class="vl-backup-file">tenant_db_backup_2026-08-04</strong>
      <p class="vl-backup-stage">Backup</p>
    </div>
    <span class="vl-backup-status is-active">Active</span>
  </div>
  <div class="vl-backup-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="34">
    <span class="vl-backup-progress-fill" style="width:34%"></span>
  </div>
  <div class="vl-backup-meta">
    <span class="vl-backup-progress-text">34%</span>
    <span class="vl-backup-bytes">420 MB / 1200 MB</span>
    <span class="vl-backup-eta">ETA 02:40</span>
  </div>
  <div class="vl-backup-steps">
    <span class="vl-backup-step is-active" data-step="Backup">Backup</span>
    <span class="vl-backup-step" data-step="Compressing">Compressing</span>
    <span class="vl-backup-step" data-step="Uploading">Uploading</span>
    <span class="vl-backup-step" data-step="Verification">Verification</span>
    <span class="vl-backup-step" data-step="Restore Ready">Restore Ready</span>
  </div>
  <div class="vl-backup-foot">
    <span class="vl-backup-chunks">14 / 42 chunks</span>
    <span class="vl-backup-warnings">Warnings: 0</span>
  </div>
</div>`,
    css: `.vl-backup-restore {
  width: min(255px, 84vw);
  display: grid;
  gap: 8px;
  padding: 11px;
  border: 1px solid color-mix(in srgb, var(--loader-accent) 12%, #d4e0f1);
  border-radius: 11px;
  background: #fff;
  color: #172033;
  font-family: system-ui, sans-serif;
  font-size: 11px;
  box-shadow: 0 8px 24px rgba(17, 24, 39, .06);
}
.vl-backup-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.vl-backup-file {
  display: block;
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
}
.vl-backup-stage {
  margin: 3px 0 0;
  color: #6b7280;
}
.vl-backup-status {
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: #0f766e;
  background: color-mix(in srgb, var(--loader-accent) 16%, #edfbf8);
}
.vl-backup-status.is-paused { color: #9a6d00; background: #fff4d6; }
.vl-backup-status.is-error { color: #b42318; background: #ffe2df; }
.vl-backup-status.is-done { color: #047857; background: #dcfce7; }
.vl-backup-progress {
  position: relative;
  height: 9px;
  overflow: hidden;
  border-radius: 999px;
  background: color-mix(in srgb, var(--loader-accent) 12%, #e9edf6);
}
.vl-backup-progress-fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  width: 34%;
  background: linear-gradient(90deg, var(--loader-accent), color-mix(in srgb, var(--loader-accent) 84%, #ffffff));
  transition: width .25s ease;
}
.vl-backup-meta {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
}
.vl-backup-steps {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 4px;
}
.vl-backup-step {
  border: 1px solid #d8e0ef;
  border-radius: 999px;
  padding: 3px 5px;
  text-align: center;
  background: #fff;
  color: #6b7280;
}
.vl-backup-step.is-active {
  border-color: color-mix(in srgb, var(--loader-accent) 45%, #8fb0ff);
  color: var(--loader-accent);
  font-weight: 800;
}
.vl-backup-step.is-done {
  border-color: #17a34a;
  color: #16a34a;
  background: #e7f6ea;
}
.vl-backup-foot {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #6b7280;
  font-variant-numeric: tabular-nums;
}`,
    controls: [
      { type: 'range', key: 'progress', label: 'Backup percentage', min: 0, max: 100, step: 1, defaultValue: 34, suffix: '%', full: true },
      {
        type: 'select',
        key: 'stage',
        label: 'Stage',
        defaultValue: 'Backup',
        full: true,
        options: [
          { value: 'Backup', label: 'Backup' },
          { value: 'Compressing', label: 'Compressing' },
          { value: 'Uploading', label: 'Uploading' },
          { value: 'Verification', label: 'Verification' },
          { value: 'Restore Ready', label: 'Restore Ready' }
        ]
      },
      {
        type: 'select',
        key: 'status',
        label: 'Status',
        defaultValue: 'Active',
        full: true,
        options: [
          { value: 'Active', label: 'Active' },
          { value: 'Paused', label: 'Paused' },
          { value: 'Retrying', label: 'Retrying' },
          { value: 'Error', label: 'Error' },
          { value: 'Completed', label: 'Completed' }
        ]
      },
      { type: 'range', key: 'warnings', label: 'Warnings', min: 0, max: 5, step: 1, defaultValue: 0, full: true }
    ],
    applyControls(container, values) {
      const backup = container.querySelector('.vl-backup-restore');
      if (!backup) return;

      const progress = Math.max(0, Math.min(100, Number(values.progress) || 0));
      const stage = values.stage || 'Backup';
      const status = values.status || 'Active';
      const warnings = Math.max(0, Math.round(Number(values.warnings) || 0));
      const stageOrder = ['Backup', 'Compressing', 'Uploading', 'Verification', 'Restore Ready'];
      const stageIndex = stageOrder.indexOf(stage);
      const totalMB = 1200;
      const syncedMB = Math.round((totalMB * progress) / 100);
      const etaSeconds = progress > 0 ? Math.ceil((100 - progress) * 1.8) : 0;
      const etaText = String(Math.floor(etaSeconds / 60)).padStart(2, '0') + ':' + String(etaSeconds % 60).padStart(2, '0');
      const chunksTotal = 42;
      const chunksDone = Math.max(0, Math.min(chunksTotal, Math.round((chunksTotal * progress) / 100)));

      backup.querySelector('.vl-backup-progress-fill').style.width = `${progress}%`;
      backup.querySelector('.vl-backup-progress').setAttribute('aria-valuenow', String(Math.round(progress)));
      backup.querySelector('.vl-backup-progress-text').textContent = `${Math.round(progress)}%`;
      backup.querySelector('.vl-backup-stage').textContent = stage;
      backup.querySelector('.vl-backup-bytes').textContent = `${syncedMB} MB / ${totalMB} MB`;
      backup.querySelector('.vl-backup-eta').textContent = `ETA ${etaText}`;
      backup.querySelector('.vl-backup-chunks').textContent = `${chunksDone} / ${chunksTotal} chunks`;
      backup.querySelector('.vl-backup-warnings').textContent = `Warnings: ${warnings}`;
      backup.setAttribute('data-warnings', String(warnings));

      backup.querySelectorAll('.vl-backup-step').forEach((step, index) => {
        if (index < stageIndex) {
          step.classList.add('is-done');
          step.classList.remove('is-active');
        } else if (index === stageIndex) {
          step.classList.add('is-active');
          step.classList.remove('is-done');
        } else {
          step.classList.remove('is-active', 'is-done');
        }
      });

      const statusEl = backup.querySelector('.vl-backup-status');
      const statusMap = { Active: 'is-active', Paused: 'is-paused', Retrying: 'is-paused', Error: 'is-error', Completed: 'is-done' };
      statusEl.textContent = status === 'Retrying' ? 'Retrying' : status;
      statusEl.classList.remove('is-active', 'is-paused', 'is-error', 'is-done');
      statusEl.classList.add(statusMap[status] || 'is-active');
    },
    js: `AppLoader.setProgress = function (value) {
  const backup = loaderElement.querySelector('.vl-backup-restore');
  if (!backup) return;
  const safe = Math.max(0, Math.min(100, Number(value) || 0));
  const totalMB = 1200;
  const syncedMB = Math.round(totalMB * (safe / 100));
  const chunks = 42;
  const doneChunks = Math.max(0, Math.min(chunks, Math.round(chunks * (safe / 100))));
  const remaining = chunks - doneChunks;
  const etaSeconds = safe > 0 ? Math.ceil((100 - safe) * 1.8) : 0;
  const eta = String(Math.floor(etaSeconds / 60)).padStart(2, '0') + ':' + String(etaSeconds % 60).padStart(2, '0');

  const fill = backup.querySelector('.vl-backup-progress-fill');
  const meter = backup.querySelector('.vl-backup-progress');
  const progressText = backup.querySelector('.vl-backup-progress-text');
  const byteText = backup.querySelector('.vl-backup-bytes');
  const chunkText = backup.querySelector('.vl-backup-chunks');
  const etaText = backup.querySelector('.vl-backup-eta');

  fill && (fill.style.width = safe + '%');
  meter && meter.setAttribute('aria-valuenow', String(Math.round(safe)));
  progressText && (progressText.textContent = Math.round(safe) + '%');
  byteText && (byteText.textContent = syncedMB + ' MB / ' + totalMB + ' MB');
  chunkText && (chunkText.textContent = doneChunks + ' / ' + chunks + ' chunks');
  etaText && (etaText.textContent = 'ETA ' + eta);
  if (safe === 100) {
    backup.querySelectorAll('.vl-backup-step').forEach((step, index) => {
      step.classList.add('is-done');
      step.classList.remove('is-active');
    });
  }
};

AppLoader.setStage = function (value) {
  const backup = loaderElement.querySelector('.vl-backup-restore');
  if (!backup) return;
  const stage = backup.querySelector('.vl-backup-stage');
  const steps = backup.querySelectorAll('.vl-backup-step');
  const stageOrder = ['Backup', 'Compressing', 'Uploading', 'Verification', 'Restore Ready'];
  const idx = stageOrder.indexOf(value);
  stage && (stage.textContent = value || 'Backup');
  steps.forEach((step, index) => {
    if (idx === -1) return;
    if (index < idx) {
      step.classList.remove('is-active');
      step.classList.add('is-done');
    } else if (index === idx) {
      step.classList.remove('is-done');
      step.classList.add('is-active');
    } else {
      step.classList.remove('is-active', 'is-done');
    }
  });
};

AppLoader.setStatus = function (value) {
  const backup = loaderElement.querySelector('.vl-backup-restore');
  if (!backup) return;
  const statusEl = backup.querySelector('.vl-backup-status');
  const map = { Active: 'is-active', Paused: 'is-paused', Retrying: 'is-paused', Error: 'is-error', Completed: 'is-done' };
  const label = value || 'Active';
  statusEl.textContent = label === 'Retrying' ? 'Retrying' : label;
  statusEl.classList.remove('is-active', 'is-paused', 'is-error', 'is-done');
  statusEl.classList.add(map[label] || 'is-active');
};

AppLoader.setWarnings = function (value) {
  const backup = loaderElement.querySelector('.vl-backup-restore');
  if (!backup) return;
  const warnings = Math.max(0, Math.round(Number(value) || 0));
  const warningEl = backup.querySelector('.vl-backup-warnings');
  warningEl && (warningEl.textContent = 'Warnings: ' + warnings);
};`
	  },
  {
    id: 'database-migration-progress',
    name: 'Database Migration',
    category: 'Operations',
    tech: 'CSS + JavaScript',
    description: 'Tracks schema rollout and data movement with migration stages for Schema, Tables, Records, Indexes, and Validation.',
    markup: `<div class="vl-db-migration" role="region" aria-label="Database migration progress" data-errors="0">
  <div class="vl-db-migration-head">
    <div>
      <strong class="vl-db-migration-label">tenant_ledger_migration</strong>
      <p class="vl-db-migration-stage">Schema</p>
    </div>
    <span class="vl-db-migration-status is-active">Active</span>
  </div>
  <div class="vl-db-migration-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="26">
    <span class="vl-db-migration-fill" style="width:26%"></span>
  </div>
  <div class="vl-db-migration-meta">
    <span class="vl-db-migration-items">128 / 500 tables</span>
    <span class="vl-db-migration-errors">Errors: 0</span>
  </div>
  <div class="vl-db-migration-steps">
    <span class="vl-db-migration-step is-active" data-step="Schema">Schema</span>
    <span class="vl-db-migration-step" data-step="Tables">Tables</span>
    <span class="vl-db-migration-step" data-step="Records">Records</span>
    <span class="vl-db-migration-step" data-step="Indexes">Indexes</span>
    <span class="vl-db-migration-step" data-step="Validation">Validation</span>
  </div>
  <div class="vl-db-migration-foot">
    <span class="vl-db-migration-rate">12 tx/s</span>
    <span class="vl-db-migration-eta">ETA 03:24</span>
  </div>
</div>`,
    css: `.vl-db-migration {
  width: min(255px, 84vw);
  display: grid;
  gap: 8px;
  padding: 11px;
  border: 1px solid color-mix(in srgb, var(--loader-accent) 12%, #d3deeb);
  border-radius: 11px;
  background: #fff;
  color: #172033;
  font-family: system-ui, sans-serif;
  font-size: 11px;
  box-shadow: 0 8px 24px rgba(17, 24, 39, .06);
}
.vl-db-migration-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.vl-db-migration-label {
  display: block;
  max-width: 160px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
}
.vl-db-migration-stage {
  margin: 3px 0 0;
  color: #667085;
  font-size: 11px;
}
.vl-db-migration-status {
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: #0f766e;
  background: color-mix(in srgb, var(--loader-accent) 16%, #edfbf8);
}
.vl-db-migration-status.is-paused {
  color: #9a6d00;
  background: #fff4d6;
}
.vl-db-migration-status.is-error {
  color: #b42318;
  background: #ffe2df;
}
.vl-db-migration-status.is-done {
  color: #047857;
  background: #dcfce7;
}
.vl-db-migration-progress {
  position: relative;
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
  background: color-mix(in srgb, var(--loader-accent) 12%, #e9edf6);
}
.vl-db-migration-fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  width: 26%;
  background: linear-gradient(90deg, var(--loader-accent), color-mix(in srgb, var(--loader-accent) 84%, #ffffff));
  transition: width .25s ease;
}
.vl-db-migration-meta,
.vl-db-migration-foot {
  display: flex;
  justify-content: space-between;
  gap: 6px;
  color: #6b7280;
  font-variant-numeric: tabular-nums;
}
.vl-db-migration-steps {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 4px;
}
.vl-db-migration-step {
  border: 1px solid #d8e0ef;
  border-radius: 999px;
  padding: 3px 5px;
  text-align: center;
  background: #fff;
  color: #6b7280;
}
.vl-db-migration-step.is-active {
  border-color: color-mix(in srgb, var(--loader-accent) 42%, #8fb0ff);
  color: var(--loader-accent);
  font-weight: 800;
}
.vl-db-migration-step.is-done {
  border-color: #17a34a;
  color: #16a34a;
  background: #e7f6ea;
}`,
    controls: [
      { type: 'range', key: 'progress', label: 'Migration percentage', min: 0, max: 100, step: 1, defaultValue: 26, suffix: '%', full: true },
      {
        type: 'select',
        key: 'stage',
        label: 'Stage',
        defaultValue: 'Schema',
        full: true,
        options: [
          { value: 'Schema', label: 'Schema' },
          { value: 'Tables', label: 'Tables' },
          { value: 'Records', label: 'Records' },
          { value: 'Indexes', label: 'Indexes' },
          { value: 'Validation', label: 'Validation' },
          { value: 'Completed', label: 'Completed' }
        ]
      },
      {
        type: 'select',
        key: 'status',
        label: 'Status',
        defaultValue: 'Active',
        full: true,
        options: [
          { value: 'Active', label: 'Active' },
          { value: 'Paused', label: 'Paused' },
          { value: 'Retrying', label: 'Retrying' },
          { value: 'Error', label: 'Error' },
          { value: 'Completed', label: 'Completed' }
        ]
      },
      {
        type: 'range',
        key: 'errors',
        label: 'Errors',
        min: 0,
        max: 25,
        step: 1,
        defaultValue: 0,
        full: true
      }
    ],
    applyControls(container, values) {
      const migration = container.querySelector('.vl-db-migration');
      if (!migration) return;

      const progress = Math.max(0, Math.min(100, Number(values.progress) || 0));
      const stage = values.stage || 'Schema';
      const status = values.status || 'Active';
      const errors = Math.max(0, Math.round(Number(values.errors) || 0));
      const stageOrder = ['Schema', 'Tables', 'Records', 'Indexes', 'Validation', 'Completed'];
      const stageIndex = stageOrder.indexOf(stage);
      const totalTables = 500;
      const completedTables = Math.max(0, Math.round(totalTables * (progress / 100)));
      const etaSeconds = progress > 0 ? Math.ceil((100 - progress) * 3.2) : 0;
      const etaText = String(Math.floor(etaSeconds / 60)).padStart(2, '0') + ':' + String(etaSeconds % 60).padStart(2, '0');
      const tps = progress >= 100 ? 0 : Math.max(6, Math.round(8 + progress / 3));

      migration.setAttribute('data-errors', String(errors));
      migration.querySelector('.vl-db-migration-stage').textContent = stage;
      migration.querySelector('.vl-db-migration-items').textContent = completedTables + ' / ' + totalTables + ' tables';
      migration.querySelector('.vl-db-migration-fill').style.width = `${progress}%`;
      migration.querySelector('.vl-db-migration-progress').setAttribute('aria-valuenow', String(Math.round(progress)));
      migration.querySelector('.vl-db-migration-rate').textContent = tps + ' tx/s';
      migration.querySelector('.vl-db-migration-eta').textContent = 'ETA ' + etaText;
      migration.querySelector('.vl-db-migration-errors').textContent = 'Errors: ' + errors;

      const statusEl = migration.querySelector('.vl-db-migration-status');
      const map = { Active: 'is-active', Paused: 'is-paused', Retrying: 'is-paused', Error: 'is-error', Completed: 'is-done' };
      statusEl.textContent = status === 'Retrying' ? 'Retrying' : status;
      statusEl.classList.remove('is-active', 'is-paused', 'is-error', 'is-done');
      statusEl.classList.add(map[status] || 'is-active');

      migration.querySelectorAll('.vl-db-migration-step').forEach((step, index) => {
        if (index < stageIndex) {
          step.classList.remove('is-active');
          step.classList.add('is-done');
        } else if (index === stageIndex) {
          step.classList.remove('is-done');
          step.classList.add('is-active');
        } else {
          step.classList.remove('is-active', 'is-done');
        }
      });
    },
    js: `AppLoader.setProgress = function (value, rate) {
  const migration = loaderElement.querySelector('.vl-db-migration');
  if (!migration) return;
  const safe = Math.max(0, Math.min(100, Number(value) || 0));
  const totalTables = 500;
  const done = Math.round(totalTables * (safe / 100));
  const remaining = totalTables - done;
  const txRate = Number(rate) || 0;
  const resolvedRate = txRate > 0 ? txRate : (safe >= 100 ? 0 : Math.max(4, 9 + safe / 4));
  const eta = safe >= 100 ? 0 : Math.round((remaining * 100) / Math.max(1, Math.round(resolvedRate)));
  const etaText = String(Math.floor(eta / 60)).padStart(2, '0') + ':' + String(eta % 60).padStart(2, '0');

  const meter = migration.querySelector('.vl-db-migration-progress');
  const fill = migration.querySelector('.vl-db-migration-fill');
  const items = migration.querySelector('.vl-db-migration-items');
  const etaTextEl = migration.querySelector('.vl-db-migration-eta');
  const rateEl = migration.querySelector('.vl-db-migration-rate');

  meter && meter.setAttribute('aria-valuenow', String(Math.round(safe)));
  fill && (fill.style.width = safe + '%');
  items && (items.textContent = done + ' / ' + totalTables + ' tables');
  etaTextEl && (etaTextEl.textContent = 'ETA ' + etaText);
  rateEl && (rateEl.textContent = Math.round(resolvedRate) + ' tx/s');
  if (safe === 100) {
    migration.querySelectorAll('.vl-db-migration-step').forEach((step, index) => {
      step.classList.add('is-done');
      step.classList.remove('is-active');
    });
  }
};

AppLoader.setStage = function (value) {
  const migration = loaderElement.querySelector('.vl-db-migration');
  if (!migration) return;
  const stage = migration.querySelector('.vl-db-migration-stage');
  const steps = migration.querySelectorAll('.vl-db-migration-step');
  const order = ['Schema', 'Tables', 'Records', 'Indexes', 'Validation', 'Completed'];
  const idx = order.indexOf(value);
  stage && (stage.textContent = value || 'Schema');
  steps.forEach((step, index) => {
    if (idx === -1) return;
    if (index < idx) {
      step.classList.remove('is-active');
      step.classList.add('is-done');
    } else if (index === idx) {
      step.classList.remove('is-done');
      step.classList.add('is-active');
    } else {
      step.classList.remove('is-active', 'is-done');
    }
  });
};

AppLoader.setStatus = function (value) {
  const migration = loaderElement.querySelector('.vl-db-migration');
  if (!migration) return;
  const statusEl = migration.querySelector('.vl-db-migration-status');
  const map = { Active: 'is-active', Paused: 'is-paused', Retrying: 'is-paused', Error: 'is-error', Completed: 'is-done' };
  const label = value || 'Active';
  statusEl && (statusEl.textContent = label === 'Retrying' ? 'Retrying' : label);
  statusEl && statusEl.classList.remove('is-active', 'is-paused', 'is-error', 'is-done');
  statusEl && statusEl.classList.add(map[label] || 'is-active');
};

AppLoader.setErrors = function (value) {
  const migration = loaderElement.querySelector('.vl-db-migration');
  if (!migration) return;
  const errors = Math.max(0, Math.round(Number(value) || 0));
  const errorsEl = migration.querySelector('.vl-db-migration-errors');
  errorsEl && (errorsEl.textContent = 'Errors: ' + errors);
  migration.setAttribute('data-errors', String(errors));
};`
  },
  {
    id: 'ocr-idp-pipeline',
    name: 'OCR / IDP Pipeline',
    category: 'Operations',
    tech: 'CSS + JavaScript',
    description: 'Model extraction pipeline with OCR capture, field extraction, validation passes, and completion stage.',
    markup: `<div class="vl-ocr-pipeline" role="region" aria-label="OCR IDP pipeline" data-confidence="88">
  <div class="vl-ocr-head">
    <div>
      <strong class="vl-ocr-file">invoice_batch_2026-08.csv</strong>
      <p class="vl-ocr-stage">Uploading</p>
    </div>
    <span class="vl-ocr-status is-active">Active</span>
  </div>
  <div class="vl-ocr-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="34">
    <span class="vl-ocr-fill" style="width:34%"></span>
  </div>
  <div class="vl-ocr-meta">
    <span class="vl-ocr-docs">6 / 24 documents</span>
    <span class="vl-ocr-confidence">Accuracy 88%</span>
    <span class="vl-ocr-eta">ETA 01:50</span>
  </div>
  <div class="vl-ocr-steps">
    <span class="vl-ocr-step is-active" data-step="Uploading">Uploading</span>
    <span class="vl-ocr-step" data-step="OCR">OCR</span>
    <span class="vl-ocr-step" data-step="Extracting fields">Extracting fields</span>
    <span class="vl-ocr-step" data-step="Validating">Validating</span>
    <span class="vl-ocr-step" data-step="Completed">Completed</span>
  </div>
  <div class="vl-ocr-foot">
    <span class="vl-ocr-fields">0 / 132 fields</span>
    <span class="vl-ocr-failed">Failed: 0</span>
  </div>
</div>`,
    css: `.vl-ocr-pipeline {
  width: min(255px, 84vw);
  display: grid;
  gap: 8px;
  padding: 11px;
  border: 1px solid color-mix(in srgb, var(--loader-accent) 12%, #d3deeb);
  border-radius: 11px;
  background: #fff;
  color: #172033;
  font-family: system-ui, sans-serif;
  font-size: 11px;
  box-shadow: 0 8px 24px rgba(17, 24, 39, .06);
}
.vl-ocr-head {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.vl-ocr-file {
  display: block;
  max-width: 160px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
}
.vl-ocr-stage {
  margin: 3px 0 0;
  color: #667085;
  font-size: 11px;
}
.vl-ocr-status {
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: #0f766e;
  background: color-mix(in srgb, var(--loader-accent) 16%, #edfbf8);
}
.vl-ocr-status.is-paused {
  color: #9a6d00;
  background: #fff4d6;
}
.vl-ocr-status.is-error {
  color: #b42318;
  background: #ffe2df;
}
.vl-ocr-status.is-done {
  color: #047857;
  background: #dcfce7;
}
.vl-ocr-progress {
  position: relative;
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
  background: color-mix(in srgb, var(--loader-accent) 12%, #e9edf6);
}
.vl-ocr-fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  width: 34%;
  background: linear-gradient(90deg, var(--loader-accent), color-mix(in srgb, var(--loader-accent) 84%, #ffffff));
  transition: width .25s ease;
}
.vl-ocr-meta,
.vl-ocr-foot {
  display: flex;
  justify-content: space-between;
  gap: 6px;
  color: #6b7280;
  font-variant-numeric: tabular-nums;
}
.vl-ocr-steps {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 4px;
}
.vl-ocr-step {
  border: 1px solid #d8e0ef;
  border-radius: 999px;
  padding: 3px 5px;
  text-align: center;
  background: #fff;
  color: #6b7280;
}
.vl-ocr-step.is-active {
  border-color: color-mix(in srgb, var(--loader-accent) 42%, #8fb0ff);
  color: var(--loader-accent);
  font-weight: 800;
}
.vl-ocr-step.is-done {
  border-color: #17a34a;
  color: #16a34a;
  background: #e7f6ea;
}
`,
    controls: [
      { type: 'range', key: 'progress', label: 'Pipeline percentage', min: 0, max: 100, step: 1, defaultValue: 34, suffix: '%', full: true },
      {
        type: 'select',
        key: 'stage',
        label: 'Stage',
        defaultValue: 'Uploading',
        full: true,
        options: [
          { value: 'Uploading', label: 'Uploading' },
          { value: 'OCR', label: 'OCR' },
          { value: 'Extracting fields', label: 'Extracting fields' },
          { value: 'Validating', label: 'Validating' },
          { value: 'Completed', label: 'Completed' }
        ]
      },
      {
        type: 'select',
        key: 'status',
        label: 'Status',
        defaultValue: 'Active',
        full: true,
        options: [
          { value: 'Active', label: 'Active' },
          { value: 'Paused', label: 'Paused' },
          { value: 'Retrying', label: 'Retrying' },
          { value: 'Error', label: 'Error' },
          { value: 'Completed', label: 'Completed' }
        ]
      },
      {
        type: 'range',
        key: 'confidence',
        label: 'Accuracy',
        min: 55,
        max: 100,
        step: 1,
        defaultValue: 88,
        suffix: '%',
        full: true
      },
      {
        type: 'range',
        key: 'failed',
        label: 'Failed documents',
        min: 0,
        max: 15,
        step: 1,
        defaultValue: 0,
        full: true
      }
    ],
    applyControls(container, values) {
      const root = container.querySelector('.vl-ocr-pipeline');
      if (!root) return;

      const progress = Math.max(0, Math.min(100, Number(values.progress) || 0));
      const stage = values.stage || 'Uploading';
      const status = values.status || 'Active';
      const confidence = Math.max(0, Math.min(100, Number(values.confidence) || 0));
      const failed = Math.max(0, Math.round(Number(values.failed) || 0));
      const stageOrder = ['Uploading', 'OCR', 'Extracting fields', 'Validating', 'Completed'];
      const stageIndex = stageOrder.indexOf(stage);
      const totalDocs = 24;
      const doneDocs = Math.max(0, Math.round(totalDocs * (progress / 100)));
      const totalFields = 132;
      const doneFields = Math.max(0, Math.round(totalFields * (progress / 100)));
      const eta = progress > 0 ? Math.ceil((100 - progress) * 1.2) : 0;
      const etaText = String(Math.floor(eta / 60)).padStart(2, '0') + ':' + String(eta % 60).padStart(2, '0');

      root.querySelector('.vl-ocr-stage').textContent = stage;
      root.setAttribute('data-confidence', String(confidence));
      root.querySelector('.vl-ocr-progress').setAttribute('aria-valuenow', String(Math.round(progress)));
      root.querySelector('.vl-ocr-fill').style.width = `${progress}%`;
      root.querySelector('.vl-ocr-docs').textContent = doneDocs + ' / ' + totalDocs + ' documents';
      root.querySelector('.vl-ocr-fields').textContent = doneFields + ' / ' + totalFields + ' fields';
      root.querySelector('.vl-ocr-confidence').textContent = 'Accuracy ' + confidence + '%';
      root.querySelector('.vl-ocr-eta').textContent = 'ETA ' + etaText;
      root.querySelector('.vl-ocr-failed').textContent = 'Failed: ' + failed;

      const statusEl = root.querySelector('.vl-ocr-status');
      const map = { Active: 'is-active', Paused: 'is-paused', Retrying: 'is-paused', Error: 'is-error', Completed: 'is-done' };
      statusEl.textContent = status === 'Retrying' ? 'Retrying' : status;
      statusEl.classList.remove('is-active', 'is-paused', 'is-error', 'is-done');
      statusEl.classList.add(map[status] || 'is-active');

      root.querySelectorAll('.vl-ocr-step').forEach((step, index) => {
        if (index < stageIndex) {
          step.classList.remove('is-active');
          step.classList.add('is-done');
        } else if (index === stageIndex) {
          step.classList.remove('is-done');
          step.classList.add('is-active');
        } else {
          step.classList.remove('is-active', 'is-done');
        }
      });
    },
    js: `AppLoader.setProgress = function (value, fields, confidence) {
  const root = loaderElement.querySelector('.vl-ocr-pipeline');
  if (!root) return;
  const safe = Math.max(0, Math.min(100, Number(value) || 0));
  const totalDocs = 24;
  const totalFields = 132;
  const doneDocs = Math.max(0, Math.round(totalDocs * (safe / 100)));
  const doneFields = Math.max(0, Math.round(totalFields * (safe / 100)));
  const parsedFields = Number(fields);
  const shownFields = isNaN(parsedFields) ? doneFields : Math.max(0, Math.round(parsedFields));
  const quality = Number(confidence);
  const safeConfidence = Math.max(0, Math.min(100, isNaN(quality) ? 88 : quality));
  const eta = safe >= 100 ? 0 : Math.ceil((100 - safe) * 1.2);
  const etaText = String(Math.floor(eta / 60)).padStart(2, '0') + ':' + String(eta % 60).padStart(2, '0');

  const meter = root.querySelector('.vl-ocr-progress');
  const fill = root.querySelector('.vl-ocr-fill');
  const docs = root.querySelector('.vl-ocr-docs');
  const field = root.querySelector('.vl-ocr-fields');
  const conf = root.querySelector('.vl-ocr-confidence');
  const etaEl = root.querySelector('.vl-ocr-eta');

  meter && meter.setAttribute('aria-valuenow', String(Math.round(safe)));
  fill && (fill.style.width = safe + '%');
  docs && (docs.textContent = doneDocs + ' / ' + totalDocs + ' documents');
  field && (field.textContent = shownFields + ' / ' + totalFields + ' fields');
  conf && (conf.textContent = 'Accuracy ' + safeConfidence + '%');
  root && root.setAttribute('data-confidence', String(safeConfidence));
  etaEl && (etaEl.textContent = 'ETA ' + etaText);
  if (safe === 100) {
    root.querySelectorAll('.vl-ocr-step').forEach((step, index) => {
      step.classList.add('is-done');
      step.classList.remove('is-active');
    });
  }
};

AppLoader.setStage = function (value) {
  const root = loaderElement.querySelector('.vl-ocr-pipeline');
  if (!root) return;
  const stage = root.querySelector('.vl-ocr-stage');
  const steps = root.querySelectorAll('.vl-ocr-step');
  const order = ['Uploading', 'OCR', 'Extracting fields', 'Validating', 'Completed'];
  const idx = order.indexOf(value);
  stage && (stage.textContent = value || 'Uploading');
  steps.forEach((step, index) => {
    if (idx === -1) return;
    if (index < idx) {
      step.classList.remove('is-active');
      step.classList.add('is-done');
    } else if (index === idx) {
      step.classList.remove('is-done');
      step.classList.add('is-active');
    } else {
      step.classList.remove('is-active', 'is-done');
    }
  });
};

AppLoader.setStatus = function (value) {
  const root = loaderElement.querySelector('.vl-ocr-pipeline');
  if (!root) return;
  const statusEl = root.querySelector('.vl-ocr-status');
  const map = { Active: 'is-active', Paused: 'is-paused', Retrying: 'is-paused', Error: 'is-error', Completed: 'is-done' };
  const label = value || 'Active';
  statusEl && (statusEl.textContent = label === 'Retrying' ? 'Retrying' : label);
  statusEl && statusEl.classList.remove('is-active', 'is-paused', 'is-error', 'is-done');
  statusEl && statusEl.classList.add(map[label] || 'is-active');
};

AppLoader.setFailed = function (value) {
  const root = loaderElement.querySelector('.vl-ocr-pipeline');
  if (!root) return;
  const failed = Math.max(0, Math.round(Number(value) || 0));
  const failedEl = root.querySelector('.vl-ocr-failed');
  failedEl && (failedEl.textContent = 'Failed: ' + failed);
};`
  },
  {
    id: 'pdf-export-pipeline',
    name: 'Report / PDF Export Pipeline',
    category: 'Operations',
    tech: 'CSS + JavaScript',
    description: 'Tracks report rendering, pagination, packaging and ready-to-download stages in an export workflow.',
    markup: `<div class="vl-report-export" role="region" aria-label="Report and PDF export progress" data-assets="0">
  <div class="vl-report-head">
    <div>
      <strong class="vl-report-file">monthly-financial-summary.pdf</strong>
      <p class="vl-report-stage">Preparing data</p>
    </div>
    <span class="vl-report-status is-active">Active</span>
  </div>
  <div class="vl-report-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="41">
    <span class="vl-report-fill" style="width:41%"></span>
  </div>
  <div class="vl-report-meta">
    <span class="vl-report-pages">82 / 200 pages</span>
    <span class="vl-report-size">0.3 MB</span>
    <span class="vl-report-eta">ETA 01:28</span>
  </div>
  <div class="vl-report-steps">
    <span class="vl-report-step is-active" data-step="Preparing data">Preparing data</span>
    <span class="vl-report-step" data-step="Rendering pages">Rendering pages</span>
    <span class="vl-report-step" data-step="Packaging">Packaging</span>
    <span class="vl-report-step" data-step="Download ready">Download ready</span>
  </div>
  <div class="vl-report-foot">
    <span class="vl-report-assets">0 assets</span>
    <span class="vl-report-failed">Failed pages: 0</span>
  </div>
</div>`,
    css: `.vl-report-export {
  width: min(255px, 84vw);
  display: grid;
  gap: 8px;
  padding: 11px;
  border: 1px solid color-mix(in srgb, var(--loader-accent) 12%, #d4e0f1);
  border-radius: 11px;
  background: #fff;
  color: #172033;
  font-family: system-ui, sans-serif;
  font-size: 11px;
  box-shadow: 0 8px 24px rgba(17, 24, 39, .06);
}
.vl-report-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.vl-report-file {
  display: block;
  max-width: 160px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
}
.vl-report-stage {
  margin: 3px 0 0;
  color: #667085;
  font-size: 11px;
}
.vl-report-status {
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: #0f766e;
  background: color-mix(in srgb, var(--loader-accent) 16%, #edfbf8);
}
.vl-report-status.is-paused {
  color: #9a6d00;
  background: #fff4d6;
}
.vl-report-status.is-error {
  color: #b42318;
  background: #ffe2df;
}
.vl-report-status.is-done {
  color: #047857;
  background: #dcfce7;
}
.vl-report-progress {
  position: relative;
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
  background: color-mix(in srgb, var(--loader-accent) 12%, #e9edf6);
}
.vl-report-fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  width: 41%;
  background: linear-gradient(90deg, var(--loader-accent), color-mix(in srgb, var(--loader-accent) 84%, #ffffff));
  transition: width .25s ease;
}
.vl-report-meta,
.vl-report-foot {
  display: flex;
  justify-content: space-between;
  gap: 6px;
  color: #6b7280;
  font-variant-numeric: tabular-nums;
}
.vl-report-steps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 4px;
}
.vl-report-step {
  border: 1px solid #d8e0ef;
  border-radius: 999px;
  padding: 3px 5px;
  text-align: center;
  background: #fff;
  color: #6b7280;
}
.vl-report-step.is-active {
  border-color: color-mix(in srgb, var(--loader-accent) 42%, #8fb0ff);
  color: var(--loader-accent);
  font-weight: 800;
}
.vl-report-step.is-done {
  border-color: #17a34a;
  color: #16a34a;
  background: #e7f6ea;
}
`,
    controls: [
      { type: 'range', key: 'progress', label: 'Export percentage', min: 0, max: 100, step: 1, defaultValue: 41, suffix: '%', full: true },
      {
        type: 'select',
        key: 'stage',
        label: 'Stage',
        defaultValue: 'Preparing data',
        full: true,
        options: [
          { value: 'Preparing data', label: 'Preparing data' },
          { value: 'Rendering pages', label: 'Rendering pages' },
          { value: 'Packaging', label: 'Packaging' },
          { value: 'Download ready', label: 'Download ready' }
        ]
      },
      {
        type: 'select',
        key: 'status',
        label: 'Status',
        defaultValue: 'Active',
        full: true,
        options: [
          { value: 'Active', label: 'Active' },
          { value: 'Paused', label: 'Paused' },
          { value: 'Retrying', label: 'Retrying' },
          { value: 'Error', label: 'Error' },
          { value: 'Completed', label: 'Completed' }
        ]
      },
      {
        type: 'range',
        key: 'assets',
        label: 'Total assets',
        min: 0,
        max: 12,
        step: 1,
        defaultValue: 0,
        full: true
      },
      {
        type: 'range',
        key: 'failed',
        label: 'Failed pages',
        min: 0,
        max: 25,
        step: 1,
        defaultValue: 0,
        full: true
      }
    ],
    applyControls(container, values) {
      const root = container.querySelector('.vl-report-export');
      if (!root) return;

      const progress = Math.max(0, Math.min(100, Number(values.progress) || 0));
      const stage = values.stage || 'Preparing data';
      const status = values.status || 'Active';
      const assets = Math.max(0, Math.round(Number(values.assets) || 0));
      const failed = Math.max(0, Math.round(Number(values.failed) || 0));
      const stageOrder = ['Preparing data', 'Rendering pages', 'Packaging', 'Download ready'];
      const stageIndex = stageOrder.indexOf(stage);
      const totalPages = 200;
      const donePages = Math.max(0, Math.round(totalPages * (progress / 100)));
      const totalSizeMB = 9.2;
      const doneSize = Math.max(0, Math.round((totalSizeMB * (progress / 100)) * 10) / 10);
      const eta = progress > 0 ? Math.ceil((100 - progress) * 0.9) : 0;
      const etaText = String(Math.floor(eta / 60)).padStart(2, '0') + ':' + String(eta % 60).padStart(2, '0');

      root.querySelector('.vl-report-stage').textContent = stage;
      root.querySelector('.vl-report-progress').setAttribute('aria-valuenow', String(Math.round(progress)));
      root.querySelector('.vl-report-fill').style.width = `${progress}%`;
      root.querySelector('.vl-report-pages').textContent = `${donePages} / ${totalPages} pages`;
      root.querySelector('.vl-report-size').textContent = doneSize + ' MB';
      root.querySelector('.vl-report-eta').textContent = 'ETA ' + etaText;
      root.querySelector('.vl-report-assets').textContent = assets + ' assets';
      root.querySelector('.vl-report-failed').textContent = 'Failed pages: ' + failed;

      const statusEl = root.querySelector('.vl-report-status');
      const map = { Active: 'is-active', Paused: 'is-paused', Retrying: 'is-paused', Error: 'is-error', Completed: 'is-done' };
      statusEl.textContent = status === 'Retrying' ? 'Retrying' : status;
      statusEl.classList.remove('is-active', 'is-paused', 'is-error', 'is-done');
      statusEl.classList.add(map[status] || 'is-active');

      root.querySelectorAll('.vl-report-step').forEach((step, index) => {
        if (index < stageIndex) {
          step.classList.remove('is-active');
          step.classList.add('is-done');
        } else if (index === stageIndex) {
          step.classList.remove('is-done');
          step.classList.add('is-active');
        } else {
          step.classList.remove('is-active', 'is-done');
        }
      });
    },
    js: `AppLoader.setProgress = function (value, sizeMB, assets) {
  const root = loaderElement.querySelector('.vl-report-export');
  if (!root) return;
  const safe = Math.max(0, Math.min(100, Number(value) || 0));
  const totalPages = 200;
  const donePages = Math.max(0, Math.round(totalPages * (safe / 100)));
  const size = Number(sizeMB);
  const safeSize = isNaN(size) ? 9.2 : Math.max(0, size);
  const doneSize = Math.round(safeSize * (safe / 100) * 10) / 10;
  const eta = safe >= 100 ? 0 : Math.ceil((100 - safe) * 0.9);
  const etaText = String(Math.floor(eta / 60)).padStart(2, '0') + ':' + String(eta % 60).padStart(2, '0');
  const parsedAssets = Math.max(0, Math.round(Number(assets) || 0));

  const meter = root.querySelector('.vl-report-progress');
  const fill = root.querySelector('.vl-report-fill');
  const pages = root.querySelector('.vl-report-pages');
  const sizeEl = root.querySelector('.vl-report-size');
  const etaEl = root.querySelector('.vl-report-eta');
  const assetEl = root.querySelector('.vl-report-assets');

  meter && meter.setAttribute('aria-valuenow', String(Math.round(safe)));
  fill && (fill.style.width = safe + '%');
  pages && (pages.textContent = donePages + ' / ' + totalPages + ' pages');
  sizeEl && (sizeEl.textContent = doneSize + ' MB');
  etaEl && (etaEl.textContent = 'ETA ' + etaText);
  if (!isNaN(parsedAssets)) assetEl && (assetEl.textContent = parsedAssets + ' assets');
  root && root.setAttribute('data-assets', String(parsedAssets));
  if (safe === 100) {
    root.querySelectorAll('.vl-report-step').forEach((step, index) => {
      step.classList.add('is-done');
      step.classList.remove('is-active');
    });
  }
};

AppLoader.setStage = function (value) {
  const root = loaderElement.querySelector('.vl-report-export');
  if (!root) return;
  const stage = root.querySelector('.vl-report-stage');
  const steps = root.querySelectorAll('.vl-report-step');
  const order = ['Preparing data', 'Rendering pages', 'Packaging', 'Download ready'];
  const idx = order.indexOf(value);
  stage && (stage.textContent = value || 'Preparing data');
  steps.forEach((step, index) => {
    if (idx === -1) return;
    if (index < idx) {
      step.classList.remove('is-active');
      step.classList.add('is-done');
    } else if (index === idx) {
      step.classList.remove('is-done');
      step.classList.add('is-active');
    } else {
      step.classList.remove('is-active', 'is-done');
    }
  });
};

AppLoader.setStatus = function (value) {
  const root = loaderElement.querySelector('.vl-report-export');
  if (!root) return;
  const statusEl = root.querySelector('.vl-report-status');
  const map = { Active: 'is-active', Paused: 'is-paused', Retrying: 'is-paused', Error: 'is-error', Completed: 'is-done' };
  const label = value || 'Active';
  statusEl && (statusEl.textContent = label === 'Retrying' ? 'Retrying' : label);
  statusEl && statusEl.classList.remove('is-active', 'is-paused', 'is-error', 'is-done');
  statusEl && statusEl.classList.add(map[label] || 'is-active');
};

AppLoader.setAssets = function (value) {
  const root = loaderElement.querySelector('.vl-report-export');
  if (!root) return;
  const assets = Math.max(0, Math.round(Number(value) || 0));
  const assetEl = root.querySelector('.vl-report-assets');
  assetEl && (assetEl.textContent = assets + ' assets');
  root.setAttribute('data-assets', String(assets));
};

AppLoader.setFailed = function (value) {
  const root = loaderElement.querySelector('.vl-report-export');
  if (!root) return;
  const failed = Math.max(0, Math.round(Number(value) || 0));
  const failedEl = root.querySelector('.vl-report-failed');
  failedEl && (failedEl.textContent = 'Failed pages: ' + failed);
};`
  },
  {
    id: 'media-transcoding-pipeline',
    name: 'Media Transcoding',
    category: 'Operations',
    tech: 'CSS + JavaScript',
    description: 'Tracks transcoding of media jobs with audio/video phase, thumbnail generation, bitrate, and failover counts.',
    markup: `<div class="vl-media-transcode" role="region" aria-label="Media transcoding progress" data-failed="0">
  <div class="vl-media-head">
    <div>
      <strong class="vl-media-file">promo_clip_2026.mov</strong>
      <p class="vl-media-stage">Uploading</p>
    </div>
    <span class="vl-media-status is-active">Active</span>
  </div>
  <div class="vl-media-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="25">
    <span class="vl-media-fill" style="width:25%"></span>
  </div>
  <div class="vl-media-meta">
    <span class="vl-media-stats">0 / 128 tracks</span>
    <span class="vl-media-speed">24.3 fps</span>
    <span class="vl-media-eta">ETA 01:06</span>
  </div>
  <div class="vl-media-steps">
    <span class="vl-media-step is-active" data-step="Uploading">Uploading</span>
    <span class="vl-media-step" data-step="Audio Processing">Audio Processing</span>
    <span class="vl-media-step" data-step="Video Processing">Video Processing</span>
    <span class="vl-media-step" data-step="Thumbnailing">Thumbnailing</span>
    <span class="vl-media-step" data-step="Finalizing">Finalizing</span>
  </div>
  <div class="vl-media-foot">
    <span class="vl-media-bitrate">5.2 Mbps</span>
    <span class="vl-media-failed">Failed: 0</span>
  </div>
</div>`,
    css: `.vl-media-transcode {
  width: min(255px, 84vw);
  display: grid;
  gap: 8px;
  padding: 11px;
  border: 1px solid color-mix(in srgb, var(--loader-accent) 12%, #d4e0f1);
  border-radius: 11px;
  background: #fff;
  color: #172033;
  font-family: system-ui, sans-serif;
  font-size: 11px;
  box-shadow: 0 8px 24px rgba(17, 24, 39, .06);
}
.vl-media-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.vl-media-file {
  display: block;
  max-width: 160px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
}
.vl-media-stage {
  margin: 3px 0 0;
  color: #667085;
  font-size: 11px;
}
.vl-media-status {
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: #0f766e;
  background: color-mix(in srgb, var(--loader-accent) 16%, #edfbf8);
}
.vl-media-status.is-paused {
  color: #9a6d00;
  background: #fff4d6;
}
.vl-media-status.is-error {
  color: #b42318;
  background: #ffe2df;
}
.vl-media-status.is-done {
  color: #047857;
  background: #dcfce7;
}
.vl-media-progress {
  position: relative;
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
  background: color-mix(in srgb, var(--loader-accent) 12%, #e9edf6);
}
.vl-media-fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  width: 25%;
  background: linear-gradient(90deg, var(--loader-accent), color-mix(in srgb, var(--loader-accent) 84%, #ffffff));
  transition: width .25s ease;
}
.vl-media-meta,
.vl-media-foot {
  display: flex;
  justify-content: space-between;
  gap: 6px;
  color: #6b7280;
  font-variant-numeric: tabular-nums;
}
.vl-media-steps {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 4px;
}
.vl-media-step {
  border: 1px solid #d8e0ef;
  border-radius: 999px;
  padding: 3px 5px;
  text-align: center;
  background: #fff;
  color: #6b7280;
}
.vl-media-step.is-active {
  border-color: color-mix(in srgb, var(--loader-accent) 42%, #8fb0ff);
  color: var(--loader-accent);
  font-weight: 800;
}
.vl-media-step.is-done {
  border-color: #17a34a;
  color: #16a34a;
  background: #e7f6ea;
}
`,
    controls: [
      { type: 'range', key: 'progress', label: 'Transcoding percentage', min: 0, max: 100, step: 1, defaultValue: 25, suffix: '%', full: true },
      {
        type: 'select',
        key: 'stage',
        label: 'Stage',
        defaultValue: 'Uploading',
        full: true,
        options: [
          { value: 'Uploading', label: 'Uploading' },
          { value: 'Audio Processing', label: 'Audio Processing' },
          { value: 'Video Processing', label: 'Video Processing' },
          { value: 'Thumbnailing', label: 'Thumbnailing' },
          { value: 'Finalizing', label: 'Finalizing' }
        ]
      },
      {
        type: 'select',
        key: 'status',
        label: 'Status',
        defaultValue: 'Active',
        full: true,
        options: [
          { value: 'Active', label: 'Active' },
          { value: 'Paused', label: 'Paused' },
          { value: 'Retrying', label: 'Retrying' },
          { value: 'Error', label: 'Error' },
          { value: 'Completed', label: 'Completed' }
        ]
      },
      { type: 'range', key: 'speed', label: 'FPS', min: 1, max: 120, step: 0.5, defaultValue: 24.3, suffix: ' fps', full: true },
      { type: 'range', key: 'failed', label: 'Failed segments', min: 0, max: 20, step: 1, defaultValue: 0, full: true }
    ],
    applyControls(container, values) {
      const root = container.querySelector('.vl-media-transcode');
      if (!root) return;

      const progress = Math.max(0, Math.min(100, Number(values.progress) || 0));
      const stage = values.stage || 'Uploading';
      const status = values.status || 'Active';
      const speed = Math.max(0, Number(values.speed) || 0);
      const failed = Math.max(0, Math.round(Number(values.failed) || 0));
      const stageOrder = ['Uploading', 'Audio Processing', 'Video Processing', 'Thumbnailing', 'Finalizing'];
      const stageIndex = stageOrder.indexOf(stage);
      const totalTracks = 128;
      const processed = Math.max(0, Math.round(totalTracks * (progress / 100)));
      const remaining = Math.max(0, totalTracks - processed);
      const eta = progress > 0 ? Math.ceil(remaining / Math.max(1, speed / 2)) : 0;
      const etaText = String(Math.floor(eta / 60)).padStart(2, '0') + ':' + String(eta % 60).padStart(2, '0');
      const bitrate = 3 + (progress / 100) * 8;

      root.querySelector('.vl-media-stage').textContent = stage;
      root.querySelector('.vl-media-progress').setAttribute('aria-valuenow', String(Math.round(progress)));
      root.querySelector('.vl-media-fill').style.width = `${progress}%`;
      root.querySelector('.vl-media-stats').textContent = `${processed} / ${totalTracks} tracks`;
      root.querySelector('.vl-media-speed').textContent = `${speed.toFixed(1)} fps`;
      root.querySelector('.vl-media-eta').textContent = 'ETA ' + etaText;
      root.querySelector('.vl-media-bitrate').textContent = `${bitrate.toFixed(1)} Mbps`;
      root.querySelector('.vl-media-failed').textContent = 'Failed: ' + failed;

      const statusEl = root.querySelector('.vl-media-status');
      const map = { Active: 'is-active', Paused: 'is-paused', Retrying: 'is-paused', Error: 'is-error', Completed: 'is-done' };
      statusEl.textContent = status === 'Retrying' ? 'Retrying' : status;
      statusEl.classList.remove('is-active', 'is-paused', 'is-error', 'is-done');
      statusEl.classList.add(map[status] || 'is-active');

      root.querySelectorAll('.vl-media-step').forEach((step, index) => {
        if (index < stageIndex) {
          step.classList.remove('is-active');
          step.classList.add('is-done');
        } else if (index === stageIndex) {
          step.classList.remove('is-done');
          step.classList.add('is-active');
        } else {
          step.classList.remove('is-active', 'is-done');
        }
      });
    },
    js: `AppLoader.setProgress = function (value, bitrate, fps) {
  const root = loaderElement.querySelector('.vl-media-transcode');
  if (!root) return;
  const safe = Math.max(0, Math.min(100, Number(value) || 0));
  const totalTracks = 128;
  const processed = Math.max(0, Math.round(totalTracks * (safe / 100)));
  const trackLeft = Math.max(0, totalTracks - processed);
  const speed = Number(fps) || 24.3;
  const eta = safe > 0 ? Math.ceil(trackLeft / Math.max(1, speed / 2)) : 0;
  const etaText = String(Math.floor(eta / 60)).padStart(2, '0') + ':' + String(eta % 60).padStart(2, '0');
  const parsedBitrate = Number(bitrate);
  const safeBitrate = isNaN(parsedBitrate) ? 5.2 : Math.max(0, parsedBitrate);

  const meter = root.querySelector('.vl-media-progress');
  const fill = root.querySelector('.vl-media-fill');
  const stats = root.querySelector('.vl-media-stats');
  const speedEl = root.querySelector('.vl-media-speed');
  const etaEl = root.querySelector('.vl-media-eta');
  const bitrateEl = root.querySelector('.vl-media-bitrate');

  meter && meter.setAttribute('aria-valuenow', String(Math.round(safe)));
  fill && (fill.style.width = safe + '%');
  stats && (stats.textContent = processed + ' / ' + totalTracks + ' tracks');
  speedEl && (speedEl.textContent = speed.toFixed(1) + ' fps');
  etaEl && (etaEl.textContent = 'ETA ' + etaText);
  bitrateEl && (bitrateEl.textContent = safeBitrate.toFixed(1) + ' Mbps');
  if (safe === 100) {
    root.querySelectorAll('.vl-media-step').forEach((step, index) => {
      step.classList.add('is-done');
      step.classList.remove('is-active');
    });
  }
};

AppLoader.setStage = function (value) {
  const root = loaderElement.querySelector('.vl-media-transcode');
  if (!root) return;
  const stage = root.querySelector('.vl-media-stage');
  const steps = root.querySelectorAll('.vl-media-step');
  const order = ['Uploading', 'Audio Processing', 'Video Processing', 'Thumbnailing', 'Finalizing'];
  const idx = order.indexOf(value);
  stage && (stage.textContent = value || 'Uploading');
  steps.forEach((step, index) => {
    if (idx === -1) return;
    if (index < idx) {
      step.classList.remove('is-active');
      step.classList.add('is-done');
    } else if (index === idx) {
      step.classList.remove('is-done');
      step.classList.add('is-active');
    } else {
      step.classList.remove('is-active', 'is-done');
    }
  });
};

AppLoader.setStatus = function (value) {
  const root = loaderElement.querySelector('.vl-media-transcode');
  if (!root) return;
  const statusEl = root.querySelector('.vl-media-status');
  const map = { Active: 'is-active', Paused: 'is-paused', Retrying: 'is-paused', Error: 'is-error', Completed: 'is-done' };
  const label = value || 'Active';
  statusEl && (statusEl.textContent = label === 'Retrying' ? 'Retrying' : label);
  statusEl && statusEl.classList.remove('is-active', 'is-paused', 'is-error', 'is-done');
  statusEl && statusEl.classList.add(map[label] || 'is-active');
};

AppLoader.setFailed = function (value) {
  const root = loaderElement.querySelector('.vl-media-transcode');
  if (!root) return;
  const failed = Math.max(0, Math.round(Number(value) || 0));
  const failedEl = root.querySelector('.vl-media-failed');
  failedEl && (failedEl.textContent = 'Failed: ' + failed);
};`
  },
  {
    id: 'background-job-queue',
    name: 'Background Job Queue',
    category: 'Operations',
    tech: 'CSS + JavaScript',
    description: 'Real-time worker queue monitoring for active jobs, queued items, completed work, failures, and retries.',
    markup: `<div class="vl-job-queue" role="region" aria-label="Background job queue progress" data-failures="0">
  <div class="vl-job-head">
    <div>
      <strong class="vl-job-title">Image Resizing Batch</strong>
      <p class="vl-job-stage">Distributing</p>
    </div>
    <span class="vl-job-status is-active">Active</span>
  </div>
  <div class="vl-job-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="36">
    <span class="vl-job-fill" style="width:36%"></span>
  </div>
  <div class="vl-job-meta">
    <span class="vl-job-workers">16 workers</span>
    <span class="vl-job-rates">1,240 jobs/min</span>
    <span class="vl-job-eta">ETA 00:58</span>
  </div>
  <div class="vl-job-grid">
    <span class="vl-job-card"><strong>Queued</strong><em class="vl-job-queued">52</em></span>
    <span class="vl-job-card"><strong>Completed</strong><em class="vl-job-complete">188</em></span>
    <span class="vl-job-card"><strong>Failed</strong><em class="vl-job-failed">3</em></span>
    <span class="vl-job-card"><strong>Retries</strong><em class="vl-job-retry">4</em></span>
  </div>
  <div class="vl-job-steps">
    <span class="vl-job-step is-active" data-step="Distributing">Distributing</span>
    <span class="vl-job-step" data-step="Processing">Processing</span>
    <span class="vl-job-step" data-step="Validation">Validation</span>
    <span class="vl-job-step" data-step="Completed">Completed</span>
  </div>
</div>`,
    css: `.vl-job-queue {
  width: min(255px, 84vw);
  display: grid;
  gap: 8px;
  padding: 11px;
  border: 1px solid color-mix(in srgb, var(--loader-accent) 12%, #d5e0f2);
  border-radius: 11px;
  background: #fff;
  color: #172033;
  font-family: system-ui, sans-serif;
  font-size: 11px;
}
.vl-job-head { display: flex; justify-content: space-between; gap: 10px; }
.vl-job-title { display: block; max-width: 160px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-size: 12px; }
.vl-job-stage { margin: 3px 0 0; color: #667085; font-size: 11px; }
.vl-job-status {
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: #0f766e;
  background: color-mix(in srgb, var(--loader-accent) 16%, #edfbf8);
}
.vl-job-status.is-paused { color: #9a6d00; background: #fff4d6; }
.vl-job-status.is-error { color: #b42318; background: #ffe2df; }
.vl-job-status.is-done { color: #047857; background: #dcfce7; }
.vl-job-progress {
  position: relative;
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
  background: color-mix(in srgb, var(--loader-accent) 12%, #e9edf6);
}
.vl-job-fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  width: 36%;
  background: linear-gradient(90deg, var(--loader-accent), color-mix(in srgb, var(--loader-accent) 84%, #ffffff));
  transition: width .25s ease;
}
.vl-job-meta,
.vl-job-grid {
  display: flex;
  justify-content: space-between;
  gap: 6px;
  color: #6b7280;
  font-variant-numeric: tabular-nums;
}
.vl-job-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 5px; }
.vl-job-card {
  border: 1px solid #d8e0ef;
  border-radius: 8px;
  padding: 4px 5px;
  background: #fff;
  color: #374151;
  display: grid;
  gap: 2px;
}
.vl-job-card strong { font-size: 9px; color: #6b7280; font-weight: 800; text-transform: uppercase; letter-spacing: .02em; }
.vl-job-card em { font-style: normal; font-weight: 700; }
.vl-job-steps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 4px;
}
.vl-job-step {
  border: 1px solid #d8e0ef;
  border-radius: 999px;
  padding: 3px 5px;
  text-align: center;
  background: #fff;
  color: #6b7280;
}
.vl-job-step.is-active {
  border-color: color-mix(in srgb, var(--loader-accent) 42%, #8fb0ff);
  color: var(--loader-accent);
  font-weight: 800;
}
.vl-job-step.is-done {
  border-color: #17a34a;
  color: #16a34a;
  background: #e7f6ea;
}
`,
    controls: [
      { type: 'range', key: 'progress', label: 'Completion', min: 0, max: 100, step: 1, defaultValue: 36, suffix: '%', full: true },
      {
        type: 'select',
        key: 'stage',
        label: 'Stage',
        defaultValue: 'Distributing',
        full: true,
        options: [
          { value: 'Distributing', label: 'Distributing' },
          { value: 'Processing', label: 'Processing' },
          { value: 'Validation', label: 'Validation' },
          { value: 'Completed', label: 'Completed' }
        ]
      },
      {
        type: 'select',
        key: 'status',
        label: 'Status',
        defaultValue: 'Active',
        full: true,
        options: [
          { value: 'Active', label: 'Active' },
          { value: 'Paused', label: 'Paused' },
          { value: 'Retrying', label: 'Retrying' },
          { value: 'Error', label: 'Error' },
          { value: 'Completed', label: 'Completed' }
        ]
      },
      { type: 'range', key: 'workers', label: 'Active workers', min: 1, max: 64, step: 1, defaultValue: 16, full: true },
      { type: 'range', key: 'queued', label: 'Queued jobs', min: 0, max: 800, step: 1, defaultValue: 52, full: true },
      { type: 'range', key: 'completed', label: 'Completed jobs', min: 0, max: 1200, step: 1, defaultValue: 188, full: true },
      { type: 'range', key: 'failures', label: 'Failed jobs', min: 0, max: 30, step: 1, defaultValue: 3, full: true },
      { type: 'range', key: 'retries', label: 'Retries', min: 0, max: 20, step: 1, defaultValue: 4, full: true }
    ],
    applyControls(container, values) {
      const root = container.querySelector('.vl-job-queue');
      if (!root) return;

      const progress = Math.max(0, Math.min(100, Number(values.progress) || 0));
      const stage = values.stage || 'Distributing';
      const status = values.status || 'Active';
      const workers = Math.max(1, Math.round(Number(values.workers) || 1));
      const queued = Math.max(0, Math.round(Number(values.queued) || 0));
      const completed = Math.max(0, Math.round(Number(values.completed) || 0));
      const failures = Math.max(0, Math.round(Number(values.failures) || 0));
      const retries = Math.max(0, Math.round(Number(values.retries) || 0));
      const stageOrder = ['Distributing', 'Processing', 'Validation', 'Completed'];
      const stageIndex = stageOrder.indexOf(stage);
      const totalJobs = Math.max(1, queued + completed + failures + 300);
      const rate = Math.max(1, Math.round(totalJobs * (progress / 100) / 1.5));
      const remaining = Math.max(0, totalJobs - completed);
      const eta = progress > 0 ? Math.ceil(remaining / Math.max(1, rate)) : 0;
      const etaText = String(Math.floor(eta / 60)).padStart(2, '0') + ':' + String(eta % 60).padStart(2, '0');

      root.querySelector('.vl-job-stage').textContent = stage;
      root.querySelector('.vl-job-progress').setAttribute('aria-valuenow', String(Math.round(progress)));
      root.querySelector('.vl-job-fill').style.width = `${progress}%`;
      root.querySelector('.vl-job-workers').textContent = `${workers} workers`;
      root.querySelector('.vl-job-rates').textContent = `${rate} jobs/min`;
      root.querySelector('.vl-job-eta').textContent = 'ETA ' + etaText;
      root.querySelector('.vl-job-queued').textContent = String(queued);
      root.querySelector('.vl-job-complete').textContent = String(completed);
      root.querySelector('.vl-job-failed').textContent = String(failures);
      root.querySelector('.vl-job-retry').textContent = String(retries);

      const statusEl = root.querySelector('.vl-job-status');
      const map = { Active: 'is-active', Paused: 'is-paused', Retrying: 'is-paused', Error: 'is-error', Completed: 'is-done' };
      statusEl.textContent = status === 'Retrying' ? 'Retrying' : status;
      statusEl.classList.remove('is-active', 'is-paused', 'is-error', 'is-done');
      statusEl.classList.add(map[status] || 'is-active');

      root.querySelectorAll('.vl-job-step').forEach((step, index) => {
        if (index < stageIndex) {
          step.classList.remove('is-active');
          step.classList.add('is-done');
        } else if (index === stageIndex) {
          step.classList.remove('is-done');
          step.classList.add('is-active');
        } else {
          step.classList.remove('is-active', 'is-done');
        }
      });
    },
    js: `AppLoader.setProgress = function (value, completed, failed) {
  const root = loaderElement.querySelector('.vl-job-queue');
  if (!root) return;
  const safe = Math.max(0, Math.min(100, Number(value) || 0));
  const totalJobs = 1200;
  const complete = Math.max(0, Math.round(Number(completed) || (totalJobs * safe / 100)));
  const fail = Math.max(0, Math.round(Number(failed) || 0));
  const done = Math.max(0, Math.round(totalJobs * (safe / 100)));
  const remaining = Math.max(0, totalJobs - done);
  const rate = Math.max(1, safe > 0 ? safe : 1);
  const eta = safe >= 100 ? 0 : Math.ceil(remaining / rate);
  const etaText = String(Math.floor(eta / 60)).padStart(2, '0') + ':' + String(eta % 60).padStart(2, '0');

  const meter = root.querySelector('.vl-job-progress');
  const fill = root.querySelector('.vl-job-fill');
  const queued = root.querySelector('.vl-job-queued');
  const completeEl = root.querySelector('.vl-job-complete');
  const failedEl = root.querySelector('.vl-job-failed');
  const rateEl = root.querySelector('.vl-job-rates');
  const etaEl = root.querySelector('.vl-job-eta');

  meter && meter.setAttribute('aria-valuenow', String(Math.round(safe)));
  fill && (fill.style.width = safe + '%');
  queued && (queued.textContent = String(Math.max(0, totalJobs - complete)));
  completeEl && (completeEl.textContent = String(complete));
  failedEl && (failedEl.textContent = String(fail));
  rateEl && (rateEl.textContent = Math.round((safe / 100) * 1200 / 1.3) + ' jobs/min');
  etaEl && (etaEl.textContent = 'ETA ' + etaText);
  if (safe === 100) {
    root.querySelectorAll('.vl-job-step').forEach((step, index) => {
      step.classList.add('is-done');
      step.classList.remove('is-active');
    });
  }
};

AppLoader.setStage = function (value) {
  const root = loaderElement.querySelector('.vl-job-queue');
  if (!root) return;
  const stage = root.querySelector('.vl-job-stage');
  const steps = root.querySelectorAll('.vl-job-step');
  const order = ['Distributing', 'Processing', 'Validation', 'Completed'];
  const idx = order.indexOf(value);
  stage && (stage.textContent = value || 'Distributing');
  steps.forEach((step, index) => {
    if (idx === -1) return;
    if (index < idx) {
      step.classList.remove('is-active');
      step.classList.add('is-done');
    } else if (index === idx) {
      step.classList.remove('is-done');
      step.classList.add('is-active');
    } else {
      step.classList.remove('is-active', 'is-done');
    }
  });
};

AppLoader.setStatus = function (value) {
  const root = loaderElement.querySelector('.vl-job-queue');
  if (!root) return;
  const statusEl = root.querySelector('.vl-job-status');
  const map = { Active: 'is-active', Paused: 'is-paused', Retrying: 'is-paused', Error: 'is-error', Completed: 'is-done' };
  const label = value || 'Active';
  statusEl && (statusEl.textContent = label === 'Retrying' ? 'Retrying' : label);
  statusEl && statusEl.classList.remove('is-active', 'is-paused', 'is-error', 'is-done');
  statusEl && statusEl.classList.add(map[label] || 'is-active');
};

AppLoader.setWorkers = function (value) {
  const root = loaderElement.querySelector('.vl-job-queue');
  if (!root) return;
  const workers = Math.max(0, Math.round(Number(value) || 0));
  const workersEl = root.querySelector('.vl-job-workers');
  workersEl && (workersEl.textContent = workers + ' workers');
};

AppLoader.setFailures = function (value) {
  const root = loaderElement.querySelector('.vl-job-queue');
  if (!root) return;
  const failures = Math.max(0, Math.round(Number(value) || 0));
  const failEl = root.querySelector('.vl-job-failed');
  failEl && (failEl.textContent = String(failures));
};`
  },
  {
    id: 'cross-system-data-sync',
    name: 'Cross-system Data Sync',
    category: 'Operations',
    tech: 'CSS + JavaScript',
    description: 'Displays cross-system synchronization stages between ERP, CRM, WMS and data warehouse with drift and conflict counts.',
    markup: `<div class="vl-system-sync" role="region" aria-label="Cross-system data synchronization" data-conflicts="2">
  <div class="vl-system-head">
    <div>
      <strong class="vl-system-title">ERP ↔ CRM ↔ WMS</strong>
      <p class="vl-system-stage">Extracting</p>
    </div>
    <span class="vl-system-status is-active">Active</span>
  </div>
  <div class="vl-system-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="58">
    <span class="vl-system-fill" style="width:58%"></span>
  </div>
  <div class="vl-system-meta">
    <span class="vl-system-records">3,128 / 6,420 records</span>
    <span class="vl-system-rate">42/sec</span>
    <span class="vl-system-eta">ETA 00:40</span>
  </div>
  <div class="vl-system-steps">
    <span class="vl-system-step is-active" data-step="Extracting">Extracting</span>
    <span class="vl-system-step" data-step="Transforming">Transforming</span>
    <span class="vl-system-step" data-step="Reconciling">Reconciling</span>
    <span class="vl-system-step" data-step="Validating">Validating</span>
    <span class="vl-system-step" data-step="Warehouse ready">Warehouse ready</span>
  </div>
  <div class="vl-system-foot">
    <span class="vl-system-conflicts">Conflicts: 2</span>
    <span class="vl-system-latency">p95: 280ms</span>
  </div>
</div>`,
    css: `.vl-system-sync {
  width: min(255px, 84vw);
  display: grid;
  gap: 8px;
  padding: 11px;
  border: 1px solid color-mix(in srgb, var(--loader-accent) 12%, #d4e0f1);
  border-radius: 11px;
  background: #fff;
  color: #172033;
  font-family: system-ui, sans-serif;
  font-size: 11px;
  box-shadow: 0 8px 24px rgba(17, 24, 39, .06);
}
.vl-system-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.vl-system-title {
  display: block;
  max-width: 165px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}
.vl-system-stage {
  margin: 3px 0 0;
  color: #667085;
  font-size: 11px;
}
.vl-system-status {
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: #0f766e;
  background: color-mix(in srgb, var(--loader-accent) 16%, #edfbf8);
}
.vl-system-status.is-paused { color: #9a6d00; background: #fff4d6; }
.vl-system-status.is-error { color: #b42318; background: #ffe2df; }
.vl-system-status.is-done { color: #047857; background: #dcfce7; }
.vl-system-progress {
  position: relative;
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
  background: color-mix(in srgb, var(--loader-accent) 12%, #e9edf6);
}
.vl-system-fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  width: 58%;
  background: linear-gradient(90deg, var(--loader-accent), color-mix(in srgb, var(--loader-accent) 84%, #ffffff));
  transition: width .25s ease;
}
.vl-system-meta,
.vl-system-foot {
  display: flex;
  justify-content: space-between;
  gap: 6px;
  color: #6b7280;
  font-variant-numeric: tabular-nums;
}
.vl-system-steps {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 4px;
}
.vl-system-step {
  border: 1px solid #d8e0ef;
  border-radius: 999px;
  padding: 3px 5px;
  text-align: center;
  background: #fff;
  color: #6b7280;
}
.vl-system-step.is-active {
  border-color: color-mix(in srgb, var(--loader-accent) 42%, #8fb0ff);
  color: var(--loader-accent);
  font-weight: 800;
}
.vl-system-step.is-done {
  border-color: #17a34a;
  color: #16a34a;
  background: #e7f6ea;
}
`,
    controls: [
      { type: 'range', key: 'progress', label: 'Sync progress', min: 0, max: 100, step: 1, defaultValue: 58, suffix: '%', full: true },
      {
        type: 'select',
        key: 'stage',
        label: 'Stage',
        defaultValue: 'Extracting',
        full: true,
        options: [
          { value: 'Extracting', label: 'Extracting' },
          { value: 'Transforming', label: 'Transforming' },
          { value: 'Reconciling', label: 'Reconciling' },
          { value: 'Validating', label: 'Validating' },
          { value: 'Warehouse ready', label: 'Warehouse ready' }
        ]
      },
      {
        type: 'select',
        key: 'status',
        label: 'Status',
        defaultValue: 'Active',
        full: true,
        options: [
          { value: 'Active', label: 'Active' },
          { value: 'Paused', label: 'Paused' },
          { value: 'Retrying', label: 'Retrying' },
          { value: 'Error', label: 'Error' },
          { value: 'Completed', label: 'Completed' }
        ]
      },
      { type: 'range', key: 'records', label: 'Records synced', min: 0, max: 6420, step: 1, defaultValue: 3128, full: true },
      { type: 'range', key: 'rate', label: 'Records per second', min: 1, max: 420, step: 1, defaultValue: 42, suffix: '/s', full: true },
      { type: 'range', key: 'conflicts', label: 'Conflicts', min: 0, max: 80, step: 1, defaultValue: 2, full: true },
      { type: 'range', key: 'latency', label: 'p95 Latency', min: 50, max: 1000, step: 10, defaultValue: 280, suffix: 'ms', full: true }
    ],
    applyControls(container, values) {
      const root = container.querySelector('.vl-system-sync');
      if (!root) return;

      const progress = Math.max(0, Math.min(100, Number(values.progress) || 0));
      const stage = values.stage || 'Extracting';
      const status = values.status || 'Active';
      const syncedRecords = Math.max(0, Math.round(Number(values.records) || 0));
      const totalRecords = 6420;
      const rate = Math.max(1, Math.round(Number(values.rate) || 42));
      const conflicts = Math.max(0, Math.round(Number(values.conflicts) || 0));
      const latency = Math.max(0, Math.round(Number(values.latency) || 0));
      const stageOrder = ['Extracting', 'Transforming', 'Reconciling', 'Validating', 'Warehouse ready'];
      const stageIndex = stageOrder.indexOf(stage);
      const remaining = Math.max(0, totalRecords - syncedRecords);
      const eta = remaining > 0 ? Math.ceil(remaining / Math.max(1, rate)) : 0;
      const etaText = String(Math.floor(eta / 60)).padStart(2, '0') + ':' + String(eta % 60).padStart(2, '0');

      root.querySelector('.vl-system-stage').textContent = stage;
      root.querySelector('.vl-system-progress').setAttribute('aria-valuenow', String(Math.round(progress)));
      root.querySelector('.vl-system-fill').style.width = `${progress}%`;
      root.querySelector('.vl-system-records').textContent = `${syncedRecords.toLocaleString()} / ${totalRecords.toLocaleString()} records`;
      root.querySelector('.vl-system-rate').textContent = `${rate}/s`;
      root.querySelector('.vl-system-eta').textContent = 'ETA ' + etaText;
      root.querySelector('.vl-system-conflicts').textContent = 'Conflicts: ' + conflicts;
      root.querySelector('.vl-system-latency').textContent = 'p95: ' + latency + 'ms';
      root.setAttribute('data-conflicts', String(conflicts));

      const statusEl = root.querySelector('.vl-system-status');
      const map = { Active: 'is-active', Paused: 'is-paused', Retrying: 'is-paused', Error: 'is-error', Completed: 'is-done' };
      statusEl.textContent = status === 'Retrying' ? 'Retrying' : status;
      statusEl.classList.remove('is-active', 'is-paused', 'is-error', 'is-done');
      statusEl.classList.add(map[status] || 'is-active');

      root.querySelectorAll('.vl-system-step').forEach((step, index) => {
        if (index < stageIndex) {
          step.classList.remove('is-active');
          step.classList.add('is-done');
        } else if (index === stageIndex) {
          step.classList.remove('is-done');
          step.classList.add('is-active');
        } else {
          step.classList.remove('is-active', 'is-done');
        }
      });
    },
    js: `AppLoader.setProgress = function (value, totalRecords, syncedRecords) {
  const root = loaderElement.querySelector('.vl-system-sync');
  if (!root) return;
  const safe = Math.max(0, Math.min(100, Number(value) || 0));
  const total = Math.max(1, Math.round(Number(totalRecords) || 6420));
  const synced = Math.max(0, Math.min(total, Math.round(Number(syncedRecords) || Math.round(total * (safe / 100)))));
  const rate = Math.max(1, Math.round(total * (safe / 100)));
  const remaining = Math.max(0, total - synced);
  const eta = safe >= 100 ? 0 : Math.ceil(remaining / rate);
  const etaText = String(Math.floor(eta / 60)).padStart(2, '0') + ':' + String(eta % 60).padStart(2, '0');

  const meter = root.querySelector('.vl-system-progress');
  const fill = root.querySelector('.vl-system-fill');
  const records = root.querySelector('.vl-system-records');
  const rateEl = root.querySelector('.vl-system-rate');
  const etaEl = root.querySelector('.vl-system-eta');

  meter && meter.setAttribute('aria-valuenow', String(Math.round(safe)));
  fill && (fill.style.width = safe + '%');
  records && (records.textContent = synced.toLocaleString() + ' / ' + total.toLocaleString() + ' records');
  rateEl && (rateEl.textContent = (safe > 0 ? rate : 42) + '/s');
  etaEl && (etaEl.textContent = 'ETA ' + etaText);
  if (safe === 100) {
    root.querySelectorAll('.vl-system-step').forEach((step, index) => {
      step.classList.add('is-done');
      step.classList.remove('is-active');
    });
  }
};

AppLoader.setStage = function (value) {
  const root = loaderElement.querySelector('.vl-system-sync');
  if (!root) return;
  const stage = root.querySelector('.vl-system-stage');
  const steps = root.querySelectorAll('.vl-system-step');
  const order = ['Extracting', 'Transforming', 'Reconciling', 'Validating', 'Warehouse ready'];
  const idx = order.indexOf(value);
  stage && (stage.textContent = value || 'Extracting');
  steps.forEach((step, index) => {
    if (idx === -1) return;
    if (index < idx) {
      step.classList.remove('is-active');
      step.classList.add('is-done');
    } else if (index === idx) {
      step.classList.remove('is-done');
      step.classList.add('is-active');
    } else {
      step.classList.remove('is-active', 'is-done');
    }
  });
};

AppLoader.setStatus = function (value) {
  const root = loaderElement.querySelector('.vl-system-sync');
  if (!root) return;
  const statusEl = root.querySelector('.vl-system-status');
  const map = { Active: 'is-active', Paused: 'is-paused', Retrying: 'is-paused', Error: 'is-error', Completed: 'is-done' };
  const label = value || 'Active';
  statusEl && (statusEl.textContent = label === 'Retrying' ? 'Retrying' : label);
  statusEl && statusEl.classList.remove('is-active', 'is-paused', 'is-error', 'is-done');
  statusEl && statusEl.classList.add(map[label] || 'is-active');
};

AppLoader.setConflicts = function (value) {
  const root = loaderElement.querySelector('.vl-system-sync');
  if (!root) return;
  const conflicts = Math.max(0, Math.round(Number(value) || 0));
  const conflictsEl = root.querySelector('.vl-system-conflicts');
  conflictsEl && (conflictsEl.textContent = 'Conflicts: ' + conflicts);
  root && root.setAttribute('data-conflicts', String(conflicts));
};

AppLoader.setLatency = function (value) {
  const root = loaderElement.querySelector('.vl-system-sync');
  if (!root) return;
  const latency = Math.max(0, Math.round(Number(value) || 0));
  const latencyEl = root.querySelector('.vl-system-latency');
  latencyEl && (latencyEl.textContent = 'p95: ' + latency + 'ms');
};`
  },
  {
    id: 'operation-shield-loop',
    name: 'Shield Loop Operations',
    category: 'Operations',
    tech: 'CSS',
    description: 'Operational pulses pass through shield checkpoints and return.',
    markup: `<div class="vl-cat-operation-shield-loop" role="img" aria-label="Shield loop operations">
  <span class="shield"></span>
  <span class="point p1"></span>
  <span class="point p2"></span>
  <span class="point p3"></span>
</div>`,
    css: `.vl-cat-operation-shield-loop {
  width: 108px;
  height: 108px;
  margin: 0 auto;
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--loader-accent) 26%, #1f5b8b);
  position: relative;
  background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--loader-accent) 12%, transparent), transparent 53%), linear-gradient(160deg, #061b2f, #0b2640 66%, #040a13);
}
.vl-cat-operation-shield-loop .shield {
  position: absolute;
  inset: 24px;
  border-radius: 50%;
  border: 2px solid color-mix(in srgb, var(--loader-accent) 50%, transparent);
  border-style: dashed;
  animation: vl-cat-operation-shield-loop-spin calc(var(--loader-speed) * 1.1) linear infinite;
}
.vl-cat-operation-shield-loop .point {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 9px;
  height: 9px;
  margin: -4px;
  border-radius: 50%;
  background: var(--loader-accent);
  animation: vl-cat-operation-shield-loop-beat calc(var(--loader-speed) * 1.1) ease-in-out infinite;
}
 .vl-cat-operation-shield-loop .p1 { --r: 45; animation-delay: 0s; }
 .vl-cat-operation-shield-loop .p2 { --r: 165; animation-delay: -.35s; }
  .vl-cat-operation-shield-loop .p3 { --r: 285; animation-delay: -.7s; }
@keyframes vl-cat-operation-shield-loop-spin {
  to { transform: rotate(360deg); }
}
@keyframes vl-cat-operation-shield-loop-beat {
  0%,100% { opacity: .24; transform: rotate(calc(var(--r) * 1deg)) translateX(42px) scale(.52); }
  50% { opacity: 1; transform: rotate(calc(var(--r) * 1deg)) translateX(42px) scale(1.13); }
}`
  },
  {
    id: 'operation-control-ring',
    name: 'Control Ring Operations',
    category: 'Operations',
    tech: 'CSS',
    description: 'Operational nodes blink around a control ring with phase-shifted check marks.',
    markup: `<div class="vl-cat-operation-control-ring" role="img" aria-label="Control ring operations">
  <span class="ring"></span>
  <span class="node" style="--i:0"></span>
  <span class="node" style="--i:1"></span>
  <span class="node" style="--i:2"></span>
</div>`,
    css: `.vl-cat-operation-control-ring {
  width: 108px;
  height: 108px;
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--loader-accent) 24%, #d8e5f4);
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}
.vl-cat-operation-control-ring .ring {
  position: absolute;
  inset: 12px;
  border: 2px solid color-mix(in srgb, var(--loader-accent) 32%, transparent);
  border-radius: 50%;
  animation: vl-cat-operation-control-ring-spin calc(var(--loader-speed) * 1.12) linear infinite;
}
.vl-cat-operation-control-ring .node {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 9px;
  height: 9px;
  margin: -4px;
  border-radius: 50%;
  background: var(--loader-accent);
  transform: rotate(calc(var(--i) * 120deg)) translateX(45px);
  animation: vl-cat-operation-control-ring-node calc(var(--loader-speed) * 1.15) ease-in-out infinite;
  animation-delay: calc(var(--i) * -0.2s);
}
@keyframes vl-cat-operation-control-ring-spin {
  to { transform: rotate(360deg); }
}
@keyframes vl-cat-operation-control-ring-node {
  0%,100% { opacity: .2; transform: rotate(calc(var(--i) * 120deg)) translateX(45px) scale(.56); }
  50% { opacity: 1; transform: rotate(calc(var(--i) * 120deg)) translateX(45px) scale(1.15); }
}`
  },

];

export const operationLoaders = baseOperationLoaders.map(loader =>
  operationsV2Overrides[loader.id] ? { ...loader, ...operationsV2Overrides[loader.id] } : loader
);
