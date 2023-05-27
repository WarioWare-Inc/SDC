import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  http.get('http://localhost:3000/products/40344');
  sleep(1);
  // const res = http.get('localhost:3000/products/40344/');
  // check(res, {
  //   'is status 200': (r) => r.status === 200,
  // });
  // sleep(1);
}
