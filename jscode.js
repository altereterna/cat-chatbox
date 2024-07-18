const chatBox = document.getElementById('chat-box');
const catImage = document.createElement('img'); // Create cat image element
catImage.src = 'https://img1.picmix.com/output/stamp/normal/5/9/9/1/2381995_c8ba3.gif'; // Animated cat image URL
catImage.alt = 'Cat Image';
catImage.className = 'cat-image'; // Class for styling

let idleTimer;

// Example emote and badge URL maps
const emotes = {
    "Kappa": "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
    "PogChamp": "https://static-cdn.jtvnw.net/emoticons/v1/88/1.0"
};

const badges = {
    "broadcaster": "https://static-cdn.jtvnw.net/badges/v1/48",
    "moderator": "https://static-cdn.jtvnw.net/badges/v1/mod"
};

function addChatMessage(username, message, userBadges) {
    // Truncate the message if it's longer than 50 characters
    const maxLength = 50;
    if (message.length > maxLength) {
        message = message.substring(0, maxLength) + '...';
    }

    // Replace emotes in the message with image tags
    message = message.split(' ').map(word => emotes[word] ? `<img src="${emotes[word]}" alt="${word}" class="chat-emote">` : word).join(' ');

    // Create message elements
    const chatMessage = document.createElement('div');
    chatMessage.className = 'chat-message';
    
    // Add badges to the message
    userBadges.forEach(badge => {
        if (badges[badge]) {
            const badgeImg = document.createElement('img');
            badgeImg.src = badges[badge];
            badgeImg.alt = badge;
            badgeImg.className = 'chat-badge';
            chatMessage.appendChild(badgeImg);
        }
    });

    const messageText = document.createElement('span');
    messageText.innerHTML = `${username}: ${message}`;
    chatMessage.appendChild(messageText);

    // Clear any existing messages
    while (chatBox.firstChild) {
        chatBox.removeChild(chatBox.firstChild);
    }

    // Add the new message directly
    chatBox.appendChild(chatMessage);

    // Ensure chat box is visible after adding message
    chatBox.style.display = 'block';

    // Show cat image if it's hidden
    if (catImage.style.display === 'none') {
        catImage.style.display = 'block';
    }

    // Reset idle timer
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        resetChatBox();
    }, 15000); // Reset after 15 seconds of idling

    // Trigger reflow to restart the animation
    void chatMessage.offsetWidth;
}

function resetChatBox() {
    // Animate chat box reset
    chatBox.style.transition = 'transform 0.5s ease'; // Smooth transition
    chatBox.style.transform = 'translateX(-100%)'; // Move chat box to the left

    // Animate cat image reset
    catImage.style.transition = 'transform 0.5s ease'; // Smooth transition
    catImage.style.transform = 'translateX(-100%)'; // Move cat image to the left

    // Clear any existing messages after animation completes
    setTimeout(() => {
        chatBox.innerHTML = ''; // Clear chat box content
        chatBox.style.transition = ''; // Reset transition property
        chatBox.style.transform = 'translateX(0)'; // Move chat box back to original position
        chatBox.style.display = 'none'; // Hide chat box again
        
        catImage.style.transition = ''; // Reset transition property
        catImage.style.transform = 'translateX(0)'; // Move cat image back to original position
        catImage.style.display = 'none'; // Hide cat image again
    }, 500); // Wait for 0.5 seconds for animation to complete
}

// Listen for new chat events from StreamElements
window.addEventListener('onEventReceived', function (obj) {
    const event = obj.detail.event;
    const listener = obj.detail.listener;

    if (listener === 'message') {
        const username = event.data.displayName;
        const message = event.data.text;
        const userBadges = event.data.badges;
        addChatMessage(username, message, userBadges);
    }
});

// Initialize or clear chat box and cat image on widget load
window.addEventListener('onWidgetLoad', function (obj) {
    chatBox.style.display = 'none'; // Initially hide chat box
    chatBox.innerHTML = ''; // Clear any existing messages on load

    // Append cat image to body or container as needed
    document.body.appendChild(catImage);
    
    // Style cat image position and size
    catImage.style.position = 'fixed'; // Fixed position for overlay
    catImage.style.bottom = '10px'; // Adjust bottom position as needed
    catImage.style.left = '10px'; // Adjust left position as needed
    catImage.style.width = '50px'; // Adjust width as needed
    catImage.style.height = '50px'; // Adjust height as needed
    catImage.style.display = 'none'; // Initially hide cat image
});
