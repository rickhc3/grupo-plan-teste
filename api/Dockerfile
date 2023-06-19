FROM php:8.0-apache

# Atualizar pacotes e instalar dependências
RUN apt-get update && \
    apt-get install -y \
        libonig-dev \
        libzip-dev \
        zip \
        unzip

# Extensões PHP necessárias
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl

# Configurar o DocumentRoot do Apache
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!/var/www/html/public!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Habilitar mod_rewrite
RUN a2enmod rewrite

# Copiar arquivos do projeto
COPY ./api /var/www/html

# Copiar arquivo de configuração do Laravel
COPY ./api/.env.example /var/www/html/.env

# Criar diretório storage
RUN mkdir -p /var/www/html/storage

# Configurar permissões
RUN chown -R www-data:www-data /var/www/html/storage
RUN chmod -R 775 /var/www/html/storage

# Instalar dependências do Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instalar dependências do projeto
WORKDIR /var/www/html
RUN composer install

COPY ./api/run.sh /tmp


# Expor porta do Apache
EXPOSE 8000

ENTRYPOINT ["/tmp/run.sh"]
# Iniciar servidor Apache
# CMD ["apache2-foreground"]
