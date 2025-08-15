"use client";
import type { GuideStep, OrgNode } from "@/utils/data";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IoChevronDownOutline, IoCloseCircleOutline } from "react-icons/io5";

type NodeLabelProps = {
  title: string;
  path: number[];
  onAdd: (pos: "top" | "right" | "bottom" | "left", path: number[]) => void;
  onAction?: (action: "edit" | "delete", path: number[]) => void;
  isActive?: boolean;
  onOpenOverlay?: (path: number[]) => void;
};

type TreeChartProps = {
  data: OrgNode[];
  onAddPosition: (
    pos: "top" | "right" | "bottom" | "left",
    path: number[],
    title: string
  ) => void;
  onEditPosition: (path: number[], newTitle: string) => void;
  onDeletePosition: (path: number[]) => void;
  organizationOptions: { title: string }[];
  guideData?: GuideStep[];
  onOpenHelp?: () => void;
};

const NodeLabel = React.forwardRef<HTMLDivElement, NodeLabelProps>(
  ({ title, path, onAdd, onAction, isActive = false, onOpenOverlay }, ref) => {
    const [PlusIcon, setPlusIcon] = useState<React.ComponentType<{
      size?: number;
    }> | null>(null);
    // overlay visibility is controlled by parent via isActive

    useEffect(() => {
      let mounted = true;
      import("react-icons/ai")
        .then((mod) => {
          if (mounted) setPlusIcon(() => mod.AiOutlinePlus);
        })
        .catch(() => {
          // fallback handled below
        });
      return () => {
        mounted = false;
      };
    }, []);

    // outside click handling managed by parent

    const handleAdd = (pos: "top" | "right" | "bottom" | "left") => {
      onAdd(pos, path);
    };

    const buttonBase: React.CSSProperties = {
      width: 20,
      height: 20,
      borderRadius: "50%",
      border: "none",
      background: "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      padding: 0,
    };

    const labelBoxStyle: React.CSSProperties = {
      position: "relative",
      padding: "0 24px",
      background: "#ffffff",
      borderTop: "6px solid var(--color-primary-main)",
      borderRadius: 8,
      boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
      fontSize: 14,
      color: "#111827",
      width: 200,
      minWidth: 200,
      maxWidth: 200,
      textAlign: "center",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      wordBreak: "keep-all",
      direction: "rtl",
      height: 87,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    };

    return (
      <div ref={ref} className="node-label" style={{ display: "inline-block" }}>
        <div style={labelBoxStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button
              aria-label="add-top"
              onClick={() => handleAdd("top")}
              style={{ ...buttonBase, margin: 0 }}
              className="icon-btn"
            >
              {PlusIcon ? <PlusIcon size={14} /> : "+"}
            </button>
            {/* Title row with side buttons touching the title */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0,
                paddingInline: 0,
                width: "100%",
              }}
            >
              <button
                aria-label="add-left"
                onClick={() => handleAdd("right")}
                style={{ ...buttonBase, flex: "0 0 auto", margin: 0 }}
                className="icon-btn"
              >
                {PlusIcon ? <PlusIcon size={14} /> : "+"}
              </button>
              {/* position title */}
              <button
                title={title}
                style={{
                  flex: "1 1 auto",
                  minWidth: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  margin: 0,
                  padding: "6px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                className="hover:text-primary-main cursor-pointer font-[600] text-[14px]"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenOverlay && onOpenOverlay(path);
                }}
              >
                {title}
              </button>
              <button
                aria-label="add-right"
                onClick={() => handleAdd("left")}
                style={{ ...buttonBase, flex: "0 0 auto", margin: 0 }}
                className="icon-btn"
              >
                {PlusIcon ? <PlusIcon size={14} /> : "+"}
              </button>
            </div>
            <button
              aria-label="add-bottom"
              onClick={() => handleAdd("bottom")}
              style={{ ...buttonBase, margin: 0 }}
              className="icon-btn"
            >
              {PlusIcon ? <PlusIcon size={14} /> : "+"}
            </button>
            {isActive && (
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  borderRadius: 8,
                }}
              >
                {/* Delete on the left */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAction && onAction("delete", path);
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fff",
                    border: "1px solid #ef4444",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  aria-label="delete"
                >
                  <AiOutlineDelete size={18} color="#ef4444" />
                </button>
                {/* Edit on the right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAction && onAction("edit", path);
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fff",
                    border: "1px solid #10b981",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  aria-label="edit"
                >
                  <AiOutlineEdit size={18} color="#10b981" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
NodeLabel.displayName = "NodeLabel";

type OrgChartModule = typeof import("react-organizational-chart");

function renderChildren(
  org: OrgChartModule,
  node: OrgNode,
  path: number[] = [],
  onAdd?: (pos: "top" | "right" | "bottom" | "left", path: number[]) => void,
  onAction?: (action: "edit" | "delete", path: number[]) => void,
  activePath?: number[] | null,
  onOpenOverlay?: (path: number[]) => void
): React.ReactNode {
  if (!node.children || node.children.length === 0) {
    return null;
  }

  return node.children.map((child, index) => (
    <org.TreeNode
      key={`${node.title}-${index}`}
      label={
        <NodeLabel
          title={child.title}
          path={[...path, index]}
          onAdd={(pos, p) => onAdd && onAdd(pos, p)}
          onAction={onAction}
          isActive={
            activePath
              ? JSON.stringify(activePath) === JSON.stringify([...path, index])
              : false
          }
          onOpenOverlay={onOpenOverlay}
        />
      }
    >
      {renderChildren(
        org,
        child,
        [...path, index],
        onAdd,
        onAction,
        activePath,
        onOpenOverlay
      )}
    </org.TreeNode>
  ));
}

const TreeChart: React.FC<TreeChartProps> = ({
  data,
  onAddPosition,
  onEditPosition,
  onDeletePosition,
  organizationOptions,
  guideData = [],
  onOpenHelp,
}) => {
  const root: OrgNode | undefined = data[0];
  const [org, setOrg] = useState<OrgChartModule | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const rootLabelRef = useRef<HTMLDivElement>(null);
  const hasScrolledRef = useRef<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [helpOpen, setHelpOpen] = useState<boolean>(false);

  const handleOpenHelp = () => {
    if (onOpenHelp) {
      onOpenHelp();
    } else {
      setHelpOpen(true);
    }
  };
  const [HelpIcon, setHelpIcon] = useState<React.ComponentType<{
    size?: number;
  }> | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [pendingAdd, setPendingAdd] = useState<{
    pos: "top" | "right" | "bottom" | "left";
    path: number[];
  } | null>(null);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [editPath, setEditPath] = useState<number[] | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [deletePath, setDeletePath] = useState<number[] | null>(null);
  const [activeOverlayPath, setActiveOverlayPath] = useState<number[] | null>(
    null
  );

  useEffect(() => {
    let mounted = true;
    import("react-organizational-chart").then((mod) => {
      if (mounted) setOrg(mod);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (org && !hasScrolledRef.current) {
      hasScrolledRef.current = true;
      requestAnimationFrame(() => {
        // Scroll the container so the root label is visible at the top
        rootLabelRef.current?.scrollIntoView({
          block: "start",
          inline: "center",
        });
      });
    }
  }, [org]);

  useEffect(() => {
    let mounted = true;
    import("react-icons/ai")
      .then((mod) => {
        if (mounted) setHelpIcon(() => mod.AiOutlineQuestionCircle);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  if (!root) {
    return <div>No data</div>;
  }

  const getNodeByPath = (arr: OrgNode[], p: number[]): OrgNode | null => {
    let node: OrgNode | undefined = arr[0];
    for (const idx of p) {
      if (!node || !node.children || !node.children[idx]) return null;
      node = node.children[idx];
    }
    return node ?? null;
  };

  const getNodeTitleByPath = (arr: OrgNode[], p: number[]): string => {
    const n = getNodeByPath(arr, p);
    return n?.title ?? "";
  };

  return (
    <div
      className="bg-evalchi-background w-full h-full max-h-[100%] overflow-auto p-0 relative"
      style={{
        direction: "ltr",
      }}
      ref={scrollContainerRef}
      onMouseDown={(e) => {
        // close overlay if clicked outside any node label
        const target = e.target as HTMLElement;
        const isInsideNode = target.closest(".node-label");
        if (!isInsideNode) {
          setActiveOverlayPath(null);
        }
      }}
    >
      {/* Edit dialog */}
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        PaperProps={{ style: { width: 450, borderRadius: "8px" } }}
      >
        <DialogTitle>
          <div className="flex items-center gap-2 justify-between border-b-2 border-gray-200 pb-[24px]">
            <h3>ویرایش عنوان پوزیشن</h3>
            <button
              className="cursor-pointer hover:text-primary-main"
              onClick={() => setEditOpen(false)}
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
              value={editValue}
              onChange={(e) => setEditValue(e.target.value as string)}
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
            onClick={() => setEditOpen(false)}
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
            onClick={() => {
              if (!editPath) {
                setEditOpen(false);
                return;
              }
              if (!editValue.trim()) {
                setEditOpen(false);
                return;
              }
              onEditPosition(editPath, editValue.trim());
              setEditOpen(false);
            }}
          >
            ثبت
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirm dialog */}
      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        PaperProps={{ style: { width: 450, borderRadius: "8px" } }}
      >
        <DialogTitle>
          <div className="flex items-center gap-2 justify-between border-b-2 border-gray-200 pb-[24px]">
            <h3>حذف پوزیشن</h3>
            <button
              className="cursor-pointer hover:text-primary-main"
              onClick={() => setDeleteOpen(false)}
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
            onClick={() => setDeleteOpen(false)}
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
            onClick={() => {
              if (!deletePath) {
                setDeleteOpen(false);
                return;
              }
              onDeletePosition(deletePath);
              setDeleteOpen(false);
            }}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>
      <div
        style={{
          transformOrigin: "top center",
          display: "inline-block",
        }}
      >
        {org ? (
          <org.Tree
            label={
              <NodeLabel
                ref={rootLabelRef}
                title={root.title}
                path={[]}
                onAdd={(pos, path) => {
                  setPendingAdd({ pos, path });
                  setNewTitle("");
                  setModalOpen(true);
                }}
                onAction={(action, path) => {
                  if (action === "edit") {
                    setEditPath(path);
                    setEditValue(getNodeTitleByPath(data, path));
                    setEditOpen(true);
                  } else if (action === "delete") {
                    setDeletePath(path);
                    setDeleteOpen(true);
                  }
                }}
                isActive={
                  activeOverlayPath ? activeOverlayPath.length === 0 : false
                }
                onOpenOverlay={(path) => setActiveOverlayPath(path)}
              />
            }
            lineWidth={"2px"}
            lineColor={"var(--color-evalchi-border)"}
            lineBorderRadius={"0px"}
          >
            {renderChildren(
              org,
              root,
              [],
              (pos, path) => {
                setPendingAdd({ pos, path });
                setNewTitle("");
                setModalOpen(true);
              },
              (action, path) => {
                if (action === "edit") {
                  setEditPath(path);
                  setEditValue(getNodeTitleByPath(data, path));
                  setEditOpen(true);
                } else if (action === "delete") {
                  setDeletePath(path);
                  setDeleteOpen(true);
                }
              },
              activeOverlayPath,
              (path) => setActiveOverlayPath(path)
            )}
          </org.Tree>
        ) : (
          <div />
        )}
      </div>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        PaperProps={{ style: { width: 450, borderRadius: "8px" } }}
      >
        <DialogTitle>
          <div className="flex items-center gap-2 justify-between border-b-2 border-gray-200 pb-[24px]">
            <h3>تعریف نمودار سازمانی</h3>
            <button
              className="cursor-pointer hover:text-primary-main"
              onClick={() => setModalOpen(false)}
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
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value as string)}
              displayEmpty
              sx={{
                "& .MuiSelect-icon": { display: "none" },
                "& .MuiSelect-select": {
                  paddingRight: "8px",
                  paddingLeft: "12px",
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
            onClick={() => setModalOpen(false)}
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
            onClick={() => {
              if (!pendingAdd || !newTitle.trim()) {
                setModalOpen(false);
                return;
              }
              onAddPosition(pendingAdd.pos, pendingAdd.path, newTitle.trim());
              setModalOpen(false);
            }}
          >
            ثبت
          </Button>
        </DialogActions>
      </Dialog>

      {!onOpenHelp && (
        <Dialog
          open={helpOpen}
          onClose={() => setHelpOpen(false)}
          PaperProps={{
            style: {
              borderRadius: 12,
              overflow: "hidden",
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
            {HelpIcon ? <HelpIcon size={22} /> : null}
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
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
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
      )}
    </div>
  );
};

export default TreeChart;
