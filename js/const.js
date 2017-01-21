// Preloader
const PRELOADER_BACKGROUND = "#29ADFF";
const PRELOADER_LOGO_SCALE_FACTOR = 3;
const PRELOADER_PRELOAD_BAR_OFFSET_Y = 250;
const PRELOADER_PRELOAD_BAR_SCALE_FACTOR = 3;

// Main menu
const MAIN_MENU_PLAY_BUTTON_WIDTH = 300;
const MAIN_MENU_PLAY_BUTTON_HEIGHT = 100;
const MAIN_MENU_LOGO_SCALE_FACTOR = 3;
const MAIN_MENU_PLAY_BUTTON_OFFSET_Y = 250;
const MAIN_MENU_PLAY_BUTTON_FONT_SIZE = "32px";
const MAIN_MENU_PLAY_BUTTON_FONT_FAMILY = "uni0553";
const MAIN_MENU_PLAY_BUTTON_TEXT_COLOR = "#fff";

// Scene
/* Countdown */
const DURATION = 60;
const COUNTDOWN_FONT_SIZE = "72px";
const COUNTDOWN_FONT_FAMILY = "uni0553";
const COUNTDOWN_TEXT_COLOR = "#8B3F8B";
const COUNTDOWN_TEXT_SHADOW_COLOR = "rgba(163, 73, 164, 0.7)";
const COUNTDOWN_TEXT_SHADOW_X = 4;
const COUNTDOWN_TEXT_SHADOW_Y = 4;
const COUNTDOWN_TEXT_SHADOW_BLUR = 7;

/* Health bar */
const HEALTH_BAR_WIDTH = 540;

/* Wave list */
const MEGAWAVE1 = [0,1,2,3,4,5,6,7,8,9];
const MEGAWAVE2 = [0,1,2,3,4,5,6,7,8,9];
const MEGAWAVE3 = [0,1,2,3,4,5,6,7,8,9];
const MEGAWAVE4 = [0,1,2,3,4,5,6,7,8,9];
const MEGAWAVE5 = [0,1,2,3,4,5,6,7,8,9];
const MEGAWAVE6 = [0,1,2,3,4,5,6,7,8,9];


/* Player variables */
const PLAYERLIFE = 50;
const PLAYER1X = 284;
const PLAYER1Y = 400;
const PLAYER2X = 700;
const PLAYER2Y = 400;


/* Waves variables */
const LARGESPRITEX = 0;
const LARGESPRITEY = 200;
const ATK = 1;
const DEF = 2;
const WAVEWIDTH = 256;
const WAVEHEIGHT = 40;
const WAVESPEED = 2; // -WAVESPEED px toutes les 16 ms
const WAVE_POSITION_UPDATE_TIME = 30 //en ms, periode de mise à jour de la vitesse
const WAVELENGTH = 10; // nombre
const WAVE_VALUES_UPDATE_TIME = 1000; // en ms, periode de mise à jour de la valeur
const WAVE_TEXT_POSX = 50;
const WAVE_TEXT_POSY = 50;
const WAVE_FONT_SIZE = '20px';
const WAVE_FONT_FAMILY = 'arial';
const WAVE_TEXT_COLOR = '#FF0000';
const WAVE_TEXT_ALIGN = 'left'
const WAVE_RESET_DELAY = 2000;
const LOCK_WAVE_SELECTION_DELAY = 200;
const WAVE_BIG_POSX = 65;
const WAVE_BIG_POSY = 180;

// Waves states
const WAVE_DEFAULT = 0;
const WAVE_SELECTED = 1;
const WAVE_ACTIVE = 2;
const WAVE_COOLDOWN = 3;
