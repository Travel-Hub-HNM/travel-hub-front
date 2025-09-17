'use client'

import { Editor } from '@toast-ui/react-editor'
import { isEmpty } from 'lodash'
import React from 'react'
import { DateRange } from 'react-day-picker'

import { useImageUploadQuery } from '@/shared/api/endpoints/image'
import { useForm } from '@/shared/hooks/useForm'
import { Box, Button, CustomEditor, Stepper, StepperContent, StepperFooter, StepperWrapper } from '@/shared/ui'
import { defaultValue, stepList } from '@/views/schedule/config/const'
import { SCHEDULE_API_KEY } from '@/views/schedule/model/apiKeys'
import ContentEditor from '@/views/schedule/ui/parts/ContentEditor'
import DateSelector from '@/views/schedule/ui/parts/DateSelector'
import LocationSelector from '@/views/schedule/ui/parts/LocationSelector'

// const CustomEditor = dynamic(() => import('@/shared/ui/CustomEditor'), { ssr: false })

export const Schedule = () => {
    const { data: form, handleChange } = useForm({ key: SCHEDULE_API_KEY.ROOT, defaultValues: defaultValue })
    const { mutate: uploadImage, isLoading } = useImageUploadQuery.upload({ igType: 'CT' })

    const editorRefs = React.useRef<Editor[] | []>([])

    const [currentStep, setCurrentStep] = React.useState(0)

    const handleNext = React.useCallback(() => {
        // const currentEditor = editorRefs.current[form?.currentEditPlace]
        // 등록
        if (currentStep === stepList.length - 1) {
            // 이미지 등록 후, 응답값을 places.images 에 넣는다.

            // if (currentEditor) {

            const imagesPayload = form?.images?.reduce(
                (acc, fileArr, index) => {
                    const order = index + 1
                    acc[order] = fileArr
                    return acc
                },
                {} as Record<number, File[]>,
            )

            const formData = new FormData()
            Object.entries(imagesPayload).forEach(([order, files]) => {
                files.forEach((file) => formData.append(order, file))
            })

            uploadImage(formData, {
                onSuccess: (res) => {
                    console.log('✅ 업로드 성공', res)
                    const contents = editorRefs.current.map((editor, index) => {
                        return {
                            cpOrder: index + 1,
                            pcId: form?.places?.[index].pcId,
                            cpText: editor?.getInstance().getHTML() || '',
                            cpType: 'M',
                            images: res?.data?.[index],
                        }
                    })

                    const postdata = {
                        ctTitle: form.ctTitle,
                        ctStartTime: form.date.from,
                        ctEndTime: form.date.to,
                        tags: form.tags,
                        places: contents,
                    }

                    console.log('post 데이터:', postdata)
                },
                onError: (err) => {
                    console.error('❌ 업로드 실패', err)
                },
            })

            console.log(imagesPayload)
            console.log(formData)

            // }
        }
        setCurrentStep((prev) => Math.min(prev + 1, stepList.length - 1))
    }, [form, currentStep, editorRefs])

    const handlePrevious = React.useCallback(() => {
        setCurrentStep((prev) => Math.max(prev - 1, 0))
    }, [])

    return (
        <Box className="flex-col p-0">
            <StepperWrapper>
                <Stepper steps={stepList} currentStep={currentStep} />
                <StepperFooter>
                    <Button onClick={handlePrevious} disabled={currentStep === 0} variant="outline">
                        이전
                    </Button>
                    <Button onClick={handleNext} disabled={currentStep === 1 && isEmpty(form?.places)}>
                        {currentStep === stepList.length - 1 ? '등록' : '다음'}
                    </Button>
                </StepperFooter>
                <StepperContent currentStep={currentStep} className="p-0">
                    {/* 날짜 선택 */}
                    <DateSelector />

                    {/* 장소 선택 */}
                    <LocationSelector />

                    {/* 본문 작성 */}
                    <ContentEditor editorRefs={editorRefs} />
                </StepperContent>
            </StepperWrapper>
        </Box>
    )
}
