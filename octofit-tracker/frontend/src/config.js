// Central config for API base URL
// Use Codespace name if provided, otherwise fall back to environment override or localhost.
export const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : (process.env.REACT_APP_API_BASE || 'http://localhost:8000/api');

console.log('Config loaded. API base URL:', API_BASE);
