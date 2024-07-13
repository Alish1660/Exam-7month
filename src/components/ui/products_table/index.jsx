import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { productsApi } from "../../../service";
import { IconButton, Button } from "@mui/material";
import { useRef, useState } from "react";
import axios from "axios";
import { InboxOutlined, DeleteOutlined } from "@mui/icons-material";
import { Notification } from "../../../utils";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(35,137,218,1)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomizedTables = ({ data }) => {
  const [id, setId] = useState("");
  const fileinputRefs = useRef([]);
  const navigate = useNavigate();
  const deleteItem = async (id) => {
    try {
      const response = await productsApi.delete(id);
      if (response.status === 200 || response.status === 201) {
        window.location.reload();
        Notification({
          title: "Deleted Successfuly",
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
      Notification({
        title: "Delete Failed",
        type: "error",
      });
    }
  };
  const handleUpload = async (index) => {
    // console.log(product_id);
    // setId(product_id);
    fileinputRefs.current[index].click();
  };
  const handleUploadChange = async (e, id) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    console.log(formData);
    const access_token = localStorage.getItem("access_token");
    try {
      await axios.post(
        `https://store.go-clothes.uz/v1/media/upload-photo?id=${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T/R</StyledTableCell>
              <StyledTableCell align="center">Product Name</StyledTableCell>
              <StyledTableCell align="center">Color</StyledTableCell>
              <StyledTableCell align="center">Size</StyledTableCell>
              <StyledTableCell align="center">Count</StyledTableCell>
              <StyledTableCell align="center">Cost</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.product_name}
                </StyledTableCell>
                <StyledTableCell align="center">{item.color}</StyledTableCell>
                <StyledTableCell align="center">{item.size}</StyledTableCell>
                <StyledTableCell align="center">{item.count}</StyledTableCell>
                <StyledTableCell align="center">{item.cost}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button onClick={() => deleteItem(item.product_id)}>
                    <DeleteOutlined />
                  </Button>
                  <IconButton onClick={() => handleNavigate(item.product_id)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => handleUpload(index)}>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleUploadChange(e, item.product_id)}
                      ref={(el) => (fileinputRefs.current[index] = el)}
                    />
                    <InboxOutlined />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomizedTables;
