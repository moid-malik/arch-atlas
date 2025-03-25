import React from 'react'
import { Sheet, SheetTrigger, SheetContent } from '../ui/sheet'
import { IoMenu } from 'react-icons/io5'
import Logo from './Logo'
import Links from './links'
import Search from './search'

export default function Menu() {
  return (
    <div className='inline md:hidden'>
        <Sheet>
            <SheetTrigger className="flex items-center justify-center p-2">
                <IoMenu className='text-2xl text-zinc-800' />
            </SheetTrigger>
            <SheetContent side="left" className='flex flex-col pt-8 pb-12 px-4 gap-8 overflow-y-auto'>
                <div className="flex justify-center w-full">
                    <Logo />
                </div>
                <div className="w-full">
                    <Search isMobile={true} />
                </div>
                <div className="flex flex-col items-center w-full">
                    <Links />
                </div>
            </SheetContent>
        </Sheet>
    </div>
  )
}
