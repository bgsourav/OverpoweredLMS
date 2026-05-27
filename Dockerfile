FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY tests.js   /usr/share/nginx/html/tests.js
EXPOSE 80
HEALTHCHECK --interval=10s --timeout=3s CMD wget -qO- http://localhost/ | grep -q "Wabi" || exit 1
