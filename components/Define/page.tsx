"use client";
import { guideData, data as initialData, type OrgNode } from "@/utils/data";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper
} from "@mui/material";
import { useCallback, useState } from "react";
import StepHeader from "../Stepper/page";
import StepContent from "./DefineContent";

const organizationOptions = [
  {
    title: "مدیرعامل",
  },
  {
    title: "مدیر ارشد فناوری",
  },
  {
    title: "مدیر ارشد مالی",
  },
];

const steps = [
  {
    title: "نمودار سازمانی",
    description: "عنوان و توضیحات ارزیابی را تایپ نمایید",
  },
  {
    title: "تعریف نقش های سازمانی",
    description: "نقش‌های خود را اضافه نمایید",
  },
  {
    title: "تعریف نقش های سازمانی",
    description: "نقش‌های خود را اضافه نمایید",
  },
];

const DefinePage = () => {
  const [treeData, setTreeData] = useState<OrgNode[]>(initialData);
  const [activeStep, setActiveStep] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);

  const handleAddPosition = useCallback(
    (
      pos: "top" | "right" | "bottom" | "left",
      path: number[],
      title: string
    ) => {
      if (!title.trim()) return;
      const copy: OrgNode[] = JSON.parse(JSON.stringify(treeData));

      const findNode = (arr: OrgNode[], p: number[]): OrgNode => {
        let node = arr[0];
        for (const idx of p) {
          node.children = node.children || [];
          node = node.children[idx];
        }
        return node;
      };

      if (pos === "bottom") {
        const target = findNode(copy, path);
        target.children = target.children || [];
        target.children.push({ title: title.trim() });
      } else if (pos === "right") {
        if (path.length === 0) {
          copy.push({ title: title.trim() });
        } else {
          const parentPath = path.slice(0, -1);
          const parent = findNode(copy, parentPath);
          parent.children = parent.children || [];
          const insertIndex = path[path.length - 1] + 1;
          parent.children.splice(insertIndex, 0, { title: title.trim() });
        }
      } else if (pos === "left" || pos === "top") {
        // Treat 'top' same as inserting before (previous sibling)
        if (path.length === 0) {
          copy.unshift({ title: title.trim() });
        } else {
          const parentPath = path.slice(0, -1);
          const parent = findNode(copy, parentPath);
          parent.children = parent.children || [];
          const insertIndex = Math.max(0, path[path.length - 1]);
          parent.children.splice(insertIndex, 0, { title: title.trim() });
        }
      }

      setTreeData(copy);
    },
    [treeData]
  );

  const handleEditPosition = useCallback(
    (path: number[], newTitle: string) => {
      if (!newTitle.trim()) return;
      const copy: OrgNode[] = JSON.parse(JSON.stringify(treeData));
      const findNode = (arr: OrgNode[], p: number[]): OrgNode | null => {
        let node: OrgNode | undefined = arr[0];
        for (const idx of p) {
          if (!node || !node.children || !node.children[idx]) return null;
          node = node.children[idx];
        }
        return node ?? null;
      };
      const node = findNode(copy, path);
      if (node) {
        node.title = newTitle.trim();
        setTreeData(copy);
      }
    },
    [treeData]
  );

  const handleDeletePosition = useCallback(
    (path: number[]) => {
      if (path.length === 0) return; // avoid removing root
      const copy: OrgNode[] = JSON.parse(JSON.stringify(treeData));
      const parentPath = path.slice(0, -1);
      const index = path[path.length - 1];

      const findNode = (arr: OrgNode[], p: number[]): OrgNode | null => {
        let node: OrgNode | undefined = arr[0];
        for (const idx of p) {
          if (!node || !node.children || !node.children[idx]) return null;
          node = node.children[idx];
        }
        return node ?? null;
      };

      // When we remove a node from the parent's children array,
      // all of its children (sub-components) are automatically removed as well
      // since they are part of the node's children property
      const parent = findNode(copy, parentPath);
      if (parent && parent.children) {
        parent.children.splice(index, 1);
        setTreeData(copy);
      }
    },
    [treeData]
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = () => {
    // Handle final submission here
    alert("اطلاعات با موفقیت ثبت شد!");
    handleReset();
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        p: 3,
        bgcolor: "var(--color-evalchi-background)",
      }}
    >
      <StepHeader steps={steps} activeStep={activeStep} />
      <Paper
        elevation={0}
        sx={{
          p: 4,
          height: "calc(100% - 120px)",
          borderRadius: "16px",
          border: "2px solid var(--color-evalchi-border)",
          backgroundColor: "transparent",
          mt: 3,
        }}
      >
        {/* Step Content */}
        <Box sx={{ flexGrow: 1, mb: 3 }}>
          <StepContent
            activeStep={activeStep}
            treeData={treeData}
            onAddPosition={handleAddPosition}
            onEditPosition={handleEditPosition}
            onDeletePosition={handleDeletePosition}
            onOpenHelp={() => setHelpOpen(true)}
            organizationOptions={organizationOptions}
            guideData={guideData}
            setHelpOpen={setHelpOpen}
          />
        </Box>

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 2,
            paddingTop: "20px",
          }}
        >
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            size="large"
            sx={{
              borderColor: "black",
              color: "black",
              fontWeight: 600,
              padding: "8px 32px",
              borderRadius: "8px",
              fontSize: "16px",
              minWidth: "120px",
              transition: "all 0.3s ease",
              "&:hover": {
                color: "var(--color-primary-dark)",
                borderColor: "var(--color-primary-dark)",
                backgroundColor: "transparent",
              },
            }}
          >
            قبلی
          </Button>

          <Box sx={{ display: "flex", gap: 2 }}>
            {activeStep === steps.length - 1 ? (
              <>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "var(--color-primary-main)",
                    color: "#000",
                    fontWeight: 600,
                    padding: "8px 32px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    minWidth: "120px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "var(--color-primary-dark)",
                      color: "#fff",
                      opacity: 0.9,
                      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  ثبت
                </Button>
              </>
            ) : (
              <Button
                onClick={handleNext}
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "var(--color-primary-main)",
                  color: "#000",
                  fontWeight: 600,
                  padding: "8px 32px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  minWidth: "120px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "var(--color-primary-dark)",
                    color: "#fff",
                    opacity: 0.9,
                    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                بعدی
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Help Dialog */}
      <Dialog
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        PaperProps={{
          style: {
            borderRadius: 12,
            overflow: "hidden",
            maxWidth: 600,
          },
        }}
      >
        <DialogTitle
          style={{
            background: "var(--color-primary-main)",
            color: "#fff",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 8,
            direction: "rtl",
          }}
        >
          راهنمای استفاده از نمودار سازمانی
        </DialogTitle>
        <DialogContent>
          <div style={{ direction: "rtl", color: "#111827", marginTop: 20 }}>
            <div
              style={{
                marginBottom: 20,
                fontWeight: 700,
                color: "var(--color-primary-main)",
                fontSize: "16px",
              }}
            >
              راهنمای استفاده
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {guideData.map((step, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "12px",
                    backgroundColor: "#f8fafc",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      minWidth: "24px",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <step.icon size={20} color="var(--color-primary-main)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        marginBottom: 4,
                        color: "#1f2937",
                        fontSize: "14px",
                      }}
                    >
                      {step.title}
                    </div>
                    <div
                      style={{
                        color: "#6b7280",
                        fontSize: "13px",
                        lineHeight: 1.5,
                      }}
                    >
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setHelpOpen(false)}
            style={{
              color: "#fff",
              background: "var(--color-primary-main)",
              fontWeight: 600,
              margin: "10px",
            }}
            variant="contained"
          >
            متوجه شدم
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DefinePage;
