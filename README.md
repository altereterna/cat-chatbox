# Twitch Chat Overlay

## Overview

This project creates a customizable Twitch chat overlay for live streaming environments using HTML, CSS, and JavaScript. The overlay integrates with StreamElements for real-time chat updates and provides visual enhancements to engage viewers during broadcasts.

## Features

### JavaScript Code

- **Message Handling**: Displays incoming chat messages from StreamElements.
- **Message Formatting**: Truncates long messages and replaces emote codes with images.
- **Badge Display**: Adds badges next to messages based on user roles (e.g., broadcaster, moderator).
- **Idle Timer**: Resets the chat box and animated cat image after 15 seconds of inactivity.
- **Event Listeners**: Listens for new chat events and widget load events for initialization.

### CSS Code

- **Styling**: Applies a pixel art theme to the chat box overlay.
- **Font Import**: Imports the "Press Start 2P" font from Google Fonts for a retro gaming aesthetic.
- **Animation**: Defines animations for smooth message entry (`slideIn` animation).
- **Layout**: Positions and styles the chat box, messages, badges, and an animated cat image.
- **Visibility**: Ensures messages and elements are displayed attractively and legibly on screen.

## Getting Started

To use the Twitch chat overlay:

1. Copy the HTML (`web.html`), JavaScript (`script.js`) and CSS (`styles.css`) code snippets into your StreamElements .
2. Customize the CSS styles and emote/badge mappings (`emotes`, `badges`) as needed.
3. Integrate with StreamElements or modify event listeners (`onEventReceived`, `onWidgetLoad`) for other chat sources.

## Usage

- Ensure your streaming platform supports browser source overlays.
- Adjust the overlay position and styling (`#chat-box`, `.chat-message`, `.chat-badge`, `.cat-image`) to fit your stream layout.
- Test the overlay during broadcasts to verify message display, animations, and overall functionality.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Special thanks to StreamElements for providing chat integration.
- Pixel art font "Press Start 2P" by Google Fonts.
- Ness my AI
