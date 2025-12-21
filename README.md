# red-nose-rebels

## Audio Management

The game uses sound to make playing more fun. I organized all the audio files and made them work smoothly across the whole project.

**How sounds are loaded:**
When the game starts, all sounds (dice rolling, winning, losing, and the bell when you pick a reindeer) are loaded from the `assets/audio` folder. Each sound is set up once and stored in memory so it can be played quickly when needed.

**How sounds are played and reused:**
Instead of creating new sounds every time, the same sound objects are used over and over. When you roll the dice, the dice sound plays. When you hover over a reindeer, a bell sound plays. After each sound finishes, it stops and resets to the beginning so it can play again the next time.

**Stopping sounds:**
If something else happens in the game, all sounds stop at once. This prevents sounds from overlapping and getting messy. For example, if you click a button while the dice sound is playing, the old sound stops immediately.

**Better game experience:**
Sound gives you instant feedback. You hear a bell when you pick a reindeer, a rolling noise when the dice rolls, and cheering when you win. This makes the game feel more alive and exciting.

**User control:**
Players can turn sound on and off with the audio button at the top. When you close the game and come back later, the site remembers if you had sound on or off.

**Browser protection:**
Modern browsers block sound from playing automatically to protect users from annoying websites. Because of this, when you first load the game, you need to click somewhere on the page to unlock the sounds. After that, the bell will play every time you move your mouse over a reindeer card, or when you click on it to pick it for your race.


## Bootstrap Usage and Animations

I used Bootstrap and CSS animations to create a clean, modern look and make the site feel responsive on all devices.

**Bootstrap for layout and responsiveness:**
Bootstrap helped me build the page structure quickly. Buttons use Bootstrap classes for consistent styling and sizing. The grid system makes sure everything looks good on phones, tablets, and computers. Containers and spacing (`padding`, `margin`, `gap`) keep things organized and easy to read. Elements like modals (popup windows) and responsive menus come built-in from Bootstrap.

**Simple animations:**
I added animations to make the game feel more alive. Here are the animations I created:

- **Button hover effects:** When you point at a button, it moves up slightly and gets a shadow, making it feel clickable.
- **Dice spinning:** When you roll the dice, it spins smoothly in a circle for a short moment.
- **Snow falling:** In the win and lose screens, snowflakes gently fall down, creating a winter feeling.
- **Winner celebrations:** When you win, your reindeer bounces up and down. An arrow slides back and forth to guide your eye. A red nose blinks to celebrate Rudolph's magic.
- **Victory animations:** The winning reindeer bounces and pulses to show excitement.

All these animations use CSS transitions (smooth color and size changes on hover) and keyframe animations (more complex movements). They run smoothly without slowing down the game.

## Reindeer Cards and Game Screen

**How the reindeer cards work:**
Each reindeer is a button with an image, name, and colorful styling. The cards use Bootstrap button classes as a base, then I added custom colors and effects. Each button holds the reindeer's name using a `data-reindeer` attribute so the game knows which one you picked.

When you point your mouse at a card, it moves up, gets bigger, and the reindeer image inside rotates and scales up. The card changes from white to a purple gradient. When you click a card, it stays highlighted so you know which reindeer you chose. All of this happens smoothly with CSS transitions (smooth color and position changes).

**How the game screen is organized:**
The game screen is divided into clear sections:

- **Top area:** Shows which reindeer you picked and the "Spin the Dice" button.
- **Racing tracks:** Two horizontal tracks (one for you, one for Rudolph) with your token and Rudolph's token moving along them. The tracks have borders and gentle shadows to stand out.
- **Dice section:** The dice image appears here when you roll, and it spins with animation while rolling.
- **Event area:** After each roll, a message tells you if something special happened (like slipping on ice or finding a shortcut).

The whole game screen has a light gradient background with a subtle glass-morphism effect (a frosted glass look). This makes it feel modern and keeps the focus on the game. Everything is centered and responsive, so it looks good on phones, tablets, and computers.

**Token movement:**
The player and Rudolph tokens are positioned along the track using CSS classes. As you roll the dice, the JavaScript code moves the tokens by adding new position classes. This makes the animation smooth and the code clean.


## Wireframes

Before I started coding, I drew wireframes to plan the entire project. Wireframes are simple drawings that show where things go on the screen.

**What the wireframes show:**
The wireframes display all four game screens: the start screen (where you pick a reindeer), the game screen (where you roll dice and race), the win screen (when you reach the finish), and the lose screen (when Rudolph wins). Each wireframe shows where buttons, text, and game elements should be placed.

**Mobile-first design:**
I designed the wireframes for phones first, then made sure they work well on bigger screens like tablets and computers. This makes sure the game is easy to play on any device.

**Wireframes guided development:**
During coding, I looked back at the wireframes to remember how the layout should look. They helped me make the right decisions about spacing, button placement, and screen flow. The wireframes acted like a map to build the game.

![Project wireframes showing all game screens](documentation/wireframes.png)