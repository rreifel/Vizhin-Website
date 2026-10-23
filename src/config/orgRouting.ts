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
 * Returns the base URL for the standalone Remix VizhinORG project.
 * - In production (vizhin.co), defaults to https://vizhin.co/ORG
 * - In development / preview, defaults to the active Cloud Run deployment:
 *   https://ais-dev-w5xozbr56c6ysf2jdmwe3f-615362750641.us-west2.run.app
 */
export function getBaseVizhinOrgUrl(): string {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_VIZHIN_ORG_URL) {
    return import.meta.env.VITE_VIZHIN_ORG_URL;
  }
  if (typeof window !== 'undefined') {
    const host = window.location.hostname.toLowerCase();
    if (host === 'vizhin.co' || host === 'www.vizhin.co') {
      return 'https://vizhin.co/ORG';
    }
  }
  return 'https://ais-dev-w5xozbr56c6ysf2jdmwe3f-615362750641.us-west2.run.app';
}

export const STANDALONE_VIZHIN_ORG_URL: string = getBaseVizhinOrgUrl();

export const VIZHIN_HOMEPAGE_URL = 'https://vizhin.co';

/**
 * Builds the destination URL for the standalone Remix VizhinORG project,
 * preventing duplicate /ORG path segments (e.g. avoiding /ORG/ORG).
 */
export function getVizhinOrgUrl(subPath: string = '/ORG'): string {
  let base = getBaseVizhinOrgUrl().trim().replace(/\/+$/, '');
  
  // Deduplicate: If base URL already ends with /ORG, remove it before appending subpaths
  base = base.replace(/\/ORG$/i, '');

  let path = subPath ? (subPath.startsWith('/') ? subPath : `/${subPath}`) : '';
  
  // Normalize path if pointing to /ORG or /ORGdemo
  if (path.toLowerCase() === '/org') {
    path = '/ORG';
  } else if (path.toLowerCase() === '/orgdemo') {
    path = '/ORGdemo';
  }

  return `${base}${path}`;
}

export const STANDALONE_VIZHIN_ORG_SIGNIN_URL: string = getVizhinOrgUrl('/ORG');

/**
 * Executes a seamless same-window redirect to the standalone VizhinORG app.
 */
export function redirectToVizhinOrg(subPath?: string): void {
  if (typeof window !== 'undefined') {
    const targetUrl = getVizhinOrgUrl(subPath);
    window.location.assign(targetUrl);
  }
}
