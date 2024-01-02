const calculations = {
  calculatePercentageFilled: (user) => {
    if (!user) return 0;

    const rootFields = [
      "fullName",
      "companyName",
      "email",
      "phone",
      "additionalPhone",
      "url",
      "position",
      "bussinesAddress",
    ];

    const nestedFields = [
      "fullName",
      "phone",
      "email",
      "taxExempt",
      "distance",
    ];

    let filledCount = 0;

    rootFields.forEach((field) => {
      if (user[field] && user[field].trim() !== "") filledCount++;
    });

    ["accounting", "shipping"].forEach((objKey) => {
      if (user[objKey]) {
        nestedFields.forEach((field) => {
          if (
            user[objKey][field] &&
            user[objKey][field].toString().trim() !== ""
          )
            filledCount++;
        });
      }
    });

    const percentage = Math.floor((filledCount / 16) * 100);

    return percentage;
  },
  timeSince: (dateString) => {
    const now = new Date();
    const date = new Date(dateString);

    const seconds = Math.floor((now - date) / 1000);

    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;

    if (seconds < minute) {
      return "now";
    } else if (seconds < hour) {
      return `${Math.floor(seconds / minute)} mins ago`;
    } else if (seconds < day) {
      return `${Math.floor(seconds / hour)} hours ago`;
    } else {
      return `${Math.floor(seconds / day)} days ago`;
    }
  },
};

export default calculations;
