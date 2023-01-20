import request from '../utils/axios.util';
import { getAuthHeader } from '../utils/utils';

const getOverview = () => {
  return request({
    url: 'report/overview',
    method: 'get',
    headers: getAuthHeader()
  });
}

const getSales = () => {
  return request({
    url: 'report/sales',
    method: 'get',
    headers: getAuthHeader()
  });
}

const getMostSoldProducts = () => {
  return request({
    url: 'report/most-sold',
    method: 'get',
    headers: getAuthHeader()
  });
}

const ReportService = {
  getOverview,
  getSales,
  getMostSoldProducts

};

export default ReportService;