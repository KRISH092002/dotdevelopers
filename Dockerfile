# ⚙️ 1. Base image with Composer and PHP
FROM composer:2.5 as build

# Set working directory
WORKDIR /app

# Copy Laravel composer files
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Copy full app
COPY . .

# Install Node.js (for Laravel Mix/React)
RUN apt-get update && apt-get install -y curl gnupg git zip unzip nodejs npm

# Build React UI (Laravel Mix)
RUN npm install && npm run prod

# 🏁 Final image with PHP + Apache
FROM php:8.2-apache

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Enable Apache mod_rewrite (Laravel needs it)
RUN a2enmod rewrite

# Copy files from build stage
COPY --from=build /app /var/www/html

# Set working directory & permissions
WORKDIR /var/www/html
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 775 storage bootstrap/cache

EXPOSE 80
