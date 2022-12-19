#!/bin/bash

cd apps/backend/order;
pnpm docker:start;
sleep 30;

cd apps/backend/paynment;
pnpm docker:start;
sleep 30;

cd apps/backend/product;
pnpm docker:start;