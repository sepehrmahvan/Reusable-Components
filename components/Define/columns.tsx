import { GridColDef } from "@mui/x-data-grid";
import { BiPencil } from "react-icons/bi";
import { FiEye } from "react-icons/fi";

export const generateColumns = (): GridColDef[] => {
  return [
    {
      field: "positionTitle",
      minWidth: 150,
      headerName: "عنوان نقش",
      flex: 1,
      sortable: true,
      renderHeader: () => (
        <div
          style={{ fontSize: "0.75rem" }}
          className="relative flex w-full items-center justify-center"
        >
          <div className="text-lg mr-3">عنوان نقش</div>
        </div>
      ),
    },
    {
      field: "positionDescription",
      minWidth: 150,
      headerName: "توضیحات نقش",
      flex: 1,
      sortable: true,
      renderHeader: () => (
        <div
          style={{ fontSize: "0.75rem" }}
          className="relative flex w-full items-center justify-center"
        >
          <div className="text-lg mr-3">توضیحات نقش</div>
        </div>
      ),
    },
    {
      field: "actions",
      minWidth: 100,
      headerName: "",
      sortable: false,
      renderCell: (params: any) => {
        return (
          <div className="mx-auto mt-4 flex justify-center gap-2 focus-visible:ring-0">
            <button
              onClick={() => {}}
              title="حذف"
              className="text-evalchi-border hover:text-primary-main cursor-pointer"
            >
              <FiEye size={20} />

            </button>
            <button title="ویرایش" className="text-[#3F8CFD] hover:text-blue-800 cursor-pointer">
              <BiPencil size={20} />
            </button>
          </div>
        );
      },
    },
  ];
};
