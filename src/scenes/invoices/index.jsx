import { Box, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "adsCosts",
      headerName: "Phí Ads",
      flex: 1,
    },
    {
      field: "createdTime",
      headerName: "Ngày",
      flex: 1,
    },
    {
      field: "sumInterestAmount",
      headerName: "Lãi",
      flex: 1
    },
    {
      field: "actions",
      headerName: "Thao tác",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" gap="10px">
          <IconButton
            onClick={() => handleEdit(params.row.id)}
            sx={{ color: colors.greenAccent[400] }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            sx={{ color: colors.redAccent[400] }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleEdit = (id) => {
    console.log("Edit:", id);
    // 👉 Tại đây bạn có thể mở modal hoặc chuyển route edit
  };

  const handleDelete = (id) => {
    console.log("Delete:", id);
    // 👉 Có thể thêm confirm và gọi API xoá
  };

  return (
    <Box m="20px">
      <Header title="Doanh thu ngày" subtitle="Dữ liệu đúng 99%" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataInvoices} columns={columns} />
      </Box>
    </Box>
  );
};

export default Invoices;
