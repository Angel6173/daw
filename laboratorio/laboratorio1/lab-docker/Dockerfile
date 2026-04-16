FROM ubuntu:24.04

RUN apt-get update && apt-get install -y apache2

RUN mkdir -p /var/www/developers
RUN mkdir -p /var/www/webapp

COPY ./developers /var/www/developers
COPY ./webapp /var/www/webapp

COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf

RUN a2enmod rewrite
RUN a2ensite 000-default.conf

EXPOSE 80

CMD ["apachectl", "-D", "FOREGROUND"]