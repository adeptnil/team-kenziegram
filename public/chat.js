// const userList = document.getElementById("users");




const messagesDiv = document.getElementById("messageslist");





// const ding = new Audio('typewriter_ding.m4a');

// this will be the list of all messages displayed on the client
let messages = [{
    timestamp: 0
}];

// let name = window.prompt("Enter your name");
// if they didn't type anything at the prompt, make up a random name
if (name.length === 0) name = "Anon-" + Math.floor(Math.random() * 1000);

// add the sender and text of one new message to the bottom of the message list
function appendMessage(msg) {
    // div.chat.self
    //     div.user-photo
    //     p.chat-message whats up!
    // messages.push(msg);
    console.log(messages)
    messagesDiv.innerHTML +=

        `<div class="chat self"> <div class="user-photo"> </div> <p class="chat-message"> ${msg}</p>  </div>`;

}

// redraw the entire list of users, indicating active/inactive
// function listUsers(users) {
//     let userStrings = users.map((user) =>
//         (user.active ? `<span class="active"><span class="cyan">&#9679;</span> ${user.name}</span>` : `<span class="inactive">&#9675; ${user.name}</span>`)
//     );
//     userList.innerHTML = userStrings.join("<br>");
// }

// true if the messages div is already scrolled down to the latest message
function scrolledToBottom() {
    return messagesDiv.scrollTop + 600 >= messagesDiv.scrollHeight;
}

// force the messages div to scroll to the latest message
function scrollMessages() {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function fetchMessages() {
    fetch("/messages?for=" + encodeURIComponent(name))
        .then(response => response.json())
        .then(data => {
            // if already scrolled to bottom, do so again after adding messages
            const shouldScroll = scrolledToBottom();
            let shouldDing = false;

            // redraw the user list
            // listUsers(data.users);


            // examine all received messages, add those newer than the last one shown
            for (let msg of data.messages) {
                if (msg.timestamp > messages[messages.length - 1].timestamp) {
                    appendMessage(msg);
                    shouldDing = true;
                }
            }
            if (shouldScroll && shouldDing) scrollMessages();
            if (shouldDing) ding.play();

            // poll again after waiting 5 seconds
            setTimeout(fetchMessages, 5000);
        })
}

document.getElementById("send").addEventListener("click", (event) => {
    // if the key pressed was enter (and not shift enter), post the message.
    console.log("hello")
    // if(event.keyCode === 13 && !event.shiftKey) {
    //     textarea.disabled = true;
    //     const postRequestOptions = {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify( { name, message: textarea.value } ),
    //     }
    //     fetch("/messages", postRequestOptions)
    //         .then(response => response.json())
    //         .then(msg => {
    //             appendMessage(msg);
    //             scrollMessages();

    //             // reset the textarea
    //             textarea.value = "";
    //             textarea.disabled = false;
    //             textarea.focus();
    //         })
    // }
    let textarea = document.getElementById("textArea")
    textarea = textarea.value
    if (textarea !== "") {
        console.log("TextArea" + textarea)
        let msg = textarea
        appendMessage(msg);
        scrollMessages();
        const shouldScroll = scrolledToBottom();
        console.log(msg)
        // reset the textarea
        textarea.value = "";
        textarea.disabled = false;
    }
})
document.getElementById("send").addEventListener("click", (event) => {
    // if the key pressed was enter (and not shift enter), post the message.
    console.log("hello")
    if(event.keyCode === 13 && !event.shiftKey) {
        let textarea = document.getElementById("textArea")
        textarea = textarea.value
        if (textarea !== "") {
            console.log("TextArea" + textarea)
            let msg = textarea
            appendMessage(msg);
            scrollMessages();
            const shouldScroll = scrolledToBottom();
            console.log(msg)
            // reset the textarea
            textarea.value = "";
            textarea.disabled = false;
        }
    }
   
})



// call on startup to populate the messages and start the polling loop
// fetchMessages();