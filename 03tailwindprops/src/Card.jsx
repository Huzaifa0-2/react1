import React from 'react'

const Card = ({username, newName}) => {
    return (
        <div class="flex flex-col items-center gap-6 p-7 md:flex-row md:gap-8 rounded-2xl">
            <div>
                <img class="size-48 shadow-xl rounded-md" alt="" src="/img/cover.png" />
            </div>
            <div class="flex items-center md:items-start">
                <span class="text-2xl font-medium">{username}</span>
                <span class="font-medium text-sky-500">{newName}</span>
                <span class="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
                    <span>No. 4</span>
                    <span>·</span>
                    <span>2025</span>
                </span>
            </div>
        </div>
    )
}

export default Card