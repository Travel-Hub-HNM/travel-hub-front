import { isEqual, isFunction, isNil } from 'lodash'
import React from 'react'

import { IUseFormProps } from '@/shared/hooks/useForm/type'
import { useFormStore } from '@/shared/model/store/formStore'

function useForm<T>({ key, defaultValues, validate, onSubmit }: IUseFormProps<T>) {
    const form = useFormStore((s) => s.form[key] as T)
    const initForm = useFormStore((s) => s.initForm)
    const setForm = useFormStore((s) => s.setForm)
    // const setFormData = useFormStore((s) => s.setFormData)
    // const setFormError = useFormStore((s) => s.setFormError)
    const resetForm = useFormStore((s) => s.resetForm)
    const removeForm = useFormStore((s) => s.removeForm)

    React.useEffect(() => {
        if (!form && defaultValues) {
            initForm(key, defaultValues)
        }
    }, [key, defaultValues, form, initForm])

    const handleChange = React.useCallback(
        (arg1: keyof T | ((prev: T) => T) | Partial<T>, arg2?: any) => {
            if (typeof arg1 === 'function') {
                // 함수형 업데이트
                setForm(key, (prev) => ({
                    ...prev,
                    data: arg1(prev.data as T),
                }))
            } else if (typeof arg1 === 'string') {
                // 단일 필드 업데이트
                setForm(key, (prev) => ({
                    ...prev,
                    data: {
                        ...prev.data,
                        [arg1]: arg2,
                    },
                }))
            } else if (typeof arg1 === 'object' && arg1 !== null) {
                // 객체 병합 업데이트
                setForm(key, (prev) => ({
                    ...prev,
                    data: {
                        ...(prev.data || {}),
                        ...arg1,
                    },
                }))
            }
        },
        [key, setForm],
    )

    const handleSubmit = React.useCallback(
        async (e: any) => {
            e.preventDefault()
            const params = await validate(form.data)
            if (!isNil(params)) onSubmit(params)
        },
        [validate, onSubmit, form],
    )

    const handleReset = React.useCallback(
        (state: T = defaultValues) => {
            if (!isNil(state)) setForm(key, { data: state, error: null })
            else resetForm(key)
        },
        [defaultValues],
    )

    const handleError = React.useCallback((state: validateErrorResponse<V>) => {
        setForm(key, (prev) => ({
            ...prev,
            error: isFunction(state) ? state(prev?.error) : state,
        }))
    }, [])

    // React.useEffect(() => {
    //     handleError(null)
    // }, [])

    return { data: form?.data, error: form?.error, handleError, handleChange, handleReset, handleSubmit }
}

export default useForm
