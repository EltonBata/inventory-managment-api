FROM php:8.3-apache

#install system dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev

#install extensions
RUN docker-php-ext-install \
    pdo \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip



#activate mod_rewrite
RUN a2enmod rewrite


#install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

#define workdir
WORKDIR /var/www/html

#copy files do workdir
COPY . .

#install app dependencies
RUN composer install --no-interaction --no-progress --prefer-dist


#expose port
EXPOSE 80

#run apache
CMD ["apache2-foreground"]