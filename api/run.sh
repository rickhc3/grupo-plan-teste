#!/bin/bash

# Limpar cache
php artisan cache:clear
php artisan config:clear

# Gerar chave de aplicativo do Laravel
php artisan key:generate

# Rodar migrations
php artisan migrate

# Rodar seeders
php artisan db:seed

# Variável de ambiente com o número desejado de registros para a tabela de eletrodomésticos
export SEEDER_NUMBER=50

# Rodar seed de eletrodomésticos com o número de registros desejado
echo "$SEEDER_NUMBER" | php artisan db:seed --class=HomeAppliancesTableSeeder

php artisan route:clear

# php -S 0.0.0.0:8000 -t public

php artisan serve --host=0.0.0.0 --port=8000
