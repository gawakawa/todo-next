import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Page from '../src/app/page'

describe('Page', () => {
  it('renders without crashing', () => {
    const { container } = render(<Page />)
    expect(container).toBeTruthy()
  })

  it('renders Hello Next.js text', () => {
    const { getByText } = render(<Page />)
    expect(getByText('Hello Next.js')).toBeTruthy()
  })
})