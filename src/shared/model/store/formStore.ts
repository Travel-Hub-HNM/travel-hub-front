import { isFunction } from 'lodash'
import { create } from 'zustand'

type FormData = Record<string, any>
type FormError = Record<string, any>

type IFormStore = {
    form: Record<string, { data: FormData; error: FormError | null }>
    defaultForm: Record<string, FormData>

    initForm: (key: string, defaultValues: FormData) => void
    setForm: (key: string, updater: Partial<FormData> | ((prev: FormData) => Partial<FormData>)) => void
    // setFormError: (key: string, updater: (prev: FormError) => FormError) => void
    resetForm: (key: string) => void
    removeForm: (key: string) => void
}

export const useFormStore = create<IFormStore>((set, get) => ({
    form: {},
    defaultForm: {},

    initForm: (key, defaultValues) => {
        if (get().form[key]) return // 이미 초기화된 경우 무시
        set((state) => ({
            form: {
                ...state.form,
                [key]: {
                    data: defaultValues,
                    error: {},
                },
            },
            defaultForm: {
                ...state.defaultForm,
                [key]: defaultValues,
            },
        }))
    },
    setForm: (key, updater) =>
        set((state) => {
            const prev = state.form[key] ?? { data: {}, error: {} }
            const next = isFunction(updater) ? updater(prev) : { ...prev, ...updater }
            return {
                form: {
                    ...state.form,
                    [key]: next,
                },
            }
        }),
    // setFormData: (key, updater) =>
    //     set((state) => ({
    //         form: {
    //             ...state.form,
    //             [key]: {
    //                 ...state.form[key],
    //                 data: updater(state.form[key]?.data || {}),
    //             },
    //         },
    //     })),
    //
    // setFormError: (key, updater) =>
    //     set((state) => ({
    //         form: {
    //             ...state.form,
    //             [key]: {
    //                 ...state.form[key],
    //                 error: updater(state.form[key]?.error || {}),
    //             },
    //         },
    //     })),
    resetForm: (key) =>
        set((state) => ({
            form: {
                ...state.form,
                [key]: {
                    data: state.defaultForm[key] ?? {},
                    error: {},
                },
            },
        })),
    getForms: (id) => get().form[id],
    removeForm: (key) =>
        set((state) => {
            const newForm = { ...state.form }
            const newDefault = { ...state.defaultForm }
            delete newForm[key]
            delete newDefault[key]
            return {
                form: newForm,
                defaultForm: newDefault,
            }
        }),
}))
