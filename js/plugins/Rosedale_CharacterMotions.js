/*:============================================================================
*
* @target MZ
*
* @author Chaucer
*
* @plugindesc | Character Motions : Version - 3.0.7 | Add motion( or action ) animaitions to your characters.
*
* @url http://rosedale-studios.com
*
* @help
* ╔════════════════════════════════════╗
* ║ ()()                                                              ()() ║
* ║ (^.^)                    - Rosedale Studios -                    (^.^) ║
* ║c(")(")                                                          (")(")ↄ║
* ╚════════════════════════════════════╝

*============================================================================
*  Instructions :
*============================================================================

*  This plugin s used to create custom motion animations for characters on the
* map! If you need further clarity, think the side view battlers, how they
* have idle, move, attack animations etc.. except for map characters!

*  Motion data is not specified at a character level! Instead motion data is
* set in the plugin manager, you can create as many motion data entries as you
* want, however each motion data entry should have a unique name! This name
* will be used via note tags, comments, and plugin commands to attach that
* specific motion data to a character instead. This can be useful to allow
* for on the fly changing of motion data!

*  This plugin allows for 3 default motions, 'idle' for when the player is not
* moving, 'walk' for when the character is moving, and 'dash' for when the
* character is dashing( or running ). However you are not limited to just
* these three motions, you can speciify an unlimited number of custom
* animmations, which can be called at any time via plugin commands!

*  On the note of plugin commands, since MV has a different plugin command
* format that MZ, I will documment how to use plugin commands for MV below!

*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ set_player_motion_data name N              ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ set the players motion data by name.       ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ N: The name of the motion data the player should use.                ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples ( MV ) :                                                    ║
*  ╠═══════════════════════════════════╣
*  ║ set_player_motion_data name knight                                   ║
*  ╚═══════════════════════════════════╝

*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ set_follower_motion_data id I name N       ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ set a followers motion data by name.       ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ I: Index of thhe follower( 1 being the first follower ).             ║
*  ║                                                                      ║
*  ║ N: The name of the motion data the follower should use.              ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples ( MV ) :                                                    ║
*  ╠═══════════════════════════════════╣
*  ║ set_follower_motion_data id 5 name female_knight                     ║
*  ╚═══════════════════════════════════╝

*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ set_event_motion_data id I name N          ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ set a events motion data by name.          ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ I: The id of the event to add motion data to.                        ║
*  ║                                                                      ║
*  ║ N: The name of the motion data the event should use.                 ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples ( MV ) :                                                    ║
*  ╠═══════════════════════════════════╣
*  ║ set_event_motion_data id 19 name skeleton                            ║
*  ╚═══════════════════════════════════╝

*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ set_actor_motion_data id I name N          ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ set an actors motion data by name.         ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ I: The id of the actor to add motion data to.                        ║
*  ║                                                                      ║
*  ║ N: The name of the motion data the actor should use.                 ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples ( MV ) :                                                    ║
*  ╠═══════════════════════════════════╣
*  ║ set_event_motion_data name skeleton                                  ║
*  ╚═══════════════════════════════════╝

*  Besides changing the motion data via plugin command, you can also specify
* data for actors via note tag, and when that actor is a visble party member
* on map, the motion you specified will be used automatically! Below are the
* note tags which should be used to achieve this.

*  ╔════════════╦══════════════════════╗
*  ║ Note Tag :             ║ <motion_data:NAME>                             ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ When this actor is in party, the motion    ║
*  ║                        ║ specified here will be used automatically. ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ NAME: The name of the motion data attached to the actor              ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ <motions:knight>                                                     ║
*  ╚═══════════════════════════════════╝

*  Motions can also be specified for events, they are not ust for player,
* and follower character! Below are the comments that should be used to
* attach motion data to an events page!

*  ╔════════════╦══════════════════════╗
*  ║ Comment :             ║ <motion_data:NAME>                              ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ When this page of the event is active, the ║
*  ║                        ║ specified here will be used automatically. ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ NAME: The name of the motion data attached to the event              ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ <motions:skeleton>                                                   ║
*  ╚═══════════════════════════════════╝

*  ╔════════════╦══════════════════════╗
*  ║ Comment :              ║ <direction: D>                             ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ Set the direction this page will start on. ║
*  ║                        ║                                            ║
*  ║                        ║ 1: down-left                               ║
*  ║                        ║ 2: down                                    ║
*  ║                        ║ 3: down-right                              ║
*  ║                        ║ 4: left                                    ║
*  ║                        ║ 6: right                                   ║
*  ║                        ║ 7: left-up                                 ║
*  ║                        ║ 8: up                                      ║
*  ║                        ║ 9: right-up                                ║
*  ║                        ║                                            ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ D: the numeric value for the direction the character will start at.  ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ <direction: 6>                                                       ║
*  ╚═══════════════════════════════════╝

*  Well, now that you have the motion data's attached to your characters you
* may be wondering how you call those custom animations you may have specified,
* these can be accessed via plugin commands, which are listed below!

*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ player_motion motion N wait B              ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ request player to start custom motion N.   ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ N: The name of the motion to start for the player.                   ║
*  ║                                                                      ║
*  ║ B: true or false, should event wait for motion before proceeding.    ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples ( MV ) :                                                    ║
*  ╠═══════════════════════════════════╣
*  ║ player_motion motion swing wait false                                ║
*  ╚═══════════════════════════════════╝

*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ follower_motion id J motion N wait B       ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ request follower to start custom motion N. ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ J: The ID of the follower to request a motion for.                   ║
*  ║                                                                      ║
*  ║ N: The name of the motion to start for the follower.                 ║
*  ║                                                                      ║
*  ║ B: true or false, should event wait for motion before proceeding.    ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples ( MV ) :                                                    ║
*  ╠═══════════════════════════════════╣
*  ║ follower_motion id 2 motion slash wait true                          ║
*  ╚═══════════════════════════════════╝

*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ event_motion id J motion N wait B          ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ request event to start custom motion N.    ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ J: The ID of the event to request a motion for.                      ║
*  ║                                                                      ║
*  ║ N: The name of the motion to start for the event.                    ║
*  ║                                                                      ║
*  ║ B: true or false, should event wait for motion before proceeding.    ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples ( MV ) :                                                    ║
*  ╠═══════════════════════════════════╣
*  ║ follower_motion id 8 motion throw_bone wait true                     ║
*  ╚═══════════════════════════════════╝

*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ player_stop_motion                         ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ stop the players looping animation.        ║
*  ╠════════════╩══════════════════════╣
*  ║ Examples ( MV ) :                                                    ║
*  ╠═══════════════════════════════════╣
*  ║ player_stop_motion                                                   ║
*  ╚═══════════════════════════════════╝

*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ follower_stop_motion id N                  ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ stop the followers looping animation.      ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ N: the ID of the follower to stop the motion for.                    ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples ( MV ) :                                                    ║
*  ╠═══════════════════════════════════╣
*  ║ follower_stop_motion id 1                                            ║
*  ╚═══════════════════════════════════╝

*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ event_stop_motion id N                     ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ stop the events looping animation.         ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ N: the ID of the event to stop the motion for.                       ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples ( MV ) :                                                    ║
*  ╠═══════════════════════════════════╣
*  ║ follower_stop_motion id 5                                            ║
*  ╚═══════════════════════════════════╝
*
*
*----------------------------------------------------------------------------
* Additional Notes:
*----------------------------------------------------------------------------
*
*----------------------------------------------------------------------------
* Walk Animations:
*----------------------------------------------------------------------------
*
*   When creating walk and run motions for a character, it important to
*   keep in mind, this plugin does NOT follow the default rpg maker walk
*   cycle format. In MV/MZ, walk sprites utilize 3 frame animations. Below
*   is an exmaple of how the sprite sheet is layed out, the numbers represent
*   the index of the animations.
*
*   ┌─┬─┬─┐
*   │1│2│3│ ( Down )
*   ├─┼─┼─┤
*   │1│2│3│ ( Left )
*   ├─┼─┼─┤
*   │1│2│3│ ( Right )
*   ├─┼─┼─┤
*   │1│2│3│ ( Up )
*   └─┴─┴─┘
*
*   The way the animations play in RPG Maker by default, is to default to
*   frame 2, when a character stands still, but when walking, it animates
*   in in the following order... 1 -> 2 -> 3 -> 2 -> 1 -> 2 -> 3 -> 2 -> etc...
*   The NEW way walk cycles is recommended to be formatted, as follows..
*
*   ┌─┬─┬─┬─┐
*   │1│2│3│4│ ( Down )
*   ├─┼─┼─┼─┤
*   │1│2│3│4│ ( Left )
*   ├─┼─┼─┼─┤
*   │1│2│3│4│ ( Right )
*   ├─┼─┼─┼─┤
*   │1│2│3│4│ ( Up )
*   └─┴─┴─┴─┘
*
*   Animations in the above example, will execute in the following order,
*   1 -> 2 -> 3 -> 4 -> 1 -> 2 -> 3 -> etc...
*   It is HIGHLY recommended to not use the default 3 frame walk sheets
*   that rpg maker uses by default, as they will look a bit odd.
*   Instead, it is recommended( not required ) to use a MINIMUM of 4 frame
*   walk sheets, you can easily modify the standard rpg maker sprites in
*   your favorite editing software to this new format, by simply copying
*   frame 2 of each direction, and pasting it into a newly added frame 4
*   slot( see above examples for reference ).
*
*----------------------------------------------------------------------------
* 8 Directional Sprite Sheets:
*----------------------------------------------------------------------------
*
*    When enabling 8 directional sprite sheets for motion data, please follow
*    the format specified below. In this example, we'll assume this sheet
*    uses the "$" symbol in it's name( or only contains a single actor ).
*    Assuming the arrows in each box are the direction the player faces
*    in each frame of the sprite sheet.
*
*    Default Spritesheet:                 8 Direction Sprite Sheet:
*   ┌─┬─┬─┐                               ┌─┬─┬─┐
*   │↓│↓│↓│                               │↙│↙│↙│
*   ├─┼─┼─┤                               ├─┼─┼─┤
*   │←│←│←│                               │↓│↓│↓│
*   ├─┼─┼─┤                               ├─┼─┼─┤
*   │→│→│→│                               │↘│↘│↘│
*   ├─┼─┼─┤                               ├─┼─┼─┤
*   │↑│↑│↑│                               │←│←│←│
*   └─┴─┴─┘                               ├─┼─┼─┤
*                                                │→│→│→│
*                                                ├─┼─┼─┤
*                                                │↖│↖│↖│
*                                                ├─┼─┼─┤
*                                                │↑│↑│↑│
*                                                ├─┼─┼─┤
*                                                │↗│↗│↗│
*                                                └─┴─┴─┘
*
*============================================================================
*  Terms Of Use :
*============================================================================
*
*   This Plugin may be used commercially, or non commercially. This plugin may
*  be extended upon. This plugin may NOT be shared, or passed to others
*  who have not purchased this product.
*
*============================================================================
*  Version History :
*============================================================================

* ● Version : 1.0.0
* ● Date : 22/12/2023
*    ★ Release.

* ● Version : 1.1.0
* ● Date : 23/12/2023
*   ★ Add - Wait mode for plugin command motions.
*   ★ Add - Conditional Motion Switches.

* ● Version : 1.1.1
* ● Date : 25/12/2023
*   ✩ Fix - typo in plugin parameters name( please refresh plugin! ).
*   ✩ Fix - typo in terms of use.

* ● Version : 1.1.2
* ● Date : 30/12/2023
*   ✩ Fix - issue with walk/run actions.

* ● Version : 1.1.3
* ● Date : 30/12/2023
*   ✩ Fix - crash on map transfer.

* ● Version : 1.1.4
* ● Date : 31/12/2023
*   ✩ Fix - minor issue with run animation continues playing after stopping.

* ● Version : 1.1.5
* ● Date : 07/01/2024
*   ✩ Fix - sprite flicker when walking through bushes

* ● Version : 1.1.6
* ● Date : 11/01/2024
*   ✩ Fix - Error when transfering maps/closing menus

* ● Version : 1.1.7
* ● Date : 14/01/2024
*   ✩ Fix - being able to move while custom motion is requested.
*   ✩ Fix - issue with velocity not being honored.

* ● Version : 1.2.0
* ● Date : 15/01/2024
*   ★ Add - a way to set direction per page for events( see comments ).

* ● Version : 1.2.1
* ● Date : 14/01/2024
*   ✩ Fix - a minor issue with the collision altering plugin.

* ● Version : 1.2.2
* ● Date : 14/01/2024
*   ✩ Fix - VisuMZ_1_EventsMoveCore bitmap smoothing setting is not honored.

* ● Version : 2.0.0
* ● Date : 03/02/2024
*   ★ Add - jump animation
*   ★ Add - climb
*   ★ Add - loop option for custom animations
*   ★ Add - stop plugin command for looping custom animations
*   ★ Add - 8 directional sprite support independent of the collision plugin.

* ● Version : 2.0.1
* ● Date : 11/02/2024
*   ✩ Fix - wait for completion was enabled even if set to false.

* ● Version : 2.0.2
* ● Date : 12/02/2024
*   ✩ Fix - walk & dash motions were not playing properly w/o Collision Plugin.
*   ✩ Fix - typos in plugin.

* ● Version : 2.1.0
* ● Date : 26/02/2024
*   ★ Add - switch for custom animations to prevent preloading into memory
*   ✩ Fix - dash and walk motion change frequency.

* ● Version : 3.0.0
* ● Date : 19/04/2024
*   ★ Add - Walk Speed Modifier per motion.
*   ★ Add - Change Actor Motion Data command.
*   ★ Add - Large rewrite, to improve stability, and performance.
*   ★ Add - more documentation, and cleaned up existing documentation.
*   ✩ Change - note tag to set data from <motions:N> to <motion_data:N>.
*   ✩ Fix - crash when opening menu/changing map mid-motion.
*   ✩ Fix - Issue with changing player/follower sprite via plugin command.
*   ✩ Fix - Inability to clear motion data with a blank string in a command.
*   ✩ Fix - Stop motion commands were unavailable in MZ.

* ● Version : 3.0.1
* ● Date : 20/04/2024
*   ✩ Fix - Motion Data List was broken in MV!

* ● Version : 3.0.2
* ● Date : 20/04/2024
*   ✩ Fix - Set Motion Data commands not working!

* ● Version : 3.0.3
* ● Date : 30/04/2024
*   ✩ Fix - follower motion data was not being set properly from actor notes
*   ✩ Fix - issue with setting motion data for events via plugin command.
*   ✩ Fix - issue with constantly setting motion data.

* ● Version : 3.0.4
* ● Date : 26/05/2024
*   ✩ Fix - Utils.encodeURI is not a function error in MV.

* ● Version : 3.0.5
* ● Date : 29/05/2024
*   ✩ Fix - clearing motion data did not work if note tag was used.
*   ✩ Fix - clearing motion data error in MV.
*   ✩ Fix - A warning appears( instead of crash ), if wrong motion name called.
*   ✩ Fix - Error in clearing motion bitmaps on MV.

* ● Version : 3.0.6
* ● Date : 30/05/2024
*   ✩ Fix - Crash when followers have no actor data.
*   ✩ Fix - Error when assigning follower motion data.
*   ✩ Fix - Set actor motion data, did not show until screen is refreshed.

* ● Version : 3.0.7
* ● Date : 09/06/2024
*   ✩ Fix - error with climb motion.
*   ✩ Fix - bitmap being disposed too early( crash in MV & visual bug in MZ ).

*============================================================================
*  Contact Me :
*============================================================================

*  If you have questions, about this plugin, or commissioning me, or have
*  a bug to report, please feel free to contact me by any of the below
*  methods.

*  website : https://www.rosedale-studios.com
*  rmw : https://forums.rpgmakerweb.com/index.php?members/chaucer.44456
*  youtube : https://www.youtube.com/channel/UCYA4VU5izmbQvnjMINssshQ/videos
*  email : chaucer(at)rosedale-studios(dot)com
*  discord : https://discord.gg/nexQGb65uP

*============================================================================
*

* @command set_player_motion_data
* @text Set Player Motion Data
* @desc Set the players motion data to the data with the name specified.

* @arg name
* @text Data Name
* @desc The name of the data to read motions from.
* @default
* @type text

* @command set_event_motion_data
* @text Set Event Motion Data
* @desc Set the players motion data to the data with the name specified.

* @arg id
* @text Event ID
* @desc The id of the event to specify motion data for.
* @default 1
* @type number

* @arg name
* @text Data Name
* @desc The name of the data to read motions from.
* @default
* @type text

* @command set_follower_motion_data
* @text Set Follower Motion Data
* @desc Set the players motion data to the data with the name specified.

* @arg id
* @text Follower Index
* @desc The index of the follower to specify motion data for.
* @default 1
* @type number

* @arg name
* @text Data Name
* @desc The name of the data to read motions from.
* @default
* @type text

* @command set_actor_motion_data
* @text Set Actor Motion Data
* @desc Set the actors motion data to the data with the name specified.

* @arg id
* @text Actor ID
* @desc The ID of the actor to specify motion data for.
* @default 1
* @type number

* @arg name
* @text Data Name
* @desc The name of the data to read motions from.
* @default
* @type text

* @command player_motion
* @text Request Player Motion
* @desc Start a custom motion for the player.

* @arg motion
* @text Motion Name
* @desc The name of the motion to play from motions data.
* @default
* @type text

* @arg wait
* @text Wait
* @desc Should the event wait for this motin to complete before proceeding.
* @default false
* @type boolean

* @command event_motion
* @text Request Event Motion
* @desc Start a custom motion for an event.

* @arg id
* @text Event ID
* @desc The id of the event to play the motion.
* @default 1
* @type number
* @min 1

* @arg motion
* @text Motion Name
* @desc The name of the motion to play from motions data.
* @default
* @type text

* @arg wait
* @text Wait
* @desc Should the event wait for this motin to complete before proceeding.
* @default false
* @type boolean

* @command follower_motion
* @text Request Follower Motion
* @desc Start a custom motion for an follower.

* @arg id
* @text Follower Index
* @desc The index of the follower to play the motion.
* @default 1
* @type number
* @min 1

* @arg motion
* @text Motion Name
* @desc The name of the motion to play from motions data.
* @default
* @type text

* @arg wait
* @text Wait
* @desc Should the event wait for this motin to complete before proceeding.
* @default false
* @type boolean

* @command player_stop_motion
* @text Stop player motion
* @desc Stop the current motion the player is performing and return to idle animation.

* @command event_stop_motion
* @text Stop event motion
* @desc Stop the current motion the event is performing and return to idle animation.

* @arg id
* @text Event ID
* @desc The id of the event to stop the motion for.
* @default 1
* @type number
* @min 1
* @max 1000

* @command follower_stop_motion
* @text Stop event motion
* @desc Stop the current motion the follower is performing and return to idle animation.

* @arg id
* @text Follower Index
* @desc The index of the follower behind the player to stop the motion for.
* @default 1
* @type number
* @min 1
* @max 10

* @param motionData
* @text Motion Data List
* @desc A list of all custom anitmation sheets.
* @default []
* @type struct<AnimationList>[]

*/

/*~struct~AnimationList:

* @param name
* @text Name
* @desc The name of this characters animation list.
* @default
* @type text

* @param dir8
* @text 8 Directional
* @desc Should this sprite use 8 directions instead of the default 4?
* @default false
* @type boolean

* @param speedMod
* @text Move Speed Modifier
* @desc Modifier for move speed animation, the higher the value, the faster the walk animation will play( affects run as well! ).
* @default 0.00
* @type number
* @decimals 2
* @min 0.00
* @max 8.00

* @param idle
* @text Idle
* @desc The animation used for the character when idling.
* @default
* @type struct<Animation>

* @param walk
* @text Walk
* @desc The walk animation.
* @default
* @type struct<WalkAnimation>

* @param dash
* @text Dash
* @desc The animation  when character is dashing/running.
* @default
* @type struct<WalkAnimation>

* @param climb
* @text Climb
* @desc The animation  when character is climbing a ladder.
* @default
* @type struct<WalkAnimation>

* @param jump
* @text Jump
* @desc The animation when the character is jumping.
* @default
* @type struct<WalkAnimation>

* @param customAnimations
* @text Custom Animations
* @desc Define all custom animations here.
* @default []
* @type struct<CustomAnimation>[]

* @param conditionalMotionData
* @text Conditional Data
* @desc If this motion is used, and conditions for new motion data are met, the new motion data will be used instead.
* @default []
* @type struct<ConditionalMotion>[]

*/

/*~struct~ConditionalMotion:

* @param switch
* @text Switch
* @desc If the switch provided is on, the motion data named hhere will be used instead.
* @default 0
* @type switch

* @param name
* @text Motion Data Name
* @desc The name of the motion data that will take over when the switch is enabled.
* @default
* @type text

*/

/*~struct~Animation:

* @param filename
* @text File
* @desc The file used for this animation.
* @default
* @type file
* @dir img/characters/
* @require 1

* @param frames
* @text Frames
* @desc How many animation frames are in this animation( deffault is 3 ).
* @default 3
* @type number

* @param duration
* @text Duration
* @desc How long will it take for rthis animation to play out fully( in frames, 60 = 1 second ).
* @default 60
* @type number

*/

/*~struct~WalkAnimation:

* @param filename
* @text File
* @desc The file used for this animation.
* @default
* @type file
* @dir img/characters/
* @require 1

* @param frames
* @text Frames
* @desc How many animation frames are in this animation( deffault is 3 ).
* @default 3
* @type number

*/

/*~struct~CustomAnimation:

* @param name
* @text Name
* @desc The naame of this animation.
* @default
* @type text

* @param filename
* @text File
* @desc The file used for this animation.
* @default
* @type file
* @dir img/characters/
* @require 1

* @param loop
* @text Loop
* @desc Should this animatin loop?( if set to true, the animation will loop infinitely, and plugin command wait will NOT work! ).
* @default false
* @type boolean

* @param frames
* @text Frames
* @desc How many animation frames are in this animation( deffault is 3 ).
* @default 3
* @type number

* @param duration
* @text Duration
* @desc How long will it take for rthis animation to play out fully( in frames, 60 = 1 second ).
* @default 60
* @type number

* @param audio
* @text Audio
* @desc The audio that will play when the animation plays.
* @default {"name":"","volume":"90","pitch":"100","pan":"0","delay":"0"}
* @type struct<Audio>

* @param x
* @text Offset X
* @desc Offset the animation on the x axis in pixels.
* @default 0
* @type nuumer
* @max 10000
* @min -10000

* @param y
* @text Offset Y
* @desc Offset the animation on the y axis in pixels.
* @default 0
* @type nuumer
* @max 10000
* @min -10000

* @param preload
* @text Important Motion
* @desc Should this motion be preloaded into memory( best used for commonly used animations ).
* @default false
* @type boolean

* @param ---COLLISION PLUGIN---
* @desc Below are settings only available for use with the collision altering plugin.
* @default
* @type text

* @param velocity
* @text Velocity
* @desc Which direction will velocity be applied( only applicable with collision altering plugin ).
* @default none
* @type select

* @option none
* @option forward
* @option backward
* @option left
* @option right

* @param traction
* @text Traction
* @desc How much traction this motion has( only applicable with collision altering plugin! ).
* @default 1.000
* @type number
* @decimals 3
* @min 0.000
* @max 1.000

*/

/*~struct~Audio:

* @param name
* @text Name
* @desc The name of the audio to play.
* @default
* @type file
* @dir audio/se
* @require 1

* @param volume
* @text Volume
* @desc The volume level of the audio.
* @default 90
* @type nuumber

* @param pitch
* @text Pitch
* @desc The pitch of the audio.
* @default 100
* @type number
* @min 50
* @max 150

* @param pan
* @text Pan
* @desc Thhe pan of the audio.
* @default 0
* @type number
* @min -100
* @max 100

* @param delay
* @text Delay
* @desc How long will the audio be delayed before playing( in seconds ).
* @default 0.00
* @type number
* @decimals 2

*/

//=============================================================================
  var Imported = Imported || {};
  Imported['Character Motions'.toUpperCase()] = true;
//=============================================================================
  var Chaucer = Chaucer || {};
  Chaucer.charMotions = {};
//=============================================================================

( function ( $ ) { // CONFIG:


//=============================================================================
// Create functions specific for my code if it does not already exist!
// WARNING: DO NOT EDIT BELOW THIS LINE!!!
//=============================================================================

//-----------------------------------------------------------------------------
  Chaucer.parseArgs = Chaucer.parseArgs || function ( args )
  { // compare the current version with the target version.
//-----------------------------------------------------------------------------

    const obj = {};
    for ( var i = 0, l = args.length; i < l; i += 2 ) {
      obj[args[i]] = args[i + 1];
    }

    return obj;

  };

//-----------------------------------------------------------------------------
    Chaucer.compareVersion = Chaucer.compareVersion || function ( current, target )
    { // compare the current version with the target version.
//-----------------------------------------------------------------------------

      const v1 = current.split( '.' );
      const v2 = target.split( '.' );
      for ( let i = 0, l = v1.length; i < l; i++ ) {
        if ( v1[i] < v2[i] ) return -1; // version is lower!
        if ( v1[i] > v2[i] ) return 1; // version is higher!
      }
      return 0; // same version!

    };

//-----------------------------------------------------------------------------
    Chaucer.parse = Chaucer.parse || function( data )
    { // recursively parse any data passed in.
//-----------------------------------------------------------------------------
      try {
        data = JSON.parse( data );

      } catch ( err ) {
        data = data;

      } finally {

        if ( typeof data === 'object' ) {

          for ( const key in data ) {
            data[key] = Chaucer.parse( data[key] );
          };

        };

      };

      return data;

    };

//-----------------------------------------------------------------------------
    $.makePluginInfo = $.makePluginInfo || function ( $, n )
    { // Create plugin info for the object provided.
//-----------------------------------------------------------------------------

      for ( var i = 0, l = $plugins.length; i < l; i++ ) {

        if ( !$plugins[i].description.match( n ) ) continue;

        $.author = 'Chaucer';
        $.name = RegExp.$1;
        $.version = RegExp.$2;
        $.pluginName = $plugins[i].name;
        $.params = Chaucer.parse( $plugins[i].parameters );
        $.commands = {};
        $.alias = {};

      };

      ( $.params.motionData || [] ).forEach( list => {
        if ( list['idle'] ) list['idle'].name = 'idle';
        if ( list['walk'] ) list['walk'].name = 'walk';
        if ( list['dash'] ) list['dash'].name = 'dash';
        if ( list['jump'] ) list['jump'].name = 'jump';
        if ( list['climb'] ) list['climb'].name = 'climb';
          list.customAnimations.forEach( animation => {
              list[animation.name] = animation;
            } );
          } );

    };

  //============================================================================
    //Create plugin information.
  //============================================================================

    const identifier =  /(Character Motions) : Version - (\d+.\d+.\d+)/;
    // $._nameError = 'Character Motions was unable to load! Please revert any changes back to normal!';


    $.makePluginInfo( $, identifier );

    if ( !$.name ) throw new Error( $._nameError );

//=============================================================================

//-----------------------------------------------------------------------------
  $.registerPluginCommand = function ( command, fn )
  { // compare the current version with the target version.
//-----------------------------------------------------------------------------

  if ( Utils.RPGMAKER_NAME === 'MV' )
    $.commands[command] = fn;

  else if ( Utils.RPGMAKER_NAME === 'MZ' )
    PluginManager.registerCommand( $.pluginName, command, fn );

  };

 //-----------------------------------------------------------------------------
  $.alias = function ( className, method, fn, isStatic )
  { // use this method to quickly alias a method of a particular class.
//-----------------------------------------------------------------------------

    let key = `${className.name}.${( isStatic ? '' : 'prototype.' ) + method}`;
    let object = ( isStatic ? className : className.prototype );

    if ( $.alias[key] ) throw new Error( `${key} already aliased!` );

    $.alias[key] = object[method];

    let fnString = fn.toString();
    let instances = fnString.match( /\$.alias\((.*?)\)/g ) || [];

    for ( let i = 0, len = instances.length; i < len; i++ ) {

      let old = instances[i];
      let args = ['this'].concat( old.match( /\((.*?)\)/ )[1].split( ',' ) );
      args = args.filter( n => !!n );
      let next = `$.alias["${key}"].call(` + args.join( ',' ) + ')';

      fnString = fnString.replace( old, next );

    }

    eval( `${key} = ` + fnString );

  };

//-----------------------------------------------------------------------------
  $.expand = function ( className, method, fn, isStatic )
  { // use this method to quickly alias a method of a particular class.
//-----------------------------------------------------------------------------

    const obj = isStatic ? className : className.prototype;
    obj[method] = fn;

  };

//=============================================================================
  $.findConditionalMotionData = function ( data )
  { // return any conditional motion data that has been met.
//=============================================================================

    if ( data ) {

      const list = $.params.motionData;

      for ( let i = 0, l = data.conditionalMotionData.length; i < l; i++ ) {

        const { switch:id, name } = data.conditionalMotionData[i];

        if ( $gameSwitches.value( id ) ) {
          return list.find( motion => motion.name == name ) || null;
        }

      };

    }

    return null;

  }

//=============================================================================
  $.findMotionData = function ( name )
  { // retrn the motion with the name specified.
//=============================================================================

    const list = $.params.motionData;
    let data = list.find( motion => motion.name == name ) || null;
    data = this.findConditionalMotionData( data ) || data;

    return data;

  }

//=============================================================================
  // MV SPECIFIC CODE :
//=============================================================================

    if ( Utils.RPGMAKER_NAME === 'MV' ) {

  //-----------------------------------------------------------------------------
    $.alias( Game_Interpreter, 'pluginCommand', function( command, args ) {
  //-----------------------------------------------------------------------------

        $.alias( command, args );

        command = command.toLowerCase();
        if ( $.commands[command] ) {
          $.commands[command].call( this, Chaucer.parseArgs( args ) );
        }
      } );

    }

//=============================================================================
// ALIASED CODE BELOW THIS LINE!
//=============================================================================

//=============================================================================
// Utils :
//=============================================================================
if ( Utils.RPGMAKER_NAME == 'MV' ) {
  Utils.encodeURI = function( str ) {
      return encodeURIComponent( str ).replace( /%2F/g, "/" );
  };
}
//=============================================================================
// Game_Switches :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_Switches, 'onChange', function()
  { // Aliased onChange of class Game_Switches.
//-----------------------------------------------------------------------------

    $.alias();
    this.refreshCharactersMotionData();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Switches, 'refreshCharactersMotionData', function()
  { // refresh player and follower motion data.
//-----------------------------------------------------------------------------

    const followers = $gamePlayer._followers._data;

    $gamePlayer.refreshMotionData();
    followers.forEach( char => char.refreshMotionData() );

  }, false );

//=============================================================================
// Game_BattlerBase :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_BattlerBase, 'initMembers', function()
  { // Aliased initMembers of class Game_BattlerBase.
//-----------------------------------------------------------------------------

    $.alias();
    this._motionData = null;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_BattlerBase, 'setMotionData', function( data )
  { // set the motion data to the value specified.
//-----------------------------------------------------------------------------

    this._motionData = data || null;

  }, false );

//=============================================================================
// Game_Actor :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_Actor, 'initialize', function( actorId )
  { // Aliased initialize of class Game_Actor.
//-----------------------------------------------------------------------------

    $.alias( actorId );
    this.initializeMotionData();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Actor, 'initializeMotionData', function()
  { // initialize the motion data for the actor.
//-----------------------------------------------------------------------------

    const meta = this.actor().meta;
    let data = $.findMotionData( meta.motion_data || meta.motions || '' );

    this._motionData = data || null;

  }, false );

//=============================================================================
// Game_CharacterBase :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_CharacterBase, 'initialize', function()
  { // Aliased initialize of class Game_CharacterBase.
//-----------------------------------------------------------------------------

    $.alias();
    this._motionData = null;
    this._motion = 'idle';

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_CharacterBase, 'setImage', function( charName, charIndex )
  { // Aliased setImage of class Game_CharacterBase.
//-----------------------------------------------------------------------------

    $.alias( charName, charIndex );
    this._motionData = null;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'getMotion', function( motionName )
  { // request a motion to be played.
//-----------------------------------------------------------------------------

    if ( !this.hasMotions() ) return null;
    return this._motionData.motions[motionName];

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'requestMotion', function( motion )
  { // request a motion to be played.
//-----------------------------------------------------------------------------

    this._requestedMotion = motion;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'stopMotion', function()
  { // stop the current motion.
//-----------------------------------------------------------------------------

    this._requestedMotion = 'idle';

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'isMotionChanged', function( motionData )
  { // return if the motion will be changed.
//-----------------------------------------------------------------------------

    let name0 = this._motionData ? this._motionData.name : '';
    let name1 = motionData ? motionData.name : '';

    return name0 != name1;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'refreshMotionData', function()
  { // refresh the motion data whenever the actor is changed/when necesary.
//-----------------------------------------------------------------------------

    const motionData = this.initialMotionData();

    if ( this.isMotionChanged( motionData ) && !this._motionLoading ) {
      if ( motionData )
        this.preloadMotionData( motionData );

      else
        this._motionData = null;

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'initialMotionData', function()
  { // return animation data.
//-----------------------------------------------------------------------------

    return null;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'ensureMotionValid', function( hasMotions )
  { // ensure motion is valid according to if we have data or not.
//-----------------------------------------------------------------------------

    if ( hasMotions && !this._motion ) this.refreshMotion();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'startRequestedMotion', function()
  { // start the requested motion.
//-----------------------------------------------------------------------------

    let name = this._requestedMotion;
    let data = this._motionData[name];
    if ( !data ) {
      let error = `Motion "${name}", was not found, please make sure the
      name entered is correct. The name specified is case sensetive!`;
      return console.warn( error );
    }
    let bitmap = ImageManager.loadCharacter( data.filename );
    this._preloadingMotion = false;

    if ( bitmap.isReady() ) {
      this.startMotion( name );
      this.cacheMotionOffset( name, bitmap );
      this._requestedMotion = null;

    } else {
      this._preloadingMotion = true;
      bitmap.addLoadListener( function() {
        this.startRequestedMotion();
      }.bind( this ) );

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'cacheMotionOffset', function( name, bitmap )
  { // cache the motion offset.
//-----------------------------------------------------------------------------

    const data = this.getMotion( name );

    if ( data && bitmap && !data.offset ) {
      const dir8 = this.is8DirSprite();
      const bigChar = ImageManager.isBigCharacter( data.filename );
      const width = bitmap.width / data.frames;
      const height = bitmap.height / ( ( dir8 || !bigChar ) ? 8 : 4 )

      let ox = ( data.x || 0 ) / width;
      let oy = ( data.y || 0 ) / height;
      data.offset = new Point( isNaN( ox ) ? 0 : ox, isNaN( oy ) ? 0 : oy )

    }

  }, false );

//=============================================================================
  $.expand( Game_CharacterBase, 'startMotion', function ( motionName )
  { // start the motion.
//=============================================================================

    if ( motionName == null ) return;
    let lastMotion = this._motion;
    this._motion = motionName;
    this._animationCount = 0;
    this._pattern = 0;

    this.startVelocityForMotion();
    this.startSeForMotion();

  } );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'clearMotionBitmap', function( motionName )
  { // clear the last used motion from memory if necessary.
//-----------------------------------------------------------------------------

    const data = this._motionData[motionName];
    if ( data && !this.isMotionPreloaded( data.name ) ) {
      let key = 'img/characters/' + Utils.encodeURI( data.filename ) + '.png';
      if ( Utils.RPGMAKER_NAME == 'MZ' ) {
        ImageManager.loadCharacter( data.filename ).destroy();
        delete ImageManager._cache[key];

      } else {
        const bitmap = ImageManager.loadCharacter( data.filename );
        bitmap.__baseTexture.destroy();
        bitmap.__baseTexture = null;
        if ( bitmap.__canvas ) {
          bitmap.__canvas.width = 0;
          bitmap.__canvas.height = 0;
          bitmap.__canvas = null;
        }
      }
    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'getLeft90', function( d )
  { // return the direction directly to the left of the current direction.
//-----------------------------------------------------------------------------

    switch ( d ) {
      case 1:
        return 3;
      case 2:
        return 6;
      case 3:
        return 9;
      case 4:
        return 2;
      case 6:
        return 8;
      case 7:
        return 1;
      case 8:
        return 4;
      case 9:
        return 7;
      default:
        return 0;
    }


  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'startVelocityForMotion', function()
  { // start characters velocity for motion.
//-----------------------------------------------------------------------------

    const data = this.getMotion( this._motion );

    if ( data && Chaucer.CAP ) {

      const velocity = data.velocty || data.velocity;
      let forward = this.direction();
      let backward = this.reverseDir( forward );
      let left = this.getLeft90( forward );
      let right = this.reverseDir( left );

      if ( velocity == 'forward' ) {
        this.velocity = this.getVectorFromDirection( forward )

      } else if ( velocity == 'backward' ) {
        this.velocity = this.getVectorFromDirection( backward )

      } else if ( velocity == 'left' ) {
        this.velocity = this.getVectorFromDirection( left )

      } else if ( velocity == 'right' ) {
        this.velocity = this.getVectorFromDirection( right )

      }

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'startSeForMotion', function()
  { // start se for the motion.
//-----------------------------------------------------------------------------

    const data = this.getMotion( this._motion );

    if ( data && data.audio ) {
      setTimeout(function () {
        AudioManager.playSe( data.audio );
      }, 1000 * data.audio.delay );
    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'requestingMotion', function()
  { // return if we are requesting a motion.
//-----------------------------------------------------------------------------

    return !!this._requestedMotion && !this._preloadingMotion;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_CharacterBase, 'updateAnimation', function()
  { // Aliased updateAnimation of class Game_CharacterBase.
//-----------------------------------------------------------------------------

    if ( this.hasMotions() ) {
      this.ensureMotionValid( this.hasMotions() );
      if ( !this.hasMotions() ) return;
      if ( this.needsMotionRefresh() ) this.refreshMotion();
      if ( this.requestingMotion() ) this.startRequestedMotion();
      this.updateMotionAnimation();

    } else {
      $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_CharacterBase, 'straighten', function()
  { // Aliased straighten of class Game_CharacterBase.
//-----------------------------------------------------------------------------

    if ( this.hasMotions() ) return;
    $.alias();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'updateMotionAnimation', function()
  { // update the animation for motions.
//-----------------------------------------------------------------------------

    this.updateAnimationCount();

    const current = this._animationCount;

    let { frames } = this.getMotion( this._motion );
    duration = this.animationWait();

    this._pattern = Math.floor( ( current / duration ) * frames );
    if (this._animationCount >= this.animationWait()) {
        this._animationCount = 0;
        this._pattern = 0;

        this.refreshMotion();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'isClimbChange', function()
  { // return if we are changing climb motions.
//-----------------------------------------------------------------------------

    if ( this._motion == 'climb' && !this.isOnLadder() ) return true;
    if ( this._motion != 'climb' && this.isOnLadder() ) return true;
    return false;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'isJumpChange', function()
  { // return if we are changing climb motions.
//-----------------------------------------------------------------------------

    if ( this._motion == 'jump' && !this.isJumping() ) return true;
    if ( this._motion != 'jump' && this.isJumping() ) return true;
    return false;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'isMoveChange', function()
  { // if we have changed from moving to stopping or vica versa.
//-----------------------------------------------------------------------------

    let isMoving = this.isMoving();
    let isDashing = this.isDashing();
    let wasWalking = ['walk', 'dash'].includes( this._motion );

    if ( !isDashing && this._motion == 'dash' ) return true;
    if ( isDashing && this._motion == 'walk' ) return true;
    if ( this._motion == 'idle' && isMoving ) return true;
    if ( wasWalking && !isMoving ) return true;

    return false;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'needsMotionRefresh', function()
  { // return if the motion needs to be refreshed.
//-----------------------------------------------------------------------------

    return this.isJumpChange() || this.isClimbChange() || this.isMoveChange();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'hasDashMotion', function()
  { // return if the character has a dash sprite.
//-----------------------------------------------------------------------------

    if ( this && this._motionData ) {
      return this._motionData.motions.dash.filename;
    }

    return false;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'needsDashMotion', function()
  { // return if the character needs to use the dash motion.
//-----------------------------------------------------------------------------

    let isDashing = this.isDashing();

    if ( this.constructor.name == 'Game_Follower' ) {
      if ( Imported['COLLISION ALTERING PLUGIN'] ) {
        isDashing = this._dashing;

      } else {
        isDashing = this.isDashing();
      }

    }

    return isDashing;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'getNextMotion', function()
  { // find the next motion to use.
//-----------------------------------------------------------------------------

    let dashing = this.hasDashMotion() && this.needsDashMotion();
    let idling = this._stopCount > 0;
    if ( Imported['COLLISION ALTERING PLUGIN'] ) {
      idling = idling || !this._isMoved;
    }
    let data = this.getMotion( this._motion );
    if ( this.isMotionLoop( data.name ) ) return this._motion;
    if ( this.isJumping() ) return 'jump';
    if ( this.isOnLadder() ) return 'climb';
    if ( this.isMoving() && dashing ) return 'dash'
    if ( this.isMoving() ) return 'walk';
    if ( !this.isMoving() && idling ) return 'idle'
    if ( !this._motion ) return 'idle';

    return null;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'refreshMotion', function()
  { // refresh the motion.
//-----------------------------------------------------------------------------

    this._motion = this.getNextMotion() || this._motion;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_CharacterBase, 'animationWait', function()
  { // Aliased animationWait of class Game_CharacterBase.
//-----------------------------------------------------------------------------

    if ( this.hasMotions() ) return this.motionAnimationWait();

    return $.alias();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'motionAnimationWait', function()
  { // return the show duration for the animation.
//-----------------------------------------------------------------------------

    let key = "Game_CharacterBase.prototype.animationWait";
    let alias = Chaucer.charMotions.alias[key];

    let {duration, frames } = this.getMotion( this._motion );
    let speedMod = this._motionData.speedMod || this._motionData.speed || 0;
    let moveSpeed = ( 9 - speedMod - this.realMoveSpeed() ) * 3 * frames;

    return duration || moveSpeed;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_CharacterBase, 'updateAnimationCount', function()
  { // Aliased updateAnimationCount of class Game_CharacterBase.
//-----------------------------------------------------------------------------

    if ( this.hasMotions() ) {

      if ( this.isMoving() && this.hasWalkAnime() )
        $.alias();

      else
        this.updateMotionAnimationCount();

    } else {
      $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'updateMotionAnimationCount', function()
  { // update the animation count for motion character.
//-----------------------------------------------------------------------------

    let ignore = this._motion == 'climb' && !this.isMoving();
    if ( !ignore ) this._animationCount++;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_CharacterBase, 'pattern', function()
  { // Aliased pattern of class Game_CharacterBase.
//-----------------------------------------------------------------------------

    if ( this.hasMotions() ) {
      return this.motionPattern();
    } else {
      return $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'motionPattern', function()
  { // return the pattern for the current motion.
//-----------------------------------------------------------------------------

    return this._pattern;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'isMotionLoop', function( motionName )
  { // return if the motion is looped.
//-----------------------------------------------------------------------------

    return this._motionData && this._motionData[motionName] ? this._motionData[motionName].loop : false;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'isMotionPreloaded', function( name )
  { // return if the motion is preloaded.
//-----------------------------------------------------------------------------

    if ( name == 'idle' ) return true;
    if ( name == 'walk' ) return true;
    if ( name == 'dash' ) return true;
    if ( name == 'climb' ) return true;
    if ( name == 'jump' ) return true;

    return this._motionData[name] && this._motionData[name].preload;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'isMotionImportant', function( motion )
  { // return if the motion is important.
//-----------------------------------------------------------------------------

    if ( motion.name == 'idle' ) return true;
    if ( motion.name == 'walk' ) return true;
    if ( motion.name == 'dash' ) return true;
    if ( motion.name == 'climb' ) return true;
    if ( motion.name == 'jump' ) return true;

    return motion.preload;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'getBitmapsFromMotionData', function( motionData )
  { // Definition.
//-----------------------------------------------------------------------------

    const keys = Object.keys( motionData );
    let bitmaps = [];

    for ( let i = 0, l = keys.length; i < l; i++ ) {
      let motion = motionData[keys[i]];
      if ( !motion || !motion.filename ) continue;
      if ( !this.isMotionImportant( motion ) ) continue;
      bitmaps.push( ImageManager.loadCharacter( motion.filename ) );

    };

    return bitmaps;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'preloadMotionData', function( motionData )
  { // refresh the motionData.
//-----------------------------------------------------------------------------

    if ( !motionData ) return this._motionData = null;

    const keys = Object.keys( motionData );
    let bitmaps = this.getBitmapsFromMotionData( motionData );

    this._motionLoading = true;

    bitmaps.forEach( bitmap => {
      bitmap.addLoadListener( function() {
        this._motionLoading = bitmaps.some( b => !b.isReady() );
        if ( !this._motionLoading ) {
          this._motionData = JsonEx.parse( JsonEx.stringify( motionData ) );
          this.applyVisuSmoothing( bitmaps );
        }
      }.bind( this ) );
    } );


  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'applyVisuSmoothing', function( bitmaps )
  { // apply smoothing to bitmaps frm VisuMZ_1_EventsMoveCore.
//-----------------------------------------------------------------------------

    if ( Imported.VisuMZ_1_EventsMoveCore ) {

      const settings = VisuMZ.EventsMoveCore.Settings;
      const smooth = settings.Movement.BitmapSmoothing;

      bitmaps.forEach( bitmap => { bitmap.smooth = smooth; } );

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'hasMotions', function()
  { // return if the character has motions setup.
//-----------------------------------------------------------------------------

    return !!this._motionData;

  }, false );

//=============================================================================
  $.expand( Game_CharacterBase, 'isCustomMotion', function( motion )
  { // return if the character is using a custom motion.
//=============================================================================

    if ( !this._motionData ) return false;
    if ( motion == 'idle' ) return false;
    if ( motion == 'walk' ) return false;
    if ( motion == 'dash' ) return false;
    if ( motion == 'climb' ) return false;
    if ( motion == 'jump' ) return false;

    return !!motion;

  } );

//-----------------------------------------------------------------------------
  $.alias( Game_CharacterBase , 'getTraction', function()
  { // Aliased getTraction of class Game_CharacterBase .
//-----------------------------------------------------------------------------

    let traction = $.alias();

    if ( this.isCustomMotion( this._motion ) ) {
      const data = this._motionData[this._motion];
      if ( data ) traction *= data.traction;
    }

    return traction;

  }, false );

if ( !Imported["COLLISION ALTERING PLUGIN"] ) {

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'is8DirSprite', function()
  { // set whether this sprite is 8 directoinal, for non collision plugin.
//-----------------------------------------------------------------------------

    if ( Imported['COLLISION ALTERING PLUGIN'] ) {
      if ( this._8dirSprite ) return this._8dirSprite;
    }

    return this._motionData ? this._motionData.dir8 : false;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_CharacterBase, 'moveDiagonally', function( horz, vert )
  { // Aliased moveDiagonally of class Game_CharacterBase.
//-----------------------------------------------------------------------------

    $.alias( horz, vert );

    if ( this.is8DirSprite() ) {
      if ( horz == 4 && vert == 8 ) this.setDirection( 7 );
      if ( horz == 4 && vert == 2 ) this.setDirection( 1 );
      if ( horz == 6 && vert == 8 ) this.setDirection( 9 );
      if ( horz == 6 && vert == 2 ) this.setDirection( 3 );
    }

  }, false );

//=============================================================================
// Game_Player :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_Player, 'getInputDirection', function()
  { // Aliased getInputDirection of class Game_Player.
//-----------------------------------------------------------------------------

    if ( this.is8DirSprite() ) return Input.dir8;
    return $.alias();


  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Player, 'executeMove', function( direction )
  { // Aliased executeMove of class Game_Player.
//-----------------------------------------------------------------------------

    if ( ( direction % 2 ) == 1 ) {
      const horz = [7, 1].includes( direction ) ? 4 : 6;
      const vert = [7, 9].includes( direction ) ? 8 : 2;
      this.moveDiagonally( horz, vert );

    } else {
      $.alias( direction );

    }


  }, false );

}

//-----------------------------------------------------------------------------
  $.expand( Game_Player, 'actor', function()
  { // return the actor that is currently the party leader.
//-----------------------------------------------------------------------------

    return $gameParty.leader();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Player, 'initialMotionData', function()
  { // return animation data specific to the party leader.
//-----------------------------------------------------------------------------

    const actor = this.actor();
    let motionData = actor ? actor._motionData : null;
    let conditionals = motionData ? motionData.conditionalMotionData : [];
    let conditional = conditionals.find( c => $gameSwitches.value( c.switch ) );

    if ( conditional ) {
      motionData = $.findMotionData( conditional.name || '' ) || motionData;
    }

    return motionData;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Player, 'canMove', function()
  { // Aliased canMove of class Game_Player.
//-----------------------------------------------------------------------------

    if ( this.isCustomMotion( this._motion ) ) return false;
    if ( this.isCustomMotion( this._requestedMotion ) ) return false;

    return $.alias();

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Player, 'refresh', function()
  { // Aliased refresh of class Game_Player.
//-----------------------------------------------------------------------------

    $.alias();
    this.refreshMotionData();

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Player, 'setMotionData', function( data )
  { // Aliased setMotionData of class Game_Player.
//-----------------------------------------------------------------------------

    // $.alias();
    if ( this.actor() ) {
      let name0 = this._motionData ? this._motionData.name : '';
      let name1 = data ? data.name : '';
      let changed = name0 != name1;

      this.actor().setMotionData( data );

      if ( changed ) this.refreshMotionData();
    }

  }, false );

//=============================================================================
// Game_Follower :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_Follower, 'refresh', function()
  { // Aliased refresh of class Game_Follower.
//-----------------------------------------------------------------------------

    $.alias();
    this.refreshMotionData();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Follower, 'initialMotionData', function()
  { // return animation data for the character.
//-----------------------------------------------------------------------------

    const memberIndex = this._memberIndex;
    const actor = $gameParty.members()[memberIndex];
    let motionData = actor ? actor._motionData : null;
    let conditionals = motionData ? motionData.conditionalMotionData : [];
    let conditional = conditionals.find( c => $gameSwitches.value( c.switch ) );

    if ( conditional ) {
      motionData = $.findMotionData( conditional.name || '' ) || motionData;
    }

    return motionData;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Follower, 'setMotionData', function( data )
  { // Aliased setMotionData of class Game_Follower.
//-----------------------------------------------------------------------------

    // $.alias();
    if ( this.actor() ) {

      let name0 = this._motionData ? this._motionData.name : '';
      let name1 = data ? data.name : '';
      let changed = name0 != name1;

      this.actor().setMotionData( data );
      if ( changed ) this.refreshMotionData();

    }

  }, false );

//=============================================================================
// Game-Event :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_Event, 'initMembers', function()
  { // Aliased initMembers of class Game_Event.
//-----------------------------------------------------------------------------

    $.alias();
    this._motionData = null;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Event, 'refresh', function()
  { // Aliased refresh of class Game_Event.
//-----------------------------------------------------------------------------

    $.alias();
    this.refreshMotionData();

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Event, 'initialMotionData', function()
  { // Aliased initialMotionData of class Game_Event.
//-----------------------------------------------------------------------------

    let motionData = this._motionData;
    let conditionals = motionData ? motionData.conditionalMotionData : [];
    let conditional = conditionals.find( c => $gameSwitches.value( c.switch ) );

    if ( conditional ) {
      motionData = $.findMotionData( conditional.name || '' ) || motionData;
    }

    return motionData;


  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Event, 'clearPageMotionData', function()
  { // clear the motion data for this page.
//-----------------------------------------------------------------------------

    this._motionData = null;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Event, 'clearPageSettings', function()
  { // Aliased clearPageSettings of class Game_Event.
//-----------------------------------------------------------------------------

    $.alias();
    this.clearPageMotionData();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Event, 'requestMotionData', function( motionsName )
  { // set the motions to the value proviided.
//-----------------------------------------------------------------------------

    this._motionData = $.findMotionData( motionsName || '' ) || null;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Event, 'setMotionData', function( data )
  { // set the motion data.
//-----------------------------------------------------------------------------

    let name0 = this._motionData ? this._motionData.name : '';
    let name1 = data ? data.name : '';

    this._motionData = data || null;

    if ( name0 != name1 ) this.refreshMotionData();

  }, false );

//=============================================================================
  $.expand( Game_Event, 'setNotetagDirection', function( d )
  { // set the direction specified via note tag.
//=============================================================================

    this._originalDirection = d;
    const df = this.directionFix();
    this.setDirectionFix( false );
    this.setDiagonalDirection( this._originalDirection );
    this.setDirectionFix( df );

  }, this );

//-----------------------------------------------------------------------------
  $.expand( Game_Event, 'setupPageMotionData', function()
  { // setup motion data for the current page.
//-----------------------------------------------------------------------------

    const list = this.page() ? this.list() : [];

    for ( let i = 0, l = list.length; i < l; i++ ) {

      const { code, parameters } = list[i];
      if ( code != 108 && code != 408 ) continue;
      if ( parameters[0].match( /\<\s*motion_data\s*:\s*(.*?)\s*>/ ) ) {
        this.requestMotionData( RegExp.$1.trim() );

      } else if ( parameters[0].match( /\<\s*motions\s*:\s*(.*?)\s*>/ ) ) {
        this.requestMotionData( RegExp.$1.trim() );

      } else if ( parameters[0].match( /\<\s*direction\s*:\s*(\d+)\s*>/ ) ) {
        this.setNotetagDirection( Number( RegExp.$1 ) );

      }

    };


  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Event, 'setupPageSettings', function()
  { // Aliased setupPageSettings of class Game_Event.
//-----------------------------------------------------------------------------

    $.alias();
    this.setupPageMotionData();

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Event, 'updateSelfMovement', function()
  { // Aliased updateSelfMovement of class Game_Event.
//-----------------------------------------------------------------------------

    if ( this.hasMotions() && this.isCustomMotion( this._motion ) ) return;

    $.alias();

  }, false );

//=============================================================================
// Sprite_Character :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'initMembers', function()
  { // Aliased initMembers of class Sprite_Character.
//-----------------------------------------------------------------------------

    $.alias();
    this._motion = 'idle';
    this._motionImageName = '';

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'hasMotions', function()
  { // retrun if the character has motions.
//-----------------------------------------------------------------------------

    return this._character && !!this._character.hasMotions();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'getMotion', function( motionName )
  { // return motion entry of the name provided.
//-----------------------------------------------------------------------------

    return this._character.getMotion( motionName );

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'isImageChanged', function()
  { // Aliased isImageChanged of class Sprite_Character.
//-----------------------------------------------------------------------------

    if ( this.hasMotions() ) {
      const motion = this.getMotion( this._character._motion );
      return this._motionImageName != ( motion ? motion.filename : '' ) || !this.bitmap;

    } else if ( this._motionImageName ) {
      this._motionImageName = '';
      return true;

    } else {
      return $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'updateBitmap', function()
  { // Aliased updateBitmap of class Sprite_Character.
//-----------------------------------------------------------------------------

    if ( this.hasMotions() && this.isImageChanged() ) {
      if ( this._motion != this._character._motion ) {
        this._character.clearMotionBitmap( this._motion );
        this._motion = this._character._motion;
      }
      this._motionImageName = this.getMotion( this._motion ).filename || '';
      if ( this._motionImageName ) {
        this.setMotionBitmap()
      } else {
        let bitmap = ImageManager.loadCharacter( this._characterName );
        this._tileId = 0;
        this._characterName = '';
        $.alias();
      }

    } else {
      $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'setMotionBitmap', function()
  { // set the bitmap for motion.
//-----------------------------------------------------------------------------

    this.bitmap = ImageManager.loadCharacter( this._motionImageName );
    this._isBigCharacter = true;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'updateOther', function()
  { // Aliased updateOther of class Sprite_Character.
//-----------------------------------------------------------------------------

    $.alias();
    this.updateMotionAnchor();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'updateMotionAnchor', function()
  { // update the anchor position of the sprite.
//-----------------------------------------------------------------------------

    const data = this.getMotion( this._motion );

    if ( data && this.bitmap ) {
      const dir8 = this.is8DirSprite();
      const bigChar = ImageManager.isBigCharacter( data.filename );
      const width = this.bitmap.width / data.frames;
      const height = this.bitmap.height / ( ( dir8 || !bigChar ) ? 8 : 4 )

      const offset = data.offset || new Point( 0, 0 );

      this.anchor.x = 0.5 + offset.x / width;
      this.anchor.y = 1 + offset.y / height;

    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'updateCharacterFrame', function()
  { // Aliased updateCharacterFrame of class Sprite_Character.
//-----------------------------------------------------------------------------

    if ( this.hasMotions() && this._bushDepth > 0 ) {
      const data = this.getMotion( this._motion );
      const offset = data.offset || new Point( 0, 0 );

      const pw = this.patternWidth();
      const ph = this.patternHeight();
      const sx = (this.characterBlockX() + this.characterPatternX()) * pw;
      const sy = (this.characterBlockY() + this.characterPatternY()) * ph;

      this.updateHalfBodySprites();

      let oy = ph * offset.y;
      const d = this._bushDepth - oy;

      this._upperBody.y = -d;
      this._lowerBody.y = 0;
      this._upperBody.setFrame(sx, sy, pw, ph - d );
      this._lowerBody.setFrame(sx, sy + ph - d, pw, d);

      this._upperBody.y -= oy;
      this._lowerBody.y -= oy;

      this.setFrame(sx, sy, 0, ph);

    } else {
      $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'characterBlockY', function()
  { // Aliased characterBlockY of class Sprite_Character.
//-----------------------------------------------------------------------------

    if ( this._character.is8DirSprite() ) {
      return this.motionCharacterBlockY();
    }
    return $.alias();


  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'motionCharacterBlockY', function()
  { // return the character block on the y axis.
//-----------------------------------------------------------------------------

    return 0;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'characterPatternY', function()
  { // Aliased characterPatternY of class Sprite_Character.
//-----------------------------------------------------------------------------

    if ( this._character.is8DirSprite() ) {
      return this.motionCharacterPatternY();
    }
    return $.alias();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'motionCharacterPatternY', function()
  { // Definition.
//-----------------------------------------------------------------------------

    const d = this._character.direction();
    return d - ( d >= 5 ? 2 : 1 );

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'patternWidth', function()
  { // Aliased patternWidth of class Sprite_Character.
//-----------------------------------------------------------------------------

    if ( this.hasMotions() && this.bitmap ) {
      const data = this.getMotion( this._motion ) || { frames: 3 };
      const bitmap = this.bitmap;
      if ( data ) return ( bitmap ? bitmap.width : 0 ) / data.frames;

    }

    return $.alias();

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'patternHeight', function()
  { // Aliased patternHeight of class Sprite_Character.
//-----------------------------------------------------------------------------

    if ( this._character.is8DirSprite() ) {
      return this.motionPatternHeight();

    } else {
      return $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'motionPatternHeight', function()
  { // return pattern height for pixel movement.
//-----------------------------------------------------------------------------

    if (this._tileId > 0) {
        return $gameMap.tileHeight();

    } else {
      return Math.floor( this.bitmap.height / 8 );

    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'isEmptyCharacter', function()
  { // Aliased isEmptyCharacter of class Sprite_Character.
//-----------------------------------------------------------------------------

    return $.alias() && !this._motionImageName;


  }, false );

//=============================================================================
// Game_Interpreter :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_Interpreter, 'updateWaitMode', function()
  { // Aliased updateWaitMode of class Game_Interpreter.
//-----------------------------------------------------------------------------

    if ( this._waitMode == 'motion' && this.isCustomMotionPlaying() ) {
      return true;

    } else {
      return $.alias();

    }


  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Interpreter, 'isCustomMotionPlaying', function()
  { // return if a custom motion is currently playing.
//-----------------------------------------------------------------------------

    let target = null;
    let waiting = false;

    if ( this._motionTarget == 0 )
      target = $gamePlayer;

    else if ( this._motionTarget < 0 )
      target = $gamePlayer._followers._data[Math.abs( this._motionTarget ) - 1];

    else
      target = $gameMap.event( this._motionTarget );

    waiting = target && target.isCustomMotion( target._motion );
    if ( !waiting ) {
      waiting = target && target.isCustomMotion( target._requestedMotion );
    }

    if ( !waiting ) this._motionTarget = undefined;

    return waiting;

  }, false );

//=============================================================================
// Plugin Commands :
//=============================================================================

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'set_player_motion_data', function( args )
  { // register command for set_motion_data.
//-----------------------------------------------------------------------------

    let name0 = $gamePlayer._motionData ? $gamePlayer._motionData.name : '';
    let name1 = ( args.name || '' ).trim();

    if ( name0 != name1 ) {
      $gamePlayer.setMotionData( $.findMotionData( name1 ) );
    }

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'set_event_motion_data', function( args )
  { // register command for set_motion_data.
//-----------------------------------------------------------------------------

    const event = $gameMap.event( args.id );
    if ( !event ) return;

    let name0 = event._motionData ? event._motionData.name : '';
    let name1 = ( args.name || '' ).trim();

    if ( name0 != name1 ) {
      event.setMotionData( $.findMotionData( name1 ) );
    }

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'set_follower_motion_data', function( args )
  { // register command for set_motion_data.
//-----------------------------------------------------------------------------

    const follower = $gamePlayer._followers._data[args.id - 1];

    if ( !follower ) return;

    let name0 = follower._motionData ? follower._motionData.name : '';
    let name1 = ( args.name || '' ).trim();

    if ( name0 != name1 ) {
      follower.setMotionData( $.findMotionData( name1 ) );
    }

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'set_actor_motion_data', function( args )
  { // register command for set_motion_data.
//-----------------------------------------------------------------------------

    const actor = $gameActors.actor( args.id );

    if ( !actor ) return;

    let name0 = actor._motionData ? actor._motionData.name : '';
    let name1 = ( args.name || '' ).trim();
    if ( name0 != name1 ) {
      if ( actor ) {
        actor.setMotionData( $.findMotionData( name1 ) );
        $gamePlayer.refresh();
      }
    }

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'player_motion', function( args )
  { // register command for player_motion.
//-----------------------------------------------------------------------------

    $gamePlayer.requestMotion( ( args.motion || '' ).trim() )

    if ( eval( args.wait ) && !$gamePlayer.isMotionLoop( args.motion.trim() ) ) {
      this._motionTarget = 0;
      this._waitMode = 'motion';
    }

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'event_motion', function( args )
  { // register command for event_motion.
//-----------------------------------------------------------------------------

    const event = $gameMap.event( args.id );

    if ( event ) event.requestMotion( ( args.motion || '' ).trim() );

    if ( eval( args.wait ) && !event.isMotionLoop( args.motion.trim() ) ) {
      this._motionTarget = event._eventId;
      this._waitMode = 'motion';
    }

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'follower_motion', function()
  { // register command for follower_motion.
//-----------------------------------------------------------------------------

    const follower = $gamePlayer._followers._data[args.id - 1];

    if ( follower ) follower.requestMotion( ( args.motion || '' ).trim() );

    if ( eval( args.wait ) && !follower.isMotionLoop( args.motion.trim() ) ) {
      this._motionTarget = -args.id;
      this._waitMode = 'motion';
    }

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'player_stop_motion', function( args )
  { // register command for player_stop_motion.
//-----------------------------------------------------------------------------

    $gamePlayer.stopMotion()

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'event_stop_motion', function( args )
  { // register command for event_stop_motion.
//-----------------------------------------------------------------------------

    const event = $gameMap.event( args.id );

    if ( event ) event.stopMotion();

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'follower_stop_motion', function()
  { // register command for follower_stop_motion.
//-----------------------------------------------------------------------------

    const follower = $gamePlayer._followers._data[args.id - 1];

    if ( follower ) follower.stopMotion();

  } );

//=============================================================================
} )( Chaucer.charMotions );
//=============================================================================
