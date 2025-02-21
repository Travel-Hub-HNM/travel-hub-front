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
    Typography,
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
                                className=""
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
                                    <Box className="w-full flex-col">
                                        <SearchBar
                                            placeholder="장소명을 입력하세요"
                                            onSearch={(value) => {
                                                console.log(value)
                                            }}
                                        />
                                        <Flex className="max-h-[300px] w-full min-w-80 max-w-xl flex-col overflow-y-scroll rounded-lg p-4 shadow-lg">
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <Card key={index} className="w-full border-none">
                                                    <Flex className="flex-wrap">
                                                        <div className="relative m-3 h-[100px] w-[100px]">
                                                            <Image
                                                                src={eiffel}
                                                                alt="Location"
                                                                layout="fill"
                                                                objectFit="cover"
                                                                // className="rounded-3xl"
                                                                // style={{ borderRadius: '5px' }}
                                                            />
                                                        </div>
                                                        <Flex className="flex-col items-start">
                                                            <Typography>주소</Typography>
                                                            <Flex>
                                                                <Star className="h-3 w-3 fill-current text-yellow-400" />
                                                                <Typography>4.5</Typography>
                                                            </Flex>
                                                        </Flex>
                                                    </Flex>
                                                </Card>
                                            ))}
                                        </Flex>
                                    </Box>
                                ),
                            },
                            {
                                value: 'newLocale',
                                label: '나의 장소 등록',
                                content: (
                                    <Box className="w-full flex-col">
                                        <SearchBar
                                            placeholder="상호명 또는 주소를 입력하세요"
                                            onSearch={(value) => {
                                                console.log(value)
                                            }}
                                        />
                                        <div className="h-80 w-full min-w-80 max-w-xl border-2">지도</div>
                                        <Flex className="max-h-[150px] w-full min-w-80 max-w-xl flex-col overflow-y-scroll rounded-lg p-4 shadow-lg">
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <Card key={index} className="w-full border-none">
                                                    <Flex className="flex-wrap items-center justify-between p-3">
                                                        <Flex className="flex-col">
                                                            <Typography>상호명</Typography>
                                                            <Typography>주소</Typography>
                                                        </Flex>
                                                        <Button>등록</Button>
                                                    </Flex>
                                                </Card>
                                            ))}
                                        </Flex>
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
