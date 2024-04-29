# FUN4FAMILY - Travel-app
---

## 1. Project overview

The Fun4Family is a travel application that will help to share and find places for family activities. 

## 1.1 Flow of sharing places with app users

The registered users can pin a place on map and give informations about that place like description and rate. Also can leave comment on pins and share their opinion about that place. Visitors (non registered users) can see the pins on a map and sort them by rate and by the time was created. They can also visit comment page and read the comments. Any user can send a contact form to the admin and give feedback or send message. Feedbacks are shown on home page.

## 1.2 Roles

**Visitor**
- Can see pins, comments and filters between pins
- Can send contact form to the admin


**Registered user**
- Can create new pins
- Can write comment for pins and edit or delete them
- Can see their pins in different color
- Can visit own profile and see the pins belong to the user
- Can do everything as Visitors can do


## 1.3 Main features

- Registration via username, email and password
- Login via username and password
- Search for pins by filters
- Pin creation
- Comment creation / modification / deletion
- Contact form sending

## 2. Pages
 
**Home page**
Frontend route: `/`
API Endpoint: `GET /pins`
1. Navigation
- Register button => Register page
- Login button => Login page
- Contact button => Contact page
- Logo button => Home
2. Sidebar
- About
- Filters
- Reviews - change it every specific time
3. Main
- Map
- Create new pin => New pin 

**Contact page**
Frontend route: `/contact`
API Endpoint: `POST /messages`
- Schema: name, email, text 
Send button

**Register page** 
Frontend route: `/register`
API Endpoint: `POST /register`
- Schema: username, email, password

**Login page**
Frontend route: `/login`
API Endpoint: `POST /login`
- Schema: email, password

**New pin page (popup)** 
Frontend route: `/pins/new`
API Endpoint: `POST /pins/new`
- Schema: place, desc, rating, username, latitude, longitude, createDate
- Comments button => Comments page

**Comments page**
Frontend route: `/comments`
API Endpoint: `GET /comments`
- New comment button => New comment page
- Show pin details (place name, short description, average rate from users, username)
- List all comments ( registered user can edit and delete their comments)

**New comment page**
Frontend route: `/comments/new`
API Endpoint: `POST /comments/new`
- Schema: pinId, username, desc, rating

**Edit comment page**
Frontend route: `/comments/{id}`
API Endpoint: `PUT /comments/:id`
- Schema: pinId, username, desc, rating

**Delete comment**
Frontend route: `/comments/{id}`
API Endpoint: `DELETE /comments/:id`
- Schema: pinId, username, desc, rating

**Reviews**
API Endpoint: `GET /reviews`
- Schema: review, username

**Profile**
Frontend route: `/users/{id}`
API Endpoint: `GET /users/:id`
- Schema: place, desc, rating, username, latitude, longitude

## 3. Database collections
users, pins, comments, reviews, messages
