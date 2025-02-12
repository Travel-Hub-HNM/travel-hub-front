'use client'

import { Check } from 'lucide-react'
import React from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
    steps: string[]
    currentStep: number
    onNext: () => void
    onPrevious: () => void
}

const Stepper: React.FC<StepperProps> = ({
    steps,
    currentStep,
    onNext,
    onPrevious,
    className = '',
    children,
    ...props
}) => {
    return (
        <div className={cn('min-h-screen flex items-center justify-center bg-background', className)}>
            <div className="w-full max-w-3xl p-8">
                <h1 className="text-3xl font-bold text-center mb-8">Stepper Example</h1>

                <div className="w-full max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        {steps.map((step, index) => (
                            <React.Fragment key={step}>
                                <div className="flex flex-col items-center">
                                    <div
                                        className={cn(
                                            'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold',
                                            index < currentStep
                                                ? 'bg-primary text-primary-foreground'
                                                : index === currentStep
                                                  ? 'bg-primary text-primary-foreground'
                                                  : 'bg-muted text-muted-foreground',
                                        )}
                                    >
                                        {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                                    </div>
                                    <span className="mt-2 text-sm font-medium">{step}</span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={cn('flex-1 h-1', index < currentStep ? 'bg-primary' : 'bg-muted')}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="flex justify-between mt-8">
                        <Button onClick={onPrevious} disabled={currentStep === 0} variant="outline">
                            Previous
                        </Button>
                        <Button onClick={onNext} disabled={currentStep === steps.length - 1}>
                            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </div>
                <div className="mt-8 p-4 bg-muted rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">{steps[currentStep]}</h2>
                    <p>
                        This is the content for {steps[currentStep].toLowerCase()}. You can add any components or
                        information relevant to this step here.
                    </p>
                </div>
            </div>
        </div>
    )
}

export { Stepper }
