// sum.test.js
import { expect, test } from 'vitest'
import { reactive } from '../reactive'
import { effect, stop } from '../effect'
test('adds 1 + 2 to equal 3', () => {
  const bitbitDown = reactive({
    name: 'bitbitDown',
    age: 24,
  })
  let nextAge
  effect(() => {
    nextAge = bitbitDown.age + 1
  })
  expect(nextAge).toBe(25)
  bitbitDown.age++
  expect(nextAge).toBe(26)

  const arr = reactive([1, 2, 3])
  let num
  const runner = effect(() => {
    num = arr[0] + 1
  })
  arr[0] += 2
  expect(num).toBe(4)
  stop(runner)
  arr[0] += 1
  expect(num).toBe(4)
})