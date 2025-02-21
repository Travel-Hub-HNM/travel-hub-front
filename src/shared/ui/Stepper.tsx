'use client'

import { Check } from 'lucide-react'
import React from 'react'

import { cn } from '@/shared/lib/utils'

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
    steps?: string[]
    currentStep: number
}

const StepperWrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('w-full max-w-4xl p-8 border-2', className)} {...props} />
    ),
)
StepperWrapper.displayName = 'StepperWrapper'

const StepperHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('text-3xl font-bold text-center mb-8', className)} {...props} />
    ),
)

StepperHeader.displayName = 'StepperHeader'

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(({ steps, currentStep, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center justify-between mb-8 relative', className)}>
        {steps?.map((step, index) => (
            <React.Fragment key={step}>
                <div className="flex flex-col items-center relative z-10">
                    <div
                        className={cn(
                            'w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold',
                            index < currentStep
                                ? 'bg-primary text-primary-foreground'
                                : index === currentStep
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-gray-100 text-muted-foreground',
                        )}
                    >
                        {index < currentStep ? <Check className="w-3 h-3" /> : index + 1}
                    </div>
                    <span className="mt-2 text-sm font-medium">{step}</span>
                </div>
                {index < steps?.length - 1 && (
                    <div
                        className={cn(
                            'absolute top-3 -translate-y-1/2 h-0.5 w-full',
                            index < currentStep ? 'bg-primary' : 'bg-gray-100',
                        )}
                        style={{
                            left: `calc(${(index + 1) * (100 / (steps?.length - 1))}% - ${100 / (steps?.length - 1)}%)`,
                            width: `${100 / (steps?.length - 1)}%`,
                        }}
                    />
                )}
            </React.Fragment>
        ))}
    </div>
))

Stepper.displayName = 'Stepper'

const StepperFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('flex justify-between mt-8', className)} {...props} />
    ),
)

StepperFooter.displayName = 'StepperFooter'

const StepperContent = React.forwardRef<HTMLDivElement, StepperProps & { children: React.ReactNode[] }>(
    ({ className, currentStep, children, ...props }, ref) => (
        <div ref={ref} className={cn('mt-8 p-4 bg-muted rounded-lg', className)} {...props}>
            {children[currentStep]}
        </div>
    ),
)

StepperContent.displayName = 'StepperContent'

export { Stepper, StepperContent, StepperFooter, StepperHeader, StepperWrapper }
