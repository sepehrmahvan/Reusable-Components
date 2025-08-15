import { Box, Typography } from "@mui/material";
import TreeChart from "../TreeChart/page";
import { OrgNode } from "@/utils/data";
import { generateColumns } from "./columns";
import BaseDataGrid from "../Base/BaseDataGrid/BaseDataGrid";

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
    setHelpOpen
  }: {
    activeStep: number;
    treeData: OrgNode[];
    organizationOptions: any;
    guideData: any;
    onAddPosition: (
      pos: "top" | "right" | "bottom" | "left",
      path: number[],
      title: string
    ) => void;
    onEditPosition: (path: number[], newTitle: string) => void;
    onDeletePosition: (path: number[]) => void;
    onOpenHelp: () => void;
    setHelpOpen: (helpOpen: boolean) => void;
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
            columns={generateColumns()}
          />
        );
      default:
        return <Typography>مرحله نامعلوم</Typography>;
    }
  };

  export default StepContent;