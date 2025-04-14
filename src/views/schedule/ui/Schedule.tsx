'use client'

import { Editor } from '@toast-ui/react-editor'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { CalendarIcon, Check, Plus, Star } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import React from 'react'
import { DateRange } from 'react-day-picker'

import { SearchBar } from '@/features/search'
import Eiffel from '@/shared/assets/img/Eiffel.jpg'
import { cn } from '@/shared/lib/utils'
import {
    Box,
    Button,
    Calendar,
    Card,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
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
    CustomEditor,
} from '@/shared/ui'
import { stepList } from '@/views/schedule/config/const'
import Map from '@/widgets/Map'

// const CustomEditor = dynamic(() => import('@/shared/ui/CustomEditor'), { ssr: false })

export const Schedule = () => {
    const editorRefs = React.useRef<(Editor | null)[]>([])

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    })

    const [currentStep, setCurrentStep] = React.useState(0)
    const [placeStep, setPlaceStep] = React.useState(0)
    // const [selectPlace, setSelectPlace] = React.useState()
    const [editPlace, setEditPlace] = React.useState<number | null>(0)

    const handleNext = React.useCallback(() => {
        const currentEditor = editorRefs.current[editPlace]
        if (currentStep === stepList.length - 1) {
            if (currentEditor) {
                const markdown = currentEditor.getInstance().getMarkdown()
                const html = currentEditor.getInstance().getHTML()

                // console.log(`✅ 등록된 내용 (index ${editPlace}):`, markdown)
                console.log(`✅ 등록된 내용 (index ${editPlace}):`, html)
            }
        }
        setCurrentStep((prev) => Math.min(prev + 1, stepList.length - 1))
    }, [currentStep, editPlace, editorRefs])

    const handlePrevious = React.useCallback(() => {
        setCurrentStep((prev) => Math.max(prev - 1, 0))
    }, [])

    const selectPlace = [
        {
            localeId: '1',
            locale: 'Paris',
            label: '에펠탑',
            value: 'eiffel',
            src: Eiffel,
            lat: 32.23412,
            lng: 32.44231,
        },
        {
            localeId: '2',
            locale: 'Paris',
            label: '개선문',
            value: 'triumphal',
            src: Eiffel,
            lat: 32.23412,
            lng: 32.44231,
        },
        {
            localeId: '3',
            locale: 'Paris',
            label: '루브르 박물관',
            value: 'louvre',
            src: Eiffel,
            lat: 32.23412,
            lng: 32.44231,
        },
        {
            localeId: '4',
            locale: 'Paris',
            label: '루브르 박물관2',
            value: 'louvre2',
            src: Eiffel,
            lat: 32.23412,
            lng: 32.44231,
        },
        {
            localeId: '5',
            locale: 'Paris',
            label: '루브르 박물관3',
            value: 'louvre3',
            src: Eiffel,
            lat: 32.23412,
            lng: 32.44231,
        },
        {
            localeId: '6',
            locale: 'Paris',
            label: '루브르 박물관4',
            value: 'louvre4',
            src: Eiffel,
            lat: 32.23412,
            lng: 32.44231,
        },
        {
            localeId: '7',
            locale: 'Paris',
            label: '루브르 박물관5',
            value: 'louvre5',
            src: Eiffel,
            lat: 32.23412,
            lng: 32.44231,
        },
    ]

    const handleImageClick = React.useCallback((index: number) => {
        setEditPlace((prev) => {
            if (prev === index) return null
            else return index
        })
    }, [])

    return (
        <Box className="flex-col p-0">
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
                <StepperContent currentStep={currentStep} className="p-0">
                    <Popover>
                        <PopoverTrigger asChild>
                            {/*<Flex className="min-w-80 max-w-xl flex-wrap justify-center">*/}
                            <Button
                                id="date"
                                variant="outline"
                                className={cn(
                                    'h-full w-full flex-wrap justify-start text-left font-normal',
                                    !date && 'text-muted-foreground',
                                )}
                            >
                                <CalendarIcon />
                                {date?.from ? (
                                    date.to ? (
                                        <Typography>
                                            {format(date.from, 'yyyy년 MM월 dd일', { locale: ko })} -{' '}
                                            {format(date.to, 'yyyy년 MM월 dd일', { locale: ko })}
                                        </Typography>
                                    ) : (
                                        <Typography>{format(date.from, 'yyyy년 MM월 dd일')}</Typography>
                                    )
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                            {/*</Flex>*/}
                        </PopoverTrigger>
                        <PopoverContent className="b w-auto p-0" align="start">
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
                                        <Flex className="max-h-[400px] w-full min-w-80 max-w-xl flex-col overflow-y-scroll rounded-lg p-4 shadow-lg">
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <Card key={index} className="w-full border-none">
                                                    <Flex className="flex-wrap justify-between">
                                                        <Flex className="flex-wrap">
                                                            <div className="relative m-3 h-[80px] w-[80px]">
                                                                <Image
                                                                    src={Eiffel}
                                                                    alt="Location"
                                                                    layout="fill"
                                                                    // width={100}
                                                                    // height={100}
                                                                    objectFit="cover"
                                                                    className="rounded-sm"
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
                                                        <Button size="icon" variant="outline">
                                                            <Plus />
                                                        </Button>
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
                                        <div className="h-80 w-full min-w-80 max-w-xl border-2">
                                            <Map />
                                        </div>
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
                    <Box className="w-full flex-col">
                        <div className="relative mx-auto w-full">
                            <Carousel
                                opts={{
                                    align: 'start',
                                    slidesToScroll: 3,
                                }}
                                className="w-full"
                            >
                                <CarouselContent className="-ml-2 md:-ml-4">
                                    {selectPlace.map((place, index) => (
                                        <CarouselItem key={place.localeId} className="basis-1/3 pl-2 pt-2 md:pl-4">
                                            <div>
                                                <div className="relative z-10 flex flex-col items-center">
                                                    <div
                                                        className={cn(
                                                            'flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold',
                                                            index === editPlace
                                                                ? 'bg-primary text-primary-foreground'
                                                                : 'text-muted-foreground bg-gray-100',
                                                        )}
                                                    >
                                                        {index + 1}
                                                    </div>
                                                </div>
                                                {/*{index < selectPlace?.length && (*/}
                                                {/*<div*/}
                                                {/*    className={cn(*/}
                                                {/*        'absolute top-5 h-0.5 w-full -translate-y-1/2',*/}
                                                {/*        index < editPlace ? 'bg-primary' : 'bg-gray-100',*/}
                                                {/*    )}*/}
                                                {/*    style={{*/}
                                                {/*        left: `calc(${(index + 1) * (100 / 2)}% - ${100 / 2}%)`,*/}
                                                {/*        width: `${100 / 2}%`,*/}
                                                {/*    }}*/}
                                                {/*/>*/}
                                                {/*)}*/}
                                            </div>
                                            <div
                                                className="relative cursor-pointer p-1 transition-all duration-200"
                                                onClick={() => handleImageClick(index)}
                                            >
                                                <div className="relative">
                                                    <Image
                                                        src={place.src}
                                                        alt={place.label}
                                                        width={300}
                                                        height={200}
                                                        className="aspect-[3/2] h-auto w-full rounded-sm object-cover"
                                                    />
                                                    {editPlace === index && (
                                                        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-gray-800/70 transition-all duration-300">
                                                            <p className="px-2 text-center text-sm font-medium text-white md:text-base">
                                                                {place.label}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="absolute left-[-20] top-1/2 z-10 -translate-x-1/2 -translate-y-1/2" />
                                <CarouselNext className="absolute right-[-20] top-1/2 z-10 -translate-y-1/2 translate-x-1/2" />
                            </Carousel>
                        </div>

                        <div className="w-full border-4">이미지 첨부</div>
                        <div className="mt-4 w-full">
                            {selectPlace.map((_, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        editPlace === index ? 'block' : 'hidden',
                                        'transition-opacity duration-200 ease-in-out',
                                    )}
                                    style={{
                                        minWidth: '100%',
                                        maxWidth: '100%',
                                    }}
                                >
                                    <CustomEditor
                                        index={index}
                                        editorRef={(el: Editor | null) => {
                                            editorRefs.current[index] = el
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </Box>
                </StepperContent>
            </StepperWrapper>
        </Box>
    )
}
