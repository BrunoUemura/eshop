#!/bin/bash

cd apps/backend/order;
pnpm docker:down;
cd ../../../;

cd apps/backend/paynment;
pnpm docker:down;
cd ../../../;

cd apps/backend/product;
pnpm docker:down;
cd ../../../;