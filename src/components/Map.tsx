"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

// Fix for default marker icons in Leaflet with Next.js/Webpack
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

interface Venue {
    id: string;
    lat: number;
    lng: number;
    title: string;
}

export default function Map({ venues }: { venues: Venue[] }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="h-full w-full bg-gray-100 animate-pulse rounded-xl" />

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-[calc(100vh-120px)] w-full rounded-xl overflow-hidden shadow-lg border border-gray-200"
        >
            <MapContainer
                center={[40.4168, -3.7038] as [number, number]} // Default to Madrid or user location
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" // Clean minimalist map style
                />
                {venues.map((venue) => (
                    <Marker key={venue.id} position={[venue.lat, venue.lng]}>
                        <Popup>
                            <div className="font-semibold">{venue.title}</div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </motion.div>
    )
}
