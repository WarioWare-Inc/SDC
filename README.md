# Atelierex

## Overview
**_Atelierex_** is an API built to support an existing e-commerce frontend. The goal was to replace an existing API ("Atelier") with a robust backend system that can support the full dataset of the project and can scale to meet the demands of production traffic.

## Task
An explicit goal for this challenge was to replace an existing API - an implicit expectation was to create a **_better_** API. The rebuilt API needed to meet the following specifications:
* Maximum latency of 2 seconds (2000 ms)
* Minimum requests per second of 1000/second
* Servers and Database deployed on separate EC2 instances

## Actions
The following systems were implemented to build "Aterlierex":
* Raw .csv data transferred to PostgreSQL database
* Backend reconfigured with optimized queries for PostgreSQL database
* Local query speed tested with K6

| K6 Screenshot | Optimized Query Result |
|---|---|
| <img width="800" alt="k6 stress test" src="https://github.com/WarioWare-Inc/product-module/assets/106457612/0eb22903-d2ac-49d2-b194-56a558483e7d"> | Tested: 1500 VUs/30 seconds<br />Latency: 10.64 ms<br />Requests: 75,603 total, or 2,520.1/s |

* Deployed backend and database to separate EC2 instances through AWS
* Tested response time through loader.io

| Loader.io Screenshot | Post-Deployment |
|---|---|
| <img width="800" alt="Screenshot 2023-06-03 at 1 49 23 PM" src="https://github.com/WarioWare-Inc/product-module/assets/106457612/a796defb-d173-4c0c-a8a6-e4f7e49a467e"> | Tested: 1000 clients/30 seconds<br />Latency: 2809 ms<br />Requests: 18312 total, or 610.4/s |

* PROBLEM: Latency increased to 2809 ms
* Deployed two additional EC2 instances of server and load balancer (NGINX) to lower latency to 61 ms while increasing client load to 2000 clients

| Loader.io Screenshot | Post-Load-Balancing |
|---|---|
| <img width="800" src=https://github.com/WarioWare-Inc/product-module/assets/106457612/8b76612b-ff92-4fb6-bdb4-3d4889c9f87b)> | Tested: 2000 clients/30 seconds<br />Latency: 61 ms<br />Requests: 59884 total, or 1996.1/s |

* Implemented caching (NGINX) to improve stability to allow for larger client load over narrow API endpoint range

| Loader.io Screenshot | Post-Caching |
|---|---|
| <img width="800" alt="Screenshot 2023-06-03 at 2 07 55 PM" src="https://github.com/WarioWare-Inc/product-module/assets/106457612/408d603b-c428-4c8d-897f-71705c30a331"> | Tested: 4000 clients/30 seconds<br />Latency: 62 ms<br />Requests: 119,770 total, or 3992.3/s |

## Results
Through implementing the above measures, the resultant API is highly performant and easily horizontally scaled. The results exceed the minimum metrics laid out in the Tasks section. Through this project, I've gained mastery over PostgreSQL, backend development principles, and testing tools like K6 and Loader.io.
