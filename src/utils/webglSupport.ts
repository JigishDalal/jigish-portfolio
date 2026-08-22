let cachedSupport: boolean | null = null;

/**
 * Singleton WebGL feature detection helper.
 * Caches the result in memory so browsers (like Firefox) only execute
 * a single context check instead of logging repeated console warnings.
 */
export function isWebGLSupported(): boolean {
  if (cachedSupport !== null) {
    return cachedSupport;
  }

  if (typeof window === 'undefined') {
    cachedSupport = false;
    return false;
  }

  if (!window.WebGLRenderingContext) {
    cachedSupport = false;
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    cachedSupport = !!gl;
    
    // Clean up WebGL context extension resources if created
    if (gl && 'getExtension' in gl) {
      const loseContext = gl.getExtension('WEBGL_lose_context');
      if (loseContext) {
        loseContext.loseContext();
      }
    }
  } catch (e) {
    cachedSupport = false;
  }

  return cachedSupport;
}
