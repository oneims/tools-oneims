export function sleeper(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

export const slugify = (text) =>
  text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

export function generateRandomNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

export const timeSince = (timeStamp) => {
  var now = new Date(),
    secondsPast = (now.getTime() - timeStamp) / 1000;
  if (secondsPast < 60) {
    return parseInt(secondsPast) + " seconds ago";
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + " minutes ago";
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + " hours ago";
  }
  if (secondsPast > 86400) {
    let day = timeStamp.getDate();
    let month = timeStamp
      .toDateString()
      .match(/ [a-zA-Z]*/)[0]
      .replace(" ", "");
    let year = timeStamp.getFullYear() == now.getFullYear() ? "" : " " + timeStamp.getFullYear();
    return day + " " + month + year;
  }
};

export const compareKeys = (a, b) => {
  var aKeys = Object.keys(a).sort();
  var bKeys = Object.keys(b).sort();
  return JSON.stringify(aKeys) === JSON.stringify(bKeys);
};
