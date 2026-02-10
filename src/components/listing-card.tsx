"use client"

import { motion } from "framer-motion"
import { FaStar, FaMapMarkerAlt } from "react-icons/fa"
import { BiWorld, BiFootball, BiBasketball, BiTennisBall } from "react-icons/bi"
import Image from "next/image"

interface ListingProps {
    id: string
    title: string
    location: string
    price: number
    rating: number
    imageUrl: string
    sports: string[]
}

const sportIcons: Record<string, React.ReactNode> = {
    football: <BiFootball size={20} />,
    basketball: <BiBasketball size={20} />,
    tennis: <BiTennisBall size={20} />,
    default: <BiWorld size={20} />,
}

export function ListingCard({ listing }: { listing: ListingProps }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="group cursor-pointer flex flex-col gap-2 rounded-xl overflow-hidden"
        >
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-200">
                <Image
                    src={listing.imageUrl}
                    alt={listing.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-sm p-2 shadow-sm">
                    <FaStar className="text-yellow-500" />
                    <span className="ml-1 text-xs font-bold text-gray-800">{listing.rating}</span>
                </div>
            </div>

            <div className="flex justify-between items-start mt-2">
                <div>
                    <h3 className="font-semibold text-gray-900 group-hover:underline">{listing.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm mt-0.5">
                        <FaMapMarkerAlt size={12} className="mr-1" />
                        <span>{listing.location}</span>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-bold text-black">${listing.price}</p>
                    <p className="text-gray-500 text-xs">por hora</p>
                </div>
            </div>

            <div className="flex gap-2 mt-1">
                {listing.sports.map((sport) => (
                    <div
                        key={sport}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black transition-colors"
                        title={sport}
                    >
                        {sportIcons[sport.toLowerCase()] || sportIcons.default}
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
