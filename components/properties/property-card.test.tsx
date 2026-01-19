import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PropertyCard from './property-card'

vi.mock('@/lib/context/authContext', () => ({
  useAuth: () => ({
    token: 'fake-token',
  }),
}))

vi.mock('@/lib/api/api', () => ({
  addToFavorite: vi.fn(),
  removeFromFavorite: vi.fn(),
}))

vi.mock('next/image', () => ({
  default: (props) => <img {...props} />,
}))

vi.mock('next/link', () => ({
  default: ({ children }) => <>{children}</>,
}))

describe('PropertyCard - favoris', () => {
  it('déclenche le toggle des favoris au clic', async () => {
    const onToggleFavorite = vi.fn()

    render(
      <PropertyCard
        id="1"
        cover="/img.jpg"
        title="Appartement test"
        location="Paris"
        price_per_night={100}
        slug="appartement-test"
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
      />
    )

    const button = screen.getByRole('button', { name: /favori/i })
    await userEvent.click(button)

    expect(onToggleFavorite).toHaveBeenCalledOnce()
    expect(onToggleFavorite).toHaveBeenCalledWith('1', false)
  })
})
