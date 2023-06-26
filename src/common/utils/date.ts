function pad(n: number, s = String(n)) {
  return s.length < 2 ? `0${s}` : s;
}

function parsingDate(data: any) {
  return `${pad(data.getDate())}.${pad(data.getMonth() + 1)}.${data.getFullYear()}`;
}

export default parsingDate;
