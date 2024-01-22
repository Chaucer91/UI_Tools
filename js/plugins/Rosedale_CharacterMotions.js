/*:============================================================================
*
* @target MZ
*
* @author Chaucer
*
* @plugindesc | Character Actions : Version - 1.2.1 | Add actin animaitions to your characters.
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
*  Requirements :
*============================================================================

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
*  ║ N: The name of the motion data the player should use.                ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples ( MV ) :                                                    ║
*  ╠═══════════════════════════════════╣
*  ║ set_follower_motion_data name female_knight                          ║
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
*  ║ N: The name of the motion data the player should use.                ║
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
*  ║ Note Tag :             ║ <motions:NAME>                             ║
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
*  ║ Comment :             ║ <motions:NAME>                              ║
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
*  ║ Plugin Command :       ║ follower_motion motion N wait B            ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ request follower to start custom motion N. ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ N: The name of the motion to start for the follower.                 ║
*  ║                                                                      ║
*  ║ B: true or false, should event wait for motion before proceeding.    ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples ( MV ) :                                                    ║
*  ╠═══════════════════════════════════╣
*  ║ follower_motion motion slash wait true                               ║
*  ╚═══════════════════════════════════╝

*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ event_motion motion N wait B               ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ request event to start custom motion N.    ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ N: The name of the motion to start for the event.                    ║
*  ║                                                                      ║
*  ║ B: true or false, should event wait for motion before proceeding.    ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples ( MV ) :                                                    ║
*  ╠═══════════════════════════════════╣
*  ║ follower_motion motion throw_bone wait true                          ║
*  ╚═══════════════════════════════════╝

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

* @command player_motion
* @text Player Motion
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
* @desc The animation  when character is dash animation.
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

// TODO: motion does not honor velocity setting.. instead uses input velocity

//=============================================================================
  var Imported = Imported || {};
  Imported['Character Actions'.toUpperCase()] = true;
//=============================================================================
  var Chaucer = Chaucer || {};
  Chaucer.charActions = {};
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
          list.customAnimations.forEach( animation => {
              list[animation.name] = animation;
            } );
          } );

    };

  //============================================================================
    //Create plugin information.
  //============================================================================

    const identifier =  /(Character Actions) : Version - (\d+.\d+.\d+)/;
    // $._nameError = 'Character Actions was unable to load! Please revert any changes back to normal!';


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
  $.getMotionData = function ( name )
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
// Game_CharacterBase :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_CharacterBase, 'initMembers', function()
  { // Aliased initMembers of class Game_CharacterBase.
//-----------------------------------------------------------------------------

    $.alias();
    this._motions = null;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'setMotions', function( data )
  { // set the motin data.
//-----------------------------------------------------------------------------

    this._motions2 = data;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'requestMotion', function( motion )
  { // request a motion to be played.
//-----------------------------------------------------------------------------

    this._requestMotion = motion;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'fetchMotion', function()
  { // return animation data.
//-----------------------------------------------------------------------------

    return this._motions2;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_CharacterBase, 'update', function()
  { // Aliased updat of class Game_CharacterBase.
//-----------------------------------------------------------------------------

    $.alias();
    this.updateMotion();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'updateMotion', function()
  { // update the current motion so it refreshes/loads when neeeded.
//-----------------------------------------------------------------------------

    const motions = this.fetchMotion();

    if ( !this._motionLoading && this._motions != motions ) {
      if ( motions ) this.refreshMotions( motions );
    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'refreshMotions', function( motions )
  { // refresh the motions.
//-----------------------------------------------------------------------------

    if ( !motions ) return this._motions = null;

    const keys = Object.keys( motions );
    this._motionLoading = true;
    let bitmaps = [];

    for ( let i = 0, l = keys.length; i < l; i++ ) {
      if ( motions[keys[i]] && motions[keys[i]].filename ) {
        bitmaps.push( ImageManager.loadCharacter( motions[keys[i]].filename ) );
      };
    };

    bitmaps.forEach( bitmap => {

      bitmap.addLoadListener( function() {
        this._motionLoading = bitmaps.some( b => !b.isReady() );
        if ( !this._motionLoading ) this._motions = JsonEx.parse( JsonEx.stringify( motions ) );
      }.bind( this ) );
    } );


  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Character, 'hasMotions', function()
  { // return if the character has motions setup.
//-----------------------------------------------------------------------------

    return !!this._motions;

  }, false );

//=============================================================================
  $.expand( Game_CharacterBase, 'isCustomMotion', function( motion )
  { // return if the character is using a custom motion.
//=============================================================================

    if ( !this._motions ) return false;
    if ( motion == 'idle' ) return false;
    if ( motion == 'walk' ) return false;
    if ( motion == 'dash' ) return false;

    return !!motion;

  } );

//-----------------------------------------------------------------------------
  $.alias( Game_CharacterBase , 'getTraction', function()
  { // Aliased getTraction of class Game_CharacterBase .
//-----------------------------------------------------------------------------

    let traction = $.alias();

    if ( this.isCustomMotion( this._motion ) ) {
      const data = this._motions[this._motion];
      if ( data ) traction *= data.traction;
    }

    return traction;

  }, false );

//=============================================================================
// Game-Event :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_Event, 'initMembers', function()
  { // Aliased initMembers of class Game_Event.
//-----------------------------------------------------------------------------

    $.alias();
    this._motions = null;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Event, 'fetchMotion', function()
  { // Aliased fetchMotion of class Game_Event.
//-----------------------------------------------------------------------------

    return this._motions2;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Event, 'clearPageMotions', function()
  { // clear the motions for this page.
//-----------------------------------------------------------------------------

    this._motions2 = null;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Event, 'clearPageSettings', function()
  { // Aliased clearPageSettings of class Game_Event.
//-----------------------------------------------------------------------------

    $.alias();
    this.clearPageMotions();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Event, 'setMotions', function( motionsName )
  { // set the motions to the value proviided.
//-----------------------------------------------------------------------------

    this._motions2 = $.getMotionData( motionsName || '' ) || null;

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
  $.expand( Game_Event, 'setupPageMotions', function()
  { // setup mmotions for the current page.
//-----------------------------------------------------------------------------

    const list = this.page() ? this.list() : [];

    for ( let i = 0, l = list.length; i < l; i++ ) {

      const { code, parameters } = list[i];
      if ( code != 108 && code != 408 ) continue;
      if ( parameters[0].match( /\<\s*motions\s*:\s*(.*?)\s*>/ ) ) {
        this.setMotions( RegExp.$1.trim() );

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
    this.setupPageMotions();

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Event, 'updateSelfMovement', function()
  { // Aliased updateSelfMovement of class Game_Event.
//-----------------------------------------------------------------------------

    if ( this.hasMotions() && this.isCustomMotion( this._motion ) ) return;

    $.alias();

  }, false );

//=============================================================================
// Game_Player :
//=============================================================================

//-----------------------------------------------------------------------------
  $.expand( Game_Player, 'fetchMotion', function()
  { // return animation data for the character.
//-----------------------------------------------------------------------------

    const actor = $gameParty.leader();
    const meta = actor ? actor.actor().meta : {};

    return this._motions2 || $.getMotionData( meta.motions || '' );

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Player, 'canMove', function()
  { // Aliased canMove of class Game_Player.
//-----------------------------------------------------------------------------

    if ( this.isCustomMotion( this._motion ) ) return false;
    if ( this.isCustomMotion( this._requestMotion ) ) return false;

    return $.alias();

  }, false );

//=============================================================================
// Game_Follower :
//=============================================================================

//-----------------------------------------------------------------------------
  $.expand( Game_Follower, 'fetchMotion', function()
  { // return animation data for the character.
//-----------------------------------------------------------------------------

    const memberIndex = $gamePlayer._followers._data._memberIndex;
    const actor = $gameParty.members()[memberIndex];
    const meta = actor ? actor.actor().meta : {};

    return this._motions2 || $.getMotionData( meta.motions || '' );

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Follower, 'fetchMotion', function()
  { // return animation data for the character.
//-----------------------------------------------------------------------------

    const actor = this.actor();
    const meta = actor ? actor.actor().meta : {};

    return $.getMotionData( meta.motions || '' );

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
    this._motionCount = 0;
    this._motionName = '';

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'hasMotions', function()
  { // retrun if the character has motions.
//-----------------------------------------------------------------------------

    return this._character && this._character._motions;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'motionData', function( motionName )
  { // return motion data from the name.
//-----------------------------------------------------------------------------

    return this._character._motions[motionName];

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'update', function()
  { // Aliased update of class Sprite_Character.
//-----------------------------------------------------------------------------

    this.updateMotion();
    $.alias();

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'isEmptyCharacter', function()
  { // Aliased isEmptyCharacter of class Sprite_Character.
//-----------------------------------------------------------------------------

    return $.alias() && !this._motionName; 


  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'isImageChanged', function()
  { // Aliased isImageChanged of class Sprite_Character.
//-----------------------------------------------------------------------------

    if ( this.hasMotions() ) {
      const data = this.motionData( this._motion );
      return this._motionName != ( data ? data.filename : '' );

    } else {
      return $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'updateBitmap', function()
  { // Aliased updateBitmap of class Sprite_Character.
//-----------------------------------------------------------------------------

    if ( this.hasMotions() && this.isImageChanged() ) {
      this._motionName = this.motionData( this._motion ).filename;
      this.setMotionBitmap();

    } else {
      $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'setMotionBitmap', function()
  { // set the bitmap for motion.
//-----------------------------------------------------------------------------

    this.bitmap = ImageManager.loadCharacter( this._motionName );
    this._isBigCharacter = true;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'updateMotion', function()
  { // update the motion of the character.
//-----------------------------------------------------------------------------

    if ( this.hasMotions() ) {

      if ( !this._motion ) this.refreshMotion();
      //
      this._motionCount++;
      const current = this._motionCount;
      let { frames, duration } = this.motionData( this._motion );
      duration = duration || ( this._character.animationWait() * 3 );

      if ( this._motion == 'idle' && this._character.isMoving() ) {
        this.refreshMotion();

      } else if ( ['walk', 'dash'].includes( this._motion ) && !this._character.isMoving() ) {

        this.refreshMotion();

      } else if ( this._character._requestMotion ) {
        this.startMotion( this._character._requestMotion );
        this._character._requestMotion = null;

      } else if ( current < duration ) {
        this._pattern = Math.floor( ( current / duration ) * frames );

      } else {
        this.refreshMotion();

      }

      this.updateMotionAnchor();

    } else if ( this._motionName ) {
      this.clearMotion();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'clearMotion', function()
  { // clear motion data after removing a motion.
//-----------------------------------------------------------------------------

    this._motionName = '';
    this._characterName = '';
    this._tileId = 0;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'updateMotionAnchor', function()
  { // update the anchor position of the sprite.
//-----------------------------------------------------------------------------

    const data = this.motionData( this._motion );

    if ( data && this.bitmap ) {
      const width = this.patternWidth();
      const height = this.patternHeight();
      let { x, y } = data;

      let ox = ( x || 0 ) / width;
      let oy = ( y || 0 ) / height;

      this.anchor.x = 0.5 + ( isNaN( ox ) ? 0 : ox );
      this.anchor.y = 1 + ( isNaN( oy ) ? 0 : oy );

    }

  }, false );

//=============================================================================
  $.expand( Sprite_Character, 'startMotion', function ( motionName )
  { // start the motion.
//=============================================================================

    // if ( this._character && this._motion != motionName ) {
      this._character._motion = motionName;
      this._motion = motionName;
      this._motionCount = 0;
      this._pattern = 0;

      this.startVelocityForMotion();
      this.startSeForMotion();
      this.updateBitmap();
      this.updateFrame();

    // }

  } );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'getLeft90', function( d )
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
  $.expand( Sprite_Character, 'startVelocityForMotion', function()
  { // start characters velocity for motion.
//-----------------------------------------------------------------------------

    const data = this.motionData( this._motion );

    if ( data && Chaucer.CAP ) {

      let character = this._character;
      const velocity = data.velocty || data.velocity;
      let forward = this._character.direction();
      let backward = character.reverseDir( forward );
      let left = this.getLeft90( forward );
      let right = character.reverseDir( left );

      if ( velocity == 'forward' ) {
        character.velocity = character.getVectorFromDirection( forward )

      } else if ( velocity == 'backward' ) {
        character.velocity = character.getVectorFromDirection( backward )

      } else if ( velocity == 'left' ) {
        character.velocity = character.getVectorFromDirection( left )

      } else if ( velocity == 'right' ) {
        character.velocity = character.getVectorFromDirection( right )

      }

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'startSeForMotion', function()
  { // start se for the motion.
//-----------------------------------------------------------------------------

    const data = this.motionData( this._motion );

    if ( data && data.audio ) {
      setTimeout(function () {
        AudioManager.playSe( data.audio );
      }, 1000 * data.audio.delay );
    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'hasDash', function()
  { // return if the character has a dash sprite.
//-----------------------------------------------------------------------------

    const character = this._character;
    if ( character && character._motions ) {
      return character._motions.dash.filename;
    }

    return false;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'isDashing', function()
  { // return if the current character is dashing.
//-----------------------------------------------------------------------------

    const character = this._character;
    let isDashing = character.isDashing();

    if ( character.constructor.name == 'Game_Follower' ) {
      if ( Imported['COLLISION ALTERING PLUGIN'] ) {
        isDashing = this._dashing;

      } else {
        isDashing = $gamePlayer.isDashing();
      }

    }

    return isDashing;

  }, false );

//=============================================================================
  $.expand( Sprite_Character, 'refreshMotion', function ()
  { // refresh the motion of the character.
//=============================================================================

    const character = this._character;

    if ( character && character._motions ) {

      if ( character.isMoving() ) {

        if ( this.isDashing() && this.hasDash() ) {
          this.startMotion( 'dash' );

        } else {
          this.startMotion( 'walk' );
        }

      } else if ( !character.isMoving() && ( character._stopCount > 0 || !character._isMoved ) ) {
        this.startMotion( 'idle' );

      } else if ( !this._motion ) {
        this.startMotion( 'idle' );

      }

    }

  } );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'useDefaultPattern', function()
  { // retrun if we should use the defauult pattern.
//-----------------------------------------------------------------------------

    if ( this._character.hasMotions() ) return false;
    return true;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'characterPatternX', function()
  { // Aliased characterPatternX of class Sprite_Character.
//-----------------------------------------------------------------------------

    if ( !this.useDefaultPattern() ) {
      return this._pattern || 0;

    } else {
      return $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'patternWidth', function()
  { // Aliased patternWidth of class Sprite_Character.
//-----------------------------------------------------------------------------

    if ( this.hasMotions() && this.bitmap ) {
      const data = this.motionData( this._motion );
      if ( data ) return this.bitmap.width / data.frames;

    }

    return $.alias();

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
      waiting = target && target.isCustomMotion( target._requestMotion );
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

    $gamePlayer._motions2 = $.getMotionData( args.name.trim() );

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'set_event_motion_data', function( args )
  { // register command for set_motion_data.
//-----------------------------------------------------------------------------

    const event = $gameMap.event( args.id );

    if ( event ) event._motions2 = $.getMotionData( args.name.trim() );

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'set_follower_motion_data', function( args )
  { // register command for set_motion_data.
//-----------------------------------------------------------------------------

    const follower = $gameParty._followers._data[args.id - 1];

    if ( follower ) follower._motions2 = $.getMotionData( args.motion );

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'player_motion', function( args )
  { // register command for player_motion.
//-----------------------------------------------------------------------------

    $gamePlayer.requestMotion( args.motion.trim() )

    if ( args.wait ) {
      this._motionTarget = 0;
      this._waitMode = 'motion';
    }

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'event_motion', function( args )
  { // register command for event_motion.
//-----------------------------------------------------------------------------

    const event = $gameMap.event( args.id );

    if ( event ) event.requestMotion( args.motion.trim() );

    if ( args.wait ) {
      this._motionTarget = event._eventId;
      this._waitMode = 'motion';
    }

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'follower_motion', function()
  { // register command for follower_motion.
//-----------------------------------------------------------------------------

    const follower = $gamePlayer._followers._data[args.id - 1];

    if ( follower ) follower.requestMotion( args.motion.trim() );

    if ( args.wait ) {
      this._motionTarget = -args.id;
      this._waitMode = 'motion';
    }

  } );

//=============================================================================
} )( Chaucer.charActions );
//=============================================================================

// TODO: add jump motion!
// TODO: add climb motion!
// TODO: pickup and carry and throw
