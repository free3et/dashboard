# Dashboard

- This dashboard full-stack application consists of several pages: login page, main page, user page, messages, keywords.


### Login page
The login page is a form where you need to enter your username and password.
Live demo - [https://dashboard-m3mq-9gnb0fa5c-free3et.vercel.app/login](https://dashboard-m3mq-9gnb0fa5c-free3et.vercel.app/login)

### Main page
The main page displays generalized information on the number of users, keywords and messages, created a table of the most active users and a schedule of visits to the application by day of the week.

### User page
The user page consists of the following functionality: a table of users with their data, the ability to add a new user, search by user, edit information, delete a user, pagination by user.

### Message page
The message page consists of a block for adding a new message and a filter block. The functionality of filtering by users, date, and preferences has been implemented.

### Keywords page
The keywords page consists of a block for adding new keywords. The second block contains a search by keywords, as well as a search for messages from the application in which the selected keywords are found with the functionality of highlighting them.

The sidebar also has a logout button, which allows you to exit the application as a user

## Let's start

First, clone the repository and start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Dependencies
- The application was created using
- ⚛️ React 18 [https://react.dev/](https://react.dev/),
- 🤝 Next.js 14.0.1 [https://nextjs.org/](https://nextjs.org/). New version with server/client components and server actions
- 🔏 Next Auth 5.0.0-beta.3 [https://nextjs.org/](https://next-auth.js.org/)
- 🎨 Recharts 2.9.0 [https://react.dev/](https://recharts.org/en-US/)
- 🎛️ Mongo DB as database [https://react.dev/](https://www.mongodb.com/)
- 🤝 Mongoose 8.0.0 for database connection  [https://mongoosejs.com/](https://mongoosejs.com/),

