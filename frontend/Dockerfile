# ใช้ Node.js เวอร์ชัน 14
FROM node:14 AS build

# ตั้งค่าตำแหน่งที่ทำงาน
WORKDIR /usr/src/app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมด
COPY . .

# รัน build สำหรับ Vite
RUN npm run build

# ใช้ Nginx เพื่อเสิร์ฟแอปพลิเคชัน
FROM nginx:alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# เปิดพอร์ต 80
EXPOSE 80

# รัน Nginx
CMD ["nginx", "-g", "daemon off;"]