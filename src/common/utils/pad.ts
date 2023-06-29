function pad(n: number, s = String(n)) {
  return s.length < 2 ? `0${s}` : s;
}

export default pad;
