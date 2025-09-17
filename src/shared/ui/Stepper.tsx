'use client'

import { Check } from 'lucide-react'
import React from 'react'

import { cn } from '@/shared/lib/utils'

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
    steps?: { label: string; value: string }[]
    currentStep: number
}

const StepperWrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('w-full min-w-80 max-w-4xl p-8', className)} {...props} />
    ),
)
StepperWrapper.displayName = 'StepperWrapper'

const StepperHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('mb-8 text-center text-3xl font-bold', className)} {...props} />
    ),
)

StepperHeader.displayName = 'StepperHeader'

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(({ steps, currentStep, className, ...props }, ref) => (
    <div ref={ref} className={cn('relative mb-8 flex items-center justify-between', className)}>
        {steps?.map((step, index) => (
            <React.Fragment key={step.value}>
                <div className="relative z-10 flex flex-col items-center">
                    <div
                        className={cn(
                            'flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold',
                            index < currentStep
                                ? 'bg-primary text-primary-foreground'
                                : index === currentStep
                                  ? 'bg-primary text-primary-foreground'
                                  : 'text-muted-foreground bg-gray-100',
                        )}
                    >
                        {index < currentStep ? <Check className="h-3 w-3" /> : index + 1}
                    </div>
                    <span className="mt-2 text-sm font-medium">{step.label}</span>
                </div>
                {index < steps?.length - 1 && (
                    <div
                        className={cn(
                            'absolute top-3 h-0.5 w-full -translate-y-1/2',
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
        <div ref={ref} className={cn('mt-8 flex justify-between', className)} {...props} />
    ),
)

StepperFooter.displayName = 'StepperFooter'

const StepperContent = React.forwardRef<HTMLDivElement, StepperProps & { children: React.ReactNode[] }>(
    ({ className, currentStep, children, ...props }, ref) => (
        <div ref={ref} className={cn('bg-muted mt-8 rounded-lg p-4', className)} {...props}>
            {children[currentStep]}
        </div>
    ),
)

StepperContent.displayName = 'StepperContent'

export { Stepper, StepperContent, StepperFooter, StepperHeader, StepperWrapper }
