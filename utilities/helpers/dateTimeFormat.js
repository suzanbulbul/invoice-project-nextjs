// dateTimeFormat.js
const dateFormat = (date) => {
  date = new Date(date);
  console.log(date);

  const year = date?.getFullYear().toString();
  const month = (date?.getMonth() + 1).toString().padStart(2, "0");
  const day = date?.getDate().toString().padStart(2, "0");

  const formatted = `${day}/${month}/${year}`;
  return formatted.toString();
};

export default dateFormat;