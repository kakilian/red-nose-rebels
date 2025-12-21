# Placeholder: Link to Live Game

# Red-Nose Rebels

## Welcome to Red-Nose Rebels, your rebellious Christmas challenge!

# Placeholder: Mock-up from Am-I-Responsive

Red-Nose Rebels is a classic board game in which Father Christmas’s reindeer have grown tired of Rudolph’s prominent role during the annual festive season. Players choose one of Father Christmas’s reindeer — Dasher, Dancer, Prancer, Vixen, Comet, Cupid, Donner, or Blitzen — to challenge Rudolph in a race to the finish line.

The winning reindeer not only earns the coveted pole position in the annual race to deliver presents on time, but also gets to wear Rudolph’s famous red nose (hence the name Red-Nose Rebels). While the game follows a straightforward and accessible set of rules, it encourages strategic thinking and creativity within a festive setting.

So, join us on the track and compete to claim the most famous red nose in history. After all, rolling the dice has never been more fun!

## Purpose, Goals and User Information

### Purpose

Red-Nose Rebels is a festive, browser-based board game designed to provide an engaging and accessible gaming experience inspired by traditional dice-based race games. The project combines playful storytelling with interactive gameplay, focusing on usability, visual appeal, and responsiveness across devices. It also serves as a technical demonstration of front-end development skills within a creative, seasonal context.


### Primary Goals

Create a fun and intuitive dice-based game that can be easily understood and played by a wide audience.

Deliver a visually engaging experience through animations, sound effects, and themed design elements.

Implement clear game logic that allows a human player to compete against a computer-controlled opponent.

Ensure the game is fully responsive and playable on mobile, tablet, and desktop devices.


### Secondary Goals

Demonstrate technical competence in HTML, CSS, and JavaScript through interactive elements, animations, and game logic.

Apply modern front-end practices, including structured assets, reusable components, and clean code organisation.

Explore user experience design principles such as feedback, accessibility, and intuitive interaction.

Lay groundwork for future expansion, such as additional players, game modes, or enhanced visual effects.


### Target Users

The game is intended for casual players of all ages who enjoy simple, luck-based games with a festive theme. It is particularly suitable for users looking for a short, entertaining experience that does not require prior gaming knowledge or complex instructions.


### User Stories

1. As a developer, I want index.html to correctly reference existing favicon, fonts, CSS, and JS files so that the application loads with the intended structure and styling.

2. As a user, I want the game to have a consistent visual identity so it feels polished and cohesive.

3. As a user, I want to control sound and animations (on/off) so I can play comfortably depending on my device and preference.

4. As a user, I want to open a close-up view of the dice result so I can clearly see what I rolled.

5. As a user, I want to click a Roll button and see a dice animation so the game feels interactive, and then see the rolled result displayed clearly.

6. As a user, I want the game to look dark and festive but remain easy to read so I can enjoy playing it.

7. As a user, I want to clearly see when the game is finihsed so I know who won.

8. As a user, I want random events to affect movement so each game feels different.

9. As a user, I want to play against Rudolph so here is a clear rival in the game.

10. As a user, I want my reindeer to move step by step across the board so I can track my progress.


## Design

### Visual Design

The main design goal of the team was to base the game on an unconventional festive theme. Spooky trees appear in the background, through which the racing reindeer must travel. While the game is inspired by Tim Burton’s The Nightmare Before Christmas, it does not replicate its Halloween-inspired aesthetic. Instead, the game pays homage both to traditional festive imagery and to the darker undercurrents that often accompany such cultural events.

Finally, Red-Nose Rebels aims to appeal to players who habitually question received wisdom and tradition by challenging Rudolph’s prominent position as pars pro toto for all rebellious spirits who choose to embrace the festive season without uncritically accepting the status quo.

### Audio Management

The game uses sound to make playing more fun. I organized all the audio files and made them work smoothly across the whole project.

How sounds are loaded: When the game starts, all sounds (dice rolling, winning, losing, and the bell when you pick a reindeer) are loaded from the assets/audio folder. Each sound is set up once and stored in memory so it can be played quickly when needed.

How sounds are played and reused: Instead of creating new sounds every time, the same sound objects are used over and over. When you roll the dice, the dice sound plays. When you hover over a reindeer, a bell sound plays. After each sound finishes, it stops and resets to the beginning so it can play again the next time.

Stopping sounds: If something else happens in the game, all sounds stop at once. This prevents sounds from overlapping and getting messy. For example, if you click a button while the dice sound is playing, the old sound stops immediately.

Better game experience: Sound gives you instant feedback. You hear a bell when you pick a reindeer, a rolling noise when the dice rolls, and cheering when you win. This makes the game feel more alive and exciting.

User control: Players can turn sound on and off with the audio button at the top. When you close the game and come back later, the site remembers if you had sound on or off.

Browser protection: Modern browsers block sound from playing automatically to protect users from annoying websites. Because of this, when you first load the game, you need to click somewhere on the page to unlock the sounds. After that, the bell will play every time you move your mouse over a reindeer card, or when you click on it to pick it for your race.


### Bootstrap  Utilisation and Animations

We used Bootstrap and CSS animations to create a clean, modern look and make the site feel responsive on all devices.

Bootstrap for layout and responsiveness: Bootstrap helped me build the page structure quickly. Buttons use Bootstrap classes for consistent styling and sizing. The grid system makes sure everything looks good on phones, tablets, and computers. Containers and spacing (padding, margin, gap) keep things organized and easy to read. Elements like modals (popup windows) and responsive menus come built-in from Bootstrap.

Simple animations: I added animations to make the game feel more alive. Here are the animations I created:

Button hover effects: When you point at a button, it moves up slightly and gets a shadow, making it feel clickable.
Dice spinning: When you roll the dice, it spins smoothly in a circle for a short moment.
Snow falling: In the win and lose screens, snowflakes gently fall down, creating a winter feeling.
Winner celebrations: When you win, your reindeer bounces up and down. An arrow slides back and forth to guide your eye. A red nose blinks to celebrate Rudolph's magic.
Victory animations: The winning reindeer bounces and pulses to show excitement.
All these animations use CSS transitions (smooth color and size changes on hover) and keyframe animations (more complex movements). They run smoothly without slowing down the game.


### Reindeer Cards and Game Screen

How the reindeer cards work: Each reindeer is a button with an image, name, and colorful styling. The cards use Bootstrap button classes as a base, then I added custom colors and effects. Each button holds the reindeer's name using a data-reindeer attribute so the game knows which one you picked.

When you point your mouse at a card, it moves up, gets bigger, and the reindeer image inside rotates and scales up. The card changes from white to a purple gradient. When you click a card, it stays highlighted so you know which reindeer you chose. All of this happens smoothly with CSS transitions (smooth color and position changes).

How the game screen is organized: The game screen is divided into clear sections:

Top area: Shows which reindeer you picked and the "Spin the Dice" button.
Racing tracks: Two horizontal tracks (one for you, one for Rudolph) with your token and Rudolph's token moving along them. The tracks have borders and gentle shadows to stand out.
Dice section: The dice image appears here when you roll, and it spins with animation while rolling.
Event area: After each roll, a message tells you if something special happened (like slipping on ice or finding a shortcut).
The whole game screen has a light gradient background with a subtle glass-morphism effect (a frosted glass look). This makes it feel modern and keeps the focus on the game. Everything is centered and responsive, so it looks good on phones, tablets, and computers.

Token movement: The player and Rudolph tokens are positioned along the track using CSS classes. As you roll the dice, the JavaScript code moves the tokens by adding new position classes. This makes the animation smooth and the code clean.


### Wireframes

Before we started coding, we used wireframes to plan the entire project. Wireframes are simple drawings that show where things go on the screen.

What the wireframes show: The wireframes display all four game screens: the start screen (where you pick a reindeer), the game screen (where you roll dice and race), the win screen (when you reach the finish), and the lose screen (when Rudolph wins). Each wireframe shows where buttons, text, and game elements should be placed.

Mobile-first design: I designed the wireframes for phones first, then made sure they work well on bigger screens like tablets and computers. This makes sure the game is easy to play on any device.

Wireframes guided development: During coding, I looked back at the wireframes to remember how the layout should look. They helped me make the right decisions about spacing, button placement, and screen flow. The wireframes acted like a map to build the game.

![Wireframes](documentation/wireframes.png)


