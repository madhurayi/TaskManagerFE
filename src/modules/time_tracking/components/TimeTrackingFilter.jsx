import { Select } from "@mui/material"

export const TimeTrackingFilter = () => {
  return (
    <div className="flex flex-row h-[50px]">
      <div className="flter text-sm font-bold m-3">
        {"VIEW BY:"}
      </div>
      <div className="m-2">
        <Select
          id="status"
          placeholder="Select Status"
          className="min-w-52 h-10"
        >
        </Select>
      </div>
    </div>
  )
}
