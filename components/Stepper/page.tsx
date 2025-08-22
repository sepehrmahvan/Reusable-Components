import { Box } from '@mui/material'
import React from 'react'
import { FaCheck } from 'react-icons/fa'

const StepHeader = ({steps,activeStep}: {steps: any,activeStep: number}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        p: { xs: 2, sm: 3 },
        bgcolor: "var(--color-evalchi-background)",
        display: { xs: "none", sm: "block" },
      }}
    >
        {/* Stepper Header */}
      <Box
        sx={{
          width: "auto",
          minWidth: { xs: "95%", sm: "80%", md: "60%", lg: "50%" },
          marginX: "auto",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          position: "relative",
          gap: 0,
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        {steps.map((label: any, index: number) => (
          <React.Fragment key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
                minWidth: { xs: "80px", sm: "100px" },
                flex: { xs: "1 1 auto", md: "0 0 auto" },
              }}
            >
              {/* Circle */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: `2px solid ${
                    index < activeStep
                      ? "var(--color-primary-dark)"
                      : index === activeStep
                      ? "var(--color-primary-dark)"
                      : "var(--color-evalchi-border)"
                  }`,
                  backgroundColor: index < activeStep 
                    ? "var(--color-primary-dark)" 
                    : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {index < activeStep ? (
                  <FaCheck 
                    style={{
                      color: "white",
                      fontSize: "16px",
                    }}
                  />
                ) : index === activeStep && (
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-primary-dark)",
                    }}
                  />
                )}
              </div>
              {/* Label */}
              <Box sx={{ 
                marginTop: { xs: "8px", sm: "12px" },
                width: "100%",
              }}>
                <h5
                  style={{
                    margin: "4px 0 2px 0",
                    fontSize: "14px",
                    fontWeight: 500,
                    color:
                      index <= activeStep
                        ? "var(--color-primary-dark)"
                        : "#333",
                  }}
                >
                  {label.title}
                </h5>
                <p className='text-sm m-0 text-[#666]'>
                  {label.description}
                </p>
              </Box>
            </Box>
            {/* lines between circles */}
            {index < steps.length - 1 && (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  height: "40px", // Match circle height
                  paddingTop: "0px", // Align with circles
                }}
              >
                <div className='h-[2px] bg-evalchi-border w-[150px] border-1 border-evalchi-border'></div>
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  )
}

export default StepHeader