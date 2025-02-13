# ใช้ Node.js เวอร์ชัน 14
FROM node:14-alpine

# ตั้งค่าตำแหน่งที่ทำงาน
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ทั้งหมด
COPY . .

# เปิดพอร์ตที่แอปพลิเคชันจะฟัง
EXPOSE 8000

# รันเซิร์ฟเวอร์
CMD ["node", "server.js"]