'use client'

import { GoogleMap, MarkerF } from '@react-google-maps/api'
import Image from 'next/image'
import React from 'react'

import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Flex,
} from '@/shared/ui'

import eiffel from '../../../public/eiffel.jpg'

const containerStyle = {
    width: '100%',
    height: '100%',
}

const styles = [
    {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
    },
]

const center = {
    lat: 37.5743484,
    lng: 126.9897057,
}

const locations = [
    { lat: 37.5743484, lng: 126.9897057 },
    { lat: 37.5717174, lng: 126.9860732 },
    { lat: 37.58152115, lng: 126.98487282 },
    { lat: 36.78230587, lng: 127.22517054 },
    { lat: 37.58053486, lng: 127.00281143 },
    { lat: 35.17861405, lng: 129.19969082 },
]

const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    // mapTypeId: 'satellite',
    disableDefaultUI: true,
    styles: styles,
}

const Map = () => {
    const [map, setMap] = React.useState<google.maps.Map | null>(null)
    const [selectedMarker, setSelectedMarker] = React.useState<google.maps.Map | null>(null)

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={defaultMapOptions}
            onLoad={(map) => setMap(map)}
            onClick={(e) => {
                // setSelectedMarker({ lat: 위도, lng: 경도 })
                // setCenter({ lat: 위도, lng: 경도 })
            }}
        >
            {locations.map((location, index) => (
                <MarkerF
                    key={index}
                    position={location}
                    onClick={(e) => {
                        console.log(location)
                        // setSelectedMarker({ lat: location.lat, lng: location.lng })
                    }}
                />
            ))}
            {selectedMarker && (
                // <InfoWindowF
                //     position={selectedMarker}
                //     options={{ pixelOffset: new window.google.maps.Size(0, -25) }}
                //     onCloseClick={() => {
                //         setSelectedMarker(null)
                //     }}
                // >
                //     <div>dd</div>
                // </InfoWindowF>
                // <AlertDialog open={!!selectedMarker}>
                //     <AlertDialogContent>
                //         <AlertDialogHeader>
                //             <AlertDialogTitle>장소명</AlertDialogTitle>
                //             <Flex className="flex-col">
                //                 <Image
                //                     src={eiffel}
                //                     alt="Location"
                //                     // layout="fill"
                //                     width="100%"
                //                     height="100%"
                //                     objectFit="cover"
                //                     className="rounded-sm"
                //                 />
                //                 <AlertDialogDescription>
                //                     장소 설명 위도: {selectedMarker?.lat} 경도: {selectedMarker?.lng}
                //                 </AlertDialogDescription>
                //             </Flex>
                //         </AlertDialogHeader>
                //         <AlertDialogFooter>
                //             <AlertDialogCancel onClick={() => setSelectedMarker(null)}>닫기</AlertDialogCancel>
                //         </AlertDialogFooter>
                //     </AlertDialogContent>
                // </AlertDialog>
                <Dialog open={!!selectedMarker} onOpenChange={() => setSelectedMarker(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>장소명</DialogTitle>
                            <Flex className="flex-col">
                                <Image
                                    src={eiffel}
                                    alt="Location"
                                    // layout="fill"
                                    // width="100%"
                                    // height="100%"
                                    objectFit="cover"
                                    className="rounded-sm"
                                />
                                <DialogDescription>
                                    {/* 장소 설명 위도: {selectedMarker?.lat} 경도: {selectedMarker?.lng} */}
                                </DialogDescription>
                            </Flex>
                        </DialogHeader>

                        <DialogFooter>
                            <Button onClick={() => setSelectedMarker(null)}>닫기</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </GoogleMap>
    )
}

export default Map
