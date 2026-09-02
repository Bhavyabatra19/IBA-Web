/**
 * previewSession.js
 * ------------------------------------------------------------------
 * ⚠ THIS IS NOT AUTHENTICATION AND IT IS NOT A SECURITY BOUNDARY.
 *
 * There is no auth backend. This module remembers, in this browser only, that
 * someone walked through the sign-up form, so the signed-in dashboard can be
 * seen and demonstrated. Anyone can reach /library/dashboard directly without
 * it, and nothing here verifies, protects or gates anything.
 *
 * It is deliberately named for what it is. A module called `auth` or `session`
 * with `isLoggedIn()` in it is how a placeholder ends up trusted by the next
 * person to touch the codebase — and how real material ends up filed behind a
 * localStorage boolean.
 *
 * When the real backend lands:
 *   1. Delete this file.
 *   2. Replace usePreview() in the Library pages with the real session hook.
 *   3. Gate the dashboard route on the server, not here.
 * Until then the dashboard shows a banner saying exactly this, and no
 * confidential material may be put behind it.
 */

import { useEffect, useState } from 'react'

const KEY = 'iba:library-preview'
const CHANGED = 'iba:library-preview-change'

/** Read the preview name, or null. Storage can throw — private mode, blocked. */
function read() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/** Begin the preview. `name` is only ever shown back to the same reader. */
export function startPreview(name) {
  const first = String(name || '').trim().split(/\s+/)[0] || 'there'
  try {
    localStorage.setItem(KEY, JSON.stringify({ firstName: first }))
  } catch {
    /* nothing to do — the dashboard falls back to a generic greeting */
  }
  window.dispatchEvent(new Event(CHANGED))
}

export function endPreview() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* already gone as far as this browser is concerned */
  }
  window.dispatchEvent(new Event(CHANGED))
}

/**
 * The preview, as React state.
 *
 * Reads null on the first render and fills in from an effect rather than
 * reading storage in the initialiser — the value has to survive being wrong for
 * one frame either way, and this keeps the module safe to import anywhere.
 */
export function usePreview() {
  const [preview, setPreview] = useState(null)
  useEffect(() => {
    const sync = () => setPreview(read())
    sync()
    window.addEventListener(CHANGED, sync)
    /* another tab signing in or out */
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CHANGED, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])
  return preview
}
