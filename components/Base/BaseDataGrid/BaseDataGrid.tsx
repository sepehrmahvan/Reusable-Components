"use client";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { faIR } from "@mui/x-data-grid/locales";
import React, { useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoArrowDownOutline, IoArrowUpOutline } from "react-icons/io5";

// interfaces

interface DataGridRTLProps {
  title: string;
  createButton: boolean;
  buttonText: string;
  columns: GridColDef[];
  rows: any[];
  searchOptions?: Array<{ value: string; label: string }>;
  showSearch?: boolean;
}

interface IPaginationModel {
  page: number;
  pageSize: number;
}

interface ICustomPagination {
  paginationModel: IPaginationModel;
  setPaginationModel: React.Dispatch<React.SetStateAction<IPaginationModel>>;
  totalPages: number;
}

interface ICustomToolbar {
  title: string;
}

interface ICustomSortIcon {
  direction: string;
  handleSortAsc: () => void;
  handleSortDesc: () => void;
}

const BaseDataGrid: React.FC<DataGridRTLProps> = ({
  title,
  createButton,
  buttonText,
  columns,
  rows,
  searchOptions,
  showSearch,
}) => {
  // sorting
  const [ordering, setOrdering] = useState<string>("Id asc");
  const [sortIcon, setSortIcon] = useState<string>("asc");
  // pagination states
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  // Sorting
  const handleSortAsc = () => {
    setSortIcon("asc");
    setOrdering(ordering.split(" ")[0] + " asc");
  };

  const handleSortDesc = () => {
    setSortIcon("desc");
    setOrdering(ordering.split(" ")[0] + " desc");
  };

  const handleSortModelChange = (sortModel: any) => {
    if (sortModel.length === 0) return;
    const { field, sort } = sortModel[0];
    setOrdering(field + " " + sort);
    setSortIcon(sort);
  };

  // Custom Pagination -----------------------------------------------------
  const CustomPagination: React.FC<ICustomPagination> = ({
    paginationModel,
    setPaginationModel,
    totalPages,
  }) => {
    return (
      <div className="box-border flex flex-col justify-end border-t border-gray-300 p-1 pb-3 pl-3 pr-5 sm:flex-row sm:gap-2 sm:pb-0 sm:pr-1 bg-evalchi-background">
        <div className="flex items-center self-start sm:self-center">
          <span className="text-xs sm:text-sm">تعداد در هر صفحه:</span>
          {/* Page Size Selector */}
          <FormControl sx={{ m: 1, minWidth: 50 }} size="small">
            <Select
              labelId="filter-type"
              id="first-name-filter-type"
              className="rounded-lg bg-inherit px-0 py-2"
              value={paginationModel.pageSize}
              onChange={(e: any) =>
                setPaginationModel((previousModel: any) => ({
                  ...previousModel,
                  pageSize: +e.target.value,
                }))
              }
              sx={{
                maxHeight: 34,
                fontSize: 14,
              }}
            >
              <MenuItem value="5" sx={{ fontSize: 14 }}>
                5
              </MenuItem>
              <MenuItem value="10" sx={{ fontSize: 14 }}>
                10
              </MenuItem>
              <MenuItem value="20" sx={{ fontSize: 14 }}>
                20
              </MenuItem>
              <MenuItem value="30" sx={{ fontSize: 14 }}>
                30
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <ul className="flex items-center gap-2 self-end sm:self-center">
          <li>
            <button
              disabled={paginationModel.page + 1 === 1}
              className="flex h-9 w-9 items-center justify-center disabled:opacity-40"
              onClick={() =>
                setPaginationModel((previousModel: any) => ({
                  ...previousModel,
                  page: paginationModel.page - 1,
                }))
              }
            >
              <BiChevronRight size={28} />
            </button>
          </li>
          <li>
            {paginationModel.page + 1} از {totalPages}
          </li>
          <li>
            <button
              disabled={paginationModel.page + 1 === totalPages}
              className="flex h-9 w-9 items-center justify-center bg-transparent disabled:opacity-40"
              onClick={() =>
                setPaginationModel((previousModel: any) => ({
                  ...previousModel,
                  page: paginationModel.page + 1,
                }))
              }
            >
              <BiChevronLeft size={28} />
            </button>
          </li>
        </ul>
      </div>
    );
  };

  // table toolbar
  const CustomToolbar: React.FC<ICustomToolbar> = ({ title }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedSearchOption, setSelectedSearchOption] = useState("all");

    // Test options for demonstration
    const testOptions = [
      { value: "all", label: "همه فیلدها" },
      { value: "name", label: "نام" },
      { value: "email", label: "ایمیل" },
      { value: "phone", label: "شماره تماس" },
      { value: "address", label: "آدرس" },
      { value: "date", label: "تاریخ" },
    ];

    const handleSearchClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsSearchOpen((prev) => !prev);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    };

    return (
      <div
        className="flex flex-col justify-between gap-2 py-4 sm:flex-row"
        style={{ backgroundColor: "var(--color--evalchi-background)" }}
      >
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="flex items-center gap-2 ml-3">
          {createButton && (
            <Button
              sx={{
                backgroundColor: "var(--color-primary-main)",
                color: "white",
                padding: "0.5rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                "&:hover": {
                  backgroundColor: "var(--color-primary-dark)",
                },
              }}
              className="group cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <FiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="relative z-10">{buttonText}</span>
              <div className="absolute inset-0 bg-primary-light rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Button>
          )}

          {/* Search Container */}
          <div className="relative flex items-center gap-2">
            {/* Search Input with Animation */}
            <div
              className={`relative overflow-hidden transition-all duration-500 ease-in-out flex justify-center items-center gap-3 ${
                isSearchOpen ? "w-64 opacity-100" : "w-0 opacity-0"
              }`}
              style={{ minWidth: isSearchOpen ? "256px" : "0px" }}
            >
              <TextField
                variant="outlined"
                size="small"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="جستجو..."
                sx={{
                  marginRight: 0.5,
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--color-primary-main)", // Replace with your organizational color
                    },
                  },
                }}
              />
              <Select
                value={selectedSearchOption}
                onChange={(e) => setSelectedSearchOption(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Select field" }}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--color-primary-main)", // Replace with your organizational color
                    },
                  },
                }}
              >
                <MenuItem value="all" disabled>
                  همه فیلدها
                </MenuItem>
                {searchOptions?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </div>

            {/* Search Button */}
            {showSearch && (
              <Button
                onClick={handleSearchClick}
                type="button"
                sx={{
                  backgroundColor: "transparent",
                  color: "var(--color-primary-main)",
                  borderRadius: "10px",
                }}
              >
                <FaSearch size={20} className="text-gray-600" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  //  custom sort icon
  const CustomSortIcon: React.FC<ICustomSortIcon> = ({
    direction,
    handleSortAsc,
    handleSortDesc,
  }) => {
    return direction === "asc" ? (
      <div>
        <IoArrowUpOutline
          size={18}
          className="transition duration-300 hover:text-blue-600"
          onClick={handleSortAsc}
        />
      </div>
    ) : (
      <div>
        <IoArrowDownOutline
          size={18}
          className="transition duration-300 hover:text-blue-600"
          onClick={handleSortDesc}
        />
      </div>
    );
  };

  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    // Logic to determine if the direction should be RTL
    const direction = document.documentElement.dir;
    setIsRtl(direction === "rtl");
    console.log(direction);
  }, []);

  return (
    <div
      id="datagrid-div"
      className={`relative box-border flex w-full flex-col md:h-full lg:top-0 lg:h-full xl:h-full 2xl:h-full`}
    >
      {/* Grid */}
      <div
        className={`h-full flex-1 overflow-auto transition duration-700 md:mb-0`}
      >
        <CustomToolbar title={title} />
        <DataGrid
          rows={rows}
          rowCount={2}
          columns={columns}
          // loading
          loading={false}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
          checkboxSelection={true}
          disableRowSelectionOnClick
          // filter
          disableColumnFilter
          disableColumnSelector
          disableColumnMenu
          // sort
          sortingMode="server"
          sortingOrder={["desc", "asc"]}
          onSortModelChange={handleSortModelChange}
          // pagination
          pageSizeOptions={[5, 10, 20, 30]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
          slots={{
            columnHeaderSortIcon: () => (
              <CustomSortIcon
                direction={sortIcon}
                handleSortAsc={handleSortAsc}
                handleSortDesc={handleSortDesc}
              />
            ),
            footer: () => (
              <CustomPagination
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
                totalPages={8}
              />
            ),
          }}
          disableColumnResize
          disableAutosize
          sx={{
            "& .MuiDataGrid-cell:focus": {
              outline: "none !important",
            },
            "& .MuiDataGrid-main": {
              outline: "none !important",
              border: "none !important",
            },
            "& .MuiDataGrid-root": {
              borderRadius: "30px",
              fontFamily: "Yekan, Arial, sans-serif !important",
              overflow: "auto",
              outline: "none !important",
              border: "none !important",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "var(--color-evalchi-background)",
              textAlign: "center",
              fontFamily: "Yekan, Arial, sans-serif !important",
              color: "#444",
            },
            "& .MuiDataGrid-columnHeaderTitleContainer": {
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "row-reverse",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "var(--color-evalchi-background)",
            },
            "& .PrivateSwitchBase-input": {
              backgroundColor: "inherit",
              borderRadius: "0",
            },
            "& .MuiTouchRipple-root": {
              borderRadius: "0",
            },
            "& .MuiDataGrid-row--borderBottom": {
              backgroundColor: "var(--color-evalchi-background) !important",
            },
            "& .MuiDataGrid-row--firstVisible .MuiDataGrid-scrollbarFiller.MuiDataGrid-scrollbarFiller--borderTop":
              {
                borderTop: "none",
              },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "var(--color-evalchi-background)",
            },
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: "var(--color-evalchi-background)",
            },
            "& .MuiDataGrid-cell": {
              color: "#444",
              textAlign: isRtl ? "right" : "left",
            },
            "& .MuiButtonBase-root": {
              color: "#444",
              backgroundColor: "inherit",
              padding: "0",
              fontFamily: "Yekan, Arial, sans-serif !important",
              cursor: "pointer",
            },
            "& .MuiList-root": {
              fontFamily: "Yekan, Arial, sans-serif !important",
            },
            "& .MuiButton-icon": {
              marginLeft: "10px",
            },
            "& .MuiToolbar-gutters": {
              backgroundColor: "var(--color-evalchi-background)",
              fontFamily: "Yekan, Arial, sans-serif !important",
            },
            "& .MuiIconButton-colorInherit": {
              backgroundColor: "white",
              border: "2px solid white",
              borderRadius: "5px",
              padding: "0",
              marginRight: "7px",
              cursor: "pointer",
            },
            "& .MuiInputBase-root": {
              fontFamily: "Yekan, Arial, sans-serif !important",
            },
            "& .MuiTablePagination-selectLabel": {
              fontFamily: "Yekan, Arial, sans-serif !important",
            },
            "& .MuiTablePagination-spacer": {
              display: "none",
            },
            "& .MuiDataGrid-columnHeadersInner > .MuiDataGrid-columnHeader": {
              minWidth: "fit-content",
              paddingY: "15px",
            },
            "& .MuiDataGrid-columnHeader:focus-within": {
              outline: "none",
            },
            "& .MuiDataGrid-cell.MuiDataGrid-cell--textLeft:focus-within": {
              outline: "none",
            },
            "& .MuiDataGrid-overlayWrapperInner": {
              position: "fixed",
            },
            "& .MuiDataGrid-overlay": {
              position: "absolute",
            },
            "& .MuiDataGrid-skeletonLoadingOverlay": {
              width: "100%",
            },
          }}
        />
      </div>
    </div>
  );
};

export default BaseDataGrid;
