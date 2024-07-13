import { Button, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { WorkersModal } from "@modal";
import { WorkersTable } from "@ui";
import workers from "../../service/workers";

function Index() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
  });
  const [totalPages, setTotalPages] = useState(0);

  const getData = async () => {
    try {
      const response = await workers.get(params);
      if (response.status === 200 && response?.data?.user) {
        setData(response?.data?.user);
        const total = response?.data?.totcal_count || 0;
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
      <WorkersModal open={open} handleClose={() => setOpen(false)} />
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Worker
          </Button>
        </div>
        <WorkersTable data={data} />
      </div>
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
