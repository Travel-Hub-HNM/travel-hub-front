'use client'

import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { CalendarIcon, Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { DateRange } from 'react-day-picker'

import { SearchBar } from '@/features/search'
import { stepList } from '@/pages/schedule/config/const'
import { cn } from '@/shared/lib/utils'
import {
    Box,
    Button,
    Calendar,
    Card,
    CardContent,
    CustomEditor,
    CustomTabs,
    Flex,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Stepper,
    StepperContent,
    StepperFooter,
    StepperWrapper,
} from '@/shared/ui'

import eiffel from '../../../../public/eiffel.jpg'

const Schedule = () => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    })

    const [currentStep, setCurrentStep] = React.useState(0)

    const handleNext = React.useCallback(() => {
        setCurrentStep((prev) => Math.min(prev + 1, stepList.length - 1))
    }, [])

    const handlePrevious = React.useCallback(() => {
        setCurrentStep((prev) => Math.max(prev - 1, 0))
    }, [])

    return (
        <Box className="flex-col">
            <StepperWrapper>
                <Stepper steps={stepList} currentStep={currentStep} />
                <StepperFooter>
                    <Button onClick={handlePrevious} disabled={currentStep === 0} variant="outline">
                        이전
                    </Button>
                    <Button
                        onClick={handleNext}
                        // disabled={currentStep === stepList.length - 1}
                    >
                        {currentStep === stepList.length - 1 ? '등록' : '다음'}
                    </Button>
                </StepperFooter>
                <StepperContent currentStep={currentStep}>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant="outline"
                                className={cn(
                                    'w-[300px] justify-start text-left font-normal',
                                    !date && 'text-muted-foreground',
                                )}
                            >
                                <CalendarIcon />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, 'yyyy년 MM월 dd일', { locale: ko })} -{' '}
                                            {format(date.to, 'yyyy년 MM월 dd일', { locale: ko })}
                                        </>
                                    ) : (
                                        format(date.from, 'yyyy년 MM월 dd일')
                                    )
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                    <CustomTabs
                        defaultValue="locale"
                        options={[
                            {
                                value: 'locale',
                                label: '장소 선택',
                                content: (
                                    <Box className="flex-col">
                                        <SearchBar
                                            placeholder="장소명을 입력하세요"
                                            onSearch={(value) => {
                                                console.log(value)
                                            }}
                                        />
                                        <Card className="w-full max-w-2xl overflow-hidden">
                                            <Flex>
                                                <div className="w-1/6 min-w-[100px] p-4">
                                                    <Image
                                                        src={eiffel}
                                                        alt="Location"
                                                        width={100}
                                                        height={100}
                                                        style={{ objectFit: 'contain', borderRadius: '5px' }}
                                                    />
                                                </div>
                                                <CardContent className="flex-1 p-4 flex flex-col justify-center">
                                                    <p className="text-lg font-semibold mb-2">주소</p>
                                                    <Flex>
                                                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                                        <span>4.5</span>
                                                    </Flex>
                                                </CardContent>
                                            </Flex>
                                        </Card>
                                    </Box>
                                ),
                            },
                            {
                                value: 'newLocale',
                                label: '나의 장소 등록',
                                content: (
                                    <Box className="flex-col">
                                        <SearchBar
                                            placeholder="상호명 또는 주소를 입력하세요"
                                            onSearch={(value) => {
                                                console.log(value)
                                            }}
                                        />
                                        <div className="border-4 w-96 h-96">지도</div>
                                        <Card className="w-full max-w-2xl overflow-hidden">
                                            <CardContent className="flex-1 p-4 flex flex-col justify-center">
                                                <Flex className="justify-between">
                                                    <p className="text-lg font-semibold mb-2">
                                                        주소주소주소주소주소주소주소주소주소주소주소주소주소주소주소
                                                    </p>
                                                    <Button>등록</Button>
                                                </Flex>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                ),
                            },
                        ]}
                    />
                    <CustomEditor />
                </StepperContent>
            </StepperWrapper>
        </Box>
    )
}

export default Schedule
