'use client'
import { CustomButtonProps } from '@/types'
import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'

const CustomButton = ({ title, containerStyles, handleClick, btnType, additionalStyles, rightIcon }: CustomButtonProps) => {
    const buttonClasses = clsx('custom-btn', containerStyles, {
        'text-primary-blue bg-white rounded-full shadow-md hover:bg-primary-blue hover:text-white transition-all duration-300 ease-in-out': containerStyles === 'style_primary',
        'text-white bg-primary-blue rounded-full shadow-md hover:bg-white hover:text-primary-blue transition-all duration-300 ease-in-out': containerStyles === 'style_secondary',
    });

    return (
        <button 
                disabled={false}
                type={ btnType || 'button' }
                className={clsx(buttonClasses, additionalStyles)}
                onClick={handleClick}
        >
                <span className={`flex-1`}>{title}</span>
                {rightIcon && (
                    <div className='relative w-6 h-6'>
                        <Image 
                            src={rightIcon}
                            alt='right-icon'
                            fill
                            className='object-contain'
                        />
                    </div>
                )}
        </button>
    )
}

export default CustomButton