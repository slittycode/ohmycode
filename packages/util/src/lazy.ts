export function lazy<T>(fn: () => T) {
  let value: T | undefined
  let loaded = false

  return (): T => {
    if (!loaded) {
      loaded = true
      value = fn()
    }
    return value as T
  }
}
