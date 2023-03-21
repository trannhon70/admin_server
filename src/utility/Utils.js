import { DefaultRoute } from "../router/routes";

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

// ** Returns K format from a number
export const kFormatter = (num) =>
  num > 999 ? `${(num / 1000).toFixed(1)}k` : num;

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, "");

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date();
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value,
  formatting = { month: "short", day: "numeric", year: "numeric" }
) => {
  if (!value) return value;
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value);
  let formatting = { month: "short", day: "numeric" };

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" };
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem("userData");
export const getUserData = () => JSON.parse(localStorage.getItem("userData"));

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole) => {
  if (userRole === "admin") return DefaultRoute;
  if (userRole === "client") return "/access-control";
  return "/login";
};

// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#7367f01a", // for option hover bg-color
    primary: "#7367f0", // for selected option bg-color
    neutral10: "#7367f0", // for tags bg-color
    neutral20: "#ededed", // for input border-color
    neutral30: "#ededed", // for input hover border-color
  },
});

export const TYPE_TASK = {
  NOT_URGENT_NOT_IMPORTANT: "not_urgent_not_important",
  NOT_URGENT_IMPORTANT: "not_urgent_important",
  URGENT_NOT_IMPORTANT: "urgent_not_important",
  URGENT_IMPORTANT: "urgent_important",
};

export const typeTaskOption = [
  {
    label: "Không khẩn cấp và không quan trọng",
    value: TYPE_TASK.NOT_URGENT_NOT_IMPORTANT,
  },
  {
    label: "Không khẩn cấp và quan trọng",
    value: TYPE_TASK.NOT_URGENT_IMPORTANT,
  },
  {
    label: "Khẩn cấp và không quan trọng",
    value: TYPE_TASK.URGENT_NOT_IMPORTANT,
  },
  {
    label: "Khẩn cấp và quan trọng",
    value: TYPE_TASK.URGENT_IMPORTANT,
  },
];

export const PRIORITY_TASK = {
  LOW: 1,
  NORMAL: 2,
  HIGH: 3,
};

export const priorityTaskOption = [
  {
    label: "Cao",
    value: PRIORITY_TASK.HIGH,
  },
  {
    label: "Bình thường",
    value: PRIORITY_TASK.NORMAL,
  },
  {
    label: "Thấp",
    value: PRIORITY_TASK.LOW,
  },
];

export const CALCULATE_PROCESS_TASK = {
  // Theo % người dùng tự cập nhật
  BY_USER_CUSTOM: 1,
  // Theo tỷ lệ hoàn thành khối lượng công việc
  BY_WORKLOAD_COMPLETE: 2,
  //Theo tỷ lệ hoàn thành đầu việc
  BY_JOB_COMPLETION_RATE: 3,
  // Theo tỷ trọng công việc con
  BY_PROPORTION_OF_CHILDREN_WORK: 4,
};

export const calculateProcessOption = [
  {
    label: "Theo % người dùng tự cập nhật",
    value: CALCULATE_PROCESS_TASK.BY_USER_CUSTOM,
  },
  {
    label: "Theo tỷ lệ hoàn thành khối lượng công việc",
    value: CALCULATE_PROCESS_TASK.BY_WORKLOAD_COMPLETE,
  },
  {
    label: "Theo tỷ lệ hoàn thành đầu việc",
    value: CALCULATE_PROCESS_TASK.BY_JOB_COMPLETION_RATE,
  },
  {
    label: "Theo tỷ trọng công việc con",
    value: CALCULATE_PROCESS_TASK.BY_PROPORTION_OF_CHILDREN_WORK,
  },
];
