import { Editor } from '@toast-ui/react-editor'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import { useTagsQuery } from '@/shared/api/endpoints/tags'
import { DefaultValue } from '@/shared/config/consts'
import { useForm } from '@/shared/hooks/useForm'
import { cn } from '@/shared/lib/utils'
import {
    Badge,
    Box,
    Button,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    CustomEditor,
    Flex,
    Input,
} from '@/shared/ui'
import { SCHEDULE_API_KEY } from '@/views/schedule/model/apiKeys'

const ContentEditor = ({ editorRefs }) => {
    const { data: tagList } = useTagsQuery.list()
    const [isDragging, setIsDragging] = React.useState(false)

    const { data: form, handleChange } = useForm({ key: SCHEDULE_API_KEY.ROOT })

    console.log('폼 데이터', form)
    console.log(editorRefs.current)
    console.log(tagList)

    const handleImageClick = (index: number) => {
        handleChange((prev) => {
            return {
                ...prev,
                currentEditPlace: prev === index ? null : index,
            }
        })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const files = e.target.files
        if (!files) return

        // const newImages = Array.from(files)
        //     .map((file) => {
        //         const url = URL.createObjectURL(file)
        //         return url ? url : null
        //     })
        //     .filter((src): src is string => !!src) // null 필터링
        //
        const newFiles = Array.from(files)

        handleChange((prev) => {
            const updatedImages = [...(prev.images || [])]
            if (!updatedImages[index]) updatedImages[index] = []
            updatedImages[index] = [...updatedImages[index], ...newFiles]

            return {
                ...prev,
                images: updatedImages,
                currentEditPlace: prev === index ? null : index,
            }
        })
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent, index: number) => {
        e.preventDefault()

        const files = e.dataTransfer.files
        if (!files) return

        const newFiles = Array.from(files).filter((file) => file.type.startsWith('image/'))

        handleChange((prev) => {
            const updatedImages = [...(prev.images || [])]
            if (!updatedImages[index]) updatedImages[index] = []
            updatedImages[index] = [...updatedImages[index], ...newFiles]

            return {
                ...prev,
                images: updatedImages,
            }
        })

        // const newImages = Array.from(files)
        //     .filter((file) => file.type.startsWith('image/'))
        //     .map((file) => URL.createObjectURL(file))
        //
        // handleChange((prev) => {
        //     const updatedImages = [...(prev.images || [])]
        //     updatedImages[index] = [...(prev.images[index] || []), ...newFiles]
        //
        //     return {
        //         ...prev,
        //         images: updatedImages,
        //     }
        // })

        setIsDragging(false)
    }

    const removeImage = (index: number, imageIndex: number) => {
        // handleChange((prev) => {
        //     const updatedImages = [...(prev.images || [])]
        //     if (!updatedImages[index]) return prev.images
        //     updatedImages[index] = updatedImages[index].filter((_, i) => i !== imageIndex)
        //
        //     return {
        //         ...prev,
        //         images: updatedImages,
        //     }
        // })

        handleChange((prev) => {
            const updatedImages = [...(prev.images || [])]
            if (!updatedImages[index]) return prev
            updatedImages[index] = updatedImages[index].filter((_, i) => i !== imageIndex)

            return {
                ...prev,
                images: updatedImages,
            }
        })
    }

    return (
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
                        {form?.places?.map((place, index) => (
                            <CarouselItem key={place.pcId} className="basis-1/3 pl-2 pt-2 md:pl-4">
                                <div>
                                    <div className="relative z-10 flex flex-col items-center">
                                        <div
                                            className={cn(
                                                'flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold',
                                                index === form?.currentEditPlace
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'text-muted-foreground bg-gray-100',
                                            )}
                                        >
                                            {index + 1}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="relative cursor-pointer p-1 transition-all duration-200"
                                    onClick={() => handleImageClick(index)}
                                >
                                    <div className="relative">
                                        <Image
                                            src={place.pcImg || '/image/no-image.png'}
                                            alt={place.pcName}
                                            width={300}
                                            height={200}
                                            className="aspect-[3/2] h-auto w-full rounded-sm object-cover"
                                        />
                                        {form?.currentEditPlace === index && (
                                            <div className="absolute inset-0 flex items-center justify-center rounded-md bg-gray-800/70 transition-all duration-300">
                                                <p className="px-2 text-center text-sm font-medium text-white md:text-base">
                                                    {place.pcName}
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

            <Flex className="w-full flex-col items-start gap-5">
                <Input
                    type="text"
                    value={form.ctTitle}
                    placeholder={DefaultValue.BLANK}
                    className="rounded-none border-[1px] border-gray-200"
                    onChange={(e) => handleChange('ctTitle', e.target.value)}
                />
                <Flex className="flex-wrap">
                    {tagList?.list?.map((item) => (
                        <Badge
                            key={item?.tgIdx}
                            className={`${form.tags.includes(item.tgIdx) ? '' : 'bg-gray-200'} cursor-pointer`}
                            onClick={() => {
                                handleChange((prev) => {
                                    const updatedTags = prev.tags.includes(item.tgIdx)
                                        ? prev.tags.filter((id) => id !== item.tgIdx)
                                        : [...prev.tags, item.tgIdx]

                                    return {
                                        ...prev,
                                        tags: updatedTags,
                                    }
                                })
                            }}
                        >
                            {item?.tgName}
                        </Badge>
                    ))}
                </Flex>
                {form?.places?.map((_, index) => (
                    <div
                        key={index}
                        className={cn(
                            form?.currentEditPlace === index ? 'block' : 'hidden',
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
                        <div className="w-full">
                            <div
                                className={`rounded-lg border-2 border-dashed p-8 text-center ${
                                    isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
                                }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, index)}
                            >
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-lg font-semibold">이미지 업로드</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    이미지를 드래그 앤 드롭하거나 클릭하여 선택하세요
                                </p>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    id={`file-upload-${index}`}
                                    onChange={(e) => handleFileChange(e, index)}
                                />
                                <Button
                                    variant="outline"
                                    className="mt-4"
                                    onClick={() => document.getElementById(`file-upload-${index}`)?.click()}
                                >
                                    이미지 선택
                                </Button>
                            </div>

                            <div className={form?.currentEditPlace === index ? 'block' : 'hidden'}>
                                {form?.images.length > 0 && (
                                    <div className="space-y-4">
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                                // setImagesList((prev) => {
                                                //     const updated = [...prev]
                                                //     updated[index] = []
                                                //     return updated
                                                // })
                                                handleChange((prev) => {
                                                    const updatedImages = [...prev.images]
                                                    updatedImages[index] = []
                                                    return {
                                                        ...prev,
                                                        images: updatedImages,
                                                    }
                                                })
                                            }
                                        >
                                            <X className="mr-2 h-4 w-4" /> 모두 삭제
                                        </Button>
                                        <div className="overflow-x-auto pb-4">
                                            <div className={cn('flex space-x-4')} style={{ minWidth: 'min-content' }}>
                                                {form?.images?.[index]?.map((file, idx) => {
                                                    const src = file instanceof File ? URL.createObjectURL(file) : file
                                                    return (
                                                        <div
                                                            key={idx}
                                                            className="group relative aspect-square h-32 w-32 flex-shrink-0 border-2"
                                                        >
                                                            <Image
                                                                src={src}
                                                                alt={`Scrollable image ${idx + 1}`}
                                                                layout="fill"
                                                                className="h-full w-full rounded-md object-cover"
                                                            />
                                                            <button
                                                                className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                                                onClick={() => removeImage(index, idx)}
                                                            >
                                                                <X className="h-2 w-2" />
                                                            </button>
                                                        </div>
                                                    )
                                                })}
                                                {form?.images.length === 0 && (
                                                    <div className="flex h-48 w-48 flex-shrink-0 items-center justify-center rounded-md bg-gray-100">
                                                        <span className="text-gray-400">이미지 없음</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </Flex>
        </Box>
    )
}

export default ContentEditor
