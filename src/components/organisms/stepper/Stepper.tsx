import FlexBox from '@Atoms/ui/FlexBox'
import { Chip } from '@material-ui/core'
import { Box } from '@material-ui/system'
import React, { Fragment, useEffect, useState } from 'react'

type Step = {
  title: string
  disabled: boolean
}

type StepperProps = {
  selectedStep: number
  stepperList: Step[]
  onChange?: (step: number) => void
}

const Stepper: React.FC<StepperProps> = ({
  selectedStep,
  stepperList,
  onChange,
}) => {
  const [selected, setSelected] = useState(selectedStep - 1)

  const handleStepClick = (step: Step, ind: number) => () => {
    if (!step.disabled) {
      setSelected(ind)
      if (onChange) onChange(ind)
    }
  }

  useEffect(() => {
    setSelected(selectedStep - 1)
  }, [selectedStep])

  return (
    <FlexBox alignItems="center" flexWrap="wrap" justifyContent="center" my="-4px">
      {stepperList.map((step, ind) => (
        <Fragment key={step.title}>
          <Chip
            disabled={step.disabled}
            label={`${ind + 1}. ${step.title}`}
            onClick={handleStepClick(step, ind)}
            sx={{
              backgroundColor: ind <= selected ? 'primary.main' : 'primary.light',
              color: ind <= selected ? 'primary.contrastText' : 'primary.main',
              p: '0.5rem 1rem',
              fontSize: '14px',
              fontWeight: '600',
              my: '4px',
              '&:hover:not(:disabled)': {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
              },
            }}
          />
          {ind < stepperList.length - 1 && (
            <Box
              width="50px"
              height="4px"
              bgcolor={ind < selected ? 'primary.main' : 'primary.light'}
            />
          )}
        </Fragment>
      ))}
    </FlexBox>
  )
}

Stepper.defaultProps = {
  selectedStep: 1,
}

export default Stepper
