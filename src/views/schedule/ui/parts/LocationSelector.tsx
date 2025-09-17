import { Plus, Star, Check } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import { SearchBar } from '@/features/search'
import Eiffel from '@/shared/assets/img/Eiffel.jpg'
import { DefaultValue } from '@/shared/config/consts'
import { useForm } from '@/shared/hooks/useForm'
import { Box, Button, Card, CustomTabs, Flex, Typography } from '@/shared/ui'
import { defaultValue } from '@/views/schedule/config/const'
import { SCHEDULE_API_KEY } from '@/views/schedule/model/apiKeys'
import Map from '@/widgets/Map'

import dummy from './dummy.json'

const LocationSelector = () => {
    const { data: form, handleChange } = useForm({ key: SCHEDULE_API_KEY.ROOT })

    const query = dummy
    console.log(form)

    const handleTogglePlace = (item) => {
        handleChange((prev) => {
            const exists = prev.places?.some((p) => p.pcId === item.pcId)

            return {
                ...prev,
                places: exists ? prev.places.filter((p) => p.pcId !== item.pcId) : [...(prev.places || []), item],
            }
        })
    }

    return (
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
                                {query?.list?.map((item) => {
                                    const isSelected = form?.places?.some((p) => p.pcId === item.pcId)

                                    return (
                                        <Card key={item?.pcId} className="w-full border-none">
                                            <Flex className="flex-wrap justify-between">
                                                <Flex className="flex-wrap">
                                                    <div className="relative m-3 h-[80px] w-[80px]">
                                                        <Image
                                                            src={
                                                                item?.pcImg !== DefaultValue.BLANK
                                                                    ? item?.pcImg
                                                                    : Eiffel
                                                            }
                                                            alt="Location"
                                                            layout="fill"
                                                            // width={100}
                                                            // height={100}
                                                            objectFit="cover"
                                                            className="rounded-sm"
                                                        />
                                                    </div>
                                                    <Flex className="flex-col items-start">
                                                        <Typography className="font-bold">{item?.pcName}</Typography>
                                                        <Typography className="text-[10px] text-gray-400">
                                                            {item?.pcAddress}
                                                        </Typography>
                                                        <Flex>
                                                            <Star className="h-3 w-3 fill-current text-yellow-400" />
                                                            <Typography>{item?.pcRating}</Typography>
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                                <Button
                                                    size="icon"
                                                    className={isSelected ? '' : 'bg-gray-200'}
                                                    onClick={() => handleTogglePlace(item)}
                                                >
                                                    {isSelected ? <Check /> : <Plus className="text-white" />}
                                                </Button>
                                            </Flex>
                                        </Card>
                                    )
                                })}
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
    )
}

export default LocationSelector
