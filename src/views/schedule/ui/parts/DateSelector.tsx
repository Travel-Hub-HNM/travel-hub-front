import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import React from 'react'

import { useForm } from '@/shared/hooks/useForm'
import { cn } from '@/shared/lib/utils'
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger, Typography } from '@/shared/ui'
import { defaultValue } from '@/views/schedule/config/const'
import { SCHEDULE_API_KEY } from '@/views/schedule/model/apiKeys'

const DateSelector = () => {
    const { data: form, handleChange } = useForm({ key: SCHEDULE_API_KEY.ROOT })

    return (
        <Popover>
            <PopoverTrigger asChild>
                {/*<Flex className="min-w-80 max-w-xl flex-wrap justify-center">*/}
                <Button
                    id="date"
                    variant="outline"
                    className={cn(
                        'h-full w-full flex-wrap justify-start text-left font-normal',
                        !form?.date && 'text-muted-foreground',
                    )}
                >
                    <CalendarIcon />
                    {form?.date?.from ? (
                        form?.date?.to ? (
                            <Typography>
                                {format(form?.date?.from, 'yyyy년 MM월 dd일', { locale: ko })} -{' '}
                                {format(form?.date?.to, 'yyyy년 MM월 dd일', { locale: ko })}
                            </Typography>
                        ) : (
                            <Typography>{format(form?.date?.from, 'yyyy년 MM월 dd일')}</Typography>
                        )
                    ) : (
                        <Typography>날짜를 선택해주세요.</Typography>
                    )}
                </Button>
                {/*</Flex>*/}
            </PopoverTrigger>
            <PopoverContent className="b w-auto p-0" align="start">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={form?.date?.from}
                    selected={form?.date}
                    onSelect={(value) => handleChange('date', value)}
                    numberOfMonths={2}
                    className=""
                />
            </PopoverContent>
        </Popover>
    )
}

export default DateSelector
