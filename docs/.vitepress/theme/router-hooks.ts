type RouterHook = (to: string) => unknown
type RouterHookName =
  | 'onBeforeRouteChange'
  | 'onBeforePageLoad'
  | 'onAfterPageLoad'
  | 'onAfterRouteChange'

type RouterWithHooks = Partial<Record<RouterHookName, RouterHook>>
type RestoreHook = () => void

export function wrapRouterHook(
  router: RouterWithHooks,
  hookName: RouterHookName,
  createHook: (previous: RouterHook | undefined) => RouterHook,
) {
  const previous = router[hookName]
  const wrapped = createHook(previous)
  router[hookName] = wrapped

  return () => {
    if (router[hookName] === wrapped) {
      router[hookName] = previous
    }
  }
}

export function combineHookRestorers(restorers: RestoreHook[]) {
  let restored = false

  return () => {
    if (restored) return
    restored = true

    for (let index = restorers.length - 1; index >= 0; index--) {
      restorers[index]()
    }
  }
}
