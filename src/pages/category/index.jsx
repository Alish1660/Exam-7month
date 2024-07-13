import { Button, Pagination } from "@mui/material";
import { CategoryModal } from "@modal";
import { CategoryTable } from "@ui";
import { useEffect, useState } from "react";
import { category } from "../../service";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    limit: 6,
    page: 1,
  });
  const [totalPages, setTotalPages] = useState(0);

  const getData = async () => {
    try {
      const response = await category.get(params);
      if (response.status === 200 && response?.data?.categories) {
        setData(response?.data?.categories);
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
      <CategoryModal open={open} handleClose={() => setOpen(false)} />
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add
          </Button>
        </div>
        <CategoryTable data={data} />
        <Pagination
          count={totalPages}
          page={params.page}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default Index;
