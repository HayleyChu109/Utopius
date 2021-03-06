import { enGB } from "date-fns/locale";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import { useDispatch } from "react-redux";

import { BsArrowRight } from "react-icons/bs";
import { PutStartDate, PutEndDate } from "../../../Redux/announceData/action";
import moment from "moment";
export const DateSelection = ({ startDate, endDate }) => {
  const dispatch = useDispatch();

  const handleStartDate = (e) => {
    if (e && e < endDate) {
      dispatch(PutStartDate(new Date(e)));
    }
  };
  const handleEndDate = (e) => {
    if (e && e > startDate) {
      dispatch(PutEndDate(new Date(e)));
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(e) => handleStartDate(e)}
          onEndDateChange={(e) => handleEndDate(e)}
          minimumLength={1}
          format="dd MMM yyyy"
          locale={enGB}
        >
          {({ startDateInputProps, endDateInputProps, focus }) => (
            <div className="date-range">
              <input
                className={
                  "input mx-2 mt-4" + (focus === START_DATE ? " -focused" : "")
                }
                {...startDateInputProps}
                placeholder="Start date"
                value={moment(startDate).format("DD-MM-YYYY")}
              />
              <BsArrowRight />
              <input
                className={
                  "input mx-2 mt-4" + (focus === END_DATE ? " -focused" : "")
                }
                {...endDateInputProps}
                placeholder="End date"
                value={moment(endDate).format("DD-MM-YYYY")}
              />
            </div>
          )}
        </DateRangePicker>
      </div>
    </>
  );
};
