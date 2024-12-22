import veryLow from '../../../assets/veryLow.png';
import low from '../../../assets/low.png';
import medium from '../../../assets/medium.png';
import high from '../../../assets/high.png';
import blocker from '../../../assets/blocker.png';
import SouthOutlinedIcon from "@mui/icons-material/SouthOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpward";
import KeyboardDoubleArrowDownOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";

export const priorities = [
  {
    id: 1,
    name: "Very Low",
    image: veryLow,
    bgColor: "bg-green-200",
    icon: (
      <KeyboardDoubleArrowDownOutlinedIcon
        className="font-bold text-xl"
        fontSize="18"
        color="success"
      />
    ),
    label: (
      <div className="flex align-middle text-center items-center gap-1 bg-green-100 w-fit p-[7px] rounded-2xl">
        <KeyboardDoubleArrowDownOutlinedIcon
          className="font-bold text-xl"
          fontSize="18"
          color="success"
        />
        Very Low
      </div>
    ),
    className: "flex align-middle text-center bg-green-100 w-fit p-[7px] rounded-2xl"
  },
  {
    id: 2,
    name: "Low",
    image: low,
    bgColor: "bg-yellow-200",
    icon: (
      <SouthOutlinedIcon
        className="mt-1 text-sm font-bold"
        fontSize="18"
        color="success"
      />
    ),
    label: (
      <div className="flex align-middle text-center items-center gap-1 bg-green-100 w-fit p-[7px] rounded-2xl">
        <SouthOutlinedIcon
          className="mt-1 text-sm font-bold"
          fontSize="18"
          color="success"
        />
        Low
      </div>
    ),
    className: "flex align-middle text-center items-center gap-1 bg-green-100 w-fit p-[7px] rounded-2xl"
  },
  {
    id: 3,
    name: "Medium",
    image: medium,
    bgColor: "bg-orange-200",
    icon: (
      <ArrowUpwardOutlinedIcon
        className="text-lg pt-[2px] font-bold"
        fontSize="18"
        color="inherit"
      />
    ),
    label: (
      <div className="flex align-middle text-center items-center gap-1 bg-orange-100 w-fit p-[7px] rounded-2xl">
        <ArrowUpwardOutlinedIcon
          className="text-lg pt-[2px] font-bold"
          fontSize="18"
          color="inherit"
        />
        Medium
      </div>
    ),
    className: "flex align-middle text-center bg-orange-100 items-center gap-1 w-fit p-[7px] rounded-2xl"
  },
  {
    id: 4,
    name: "High",
    image: high,
    bgColor: "bg-red-200",
    icon: (
      <KeyboardDoubleArrowDownOutlinedIcon
        className="text-sm mt-[3px] font-bold"
        fontSize="18"
        color="success"
      />
    ),
    label: (
      <div className="flex align-middle text-center items-center gap-1 bg-red-100 w-fit p-[7px] rounded-2xl">
        <KeyboardDoubleArrowDownOutlinedIcon
          className="text-sm mt-[3px] font-bold"
          fontSize="18"
          color="success"
        />
        High
      </div>
    ),
    className: "flex align-middle text-center items-center gap-1 bg-red-100 w-fit p-[7px] rounded-2xl"
  },
  {
    id: 5,
    name: "Blocker",
    image: blocker,
    bgColor: "bg-red-200",
    icon: (
      <BlockOutlinedIcon
        className="text-sm mt-[3px] font-bold"
        fontSize="18"
        color="warning"
      />
    ),
    label: (
      <div className="flex align-middle text-center items-center gap-1 bg-red-100 w-fit p-[7px] rounded-2xl">
        <BlockOutlinedIcon
          className="text-sm mt-[3px] font-bold"
          fontSize="18"
          color="warning"
        />
        Blocker
      </div>
    ),
    className: "flex align-middle text-center bg-red-100 w-fit p-[7px] rounded-2xl"
  },
];