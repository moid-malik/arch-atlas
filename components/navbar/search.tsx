'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '../ui/input'
import { useDebouncedCallback } from 'use-debounce'

export default function Search() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('search', term)
        } else {
            params.delete('search')
        }
        router.push(`/catalog?${params.toString()}`, { scroll: false })
    }, 50)

    return (
        <Input 
            type='search'
            name='search'
            placeholder='Search...'
            className='w-[400px]'
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get('search') ?? ''}
        />
    )
}
