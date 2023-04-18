import React, { Dispatch, ReactNode, SetStateAction, useCallback, useMemo, useState } from "react";


export const useFormData = <TData = any>(props: Props<TData>): UseFormData<TData> => {
    const [formData, setFormData] = useState<TData>(props.formData || {} as TData)

    const handleInputChange = (key: string, value: any) => {
        setFormData((v) => ({ ...v, [key]: value }))
    }

    const getTextFieldProps = useCallback((name: string): FieldProps => {
        return {
            name,
            value: (formData as any)?.[name] || '',
            required: props.required?.includes(name),
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, checked?: boolean) => {
                if (checked !== undefined) {
                    return handleInputChange(name, checked)
                }
                handleInputChange(name, e.target.type === "number" ? Number(e.target.value) : e.target.value)
            }
        }

    }, [formData])

    return {
        formData,
        setFormData,
        handleInputChange,
        getTextFieldProps
    }
}

const requiredErrorMessage = 'Generic.FormData.RequiredField.label'

type Props<TData = any> = {
    id?: string

    formData: TData,
    /**
     * Array that contain all required fields
     */
    required?: Array<string>
}

export type UseFormData<TData> = {
    formData: TData
    setFormData: Dispatch<SetStateAction<TData>>
    /** Callback that will set form hooks global value */
    handleInputChange: (key: string, value: any) => void

    getTextFieldProps: (name: string) => FieldProps

}

type FieldProps = {
    name: string
    value: any
    error?: boolean
    required?: boolean
    helperText?: string | React.ReactNode,
    onChange?: ((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, checked?: boolean) => void)
        | ((e: React.ChangeEvent<HTMLInputElement>, value?: string) => void)
        | ((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void)
}

type ErrorType = Record<string, string | ReactNode>
