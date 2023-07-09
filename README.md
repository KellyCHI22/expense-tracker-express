# Expense Tracker Express

## 💡 Overview

A simple expense tracker app where you can view, create, update and delete your expense records.

### 👀 Screenshots

![](public/screenshots/screenshot_1.png)

![](public/screenshots/screenshot_2.png)

![](public/screenshots/screenshot_3.png)

### ⚙️ Features 功能

- Users can login or create a new account
- Users can manage their own expense records
- Users can view all the records or filter them according to categories
- Users can create, edit, delete their expense records

## 🚀 Run Locally

1. Clone this repo to your local environment

```bash
$ git clone "https://github.com/KellyCHI22/expense-tracker-express.git"
```

2. Install necessary packages

```bash
$ npm install
```

3. Create your `.env` file, see `.env.example` for more details

4. Run this command to generate seed data

```bash
$ npm run seed
```

If your see this message logged out, the seed data is created successfully

```bash
Seed data created!
```

5. Run this command to start the server

```bash
$ npm run start
```

6. When you see this message, you can enter the following url in your browser: `http://localhost:3000`

```bash
Express is listening on http://localhost:3000
```

7. If you want to use the testing account, please enter the following email and password

```
email : user1@example.com
password : 12345678
```

8. Enter the following command to stop the server

```bash
ctrl + c
```

## 💻 Technologies

- node.js 16.16.0
- express 4.18.2
- express-handlebars 7.0.7
- express-session 1.17.3
- bcryptjs 2.4.3
- method-override 3.0.0
- passport 0.6.0
- passport-local 1.0.0
- mongoose 7.3.2
- Bootstrap 5.1.3
- Font-awesome 6.2.1
- Chart.js 4.3.0
