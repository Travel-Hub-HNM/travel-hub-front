export type IUseFormProps<T> = {
    key: string
    defaultValues?: T
    validate?: (data: T) => Promise<any>
    onSubmit?: (data: T) => void
}
