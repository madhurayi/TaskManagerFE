import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { statusOptions } from "../utils/statusOptions";
import { priorities } from "../utils/priorities";

export const Filter = ({ setSelectedPriority, setSelectedStatus }) => {
  const options = [
    { id: 0, value: "Select Status", label: "Select Status" },
    ...statusOptions,
  ];
  const [status, setStatus] = useState(options[0].value);
  const priorityList = [{ id: 0, name: "Select priority" }, ...priorities];
  const [priority, setPriority] = useState(priorityList[0].name);
  return (
    <div className="flex flex-col md:flex-row m-2 ">
      <div className="filter flex text-sm font-bold m-3">
        <FilterAltOutlinedIcon variant="outlined" color="primary" />{" "}
        {"FILTERS: "}
      </div>
      <div className="flex flex-row max-[430px]:flex-col">
        <div className="m-2">
          <Select
            id="status"
            placeholder="Select Status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setSelectedStatus(e.target.value);
            }}
            className="max-[430px]:min-w-52 w-48 h-10"
          >
            {options.map((status) => (
              <MenuItem key={status.id} value={status.value}>
                {status.value}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="m-2">
          <Select
            id="priorities"
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              setSelectedPriority(e.target.value);
            }}
            className="max-[430px]:min-w-52 w-48 h-10"
          >
            {priorityList.map((priority) => (
              <MenuItem key={priority.id} value={priority.name}>
                {priority.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};
