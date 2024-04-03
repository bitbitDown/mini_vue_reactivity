class ReactiveEffect {
  private _fn: Function
  private _isStop: boolean
  constructor(fn: Function) {
    this._fn = fn
    this._isStop = false
  }
  run() {
    activeEffect = this
    this._fn()
  }
  stop() {
    // 清除依赖
    this._isStop = true
  }
}

const targetMap = new Map()
export function stop(effect) {
  effect.stop()
}
// 收集依赖
export function track(target: object, key: string) {
  // target->key->dep
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect)
}

// 触发依赖
export function trigger(target: object, key: string) {
  const depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  for (const effect of dep) {
    if (!effect._isStop) {
      effect.run()
    }
  }
}

let activeEffect
export function effect(fn: Function) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
  return _effect
}