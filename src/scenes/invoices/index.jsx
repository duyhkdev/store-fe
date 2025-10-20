import {
  Box,
  useTheme,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";


const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleEdit = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleSave = () => {
    console.log("Cập nhật dữ liệu:", selectedRow);
    setOpen(false);
  };

  const handleDelete = (id) => {
    console.log("Delete:", id);
    // Thêm xác nhận hoặc gọi API xóa ở đây
  };

  const handleChange = (field, value) => {
    setSelectedRow((prev) => ({ ...prev, [field]: value }));
  };
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
      {/* POPUP CHỈNH SỬA */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Chỉnh sửa dữ liệu</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                label="Phí Ads"
                value={selectedRow.adsCosts}
                onChange={(e) => handleChange("adsCosts", e.target.value)}
              />
              <TextField
                label="Ngày"
                value={selectedRow.createdTime}
                onChange={(e) => handleChange("createdTime", e.target.value)}
              />
              <TextField
                label="Lãi"
                value={selectedRow.sumInterestAmount}
                onChange={(e) =>
                  handleChange("sumInterestAmount", e.target.value)
                }
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Invoices;
