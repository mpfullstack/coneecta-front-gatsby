/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./DatePicker.module.css"; // get our fontawesome imports

import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDays, addMonths, differenceInMonths, format, isSameDay, lastDayOfMonth, startOfMonth } from "date-fns";
import { es } from 'date-fns/locale';

function capitalise(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function DatePicker({
  endDate,
  selectDate,
  getSelectedDay,
  color,
  labelFormat
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const firstSection = {
    marginLeft: '0'
  };
  const startDate = new Date();
  const lastDate = addDays(startDate, endDate || 90);
  const primaryColor = color || 'rgb(54, 105, 238)';
  const selectedStyle = {
    fontWeight: "bold",
    width: "49px",
    height: "49px",
    borderRadius: "50%",
    border: `2px solid ${primaryColor}`,
    color: primaryColor
  }; // const buttonColor = {background: primaryColor};

  const labelColor = {
    color: primaryColor
  };

  const getStyles = day => {
    if (isSameDay(day, selectedDate)) {
      return selectedStyle;
    }

    return null;
  };

  const getId = day => {
    if (isSameDay(day, selectedDate)) {
      return 'selected';
    } else {
      return "";
    }
  };

  function renderDays() {
    const dayFormat = "E";
    const dateFormat = "d";
    const months = [];
    let days = [];

    for (let i = 0; i <= differenceInMonths(lastDate, startDate); i++) {
      let start, end;
      const month = startOfMonth(addMonths(startDate, i));
      start = i === 0 ? Number(format(startDate, dateFormat, {
        locale: es
      })) - 1 : 0;
      end = i === differenceInMonths(lastDate, startDate) ? Number(format(lastDate, "d")) : Number(format(lastDayOfMonth(month), "d"));

      for (let j = start; j < end; j++) {
        days.push( /*#__PURE__*/React.createElement("div", {
          id: `${getId(addDays(startDate, j))}`,
          className: styles.dateDayItem,
          style: getStyles(addDays(month, j)),
          key: addDays(month, j),
          onClick: () => onDateClick(addDays(month, j))
        }, /*#__PURE__*/React.createElement("div", {
          className: styles.dayLabel
        }, capitalise(format(addDays(month, j), dayFormat, {
          locale: es
        }))), /*#__PURE__*/React.createElement("div", {
          className: styles.dateLabel
        }, format(addDays(month, j), dateFormat, {
          locale: es
        }))));
      }

      months.push( /*#__PURE__*/React.createElement("div", {
        className: styles.monthContainer,
        key: month
      }, /*#__PURE__*/React.createElement("span", {
        className: styles.monthYearLabel,
        style: labelColor
      }, capitalise(format(month, labelFormat || "MMMM yyyy", {
        locale: es
      }))), /*#__PURE__*/React.createElement("div", {
        className: styles.daysContainer,
        style: i === 0 ? firstSection : null
      }, days)));
      days = [];
    }

    return /*#__PURE__*/React.createElement("div", {
      id: "container",
      className: styles.dateListScrollable
    }, months);
  }

  const onDateClick = day => {
    setSelectedDate(day);

    if (getSelectedDay) {
      getSelectedDay(day);
    }
  };

  useEffect(() => {
    if (getSelectedDay) {
      if (selectDate) {
        getSelectedDay(selectDate);
      } else {
        getSelectedDay(startDate);
      }
    }
  }, []);
  useEffect(() => {
    if (selectDate) {
      if (!isSameDay(selectedDate, selectDate)) {
        setSelectedDate(selectDate);
        setTimeout(() => {
          let view = document.getElementById('selected');

          if (view) {
            view.scrollIntoView({
              behavior: "smooth",
              inline: "center",
              block: "nearest"
            });
          }
        }, 20);
      }
    }
  }, [selectDate]);

  const nextWeek = () => {
    const e = document.getElementById('container');
    const width = e ? e.getBoundingClientRect().width : null;
    e.scrollLeft += width - 60;
  };

  const prevWeek = () => {
    const e = document.getElementById('container');
    const width = e ? e.getBoundingClientRect().width : null;
    e.scrollLeft -= width - 60;
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.buttonWrapper
  }, /*#__PURE__*/React.createElement("button", {
    className: styles.button,
    onClick: prevWeek
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faAngleLeft
  }))), renderDays(), /*#__PURE__*/React.createElement("div", {
    className: styles.buttonWrapper
  }, /*#__PURE__*/React.createElement("button", {
    className: styles.button,
    onClick: nextWeek
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faAngleRight
  }))));
}
/*more pictures
* example code sandbox
* update readme*/