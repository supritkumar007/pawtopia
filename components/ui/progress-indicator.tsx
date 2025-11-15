interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  steps: string[]
}

export function ProgressIndicator({ currentStep, totalSteps, steps }: ProgressIndicatorProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                index < currentStep
                  ? 'bg-gradient-to-r from-[#B3E5CC] to-[#6D9EEB] text-white scale-110'
                  : index === currentStep - 1
                  ? 'bg-gradient-to-r from-[#6D9EEB] to-[#5B8DD5] text-white scale-110'
                  : 'bg-white/50 text-[#6B7280]'
              }`}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
            <p className={`text-xs mt-2 text-center font-medium ${
              index <= currentStep - 1 ? 'text-[#6D9EEB]' : 'text-[#6B7280]'
            }`}>
              {step}
            </p>
            {index < steps.length - 1 && (
              <div
                className={`absolute w-full h-1 mt-5 ${
                  index < currentStep - 1 ? 'bg-gradient-to-r from-[#6D9EEB] to-[#B3E5CC]' : 'bg-white/30'
                }`}
                style={{ left: '50%', width: 'calc(100% - 20px)' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-white/40 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#6D9EEB] to-[#B3E5CC] transition-all duration-500"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  )
}
