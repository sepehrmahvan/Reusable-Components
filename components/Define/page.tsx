"use client";
import { guideData, data as initialData, type OrgNode, generateObjectId, findNodeById, findParentById, logTreeWithIds } from "@/utils/data";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    TextField,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
} from "@mui/material";
import { useCallback, useState } from "react";
import { IoChevronDownOutline, IoCloseCircleOutline } from "react-icons/io5";
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
];

const DefinePage = () => {
  const [treeData, setTreeData] = useState<OrgNode[]>(initialData);
  const [activeStep, setActiveStep] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editNodeId, setEditNodeId] = useState<string | null>(null);


  const handleAddPosition = useCallback(
    (
      pos: "top" | "right" | "bottom" | "left",
      nodeId: string,
      title: string
    ) => {
      if (!title.trim()) return;
      const copy: OrgNode[] = JSON.parse(JSON.stringify(treeData));

      const newNode: OrgNode = { 
        id: generateObjectId(), 
        title: title.trim() 
      };

      console.log('Adding node:', { pos, nodeId, title, newNodeId: newNode.id });

      if (pos === "bottom") {
        // Add as child of the target node
        const addChildToNode = (nodes: OrgNode[]): boolean => {
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === nodeId) {
              nodes[i].children = nodes[i].children || [];
              nodes[i].children!.push(newNode);
              console.log('Added as child to node:', nodes[i].title);
              return true;
            }
            if (nodes[i].children) {
              if (addChildToNode(nodes[i].children!)) {
                return true;
              }
            }
          }
          return false;
        };
        
        const success = addChildToNode(copy);
        if (!success) {
          console.log('Target node not found for ID:', nodeId);
        }
      } else if (pos === "right") {
        // Add as next sibling
        const parent = findParentById(copy, nodeId);
        console.log('Parent node for right:', parent);
        if (parent) {
          parent.children = parent.children || [];
          const targetIndex = parent.children.findIndex(child => child.id === nodeId);
          console.log('Target index in parent:', targetIndex);
          if (targetIndex !== -1) {
            parent.children.splice(targetIndex + 1, 0, newNode);
            console.log('Added as next sibling');
          }
        } else {
          // If no parent found, it's a root level node
          const targetIndex = copy.findIndex(node => node.id === nodeId);
          console.log('Target index in root:', targetIndex);
          if (targetIndex !== -1) {
            copy.splice(targetIndex + 1, 0, newNode);
            console.log('Added as next sibling at root level');
          }
        }
      } else if (pos === "left" || pos === "top") {
        // Add as previous sibling
        const parent = findParentById(copy, nodeId);
        console.log('Parent node for left/top:', parent);
        if (parent) {
          parent.children = parent.children || [];
          const targetIndex = parent.children.findIndex(child => child.id === nodeId);
          console.log('Target index in parent:', targetIndex);
          if (targetIndex !== -1) {
            parent.children.splice(targetIndex, 0, newNode);
            console.log('Added as previous sibling');
          }
        } else {
          // If no parent found, it's a root level node
          const targetIndex = copy.findIndex(node => node.id === nodeId);
          console.log('Target index in root:', targetIndex);
          if (targetIndex !== -1) {
            copy.splice(targetIndex, 0, newNode);
            console.log('Added as previous sibling at root level');
          }
        }
      }
      logTreeWithIds(copy);
      setTreeData(copy);
    },
    [treeData]
  );

  const handleEditPosition = useCallback(
    (nodeId: string, newTitle: string, newDescription: string) => {
      if (!newTitle.trim()) return;
      const copy: OrgNode[] = JSON.parse(JSON.stringify(treeData));
      const node = findNodeById(copy, nodeId);
      if (node) {
        node.title = newTitle.trim();
        setTreeData(copy);
      }
    },
    [treeData]
  );

  const handleDeletePosition = useCallback(
    (nodeId: string) => {
      const copy: OrgNode[] = JSON.parse(JSON.stringify(treeData));
      
      // Don't allow deleting root nodes
      if (copy.length === 1 && copy[0].id === nodeId) return;
      
      const parent = findParentById(copy, nodeId);
      if (parent && parent.children) {
        const index = parent.children.findIndex(child => child.id === nodeId);
        if (index !== -1) {
          parent.children.splice(index, 1);
          setTreeData(copy);
        }
      } else {
        // If no parent found, it's a root level node
        const index = copy.findIndex(node => node.id === nodeId);
        if (index !== -1) {
          copy.splice(index, 1);
          setTreeData(copy);
        }
      }
    },
    [treeData]
  );

  const handleOpenDeleteModal = (id: string) => {
    setSelectedNodeId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedNodeId) {
      handleDeletePosition(selectedNodeId);
    }
    setDeleteModalOpen(false);
    setSelectedNodeId(null);
  };

  const handleOpenEditModal = (id: string) => {
    setSelectedNodeId(id);
    setEditNodeId(id);
    const node = findNodeById(treeData, id);
    if (node) {
      setEditTitle(node.title);
    }
    setEditModalOpen(true);
  };

  const handleEditConfirm = () => {
    if (editNodeId && editTitle.trim()) {
      handleEditPosition(editNodeId, editTitle.trim(), editDescription);
    }
    setEditModalOpen(false);
    setSelectedNodeId(null);
    setEditNodeId(null);
    setEditTitle("");
    setEditDescription("");
  };

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
            onRequestDelete={handleOpenDeleteModal}
            onRequestEdit={handleOpenEditModal}
          />
        </Box>

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 3,
            paddingTop: "24px",
            paddingBottom: "16px",
          }}
        >
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            size="large"
            sx={{
              borderColor: "var(--color-evalchi-border)",
              color: "var(--color-evalchi-border)",
              fontWeight: 700,
              padding: "12px 36px",
              borderRadius: "12px",
              fontSize: "16px",
              minWidth: "140px",
              height: "48px",
              borderWidth: "2px",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255, 167, 36, 0.1), transparent)",
                transition: "left 0.5s",
              },
              "&:hover": {
                color: "var(--color-primary-main)",
                borderColor: "var(--color-primary-main)",
                backgroundColor: "rgba(255, 167, 36, 0.05)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(255, 167, 36, 0.2)",
                "&:before": {
                  left: "100%",
                },
              },
              "&:active": {
                transform: "translateY(0px)",
                boxShadow: "0 4px 15px rgba(255, 167, 36, 0.15)",
              },
              "&.Mui-disabled": {
                borderColor: "#E5E7EB",
                color: "#9CA3AF",
                backgroundColor: "#F9FAFB",
              },
            }}
          >
            قبلی
          </Button>

          <Box sx={{ display: "flex", gap: 3 }}>
            {activeStep === steps.length - 1 ? (
              <>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  size="large"
                  sx={{
                    background: "linear-gradient(135deg, var(--color-primary-main) 0%, var(--color-primary-dark) 100%)",
                    color: "#000",
                    fontWeight: 700,
                    padding: "12px 36px",
                    borderRadius: "12px",
                    fontSize: "16px",
                    minWidth: "140px",
                    height: "48px",
                    boxShadow: "0 8px 25px rgba(255, 167, 36, 0.3)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                      transition: "left 0.5s",
                    },
                    "&:hover": {
                      background: "linear-gradient(135deg, var(--color-primary-dark) 0%, #B3741A 100%)",
                      color: "#fff",
                      transform: "translateY(-3px)",
                      boxShadow: "0 12px 35px rgba(255, 167, 36, 0.4)",
                      "&:before": {
                        left: "100%",
                      },
                    },
                    "&:active": {
                      transform: "translateY(-1px)",
                      boxShadow: "0 6px 20px rgba(255, 167, 36, 0.3)",
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
                  background: "var(--color-primary-main)",
                  color: "#000",
                  fontWeight: 700,
                  padding: "12px 36px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  minWidth: "140px",
                  height: "48px",
                  boxShadow: "0 8px 25px rgba(255, 167, 36, 0.3)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "var(--color-primary-main)",
                    transition: "left 0.5s",
                  },
                  "&:hover": {
                    background: "linear-gradient(135deg, var(--color-primary-dark) 0%, #B3741A 100%)",
                    color: "#fff",
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 35px rgba(255, 167, 36, 0.4)",
                    "&:before": {
                      left: "100%",
                    },
                  },
                  "&:active": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 6px 20px rgba(255, 167, 36, 0.3)",
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        PaperProps={{ style: { width: 450, borderRadius: "8px" } }}
      >
        <DialogTitle>
          <div className="flex items-center gap-2 justify-between border-b-2 border-gray-200 pb-[24px]">
            <h3>حذف پوزیشن</h3>
            <button
              className="cursor-pointer hover:text-primary-main"
              onClick={() => setDeleteModalOpen(false)}
            >
              <IoCloseCircleOutline size={32} />
            </button>
          </div>
        </DialogTitle>
        <DialogContent>
          <div style={{ direction: "rtl", color: "#111827", marginTop: 10 }}>
            <div style={{ marginBottom: 16, fontSize: "16px", fontWeight: 500 }}>
              آیا از حذف این پوزیشن مطمئن هستید؟
            </div>
            <div style={{ 
              backgroundColor: "#fef2f2", 
              border: "1px solid #fecaca", 
              borderRadius: "8px", 
              padding: "12px",
              fontSize: "14px",
              color: "#991b1b"
            }}>
              <strong>توجه:</strong> با حذف این پوزیشن، تمام زیرمجموعه‌های آن نیز حذف خواهند شد.
            </div>
          </div>
        </DialogContent>
        <DialogActions sx={{ display: "flex", gap: "10px" }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              padding: "8px 22px",
              borderColor: "var(--color-primary-main)",
              color: "var(--color-primary-main)",
              fontWeight: 600,
            }}
            onClick={() => setDeleteModalOpen(false)}
          >
            انصراف
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={{
              padding: "8px 22px",
              backgroundColor: "var(--color-primary-main)",
              color: "#fff",
              fontWeight: 600,
            }}
            onClick={handleConfirmDelete}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        PaperProps={{ style: { width: 450, borderRadius: "8px" } }}
      >
        <DialogTitle>
          <div className="flex items-center gap-2 justify-between border-b-2 border-gray-200 pb-[24px]">
            <h3>ویرایش عنوان پوزیشن</h3>
            <button
              className="cursor-pointer hover:text-primary-main"
              onClick={() => setEditModalOpen(false)}
            >
              <IoCloseCircleOutline size={32} />
            </button>
          </div>
        </DialogTitle>
        <DialogContent>
          <InputLabel
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#000",
              marginY: "15px",
            }}
          >
            انتخاب سمت
          </InputLabel>
          <FormControl fullWidth size="small">
            <Select
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value as string)}
              displayEmpty
              sx={{
                "& .MuiSelect-icon": { display: "none" },
                "& .MuiSelect-select": {
                  paddingRight: "0 !important",
                  paddingLeft: "12px",
                },
                "& .MuiInputBase-root-gGAOSs": {
                  paddingRight: "0 !important",
                  paddingLeft: "0 !important",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    "& .MuiMenuItem-root .MuiSvgIcon-root": { display: "none" },
                  },
                },
              }}
              input={
                <OutlinedInput
                  endAdornment={
                    <InputAdornment position="end" sx={{ px: 1 }}>
                      <IoChevronDownOutline size={20} />
                    </InputAdornment>
                  }
                />
              }
              renderValue={(selected) =>
                selected ? (selected as string) : "انتخاب سمت"
              }
            >
              <MenuItem value="" disabled>
                انتخاب سمت
              </MenuItem>
              {organizationOptions.map((option, index) => (
                <MenuItem key={index} value={option.title}>
                  {option.title}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="توضیحات نقش"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              sx={{
                marginTop: "15px",
              }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ display: "flex", gap: "10px" }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              padding: "8px 22px",
              borderColor: "var(--color-primary-main)",
              color: "var(--color-primary-main)",
              fontWeight: 600,
            }}
            onClick={() => setEditModalOpen(false)}
          >
            انصراف
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={{
              padding: "8px 22px",
              backgroundColor: "var(--color-primary-main)",
              color: "#fff",
              fontWeight: 600,
            }}
            onClick={handleEditConfirm}
          >
            ثبت
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DefinePage;
