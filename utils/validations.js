const validations = {
  password: (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
      password
    );
    const minLength = 8;

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChars
    );
  },
  email: (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  },
  fullName: (name) => {
    const nameParts = name.trim().split(/\s+/);

    if (nameParts.length < 2) {
      return false;
    }
    for (let part of nameParts) {
      if (!/^[A-Z][a-z]*$/.test(part)) {
        return false;
      }
    }

    return true;
  },
  phone: (phone) => {
    // Regex that admits several common ph# formats
    // ex: (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725
    const pattern =
      /^(\+\d{1,2}\s?)?(\()?(\d{1,4})\)?[-.\s]?(\d{1,4})[-.\s]?(\d{4,7})$/;

    return pattern.test(phone);
  },
  url: (url) => {
    // This regex verifies the mayority of the common urls
    // const pattern = new RegExp(
    //   "^(https?:\\/\\/)?" + // protocol
    //     "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain&subdomain
    //     "((\\d{1,3}\\.){3}\\d{1,3}))" + // IP addy
    //     "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // Port and Route
    //     "(\\?[;&a-z\\d%_.~+=-]*)?" + // Consulting string
    //     "(\\#[-a-z\\d_]*)?$",
    //   "i" // fragment
    // );
    // console.log("url validation: " + pattern.test(url));
    // return pattern.test(url);
    const pattern = new RegExp(
      "^(https?:\\/\\/)+" + // protocol (http o https)
        "(([^:/?#]+)+\\.)?" + // subdomain - optional
        "([a-z\\d\\-]+\\.)+" + // domain name
        "[a-z]{2,}" + // extension two or more characters
        "(:\\d+)?" + // port - optional
        "(\\/\\S*)?" + // route - optional
        "$",
      "i" // Case sensitive
    );
    return pattern.test(url);
  },
  validateNotEmpty: (value) => {
    if (typeof value === "string") {
      return value.trim() !== "";
    } else if (typeof value === "number") {
      return true;
    }
    return false;
  },
  isValidUSZipCode: (zip) => {
    const zipRegex = /^[0-9]{5}$/;
    return zipRegex.test(zip);
  },
};

export default validations;
