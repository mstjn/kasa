import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import MobileCarousel from './mobile-carousel'

// Mock next/image (OBLIGATOIRE en test)
vi.mock('next/image', () => ({
  default: (props) => <img {...props} />,
}))

describe('MobileCarousel', () => {
  it('affiche une seule image quand une seule image est fournie', () => {
    render(<MobileCarousel images={['/img1.jpg']} />)

    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(1)
    expect(images[0].getAttribute('src')).toBe('/img1.jpg')

  })

  it('affiche un indicateur par image', () => {
    render(
      <MobileCarousel
        images={['/img1.jpg', '/img2.jpg', '/img3.jpg']}
      />
    )

    const indicators = document.querySelectorAll('span.h-2.w-2')
    expect(indicators.length).toBe(3)
  })
})
