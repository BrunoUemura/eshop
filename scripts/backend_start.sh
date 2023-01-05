#!/bin/bash

cd apps/order;
pnpm docker:start;
sleep 30;

cd apps/paynment;
pnpm docker:start;
sleep 30;

cd apps/product;
pnpm docker:start;