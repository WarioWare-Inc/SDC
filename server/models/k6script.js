import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '1s', target: 600 },
    { duration: '28s', target: 1500 },
    { duration: '1s', target: 600 },
  ],
};

// for testing /products endpoint:
// export default function () {
//   const res = http.get('http://localhost:3000/products/');
//   check(res, { 'status was 200': (r) => r.status === 200 });
//   sleep(1);
// }

// // for testing /products/:product_id endpoint:
export default function () {
  for (let i = 900000; i < 920000; i++) {
    const res = http.get(`http://localhost:3000/products/${i}`);
    check(res, { 'status was 200': (r) => r.status === 200 });
    sleep(1);
  }
}

// for testing /products/:product_id/styles endpoint:
// export default function () {
//   for (let i = 920001; i < 940000; i++) {
//     const res = http.get(`http://localhost:3000/products/${i}/styles`);
//     check(res, { 'status was 200': (r) => r.status === 200 });
//     sleep(1);
//   }
// }

// export default function () {
//   for (let i = 940001; i < 960000; i++) {
//     const res = http.get(`http://localhost:3000/products/${i}/related`);
//     check(res, { 'status was 200': (r) => r.status === 200 });
//     sleep(1);
//   }
// }
