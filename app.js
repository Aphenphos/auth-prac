// import services and utilities
// *** import needed service methods

// import component creators
import createAuthForm from './components/AuthForm.js';
import createAuthError from './components/AuthError.js';
import { getUser, signIn, signUp } from './services/members-service.js';

let errorMessage = '';

// write handler functions
async function handlePageLoad() {
    // *** get the user
    const user = await getUser();
    if (user) {
        location.replace('./members');
        return;
    }

    // *** if there is a user, redirect (use replace) to './members'

    display();
}

async function handleSignIn(email, password) {

    const response = await signIn(email, password); // *** ? (don't forget call is asynchronous!)
    checkAuth(response);
}

async function handleSignUp(email, password) {

    const response = await signUp(email, password); // *** ? (don't forget call is asynchronous!)
    checkAuth(response);
}

function checkAuth(response) {


    if (response?.error) {
        errorMessage = response.error.message;
        // *** 
        // 1. console.log the response.error
        // 2. set the errorMessage state from response.error.message
        // (keep this line👇 before console.log)
        // eslint-disable-next-line no-console

        display();
    }
    else {
        location.replace('./members');
    }
}

// Create each component: 
const SignInForm = createAuthForm(document.querySelector('#sign-in'), { handleAuth: handleSignIn });

const SignUpForm = createAuthForm(document.querySelector('#sign-up'), { handleAuth: handleSignUp });

const AuthError = createAuthError(document.querySelector('#auth-error'));

function display() {
    SignInForm();
    SignUpForm();
    AuthError({ errorMessage });
}

// Call display or page load
handlePageLoad();
