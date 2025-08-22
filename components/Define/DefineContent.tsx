import { Box, Typography } from "@mui/material";
import TreeChart from "../TreeChart/page";
import { data, OrgNode } from "@/utils/data";
import { generateColumns } from "./columns";
import BaseDataGrid from "../Base/BaseDataGrid/BaseDataGrid";

// Function to flatten the tree structure
const flattenTree = (nodes: OrgNode[]) => {
  const flatArray: OrgNode[] = [];
  const traverse = (node: OrgNode) => {
    flatArray.push(node);
    if (node.children) {
      node.children.forEach(traverse);
    }
  };
  nodes.forEach(traverse);
  return flatArray;
};

const searchOptions = [
  { value: "title", label: "عنوان نقش" },
  { value: "description", label: "توضیحات نقش" },
];

// Step content component
const StepContent = ({
    activeStep,
    treeData,
    onAddPosition,
    onEditPosition,
    onDeletePosition,
    onOpenHelp,
    organizationOptions,
    guideData,
    setHelpOpen,
    onRequestDelete,
    onRequestEdit,
  }: {
    activeStep: number;
    treeData: OrgNode[];
    organizationOptions: any;
    guideData: any;
    onAddPosition: (
      pos: "top" | "right" | "bottom" | "left",
      nodeId: string,
      title: string
    ) => void;
    onEditPosition: (nodeId: string, newTitle: string, newDescription: string) => void;
    onDeletePosition: (nodeId: string) => void;
    onOpenHelp: () => void;
    setHelpOpen: (helpOpen: boolean) => void;
    onRequestDelete?: (id: string) => void;
    onRequestEdit?: (id: string) => void;
  }) => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ height: "100&", width: "100%" }}>
            {/* Zoom controls */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-gray-200 pb-4">
          <h5 className="text-black font-bold text-[16px]">
            تعریف نمودار سازمانی
          </h5>
          <button
            className="text-evalchi-border hover:text-primary-main cursor-pointer font-bold"
            onClick={() => setHelpOpen(true)}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            راهنما
          </button>
        </div>
            <TreeChart
              data={treeData}
              onAddPosition={onAddPosition}
              onEditPosition={onEditPosition}
              onDeletePosition={onDeletePosition}
              organizationOptions={organizationOptions}
              guideData={guideData}
              onOpenHelp={onOpenHelp}
            />
          </Box>
        );
      case 1:
        return (
          <BaseDataGrid
            title="نقش های سازمانی"
            createButton={true}
            buttonText="ایجاد نقش جدید"
            // @ts-ignore
            columns={generateColumns(onRequestDelete, onRequestEdit)}
            rows={flattenTree(treeData)} // Changed to treeData
            searchOptions={searchOptions}
            showSearch={true}
          />
        );
      default:
        return <Typography>مرحله نامعلوم</Typography>;
    }
  };

  export default StepContent;