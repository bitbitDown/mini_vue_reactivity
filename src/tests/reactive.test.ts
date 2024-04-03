import { reactive } from "../reactive";
import { expect, test } from 'vitest'

test('reactive', () => {
  const original = {
    foo: 1,
    bar: {
      nested: 'hello'
    }
  }

  const observed = reactive(original)
  
  expect(observed).not.toBe(original)
})
