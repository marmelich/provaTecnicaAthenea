#imagen base de PHP con Apache
FROM php:8.2-apache

#instala dependencias y extensiones de PHP
RUN apt-get update && apt-get install -y \
        default-mysql-client \
        libzip-dev \
        zip \
        unzip \
    && docker-php-ext-install pdo pdo_mysql mysqli \
    && a2enmod rewrite \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

#ajusta permisos de Apache
RUN chown -R www-data:www-data /var/www/html

#expone el puerto de Apache
EXPOSE 80
