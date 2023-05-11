## Homework assignment from the appsforce interview.
https://sergeydus.github.io/appsforce/

what i've learned from this experience: i should have taken accessibility into account, since the interviewer didnt manage to edit/delete any list item  

i was given the following requirements:

The Users Library

The task is to write a simple user library app in React.
Data is provided via an Ajax Request - https://randomuser.me/api/?results=10.
Each Person will have:
1. Name - title, first name, last name.
2. Email.
3. User image - medium.
4. Location - country, city, street.
5. UUID/ID.
* All other fields are irrelevant.
The page will show all the users resolved from the requests with a proper design
– nice design == high score!.
1. The design should be responsive.
2. Use styled components/scss modules, also you can use ui framework
such as material-ui/bootstrap etc.
3. Each user can edit (locally).
4. Edit button should open a modal with save and cancel button.
5. The fields that can edit are - Name, Email and Location.
6. Proper validation should be included:
- All Fields cannot be empty.
- Name - min of 3 characters.
- Email - should be a valid email address.
- Each user should have a unique email address
7. Proper error message should be shown when trying to save a user - don’t
use HTML5 validation.
8. Implement “Add user” button. Should open a new user form.
9. Each user can be deleted (show confirm message before deleting).
Bonus Task:
1. Use Redux (high bonus).
2. Use Typescript (high bonus).
3. Add a search filter by email, name, id and location (client side search).

Important notes:
1. Make a clean(!) code.
2. Separate your code info files.
3. The app should look nice.
4. Use advanced features of react.
5. Do not repeat yourself.

How to submit the code:
1. Upload the code to your Github or other VCS.
2. Upload the app to server Heroku/Firebase/Aws.
3. Send us the repository link + link to a working task.

Good Luck!
Appsforce Team

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
