import Image from 'next/image'

import DUMMY_IMG_OSAKA from '@/shared/assets/img/Osaka.jpg'

import { Card, CardContent, CardHeader } from './Card'

const DUMMY_DATA = [
    {
        id: 1,
        title: 'Osaka',
        image: DUMMY_IMG_OSAKA,
    },
    {
        id: 2,
        title: 'Tokyo',
        image: DUMMY_IMG_OSAKA,
    },
    {
        id: 3,
        title: 'Fukuoka',
        image: DUMMY_IMG_OSAKA,
    },
    {
        id: 4,
        title: 'Jeju',
        image: DUMMY_IMG_OSAKA,
    },
    {
        id: 5,
        title: 'TEST',
        image: DUMMY_IMG_OSAKA,
    },
    {
        id: 6,
        title: 'TEST2',
        image: DUMMY_IMG_OSAKA,
    },
]

const CardList = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {DUMMY_DATA.map((item) => (
                <Card
                    className="flex flex-col h-full bg-white rounded-lg shadow-md cursor-pointer border-none"
                    key={item.id}
                >
                    <CardHeader className="relative p-0 h-40 w-full">
                        <Image
                            src={item.image}
                            alt={item.title}
                            className="object-cover w-full h-full aspect-square rounded-t-lg"
                        />
                        <span className="absolute top-0.5 right-[-5px] bg-red-500 text-white text-xs px-2 py-1 rounded">
                            NEW
                        </span>
                    </CardHeader>
                    <CardContent className="p-4 mt-2">
                        <p className="text-xs text-red-500 font-bold">새로운 여행지</p>
                        <p className="text-lg font-bold">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.title}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export { CardList }
