# Events-Booker

## Live Demo :
[Heroku link , Click here to visit our app](https://eventsbooker.herokuapp.com/)

## Team Members :

- Ahmed Safi.
- Mariam Isa.
- Mohammed Irheem.
- Rawan Abudahrouj.

## Summary :

We've built this app to help GSG organization in organizing the registration for the events that they do. So When they announced for an event, it will be known who would like to attend and they can ensure if this person attended or not. By this way, the GSG can have information about the people who attended and they can use it in the future as they want.

## Challange :

GSG holds many events and each event is attended by a large number of people, sometimes the number exceeding one hundred people. The people who attended the event must register in the GSG system, so during the event, they lose their focus and part of the time is wasted to enter their information. Another problem is that GSG may lose information about the people who attend the event.

## Solution :

Create an Event booker app that allows the users to select which event they will attend and enter their information from their home.Then they will receive a unique code for every user, and when they come to the event they can enter the code to confirm their attendance.

## User Stories :

### For User

- As a user, I can access the app and view all events available at GSG that relate to their programs.

- As a user, I can access the app and view all up-coming events at GSG.

- As a user, I can see the full details of any available event.

- As a user, I can register at any available event or exit from the app.

- As a user, I can cancel my registration when I want. 

- As a user, I can enter only my mobile number if I am not a new user to approve my registration then, I will get a mobile message and an email with a code.

- As a user, I can register my data once including my mobile number if I am a new user to approve my registration then, I will get a mobile message and email with a code.

- As a user, I will get a google calender invitation to remind me of the event's date. 

- As a user, I can use the code that I have already received to approve my attendance when I attend the event .

- As a user, I can register for the event when I attend it if I didn’t register before.

## User Stories :

### For Admin

- As an admin, I can add an event.

- As an admin, I can delete any event.

- As an admin, I can view all users’ data.

- As an admin, I can view all events details.

- As an admin, I can view all users of a specific event on a single page.

- As an admin, I can export all users’ details of a specific event as an excel file.

- As an admin, I can track the user and view all events that he attended.

#### For Admin-portal:
I can access the attendance approval screen to help users approve their attendance by entering the code they already received.


## App Setup :

To setup the app successfully on your device follow these steps :

- Git clone this repo : `git clone `
- Then run this command : `npm run project-setup`.
- run this command : `npm run start-both`

Now the app is in your device and it's working.

## Data-Base Schema :

This is the schema of our database

![schema](https://cdn.discordapp.com/attachments/690170174116331638/692742024796831744/schema.png)

## Technologies

### Front-end Techno:
* Reactjs.

* Antd-design.

### Back-end Techno:
* Express.

* Postgresql.

## Main Features of Our App:
* **Send Google Calender Invitation:** 

   We used `nodemailer module` to send invitation email to the users who registered for a particular events. 

* **Send Mobile Message (SMS):**

  We used `nexmo module` to send a confirmation code to the users, so when he/she attend the events he/she can confirm his/her attendance by this code.

* **Export data to Excel File.**

   we used `react-html-table-to-excel` module to export users data to excel file.
