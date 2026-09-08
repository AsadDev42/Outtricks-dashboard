/**
 * No AI Slop Utility Module
 * Direct implementation of No AI Slop skill (SKILL.md & eval.md)
 * Ref: github.com/petergyang/no-ai-slop
 * 
 * Rules:
 * - Natural, specific, concise, human, and context-aware.
 * - Zero tolerance for banned words, throat-clearing openers, binary contrasts,
 *   faux-insight setups, colon reveals, importance puffery, and empty phrases.
 * - Preserves intentional brand terms (TRIXIE AI, CRM, Master Inbox, Workspace, Lead Finder).
 */

export interface SlopIssue {
  rule: string;
  quote: string;
  fix: string;
}

export interface SlopEvaluation {
  passes: boolean;
  score: number; // 0 to 100
  issues: SlopIssue[];
}

/**
 * Banned words list from SKILL.md
 */
export const BANNED_WORDS: { word: string; replacement: string }[] = [
  { word: 'delve', replacement: 'explore' },
  { word: 'delves', replacement: 'explores' },
  { word: 'delving', replacement: 'exploring' },
  { word: 'foster', replacement: 'build' },
  { word: 'fosters', replacement: 'builds' },
  { word: 'fostering', replacement: 'building' },
  { word: 'leverage', replacement: 'use' },
  { word: 'leveraging', replacement: 'using' },
  { word: 'utilize', replacement: 'use' },
  { word: 'utilizing', replacement: 'using' },
  { word: 'facilitate', replacement: 'help' },
  { word: 'facilitates', replacement: 'helps' },
  { word: 'facilitating', replacement: 'helping' },
  { word: 'empower', replacement: 'enable' },
  { word: 'empowers', replacement: 'helps' },
  { word: 'empowering', replacement: 'enabling' },
  { word: 'streamline', replacement: 'simplify' },
  { word: 'streamlines', replacement: 'speeds up' },
  { word: 'streamlining', replacement: 'simplifying' },
  { word: 'robust', replacement: 'reliable' },
  { word: 'cutting-edge', replacement: 'modern' },
  { word: 'cutting edge', replacement: 'modern' },
  { word: 'paradigm shift', replacement: 'major change' },
  { word: 'game changer', replacement: 'practical upgrade' },
  { word: 'game-changer', replacement: 'practical upgrade' },
  { word: 'this is huge', replacement: 'this matters' },
  { word: 'this changes everything', replacement: 'this improves the workflow' },
  { word: 'tapestry', replacement: 'mix' },
  { word: 'realm', replacement: 'area' },
  { word: 'beacon', replacement: 'guide' },
  { word: 'multifaceted', replacement: 'varied' },
  { word: 'meticulous', replacement: 'thorough' },
  { word: 'intricate', replacement: 'detailed' },
  { word: 'paramount', replacement: 'critical' },
  { word: 'transformative', replacement: 'high-impact' },
  { word: 'elevate', replacement: 'improve' },
  { word: 'elevates', replacement: 'improves' },
  { word: 'elevating', replacement: 'improving' },
  { word: 'embark', replacement: 'start' },
  { word: 'supercharge', replacement: 'accelerate' },
  { word: 'supercharges', replacement: 'speeds up' },
  { word: 'supercharging', replacement: 'accelerating' },
  { word: 'harness', replacement: 'use' },
  { word: 'harnessing', replacement: 'using' },
  { word: 'ever-evolving', replacement: 'changing' },
];

/**
 * Often-empty phrases from SKILL.md
 */
export const EMPTY_PHRASES: { phrase: string; replacement: string }[] = [
  { phrase: "it's worth noting that", replacement: "" },
  { phrase: "it is worth noting that", replacement: "" },
  { phrase: "it's worth noting,", replacement: "" },
  { phrase: "it is worth noting,", replacement: "" },
  { phrase: "it's important to note that", replacement: "" },
  { phrase: "it is important to note that", replacement: "" },
  { phrase: "at the end of the day,", replacement: "" },
  { phrase: "at the end of the day", replacement: "ultimately" },
  { phrase: "when it comes to", replacement: "for" },
  { phrase: "at its core,", replacement: "" },
  { phrase: "at its core", replacement: "fundamentally" },
  { phrase: "in today's world,", replacement: "today," },
  { phrase: "in today's world", replacement: "today" },
  { phrase: "in the age of AI,", replacement: "with AI," },
  { phrase: "in the age of", replacement: "in" },
  { phrase: "in the world of", replacement: "in" },
  { phrase: "the reality is that", replacement: "" },
  { phrase: "the reality is,", replacement: "" },
  { phrase: "the truth is that", replacement: "" },
  { phrase: "the truth is,", replacement: "" },
  { phrase: "in terms of", replacement: "regarding" },
  { phrase: "with regard to", replacement: "regarding" },
  { phrase: "in order to", replacement: "to" },
  { phrase: "going forward,", replacement: "next," },
  { phrase: "let's dive in", replacement: "let's begin" },
];

/**
 * Throat-clearing openers from SKILL.md
 */
export const THROAT_CLEARING_OPENERS: string[] = [
  "here's the thing:",
  "here's the thing,",
  "here's the thing",
  "here's what i mean:",
  "here's what i mean,",
  "let me be clear:",
  "let me be clear,",
  "i'll be honest:",
  "i'll be honest,",
  "to be completely honest,",
  "the uncomfortable truth is:",
  "the uncomfortable truth is,",
  "what nobody tells you:",
  "what nobody tells you is",
  "what most people get wrong:",
  "the part everyone misses:",
  "this is the part most people skip:",
];

/**
 * Importance puffery and weasel attribution
 */
export const PUFFERY_PHRASES: string[] = [
  "stands as a testament",
  "marks a pivotal moment",
  "plays a vital role",
  "solidifies its position",
  "underscores its significance",
  "experts agree",
  "industry reports suggest",
  "widely regarded as",
  "studies show that",
];

/**
 * System prompt guidelines to append to AI generative calls
 */
export const NO_AI_SLOP_PROMPT_GUIDELINES = `
[WRITING QUALITY & NO-AI-SLOP RULES]
1. Natural, human, and direct: State the point directly. Do not warm up with throat-clearing ("Here's the thing", "Let me be clear", "It's worth noting").
2. No hype or buzzwords: NEVER use delve, foster, leverage, utilize, facilitate, empower, streamline, robust, cutting-edge, paradigm shift, game changer, this is huge, tapestry, realm, beacon, multifaceted, meticulous, intricate, paramount, transformative, elevate, embark, supercharge, harness, ever-evolving.
3. No binary contrasts: Avoid "This is not X. It's Y." State Y directly.
4. No faux-insight or colon reveals: Avoid "The best part: it works" or "What nobody tells you". Write plain, concrete sentences.
5. Concrete and specific: Use clear numbers, names, and concrete outcomes instead of abstract generalities.
6. Active voice: Keep sentences clean and human. Avoid trailing -ing clauses like "highlighting the importance of".
7. No mic-drop kickers or generic summary endings ("In conclusion", "Ultimately"). End on a clear, concrete takeaway or next action.
8. Preserve brand terminology: Keep TRIXIE AI, CRM, Master Inbox, Workspace, Lead Finder, and related product features intact.
`.trim();

/**
 * Evaluate any string against the No AI Slop ruleset
 */
export function evaluateAiSlop(text: string): SlopEvaluation {
  if (!text || !text.trim()) {
    return { passes: true, score: 100, issues: [] };
  }

  const issues: SlopIssue[] = [];
  const lower = text.toLowerCase();

  // 1. Check banned words
  for (const item of BANNED_WORDS) {
    const regex = new RegExp(`\\b${item.word.replace('-', '\\-')}\\b`, 'gi');
    const match = text.match(regex);
    if (match) {
      issues.push({
        rule: 'Banned Word',
        quote: match[0],
        fix: `Replace "${match[0]}" with "${item.replacement}" or state the action directly.`
      });
    }
  }

  // 2. Check empty phrases
  for (const item of EMPTY_PHRASES) {
    const regex = new RegExp(`\\b${item.phrase.replace("'", "['’]")}\\b`, 'gi');
    const match = text.match(regex);
    if (match) {
      issues.push({
        rule: 'Often-Empty Phrase',
        quote: match[0],
        fix: item.replacement ? `Replace with "${item.replacement}".` : `Cut "${match[0]}" and state the point directly.`
      });
    }
  }

  // 3. Check throat-clearing openers
  for (const opener of THROAT_CLEARING_OPENERS) {
    if (lower.includes(opener)) {
      issues.push({
        rule: 'Throat-Clearing Opener / Faux-Insight Setup',
        quote: opener,
        fix: 'Cut opener and lead directly with the claim or finding.'
      });
    }
  }

  // 4. Check puffery and weasel attribution
  for (const puff of PUFFERY_PHRASES) {
    if (lower.includes(puff)) {
      issues.push({
        rule: 'Importance Puffery / Weasel Attribution',
        quote: puff,
        fix: 'State the concrete fact or metric instead of puffery.'
      });
    }
  }

  // 5. Check binary contrasts ("It's not X. It's Y." / "This isn't X, it's Y.")
  const binaryContrastMatch = text.match(/\b(it['’]?s not|this is not|the question isn['’]?t)\s+[^.?!,]+[,.]\s+(it['’]?s|it is)\b/i);
  if (binaryContrastMatch) {
    issues.push({
      rule: 'Binary Contrast',
      quote: binaryContrastMatch[0],
      fix: 'Cut the negative setup and state the positive claim directly.'
    });
  }

  // 6. Check colon reveals ("The best part: ...", "The secret: ...")
  const colonRevealMatch = text.match(/\b(the best part|the secret|the catch|the reality|the truth|the real trick):/i);
  if (colonRevealMatch) {
    issues.push({
      rule: 'Colon Reveal',
      quote: colonRevealMatch[0],
      fix: 'Rewrite as a plain sentence without dramatic colon reveal.'
    });
  }

  // 7. Check summary recap endings ("In conclusion", "Ultimately," as last sentence)
  const recapMatch = text.match(/\b(in conclusion|to sum up|all in all)[,:]/i);
  if (recapMatch) {
    issues.push({
      rule: 'Summary-Recap Ending',
      quote: recapMatch[0],
      fix: 'End on the last concrete point or next action instead of restating.'
    });
  }

  // Calculate score
  const penalty = issues.length * 15;
  const score = Math.max(0, Math.min(100, 100 - penalty));

  return {
    passes: issues.length === 0,
    score,
    issues
  };
}

/**
 * Clean AI slop from any draft, rewriting banned words and cutting filler
 */
export function cleanAiSlop(text: string): string {
  if (!text) return text;

  let cleaned = text;

  // 1. Remove throat clearing openers
  for (const opener of THROAT_CLEARING_OPENERS) {
    const regex = new RegExp(`^\\s*${opener}[\\s,:]*`, 'gim');
    cleaned = cleaned.replace(regex, '');
  }

  // 2. Replace empty phrases
  for (const item of EMPTY_PHRASES) {
    const regex = new RegExp(`\\b${item.phrase.replace("'", "['’]")}\\b\\s*`, 'gi');
    cleaned = cleaned.replace(regex, item.replacement ? `${item.replacement} ` : '');
  }

  // 3. Replace banned words with natural human alternatives
  for (const item of BANNED_WORDS) {
    const regex = new RegExp(`\\b${item.word.replace('-', '\\-')}\\b`, 'gi');
    cleaned = cleaned.replace(regex, (matched) => {
      // Preserve uppercase first letter if present
      if (matched[0] === matched[0].toUpperCase()) {
        return item.replacement.charAt(0).toUpperCase() + item.replacement.slice(1);
      }
      return item.replacement;
    });
  }

  // 4. Clean colon reveals: "The best part: X" -> "X"
  cleaned = cleaned.replace(/\b(the best part|the secret|the catch|the real trick):\s*/gi, '');

  // 5. Clean summary recap openers: "In conclusion," -> ""
  cleaned = cleaned.replace(/\b(in conclusion|to sum up|all in all)[,:]\s*/gi, '');

  // 6. Clean binary contrast patterns
  cleaned = cleaned.replace(/\b(?:it['’]?s|this is) not (?:just )?about ([^,.]+)[,.] (?:it['’]?s|it is) about ([^.]+)\./gi, 'Focus on $2.');
  cleaned = cleaned.replace(/\b(?:it['’]?s|this is) not (?:just )?(?:a |an )?([^,.]+)[,.] (?:it['’]?s|it is) (?:a |an )?([^.]+)\./gi, '$2.');

  // 7. Clean puffery phrases
  cleaned = cleaned.replace(/\bsolidifies its position as\b/gi, 'acts as');
  cleaned = cleaned.replace(/\bstands as a testament\b/gi, 'shows');
  cleaned = cleaned.replace(/\bmarks a pivotal moment\b/gi, 'is a milestone');

  // 8. Normalize whitespace and trailing punctuation
  cleaned = cleaned.replace(/[ \t]{2,}/g, ' ');
  cleaned = cleaned.replace(/^[ \t]+/gm, '');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();

  return cleaned;
}
