exports.date_format1 = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const date = new Date(arr[i].date);
    // console.log(date);

    const y = date.getFullYear() + '/';
    const m = date.getMonth() + '/';
    const d = date.getDate();

    arr[i].date = y + m + d;
  }
  return arr;
};

exports.date_format2 = (obj) => {
  const date = new Date(obj.date);
  const y = date.getFullYear() + '-';
  const m = date.getMonth() + '-';
  const d = date.getDate() + ' ';

  const h = date.getHours() + ':';
  const mm = date.getMinutes();
  obj.date = y + m + d + h + mm;
  return obj;
};
