# ---------- Build Stage ----------
FROM node:18 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- Serve Stage ----------
FROM nginx:alpine

# Copy Vite build output (which goes to dist/ by default)
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
