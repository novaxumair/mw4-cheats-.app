export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  role?: 'mod';
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  author: string;
  age: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
}

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Guides & Loadouts', tone: 'blue', icon: 'navBlog' },
  { name: 'Patch Talk', tone: 'orange', icon: 'refresh' },
  { name: 'Community', tone: 'green', icon: 'messageCircle' },
] as const;

function countComments(comments: ForumComment[]): number {
  return comments.reduce((total, comment) => total + 1 + countComments(comment.replies ?? []), 0);
}

function discussion(post: Omit<ForumPost, 'commentsCount'>): ForumPost {
  return { ...post, commentsCount: countComments(post.comments) };
}

const mod = (body: string, age: string, score: number): ForumComment => ({
  author: 'mw4_mod',
  role: 'mod',
  age,
  score,
  body,
});

export const forumPosts: ForumPost[] = [
  discussion({
    slug: 'best-mw4-cheat-features-competitive-thread',
    category: 'Guides & Loadouts',
    categoryTone: 'blue',
    title: 'Which MW4 modules matter most in 6v6?',
    excerpt: 'People arguing distance caps, radar zoom, and what to turn off before a sweaty lobby.',
    author: 'six_stack',
    age: '12 hours ago',
    upvotes: 56,
    flair: 'Discussion',
    sourceTitle: 'Best MW4 cheat features for competitive play',
    sourcePath: '/blog/best-mw4-cheat-features-competitive/',
    body: [
      'Ran the competitive guide last night on the new 6v6 maps. I left loot, skeletons, and snaplines on and I could not see the doorway I was holding. What are you actually leaving enabled?',
    ],
    comments: [
      {
        author: 'door_holder',
        age: '11 hours ago',
        score: 22,
        body: 'Corner box, plates, health, distance. Skeleton off. Loot off. If the box already tells you the squad, the name tag is just clutter.',
        replies: [
          {
            author: 'six_stack',
            age: '10 hours ago',
            score: 9,
            body: 'That was the problem. I had copied the Hajin file into 6v6 and the contract icons were still on.',
          },
        ],
      },
      {
        author: 'igl_notes',
        age: '9 hours ago',
        score: 14,
        body: 'Radar zoomed to the block, not the whole map. Once it matched the ESP cap our duo stopped calling two different people.',
      },
      {
        author: 'fps_watch',
        age: '8 hours ago',
        score: 11,
        body: 'If the frames dip, shorten distance before you touch aim smoothing. Smoothing is not what is eating the GPU.',
        replies: [
          {
            author: 'platecheck',
            age: '7 hours ago',
            score: 6,
            body: 'Same here. Dropping skeletons got me the frames back. The distance cap was the second cut, not the first.',
          },
        ],
      },
      {
        author: 'no_snap',
        age: '6 hours ago',
        score: 8,
        body: 'Aim circle only big enough for the doorway. If it covers half the room the killcam looks like a lock.',
      },
      mod('Save that as its own file. Do not keep editing the DMZ preset and hoping you remember to turn loot off.', '5 hours ago', 17),
    ],
  }),
  discussion({
    slug: 'mw4-cheats-explained-faq',
    category: 'General',
    categoryTone: 'purple',
    title: 'Is “private MW4 cheats” the same as free downloads?',
    excerpt: 'Launch-week argument about free aimbots, Secure Boot, and what private actually means.',
    author: 'cold_boot',
    age: '1 day ago',
    upvotes: 41,
    flair: 'FAQ',
    sourceTitle: 'Modern Warfare 4 Cheats at Launch',
    sourcePath: '/blog/modern-warfare-4-cheats-explained/',
    body: [
      'Half the videos under “MW4 cheats” are still Call of Duty 4 intel codes. The other half are a Mega link. Is a private build actually different, or is it the same file with a price?',
    ],
    comments: [
      {
        author: 'portal_only',
        age: '22 hours ago',
        score: 18,
        body: 'Different file, not a magic shield. Private means fewer people running that build and a status label. You can still get banned.',
        replies: [
          {
            author: 'cold_boot',
            age: '21 hours ago',
            score: 7,
            body: 'So the label is the part I should check, not the word undetected in the title of a video.',
          },
        ],
      },
      {
        author: 'wrong_game',
        age: '20 hours ago',
        score: 12,
        body: 'The god-mode and give-ammo posts are the 2007 game. None of that works in 2026 multiplayer or DMZ.',
      },
      {
        author: 'secure_boot_guy',
        age: '18 hours ago',
        score: 9,
        body: 'A loader that told me to turn Secure Boot off also locked me out of every online mode. MW4 will not start a match like that.',
        replies: [
          mod('Leave TPM 2.0 and Secure Boot on. If a download says to disable them, it is the wrong file.', '17 hours ago', 24),
        ],
      },
      {
        author: 'readme_first',
        age: '14 hours ago',
        score: 6,
        body: 'Console is a dead end for ESP. PS5, Xbox, and Switch 2 will not run a second program next to the game.',
        replies: [
          {
            author: 'wrong_game',
            age: '13 hours ago',
            score: 3,
            body: 'Adapters that script recoil are still against the rules, and they still cannot draw a box. PC or nothing.',
          },
        ],
      },
    ],
  }),
  discussion({
    slug: 'patch-day-loader-offline',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'Loader offline after season drop—what now?',
    excerpt: 'Season update moved the build to Updating. People asking if they should force it.',
    author: 'status_bar',
    age: '3 hours ago',
    upvotes: 62,
    flair: 'Patch',
    sourceTitle: 'MW4 season update compatibility and patch day safety',
    sourcePath: '/blog/mw4-season-update-compatibility-patch-day-safety/',
    body: [
      'Client finished the season download and the cheat page says Updating. Menu still opens. Do I play one match or close it?',
    ],
    comments: [
      {
        author: 'backup_cfg',
        age: '2 hours ago',
        score: 19,
        body: 'Close it. I left mine injected through a hotfix and the overlay drew everyone at the origin. Zip the presets first so you are not rebuilding them at 1am.',
        replies: [
          {
            author: 'status_bar',
            age: '2 hours ago',
            score: 8,
            body: 'Presets are exported. Loader is closed. How long did Updating last for you last time?',
          },
        ],
      },
      {
        author: 'no_rage',
        age: '2 hours ago',
        score: 14,
        body: 'Last small patch was a few hours. The launch-week one sat most of a day. Season sized stuff is closer to the long one.',
      },
      {
        author: 'note_patch',
        age: '1 hour ago',
        score: 7,
        body: 'Someone in chat dropped a “fixed loader” link. I am not touching it, but people are.',
        replies: [
          mod('Do not. A patch day download from a chat is how the free builds spread. Wait until this page says Working, then test a private match.', '1 hour ago', 28),
        ],
      },
      {
        author: 'borderless',
        age: '40 minutes ago',
        score: 5,
        body: 'When it flips back, import your own file and look at one corner before you queue. My old distance number was nonsense after the last big update.',
        replies: [
          {
            author: 'backup_cfg',
            age: '30 minutes ago',
            score: 4,
            body: 'If the boxes are huge after import, do not “fix” it in a public lobby. Reset that slider in a private match.',
          },
        ],
      },
    ],
  }),
  discussion({
    slug: 'distance-cap-vs-radar-thread',
    category: 'Community',
    categoryTone: 'green',
    title: 'Anyone else syncing radar zoom to ESP caps?',
    excerpt: 'Duos want the same numbers. Solos keep a longer radar on purpose.',
    author: 'callout_crew',
    age: '6 hours ago',
    upvotes: 24,
    flair: 'Teamplay',
    sourceTitle: 'MW4 distance capping and radar optimization',
    sourcePath: '/blog/mw4-distance-capping-radar-optimization/',
    body: [
      'Our trio is talking over each other. I call a guy the radar shows and our entry says he is not on ESP. Are you forcing the radar range to match the box distance?',
    ],
    comments: [
      {
        author: 'stacked',
        age: '5 hours ago',
        score: 11,
        body: 'Yes, or you get double peeks. We copy the IGL numbers. If one person runs 80m radar and the others run 30m ESP, the calls are fiction.',
        replies: [
          {
            author: 'callout_crew',
            age: '5 hours ago',
            score: 4,
            body: 'That is us. I was the 80m guy. Cutting radar to their cap fixed the comms in one map.',
          },
        ],
      },
      {
        author: 'solo_q',
        age: '4 hours ago',
        score: 9,
        body: 'Solo I keep radar about 10m longer than ESP so I know a flank is coming before the box draws. In a stack I would not.',
      },
      {
        author: 'hajin_rat',
        age: '4 hours ago',
        score: 7,
        body: 'Do not use the 6v6 cap in Hajin. Squads show up way before 40 meters. That file stays separate.',
        replies: [
          {
            author: 'platecheck',
            age: '3 hours ago',
            score: 5,
            body: 'Second file named hajin, radar open, loot on a toggle. The 6v6 name is 6v6-35m so I stop “fixing” it back to max.',
          },
        ],
      },
      {
        ...mod('Match the numbers inside a squad. Solo can run a longer radar. Just do not import the Hajin file and then wonder why 6v6 is a mess.', '3 hours ago', 13),
        replies: [
          {
            author: 'solo_q',
            age: '2 hours ago',
            score: 2,
            body: 'Fair. My +10m thing stays on the solo preset only. The stack file matches the IGL.',
          },
        ],
      },
    ],
  }),
  discussion({
    slug: 'visibility-checks-thread',
    category: 'Guides & Loadouts',
    categoryTone: 'blue',
    title: 'Visibility checks saved me from tabbing back in confusion',
    excerpt: 'Aim was sticking through walls until the visibility check matched the trigger.',
    author: 'line_of_sight',
    age: '1 day ago',
    upvotes: 31,
    flair: 'Mechanics',
    sourceTitle: 'MW4 visibility checks and bone selection settings',
    sourcePath: '/blog/mw4-visibility-checks-bone-selection/',
    body: [
      'Crosshair kept dragging onto people behind the brick. Trigger then fired as soon as a pixel showed. I thought the build was broken.',
    ],
    comments: [
      {
        author: 'chest_first',
        age: '23 hours ago',
        score: 15,
        body: 'Visibility has to be on for aim and trigger. If only aim has it, the trigger shoots the shoulder before the crosshair clears the corner.',
        replies: [
          {
            author: 'line_of_sight',
            age: '22 hours ago',
            score: 6,
            body: 'Trigger was the one with it off. Turned both on and the drag through the wall stopped.',
          },
        ],
      },
      {
        author: 'head_glitch',
        age: '20 hours ago',
        score: 8,
        body: 'Closest bone grabbed a foot because a foot entered the circle first. Chest is less stupid for doorways.',
      },
      {
        author: 'ping_40',
        age: '18 hours ago',
        score: 7,
        body: 'I still use head when I am already aimed at the head and the circle is tiny. Chest the rest of the time. The swap key is not next to sprint anymore.',
        replies: [
          mod('One rule per preset. Mixing bones mid-round is how you forget which mode you are in and stick a downed player in the doorway.', '16 hours ago', 12),
        ],
      },
      {
        author: 'skip_downed',
        age: '12 hours ago',
        score: 5,
        body: 'Skip downed and skip teammates. Visibility does not know you meant to thirst. It just locks whoever is in the circle.',
        replies: [
          {
            author: 'line_of_sight',
            age: '11 hours ago',
            score: 3,
            body: 'That was the second swing. It left the guy shooting me and stuck the downed one in the door. Skip is on now.',
          },
        ],
      },
    ],
  }),
  discussion({
    slug: 'skin-changer-local-preview',
    category: 'Community',
    categoryTone: 'green',
    title: 'Skin changer presets survive small patches?',
    excerpt: 'Local camo preview versus people expecting the lobby to see the store skin.',
    author: 'loadout_lab',
    age: '2 days ago',
    upvotes: 19,
    flair: 'Cosmetics',
    sourceTitle: 'MW4 unlockable operators & weapon blueprints directory',
    sourcePath: '/blog/mw4-unlockable-operators-weapon-blueprints-directory/',
    body: [
      'Previewed a blueprint locally and my friend said I still looked default. Did the season wipe the preset, or does nobody else ever see it?',
    ],
    comments: [
      {
        author: 'vanilla_reset',
        age: '2 days ago',
        score: 14,
        body: 'They do not see it. It is your screen. The account did not unlock the skin, and the lobby is not supposed to match your preview.',
        replies: [
          {
            author: 'loadout_lab',
            age: '2 days ago',
            score: 4,
            body: 'Alright, that is on me. I thought it was a server unlock.',
          },
        ],
      },
      {
        author: 'preset_bank',
        age: '1 day ago',
        score: 8,
        body: 'Small hotfixes kept my local preset. The season update did not. I re-imported after the status said Working.',
      },
      {
        author: 'camo_grind',
        age: '1 day ago',
        score: 6,
        body: 'Do not hand the login to a bot lobby to finish a mastery camo. That is a different ban than a preview looking wrong.',
        replies: [
          mod('Nobody here needs the account password for a camo. If a service asks for it, that is not the skin changer.', '1 day ago', 16),
        ],
      },
      {
        author: 'bp_page',
        age: '20 hours ago',
        score: 3,
        body: 'Actual unlocks are still the in-game challenges and the store. The directory goes stale as soon as the next season page drops.',
        replies: [
          {
            author: 'loadout_lab',
            age: '18 hours ago',
            score: 2,
            body: 'Keeping the local preset for screenshots only. If I want the lobby to see it, I earn it in the client.',
          },
        ],
      },
    ],
  }),
  discussion({
    slug: 'what-does-mw4-esp-include',
    category: 'Guides & Loadouts',
    categoryTone: 'blue',
    title: 'What does the MW4 ESP guide include?',
    excerpt: 'Boxes, plates, and when a wallhack color should look different from a player you can shoot.',
    author: 'corner_box',
    age: '9 hours ago',
    upvotes: 61,
    flair: 'Guide Q&A',
    sourceTitle: 'MW4 ESP and wallhack guide for 6v6 and DMZ',
    sourcePath: '/blog/mw4-esp-wallhack-guide-6v6-dmz/',
    body: [
      'New to the overlay. Is ESP just boxes, or does wallhack mean chams too? I turned everything on and 6v6 is unreadable.',
    ],
    comments: [
      {
        author: 'dull_red',
        age: '8 hours ago',
        score: 17,
        body: 'Boxes or a recolor, your pick. Hidden players need a duller color than visible ones or you pre-fire brick and look lost on the killcam.',
        replies: [
          {
            author: 'corner_box',
            age: '8 hours ago',
            score: 5,
            body: 'Mine were the same bright color both states. That explains the pre-fires.',
          },
        ],
      },
      {
        author: 'snapline_off',
        age: '7 hours ago',
        score: 11,
        body: 'Snaplines off. They drag your eye to the wrong corner. Plates and health stay. Name tags go if the box is enough.',
      },
      {
        author: 'exfil_watch',
        age: '6 hours ago',
        score: 9,
        body: 'In Hajin I stretch the distance and look at the extract before I call the helicopter. 6v6 stays short. Two files.',
        replies: [
          mod('Loot off during the fight, back on when you loot bags. Do not run the Hajin distance cap on a 6v6 map.', '5 hours ago', 15),
        ],
      },
      {
        author: 'fps_watch',
        age: '4 hours ago',
        score: 6,
        body: 'If it stutters, skeletons go first. Then shorten the cap. Do not delete the whole player layer.',
        replies: [
          {
            author: 'dull_red',
            age: '3 hours ago',
            score: 3,
            body: 'And check the hidden color while you are in there. A stutter fix does not help if both states are still the same neon.',
          },
        ],
      },
    ],
  }),
  discussion({
    slug: 'how-to-calibrate-aim-circle',
    category: 'Guides & Loadouts',
    categoryTone: 'blue',
    title: 'How do I calibrate the aim circle for the first time?',
    excerpt: 'First private match with the circle drawn. People saying shrink it until you miss some kills.',
    author: 'first_circle',
    age: '14 hours ago',
    upvotes: 54,
    flair: 'Guide Q&A',
    sourceTitle: 'MW4 aimbot vs soft aim: which is safer?',
    sourcePath: '/blog/mw4-aimbot-vs-soft-aim-safety/',
    body: [
      'Drew the aim circle in a private match and it covers half the screen. The crosshair finishes onto people I was not fighting. Where do you start?',
    ],
    comments: [
      {
        author: 'no_snap',
        age: '13 hours ago',
        score: 16,
        body: 'Shrink it until it only covers the doorway you are holding. Soft aim is you already looking at them. A circle that grabs the next room is just a lock with extra steps.',
        replies: [
          {
            author: 'first_circle',
            age: '12 hours ago',
            score: 5,
            body: 'Cut it down and I started missing some. That is what you want, right? The ones I still hit look normal.',
          },
        ],
      },
      {
        author: 'ads_only',
        age: '11 hours ago',
        score: 10,
        body: 'Leave it idle until you aim or shoot. If it hunts while you sprint, the circle is not the only problem.',
      },
      {
        author: 'killcam_check',
        age: '9 hours ago',
        score: 8,
        body: 'Watch one killcam before a public lobby. If the crosshair teleports with no mouse travel, it is still too fast.',
        replies: [
          mod('Working on the status page does not mean the circle is subtle. Rage settings on a good build still get reported.', '8 hours ago', 14),
        ],
      },
      {
        author: 'chest_first',
        age: '7 hours ago',
        score: 4,
        body: 'Calibrate on chest. Head is fine later when the circle is already small and you are aimed there.',
        replies: [
          {
            author: 'first_circle',
            age: '6 hours ago',
            score: 2,
            body: 'Chest plus the smaller circle. I will look at one killcam tonight before I touch a public lobby.',
          },
        ],
      },
    ],
  }),
  discussion({
    slug: 'trigger-delay-vs-ping',
    category: 'Guides & Loadouts',
    categoryTone: 'blue',
    title: 'Should trigger delay scale with ping?',
    excerpt: 'Zero delay looks like a macro. People comparing a delay they can feel against their ping.',
    author: 'hold_key',
    age: '11 hours ago',
    upvotes: 40,
    flair: 'Guide Q&A',
    sourceTitle: 'MW4 triggerbot setup and reaction tuning',
    sourcePath: '/blog/mw4-triggerbot-setup-reaction-tuning/',
    body: [
      'Trigger is on a hold key but delay is 0. On 20 ping it beams. On 70 it feels early and the killcam is ugly. Do you add delay when ping jumps?',
    ],
    comments: [
      {
        author: 'ping_40',
        age: '10 hours ago',
        score: 13,
        body: 'I add a little when the server feels late, but I do not copy a number from a video. Their ping is not mine. If I cannot feel the delay, it is too short.',
        replies: [
          {
            author: 'hold_key',
            age: '9 hours ago',
            score: 4,
            body: 'Bumped it until I could notice it. The 70 ping lobby stopped looking like a macro.',
          },
        ],
      },
      {
        author: 'same_bone',
        age: '8 hours ago',
        score: 9,
        body: 'Aim was on chest and the trigger was allowed to fire on any pixel. That mismatch felt like zero delay even after I raised it.',
      },
      {
        author: 'always_on',
        age: '7 hours ago',
        score: 6,
        body: 'Mine was always armed and it shot a teammate in a doorway. Hold key only. I will not go back.',
        replies: [
          mod('Same visibility rule as aim, enemy only, hold key. Zero delay plus no-recoil is the clip people save.', '6 hours ago', 15),
        ],
      },
      {
        author: 'range_no',
        age: '5 hours ago',
        score: 3,
        body: 'I leave it off for long vehicle-map shots. Instant trigger plus bullet travel looks worse than a doorway fight.',
        replies: [
          {
            author: 'same_bone',
            age: '4 hours ago',
            score: 2,
            body: 'Same. Doorways only, and only after aim and trigger agree on chest. Otherwise the delay number does not matter.',
          },
        ],
      },
    ],
  }),
  discussion({
    slug: 'radar-zoom-tips',
    category: 'Guides & Loadouts',
    categoryTone: 'blue',
    title: 'How should radar zoom pair with ESP distance?',
    excerpt: '2D radar versus a UAV streak, and how far the dots should reach.',
    author: 'minimap_guy',
    age: '8 hours ago',
    upvotes: 37,
    flair: 'Guide Q&A',
    sourceTitle: 'MW4 radar hack & UAV utility guide',
    sourcePath: '/blog/mw4-radar-hack-uav-utility-guide/',
    body: [
      'Is the 2D radar just a permanent UAV? I zoomed it to the whole 6v6 map and started chasing dots while someone walked through my door.',
    ],
    comments: [
      {
        author: 'igl_notes',
        age: '7 hours ago',
        score: 12,
        body: 'Not a UAV. A UAV is a streak and the other team gets a notice. This one just keeps drawing nearby players. On 6v6, zoom in until the dot that matters is the flank, not the spawn across the map.',
        replies: [
          {
            author: 'minimap_guy',
            age: '7 hours ago',
            score: 3,
            body: 'Zoomed in and I stopped running past the door. The full map was the mistake.',
          },
        ],
      },
      {
        author: 'hajin_rat',
        age: '6 hours ago',
        score: 8,
        body: 'Stretch it for Hajin and the vehicle maps. A short 6v6 radar will not warn you about a squad on the ridge.',
      },
      {
        author: 'mic_check',
        age: '5 hours ago',
        score: 7,
        body: 'If your friends are not running it, do not say “blue door, three plates” every life. Call it like a late UAV or you are the report.',
        replies: [
          mod('Enemy-only markers. A radar full of your own squad is noise, and exact plate calls on mic are louder than the overlay.', '4 hours ago', 11),
        ],
      },
      {
        author: 'origin_bug',
        age: '3 hours ago',
        score: 4,
        body: 'After the last patch every dot sat in the middle until the label said Working again. I had left it open. Do not do that.',
        replies: [
          {
            author: 'minimap_guy',
            age: '2 hours ago',
            score: 2,
            body: 'Closed mine. 6v6 zoom stays tight. Hajin gets the longer range in the other file, not on top of this one.',
          },
        ],
      },
    ],
  }),
  discussion({
    slug: 'loot-layer-when-to-enable',
    category: 'Guides & Loadouts',
    categoryTone: 'blue',
    title: 'When should loot ESP stay enabled?',
    excerpt: 'Hajin loot icons versus the squad that is actually on the extract.',
    author: 'bag_check',
    age: '16 hours ago',
    upvotes: 33,
    flair: 'Guide Q&A',
    sourceTitle: 'MW4 loot & DMZ asset ESP explained',
    sourcePath: '/blog/mw4-loot-dmz-asset-esp-explained/',
    body: [
      'Turned every loot category on in Hajin. Died at the helicopter because I was reading crate icons. What do you leave up?',
    ],
    comments: [
      {
        author: 'exfil_watch',
        age: '15 hours ago',
        score: 14,
        body: 'Extracts stay on the whole raid. Armor and a gun until you are kitted. Then hit the toggle and get the icons off before you fight.',
        replies: [
          {
            author: 'bag_check',
            age: '14 hours ago',
            score: 4,
            body: 'I never turned it off at the pad. That is the death. Extracts plus players only from now on.',
          },
        ],
      },
      {
        author: 'convoy',
        age: '13 hours ago',
        score: 8,
        body: 'A loot icon inside a guarded compound is not free. Check player ESP around it or you spend a minute on AI while a squad walks in.',
      },
      {
        author: 'six_stack',
        age: '11 hours ago',
        score: 6,
        body: 'Off completely in 6v6. There is nothing to loot that helps the round. If it is on, you imported the DMZ file.',
        replies: [
          mod('Players first, crates second. Cash can wait if a squad is already on you. Do not run both layers at full distance.', '10 hours ago', 12),
        ],
      },
      {
        author: 'platecheck',
        age: '8 hours ago',
        score: 3,
        body: 'Ammo stays on only when the gun is hungry. Random ground weapons go off once I have one I trust.',
        replies: [
          {
            author: 'bag_check',
            age: '7 hours ago',
            score: 2,
            body: 'Doing that. Extracts stay. Everything else is a toggle I actually hit, not a permanent Christmas tree.',
          },
        ],
      },
    ],
  }),
  discussion({
    slug: 'stream-proof-test',
    category: 'Guides & Loadouts',
    categoryTone: 'blue',
    title: 'How do I test stream-proof mode safely?',
    excerpt: 'OBS showed boxes on a display capture. People comparing game capture and a local recording.',
    author: 'vod_check',
    age: '13 hours ago',
    upvotes: 29,
    flair: 'Guide Q&A',
    sourceTitle: 'MW4 stream-proof overlay & content creator setup',
    sourcePath: '/blog/mw4-stream-proof-overlay-content-creator-setup/',
    body: [
      'Turned stream-proof on and went live for ten minutes to “see.” VOD has the radar in the corner. How are you testing this without doing that?',
    ],
    comments: [
      {
        author: 'scene_two',
        age: '12 hours ago',
        score: 15,
        body: 'Record locally with the same scene you stream. Game capture, not a picture of the whole monitor. Watch the file full screen before anyone else does.',
        replies: [
          {
            author: 'vod_check',
            age: '12 hours ago',
            score: 5,
            body: 'I was on display capture because game capture was black. That is why the radar was in the VOD.',
          },
        ],
      },
      {
        author: 'facecam',
        age: '10 hours ago',
        score: 8,
        body: 'Hiding the boxes does not hide the tracking. If you beam through three walls on facecam, the drawing was never the tell.',
      },
      {
        author: 'menu_key',
        age: '8 hours ago',
        score: 6,
        body: 'Bind the menu somewhere you do not hit while you read chat. I opened it on stream last month. Second scene with the overlay forced off is the backup.',
        replies: [
          mod('Test again after every game update. The hook breaks. And do not go live while the status says Updating just to show the menu.', '7 hours ago', 13),
        ],
      },
      {
        author: 'quiet_cfg',
        age: '5 hours ago',
        score: 4,
        body: 'Stream the quiet 6v6 file. I forgot and loaded Hajin loot once. Local recording caught it. Live would have too.',
        replies: [
          {
            author: 'vod_check',
            age: '4 hours ago',
            score: 2,
            body: 'Switched to game capture and recorded a minute. Radar is gone from the file. I am not going live until I do that again after the next patch.',
          },
        ],
      },
    ],
  }),
  discussion({
    slug: 'hwid-before-or-after-install',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'Should I spoof before reinstalling MW4?',
    excerpt: 'Second account still blocked. People separating that from an account-only ban.',
    author: 'second_login',
    age: '18 hours ago',
    upvotes: 45,
    flair: 'Hardware',
    sourceTitle: 'MW4 HWID spoofer guide for PC bans',
    sourcePath: '/blog/mw4-hwid-spoofer-guide-pc-bans/',
    body: [
      'Banned account is dead. Fresh account on the same PC dies at the same screen. Do I reinstall the game first, or is this the machine?',
    ],
    comments: [
      {
        author: 'restore_point',
        age: '17 hours ago',
        score: 16,
        body: 'If a second account you own fails the same way, it is the machine, not the login. Reinstalling MW4 does not change the identifiers the ban was tied to.',
        replies: [
          {
            author: 'second_login',
            age: '16 hours ago',
            score: 5,
            body: 'Both accounts, same text, after a reboot. So the spoofer page, not another Windows install.',
          },
        ],
      },
      {
        author: 'appeal_mail',
        age: '15 hours ago',
        score: 8,
        body: 'Spoofing will not bring the old account back. That appeal still goes through Activision if you want that login.',
      },
      {
        author: 'secure_boot_guy',
        age: '13 hours ago',
        score: 7,
        body: 'A guide told me to disable Secure Boot so the spoofer would run. MW4 then refused every online mode. I turned it back on before I did anything else.',
        replies: [
          mod('Restore point, one tool, cold boot, then check the result in the portal. TPM and Secure Boot stay on. Do not stack a random cleaner on top.', '12 hours ago', 18),
        ],
      },
      {
        author: 'vpn_no',
        age: '9 hours ago',
        score: 4,
        body: 'VPN did nothing. New email did nothing. Same PC. Wish I had tested the second account before buying three “unban” discords.',
        replies: [
          {
            author: 'restore_point',
            age: '8 hours ago',
            score: 3,
            body: 'Second account is the test. If it fails, stop reinstalling the game and read the spoofer limits before you run anything.',
          },
        ],
      },
    ],
  }),
  discussion({
    slug: 'account-workspace-scope',
    category: 'General',
    categoryTone: 'purple',
    title: 'What can the account workspace actually do?',
    excerpt: 'People mixing an appeal, a hardware ban, and services that want the password.',
    author: 'case_text',
    age: '1 day ago',
    upvotes: 28,
    flair: 'Accounts',
    sourceTitle: 'MW4 account unban & ban recovery solutions',
    sourcePath: '/blog/mw4-account-unban-ban-recovery-solutions/',
    body: [
      'Notice says the account is suspended. A guy in DMs says he can unban it if I send the password and he “files the ticket.” Is that what the workspace is?',
    ],
    comments: [
      {
        author: 'appeal_mail',
        age: '23 hours ago',
        score: 15,
        body: 'No. An unban is Activision lifting it on that login. The workspace helps you sort what kind of lock you have. It does not log in for you, and the answer can still be no.',
        replies: [
          {
            author: 'case_text',
            age: '22 hours ago',
            score: 6,
            body: 'Not sending the password. I will use the email on the account and quote the notice.',
          },
        ],
      },
      {
        author: 'second_login',
        age: '20 hours ago',
        score: 9,
        body: 'Test another account you already own on the same PC. If that one plays, stay on the appeal. If it dies too, you are in hardware-ban territory, not this form.',
      },
      {
        author: 'bot_lobby',
        age: '18 hours ago',
        score: 5,
        body: 'The password ask is the same pitch as the bot-lobby boosters. Shared logins get the second account banned too.',
        replies: [
          mod('Do not send a password to get a ticket filed. Appeals use the email on the account. Hardware blocks are a different product and a different thread.', '16 hours ago', 17),
        ],
      },
      {
        author: 'screenshot_it',
        age: '12 hours ago',
        score: 3,
        body: 'Save the exact wording before the notice expires in the browser. “Banned” in a chat is not a diagnosis.',
        replies: [
          {
            author: 'case_text',
            age: '11 hours ago',
            score: 2,
            body: 'Saved the suspension text. Other account still gets into a match, so I am staying on the appeal and leaving the spoofer alone.',
          },
        ],
      },
    ],
  }),
  discussion({
    slug: 'dma-vs-software',
    category: 'Community',
    categoryTone: 'green',
    title: 'Does the blog recommend DMA for MW4?',
    excerpt: 'DMA cards versus the software cheat. People asking if the card skips Secure Boot.',
    author: 'two_pc',
    age: '2 days ago',
    upvotes: 22,
    flair: 'Hardware',
    sourceTitle: 'Understanding DMA cards vs software cheats in MW4',
    sourcePath: '/blog/dma-cards-vs-software-cheats-mw4/',
    body: [
      'Read the DMA article and now a seller says the card is undetected and I can leave Secure Boot off. The blog did not sound like that. Which part did I miss?',
    ],
    comments: [
      {
        author: 'one_pc',
        age: '2 days ago',
        score: 13,
        body: 'You missed the part where DMA is a second computer and a card, and it still breaks on patch day. This site sells the software menu, not the card.',
        replies: [
          {
            author: 'two_pc',
            age: '2 days ago',
            score: 4,
            body: 'So the article is a comparison, not a shopping list. That tracks. The seller skipped the update part.',
          },
        ],
      },
      {
        author: 'secure_boot_guy',
        age: '1 day ago',
        score: 10,
        body: 'The gaming PC still has to pass TPM and Secure Boot. A card does not turn that off. Off means no online match.',
      },
      {
        author: 'firmware_week',
        age: '1 day ago',
        score: 7,
        body: 'Friend has a card. Season drop took his firmware and the second PC offline longer than my loader. He still waited. The word undetected did not survive the patch notes.',
        replies: [
          mod('We do not sell DMA hardware. If they cannot say what happens on the day MW4 updates, they are selling the label. Secure Boot stays on either way.', '1 day ago', 16),
        ],
      },
      {
        author: 'killcam_check',
        age: '20 hours ago',
        score: 3,
        body: 'Reports do not care which computer drew the box. A second monitor does not make a three-wall track look human.',
        replies: [
          {
            author: 'two_pc',
            age: '18 hours ago',
            score: 2,
            body: 'Staying on one PC and the software build. If Secure Boot has to stay on anyway, the seller’s pitch already fell apart.',
          },
        ],
      },
    ],
  }),
];

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}
