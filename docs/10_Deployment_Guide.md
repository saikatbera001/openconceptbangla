# 10. Hostinger Deployment Guide (MERN Stack)

This guide provides step-by-step instructions for deploying **Open Concept Bangla** on **Hostinger**.

---

## 1. Overview of Architecture on Hostinger

Depending on your Hostinger plan, you can choose between:

| Deployment Method | Recommended For | Details |
|---|---|---|
| **Option A: Hostinger VPS** *(Best & Standard for MERN)* | High traffic, full control, PM2 + Nginx | Full Ubuntu root access, Node.js runtime, Nginx reverse proxy, Certbot SSL. |
| **Option B: Hostinger Cloud / Web Hosting (hPanel)** | Simple setup without Linux CLI | Frontend in `public_html`, Node.js application created via Hostinger hPanel Node.js Selector. |

---

## 2. Option A: Hostinger VPS Deployment (Step-by-Step)

### Step 1: Connect to VPS via SSH
Open PowerShell or your terminal and connect to your Hostinger VPS:
```bash
ssh root@YOUR_SERVER_IP
```

### Step 2: Install Node.js & Git
```bash
# Update server
sudo apt update && sudo apt upgrade -y

# Install Node.js LTS (v20 or v22)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git nginx

# Install PM2 globally (Process Manager)
sudo npm install -g pm2
```

### Step 3: Clone Repository on VPS
```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/openconceptbangla.git
cd openconceptbangla
```

### Step 4: Setup Backend (`server/`)
```bash
cd /var/www/openconceptbangla/server
npm install

# Create production .env file
nano .env
```
Inside `.env`, add:
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/open_concept_bangla?retryWrites=true&w=majority
JWT_SECRET=your_super_strong_jwt_secret_key_here
CLIENT_URL=https://yourdomain.com
```
Run the backend with PM2:
```bash
pm2 start server.js --name "open-concept-api"
pm2 save
pm2 startup
```

### Step 5: Build Frontend (`client/`)
```bash
cd /var/www/openconceptbangla/client
npm install
npm run build
```
*(The build files will be in `/var/www/openconceptbangla/client/dist`)*

### Step 6: Configure Nginx Reverse Proxy
Edit the Nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/openconceptbangla
```
Add:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend React SPA
    root /var/www/openconceptbangla/client/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend Express REST API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Enable the site & restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/openconceptbangla /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 7: Free SSL (Certbot)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 3. Option B: Hostinger Cloud / Shared Web Hosting (hPanel)

If you have a Hostinger Business or Cloud Hosting plan with **hPanel**:

### Step 1: Deploy Frontend
1. On your local machine, run:
   ```bash
   cd client
   npm run build
   ```
2. In Hostinger **hPanel** -> Open **File Manager**.
3. Navigate to `public_html/`.
4. Upload all contents of your local `client/dist/` folder into `public_html/` (including `index.html`, `assets/`, and `.htaccess`).
   > **Important**: The included `.htaccess` ensures React Router works properly when visitors refresh pages like `/blogs`, `/tools`, or `/admin/dashboard`.

### Step 2: Deploy Backend in hPanel (Node.js Selector)
1. In hPanel, search for **Node.js** or **Node.js Applications**.
2. Click **Create Application**:
   - **Node.js version**: `20.x` or latest.
   - **Application mode**: `Production`.
   - **Application root**: `backend` or `api`.
   - **Application startup file**: `server.js`.
3. Upload your `server/` folder files into this root folder.
4. Click **Run NPM Install** in hPanel.
5. In the Environment variables section, add `MONGO_URI`, `JWT_SECRET`, `PORT`, and `CLIENT_URL`.
6. Click **Restart** to start the application.

---

## 4. MongoDB Atlas Setup (Cloud Database)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and log in.
2. Create a Free Shared Cluster (`M0`).
3. Under **Database Access**, create a user with read and write permissions.
4. Under **Network Access**, click **Add IP Address** -> Select **Allow Access from Anywhere** (`0.0.0.0/0`) so Hostinger servers can connect.
5. Click **Connect** -> **Drivers** -> Copy the connection string and paste it into your `MONGO_URI`.

---

## 5. Pre-Flight Checklist Before Going Live

- [x] Client production build tested without errors (`npm run build`).
- [x] `.htaccess` added to `client/public/` for Apache/LiteSpeed fallback.
- [x] MongoDB Atlas cluster connected and network access enabled.
- [x] Server health endpoint verified at `http://yourdomain.com/api/health`.
- [x] SSL certificate activated on Hostinger.
