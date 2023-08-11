import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Button } from './Button'

test('should render children component', () => {
  const TESTID = 'children'
  const CHILDREN = <div data-testid={TESTID}>click on me</div>
  render(<Button>{CHILDREN}</Button>)

  expect(screen.getByTestId(TESTID)).toBeDefined()
})
