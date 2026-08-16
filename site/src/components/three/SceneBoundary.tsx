import { Component, type ReactNode } from 'react'

/**
 * Catches any failure while mounting the 3D universe (lazy-chunk load
 * error, WebGL context failure, scene crash) and renders nothing —
 * the hero video atmosphere layer and static content remain intact.
 */
export default class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}