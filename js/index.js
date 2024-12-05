// global values
let list = [];
let inputs = [];
list = JSON.parse(localStorage.getItem('form_list')) || [];

//inputs from sign_up

const Username = document.getElementById('name_s.up');
const pass = document.getElementById('pass_s.up');
const email = document.getElementById('email_s.up');

//inputs form log_in

const email_login = document.getElementById('email');
const pass_login = document.getElementById('pass');

Username_in_login = localStorage.getItem('logged_in_user');
////////////////sign up page functions////////////////

// function to get data 
function get_data() {
    const data_desc = {
        d_name: Username.value,
        d_pass: pass.value,
        d_email: email.value
    }
    if (!valdiate(data_desc.d_name, data_desc.d_pass, data_desc.d_email)) {
        return;
    }
    list.push(data_desc);
    localStorage.setItem('form_list', JSON.stringify(list));
    clear(data_desc.d_name, data_desc.d_pass, data_desc.d_email);
    alert('Successful registration')
}

// to reset the function 
function clear(cl_name, cl_email, cl_pass) {
    cl_name = null;
    cl_email = null;
    cl_pass = null;
    
}


//function to valdiate the data with regex
function valdiate(U_name, password, e_mail) {
    if (!U_name || !password || !e_mail) {
        alert('please fill the form')
        return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(e_mail) === false) {
        alert('please write a valid email');
        return false;
    }
    else {
        return e_mail;
    }
}

////////////////sign in page functions////////////////

//function to get inputs form user

function get_data_log() {
    const log_desc = {
        l_pass: pass_login.value,
        l_email: email_login.value,
    }
    inputs.push(log_desc);
    
    // valdiate //
    
    // if the user fill the form wrong 
    if (!log_desc.l_email || !log_desc.l_pass) {
        alert('Please fill out the form correctly');
        return;
    }
    //regex for email
    if (!valdiate_regex_login(log_desc.l_email)) {
        return;
    }
    // Find the user in the list with arrow func
    const user = list.find(user => user.d_email === log_desc.l_email);
    if (user) {
        // Validate password
        if (user.d_pass === log_desc.l_pass) {
            localStorage.setItem('logged_in_user', user.d_name);
            
            console.log("donee");
            
            window.location.href = "wlcome.html";
            // window.open("wlcome.html" , "_self")
            // display()
        }
        else {
            alert('Incorrect password');
        }
    }
    else {
        alert('Email not found. Please sign up or check your form again');
    }
}

//valdiate function for the regex from login
function valdiate_regex_login(L_e_mail) {
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(L_e_mail) === false) {
        alert('please write a valid email');
        return false;
    }
    else {
        return L_e_mail;
    }
}

//display function for the name of user 
function display(user) {
    // let user = localStorage.getItem("logged_in_user")
    if (user) {
        console.log(user);
        let Username_in_login = document.getElementById('user-Welcome')
        
        Username_in_login.innerHTML = `Welcome, ${user}!`;
    }
    return user;
}

//log out function
function logout() {
    localStorage.removeItem('logged_in_user');
    window.location.href = 'index.html';
}