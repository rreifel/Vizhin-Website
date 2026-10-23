/**
 * VizhinORG Routing Configuration & 1-Click Rollback Toggle
 * 
 * Set `USE_STANDALONE_VIZHIN_ORG = false` to instantly revert back to hosting
 * the embedded VizhinORG split screen, 100-employee org chart, and local
 * authentication inside this Vizhin Portal application.
 */

// Toggle: set to false to immediately restore local embedded VizhinORG
export const DEFAULT_USE_STANDALONE = true;

export const USE_STANDALONE_VIZHIN_ORG: boolean = 
  typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_USE_STANDALONE_ORG !== undefined
    ? import.meta.env.VITE_USE_STANDALONE_ORG !== 'false'
    : DEFAULT_USE_STANDALONE;

/**
 * Returns the base URL for the standalone VizhinORG project.
 * - In production (vizhin.co), points to the deployed /org/ directory: https://vizhin.co/org/
 * - In development / preview, defaults to the active deployment:
 *   https://ais-dev-w5xozbr56c6ysf2jdmwe3f-615362750641.us-west2.run.app
 */
export function getBaseVizhinOrgUrl(): string {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_VIZHIN_ORG_URL) {
    return import.meta.env.VITE_VIZHIN_ORG_URL;
  }
  if (typeof window !== 'undefined') {
    const host = window.location.hostname.toLowerCase();
    if (host === 'vizhin.co' || host === 'www.vizhin.co') {
      return 'https://vizhin.co/org/';
    }
  }
  return 'https://ais-dev-w5xozbr56c6ysf2jdmwe3f-615362750641.us-west2.run.app';
}

export const STANDALONE_VIZHIN_ORG_URL: string = getBaseVizhinOrgUrl();
export const VIZHIN_HOMEPAGE_URL = 'https://vizhin.co';

/**
 * Builds the destination URL for the standalone VizhinORG project.
 */
export function getVizhinOrgUrl(subPath: string = '/org/'): string {
  let base = getBaseVizhinOrgUrl().trim().replace(/\/+$/, '');
  
  // Deduplicate if base URL already includes /org
  base = base.replace(/\/org$/i, '');
  
  let path = subPath ? (subPath.startsWith('/') ? subPath : `/${subPath}`) : '';
  if (!path || path === '/' || path.toLowerCase() === '/org' || path.toLowerCase() === '/org/') {
    return `${base}/org/`;
  }
  
  return `${base}${path}`;
}

export const STANDALONE_VIZHIN_ORG_SIGNIN_URL: string = getVizhinOrgUrl('/org/');

/**
 * Executes a seamless redirect to the standalone VizhinORG app.
 */
export function redirectToVizhinOrg(subPath?: string): void {
  if (typeof window !== 'undefined') {
    const targetUrl = getVizhinOrgUrl(subPath || '/org/');
    window.location.assign(targetUrl);
  }
}
