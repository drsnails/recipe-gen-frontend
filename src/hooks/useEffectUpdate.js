import { useEffect, useRef } from "react"

export const useEffectUpdate = (cb, dependencies) => {
    const isFirstTime = useRef(true)

    useEffect(() => {
        if (isFirstTime.current) {
            isFirstTime.current = false
            return
        }
        return cb()
    }, dependencies)
}