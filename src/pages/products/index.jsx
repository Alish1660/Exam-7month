import { Search } from "@mui/icons-material";
import { Button, Pagination, TextField } from "@mui/material";
import { useState } from "react";
import { ProductsModal } from "@modal";
import { useEffect } from "react";
import productsApi from "../../service/products";
import { ProductsTable } from "@ui";

function Index() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    limit: 6,
    page: 1,
  });
  const [totalPages, setTotalPages] = useState(0);

  const getData = async () => {
    try {
      const response = await productsApi.get(params);
      if (response.status === 200 && response?.data?.products) {
        setData(response?.data?.products);
        const total = response.data.total_count || 0;
        const calculatedTotalPages = Math.ceil(total / params.limit);
        setTotalPages(calculatedTotalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [params]);
  const handleChange = (event, value) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value,
    }));
  };

  return (
    <>
      <ProductsModal open={open} handleClose={() => setOpen(false)} />
      <div className="flex justify-between items-center my-5">
        <div className="w-[400px]">
          <TextField
            variant="outlined"
            placeholder="Search..."
            fullWidth
            InputProps={{
              startAdornment: (
                <Search className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
              ),
              disableUnderline: true,
              style: {
                padding: "4px 36px 4px 12px",
                fontSize: "12px",
                height: "35px",
              },
            }}
          />
        </div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Products
        </Button>
      </div>
      <ProductsTable data={data} />
      <div className="my-2">
        <Pagination
          count={totalPages}
          page={params.page}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default Index;
