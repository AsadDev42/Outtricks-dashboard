/**
 * Formats any company name into its dynamic Workspace display title.
 * For example:
 * - "Redlumb" -> "Redlumb's Workspace"
 * - "CloudScale AI" -> "CloudScale AI's Workspace"
 * - "Redlumb's Workspace" -> "Redlumb's Workspace" (avoids duplication)
 * - "" / null / undefined -> "Workspace"
 */
export function formatWorkspaceName(companyName?: string | null): string {
  if (!companyName || !companyName.trim()) {
    return 'Workspace';
  }
  const clean = companyName.trim();
  const lower = clean.toLowerCase();
  
  if (lower.endsWith("'s workspace")) {
    return clean;
  }
  if (lower.endsWith(" workspace")) {
    const base = clean.slice(0, -10).trim();
    return `${base}'s Workspace`;
  }
  return `${clean}'s Workspace`;
}
