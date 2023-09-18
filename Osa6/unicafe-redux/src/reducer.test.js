import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented and returned in new state', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok and bad is incremented and returned in new state', () => {
    const action1 = {
      type: 'OK'
    }
    const action2 = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action1)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
    const newerState = counterReducer(newState, action2)
    expect(newerState).toEqual({
      good: 0,
      ok: 1,
      bad: 1
    })
  })

  test('zero sets all the stats to 0', () => {
    const action = {
      type: 'ZERO'
    }
    const state = {
      good: 55,
      ok: 1212,
      bad: 0
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})