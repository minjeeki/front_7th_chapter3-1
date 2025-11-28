import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export interface FormSelectOption {
  value: string
  label: string
}

export interface FormSelectProps {
  name: string
  value?: string
  onValueChange?: (value: string) => void
  options: FormSelectOption[]
  placeholder?: string
  disabled?: boolean
  className?: string
}

/**
 * 테스트 가능한 Select wrapper 컴포넌트
 * shadcn/ui Select를 감싸고, 내부에 hidden select를 추가하여 테스트에서 탐지 가능하도록 함
 */
export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      name,
      value,
      onValueChange,
      options,
      placeholder = "선택하세요",
      disabled = false,
      className,
    },
    ref
  ) => {
    return (
      <>
        <Select
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
        >
          <SelectTrigger className={className}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* 테스트를 위한 hidden select */}
        <select
          ref={ref}
          name={name}
          value={value || ""}
          onChange={(e) => onValueChange?.(e.target.value)}
          style={{ display: "none" }}
          aria-hidden="true"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </>
    )
  }
)

FormSelect.displayName = "FormSelect"

