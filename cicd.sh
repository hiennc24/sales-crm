cd /biso24/biso24.org
cp .env.biso24_org .env
nvm exec 16.14.2 yarn
rm -rf build/*
nvm exec 16.14.2 yarn run build
rm -rf build_production
cp -rf build build_production
# pm2 delete bizcom_biso24_org
# pm2 serve build_production 3052 --spa --name bizcom_biso24_org

pm2 restart bizcom_biso24_org
pm2 list
