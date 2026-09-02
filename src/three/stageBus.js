/**
 * stageBus.js
 * ------------------------------------------------------------------
 * The handoff between the sections that own timelines and the single canvas
 * that draws them.
 *
 * Deliberately a plain mutable object rather than React state or a context:
 * this is read once per animation frame, and routing per-frame values through
 * a reducer would re-render the tree sixty times a second to move a camera.
 * React owns the DOM here; this owns the frame.
 */

export const stageBus = {
  /** the rig object the active section's timeline is writing to */
  rig: null,
  /** whether a section that wants the canvas is currently on screen */
  live: false,
  /** which section is holding it — for debugging and for the hero rail */
  owner: null,
  /** bumped whenever something changed that needs a redraw in on-demand mode */
  revision: 0,
}

export function claimStage(owner, rig) {
  stageBus.owner = owner
  stageBus.rig = rig
  stageBus.live = true
  stageBus.revision++
}

export function releaseStage(owner) {
  if (stageBus.owner !== owner) return
  stageBus.live = false
  stageBus.revision++
}

export function markDirty() {
  stageBus.revision++
}
