const chatBox = document.getElementById('chat-box');
const catImage = document.createElement('img'); // Create cat image element
catImage.src = 'https://img1.picmix.com/output/stamp/normal/5/9/9/1/2381995_c8ba3.gif'; // Animated cat image URL
catImage.alt = 'Cat Image';
catImage.className = 'cat-image'; // Class for styling

let idleTimer;

const emotes = {
    "Kappa": "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
    "PogChamp": "https://static-cdn.jtvnw.net/emoticons/v1/88/1.0"
};

const badges = {
    "broadcaster": "https://static-cdn.jtvnw.net/badges/v1/48",
    "moderator": "https://static-cdn.jtvnw.net/badges/v1/mod"
};

// Fetch emotes from Twitch, BTTV, and 7TV
async function fetchEmotes() {
    // Twitch Global Emotes
    try {
        const twitchResponse = await fetch('https://api.twitch.tv/helix/chat/emotes/global', {
            headers: {
                'Client-ID': 'YOUR_TWITCH_CLIENT_ID',
                'Authorization': 'Bearer YOUR_TWITCH_OAUTH_TOKEN'
            }
        });
        const twitchData = await twitchResponse.json();
        twitchData.data.forEach(emote => {
            emotes[emote.name] = emote.images.url_1x;
        });
    } catch (error) {
        console.error('Error fetching Twitch emotes:', error);
    }

    // BTTV Emotes
    try {
        const bttvResponse = await fetch('https://api.betterttv.net/3/cached/emotes/global');
        const bttvData = await bttvResponse.json();
        bttvData.forEach(emote => {
            emotes[emote.code] = `https://cdn.betterttv.net/emote/${emote.id}/1x`;
        });
    } catch (error) {
        console.error('Error fetching BTTV emotes:', error);
    }

    // 7TV Emotes
    try {
        const sevenTVResponse = await fetch('https://api.7tv.app/v2/emotes/global');
        const sevenTVData = await sevenTVResponse.json();
        sevenTVData.forEach(emote => {
            emotes[emote.name] = emote.urls[0][1];
        });
    } catch (error) {
        console.error('Error fetching 7TV emotes:', error);
    }
}

fetchEmotes();

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
    }, 10000); // Reset after 10 seconds of idling

    // Trigger reflow to restart the animation
    void chatMessage.offsetWidth;
}

function resetChatBox() {
    // Apply shrinking animation to chat box and cat image
    chatBox.style.transition = 'transform 0.5s ease, opacity 0.5s ease'; // Smooth transition for both transform and opacity
    chatBox.style.transform = 'scale(0)'; // Shrink chat box to the center
    chatBox.style.opacity = '0'; // Fade out chat box

    catImage.style.transition = 'transform 0.5s ease, opacity 0.5s ease'; // Smooth transition for both transform and opacity
    catImage.style.transform = 'scale(0)'; // Shrink cat image to the center
    catImage.style.opacity = '0'; // Fade out cat image

    // Clear any existing messages after animation completes
    setTimeout(() => {
        chatBox.innerHTML = ''; // Clear chat box content
        chatBox.style.transition = ''; // Reset transition property
        chatBox.style.transform = 'scale(1)'; // Reset scale to original size
        chatBox.style.opacity = '1'; // Reset opacity to fully visible
        chatBox.style.display = 'none'; // Hide chat box again
        
        catImage.style.transition = ''; // Reset transition property
        catImage.style.transform = 'scale(1)'; // Reset scale to original size
        catImage.style.opacity = '1'; // Reset opacity to fully visible
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
