import { Box } from '@mui/material'
import React from 'react'

const StepHeader = ({steps,activeStep}: {steps: any,activeStep: number}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        p: 3,
        bgcolor: "var(--color-evalchi-background)",
      }}
    >
        {/* Stepper Header */}
      <Box
        sx={{
          width: "auto",
          minWidth: "30%",
          marginX: "auto",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          position: "relative",
          gap: "40px", // Reduced gap to accommodate chevrons
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
              }}
            >
              {/* Circle */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: `2px solid ${
                    index === activeStep
                      ? "var(--color-primary-dark)"
                      : "var(--color-evalchi-border)"
                  }`,
                  backgroundColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {index === activeStep && (
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
              <Box sx={{ marginTop: "12px" }}>
                <h5
                  style={{
                    margin: "4px 0 2px 0",
                    fontSize: "14px",
                    fontWeight: 500,
                    color:
                      index === activeStep
                        ? "var(--color-primary-dark)"
                        : "#333",
                  }}
                >
                  {label.title}
                </h5>
                <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>
                  {label.description}
                </p>
              </Box>
            </Box>
            {/* Chevron Left between steps */}
            {index < steps.length - 1 && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "40px", // Match circle height
                  paddingTop: "0px", // Align with circles
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    color: "var(--color-evalchi-border)",
                  }}
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  )
}

export default StepHeader