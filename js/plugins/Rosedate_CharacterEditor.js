/*:============================================================================
*
* @target MZ
*
* @author Chaucer
*
* @plugindesc | Character Editor Scene : Version - 1.0.0 | Add the character editor scene.
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


*============================================================================
*  Terms Of Use :
*============================================================================

*  This Plugin may be used commercially, or non commercially. This plugin may
* be extended upon, and or shared freely as long as credit is given to it's
* author(s). This plugin may NOT be sold, or plagiarized.

*============================================================================
*  Version History :
*============================================================================

*  ● Version : 1.0.0
*  ● Date : 18/01/2024
*    ★ Release.

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

*============================================================================*/

//=============================================================================
  var Imported = Imported || {};
  Imported['Character Editor Scene'.toUpperCase()] = true;
//=============================================================================
  var Chaucer = Chaucer || {};
  Chaucer.characterEdit = {};
//=============================================================================

//=============================================================================
// Scene_CharacterEditor :
//=============================================================================

//=============================================================================
class Scene_CharacterEditor extends Scene_Base
{ // Scene_CharacterEditor

//=============================================================================
  constructor()
  { // Called on object creation.
//=============================================================================

    super();

  }

//=============================================================================
  create()
  { // create all elements of the scene.
//=============================================================================

    this.createDirectionContainer();
    this.createMotionDataContainer();
    this.createAnimationContainer();
    this.createFramesContainer();
    // this.createTopContainer();

  }

//=============================================================================
  createDirectionContainer()
  { // create a container for the direction buttons and character sprite.
//=============================================================================

    this._directionsContainer = new DirectionContainer();
    this.addChild( this._directionsContainer );

  }

//=============================================================================
  createMotionDataContainer()
  { // create a container for the motion data.
//=============================================================================

    const x = this._directionsContainer.x;
    const y = this._directionsContainer.y + this._directionsContainer.height;
    const width = this._directionsContainer.width;
    const height = Graphics.height - y;
    const rect = new Rectangle( x, y, width, height );

    this._motionDataContainer = new MotionDataContainer( rect );
    this.addChild( this._motionDataContainer );

  }

//=============================================================================
  createAnimationContainer()
  { // create the container for selecting animations.
//=============================================================================

    const height = Graphics.height;
    const width = Graphics.width / 4;
    const x = Graphics.width - width;
    const y = Graphics.height - height;

    const rect = new Rectangle( x, y, width, height );
    this._animationContainer = new AnimationContainer( rect );
    this.addChild( this._animationContainer );

  }

//=============================================================================
  createFramesContainer()
  { // create container that will display the available frames in the animation.
//=============================================================================

    const height = Graphics.height / 4;
    const x = this._motionDataContainer.x + this._motionDataContainer.width;
    const y = Graphics.height - height;
    const width = Graphics.width - x - this._animationContainer.width;

    const rect = new Rectangle( x, y, width, height );
    this._frameContainer = new FrameContainer( rect );

    this.addChild( this._frameContainer );

  }

//=============================================================================
  update()
  { // update the scene.
//=============================================================================

    super.update();
    this.updateMiniCharacter();

  }

//=============================================================================
  convertToArray( object )
  { // convert an object to an array.
//=============================================================================

    let array =  [];

    const keys = Object.keys( object );

    for ( let i = 0, l = keys.length; i < l; i++ ) {
      const entry = object[keys[i]];
      if ( !entry ) continue;
      entry.name = entry.name || keys[i];
      array.push( entry );
    };

    return array;

  }

//=============================================================================
  updateMiniCharacter()
  { // update the mini character in the direction field.
//=============================================================================

    const character = this._directionsContainer._character;
    const motionData = this._motionDataContainer._listField.item();

    if ( motionData && motionData.motions != character._motions ) {
      if ( motionData.motions != character._motions2 ) {
        character.setMotions( motionData.motions );
        const data = this.convertToArray( motionData.motions )
        this._animationContainer._animationDropDown.data = data;
      }
    }

    character.update();
    // if ( )
  }

}

//=============================================================================
// Game_CharacterMini :
//=============================================================================

//=============================================================================
class Game_CharacterMini extends Game_Character
{ // Game_CharacterMini

//=============================================================================
  constructor()
  { // Called on object creation.
//=============================================================================

    super();

  }

//=============================================================================
  scrolledX()
  { // return the scrolled x.
//=============================================================================

    return 0;

  }

//=============================================================================
  scrolledY()
  { // return the scrolled y.
//=============================================================================

    return 0;

  }

//=============================================================================
  screenX()
  { // return the screen x position.
//=============================================================================

    return 160;

  }

//=============================================================================
  screenY()
  { // return the screen y position.
//=============================================================================

    const sprite = SceneManager._scene._directionsContainer._characterSprite;
    return 160 + 34 + sprite.height / 2;

  }

}

//=============================================================================
window.Game_CharacterMini = Game_CharacterMini;
//=============================================================================

//=============================================================================
// DirectionContainer :
//=============================================================================

//=============================================================================
class DirectionContainer extends ContainerField
{ // DirectionContainer

//=============================================================================
  constructor( x, y )
  { // Called on object creation.
//=============================================================================

    const width = Graphics.width / 4 + 1;
    const height = width + 34;
    const rect = new Rectangle( x, y, width, height );

    super( rect );
    this._usedir8 = true;
    this._motionData = 0;
    this._direction = 2;
    this._motion = 'idle';
    this.set4Dir( true );
    // TODO: draw character motions.
    // TODO: need another for projectiles.
    // TODO: scene needs to read this direction/motion data to allow editing.
  }

//=============================================================================
  createElements()
  { // create all element buttons.
//=============================================================================

    this.createTopButtons();

    this.createUpLeftButton();
    this.createUpButton();
    this.createUpRightButton();

    this.createLeftButton();
    this.createMidButton();
    this.createRightButton();

    this.createDownLeftButton();
    this.createDownButton();
    this.createDownRightButton();

  }

//=============================================================================
  get defaults()
  { // return the default changes.
//=============================================================================

    return {
      backgroundColor: '#4a505b',
      hoverColor: '#adafb3'
    };

  }


//=============================================================================
  setDirection( d )
  { // set the direction.
//=============================================================================

    this._direction = d;
    this._character.setDirection( d );

  }

//=============================================================================
  createTopButtons()
  { // create the top buttons.
//=============================================================================

    this.createButton4Dir();
    this.createButton8Dir();
    this.createButtonPlatformer();

  }

//=============================================================================
  createButton4Dir()
  { // create the 4 directional button( 4 rows ).
//=============================================================================

    const width = ( ( this.width - 4 ) / 3 );
    const height = 32;
    const x = width * 0 + 3;
    const y = 3;

    this._button4Dir = new ButtonField( width, height, '4 Dir' );
    this._button4Dir.position.set( x, y );

    this.addChild( this._button4Dir );

    this._button4Dir.setClickHandler( this.set4Dir.bind( this ) );

  }

//=============================================================================
  set4Dir()
  { // set the sprite to use 4 directions only.
//=============================================================================

    this._usedir8 = false;
    this._upButton.visible = true;
    this._downButton.visible = true;
    this._upLeftButton.visible = false;
    this._upRightButton.visible = false;
    this._downLeftButton.visible = false;
    this._downRightButton.visible = false;

    this._button2Dir.backgroundColor = "#d97fc9";
    this._button4Dir.backgroundColor = "#457fc9";
    this._button8Dir.backgroundColor = "#d97fc9";
    this._button2Dir.hoverColor = "#db8f99";
    this._button4Dir.hoverColor = "#5287cc";
    this._button8Dir.hoverColor = "#db8f99";

    this.setDirection( 2 );

  }

//=============================================================================
  createButton8Dir()
  { // create button for 8 directional sprites( 8 rows ).
//=============================================================================

    const width = ( ( this.width - 4 ) / 3 );
    const height = 32;
    const x = ( this.width - 4 ) / 3 * 1 + 3;
    const y = 3;

    this._button8Dir = new ButtonField( width, height, '8 Dir' );
    this._button8Dir.position.set( x, y );

    this.addChild( this._button8Dir );

    this._button8Dir.setClickHandler( this.set8Dir.bind( this ) );

  }

//=============================================================================
  set8Dir()
  { // set the sprite to use 4 directions only.
//=============================================================================

    this._usedir8 = true;
    this._upButton.visible = true;
    this._downButton.visible = true;
    this._upLeftButton.visible = true;
    this._upRightButton.visible = true;
    this._downLeftButton.visible = true;
    this._downRightButton.visible = true;

    this._button2Dir.backgroundColor = "#d97fc9"
    this._button4Dir.backgroundColor = "#d97fc9"
    this._button8Dir.backgroundColor = "#457fc9"
    this._button2Dir.hoverColor = "#db8f99";
    this._button4Dir.hoverColor = "#db8f99";
    this._button8Dir.hoverColor = "#5287cc";

    this.setDirection( 2 );

  }

//=============================================================================
  createButtonPlatformer()
  { // create a button for platformer sprites( single row ).
//=============================================================================

    const width = ( ( this.width - 4 ) / 3 );
    const height = 32;
    const x = ( this.width - 4 ) / 3 * 2 + 3;
    const y = 3;

    this._button2Dir = new ButtonField( width, height, 'Platformer' );
    this._button2Dir.position.set( x, y );

    this.addChild( this._button2Dir );

    this._button2Dir.setClickHandler( this.setPlatformer.bind( this ) );

  }

//=============================================================================
  setPlatformer()
  { // set the sprite to use 4 directions only.
//=============================================================================

    this._usedir8 = 'platformer';
    this._upButton.visible = false;
    this._downButton.visible = false;
    this._upLeftButton.visible = false;
    this._upRightButton.visible = false;
    this._downLeftButton.visible = false;
    this._downRightButton.visible = false;

    this._button2Dir.backgroundColor = "#457fc9"
    this._button4Dir.backgroundColor = "#d97fc9"
    this._button8Dir.backgroundColor = "#d97fc9"
    this._button2Dir.hoverColor = "#5287cc";
    this._button4Dir.hoverColor = "#db8f99";
    this._button8Dir.hoverColor = "#db8f99";

    this.setDirection( 6 );

  }

//=============================================================================
  createUpLeftButton()
  { // create a button that displays up left arrow.
//=============================================================================

    const x = 2;
    const y = 34 + 2;
    const width = Math.floor( this.width / 3 - 2 );
    const height = width;
    const text = '⬉';
    this._upLeftButton = new ButtonField( width, height, text, this.defaults );
    this._upLeftButton.position.set( x, y );
    this._upLeftButton.fontSize = 52;
    this.addElement( this._upLeftButton );

    this._upLeftButton.setClickHandler( function() {
      this.setDirection( 7 )
    }.bind( this ) );

  }

//=============================================================================
  createUpButton()
  { // create the up button.
//=============================================================================

    const x = Math.floor( 1 + this.width / 3 );
    const y = 34 + 2;
    const width = Math.floor( this.width / 3 - 2 );
    const height = width;
    const text = '⬆';
    this._upButton = new ButtonField( width, height, text, this.defaults );
    this._upButton.position.set( x, y );
    this._upButton.fontSize = 52;
    this.addElement( this._upButton );

    this._upButton.setClickHandler( function() {
      this.setDirection( 8 )
    }.bind( this ) );

  }

//=============================================================================
  createUpRightButton()
  { // create the up right button.
//=============================================================================

    const x = Math.floor( 0 + this.width / 3 * 2 );
    const y = 34 + 2;
    const width = Math.floor( this.width / 3 - 2 );
    const height = width;
    const text = '⬈';
    this._upRightButton = new ButtonField( width, height, text, this.defaults );
    this._upRightButton.position.set( x, y );
    this._upRightButton.fontSize = 52;
    this.addElement( this._upRightButton );

    this._upRightButton.setClickHandler( function() {
      this.setDirection( 9 )
    }.bind( this ) );

  }

//=============================================================================
  createLeftButton()
  { // create a button that displays left arrow.
//=============================================================================

    const x = 2;
    const y = 34 + 1 + Math.floor( this.width / 3 );
    const width = Math.floor( this.width / 3 - 2 );
    const height = width;
    const text = '⬅';
    this._leftButton = new ButtonField( width, height, text, this.defaults );
    this._leftButton.position.set( x, y );
    this._leftButton.fontSize = 52;
    this.addElement( this._leftButton );

    this._leftButton.setClickHandler( function() {
      this.setDirection( 4 )
    }.bind( this ) );

  }

//=============================================================================
  createMidButton()
  { // create the center button.
//=============================================================================

    this._character = new Game_CharacterMini();
    this._character.setStepAnime( true );
    this._characterSprite = new Sprite_Character( this._character );
    this.addChild( this._characterSprite );
    // const x = Math.floor( 1 + this.width / 3 );
    // const y = 34 + 1 + Math.floor( this.width / 3 );
    // const width = Math.floor( this.width / 3 - 2 );
    // const height = width;
    // const text = 'O';
    // this._upButton = new ButtonField( width, height, text );
    // this._upButton.position.set( x, y );
    // this._upButton.fontSize = 52;
    // this.addElement( this._upButton );

  }

//=============================================================================
  createRightButton()
  { // create the right button.
//=============================================================================

    const x = Math.floor( 0 + this.width / 3 * 2 );
    const y = 34 + 1 + Math.floor( this.width / 3 );
    const width = Math.floor( this.width / 3 - 2 );
    const height = width;
    const text = '➡';
    this._rightButton = new ButtonField( width, height, text, this.defaults );
    this._rightButton.position.set( x, y );
    this._rightButton.fontSize = 52;
    this.addElement( this._rightButton );

    this._rightButton.setClickHandler( function() {
      this.setDirection( 6 )
    }.bind( this ) );

  }

//=============================================================================
  createDownLeftButton()
  { // create a button that displays down left arrow.
//=============================================================================

    const x = 2;
    const y = 34 + 0 + Math.floor( this.width / 3 ) * 2;
    const width = Math.floor( this.width / 3 - 2 );
    const height = width;
    const text = '⬋';
    this._downLeftButton = new ButtonField( width, height, text, this.defaults );
    this._downLeftButton.position.set( x, y );
    this._downLeftButton.fontSize = 52;
    this.addElement( this._downLeftButton );

    this._downLeftButton.setClickHandler( function() {
      this.setDirection( 1 )
    }.bind( this ) );

  }

//=============================================================================
  createDownButton()
  { // create the up button.
//=============================================================================

    const x = Math.floor( 1 + this.width / 3 );
    const y = 34 + 0 + Math.floor( this.width / 3 ) * 2;
    const width = Math.floor( this.width / 3 - 2 );
    const height = width;
    const text = '⬇';
    this._downButton = new ButtonField( width, height, text, this.defaults );
    this._downButton.position.set( x, y );
    this._downButton.fontSize = 52;
    this.addElement( this._downButton );

    this._downButton.setClickHandler( function() {
      this.setDirection( 2 )
    }.bind( this ) );

  }

//=============================================================================
  createDownRightButton()
  { // create the up right button.
//=============================================================================

    const x = Math.floor( 0 + this.width / 3 * 2 );
    const y = 34 + 0 + Math.floor( this.width / 3 ) * 2;
    const width = Math.floor( this.width / 3 - 2 );
    const height = width;
    const text = '⬊';
    this._downRightButton = new ButtonField( width, height, text, this.defaults );
    this._downRightButton.position.set( x, y );
    this._downRightButton.fontSize = 52;
    this.addElement( this._downRightButton );

    this._downRightButton.setClickHandler( function() {
      this.setDirection( 3 );
    }.bind( this ) );

  }

}

//=============================================================================
window.DirectionContainer = DirectionContainer;
//=============================================================================

//=============================================================================
class MotionDataContainer extends ContainerField
{ // MotionDataContainer

//=============================================================================
  constructor( rect )
  { // Called on object creation.
//=============================================================================

    super( rect );
    const motions = this.fetchProjectMotionData();
    this.createMotionDataField( motions );
    this._motionData = null;

  }

//=============================================================================
  fetchProjectMotionData()
  { // fetch the motion data from the current project.
//=============================================================================

    const fs = require( 'fs' );
    const path = require( 'path' );
    const base = $gameTemp._project.directory;
    const plugin = 'plugins.js';
    const dir = path.join( base, 'js', plugin )
    // let oldPlugins = $plugins;
    let string = fs.readFileSync( dir, { encoding:'utf8', flag:'r' } );
    string = string.replace( 'var $plugins =\n', '' );
    const data = this.findMotionData( eval( string ) );

    return data;

  }

//=============================================================================
  findMotionData( plugins )
  { // return motion data from list of plugins.
//=============================================================================

    const identifier =  /(Character Actions) : Version - (\d+.\d+.\d+)/;
    let plugin = null;
    let data = [];

    for ( let i = 0, l = plugins.length; i < l; i++ ) {
      if ( plugins[i].description.match( identifier ) ) {
        plugin = plugins[i];
        break;
      }
    };

    if ( plugin ) {
      let motions = Chaucer.parse( plugin.parameters ).motionData;

      for ( let i = 0, l = motions.length; i < l; i++ ) {
        const customAnimations = motions[i].customAnimations;
        const name = motions[i].name;

        delete motions[i].name;
        delete motions[i].customAnimations;
        delete motions[i].conditionalMotionData;


        for ( let j = 0, l2 = customAnimations.length; j < l2; j++ ) {
          const name = customAnimations[j].name;
          motions[i][name] = customAnimations[j];
        };

        data.push( { name, motions: motions[i] } );

      };

    }

    return data;

  }

//=============================================================================
  createMotionDataField( motions )
  { // create a field for motion data.
//=============================================================================

    this._listField = new ListField( this.width, 14, motions );
    this.addElement( this._listField );

  }

}

//=============================================================================
window.MotionDataContainer = MotionDataContainer;
//=============================================================================

//=============================================================================
// AnimationContainer :
//=============================================================================

//=============================================================================
class AnimationContainer extends ContainerField
{ // AnimationContainer

//=============================================================================
  constructor( rect )
  { // Called on object creation.
//=============================================================================

    super( rect );

  }

//=============================================================================
  createElements()
  { // create all elements of the container.
//=============================================================================

    this.createAnimationSettings();
    this.createAnimationDropDown();
    this.createAnimationLabel();

  }

//=============================================================================
  createAnimationLabel()
  { // create a label that says animation.
//=============================================================================

    this._animationLabel = new LabelField( 'Current Animation' );
    this._animationLabel.align = 'center';
    this._animationLabel.x = this.width / 2;
    this._animationLabel.y = 10;
    this.addElement( this._animationLabel );

  }

//=============================================================================
  createAnimationDropDown()
  { // create the drop down for selectng animations.
//=============================================================================

    const data = [];
    const width = this.width - 20;
    this._animationDropDown = new DropDownField( width, data );
    this._animationDropDown.x = ( this.width - width ) / 2;
    this._animationDropDown.y = 32 + 5;
    this.addElement( this._animationDropDown );

    this._animationDropDown.setOkHandler( this.onAnimationOk.bind( this ) );

  }

//=============================================================================
  onAnimationOk()
  { // when choosing an animation from the list.
//=============================================================================

    const { index, data } = this._animationDropDown;
    this._animation = data[index] ? data[index] : null;
    // TODO: refresh settings whatever they may be

  }

//=============================================================================
  createAnimationSettings()
  { // create the settings for the animation.
//=============================================================================

    this.createSettingsLabel();

  }

//=============================================================================
  createSettingsLabel()
  { // create a label to indicate the animation settings.
//=============================================================================

    this._settingsLabel = new LabelField( 'Animation Settings' );
    this._settingsLabel.align = 'center';
    this._settingsLabel.x = this.width / 2;
    this._settingsLabel.y = 32 * 2 + 10;
    this.addElement( this._settingsLabel );

  }

}

//=============================================================================
window.AnimationContainer = AnimationContainer;
//=============================================================================

//=============================================================================
// FrameContainer :
//=============================================================================

//=============================================================================
class FrameContainer extends ContainerField
{ // FrameContainer

//=============================================================================
  constructor( rect )
  { // Called on object creation.
//=============================================================================

    super( rect );

  }

//=============================================================================
  get label()
  { // return the current text.
//=============================================================================

    return this._frameLabel.text;

  }

//=============================================================================
  set label( value )
  { // set the current text.
//=============================================================================

    this._frameLabel.text = value;

  }

//=============================================================================
  createElements()
  { // create all elements in the container.
//=============================================================================

    this.createFrameLabel();
    this.createLeftArrow();
    this.createRightArrow();
    this.createCurrentFrame();
    this.createPreviousFrame();
    this.createNextFrame();
  }

//=============================================================================
  createFrameLabel()
  { // create a label for the frame data.
//=============================================================================

    const text = 'Frames';

    this._frameLabel = new LabelField( text );
    this._frameLabel.align = 'center';
    this._frameLabel.x = this.width / 2;
    this._frameLabel.y = 10;

    this.addElement( this._frameLabel );

  }

//=============================================================================
  createLeftArrow()
  { // create the left arrow button.
//=============================================================================

    const text = '⬅';
    const width = 32;
    const height = this.height - 32 - 8;
    this._leftArrow = new ButtonField( width, height, text );
    this._leftArrow.position.set( 4, 32 + 4 );

    this.addElement( this._leftArrow );

  }

//=============================================================================
  createRightArrow()
  { // create the right arrow button.
//=============================================================================

    const text = '➡';
    const width = 32;
    const height = this.height - 32 - 8;
    this._rightArrow = new ButtonField( width, height, text );
    this._rightArrow.position.set( this.width - width - 4, 32 + 4 );

    this.addElement( this._rightArrow );

  }

//=============================================================================
  createCurrentFrame()
  { // create the current frame sprite window.
//=============================================================================

    const text = 'current';
    const height = this.height - 32 - 8;
    const width = height;
    this._currFrame = new ButtonField( width, height, text );
    this._currFrame.position.set( Math.floor( ( this.width - width ) / 2 ), 32 + 4 );

    this.addElement( this._currFrame );


  }

//=============================================================================
  createPreviousFrame()
  { // create the previous frame sprite.
//=============================================================================

    const text = 'previous';
    const height = this.height - 32 - 8;
    const width = height;
    const ox = this._leftArrow.x + this._leftArrow.width;
    const x = ( ox + ( this._currFrame.x - ( ox ) - width ) / 2 );
    this._prevFrame = new ButtonField( width, height, text );
    this._prevFrame.position.set( Math.floor( x ), 32 + 4 );

    this.addElement( this._prevFrame );

  }

//=============================================================================
  createNextFrame()
  { // create the previous frame sprite.
//=============================================================================

    const text = 'next';
    const height = this.height - 32 - 8;
    const width = height;
    const ox = this._currFrame.x + this._currFrame.width;
    const x = ( ox + ( this._rightArrow.x - ( ox ) - width ) / 2 );
    this._nextFrame = new ButtonField( width, height, text );
    this._nextFrame.position.set( Math.floor( x ), 32 + 4 );

    this.addElement( this._nextFrame );

  }

}

//=============================================================================
window.FrameContainer = FrameContainer;
//=============================================================================

//=============================================================================
window.Scene_CharacterEditor = Scene_CharacterEditor;
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
    Chaucer.makePluginInfo = Chaucer.makePluginInfo || function ( $, n )
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

    };

  //============================================================================
    //Create plugin information.
  //============================================================================

    const identifier =  /(Character Editor Scene) : Version - (\d+.\d+.\d+)/;
    // $._nameError = 'Character Editor Scene was unable to load! Please revert any changes back to normal!';


    Chaucer.makePluginInfo( $, identifier );

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
// ImageManager :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( ImageManager, 'loadCharacter', function( url )
  { // Aliased loadTileset of class ImageManager.
//-----------------------------------------------------------------------------

    if ( !url ) return $.alias( url );

    const path = require( 'path' );
    const fs = require( 'fs' );
    const base = $gameTemp._project.directory;
    const file = path.join( base, 'img', 'characters', url + '.png' );

    let base64 = fs.readFileSync( file ).toString( 'base64' );
    base64 = 'data:image/png;base64,' + base64;

    return Bitmap.loadBase64( base64 );


  }, true );

//=============================================================================
// Sprite_Character :
//=============================================================================

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'isPlatformerSprite', function()
  { // return if the character is using 8 dir or not.
//-----------------------------------------------------------------------------

    const window = SceneManager._scene._directionsContainer;
    return window._usedir8 === 'platformer';

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'is8DirSprite', function()
  { // return if the character is using 8 dir or not.
//-----------------------------------------------------------------------------

    const window = SceneManager._scene._directionsContainer;
    return window._usedir8 === true;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'characterPatternY', function()
  { // Aliased characterPatternY of class Sprite_Character.
//-----------------------------------------------------------------------------

    if ( this.isPlatformerSprite() ) {
      return 0;

    } else if ( this.is8DirSprite() ) {
      const d = this._character.direction();
      return d - ( d >= 5 ? 2 : 1 );

    } else {
      return $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'patternHeight', function()
  { // Aliased patternHeight of class Sprite_Character.
//-----------------------------------------------------------------------------

    if ( this.isPlatformerSprite() ) {
      return this.bitmap.height;

    } else if ( this.is8DirSprite() ) {
      return Math.floor( this.bitmap.height / 8 );

    } else {
      return $.alias();

    }

  }, false );

//=============================================================================
} )( Chaucer.characterEdit );
//=============================================================================
