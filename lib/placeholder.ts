import type { Category } from './data'

export function getPlaceholderImage(category: Category, productName: string): string {
  const initial = productName.charAt(0).toUpperCase()
  const color = category.color
  const lightColor = 'rgba(255,255,255,0.15)'

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="${color}"/>
  <rect width="400" height="400" fill="url(#grad)" opacity="0.4"/>
  <defs>
    <radialGradient id="grad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.2)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.4)"/>
    </radialGradient>
  </defs>
  <circle cx="200" cy="185" r="90" fill="${lightColor}"/>
  <text x="200" y="215" font-family="Arial, sans-serif" font-size="100" font-weight="700"
    fill="rgba(255,255,255,0.9)" text-anchor="middle" dominant-baseline="middle"
    letter-spacing="-2">${initial}</text>
  <text x="200" y="320" font-family="Arial, sans-serif" font-size="14" font-weight="500"
    fill="rgba(255,255,255,0.5)" text-anchor="middle">POCKIT SURVIVAL</text>
</svg>`

  return `data:image/svg+xml;base64,${btoa(svg)}`
}
