import pad from '@/common/utils/pad';

function parsingDate(data: any) {
  return `${pad(data.getDate())}.${pad(data.getMonth() + 1)}.${data.getFullYear()}`;
}

export default parsingDate;
