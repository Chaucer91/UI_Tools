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
// Rect :
//=============================================================================

//=============================================================================
class Rect
{ // Rect

//=============================================================================
constructor( x, y, width, height )
{ // Called on object creation.
//=============================================================================

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.angle = 0;

}

//=============================================================================
  get center()
  { // return the center of the rectangle.
//=============================================================================

    return new Vector2( this.x + this.width / 2, this.y + this.height / 2 );

  }

//=============================================================================
get aabb()
{ // return the aabb based on the shape.
//=============================================================================

  return this;

}

//=============================================================================
// PROPERTIES :
//=============================================================================

//=============================================================================
get points()
{ // return the points for this rectangle.
//=============================================================================

  return [
    new Vector2( 0, 0 ),
    new Vector2( this.width, 0 ),
    new Vector2( 0 + this.width, 0 ),
    new Vector2( 0, this.height ),
    new Vector2( 0 + this.width, 0 + this.height ),
    new Vector2( -this.width, 0 ),
    new Vector2( 0, 0 + this.height ),
    new Vector2( 0, -this.height ),
  ]

}

//=============================================================================
get rotatedPoints()
{ // return the rotated points for this shape.
//=============================================================================

  const points = this.points;
  const { x, y, width, height } = this;
  const center = new Vector2( width / 2, height / 2 );
  const angle = this.angle;

  for ( let i = 0, l = points.length; i < l; i += 2 ) {

    const p1 = Vector2.subtract( points[i + 0], center );
    p1.x = p1.x * Math.cos( angle ) - p1.y * Math.sin( angle );
    p1.y = p1.x * Math.sin( angle ) + p1.y * Math.cos( angle );
    points[i] = Vector2.add( p1, center );

    const p2 = Vector2.subtract( points[i + 1], center );
    p2.x = p2.x * Math.cos( angle ) - p2.y * Math.sin( angle );
    p2.y = p2.x * Math.sin( angle ) + p2.y * Math.cos( angle );
    points[i] = Vector2.add( p2, center );

  }

}

//=============================================================================
// PROTOTYPE :
//=============================================================================

//=============================================================================
divide( scalar )
{ // divide the size by scalar provided.
//=============================================================================

  this.width /= scalar;
  this.height /= scalar;

}

//=============================================================================
multiply( scalar )
{ // divide the size by scalar provided.
//=============================================================================

  this.width *= scalar;
  this.height *= scalar;

}

}

//=============================================================================
window.Rect = Rect;
//=============================================================================

//=============================================================================
// Scene_MotionEditor :
//=============================================================================

//=============================================================================
class Scene_MotionEditor extends Scene_Base
{ // Scene_MotionEditor

//=============================================================================
  constructor()
  { // Called on object creation.
//=============================================================================

    super();
    this.initVariables();
    // this.loadHitboxData();

  }

//=============================================================================
  initVariables()
  { // initialize all variables.
//=============================================================================

    this._target = null;

  }
//
// //=============================================================================
//   loadHitboxData()
//   { // load the hitbox/hurtbox data.
// //=============================================================================
//
//     const fs = require( 'fs' );
//     const path = require( 'path' );
//     const base = $gameTemp._project.directory;
//     let folder = path.join( base, 'data', 'abs' )
//     let hitboxes = path.join( folder, 'Actions.json' );
//
//     if ( !fs.existsSync( folder ) ) fs.mkdirSync( folder );
//
//     if ( !fs.existsSync( hitboxes ) ) {
//       fs.writeFileSync( hitboxes, JsonEx.stringify( [null] ) );
//     }
//
//     this._motionData = JsonEx.parse( fs.readFileSync( hitboxes, { encoding: 'utf8' } ) );
//
//   }
//
// //=============================================================================
//   saveHitboxData()
//   { // save the current hitbox and hurtbox data.
// //=============================================================================
//
//     const fs = require( 'fs' );
//     const path = require( 'path' );
//     const base = $gameTemp._project.directory;
//     let folder = path.join( base, 'data', 'abs' )
//     let motions = path.join( folder, 'Actions.json' );
//
//     if ( !fs.existsSync( folder ) ) fs.mkdirSync( folder );
//
//     fs.writeFileSync( motions, JsonEx.stringify( this._motionData ) );
//
//   }

//=============================================================================
  create()
  { // create all elements of the scene.
//=============================================================================

    const character = this.character();

    if ( !character.extras.motionData ) {
      character.extras.motionData = this.createNewMotionData();
    }

    this.createEditor();
    this.createDirectionContainer();
    this.createMotionDataContainer();
    this.createAnimationContainer();
    this.createFramesContainer();
    this.createToolsContainer();
    this.createBoxContainer();
    this.createMotionDialog();
    this.setupData();

  }

//=============================================================================
  setupData()
  { // setup the data for the window to process properly.
//=============================================================================


    const container = this._motionDataContainer;
    let item = this.motionData();
    const character = this._directionsContainer._character;

    if ( !item ) {
      const data = this._motionDataContainer._listField.data;
      item = this.character().extras.motionData = this.createNewMotionData();
    }

    const tIndex = [true, false, 'platformer'].indexOf( item.dir8 );
    //
    container._motionDataNameField.text = item.name;
    container._motionDataTypeField.index = tIndex;
    container.onTypeChange( container._motionDataTypeField.item() );
    container._motionDataTypeField.disabled = !item;
    container._motionDataSpeedField.disabled = !item;
    character.setMotionData( item );
    character._motion = 'idle';
    //
    const data = this.convertToArray( item.motions );
    this._animationContainer._animationDropDown.index = 0;
    this._animationContainer._animationDropDown._list.index = 0;
    this._animationContainer._animationDropDown._list.topIndex = 0;
    this._animationContainer._animationDropDown.data = data;
    this._animationContainer.onAnimationOk();
    //
    this._directionsContainer.refreshButtons()

  }

//=============================================================================
  createEditor()
  { // create the editor sprite.
//=============================================================================

    this._editorSprite = new Sprite_Editor();
    this._editorSprite.x = Graphics.width / 2;
    this._editorSprite.y = Graphics.height / 2 + Graphics.height / 4;
    this.addChild( this._editorSprite );

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

    // this._motionDataContainer._listField.setOkHandler( this.onDataChange.bind( this ) );
  }

//=============================================================================
  character()
  { // return the current character being edited.
//=============================================================================

    if ( $gameTemp._characterMode === 'Actors' ) {
      return $gameTemp._actors[$gameTemp._characterIndex]

    } else {
      return $gameTemp._enemies[$gameTemp._characterIndex]

    }

  }

//=============================================================================
  motionData()
  { // return the motion data.
//=============================================================================

    return this.character().extras.motionData;

  }

//=============================================================================
  onDataChange( index )
  { // when data is changed.
//=============================================================================

    // const container = this._motionDataContainer;
    // let item = this._motionDataContainer._listField.item();
    // const character = this._directionsContainer._character;
    //
    // if ( !item ) {
    //   const data = this._motionDataContainer._listField.data;
    //   item = data[index] = this.createNewMotionData();
    //   container._listField.data[index];
    //   container._listField.data = data;
    //   container._listField.data.push( null );
    // }
    //
    // const tIndex = [true, false, 'platformer'].indexOf( item.dir8 );

    // container._motionDataNameField.text = item.name;
    // container._motionDataTypeField.index = tIndex;
    // container.onTypeChange( container._motionDataTypeField.item() );
    // container._listField.refresh();
    // container._listField._scrollbar.refresh();
    // container._motionDataNameField.disabled = !item;
    // container._motionDataTypeField.disabled = !item;
    // container._motionDataSpeedField.disabled = !item;
    // container._motionDataDeleteButton.disabled = !item;
    // character.setMotionData( item );
    // character._motion = 'idle';
    //
    // const data = this.convertToArray( item.motions );
    // this._animationContainer._animationDropDown.index = 0;
    // this._animationContainer._animationDropDown._list.index = 0;
    // this._animationContainer._animationDropDown._list.topIndex = 0;
    // this._animationContainer._animationDropDown.data = data;
    // this._animationContainer.onAnimationOk();
    //
    // this._directionsContainer.refreshButtons()

  }

//=============================================================================
  createNewMotionData()
  { // create a new motion data set.
//=============================================================================

    // const orgName = 'New Entry';
    let name = $gameTemp._characterIndex + '-' + this.character().name;
    // let n = 0;
    //
    // const data = this._motionDataContainer._listField.data;
    //
    // while ( data.some( n => n && n.name == name ) ) {
    //   name = orgName + ` (${++n})`;
    // }

    let dir8 = false;
    let speedMod = 0;
    let motions = this.createDefaultMotions();
    return { name, dir8, speedMod, motions };

  }

//=============================================================================
  createDefaultMotions()
  { // create the default motions.
//=============================================================================

    return {
      idle: {
      filename: '',
      frames: 3,
      duration: 60,
      offset: {x: 0, y: 0 },
      hitboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
      hurtboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
      preload: true,
      traction: 1,
      friction: 1,
      loop: false,
      noise: 0,
      audio: { name: "", volume: 90, pitch: 100, pan: 0 }
    },
      walk: {
        filename: '',
        frames: 3,
        offset: {x: 0, y: 0 },
        hitboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        hurtboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        preload: true,
        traction: 1,
        friction: 1,
        loop: false,
        noise: 0,
        audio: { name: "", volume: 90, pitch: 100, pan: 0 }
     },
      dash: {
        filename: '',
        frames: 3,
        offset: {x: 0, y: 0 },
        hitboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        hurtboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        preload: true,
        traction: 1,
        friction: 1,
        loop: false,
        noise: 0,
        audio: { name: "", volume: 90, pitch: 100, pan: 0 }
     },
      jump: {
        filename: '',
        frames: 3,
        offset: {x: 0, y: 0 },
        hitboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        hurtboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        preload: true,
        traction: 1,
        friction: 1,
        loop: false,
        noise: 0,
        audio: { name: "", volume: 90, pitch: 100, pan: 0 }
     },
      climb: {
        filename: '',
        frames: 3,
        offset: {x: 0, y: 0 },
        hitboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        hurtboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        preload: true,
        traction: 1,
        friction: 1,
        loop: false,
        noise: 0,
        audio: { name: "", volume: 90, pitch: 100, pan: 0 }
     },
      attack: {
        filename: '',
        frames: 3,
        offset: {x: 0, y: 0 },
        hitboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        hurtboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        velocity: 'none',
        preload: true,
        traction: 1,
        friction: 1,
        loop: false,
        noise: 0,
        audio: { name: "", volume: 90, pitch: 100, pan: 0 }
     },
      chant: {
        filename: '',
        frames: 3,
        offset: {x: 0, y: 0 },
        hitboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        hurtboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        velocity: 'none',
        preload: true,
        traction: 1,
        friction: 1,
        loop: true,
        noise: 0,
        audio: { name: "", volume: 90, pitch: 100, pan: 0 }
     },
      skill: {
        filename: '',
        frames: 3,
        offset: {x: 0, y: 0 },
        hitboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        hurtboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        velocity: 'none',
        preload: true,
        traction: 1,
        friction: 1,
        loop: false,
        noise: 0,
        audio: { name: "", volume: 90, pitch: 100, pan: 0 }
     },
      item: {
        filename: '',
        frames: 3,
        offset: {x: 0, y: 0 },
        hitboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        hurtboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        velocity: 'none',
        preload: true,
        traction: 1,
        friction: 1,
        loop: false,
        noise: 0,
        audio: { name: "", volume: 90, pitch: 100, pan: 0 }
     },
      hurt: {
        filename: '',
        frames: 3,
        offset: {x: 0, y: 0 },
        hitboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        hurtboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        preload: true,
        velocity: 'none',
        traction: 1,
        friction: 1,
        loop: false,
        noise: 0,
        audio: { name: "", volume: 90, pitch: 100, pan: 0 }
     },
      dead: {
        filename: '',
        frames: 3,
        offset: {x: 0, y: 0 },
        hitboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        hurtboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        traction: 1,
        friction: 1,
        preload: true,
        loop: false,
        noise: 0,
        audio: { name: "", volume: 90, pitch: 100, pan: 0 }
     },

    };

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
  createToolsContainer()
  { // create a container for the tools.
//=============================================================================

    const height = Graphics.height / 4;
    const x = this._motionDataContainer.x + this._motionDataContainer.width;
    const y = 0;
    const width = ( Graphics.width - x - this._animationContainer.width ) / 3.5;

    const rect = new Rectangle( x, y, Math.round( width ), height );
    this._toolsContainer = new ToolsContainer( rect );
    this._toolsContainer.setEditor( this._editorSprite );
    this.addChild( this._toolsContainer );

  }

//=============================================================================
  createBoxContainer()
  { // create the container for the selected hitbox/hurtbox settings.
//=============================================================================

    const height = Graphics.height / 4;
    const x = this._toolsContainer.x + this._toolsContainer.width;
    const y = 0;
    const width = ( Graphics.width - x - this._animationContainer.width );

    const rect = new Rectangle( x, y, Math.floor( width ), height );
    this._boxContainer = new BoxContainer( rect );
    this._boxContainer.setEditor( this._editorSprite );
    this.addChild( this._boxContainer );

  }

//=============================================================================
  createMotionDialog()
  { // create the dialog window for importing new motions.
//=============================================================================

    const width = Math.round( Graphics.width / 4 );
    const height = Math.round( Graphics.height / 1.25 ) - 19;
    const y = ( Graphics.height - height ) / 2
    const x = ( Graphics.width - width ) / 2
    const rect = new Rectangle( x, y, width, height );

    this._motionDialogContainer = new MotionDialogContainer( rect );

    this.addChild( this._motionDialogContainer );
    this._motionDialogContainer.setOkHandler( this.importMotions.bind( this ) );
    this._motionDialogContainer.setCancelHandler( this.closeMotionDialog.bind( this ) );
    this._motionDialogContainer.hide();

  }

//=============================================================================
  openMotionDialog( data )
  { // open the motion dialog with the data provided.
//=============================================================================

    this._motionDialogContainer.setData( data );
    this._motionDialogContainer.show();

  }

//=============================================================================
  importMotions( data )
  { // import the motions specified.
//=============================================================================

    let str = 'File "%1" already exists, do you want to overwrite it?'
    const scene = SceneManager._scene;
    const motions = scene._motionData;

    for ( let i = 0, l = data.length; i < l; i++ ) {

      if ( motions.some( n => n && data[i] && n.name === data[i].name ) ) {
        if ( !confirm( str.format( str, data[i].name ) ) ) continue;
        const entry = motions.find( n => n && n.name == data[i].name );
        Object.assign( entry, data[i] );

      } else if ( data[i] ) {
        motions.unshift( data[i] );

      }

    };

    scene._motionDataContainer._listField.refresh();
    this.closeMotionDialog();

  }

//=============================================================================
  closeMotionDialog()
  { // close the motion dialog widnow.
//=============================================================================

    const container = this._motionDialogContainer;
    const list = container._motionList;

    container.hide();
    if ( list ) list._checked = [];
    SceneManager._scene._toolsContainer.enableTools();

  }

//=============================================================================
  update()
  { // update the scene.
//=============================================================================

    super.update();
    this.updateMiniCharacter();
    this.updateFrameContianer();
    this.updateTarget();
  }

//=============================================================================
  updateTarget()
  { // update the target.
//=============================================================================

    this.updateMotionDataTarget();

  }

//=============================================================================
  updateMotionDataTarget()
  { // update the motion data target.
//=============================================================================

    let scene = SceneManager._scene
    let list = scene._motionDataContainer._listField
    let target = this._target;
    let item = scene.motionData()

    if ( item && item.name && ( !target || target.name != item.name ) ) {
      this.setTarget( item );

    } else if ( !item && target ) {
      this.setTarget( null );

    }

  }

//=============================================================================
  setTarget( item )
  { // set the target from the motion data provided.
//=============================================================================

    // this._target = this._motionData[item.name];
    this._target = item;

  }

//=============================================================================
  getMotionsObjectFromItem( item )
  { // return all motions as an object for hitbox/hurtbox data from an item.
//=============================================================================

    let obj = {};

    let keys = Object.keys( item.motions ).filter( key => {
      let entry = item.motions[key];
      return entry.filename;
    } );

    let keys2 = [1, 2, 3, 4, 6, 7, 8, 9];

    for ( let i = 0, l = keys.length; i < l; i++ ) {
      let maxFrames = item.motions[keys[i]].frames;
      obj[keys[i]] = {
        hitboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] },
        hurtboxes: { 1: [], 2: [], 3: [], 4: [], 6: [], 7:[], 8: [], 9: [] }
      };


      for ( let j = 0, l = maxFrames; j < l; j++ ) {

        for ( let k = 0, l = keys2.length; k < l; k++ ) {
          obj[keys[i]].hitboxes[keys2[k]].push( [] );
          obj[keys[i]].hurtboxes[keys2[k]].push( [] );
        };

      };

    };

    return obj;

  }

//=============================================================================
  convertToArray( object )
  { // convert an object to an array.
//=============================================================================

    let array =  [];

    const keys = Object.keys( object );

    for ( let i = 0, l = keys.length; i < l; i++ ) {
      const entry = object[keys[i]];
      if ( !entry || typeof entry !=  'object' ) continue;
      entry.name = entry.name || keys[i];
      array.push( entry );
    };

    return array;

  }

//=============================================================================
  updateMiniCharacter()
  { // update the mini character in the direction field.
//=============================================================================

  //   const character = this._directionsContainer._character;
  //   const motionData = this._motionDataContainer._listField.item();
  //
  //   if ( motionData && motionData != character._motionData ) {
  //
  //     // character.setMotionData( motionData );
  //     // character._motion = 'idle';
  //     //
  //     // const data = this.convertToArray( motionData.motions )
  //     // this._animationContainer._animationDropDown.index = 0;
  //     // this._animationContainer._animationDropDown._list.index = 0;
  //     // this._animationContainer._animationDropDown._list.topIndex = 0;
  //     // this._animationContainer._animationDropDown.data = data;
  //     // this._animationContainer.onAnimationOk();
  //
  // } else if ( character._motionData ) {
  //   // const animation = this._animationContainer._animationDropDown.item();
  //   // if ( animation && character._motion != animation.name ) {
  //   //   character.requestMotion( animation.name );
  //   // }
  //
  // }
  //
  //   character.update();

  }

//=============================================================================
  updateFrameContianer()
  { // update the frame container.
//=============================================================================

    const animation = this._animationContainer._animationDropDown.item();
    const direction = this._directionsContainer._direction;
    const frameContainer = this._frameContainer;
    const editor = this._editorSprite;
    if ( frameContainer._animation != animation ) {
      frameContainer.setAnimation( animation );
      editor.setFrameData( animation );
    }
    if ( direction != frameContainer._direction ) {
      frameContainer.setDirection( direction );
      editor.setDirection( direction );
    }
    if ( editor._index != frameContainer.index ) {
      editor.setIndex( frameContainer.index );
    }

  }

//=============================================================================
  updateToolsContainer()
  { // update the container for the tools.
//=============================================================================

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
  isMoving()
  { // return if the character is moving.
//=============================================================================

    return ['walk', 'dash', 'climb'].includes( this._motion );

  }

//=============================================================================
  isOnLadder()
  { // return if the character is on a ladder.
//=============================================================================

    return false;

  }

//=============================================================================
  isMotionLoop( name )
  { // return always true.
//=============================================================================

    return true;

  }

//=============================================================================
  initialMotionData()
  { // retrn the initial motion data for the character.
//=============================================================================

    return this._motionData;

  }

//=============================================================================
  setMotionData( data )
  { // set the motion data.
//=============================================================================

    let name0 = this._motionData ? this._motionData.name : '';
    let name1 = data ? data.name : '';
    this._motionData = data || null;

    if ( name0 != name1 ) this.refreshMotionData();

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
    return 160 + sprite.height / 2;

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
    const height = width;
    const rect = new Rectangle( x, y, width, height );

    super( rect );
    this._usedir8 = false;
    this._motionData = 0;
    this._direction = 2;
    this._motion = 'idle';

    // TODO: need another for projectiles.
  }

// TODO: draw onion skinning toggles..
// TODO: draw hitboxes on frames windows.
// TODO: after modal is open freeze input!

//=============================================================================
  createElements()
  { // create all element buttons.
//=============================================================================


    this.createUpLeftButton();
    this.createUpButton();
    this.createUpRightButton();

    this.createLeftButton();
    this.createMidButton();
    this.createRightButton();

    this.createDownLeftButton();
    this.createDownButton();
    this.createDownRightButton();

    this.resestButtons();

  }

//=============================================================================
  resestButtons()
  { // reset all buttons to be fully visible and disabled.
//=============================================================================

    this._upButton.visible = true;
    this._downButton.visible = true;
    this._leftButton.visible = true;
    this._rightButton.visible = true;
    this._upLeftButton.visible = true;
    this._upRightButton.visible = true;
    this._downLeftButton.visible = true;
    this._downRightButton.visible = true;

    this._upButton.disabled = true;
    this._downButton.disabled = true;
    this._leftButton.disabled = true;
    this._rightButton.disabled = true;
    this._upLeftButton.disabled = true;
    this._upRightButton.disabled = true;
    this._downLeftButton.disabled = true;
    this._downRightButton.disabled = true;

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
  refreshButtons()
  { // refresh all the buttons.
//=============================================================================

    const data = this._character._motionData
    const value = data ? data.dir8 : false;
    const isBool = typeof value == 'boolean';

    this._upButton.visible = !!isBool;
    this._downButton.visible = !!isBool;
    this._leftButton.visible = true;
    this._rightButton.visible = true;

    this._upLeftButton.visible = isBool ? value : false;
    this._upRightButton.visible = isBool ? value : false;
    this._downLeftButton.visible = isBool ? value : false;
    this._downRightButton.visible = isBool ? value : false;

    this._upButton.disabled = !this._upButton.visible
    this._downButton.disabled = !this._downButton.visible
    this._leftButton.disabled = !this._leftButton.visible
    this._rightButton.disabled = !this._rightButton.visible
    this._upLeftButton.disabled = !this._upLeftButton.visible
    this._upRightButton.disabled = !this._upRightButton.visible
    this._downLeftButton.disabled = !this._downLeftButton.visible
    this._downRightButton.disabled = !this._downRightButton.visible

  }

//
// //=============================================================================
//   createTopButtons()
//   { // create the top buttons.
// //=============================================================================
//
//     // this.createButton4Dir();
//     // this.createButton8Dir();
//     // this.createButtonPlatformer();
//
//   }
//
// //=============================================================================
//   createButton4Dir()
//   { // create the 4 directional button( 4 rows ).
// //=============================================================================
//
//     const width = ( ( this.width - 4 ) / 3 );
//     const height = 32;
//     const x = width * 0 + 3;
//     const y = 3;
//
//     this._button4Dir = new ButtonField( width, height, '4 Dir' );
//     this._button4Dir.position.set( x, y );
//
//     this.addChild( this._button4Dir );
//
//     this._button4Dir.setClickHandler( this.set4Dir.bind( this ) );
//
//   }
//
// //=============================================================================
//   set4Dir()
//   { // set the sprite to use 4 directions only.
// //=============================================================================
//
//     this._usedir8 = false;
//     this._upButton.visible = true;
//     this._downButton.visible = true;
//     this._upLeftButton.visible = false;
//     this._upRightButton.visible = false;
//     this._downLeftButton.visible = false;
//     this._downRightButton.visible = false;
//
//     this._button2Dir.backgroundColor = "#d97fc9";
//     this._button4Dir.backgroundColor = "#457fc9";
//     this._button8Dir.backgroundColor = "#d97fc9";
//     this._button2Dir.hoverColor = "#db8f99";
//     this._button4Dir.hoverColor = "#5287cc";
//     this._button8Dir.hoverColor = "#db8f99";
//
//     this.setDirection( 2 );
//
//   }
//
// //=============================================================================
//   createButton8Dir()
//   { // create button for 8 directional sprites( 8 rows ).
// //=============================================================================
//
//     const width = ( ( this.width - 4 ) / 3 );
//     const height = 32;
//     const x = ( this.width - 4 ) / 3 * 1 + 3;
//     const y = 3;
//
//     this._button8Dir = new ButtonField( width, height, '8 Dir' );
//     this._button8Dir.position.set( x, y );
//
//     this.addChild( this._button8Dir );
//
//     this._button8Dir.setClickHandler( this.set8Dir.bind( this ) );
//
//   }
//
// //=============================================================================
//   set8Dir()
//   { // set the sprite to use 4 directions only.
// //=============================================================================
//
//     this._usedir8 = true;
//     this._upButton.visible = true;
//     this._downButton.visible = true;
//     this._upLeftButton.visible = true;
//     this._upRightButton.visible = true;
//     this._downLeftButton.visible = true;
//     this._downRightButton.visible = true;
//
//     this._button2Dir.backgroundColor = "#d97fc9"
//     this._button4Dir.backgroundColor = "#d97fc9"
//     this._button8Dir.backgroundColor = "#457fc9"
//     this._button2Dir.hoverColor = "#db8f99";
//     this._button4Dir.hoverColor = "#db8f99";
//     this._button8Dir.hoverColor = "#5287cc";
//
//     this.setDirection( 2 );
//
//   }
//
// //=============================================================================
//   createButtonPlatformer()
//   { // create a button for platformer sprites( single row ).
// //=============================================================================
//
//     const width = ( ( this.width - 4 ) / 3 );
//     const height = 32;
//     const x = ( this.width - 4 ) / 3 * 2 + 3;
//     const y = 3;
//
//     this._button2Dir = new ButtonField( width, height, 'Platformer' );
//     this._button2Dir.position.set( x, y );
//
//     this.addChild( this._button2Dir );
//
//     this._button2Dir.setClickHandler( this.setPlatformer.bind( this ) );
//
//   }
//
// //=============================================================================
//   setPlatformer()
//   { // set the sprite to use 4 directions only.
// //=============================================================================
//
//     this._usedir8 = 'platformer';
//     this._upButton.visible = false;
//     this._downButton.visible = false;
//     this._upLeftButton.visible = false;
//     this._upRightButton.visible = false;
//     this._downLeftButton.visible = false;
//     this._downRightButton.visible = false;
//
//     this._button2Dir.backgroundColor = "#457fc9"
//     this._button4Dir.backgroundColor = "#d97fc9"
//     this._button8Dir.backgroundColor = "#d97fc9"
//     this._button2Dir.hoverColor = "#5287cc";
//     this._button4Dir.hoverColor = "#db8f99";
//     this._button8Dir.hoverColor = "#db8f99";
//
//     this.setDirection( 6 );
//
//   }

//=============================================================================
  createUpLeftButton()
  { // create a button that displays up left arrow.
//=============================================================================

    const p = 16;
    const x = 2 + p;
    const y = 2 + p;
    const width = Math.floor( this.width / 3 - 2 ) - p * 2;
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

    const p = 16;
    const x = Math.floor( 1 + this.width / 3 ) - p;
    const y = 2 + p;
    const width = Math.floor( this.width / 3 - 2 ) + p * 2;
    const height = Math.floor( this.width / 3 - 2 ) - p * 2;
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

    const p = 16;
    const x = Math.floor( 0 + this.width / 3 * 2 ) + p;
    const y = 2 + p;
    const width = Math.floor( this.width / 3 - 2 ) - p * 2;
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

    const p = 16;
    const x = 2 + p;
    const y = 1 + Math.floor( this.width / 3 ) - p;
    const width = Math.floor( this.width / 3 - 2 ) - p * 2;
    const height = width + p * 4;
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

  }

//=============================================================================
  createRightButton()
  { // create the right button.
//=============================================================================

    const p = 16;
    const x = Math.floor( 0 + this.width / 3 * 2 ) + p;
    const y = 1 + Math.floor( this.width / 3 ) - p;
    const width = Math.floor( this.width / 3 - 2 ) - p * 2;
    const height = width + p * 4;
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

    const p = 16;
    const x = 2 + p;
    const y = 0 + Math.floor( this.width / 3 ) * 2 + p;
    const width = Math.floor( this.width / 3 - 2 ) - p * 2;
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

    const p = 16;
    const x = Math.floor( 1 + this.width / 3 ) - p;
    const y = 0 + Math.floor( this.width / 3 ) * 2 + p;
    const width = Math.floor( this.width / 3 - 2 ) + p * 2;
    const height = width - p * 4;
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

    const p = 16;
    const x = Math.floor( 0 + this.width / 3 * 2 ) + p;
    const y = 0 + Math.floor( this.width / 3 ) * 2 + p;
    const width = Math.floor( this.width / 3 - 2 ) - p * 2;
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

//=============================================================================
  update()
  { // update the container.
//=============================================================================

    super.update();
    this._character.update();

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
    const motions = SceneManager._scene._motionData;
    this.createSaveModalWindow();
    this.createMotionDataField( motions );
    this.createMotionDataName();
    this.createMotionDataSpeed();
    this.createMotionDataType();
    this.createSaveButton();
    this.createExitButton();
    this._motionData = null;

  }

//=============================================================================
  createSaveModalWindow()
  { // create a modal window when the data is not saved properly.
//=============================================================================

    this._saveWarning = document.createElement( 'dialog' )
    SceneManager._scene._saveWarning = this._saveWarning;
    document.body.appendChild( this._saveWarning )
    const text = 'Data was not saved, what would you like to do?';
    var textElement = document.createTextNode( text );
    var div = document.createElement( 'div' );
    var saveBtn = document.createElement( 'button' );
    var cancelBtn = document.createElement( 'button' );
    var exitBtn = document.createElement( 'button' );

    saveBtn.innerText = 'Save and Exit';
    cancelBtn.innerText = 'Return to Editor';
    exitBtn.innerText = 'Discard & Exit';

    saveBtn.style.width = '120px';
    saveBtn.style.height = '32px';
    saveBtn.style.marginRight = '16px';
    saveBtn.style.marginTop = '16px';

    cancelBtn.style.width = '120px';
    cancelBtn.style.height = '32px';
    cancelBtn.style.marginRight = '16px';
    cancelBtn.style.marginTop = '16px';

    exitBtn.style.width = '120px';
    exitBtn.style.height = '32px';
    exitBtn.style.marginTop = '16px';

    this._saveWarning.appendChild( textElement );
    this._saveWarning.appendChild( div );
    this._saveWarning.appendChild( saveBtn );
    this._saveWarning.appendChild( cancelBtn );
    this._saveWarning.appendChild( exitBtn );

    saveBtn.addEventListener( 'click', this.onSaveAndExit.bind( this ) );
    cancelBtn.addEventListener( 'click', this.onReturnToEditor.bind( this ) );
    exitBtn.addEventListener( 'click', this.onDiscardAndExit.bind( this ) );

  }

//=============================================================================
  onSaveAndExit()
  { // save any changes then close the editor.
//=============================================================================

    this.onSaveData();
    this._saveWarning.close();
    SceneManager.pop();

  }

//=============================================================================
  onReturnToEditor()
  { // return to the editor.
//=============================================================================

    this._saveWarning.close();

  }

//=============================================================================
  onDiscardAndExit()
  { // on discard and exit.
//=============================================================================

    this._saveWarning.close();
    SceneManager.pop();

  }

//=============================================================================
  createMotionDataField( motions )
  { // create a field for motion data.
//=============================================================================

    // this._listField = new ExpandingListField( this.width, 10, motions );
    // this._listField.persistent = true;
    // this._listField.y = this.height - this._listField.height;
    // this.addElement( this._listField );

  }

//=============================================================================
  createMotionDataName()
  { // create a name for the motion data.
//=============================================================================

    const settings = {
      backgroundColor: '#4a505b',
      hoverColor: '#adafb3'
    };

    this._motionDataNameLabel = new LabelField( 'Data Name:' );
    this._motionDataNameLabel.y = 14;
    this._motionDataNameLabel.x = 10;

    // this._motionDataDeleteButton = new ButtonField( 32, 32, '\\I[10]', settings );
    // this._motionDataDeleteButton.y = 10;
    // this._motionDataDeleteButton.x = this.width - 36 - 10;
    // this._motionDataDeleteButton.disabled = true;

    const width = this.width - this._motionDataNameLabel.width - 20;

    this._motionDataNameField = new TextInputField( width );
    this._motionDataNameField.disabled = true;
    this._motionDataNameField.y = 10;
    this._motionDataNameField.x = 10 + this._motionDataNameLabel.width;

    this.addElement( this._motionDataNameLabel );
    this.addElement( this._motionDataNameField );
    // this.addElement( this._motionDataDeleteButton );

    this._motionDataNameField.setOkHandler( this.onNameChange.bind( this ) );
    // this._motionDataDeleteButton.setClickHandler( this.onDeleteData.bind( this ) );

  }

//=============================================================================
  onDeleteData()
  { // delete the currently selected data.
//=============================================================================

    this._listField.data.remove( this._listField.item() );
    this._listField.index--;
    this._listField.refresh();

    const item = this._listField.item();
    const tIndex = [true, false, 'platformer'].indexOf( item ? item.dir8 : false );

    this._motionDataNameField.text = item ? item.name : '';
    this._motionDataNameField.disabled = !item;
    this._motionDataTypeField.index = tIndex;
    this._motionDataTypeField.disabled = !item;
    this._motionDataSpeedField.value = 0;
    this._motionDataSpeedField.disabled = !item;
    this._motionDataDeleteButton.disabled = !item;

    if ( !item ) {
      const editor = SceneManager._scene._editorSprite;
      const frameContainer = SceneManager._scene._frameContainer;
      const animeContainer = SceneManager._scene._animationContainer;
      const character = SceneManager._scene._directionsContainer._character;

      SceneManager._scene._directionsContainer.resestButtons();
      editor.setFrameData( null );
      frameContainer.setAnimation( null );
      animeContainer.animation = null;
      animeContainer._animationDropDown.data = [];
      character.setMotionData( null );
      character._motion = 'idle';

    }

    // SceneManager._scene.onDataChange( this._listField.index );

  }

//=============================================================================
  onNameChange( text )
  { // Definition.
//=============================================================================

    const item = this._listField.item();
    item.name = text;
    this._listField.refresh();

  }

//=============================================================================
  createMotionDataType()
  { // create a name for the motion data.
//=============================================================================

    this._motionDataTypeLabel = new LabelField( 'Data Type:' );
    this._motionDataTypeLabel.y = 14 + 32 * 1.5 - 6;
    this._motionDataTypeLabel.x = 10;

    const width = this.width - this._motionDataNameLabel.width - 20;
    const data = [
      { name: '8 Direction', value: true },
      { name: '4 Direction', value: false },
      { name: 'Platformer', value: 'platformer' }
    ];

    const settings = {
      backgroundColor: '#4a505b',
      hoverColor: '#adafb3',
      clickColor: '#adafb3'
    };

    this._motionDataTypeField = new DropDownField( width, data, 3, settings );
    this._motionDataTypeField.y = 10 + 32 * 1.5 - 6;
    this._motionDataTypeField.x = 10 + this._motionDataNameLabel.width;
    this._motionDataTypeField.index = 1;
    this._motionDataTypeField.disabled = true;

    this.addElement( this._motionDataTypeLabel );
    this.addElement( this._motionDataTypeField );

    this._motionDataTypeField.setOkHandler( this.onTypeChange.bind( this ) );

  }

//=============================================================================
  onTypeChange( data )
  { // Definition.
//=============================================================================

    let value = data.value;
    const scene = SceneManager._scene;
    const item = scene.motionData();
    const container = scene._directionsContainer;
    const character = scene._directionsContainer._character;

    item.dir8 = value;
    container._usedir8 = value;
    container.setDirection( value == 'platformer' ? 6 : 2 );
    container.refreshButtons();
    character.refreshMotionData();

  }

//=============================================================================
  createMotionDataSpeed()
  { // create the speed variable for the data set.
//=============================================================================

    this._motionDataSpeedLabel = new LabelField( 'Speed Mod:' );
    this._motionDataSpeedLabel.y = 14 + 32 * 3 - 12;
    this._motionDataSpeedLabel.x = 10;

    const width = this.width - this._motionDataNameLabel.width - 20;
    this._motionDataSpeedField = new NumberInputField( width );
    this._motionDataSpeedField._decimals = 2;
    this._motionDataSpeedField.minValue = 0;
    this._motionDataSpeedField.maxValue = 4;
    this._motionDataSpeedField.value = 0;

    this._motionDataSpeedField.y = 10 + 32 * 3 - 12;
    this._motionDataSpeedField.x = 10 + this._motionDataNameLabel.width;
    this._motionDataSpeedField.disabled = true;

    this.addElement( this._motionDataSpeedField );
    this.addElement( this._motionDataSpeedLabel );

    this._motionDataSpeedField.setOkHandler( this.onSpeedModChange.bind( this ) );
  }

//=============================================================================
  onSpeedModChange( value )
  { // when the speed mod value is changed..
//=============================================================================

    const scene = SceneManager._scene;
    const item = scene.motionData();

    if ( item ) item.speedMod = Number( value );

  }

//=============================================================================
  createSaveButton()
  { // create a button to paste all boxes copied from current frame.
//=============================================================================

    const width = this.width - 8 * 2;
    const height = this._motionDataTypeField.height;
    const name = 'Save Changes';

    const x = 8;
    const y = this.height - height * 2 - 8 * 4;

    const settings = {
      backgroundColor: '#4a505b',
      hoverColor: '#adafb3'
    };

    this._saveButton = new ButtonField( width, height, name, settings );
    this._saveButton.position.set( x, y );
    this.addElement( this._saveButton );

    this._saveButton.setClickHandler( this.onSaveData.bind( this ) );

  }

//=============================================================================
  onSaveData()
  { // when saving data.
//=============================================================================

    const fs = require( 'fs' );
    const path = require( 'path' );
    const base = $gameTemp._project.directory;
    let folder = path.join( base, 'data', 'abs' )
    let directory = path.join( folder, $gameTemp._characterMode + '.json' );
    const data = ( $gameTemp._characterMode == 'Actors' ?
      $gameTemp._actors : $gameTemp._enemies ).map( n => n.extras );
    data.unshift( null );

    fs.writeFileSync( directory, JsonEx.stringify( data ) );

  }

//=============================================================================
  createExitButton()
  { // create the exit button.
//=============================================================================

    const width = this.width - 8 * 2;
    const height = this._motionDataTypeField.height;
    const name = 'Exit Mode';

    const x = 8;
    const y = this.height - height - 8 * 2;

    const settings = {
      backgroundColor: '#4a505b',
      hoverColor: '#adafb3'
    };

    this._exitButton = new ButtonField( width, height, name, settings );
    this._exitButton.position.set( x, y );
    this.addElement( this._exitButton );

    this._exitButton.setClickHandler( this.onExit.bind( this ) );

  }

//=============================================================================
  isDataSaved()
  { // return if the data has been saved properly.
//=============================================================================

    const fs = require( 'fs' );
    const path = require( 'path' );
    const base = $gameTemp._project.directory;
    let folder = path.join( base, 'data', 'abs' )
    let directory = path.join( folder, $gameTemp._characterMode + '.json' );


    const data = ( $gameTemp._characterMode == 'Actors' ?
      $gameTemp._actors : $gameTemp._enemies ).map( n => n.extras );
    data.unshift( null );
    const str1 = JsonEx.stringify( data );
    const str2 = fs.readFileSync( directory, { encoding: 'utf8' } )

    return str1 === str2;

  }

//=============================================================================
  onExit()
  { // when the player exits the current mode.
//=============================================================================

    const isSaved = this.isDataSaved();

    if ( !isSaved ) {
      return this._saveWarning.showModal();
    }

    SceneManager.pop();

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
  get animation()
  { // return the current animation.
//=============================================================================

    return this._animation;

  }

//=============================================================================
  set animation( anime )
  { // set the current animation.
//=============================================================================

    this._animation = anime;
    this.refreshDropDownField();
    this.refreshAddAnimationField();
    this.refreshRemoveAnimationField();
    this.refreshNameField();
    this.refreshSpeedModField();
    this.refreshFilenameField();
    this.refreshFramesField();
    this.refreshDurationField();
    this.refreshOffsetXField();
    this.refreshOffsetYField();
    this.refreshLoopField();
    this.refreshPreloadField();
    this.refreshVelocityField();
    this.refreshTractionField();
    this.refreshFrictionField();
    this.refreshAudioFields();

  }

//=============================================================================
  isBaseAnimation( name )
  { // return if the animation name provided is a base animation.
//=============================================================================

    return [
      'idle', 'walk', 'dash', 'climb', 'jump', 'chant',
      'attack', 'skill', 'item', 'hurt', 'dead'
    ].includes( name );

  }

//=============================================================================
  refreshDropDownField()
  { // refresh the name field.
//=============================================================================

    const anime = this._animation;
    const scene = SceneManager._scene;
    const name = anime ? anime.name : '';
    let oldName = this._nameField.text;

    this._animationDropDown.disabled = !anime;
    this._animationDropDown.refresh();

  }

//=============================================================================
  refreshAddAnimationField()
  { // refresh the name field.
//=============================================================================

    const anime = this._animation;
    const scene = SceneManager._scene;
    const name = anime ? anime.name : '';
    let oldName = this._nameField.text;

    this._animationAddField.disabled = !anime;
    this._animationAddField.refresh();

  }

//=============================================================================
  refreshRemoveAnimationField()
  { // refresh the name field.
//=============================================================================

    const anime = this._animation;
    const scene = SceneManager._scene;
    const name = anime ? anime.name : '';
    let oldName = this._nameField.text;

    this._animationRemoveField.disabled = !anime || this.isBaseAnimation( name );
    this._animationRemoveField.refresh();

  }

//=============================================================================
  refreshNameField()
  { // refresh the name field.
//=============================================================================

    const anime = this._animation;
    const scene = SceneManager._scene;
    const name = anime ? anime.name : '';
    let oldName = this._nameField.text;

    this._nameField.text = name;
    this._nameField.caretIndex = name.length;
    this._nameField.disabled = !anime || this.isBaseAnimation( name );
    this._animationDropDown.refresh();
    this._nameLabel.opacity = this._nameField.disabled ? 150 : 255;
  }

//=============================================================================
  refreshSpeedModField()
  { // refresg the speed mod.
//=============================================================================

    const anime = this._animation;
    const scene = SceneManager._scene;
    const name = anime ? anime.speedMod : 0;
    const container = scene._motionDataContainer;
    let speed = scene.motionData().speedMod;

    container._motionDataSpeedField.value = speed;
    container._motionDataSpeedField.disabled = false;
    container._motionDataSpeedLabel.opacity = 255;

  }

//=============================================================================
  refreshFilenameField()
  { // refresh the field for the filename.
//=============================================================================

    const anime = this._animation;
    const text = anime ? anime.filename : '';
    const target = this._filenameField.data.find( t => t && t.name == text );
    const index = this._filenameField.data.indexOf( target );

    this._filenameField._list.topIndex =  index < 0 ? 0 : index;
    this._filenameField.index =  index < 0 ? 0 : index;
    this._filenameField.disabled = !anime;
    this._filenameLabel.opacity = this._filenameField.disabled ? 150 : 255;

  }

//=============================================================================
  refreshFramesField()
  { // refresh the field for the frames.
//=============================================================================

    const anime = this._animation;
    const frames = anime ? anime.frames || 1 : 1;

    this._framesField.value = frames;
    this._framesField.disabled = !anime;
    this._framesField.caretIndex = this._framesField.text.length;
    this._framesLabel.opacity = this._framesField.disabled ? 150 : 255;
  }

//=============================================================================
  refreshDurationField()
  { // refresh the duration field.
//=============================================================================

    const anime = this._animation;
    const name = anime ? anime.name : '';
    const duration = anime ? anime.duration || 60 : 60;
    const isMove = ['walk','dash','climb','jump'].includes( name );

    this._durationField.value = duration;
    this._durationField.disabled = !anime || isMove;
    this._durationField.caretIndex = this._durationField.text.length;
    this._durationLabel.opacity = this._durationField.disabled ? 150 : 255;

  }

//=============================================================================
  refreshOffsetXField()
  { // refresh the offset x field.
//=============================================================================

    const anime = this._animation;
    const x = anime ? ( anime.offset.x || 0 ) : 0;

    this._offsetXField.value = x;
    this._offsetXField.disabled = !anime;
    this._offsetXField.caretIndex = this._offsetXField.text.length;
    this._offsetXLabel.opacity = this._offsetXField.disabled ? 150 : 255;

  }

//=============================================================================
  refreshOffsetYField()
  { // refresh the offset y field.
//=============================================================================

    const anime = this._animation;
    const y = anime ? ( anime.offset.y || 0 ) : 0;

    this._offsetYField.value = y;
    this._offsetYField.disabled = !anime;
    this._offsetYField.caretIndex = this._offsetYField.text.length;
    this._offsetYLabel.opacity = this._offsetYField.disabled ? 150 : 255;

  }

//=============================================================================
  refreshLoopField()
  { // refresh the loop field.
//=============================================================================

    const anime = this._animation;
    const scene = SceneManager._scene;
    const name = anime ? anime.name : '';
    const loop = anime ? anime.loop || false : false;

    this._loopField.value = loop || this.isBaseAnimation( name );
    this._loopField.disabled = !anime || this.isBaseAnimation( name );
    this._loopLabel.opacity = this._loopField.disabled ? 150 : 255;

  }

//=============================================================================
  refreshPreloadField()
  { // refresh the preload field.
//=============================================================================

    const anime = this._animation;
    const scene = SceneManager._scene;
    const name = anime ? anime.name : '';
    const preload = anime ? anime.preload || false : false;

    this._preloadField.value = preload || this.isBaseAnimation( name );
    this._preloadField.disabled = !anime || this.isBaseAnimation( name );
    this._preloadLabel.opacity = this._preloadField.disabled ? 150 : 255;

  }

//=============================================================================
  refreshVelocityField()
  { // refresh the velocity field.
//=============================================================================

    const anime = this._animation;
    const name = anime ? anime.name : '';
    const velocity = anime ? anime.velocity || 'none' : 'none';
    const target = this._velocityField.data.find( t => t && t.name == velocity );
    const index = this._velocityField.data.indexOf( target );

    this._velocityField.index = index;
    this._velocityField.disabled = !anime || !anime.velocity;
    this._velocityLabel.opacity = this._velocityField.disabled ? 150 : 255;

  }

//=============================================================================
  refreshTractionField()
  { // refresh the traction field.
//=============================================================================

    const anime = this._animation;
    const name = anime ? anime.name : '';
    const traction = anime ? anime.traction || 1 : 1;

    this._tractionField.value = traction;
    this._tractionField.caretIndex = this._tractionField.text.length;
    this._tractionField.disabled = anime ? ['idle', 'jump', 'dead'].includes( anime.name ) : true;
    this._tractionLabel.opacity = this._tractionField.disabled ? 150 : 255;

  }

//=============================================================================
  refreshFrictionField()
  { // refresh the friction field.
//=============================================================================

    const anime = this._animation;
    const name = anime ? anime.name : '';
    const friction = anime ? anime.friction || 1 : 1;

    this._frictionField.value = friction;
    this._frictionField.caretIndex = this._frictionField.text.length;
    this._frictionField.disabled = anime ? ['idle', 'jump', 'dead'].includes( anime.name ) : true;
    this._frictionLabel.opacity = this._frictionField.disabled ? 150 : 255;

  }

//=============================================================================
  refreshAudioFields()
  { // refresh all audio filed settings.
//=============================================================================

    this.refreshAudioNameField();
    this.refreshVolumeField();
    this.refreshPitchField();
    this.refreshDelayField();
    this.refreshNoiseField();

  }

//=============================================================================
  needsAudio( name )
  { // return if the animation needs audio settings.
//=============================================================================

    if ( this.isBaseAnimation( name ) ) {
      return !['jump', 'chant', 'attack', 'skill', 'item', 'hurt'].includes( name );
    }

    return true;

  }

//=============================================================================
  refreshAudioNameField()
  { // refresh the audio name field.
//=============================================================================

    const anime = this._animation;
    const name = anime ? anime.name : '';
    const text = anime && anime.audio ? anime.audio.name : '';
    const target = this._audioNameField.data.find( t => t && t.name == text );
    const index = this._audioNameField.data.indexOf( target );

    this._audioNameField._list.topIndex =  index < 0 ? 0 : index;
    this._audioNameField.index =  index < 0 ? 0 : index;
    this._audioNameField.disabled = !anime || this.needsAudio( name );
    this._audioNameLabel.opacity = this._audioNameField.disabled ? 150 : 255;

  }

//=============================================================================
  refreshVolumeField()
  { // refresh the volume field.
//=============================================================================

    const anime = this._animation;
    const name = anime ? anime.name : '';
    const volume = anime && anime.audio ? anime.audio.volume : 90;

    this._volumeField.value = volume;
    this._volumeField.caretIndex = this._volumeField.text.length;
    this._volumeField.disabled = !anime || this.needsAudio( name );
    this._volumeLabel.opacity = this._volumeField.disabled ? 150 : 255;

  }

//=============================================================================
  refreshPitchField()
  { // refresh the pitch field.
//=============================================================================

    const anime = this._animation;
    const name = anime ? anime.name : '';
    const pitch = anime && anime.audio ? anime.audio.pitch : 100;

    this._pitchField.value = pitch;
    this._pitchField.caretIndex = this._pitchField.text.length;
    this._pitchField.disabled = !anime || this.needsAudio( name );
    this._pitchLabel.opacity = this._pitchField.disabled ? 150 : 255;

  }

//=============================================================================
  refreshDelayField()
  { // refresh the delay field.
//=============================================================================

    const anime = this._animation;
    const name = anime ? anime.name : '';
    const delay = anime && anime.audio ? anime.audio.delay : 0;

    this._delayField.value = delay;
    this._delayField.caretIndex = this._delayField.text.length;
    this._delayField.disabled = !anime || this.needsAudio( name );
    this._delayLabel.opacity = this._delayField.disabled ? 150 : 255;

  }

//=============================================================================
  refreshNoiseField()
  { // refresh the delay field.
//=============================================================================

    const anime = this._animation;
    const name = anime ? anime.name : '';
    const noise = anime.noise || 0;

    this._noiseField.value = noise;
    this._noiseField.caretIndex = this._noiseField.text.length;
    this._noiseField.disabled = !anime;
    this._noiseLabel.opacity = this._noiseField.disabled ? 150 : 255;

  }

//=============================================================================
  createElements()
  { // create all elements of the container.
//=============================================================================

    this.createAnimationLabel();
    this.createAnimationSettings();
    this.createAnimationDropDown();
    this.createAnimationAddField();
    this.createAnimationRemoveField();

  }

//=============================================================================
  createAnimationLabel()
  { // create a label that says animation.
//=============================================================================

    this._animationLabel = new LabelField( 'Current Animation' );
    this._animationLabel.align = 'center';
    this._animationLabel.x = Math.round( this.width / 2 );
    this._animationLabel.y = 10;

    this.addElement( this._animationLabel );

  }

//=============================================================================
  createAnimationDropDown()
  { // create the drop down for selectng animations.
//=============================================================================

    const data = [];
    const width = this.width - 20 - 32 * 2 - 20;
    this._animationDropDown = new DropDownField( width, data );
    this._animationDropDown.x = 10;
    this._animationDropDown.y = 32 + 5;
    this._animationDropDown.disabled = true;
    this.addElement( this._animationDropDown );

    this._animationDropDown.setOkHandler( this.onAnimationOk.bind( this ) );

  }

//=============================================================================
  createAnimationAddField()
  { // create a button to add a new animation.
//=============================================================================

    const width = 32;
    const height = 32;
    const settings = {
      backgroundColor: '#4a505b',
      hoverColor: '#adafb3'
    };

    this._animationAddField = new ButtonField( width, height, '\\I[11]' );
    this._animationAddField.fontSize += 4;
    this._animationAddField.x = 10 + this._animationDropDown.width + 10;
    this._animationAddField.y = 32 + 5;
    this._animationAddField.disabled = true;
    this.addElement( this._animationAddField );

    this._animationAddField.setClickHandler( this.onAddAnimation.bind( this ) );

  }

//=============================================================================
  newAnimationData( index )
  { // create a new blank animation data.
//=============================================================================

    const data = this._animationDropDown.data;
    const base = 'Animation';
    let count = 0;
    let f = '';

    while( data.some( a => a.name == base + f ) ) {
      f = ' (' + ++count + ')';
    }

    return {
      name: base + f,
      filename: '',
      frames: 3,
      duration: 60,
      offset: {x: 0, y: 0 },
      hitboxes: { 1:[], 2:[], 3:[], 4:[], 6:[], 7:[], 8:[], 9:[] },
      hurtboxes: { 1:[], 2:[], 3:[], 4:[], 6:[], 7:[], 8:[], 9:[] },
      loop: false,
      preload: false,
      velocity: 'none',
      traction: 1,
      friction: 1,
      audio: { name: "", volume: 90, pitch: 100, pan: 0 }
    }

  }

//=============================================================================
  onAddAnimation()
  { // add a new animation to the motion data set.
//=============================================================================

    const animation = this.newAnimationData();
    const character = SceneManager._scene._directionsContainer._character;
    const data = this._animationDropDown.data;
    const topIndex = this._animationDropDown._list.topIndex;
    const bottomIndex = this._animationDropDown._list.bottomIndex;
    const index = data.length;
    character._motionData.motions[animation.name] = animation;
    data.push( animation );
    this.onAnimationOk();

    this._animationDropDown.index = index;
    this._animationDropDown._list.index = index;
    if ( index < topIndex ) this._animationDropDown._list.topIndex = index;
    if ( index > bottomIndex ) this._animationDropDown._list.bottomIndex = index;

  }

//=============================================================================
  createAnimationRemoveField()
  { // Definition.
//=============================================================================

    const width = 32;
    const height = 32;
    const settings = {
      backgroundColor: '#4a505b',
      hoverColor: '#adafb3'
    };

    this._animationRemoveField = new ButtonField( width, height, '\\I[10]', settings );
    this._animationRemoveField.fontSize += 4;
    this._animationRemoveField.x = 10 + this._animationDropDown.width + 20 + 32;
    this._animationRemoveField.y = 32 + 5;
    this._animationRemoveField.disabled = true;

    this.addElement( this._animationRemoveField );

    this._animationRemoveField.setClickHandler( this.onRemoveAnimation.bind( this ) );

    this.refreshDropDownField();
    this.refreshAddAnimationField();
    this.refreshRemoveAnimationField();

  }

//=============================================================================
  onRemoveAnimation()
  { // remove the current animation from the motion data set.
//=============================================================================

    const animation = this._animationDropDown.item();
    const character = SceneManager._scene._directionsContainer._character;
    const data = this._animationDropDown.data;
    const topIndex = this._animationDropDown._list.topIndex;
    const bottomIndex = this._animationDropDown._list.bottomIndex;
    const index = data.indexOf( animation );


    delete character._motionData.motions[animation.name];
    character._motion = data[index - 1].name;

    data.remove( animation );
    this.onAnimationOk();

    this._animationDropDown.index = index - 1;
    this._animationDropDown._list.index = index - 1;
    if ( index < topIndex ) this._animationDropDown._list.topIndex = index - 1;
    if ( index > bottomIndex ) this._animationDropDown._list.bottomIndex = index - 1;
    this._animation = this._animationDropDown.item();

    this.refreshDropDownField();
    this.refreshAddAnimationField();
    this.refreshRemoveAnimationField();

  }

//=============================================================================
  onAnimationOk()
  { // when choosing an animation from the list.
//=============================================================================

    const character = SceneManager._scene._directionsContainer._character;
    const { index, data } = this._animationDropDown;
    this.animation = data[index] ? data[index] : null;
    character._motion = ( data[index] ? data[index].name : 'idle' );

  }

//=============================================================================
  createAnimationSettings()
  { // create the settings for the animation.
//=============================================================================

    this.createSettingsLabel();
    this.createNameField();
    this.createFramesField();
    this.createDurationField();
    this.createLoopField();
    this.createOffsetX();
    this.createOffsetY();
    this.createPreloadField();
    this.createAudioFields();
    this.createTraction();
    this.createFriction();
    this.createVelocity();
    this.createFilenameField();

  }

//=============================================================================
  settingsWidth()
  { // return the width of the settings.
//=============================================================================

    return this.width / 1.5 - 20;

  }

//=============================================================================
  createNameField()
  { // create a field that allows setting the name of the animation.
//=============================================================================

    const width = this.settingsWidth();
    const text = this._animation ? this._animation.name : '';

    this._nameLabel = new LabelField( 'Name: ' );
    this._nameLabel.x = 10;
    this._nameLabel.y = Math.round( 32 * 4 + 5 + 4 );
    this._nameLabel.opacity = 150;
    this.addElement( this._nameLabel );

    this._nameField = new TextInputField( width );
    this._nameField.disabled = true;
    // this._nameField.fontSize /= 1.5;
    this._nameField.text = text;
    this._nameField.x = ( this.width - width ) - 10;
    this._nameField.y = Math.round( 32 * 4 + 5 );
    this._nameField.setOkHandler( this.onNameChange.bind( this ) );

    this.addElement( this._nameField );

  }

//=============================================================================
  onNameChange( text )
  { // set the new name.
//=============================================================================

    const old = this._animation.name;
    const scene = SceneManager._scene;
    const motionData = scene._motionDataContainer._listField.item()

    this._animation.name = text;

    if ( motionData && old != text  ) {

      const temp = motionData.motions[old];
      delete motionData.motions[old];
      motionData.motions[text] = temp;
      scene._directionsContainer._character._motion = text;
      scene._directionsContainer._characterSprite._motion = text;

    }


    this.refreshNameField();

  }

//=============================================================================
  createFilenameField()
  { // create a field which allows settign file name.
//=============================================================================

    const width = this.settingsWidth();
    const text = this._animation ? this._animation.filename : '';
    const height = 32;
    const path = require( 'path' );
    const base = $gameTemp._project.directory;
    const dir = path.join( base, 'img', 'characters' );
    const exts = ['.png'];
    let data = Chaucer.uiTools.readDirRecursive( dir, exts )

    for ( let i = 0, l = data.length; i < l; i++ ) {
      data[i] = { name: data[i].replace( dir + path.sep, '' ).replace( /\.png/, '' ) };
      data[i].name = data[i].name.replaceAll( path.sep, '/' );
    };
    data = [...new Set( data )];
    data.unshift( null );

    const settings = {
      backgroundColor: '#4a505b',
      hoverColor: '#adafb3',
      clickColor: '#adafb3'
    };

    this._filenameLabel = new LabelField( 'Filename: ' );
    this._filenameLabel.x = 10;
    this._filenameLabel.y = Math.round( 32 * 5.5 + 5 + 4 );
    this._filenameLabel.opacity = 150;
    this.addElement( this._filenameLabel );

    this._filenameField = new DropDownField( width, data, 10, settings )
    // this._filenameField.fontSize /= 1.5;
    this._filenameField.disabled = true;
    this._filenameField.debug = true;
    this._filenameField.x = Math.round( this.width - width ) - 10;
    this._filenameField.y = Math.round( 32 * 5.5 + 5 );
    this._filenameField.setOkHandler( this.onFilenameChange.bind( this ) );

    this.addElement( this._filenameField );

  }

//=============================================================================
  onFilenameChange( data )
  { // when the filename gets changed.
//=============================================================================

    this._filenameField.deactivate();

    this._animation.filename = data ? data.name : '';

    const scene = SceneManager._scene;
    scene._frameContainer.setAnimation( scene._frameContainer._animation );
    scene._editorSprite.setFrameData( scene._editorSprite._frameData );

    this.refreshFilenameField();

  }

//=============================================================================
  createFramesField()
  { // create field for changing the frame count of an animation.
//=============================================================================

    const width = this.settingsWidth();

    this._framesLabel = new LabelField( 'Frames: ' );
    this._framesLabel.x = 10;
    this._framesLabel.y = Math.round( 32 * 7 + 5 + 4 );
    this._framesLabel.opacity = 150;
    this.addElement( this._framesLabel );

    this._framesField = new NumberInputField( width );
    this._framesField.x = ( this.width - width ) - 10;
    this._framesField.disabled = true;
    this._framesField.y = Math.round( 32 * 7 + 5 );
    this._framesField.minValue = 1;
    this._framesField.value = 1;
    this.addElement( this._framesField );

    this._framesField.setOkHandler( this.onFramesChanged.bind( this ) );

  }

//=============================================================================
  onFramesChanged( value )
  { // when the amount of frames in the current animation is changed.
//=============================================================================

    if ( this._animation ) {

      this._animation.frames = Number( value );

    }

    const scene = SceneManager._scene;
    scene._frameContainer.setAnimation( scene._frameContainer._animation );
    scene._editorSprite.setFrameData( scene._editorSprite._frameData );

  }
//=============================================================================
  createSettingsLabel()
  { // create a label to indicate the animation settings.
//=============================================================================

    this._settingsLabel = new LabelField( 'Animation Settings' );
    this._settingsLabel.align = 'center';
    this._settingsLabel.x = Math.round( this.width / 2 );
    this._settingsLabel.y = 32 * 2.5 + 10;
    this.addElement( this._settingsLabel );

  }

//=============================================================================
  createDurationField()
  { // create the field for the duration option.
//=============================================================================

    const width = this.settingsWidth();

    this._durationLabel = new LabelField( 'Duration: ' );
    this._durationLabel.x = 10;
    this._durationLabel.y = Math.round( 32 * 8.5 + 5 + 4 );
    this._durationLabel.opacity = 150;
    this.addElement( this._durationLabel );

    this._durationField = new NumberInputField( width );
    this._durationField.x = ( this.width - width ) - 10;
    this._durationField.disabled = true;
    this._durationField.y = Math.round( 32 * 8.5 + 5 );
    this._durationField.minValue = 1;
    this._durationField.value = 1;
    this.addElement( this._durationField );

    this._durationField.setOkHandler( this.onDurationChanged.bind( this ) );

  }

//=============================================================================
  onDurationChanged( value )
  { // when the duration of the animation is changed.
//=============================================================================

    if ( this._animation ) this._animation.duration = Number( value );

  }

//=============================================================================
  createOffsetX()
  { // creat teh offset x value.
//=============================================================================

    const width = 48;

    this._offsetXLabel = new LabelField( 'Offset X:' );
    this._offsetXLabel.x = 10;
    this._offsetXLabel.y = Math.round( 32 * 10 + 5 + 4 );
    this._offsetXLabel.opacity = 150;
    this.addElement( this._offsetXLabel );

    this._offsetXField = new NumberInputField( width );
    this._offsetXField.x = ( this.width - this.settingsWidth() ) - 10;
    this._offsetXField.disabled = true;
    this._offsetXField.y = Math.round( 32 * 10 + 5 );
    this._offsetXField.minValue = -99;
    this._offsetXField.maxValue = 99;
    this.addElement( this._offsetXField );

    this._offsetXField.setOkHandler( this.onOffsetXChanged.bind( this ) );

  }

//=============================================================================
  onOffsetXChanged( value )
  { // change the offset x value.
//=============================================================================

    if ( this._animation ) this._animation.offset.x = Number( value );
    SceneManager._scene._editorSprite.refreshFrameSprite();

  }

//=============================================================================
  createOffsetY()
  { // create the offset y value.
//=============================================================================

    const width = 48;

    this._offsetYLabel = new LabelField( 'Offset Y:' );
    this._offsetYLabel.x = this.width / 2 + 10;
    this._offsetYLabel.y = Math.round( 32 * 10 + 5 + 4 );
    this._offsetYLabel.opacity = 150;
    this.addElement( this._offsetYLabel );

    this._offsetYField = new NumberInputField( width );
    this._offsetYField.x = this.width - this._offsetYField.width - 10;
    this._offsetYField.disabled = true;
    this._offsetYField.y = Math.round( 32 * 10 + 5 );
    this._offsetYField.minValue = -99;
    this._offsetYField.maxValue = 99;
    this.addElement( this._offsetYField );

    this._offsetYField.setOkHandler( this.onOffsetYChanged.bind( this ) );

  }

//=============================================================================
  onOffsetYChanged( value )
  { // when the pixel offset y is changed for the animation.
//=============================================================================

    if ( this._animation ) this._animation.offset.y = Number( value );
    SceneManager._scene._editorSprite.refreshFrameSprite();

  }

//=============================================================================
  createLoopField()
  { // create a field for enabling the animation to loop.
//=============================================================================

    const width = this.settingsWidth();

    this._loopLabel = new LabelField( 'Loop:' );
    this._loopLabel.x = 10;
    this._loopLabel.y = Math.round( 32 * 11.5 + 5 + 4 );
    this._loopLabel.opacity = 150;
    this.addElement( this._loopLabel );

    this._loopField = new CheckboxField( false );
    this._loopField.x = ( this.width - width ) - 10;
    this._loopField.disabled = true;
    this._loopField.y = Math.round( 32 * 11.5 + 5 );
    this._loopField.minValue = 1;
    this._loopField.value = 1;
    this.addElement( this._loopField );

    this._loopField.setOkHandler( this.onLoopChanged.bind( this ) );

  }

//=============================================================================
  onLoopChanged( value )
  { // when loop is changed in the current animation.
//=============================================================================

    if ( this._animation ) this._animation.loop = value;

  }

//=============================================================================
  createPreloadField()
  { // create a field for preloading animation.
//=============================================================================

    const width = this.settingsWidth();

    this._preloadLabel = new LabelField( 'Preload:' );
    this._preloadLabel.x = this.width / 2 + 10;
    this._preloadLabel.y = Math.round( 32 * 11.5 + 5 + 4 );
    this._preloadLabel.opacity = 150;
    this.addElement( this._preloadLabel );

    this._preloadField = new CheckboxField( false );
    this._preloadField.x = this.width - this._preloadField.width - 10;
    this._preloadField.disabled = true;
    this._preloadField.y = Math.round( 32 * 11.5 + 5 );
    this._preloadField.minValue = 1;
    this._preloadField.value = 1;
    this.addElement( this._preloadField );

    this._preloadField.setOkHandler( this.onPreloadChanged.bind( this ) );


  }

//=============================================================================
  onPreloadChanged( value )
  { // set the poreload flag for the animation.
//=============================================================================

    if ( this._animation ) this._animation.preload = value;

  }

//=============================================================================
  createVelocity()
  { // create a value for controlling velocity of the character.
//=============================================================================

    const width = this.settingsWidth();

    this._velocityLabel = new LabelField( 'Velocity:' );
    this._velocityLabel.x = 10;
    this._velocityLabel.y = Math.round( 32 * 13 + 5 + 4 );
    this._velocityLabel.opacity = 150;
    this.addElement( this._velocityLabel );
    const data = [
      { name: 'none' },
      { name: 'retain' },
      { name: 'forward' },
      { name: 'backward' },
      { name: 'left' },
      { name: 'right' }
    ];
    this._velocityField = new DropDownField( width, data, 4 );
    this._velocityField.x = this.width - this._velocityField.width - 10;
    this._velocityField.disabled = true;
    this._velocityField.index = 0;
    this._velocityField.y = Math.round( 32 * 13 + 5 );
    this.addElement( this._velocityField );

    this._velocityField.setOkHandler( this.onVelocityChanged.bind( this ) );

  }

//=============================================================================
  onVelocityChanged( data )
  { // when the velocity ischanged.
//=============================================================================

    if ( this._animation ) this._animation.velocity = data ? data.name : 'none';

  }

//=============================================================================
  createTraction()
  { // create a value for controlling velocity of the character.
//=============================================================================

    // const width = this.settingsWidth();
    const width = 48;
    const anime = this._animation;

    this._tractionLabel = new LabelField( 'Traction:' );
    this._tractionLabel.x = 10;
    this._tractionLabel.y = Math.round( 32 * 14.5 + 5 + 4 );
    this._tractionLabel.opacity = 150;
    this.addElement( this._tractionLabel );

    this._tractionField = new NumberInputField( width, 4 );
    this._tractionField.x = this.width - this.settingsWidth() - 10;
    this._tractionField.minValue = 0.0001;
    this._tractionField.maxValue = 1;
    this._tractionField.disabled = anime ? ['idle', 'jump', 'dead'].includes( anime.name ) : true;
    this._tractionField.value = 1;
    this._tractionField.y = Math.round( 32 * 14.5 + 5 );
    this.addElement( this._tractionField );

    this._tractionField.setOkHandler( this.onTractionChanged.bind( this ) );

  }

//=============================================================================
  onTractionChanged( value )
  { // when the traction ischanged.
//=============================================================================

    if ( this._animation ) this._animation.traction = Number( value );

  }

//=============================================================================
  createFriction( value )
  { // create the input field for friction.
//=============================================================================

    const width = 48;
    const anime = this._animation;

    this._frictionLabel = new LabelField( 'Friction:' );
    this._frictionLabel.x = this.width / 2 + 10;
    this._frictionLabel.y = Math.round( 32 * 14.5 + 5 + 4 );
    this._frictionLabel.opacity = 150;
    this.addElement( this._frictionLabel );

    this._frictionField = new NumberInputField( width, 4 );
    this._frictionField.x = this.width - width - 10;
    this._frictionField.minValue = 0.0001;
    this._frictionField.maxValue = 1;
    this._frictionField.disabled = anime ? ['idle', 'jump', 'dead'].includes( anime.name ) : true;
    this._frictionField.value = 1;
    this._frictionField.y = Math.round( 32 * 14.5 + 5 );
    this.addElement( this._frictionField );

    this._frictionField.setOkHandler( this.onFrictionChanged.bind( this ) );

  }

//=============================================================================
  onFrictionChanged( value )
  { // when the friction ischanged.
//=============================================================================

    if ( this._animation ) this._animation.friction = Number( value );

  }

//=============================================================================
  createAudioFields()
  { // create the audio input fields.
//=============================================================================

    this.createAudioSettingsLabel();
    this.createAudioVolumeField();
    this.createAudioPitchField();
    this.createAudioDelayField();
    this.createNoiseField();
    this.createAudioNameField();

  }

//=============================================================================
  createAudioSettingsLabel()
  { // create a label that displays audio settings.
//=============================================================================

    this._audioSettingsLabel = new LabelField( 'Audio Settings' );

    this._audioSettingsLabel.align = 'center';
    this._audioSettingsLabel.x = Math.round( this.width / 2 );
    this._audioSettingsLabel.y = Math.round( 32 * 16 + 5 + 4 );

    this.addElement( this._audioSettingsLabel );

  }

//=============================================================================
  createAudioNameField()
  { // create the field for the audio name.
//=============================================================================

    const width = this.settingsWidth();
    const text = this._animation ? this._animation.filename : '';
    const height = 32;

    const path = require( 'path' );
    const base = $gameTemp._project.directory;
    const dir = path.join( base, 'audio', 'se' );
    const exts = ['.m4a', '.ogg'];

    let data = Chaucer.uiTools.readDirRecursive( dir, exts )

    for ( let i = 0, l = data.length; i < l; i++ ) {
      data[i] = { name: data[i].replace( dir + path.sep, '' ).replace( /\.ogg|\.m4a/, '' ) };
      data[i].name = data[i].name.replaceAll( path.sep, '/' );
    };
    data = [...new Set( data )];
    data.unshift( null );

    const settings = {
      backgroundColor: '#4a505b',
      hoverColor: '#adafb3',
      clickColor: '#adafb3'
    };

    this._audioNameLabel = new LabelField( 'Audio: ' );
    this._audioNameLabel.x = 10;
    this._audioNameLabel.y = Math.round( 32 * 17.5 + 5 + 4 );
    this._audioNameLabel.opacity = 150;
    this.addElement( this._audioNameLabel );

    this._audioNameField = new DropDownField( width, data, 3, settings )
    this._audioNameField.disabled = true;
    this._audioNameField.x = Math.round( this.width - width ) - 10;
    this._audioNameField.y = Math.round( 32 * 17.5 + 5 );
    this._audioNameField.setOkHandler( this.onAudioNameChange.bind( this ) );

    this.addElement( this._audioNameField );

  }

//=============================================================================
  onAudioNameChange( data )
  { // when the audio name button is clicked.
//=============================================================================

    if ( this._animation ) {
      if ( !this._animation.audio ) {
        this._animation.audio = { name: "", volume: 90, pitch: 100, pan: 0 };
      }
      const name = data ? data.name : '';
      this._animation.audio.name = name;
    }

  }

//=============================================================================
  createAudioVolumeField()
  { // create the field for the volume level of the audio.
//=============================================================================

    const width = 48;


    this._volumeLabel = new LabelField( 'Volume:' );
    this._volumeLabel.x = 10;
    this._volumeLabel.y = Math.round( 32 * 19 + 5 + 4 );
    this._volumeLabel.opacity = 150;
    this.addElement( this._volumeLabel );

    this._volumeField = new NumberInputField( width );
    this._volumeField.x = ( this.width - this.settingsWidth() ) - 10;
    this._volumeField.disabled = true;
    this._volumeField.y = Math.round( 32 * 19 + 5 );
    this._volumeField.minValue = 1;
    this._volumeField.maxValue = 100;
    this.addElement( this._volumeField );

    this._volumeField.setOkHandler( this.onVolumeChanged.bind( this ) );

  }

//=============================================================================
  onVolumeChanged( value )
  { // when the volume level is changed...
//=============================================================================

    if ( this._animation && this._animation.audio ) this._animation.audio.volume = value;

  }

//=============================================================================
  createAudioPitchField()
  { // create field for the pitch of the audio.
//=============================================================================

    const width = 48;

    this._pitchLabel = new LabelField( 'Pitch:' );
    this._pitchLabel.x = this.width / 2 + 10;
    this._pitchLabel.y = Math.round( 32 * 19 + 5 + 4 );
    this._pitchLabel.opacity = 150;
    this.addElement( this._pitchLabel );

    this._pitchField = new NumberInputField( width );
    this._pitchField.x = this.width - this._pitchField.width - 10;
    this._pitchField.disabled = true;
    this._pitchField.y = Math.round( 32 * 19 + 5 );
    this._pitchField.minValue = 50;
    this._pitchField.maxValue = 150;
    this.addElement( this._pitchField );

    this._pitchField.setOkHandler( this.onPitchChanged.bind( this ) );

  }

//=============================================================================
  onPitchChanged( value )
  { // when the pick of the audio is changed.
//=============================================================================

    if ( this._animation && this._animation.audio ) this._animation.audio.pitch = value;

  }

//=============================================================================
  createAudioDelayField()
  { // create field for audio delay.
//=============================================================================

    const width = 48;

    this._delayLabel = new LabelField( 'Delay:' );
    this._delayLabel.x = this.width / 2 + 10;
    this._delayLabel.y = Math.round( 32 * 20.5 + 5 + 4 );
    this._delayLabel.opacity = 150;
    this.addElement( this._delayLabel );

    this._delayField = new NumberInputField( width );
    this._delayField.x = this.width - this._delayField.width - 10;
    this._delayField.disabled = true;
    this._delayField.y = Math.round( 32 * 20.5 + 5 );
    this._delayField.minValue = 0;
    this._delayField.maxValue = 999;
    this._delayField.value = 0;
    this.addElement( this._delayField );

    this._delayField.setOkHandler( this.onDelayChanged.bind( this ) );

  }

//=============================================================================
  onDelayChanged( value )
  { // when the delay value is changed.
//=============================================================================

    if ( this._animation && this._animation.audio ) this._animation.audio.delay = value;

  }

//=============================================================================
  createNoiseField()
  { // create field for audio delay.
//=============================================================================

    const width = 48;

    this._noiseLabel = new LabelField( 'Noise:' );
    this._noiseLabel.x = 10;
    this._noiseLabel.y = Math.round( 32 * 20.5 + 5 + 4 );
    this._noiseLabel.opacity = 150;
    this.addElement( this._noiseLabel );

    this._noiseField = new NumberInputField( width );
    this._noiseField.x = this.width - this.settingsWidth() - 10;
    this._noiseField.disabled = false;
    this._noiseField.y = Math.round( 32 * 20.5 + 5 );
    this._noiseField.minValue = 0;
    this._noiseField.maxValue = 100;
    this._noiseField.value = 0;
    this.addElement( this._noiseField );

    this._noiseField.setOkHandler( this.onNoiseChanged.bind( this ) );

  }

//=============================================================================
  onNoiseChanged( value )
  { // when the delay value is changed.
//=============================================================================

    if ( this._animation ) this._animation.noise = value;

  }

}

//=============================================================================
window.AnimationContainer = AnimationContainer;
//=============================================================================

//=============================================================================
// ActionsContainer :
//=============================================================================

//=============================================================================
class ActionsContainer extends ContainerField
{ // ActionsContainer

//=============================================================================
  constructor( rect )
  { // Called on object creation.
//=============================================================================

    super( rect );

  }

}

//=============================================================================
window.ActionsContainer = ActionsContainer;
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
  get index()
  { // return the current index for the animation.
//=============================================================================

    return this._index || 0;

  }

//=============================================================================
  set index( value )
  { // set the index of the current animation.
//=============================================================================

    if ( this._animation ) {
      this._index = ( value ).mod( this._animation.frames );

    } else {
      this._index = 0;
    }

    this.refreshPreviousFrame();
    this.refreshCurrentFrame();
    this.refreshNextFrame();

  }

//=============================================================================
  setDirection( direction )
  { // set the direction.
//=============================================================================

    this._direction = direction;
    this.refreshPreviousFrame();
    this.refreshCurrentFrame();
    this.refreshNextFrame();

  }

//=============================================================================
  setAnimation( animation )
  { // set the animation.
//=============================================================================

    this._animation = animation;
    this._index = 0;
    this.refreshLabel();
    this.refreshPreviousFrame();
    this.refreshCurrentFrame();
    this.refreshNextFrame();

  }

//=============================================================================
  refreshLabel()
  { // refresh the current label text.
//=============================================================================

    let text = 'Frames';

    if ( this._animation ) {
      text = `Frame: ${this.index + 1}/${this._animation.frames}`;
    }

    this._frameLabel.text = text;

  }

//=============================================================================
  getFrameFor( src, index )
  { // return the frame for the bitmap.
//=============================================================================

    if ( !this._animation ) return new Rectangle( 0, 0, 1, 1 );
    const is8dir = this._usedir8;
    const d = !is8dir ? ( this._direction - 2 ) / 2 :
      this._direction - ( ( this._direction || 0 ) >= 5 ? 2 : 1 );
    const w = src.width / this._animation.frames;
    const h = src.height / ( is8dir == 'platformer' ? 1 : is8dir ? 8 : 4 );
    const x = w * index;
    const y = h * ( is8dir == 'platformer' ? 0 : d );
    const rect = new Rectangle( x, y, w, h );
    rect.index = index + 1;

    return rect;

  }

//=============================================================================
  refreshPreviousFrame()
  { // refresh the previous frame.
//=============================================================================

    const n = this._animation ? this._animation.frames : 1;
    const index = ( this.index - 1 ).mod( n );
    const filename = this._animation ? this._animation.filename : '';
    const src = ImageManager.loadCharacter( filename );

    src.addLoadListener( function() {
      this._prevFrame._src = src;
      this._prevFrame._rect = this.getFrameFor( src, index );
      this._prevFrame.refresh();
    }.bind( this ) );

  }

//=============================================================================
  refreshCurrentFrame()
  { // refresh the current frame.
//=============================================================================

    const n = this._animation ? this._animation.frames : 1;
    const index = ( this.index ).mod( n );
    const filename = this._animation ? this._animation.filename : '';
    const src = ImageManager.loadCharacter( filename );

    src.addLoadListener( function() {
      this._currFrame._src = src;
      this._currFrame._rect = this.getFrameFor( src, index );
      this._currFrame.refresh();
    }.bind( this ) );

  }

//=============================================================================
  refreshNextFrame()
  { // refresh the next frame.
//=============================================================================

    const n = this._animation ? this._animation.frames : 1;
    const index = ( this.index + 1 ).mod( n );
    const filename = this._animation ? this._animation.filename : '';
    const src = ImageManager.loadCharacter( filename );

    src.addLoadListener( function() {
      this._nextFrame._src = src;
      this._nextFrame._rect = this.getFrameFor( src, index );
      this._nextFrame.refresh();
    }.bind( this ) );

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
    this._leftArrow.setClickHandler( this.decreaseIndex.bind( this ) );

  }

//=============================================================================
  decreaseIndex()
  { // decrease the index by 1.
//=============================================================================

    this.index--;

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

    this._rightArrow.setClickHandler( this.increaseIndex.bind( this ) );

  }

//=============================================================================
  increaseIndex()
  { // increase the index by 1.
//=============================================================================

    this.index++;

  }

//=============================================================================
  createCurrentFrame()
  { // create the current frame sprite window.
//=============================================================================

    const text = 'current';
    const height = this.height - 32 - 8;
    const width = height;
    const settings = {
      backgroundColor: '#4a505b',
      hoverColor: '#4a505b',
      clickColor: '#4a505b',
      outlineColor: '#1a1a1a',
      clickOutlineColor: '#1a1a1a'
    };
    this._currFrame = new ButtonField( width, height, text, settings );
    this._currFrame.position.set( Math.floor( ( this.width - width ) / 2 ), 32 + 4 );

    this._currFrame.refreshText = function() {
      let dx = 10;
      let dy = 10;
      let dw = this.width - 20;
      let dh = this.height - 20;
      const src = this._src;
      const rect = this._rect;
      if ( src && rect )  {
        const { x:sx, y:sy, width:sw, height:sh } = rect;
        this.bitmap.paintOpacity = 255;
        if ( sw > sh ) {
          let ndh = Math.round( dw * ( sh / sw ) );
          dy += Math.round( ( dh - ndh ) / 2 );
          dh = ndh;
        } else if ( sh > sw ) {
          let ndw = Math.round( dh * ( sw / sh ) );
          dx += Math.round( ( dw - ndw ) / 2 );
          dw = ndw;
        }

        this.bitmap.blt( src, sx, sy, sw, sh, dx, dy, dw, dh );

      }
      this.bitmap.paintOpacity = 255;
      this.bitmap.drawRoundedRect( 4, 4, 48, 24, 4, '#393f4a' );
      this.bitmap.drawRoundedRect( 5, 5, 46, 22, 4, '#20252b' );
      if ( rect ) {
        this.bitmap.drawText( rect.index || '', 5, 5, 46, 22, 'center' );
      }

    }

    this._currFrame.refresh();
    this.addElement( this._currFrame );


  }

//=============================================================================
  createPreviousFrame()
  { // create the previous frame sprite.
//=============================================================================

    const text = '';
    const height = this.height - 32 - 8;
    const width = height;
    const ox = this._leftArrow.x + this._leftArrow.width;
    const x = ( ox + ( this._currFrame.x - ( ox ) - width ) / 2 );
    const settings = {
      backgroundColor: '#4a505b',
      hoverColor: '#4a505b',
      clickColor: '#4a505b',
      outlineColor: '#1a1a1a',
      clickOutlineColor: '#1a1a1a'
    };
    this._prevFrame = new ButtonField( width, height, text, settings );
    this._prevFrame.position.set( Math.floor( x ), 32 + 4 );

    const _alias_refreshPrev_background = this._prevFrame.refreshBackground;
    this._prevFrame.refreshBackground = function() {
      this.bitmap.paintOpacity = 100;
      _alias_refreshPrev_background.call( this );
    }.bind( this._prevFrame );

    this._prevFrame.refreshText = function() {
      let dx = 10;
      let dy = 10;
      let dw = this.width - 20;
      let dh = this.height - 20;
      const src = this._src;
      const rect = this._rect;
      if ( src && rect )  {
        const { x:sx, y:sy, width:sw, height:sh } = rect;
        if ( sw > sh ) {
          let ndh = Math.round( dw * ( sh / sw ) );
          dy = ( dh - ndh ) / 2;
          dh = ndh;
        } else if ( sh > sw ) {
          let ndw = Math.round( dh * ( sw / sh ) );
          dx += ( dw - ndw ) / 2;
          dw = ndw;
        }
        this.bitmap.paintOpacity = 100;
        this.bitmap.blt( src, sx, sy, sw, sh, dx, dy, dw, dh );
      }
      this.bitmap.paintOpacity = 255;
      this.bitmap.drawRoundedRect( 4, 4, 48, 24, 4, '#393f4a' );
      this.bitmap.drawRoundedRect( 5, 5, 46, 22, 4, '#20252b' );
      if ( rect ) {
        this.bitmap.paintOpacity = 100;
        this.bitmap.drawText( rect.index || '', 5, 5, 46, 22, 'center' );
      }

    }

    this._prevFrame.refresh();
    this.addElement( this._prevFrame );

    this._prevFrame.setClickHandler( this.decreaseIndex.bind( this ) );

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
    const settings = {
      backgroundColor: '#4a505b',
      hoverColor: '#4a505b',
      clickColor: '#4a505b',
      outlineColor: '#1a1a1a',
      clickOutlineColor: '#1a1a1a'
    };
    this._nextFrame = new ButtonField( width, height, text, settings );
    this._nextFrame.position.set( Math.floor( x ), 32 + 4 );

    const _alias_refreshNext_background = this._nextFrame.refreshBackground;
    this._nextFrame.refreshBackground = function() {
      this.bitmap.paintOpacity = 100;
      _alias_refreshNext_background.call( this );
    }.bind( this._nextFrame );

    this._nextFrame.refreshText = function() {
      let dx = 10;
      let dy = 10;
      let dw = this.width - 20;
      let dh = this.height - 20;
      const src = this._src;
      const rect = this._rect;
      if ( src && rect )  {
        const { x:sx, y:sy, width:sw, height:sh } = rect;
        if ( sw > sh ) {
          let ndh = Math.round( dw * ( sh / sw ) );
          dy = ( dh - ndh ) / 2;
          dh = ndh;
        } else if ( sh > sw ) {
          let ndw = Math.round( dh * ( sw / sh ) );
          dx += ( dw - ndw ) / 2;
          dw = ndw;
        }
        this.bitmap.paintOpacity = 100;
        this.bitmap.blt( src, sx, sy, sw, sh, dx, dy, dw, dh );
      }
      this.bitmap.paintOpacity = 255;
      this.bitmap.drawRoundedRect( 4, 4, 48, 24, 4, '#393f4a' );
      this.bitmap.drawRoundedRect( 5, 5, 46, 22, 4, '#20252b' );
      if ( rect ) {
        this.bitmap.paintOpacity = 100;
        this.bitmap.drawText( rect.index || '', 5, 5, 46, 22, 'center' );
      }

    }

    this._nextFrame.refresh();
    this.addElement( this._nextFrame );

    this._nextFrame.setClickHandler( this.increaseIndex.bind( this ) );

  }

//=============================================================================
  update()
  { // update the contianer.
//=============================================================================

    super.update();
    this.update8dir();

  }

//=============================================================================
  update8dir()
  { // update whether this is 8 directional or not.
//=============================================================================

    const scene = SceneManager._scene;
    if ( this._usedir8 != scene._directionsContainer._usedir8 ) {
      this._usedir8 = scene._directionsContainer._usedir8

      this.refreshLabel();
      this.refreshPreviousFrame();
      this.refreshCurrentFrame();
      this.refreshNextFrame();

    }

  }

}

//=============================================================================
window.FrameContainer = FrameContainer;
//=============================================================================

//=============================================================================
class BoxContainer extends ContainerField
{ // BoxContainer

//=============================================================================
  constructor( rect )
  { // Called on object creation.
//=============================================================================

    super( rect );
    this._mode = '';
    this._index = -1
  }

//=============================================================================
  get index()
  { // return the index of the current selected tool.
//=============================================================================

    return this._index;

  }

//=============================================================================
  set index( value )
  { // set the index to the value specified.
//=============================================================================

    this._index = value;
    this._target = this._editorSprite._realRectangles[value] || null;

    if ( !!this._target ) {
      this.enableElements();
      this._xField.value = this._target.x;
      this._yField.value = this._target.y;
      this._widthField.value = this._target.width;
      this._heightField.value = this._target.height;
      this._priorityField.value = this._target.priority || 0;
      this._guardField.value = this._target.guard || false;
      this._criticalField.value = this._target.critical || false;
      this._dmgField.value = this._target.dmgMod || false;

    } else {
      this._xField.value = 0;
      this._yField.value = 0;
      this._widthField.value = 0;
      this._heightField.value = 0;
      this._priorityField.value = 0;
      this._guardField.value = false;
      this.disableElements();

    }

  }

//=============================================================================
  get mode()
  { // return the mode.
//=============================================================================

    return this._mode;

  }

//=============================================================================
  set mode( value )
  { // Definition.
//=============================================================================

    this._mode = value;
    this._xField.value = 0;
    this._yField.value = 0;
    this._widthField.value = 0;
    this._heightField.value = 0;
    this._priorityField.value = 0;
    this._guardField.value = false;
    this.disableElements();


  }

//=============================================================================
  update()
  { // update.
//=============================================================================

    super.update();
    this.updateType();
    this.updateIndex();
    this.updateDragValues();

  }

//=============================================================================
  updateType()
  { // update the type of .
//=============================================================================

    if ( this.mode != this._editorSprite._mode ) {
      this.mode = this._editorSprite._mode;
    }

  }

//=============================================================================
  updateIndex()
  { // update the index based on the editor.
//=============================================================================

    if ( this.index != this._editorSprite._selected ) {
      this.index = this._editorSprite._selected;
    }

  }

//=============================================================================
  setEditor( editorSprite )
  { // set the editor sprite.
//=============================================================================

    this._editorSprite = editorSprite;

  }

//=============================================================================
  disableElements()
  { // disable all elements in the container.
//=============================================================================

    this._elementContainer.children.forEach( e => {
      if ( e._isLabel ) {
        e.opacity = 150;
      } else {
        if ( e._active ) e.deactivate();
        e.disabled = true;

      }
    });

  }

//=============================================================================
  enableElements()
  { // enable all elements in the container.
//=============================================================================

    this._elementContainer.children.forEach( e => {
      if ( e._isLabel ) {
        const isGuard = e == this._guardLabel;
        e.opacity = isGuard && this.mode == 'hitboxes' ? 150 : 255;
      } else {
        const isGuard = e == this._guardField;
        e.disabled = isGuard && this.mode == 'hitboxes' ? true : false;

      }

    });

  }

//=============================================================================
  createElements()
  { // create all elements for the container.
//=============================================================================

    this.createPriorityField();
    this.createGuardField();
    this.createCriticalField();
    this.createXField();
    this.createYField();
    this.createDamageModField();
    this.createWidthField();
    this.createHeightField();

  }

//=============================================================================
  createPriorityField()
  { // create the priority input field.
//=============================================================================

    const padding = 12;
    const width = 48;

    this._priorityLabel = new LabelField( 'Priority:' );
    this._priorityLabel.position.set( padding, padding + 4 );
    this._priorityLabel.opacity = 150;

    this.addElement( this._priorityLabel );

    this._priorityField = new NumberInputField( width );
    this._priorityField.disabled = true;
    this._priorityField.x = this.width / 3 - 8 - width;
    this._priorityField.y = padding;
    this._priorityField.minValue = 0;
    this._priorityField.maxValue = 100;
    this._priorityField.value = 0;

    this.addElement( this._priorityField );

    this._priorityField.setOkHandler( this.onPriorityChange.bind( this ) );

  }

//=============================================================================
  onPriorityChange( value )
  { // when the priority gets changed.
//=============================================================================

    if ( this._target ) this._target.priority = Number( value );

  }

//=============================================================================
  createGuardField()
  { // create the guard input field.
//=============================================================================

    const padding = 12;
    const ox = this.width / 3;

    this._guardLabel = new LabelField( 'Guard:' );
    this._guardLabel.position.set( ox + padding, padding + 4 );
    this._guardLabel.opacity = 150;

    this.addElement( this._guardLabel );

    this._guardField = new CheckboxField( false );
    this._guardField.disabled = true;
    this._guardField.x = this.width - 16 - this._guardField.width - ox;
    this._guardField.y = padding;
    this._guardField.minValue = 0;
    this._guardField.maxValue = 100;
    this._guardField.value = 0;

    this.addElement( this._guardField );

    this._guardField.setOkHandler( this.onGuardChange.bind( this ) );

  }

//=============================================================================
  onGuardChange( value )
  { // when the guard value get's changed.
//=============================================================================

    if ( this._target ) {
      const index = SceneManager._scene._editorSprite._selected;
      const sprite = SceneManager._scene._editorSprite._rectSprites[index];
      this._target.guard = value;

      if ( sprite ) sprite.refresh();

    }

  }

//=============================================================================
  createCriticalField()
  { // create the critical hit input field.
//=============================================================================

    const padding = 12;
    const ox = this.width / 3;

    this._criticalLabel = new LabelField( 'Critical:' );
    this._criticalLabel.position.set( ox * 2 + padding, padding + 4 );
    this._criticalLabel.opacity = 150;

    this.addElement( this._criticalLabel );

    this._criticalField = new CheckboxField( false );
    this._criticalField.disabled = true;
    this._criticalField.x = this.width - 16 - this._criticalField.width;
    this._criticalField.y = padding;
    this._criticalField.minValue = 0;
    this._criticalField.maxValue = 100;
    this._criticalField.value = 0;

    this.addElement( this._criticalField );

    this._criticalField.setOkHandler( this.onCriticalChange.bind( this ) );

  }

//=============================================================================
  onCriticalChange( value )
  { // when the guard value get's changed.
//=============================================================================

    if ( this._target ) {

      const index = SceneManager._scene._editorSprite._selected;
      const sprite = SceneManager._scene._editorSprite._rectSprites[index];
      this._target.critical = value;

      if ( sprite ) sprite.refresh();

    }

  }

//=============================================================================
  createXField()
  { // create the x coordiante input field for the current box.
//=============================================================================

    const padding = 12;
    const width = 56;
    const ox = 0;
    const oy = Math.round( 32 * 1.5 )

    this._xLabel = new LabelField( 'x:' );
    this._xLabel.position.set( ox + padding, oy + padding + 4 );
    this._xLabel.opacity = 150;

    this.addElement( this._xLabel );

    this._xField = new NumberInputField( width );
    this._xField.disabled = true;
    this._xField.x = this.width / 3 - 8 - width;
    this._xField.y = oy + padding;
    this._xField.minValue = -999;
    this._xField.maxValue = 999;
    this._xField.value = 0.00;

    this.addElement( this._xField );

    this._xField.setOkHandler( this.onxChange.bind( this ) );

  }

//=============================================================================
  onxChange( value )
  { // when the x value is changed from number input field.
//=============================================================================

    const sprite = this.targetSprite();

    if ( this._target ) this._target.x = value;
    if ( sprite ) sprite.refresh();

  }

//=============================================================================
  createYField()
  { // create the y coordiante input field for the current box.
//=============================================================================

    const padding = 12;
    const width = 56;
    const ox = this.width / 3;
    const oy = Math.round( 32 * 1.5 )

    this._yLabel = new LabelField( 'y:' );
    this._yLabel.position.set( ox + padding, oy + padding + 4 );
    this._yLabel.opacity = 150;

    this.addElement( this._yLabel );

    this._yField = new NumberInputField( width );
    this._yField.disabled = true;
    this._yField.x = this.width - padding - width - ox;
    this._yField.y = oy + padding;
    this._yField.minValue = -999;
    this._yField.maxValue = 999;
    this._yField.value = 0.00;

    this.addElement( this._yField );

    this._yField.setOkHandler( this.onyChange.bind( this ) );

  }

//=============================================================================
  onyChange( value )
  { // when the y value is changed from number input field.
//=============================================================================

    const sprite = this.targetSprite();

    if ( this._target ) this._target.y = value;

    if ( sprite ) sprite.refresh();

  }

//=============================================================================
  createDamageModField()
  { // create the y coordiante input field for the current box.
//=============================================================================

    const padding = 12;
    const width = 48;
    const ox = this.width / 3;
    const oy = Math.round( 32 * 1.5 )

    this._dmgLabel = new LabelField( 'DMG %:' );
    this._dmgLabel.position.set( ox * 2 + padding, oy + padding + 4 );
    this._dmgLabel.opacity = 150;

    this.addElement( this._dmgLabel );

    this._dmgField = new NumberInputField( width );
    this._dmgField.disabled = true;
    this._dmgField.x = this.width - padding - width;
    this._dmgField.y = oy + padding;
    this._dmgField.minValue = 0.00;
    this._dmgField.maxValue = 9.99;
    this._dmgField.value = 1.00;
    this._dmgField._decimals = 2;


    this.addElement( this._dmgField );

    this._dmgField.setOkHandler( this.onDmgChange.bind( this ) );

  }

//=============================================================================
  onDmgChange( value )
  { // when the y value is changed from number input field.
//=============================================================================

    const sprite = this.targetSprite();

    if ( this._target ) this._target.dmgMod = value;

    if ( sprite ) sprite.refresh();

  }

//=============================================================================
  createWidthField()
  { // create the width coordiante input field for the current box.
//=============================================================================

    const padding = 12;
    const width = 56;
    const ox = 0;
    const oy = Math.round( 32 * 1.5 ) * 2

    this._widthLabel = new LabelField( 'width:' );
    this._widthLabel.position.set( ox + padding, oy + padding + 4 );
    this._widthLabel.opacity = 150;

    this.addElement( this._widthLabel );

    this._widthField = new NumberInputField( width );
    this._widthField.disabled = true;
    this._widthField.x = this.width / 3 - 8 - width;;
    this._widthField.y = oy + padding;
    this._widthField.minValue = 3;
    this._widthField.maxValue = 999;
    this._widthField.value = 0.00;

    this.addElement( this._widthField );

    this._widthField.setOkHandler( this.onWidthChange.bind( this ) );

  }

//=============================================================================
  onWidthChange( value )
  { // when the width value is changed from number input field.
//=============================================================================

    const sprite = this.targetSprite();

    if ( this._target ) this._target.width = value;

    if ( sprite ) sprite.refresh();

  }

//=============================================================================
  createHeightField()
  { // create the height coordiante input field for the current box.
//=============================================================================

    const padding = 12;
    const width = 56;
    const ox = this.width / 3;
    const oy = Math.round( 32 * 1.5 ) * 2;

    this._heightLabel = new LabelField( 'height:' );
    this._heightLabel.position.set( ox + padding, oy + padding + 4 );
    this._heightLabel.opacity = 150;

    this.addElement( this._heightLabel );

    this._heightField = new NumberInputField( width );
    this._heightField.disabled = true;
    this._heightField.x = this.width - padding - width - ox;
    this._heightField.y = oy + padding;
    this._heightField.minValue = 3;
    this._heightField.maxValue = 999;
    this._heightField.value = 0.00;

    this.addElement( this._heightField );

    this._heightField.setOkHandler( this.onHeightChange.bind( this ) );

  }

//=============================================================================
  onHeightChange( value )
  { // when the height value is changed from number input field.
//=============================================================================

    const sprite = this.targetSprite();

    if ( this._target ) this._target.height = value;

    if ( sprite ) sprite.refresh();

  }

//=============================================================================
  targetSprite()
  { // return the sprite for the current target.
//=============================================================================

    const index = SceneManager._scene._editorSprite._selected;
    const sprite = SceneManager._scene._editorSprite._rectSprites[index];

    return sprite;

  }

//=============================================================================
  updateDragValues()
  { // update the values of the rectangle when dragging.
//=============================================================================

    const sprite = this.targetSprite();
    const target = this._target;

    if ( target &&  sprite &&  sprite._dragging ) {
      this._xField.value = target.x;
      this._yField.value = target.y
      this._widthField.value = target.width
      this._heightField.value = target.height
    }

  }

}

//=============================================================================
window.BoxContainer = BoxContainer;
//=============================================================================

//=============================================================================
class ToolsContainer extends ContainerField
{ // ToolsContainer

//=============================================================================
  constructor( rect )
  { // Called on object creation.
//=============================================================================

    super( rect );

  }

//=============================================================================
  disableTools()
  { // disable all tools in the container.
//=============================================================================

    this._elementContainer.children.forEach( e => {
      if ( e._active ) e.deactivate();
      e.disabled = true;
    });

  }

//=============================================================================
  enableTools()
  { // enable all elements in the tool container.
//=============================================================================

    this._elementContainer.children.forEach( e => {
      e.disabled = false;
    });

  }

//=============================================================================
  setEditor( editorSprite )
  { // set the editor sprite.
//=============================================================================

    this._editorSprite = editorSprite;
    this.refreshMode();

  }

//=============================================================================
  createElements()
  { // create the elements for the window.
//=============================================================================

    this.createSaveModalWindow();
    this.createModeLabel();
    this.createModeButtons();
    this.createToolsLabel();
    this.createCopyFrameButton();
    this.createPasteFrameButton();
    this.createDeleteFrameButton();
    // this.createImportButton();
    // this.createSaveButton();
    // this.createExitButton();

  }

//=============================================================================
  createSaveModalWindow()
  { // create a modal window when the data is not saved properly.
//=============================================================================

    this._saveWarning = document.createElement( 'dialog' )
    document.body.appendChild( this._saveWarning )
    const text = 'Data was not saved, what would you like to do?';
    var textElement = document.createTextNode( text );
    var div = document.createElement( 'div' );
    var saveBtn = document.createElement( 'button' );
    var cancelBtn = document.createElement( 'button' );
    var exitBtn = document.createElement( 'button' );

    saveBtn.innerText = 'Save and Exit';
    cancelBtn.innerText = 'Return to Editor';
    exitBtn.innerText = 'Discard & Exit';

    saveBtn.style.width = '120px';
    saveBtn.style.height = '32px';
    saveBtn.style.marginRight = '16px';
    saveBtn.style.marginTop = '16px';

    cancelBtn.style.width = '120px';
    cancelBtn.style.height = '32px';
    cancelBtn.style.marginRight = '16px';
    cancelBtn.style.marginTop = '16px';

    exitBtn.style.width = '120px';
    exitBtn.style.height = '32px';
    exitBtn.style.marginTop = '16px';

    this._saveWarning.appendChild( textElement );
    this._saveWarning.appendChild( div );
    this._saveWarning.appendChild( saveBtn );
    this._saveWarning.appendChild( cancelBtn );
    this._saveWarning.appendChild( exitBtn );

    saveBtn.addEventListener( 'click', this.onSaveAndExit.bind( this ) );
    cancelBtn.addEventListener( 'click', this.onReturnToEditor.bind( this ) );
    exitBtn.addEventListener( 'click', this.onDiscardAndExit.bind( this ) );

  }

//=============================================================================
  onSaveAndExit()
  { // save any changes then close the editor.
//=============================================================================

    this.onSaveData();
    this._saveWarning.close();
    SceneManager.pop();

  }

//=============================================================================
  onReturnToEditor()
  { // return to the editor.
//=============================================================================

    this._saveWarning.close();

  }

//=============================================================================
  onDiscardAndExit()
  { // on discard and exit.
//=============================================================================

    this._saveWarning.close();
    SceneManager.pop();

  }

//=============================================================================
  createModeLabel()
  { // create label for mode switch section.
//=============================================================================

    const padding = 16;
    this._modeLabel = new LabelField( '' );
    this.addElement( this._modeLabel );
    this._modeLabel.position.set( padding, padding );

  }

//=============================================================================
  createModeButtons()
  { // create the buttosn for mode change.
//=============================================================================

    const label = this._modeLabel;
    const height0 = this._modeLabel.height + 4;
    const width0 = this.width - 16 * 2 - 16 - height0 + 8 - 16;

    const name0 = 'Hurtbox';
    const settings0 = {
      backgroundColor: '#4a505b',
      hoverColor: '#4a505b',
      clickColor: '#4a505b',
      outlineColor: '#1a1a1a',
      clickOutlineColor: '#1a1a1a'
    };

    this._modeButton = new ButtonField( width0, height0, name0, settings0 );
    this.addElement( this._modeButton );
    this._modeButton.position.set( label.x + label.width, label.y - 2 );

    const width1 = height0;
    const height1 = height0;
    const name1 = '↻'
    const btn = this._modeButton;
    const settings1 = {
      backgroundColor: '#4a505b',
      hoverColor: '#adafb3'
    };

    this._modeChangeButton = new ButtonField( width1, height1, name1, settings1 );
    this._modeChangeButton.fontSize += 2;
    this.addElement( this._modeChangeButton );
    this._modeChangeButton.position.set( btn.x + btn.width + 8, label.y - 2  );
    this._modeChangeButton.text = name1;
    this._modeChangeButton.setClickHandler( this.changeMode.bind( this ) );;

  }

//=============================================================================
  changeMode()
  { // change the mode fro hitbox -> hurtbox or hurtbox -> hitbox.
//=============================================================================

    const currentMode = this._editorSprite._mode;

    if ( currentMode === 'hitboxes' ) {
      this._editorSprite.setMode( 'hurtboxes' );

    } else {
      this._editorSprite.setMode( 'hitboxes' );

    }

    this.refreshMode();

  }

//=============================================================================
  refreshMode()
  { // refresh the text displayed for the mode.
//=============================================================================

    const currentMode = this._editorSprite._mode;
    const color = currentMode === 'hitboxes' ? '#ff0000' : '#00ff00';
    this._modeButton._outlineWidth = 1;
    this._modeButton.text = this._editorSprite._mode;
    this._modeButton.clickOutlineColor = color;
    this._modeButton.outlineColor = color;
    this._editorSprite._selected = -1;
    this._editorSprite.clearRectangles();


  }

//=============================================================================
  createToolsLabel()
  { // create a label that indicates where the tools will get drawn.
//=============================================================================

    const modeLabel = this._modeLabel
    const lh = modeLabel.height + 16;
    this._toolsLabel = new LabelField( '' );
    this.addElement( this._toolsLabel );
    this._toolsLabel.position.set( modeLabel.x, modeLabel.y + lh );

  }

//=============================================================================
  createCopyFrameButton()
  { // create a button to copy all boxes in the current frame.
//=============================================================================

    const label = this._modeLabel;
    const width = this.width - this._modeButton.x * 2;
    const height = this._modeLabel.height + 4;
    const name = 'Copy All';

    const x = this._modeButton.x;
    const y = this._toolsLabel.y -2;

    const settings = {
      backgroundColor: '#4a505b',
      hoverColor: '#adafb3'
    };

    this._copyFrameButton = new ButtonField( width, height, name, settings );
    this._copyFrameButton.position.set( x, y );
    this.addElement( this._copyFrameButton );

    this._copyFrameButton.setClickHandler( this.copyFrameBoxes.bind( this ) );

  }

//=============================================================================
  copyFrameBoxes()
  { // copy all the boxes in the current frame.
//=============================================================================

    const that = this._editorSprite;

    const scene = SceneManager._scene;

    const m = that._mode;
    const d = that._direction;
    const index = that._index;

    let target = scene._target;
    let motion = that._frameData || null;

    if ( motion ) {
      this._copied = JsonEx.parse( JsonEx.stringify( motion[m][d][index] ) );
    }

  }

//=============================================================================
  createPasteFrameButton()
  { // create a button to paste all boxes copied from current frame.
//=============================================================================

    const label = this._modeLabel;
    const width = this.width - this._modeButton.x * 2;
    const height = this._modeLabel.height + 4;
    const name = 'Paste All';

    const x = this._modeButton.x;
    const y = this._toolsLabel.y -2;
    const lh = label.height + 16;

    const settings = {
      backgroundColor: '#4a505b',
      hoverColor: '#adafb3'
    };

    this._pasteFrame = new ButtonField( width, height, name, settings );
    this._pasteFrame.position.set( x, y + lh );
    this.addElement( this._pasteFrame );

    this._pasteFrame.setClickHandler( this.pasteFrameBoxes.bind( this ) );

  }

//=============================================================================
  pasteFrameBoxes()
  { // paste the copied frame data.
//=============================================================================

    if ( this._copied ) {
      const that = this._editorSprite;

      const scene = SceneManager._scene;

      const m = that._mode;
      const d = that._direction;
      const index = that._index;

      let target = scene._target;
      let motion = that._frameData || null;

      motion[m][d][index] = JsonEx.parse( JsonEx.stringify( this._copied ) );

    }

  }

//=============================================================================
  createDeleteFrameButton()
  { // create a button to paste all boxes copied from current frame.
//=============================================================================

    const label = this._modeLabel;
    const width = this.width - this._modeButton.x * 2;
    const height = this._modeLabel.height + 4;
    const name = 'Delete All';

    const x = this._modeButton.x;
    const y = this._toolsLabel.y -2;
    const lh = label.height + 16;

    const settings = {
      backgroundColor: '#4a505b',
      hoverColor: '#adafb3'
    };

    this._deleteFrame = new ButtonField( width, height, name, settings );
    this._deleteFrame.position.set( x, y + lh * 2 );
    this.addElement( this._deleteFrame );

    this._deleteFrame.setClickHandler( this.deleteFrameBoxes.bind( this ) );

  }

//=============================================================================
  deleteFrameBoxes()
  { // delete all the boxes( for the current mode ), of the selected frame.
//=============================================================================

    const that = this._editorSprite;

    const scene = SceneManager._scene;

    const m = that._mode;
    const d = that._direction;
    const index = that._index;

    let target = scene._target;
    let motion = that._frameData || null;

    if ( motion ) motion[m][d][index] = [];

  }

//=============================================================================
  createImportButton()
  { // create the button for importing an animation data set from motion plugin.
//=============================================================================

    const label = this._modeLabel;
    const width = this.width / 2 - label.width - label.x;
    const height = this._modeLabel.height + 4;
    const name = 'Import Motions';

    const x = Math.round( this.width / 2 ) + 8;
    const y = this._toolsLabel.y -2;
    const lh = label.height + 16;

    const settings = {
      backgroundColor: '#4a505b',
      hoverColor: '#adafb3'
    };

    this._importButton = new ButtonField( width, height, name, settings );
    this._importButton.position.set( x, y );
    this.addElement( this._importButton );
    this._importButton.setClickHandler( this.onImportMotions.bind( this ) );

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

    const identifier =  /(Character Motions) : Version - (\d+.\d+.\d+)/;
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
        const speed = motions[i].speedMod;
        const name = motions[i].name;
        const dir8 = motions[i].dir8;

        delete motions[i].speedMod;
        delete motions[i].name;
        delete motions[i].dir8;
        delete motions[i].customAnimations;
        delete motions[i].conditionalMotionData;

        for ( let j = 0, l2 = customAnimations.length; j < l2; j++ ) {
          const name = customAnimations[j].name;
          motions[i][name] = customAnimations[j];
        };

        for ( const key in motions[i] ) {
          const len = motions[i][key].frames;
          motions[i][key] = motions[i][key] || { name: '', filename: '', frames: 0, duration: 60  };
          motions[i][key].hurtboxes = { 1:[], 2:[], 3:[], 4:[], 6:[], 7:[], 8:[], 9:[] };
          motions[i][key].hitboxes = { 1:[], 2:[], 3:[], 4:[], 6:[], 7:[], 8:[], 9:[] };

        }

        data.push( { name, speed, dir8, motions: motions[i] } );

      };

    }

    return data;

  }

//=============================================================================
  onImportMotions()
  { // when importing motions.
//=============================================================================

    const fs = require( 'fs' );
    const path = require( 'path' );
    const dir = $gameTemp._project.directory;
    const filename = 'plugins.js';
    const fileDir = path.join( dir, 'js', filename );
    SceneManager._scene._toolsContainer.disableTools();

    if ( fs.existsSync( fileDir ) ) {
      const motions = this.fetchProjectMotionData();
      this.openMotionDialog( motions );

    } else {
      console.warn( 'No plugin.js file found, is this a valid rpg maker project?' );

    }

  }

//=============================================================================
  openMotionDialog( motionData )
  { // extract motions from the plugin passed.
//=============================================================================

    if ( !motionData ) return console.warn( 'There was no motion data present!' );

    SceneManager._scene.openMotionDialog( motionData );

  }

}

//=============================================================================
window.ToolsContainer = ToolsContainer;
//=============================================================================

//=============================================================================
class MotionDialogContainer extends ContainerField
{ // MotionDialogContainer

//=============================================================================
  constructor( rect )
  { // Called on object creation.
//=============================================================================

    super( rect );

  }

//=============================================================================
  setData( data )
  { // set the data for this list.
//=============================================================================

    this._motionList.data = data;

  }

//=============================================================================
  getData()
  { // return the data currently used.
//=============================================================================

    return this._motionList.data;

  }

//=============================================================================
  createElements()
  { // create  the elements in the window.
//=============================================================================

    this.createMotionsLabel();
    this.createMotionsList();
    this.createCancelButton();
    this.createConfirmButton();
  }

//=============================================================================
  createMotionsLabel()
  { // create a label that statese "Motions".
//=============================================================================

    this._titleLabel = new LabelField( 'Import Motions' );
    this._titleLabel.x = ( this.width - this._titleLabel.width ) / 2 - 48;
    this._titleLabel.y = 10;

    this.addElement( this._titleLabel );

  }

//=============================================================================
  createMotionsList()
  { // create a list to display all imported motion data.
//=============================================================================

    // const width = this.width - 2;
    //
    // this._motionList = new CheckboxListField( width, 16, [] );
    // this._motionList.y = this._titleLabel.height + 16;
    // this._motionList.x = 1;
    //
    // this.addElement( this._motionList );

  }

//=============================================================================
  createCancelButton()
  { // create a button to cancel out of the motion dialog window.
//=============================================================================

    const p = 16;
    const width = 32;
    const height = 32;
    const x = this.width - 96;
    const y = 6;
    const text = '\u2715';
    const settings = {};

    this._cancelButton = new ButtonField( width, height, text, settings )
    this._cancelButton.position.set( x, y );
    this.addElement( this._cancelButton );

  }

//=============================================================================
  createConfirmButton()
  { // create the button used to confirm the selected files.
//=============================================================================

    const p = 16;
    const width = 32;
    const height = 32;
    const x = this.width - 48;
    const y = 6;
    const text = '\u2713';
    const settings = {};

    this._confirmButton = new ButtonField( width, height, text, settings )
    this._confirmButton.position.set( x, y );
    this.addElement( this._confirmButton );

  }

//=============================================================================
  setOkHandler( fn )
  { // set the okay handler.
//=============================================================================

    this._okHandler = fn;
    this._confirmButton.setClickHandler( this.onOkPressed.bind( this ) );

  }

//=============================================================================
  getSelectedMotions()
  { // return all the motions that are selected.
//=============================================================================

    if ( !this._motionList ) return [];

    const data = this._motionList.data;

    return this._motionList._checked.map( n => data[n] ).filter( n => !!n );

  }

//=============================================================================
  onOkPressed()
  { // when okay is pressed.
//=============================================================================

    this._okHandler( this.getSelectedMotions() );

  }

//=============================================================================
  setCancelHandler( fn )
  { // set what happens when cancel is clicked.
//=============================================================================

    this._cancelButton.setClickHandler( fn );

  }

}

//=============================================================================
window.MotionDialogContainer = MotionDialogContainer;
//=============================================================================

//=============================================================================
window.Scene_MotionEditor = Scene_MotionEditor;
//=============================================================================

//=============================================================================
// Sprite_Rectangle :
//=============================================================================

//=============================================================================
class Sprite_Rectangle extends Sprite
{ // Sprite_Rectangle

//=============================================================================
  constructor( rect, color, dragging )
  { // Called on object creation.
//=============================================================================

    super( new Bitmap( 1, 1 ) );
    this.isRect = true;
    this._rect = rect;
    this._color = color || "#00FF00";
    this._guardColor = "#9900DD";
    this._orgRect = new Rectangle( this.x, this.y, this.width, this.height );
    this._dragging = dragging;
    this._direction = 3;

    this.refresh();

  }

//=============================================================================
  refresh()
  { // refresh the sprite.
//=============================================================================

    let { x, y, width, height } = this._rect;
    const scale = this._boxScale
    x = Math.round( Math.round( x ) * scale );
    y = Math.round( Math.round( y ) * scale );
    width = Math.floor( width * scale );
    height = Math.floor( height * scale );
    this.bitmap.resize( width, height );
    this.position.set( x, y );
    this.height = height;
    this.width = width;

    this.bitmap.clear();

    this.drawCenter();
    this.drawTop();
    this.drawLeft();
    this.drawRight();
    this.drawBottom();
    this.drawIndex();

    const selected = this.parent ? this.parent._selected : -1
    this.setColorTone( selected == this._rect.index ? [ 100, 100, 100, 100] : [0, 0, 0, 0] );

  }

//=============================================================================
  drawCenter()
  { // draw the center of the rectangle.
//=============================================================================

    this.bitmap.paintOpacity = 50;
    const parent = this.parent;
    const selected = parent ? parent._selected : -1;

    const col = this._rect.guard ? this._guardColor : this._color;
    const c = selected == this._rect.index ? col : col;
    let color = [5].includes( this._direction ) ? '#FFFF00' : c;
    const { x, y, width, height } = this;
    this.bitmap.fillRect( 0, 0, width, height, color );
    this.bitmap.paintOpacity = 255;

  }

//=============================================================================
  drawTop()
  { // draw the top line.
//=============================================================================

    const x1 = 0;
    const y1 = 1;
    const x2 = this.width - 1;
    const y2 = 1;
    const parent = this.parent;
    const selected = parent ? parent._selected : -1;

    const col = this._rect.guard ? this._guardColor : this._color;
    const c = selected == this._rect.index ? col : col;
    const color = [7, 8, 9, 5].includes( this._direction ) ? '#FFFF00' : c;

    this.bitmap.paintOpacity = 255;
    this.bitmap.drawLine( x1, y1, x2, y2, color );

  }

//=============================================================================
  drawLeft()
  { // draw the left of the rectangle.
//=============================================================================

    const x1 = 1;
    const y1 = 0;
    const x2 = 1;
    const y2 = this.height - 1;
    const parent = this.parent;
    const selected = parent ? parent._selected : -1;

    const col = this._rect.guard ? this._guardColor : this._color;
    const c = selected == this._rect.index ? col : col;
    const color = [7, 4, 1, 5].includes( this._direction ) ? '#FFFF00' : c;

    this.bitmap.paintOpacity = 255;
    this.bitmap.drawLine( x1, y1, x2, y2, color );

  }

//=============================================================================
  drawRight()
  { // draw the right of the rectangle.
//=============================================================================

    const x1 = this.width - 1;
    const y1 = 0;
    const x2 = this.width - 1;
    const y2 = this.height;
    const parent = this.parent;
    const selected = parent ? parent._selected : -1;

    const col = this._rect.guard ? this._guardColor : this._color;
    const c = selected == this._rect.index ? col : col;
    const color = [9, 6, 3, 5].includes( this._direction ) ? '#FFFF00' : c;

    this.bitmap.paintOpacity = 255;
    this.bitmap.drawLine( x1, y1, x2, y2, color );

  }

//=============================================================================
  drawBottom()
  { // draw the bottom of the rectangle.
//=============================================================================

    const x1 = 0;
    const y1 = this.height - 1;
    const x2 = this.width;
    const y2 = this.height - 1;
    const parent = this.parent;
    const selected = parent ? parent._selected : -1;

    const col = this._rect.guard ? this._guardColor : this._color;
    const c = selected == this._rect.index ? col : col;
    const color = [1, 2, 3, 5].includes( this._direction ) ? '#FFFF00' : c;

    this.bitmap.paintOpacity = 255;
    this.bitmap.drawLine( x1, y1, x2, y2, color );

  }

//=============================================================================
  drawIndex()
  { // draw the index of the rectangle.
//=============================================================================

    const index = this._rect.index;
    this.bitmap.fontSize = 10;
    const parent = this.parent;
    const selected = parent ? parent._selected : -1;

    const col = this._rect.guard ? this._guardColor : this._color;
    const c = selected == this._rect.index ? col : col;
    const color = [1, 4, 7, 8, 9, 5].includes( this._direction ) ? '#FFFF00' : c;
    this.bitmap.fillRect( 1, 1, 13, 13, color );
    this.bitmap.drawText( index, 1, 2, 12, 10, 'center' );

  }


//=============================================================================
  update()
  { // update the rectangle.
//=============================================================================

    super.update();
    this.updateMouse();

  }

//=============================================================================
  getMouseCoord()
  { // return the moues coordinates scaled.
//=============================================================================

    const scale = this.parent.scale;
    const tx = Math.floor( ( TouchInput.x - this.parent.x ) / scale.x );
    const ty = Math.floor( ( TouchInput.y - this.parent.y ) / scale.y );
    const bScale = this._boxScale
    return new Point( Math.round( tx / bScale ), Math.round( ty / bScale ) );

  }

//=============================================================================
  getScaledRect()
  { // get the rectangle scaled.
//=============================================================================

    const scale = this.parent.scale;
    let { x, y, width, height } = this._rect;

    return new Rectangle( x, y, width, height );

  }

//=============================================================================
  mouseInBounds( ignoreOtherCheck )
  { // return if the mouse is in boiunds.
//=============================================================================

    const { x:tx, y:ty } = this.getMouseCoord();
    let { x, y, width, height } = this.getScaledRect();
    const p = 5 / this.parent.scale.x;
    x -= p;
    y -= p;
    width += p;
    height += p;


    if ( !ignoreOtherCheck ) {
      let others = this.parent.children.filter( spr => spr != this );
      let clicked = others.filter(  spr => spr.isRect && spr.mouseInBounds( true ) );
      let ids = clicked.map( r => r._rect.index ).sort( ( a, b ) => b - a );
      if ( ( ids[0] || 0 ) > this._rect.index ) return false;
    }

    return tx >= x && tx <= x + width && ty >= y && ty <= y + height;

  }

//=============================================================================
  updateMouse()
  { // update the mouse resizing the rectangle.
//=============================================================================

    if ( this.mouseInBounds() ) {
      this.updateHover();
    } else if ( this._direction ) {
      if ( !this._dragging ) {
        this._direction = 0;
        this.refresh();
      }
    }

    this.updateDrag();

  }

//=============================================================================
  getDirection( tx, ty )
  { // return the direction we can possibly scale the rect in.
//=============================================================================

    let { x, y, width, height } = this.getScaledRect();
    let centerX = tx - ( x + width / 2 );
    let centerY = ty - ( y + height / 2 );
    let distance = 2 / this._boxScale;
    let currentX = Infinity;
    let currentY = Infinity;
    let horz = 0;
    let vert = 0;
    if ( Input.isPressed( 'control' ) ) return 0;

    let top = Math.abs( ty - y );
    let left = Math.abs( tx - x );
    let right = Math.abs( tx - ( x + width ) );
    let bottom = Math.abs( ty - ( y + height ) );
    let center = Math.sqrt( centerX * centerX + centerY * centerY );

    if ( left <= distance && left < currentX ) {
      currentX = Math.abs( tx - x );
      horz = 4;
    }

    if ( right <= distance && right < currentX ) {
      currentX = Math.abs( tx - ( x + width ) );
      horz = 6;
    }

    if ( top <= distance && top < currentY ) {
      currentY = Math.abs( ty - y );
      vert = 8;
    }

    if ( bottom <= distance && bottom < currentY ) {
      currentY = Math.abs( ty - ( y + height ) );
      vert = 2;
    }

    if ( !horz && !vert && tx > x && tx < x + width && ty > y && ty < y + height ) {
      return 5;
    }

    if ( horz && vert ) {
      if ( horz == 4 && vert == 8 ) return 7;
      if ( horz == 4 && vert == 2 ) return 1;
      if ( horz == 6 && vert == 8 ) return 9;
      if ( horz == 6 && vert == 2 ) return 3;
    }

    return horz || vert || 0;

  }

//=============================================================================
  refreshRect( id )
  { // clear the last selected square.
//=============================================================================

    const rects = this.parent.children.filter( n => n.isRect && n._rect.index === id );
    const target = rects[0];

    if ( target ) target.refresh();

  }

//=============================================================================
  updateHover()
  { // update the edges of the hitbox.
//=============================================================================

    if ( !this._dragging ) {

      const { x:tx, y:ty } = this.getMouseCoord();
      const direction = this.getDirection( tx, ty );

      if ( this._direction != direction ) {
        this._direction = direction;
        this.refresh();
      }

      if ( this._direction && TouchInput.isTriggered() ) {
        const { x, y, width, height } = this._rect;
        this._orgRect = new Rectangle( x, y, width, height );
        this._orgPos = new Point( tx, ty );
        this._dragging = true;
        const old = this.parent.selected;
        this.parent.selected = this.index;
        this.refreshRect( old );
        this.refresh();
      }

    }

  }

//=============================================================================
  getScale()
  { // get the scale.
//=============================================================================

    const rect = this.getFrameFor( this._src, this._index );
    const scale = this._frameSprite.height / rect.height;

  }

//=============================================================================
  updateDrag()
  { // update hover over corners.
//=============================================================================

    if ( this._dragging ) {
      if ( !TouchInput.isPressed() ) {
        let limit = 3;
        if ( this._rect.width < limit ) this._rect.width = limit;
        if ( this._rect.height < limit ) this._rect.height = limit;
        return this._dragging = false;
      }

      if ( this._direction == 5 ) {
        this.dragCenter();

      } else if ( ( this._direction % 2 ) == 1 ) {
        this.dragEdges();

      } else {
        this.dragSides();
      }

      this.refresh();

    }

  }

//=============================================================================
  dragCenter()
  { // drag the sprite from the center.
//=============================================================================

    const { x:tx, y:ty } = this.getMouseCoord();
    const orgRect = this._orgRect;
    const orgPos = this._orgPos;
    const scale = this._boxScale;
    const rect = this._rect;

    let ox = orgPos.x - orgRect.x;
    let oy = orgPos.y - orgRect.y;

    let dx = ( tx - orgRect.x );
    let dy = ( ty - orgRect.y );

    rect.x = orgRect.x + dx - ox;
    rect.y = orgRect.y + dy - oy;

  }

//=============================================================================
  dragEdges()
  { // draw the edges of the rectangle..
//=============================================================================

    switch ( this._direction ) {
      case 1:
        this.dragBottomLeft();
        break;
      case 3:
        this.dragBottomRight();
        break;
      case 7:
        this.dragTopLeft();
        break;
      case 9:
        this.dragTopRight();
        break;
    }

  }

//=============================================================================
  dragBottomLeft()
  { // dragging the rectangle from the bottom left corner.
//=============================================================================

    const { x:tx, y:ty } = this.getMouseCoord();
    const org = this._orgRect;
    const rect = this._rect;
    let minH = org.height;
    let minW = org.width;

    let dx = tx - org.x;
    let dy = ty - org.y;

    rect.x = org.x + Math.ceil( Math.min( dx, minW ) );

    rect.width = minW + -Math.min( dx, minW );
    rect.height = Math.ceil( Math.max( dy, 1 ) );

    if ( dx >= minW - 1 && dy <= 0 ) {
      org.x = rect.x;
      org.y = rect.y;
      org.height = rect.height;
      org.width = rect.width;
      this._direction = 9;
    } else if ( dx >= minW - 1 ) {
      org.x = rect.x;
      org.y = rect.y;
      org.height = rect.height;
      org.width = rect.width;
      this._direction = 3;

    } else if ( dy <= 0 ) {
      org.x = rect.x;
      org.y = rect.y;
      org.height = rect.height;
      org.width = rect.width;
      this._direction = 7;
    }

  }

//=============================================================================
  dragBottomRight()
  { // drag the rectangle from the bottom right corner.
//=============================================================================

    const { x:tx, y:ty } = this.getMouseCoord();
    const org = this._orgRect;
    const rect = this._rect;

    let dx = tx - rect.x;
    let dy = ty - rect.y;

    rect.width = Math.ceil( Math.max( dx, 1 ) );
    rect.height = Math.ceil( Math.max( dy, 1 ) );

    if ( dx <= 0 && dy <= 0 ) {
      org.x = rect.x;
      org.y = rect.y;
      org.height = rect.height;
      org.width = rect.width;
      this._direction = 7;
    } else if ( dx <= 0 ) {
      org.x = rect.x;
      org.y = rect.y;
      org.height = rect.height;
      org.width = rect.width;
      this._direction = 1;
    } else if ( dy <= 0 ) {
      org.x = rect.x;
      org.y = rect.y;
      org.height = rect.height;
      org.width = rect.width;
      this._direction = 9;
    }

  }

//=============================================================================
  dragTopLeft()
  { // drag the rectangle from the top left corner.
//=============================================================================

    const { x:tx, y:ty } = this.getMouseCoord();
    const org = this._orgRect;
    const rect = this._rect;
    let minH = org.height;
    let minW = org.width;

    let dx = tx - org.x;
    let dy = ty - org.y;

    rect.x = org.x + Math.ceil( Math.min( dx, minW ) );
    rect.y = org.y + Math.ceil( Math.min( dy, minH ) );

    rect.width = minW + -Math.min( dx, minW );
    rect.height = minH + -Math.min( dy, minH );


    if ( dx >= minW - 1 && dy >= minH - 1 ) {
      org.x = rect.x;
      org.y = rect.y;
      org.height = rect.height;
      org.width = rect.width;
      this._direction = 3;

    } else if ( dx >= minW - 1 ) {
      org.x = rect.x;
      org.y = rect.y;
      org.height = rect.height;
      org.width = rect.width;
      this._direction = 9;
    } else if ( dy >= minH - 1 ) {
      org.x = rect.x;
      org.y = rect.y;
      org.height = rect.height;
      org.width = rect.width;
      this._direction = 1;
    }

  }

//=============================================================================
  dragTopRight()
  { // drag the rectangle from the top right corner.
//=============================================================================

    const { x:tx, y:ty } = this.getMouseCoord();
    const org = this._orgRect;
    const rect = this._rect;
    let minH = org.height;

    let dx = tx - org.x;
    let dy = ty - org.y;

    rect.y = org.y + Math.ceil( Math.min( dy, minH ) );

    rect.width = Math.ceil( Math.max( dx, 1 ) );
    rect.height = minH + -Math.min( dy, minH );


    if ( dx <= 0 && dy >= minH - 1 ) {
      org.x = rect.x;
      org.y = rect.y;
      org.height = rect.height;
      org.width = rect.width;
      this._direction = 1;
    } else if ( dx <= 0 ) {
      org.x = rect.x;
      org.y = rect.y;
      org.height = rect.height;
      org.width = rect.width;
      this._direction = 7;
    } else if ( dy >= minH - 1 ) {
      org.x = rect.x;
      org.y = rect.y;
      org.height = rect.height;
      org.width = rect.width;
      this._direction = 3;

    }

  }

//=============================================================================
  dragSides()
  { // drag the sides of the rectangle.
//=============================================================================

    switch ( this._direction ) {
      case 8:
        this.updateDragTop();
        break;
      case 6:
        this.updateDragRight();
        break;
      case 4:
        this.updateDragLeft();
        break;
      case 2:
        this.updateDragBottom();
        break;
    }

  }

//=============================================================================
  updateDragTop()
  { // update dragging the top of the rectangle.
//=============================================================================

    const { x:tx, y:ty } = this.getMouseCoord();
    const org = this._orgRect;
    const rect = this._rect;
    let minH = org.height;
    let dy = ty - org.y
    rect.y = org.y + Math.ceil( Math.min( dy, minH ) );
    rect.height = minH + -Math.min( dy, minH );

    if ( dy >= minH - 1 ) {
      org.y = rect.y;
      org.height = rect.height;
      this._direction = 2;
    }

  }

//=============================================================================
  updateDragRight()
  { // update dragging the right side of the rectangle.
//=============================================================================

    const { x:tx, y:ty } = this.getMouseCoord();
    const org = this._orgRect;
    const rect = this._rect;
    let dx = tx - org.x;

    rect.width = Math.ceil( Math.max( dx, 1 ) );

    if ( dx <= 0 ) {
      org.x = rect.x;
      org.width = rect.width;
      this._direction = 4;
    }

  }

//=============================================================================
  updateDragLeft()
  { // update dragging the left side of the rectangle.
//=============================================================================

    const { x:tx, y:ty } = this.getMouseCoord();
    const org = this._orgRect;
    const rect = this._rect;
    let minW = org.width;

    let dx = tx - org.x;

    rect.x = org.x + Math.ceil( Math.min( dx, minW ) );

    rect.width = minW + -Math.min( dx, minW );


    if ( dx >= minW - 1 ) {
      org.x = rect.x;
      org.width = rect.width;
      this._direction = 6;
    }

  }

//=============================================================================
  updateDragBottom()
  { // update dragging the bottom of the rectangle.
//=============================================================================

    const { x:tx, y:ty } = this.getMouseCoord();
    const org = this._orgRect;
    const rect = this._rect;
    let dy = ty - org.y;


    rect.height = Math.max( dy, 1 );

    if ( dy <= 0 ) {
      org.y = rect.y;
      org.height = rect.height;
      this._direction = 8;
    }

  }

}

//=============================================================================
window.Sprite_Rectangle = Sprite_Rectangle;
//=============================================================================

//=============================================================================
// Sprite_Editor :
//=============================================================================

//=============================================================================
class Sprite_Editor extends Sprite
{ // Sprite_Editor

//=============================================================================
  constructor()
  { // Called on object creation.
//=============================================================================

    const width = Graphics.width / 2;
    const height = Graphics.height / 2;

    super( new Bitmap( width, height ) );

    this.createGrid();
    this.createSprite();
    this.createRectContainer();

    this._rectSprites = [];
    this._mode = 'hitboxes';
    this._frameData = null;
    this._direction = 2;
    this._selected = -1;
    this._index = 0;
    this._boundFn = this.processKeyInput.bind( this );
    window.addEventListener('keydown', this._boundFn );
  }

//=============================================================================
  get selected()
  { // return the selected rectangle id.
//=============================================================================

    return this._selected;

  }

//=============================================================================
  set selected( index )
  { // set the selected rectangle index.
//=============================================================================

    const lastIndex = this._selected;
    this._selected = index;
    const spr0 = this._rectSprites[lastIndex];
    const spr1 = this._rectSprites[index];
    if ( spr0 && !spr0._destroyed ) spr0.refresh();
    if ( spr1 && !spr1._destroyed ) spr1.refresh();

  }

//=============================================================================
  processKeyInput( event )
  { // Definition.
//=============================================================================

    const { ctrlKey, shiftKey, key } = event;
    if ( !shiftKey && !ctrlKey && key == 'Delete' ) {
      this.deleteSelected();
    } else if ( ctrlKey && key == 'c' ) {
      this.copySelected();

    } else if ( ctrlKey && key == 'v' ) {
      this.pasteSelected();

    } else if ( ctrlKey && key == 'x' ) {
      this.cutSelected();

    }
  }

//=============================================================================
  copySelected()
  { // copy the selected rectangle.
//=============================================================================

    const rectIndex = this._selected;

    const scene = SceneManager._scene;

    const m = this._mode;
    const d = this._direction;
    const index = this._index;

    let target = scene._target;
    let motion = this._frameData || null;

    if ( motion && !motion[m][d][index] ) motion[m][d][index] = [];
    let array = motion ? motion[m][d][index] : [];

    const rect = array[rectIndex];

    if ( rect ) {
      const { x, y, width, height } = rect;
      this._copied = new Rectangle( x, y, width, height );
      this._copied._dragging = true;
      this._copied._priority = rect._priority;
      this._copied.shield = rect.shield;

    }
  }

//=============================================================================
  pasteSelected()
  { // paste the selected data.
//=============================================================================

    if ( this._copied ) {
      const { x, y, width, height } = this._copied;
      const rect = new Rectangle( x, y, width, height );
      rect._dragging = true;
      rect._priority = this._copied._priority;
      rect.shield = this._copied.shield;

      const scene = SceneManager._scene;

      const m = this._mode;
      const d = this._direction;
      const index = this._index;

      let target = scene._target;
      let motion = this._frameData || null;

      if ( motion && !motion[m][d][index] ) motion[m][d][index] = [];
      let array = motion ? motion[m][d][index] : [];

      array.push( rect );
    }

  }

//=============================================================================
  cutSelected()
  { // cut the selected rect.
//=============================================================================

    this.copySelected();
    this.deleteSelected();

  }

//=============================================================================
  deleteSelected()
  { // delete the selected square.
//=============================================================================

    const rectIndex = this._selected;


    const scene = SceneManager._scene;

    const m = this._mode;
    const d = this._direction;
    const index = this._index;

    let target = scene._target;
    let motion = this._frameData || null;

    if ( motion && !motion[m][d][index] ) motion[m][d][index] = [];
    let array = motion ? motion[m][d][index] : [];


    const rect = array[rectIndex];
    array.remove( rect );

    this.selected = -1;

    this.clearRectangles();
    this.updateRectangles();

  }

//=============================================================================
  topLeft()
  { // return the top left position of this sprite.
//=============================================================================

    const x = this.x - this.width * this.scale.x * 0.5;
    const y = this.y - this.height * this.scale.y * 1.0;

    return new Point( x, y );

  }

//=============================================================================
  setTopLeft( x, y )
  { // set the position of the top left corner.
//=============================================================================

    x = Math.round( x + this.width * this.scale.x * 0.5 );
    y = Math.round( y + this.height * this.scale.y * 1.0 );

    this.x = x;
    this.y = y;

  }

//=============================================================================
  center()
  { // return the center of this sprite.
//=============================================================================

    const x = this.x;
    const y = this.y - this.height * this.scale.y * 0.5;

    return new Point( x, y );

  }

//=============================================================================
  centerAnchor()
  { // return the center anchor point.
//=============================================================================

    const origin = this.topLeft();
    const center = new Point( Graphics.width / 2, Graphics.height / 2 )
    const width = this.width * this.scale.x;
    const height = this.height * this.scale.y;
    const x = ( ( center.x - origin.x ) / width ).clamp( 0, 1 );
    const y = ( ( center.y - origin.y ) / height ).clamp( 0, 1 );

    return new Point( x, y );

  }

//=============================================================================
  zoomIn()
  { // zoom in the screen.
//=============================================================================

    const anchor = this.centerAnchor();
    const tl = this.topLeft();

    const w0 = this.width * anchor.x * this.scale.x;
    const h0 = this.height * anchor.y * this.scale.y;

    const px = tl.x + w0;
    const py = tl.y + h0;

    const scaleX = ( this.scale.x + 0.1 ).clamp( 0.5, 2 );
    const scaleY = ( this.scale.y + 0.1 ).clamp( 0.5, 2 );

    const w1 = this.width * anchor.x * scaleX;
    const h1 = this.height * anchor.y * scaleY;

    this.scale.x = scaleX;
    this.scale.y = scaleY;
    this.setTopLeft( px - w1, py - h1, anchor );

  }

//=============================================================================
  zoomOut()
  { // zoom in the screen.
//=============================================================================

    const anchor = this.centerAnchor();
    const tl = this.topLeft();

    const w0 = this.width * anchor.x * this.scale.x;
    const h0 = this.height * anchor.y * this.scale.y;

    const px = tl.x + w0;
    const py = tl.y + h0;

    const scaleX = ( this.scale.x - 0.1 ).clamp( 0.5, 2 );
    const scaleY = ( this.scale.y - 0.1 ).clamp( 0.5, 2 );

    const w1 = this.width * anchor.x * scaleX;
    const h1 = this.height * anchor.y * scaleY;

    this.scale.x = scaleX;
    this.scale.y = scaleY;

    this.setTopLeft( px - w1, py - h1, anchor );

  }

//=============================================================================
  createGrid()
  { // create a new grid.
//=============================================================================

    const width = Graphics.width / 2;
    const height = Graphics.height / 2;

    this._grid = new Sprite( new Bitmap( width, height ) );
    this._grid.anchor.set( 0.5, 1 );
    this.addChild( this._grid );
    this.refreshGrid();

  }

//=============================================================================
  refreshGrid()
  { // refresh the grid.
//=============================================================================

    const { width, height } = this._grid;

    this._grid.bitmap.drawLine( width / 2, 1, width / 2, height, 'white' );
    this._grid.bitmap.drawLine( 1, height / 2, width, height / 2, 'white' );
    this._grid.bitmap.drawLine( 1, 1, width, 1, 'white' );
    this._grid.bitmap.drawLine( 1, 1, 1, height, 'white' );
    this._grid.bitmap.drawLine( width - 1, 0, width - 1, height, 'white' );
    this._grid.bitmap.drawLine( 1, height -1, width, height -1, 'white' );

    if ( this._frameData ) {
      this._grid.bitmap.drawLine( 1, height -1, width, height -1, 'red' );

    }


  }

//=============================================================================
  createSprite()
  { // create the sprite for the characters frame.
//=============================================================================

    const width = Graphics.width / 2 - 4;
    const height = Graphics.height / 2 - 4;

    this._frameSprite = new Sprite( new Bitmap( width, height ) );
    this._frameSprite.position.set( -2, -2 );
    this._frameSprite.anchor.set( 0.5, 1 );
    this.addChild( this._frameSprite );

  }

//=============================================================================
  setFrameData( data )
  { // set the frame data.
//=============================================================================

    this._selected = -1;
    this._frameData = data;
    this._src = ImageManager.loadCharacter( data ? data.filename : '' );

    this.clearRectangles();
    this.refreshFrameSprite();

  }

//=============================================================================
  setMode( mode )
  { // set the mode.
//=============================================================================

    this._mode = mode;
    this._selected = -1;
    this.clearRectangles();
    this.refreshFrameSprite();

  }

//=============================================================================
  setDirection( d )
  { // set the direction.
//=============================================================================

    this._selected = -1;
    this._direction = d;
    this.clearRectangles();
    this.refreshFrameSprite();

  }

//=============================================================================
  setIndex( i )
  { // set the index to the value speicified.
//=============================================================================

    this._index = i;
    this._selected = -1;
    this.clearRectangles();
    this.refreshFrameSprite();

  }

//=============================================================================
  clearRectangles()
  { // clear the rectangles.
//=============================================================================

    const scene = SceneManager._scene;
    let target = scene._target;
    const m = this._mode;
    const d = this._direction;
    const index = this._index;

    let motion = this._frameData || null;
    if ( motion && !motion[m][d][index] ) motion[m][d][index] = [];
    let array = this._rectSprites;
    this._realRectangles = motion ? motion[m][d][index] : [];

    while ( array.length ) {
      const spr = array.pop();
      this.removeChild( spr );
    }

  }

//=============================================================================
  getFrameFor( src, index )
  { // return the frame for the bitmap.
//=============================================================================

    if ( !this._frameData ) return new Rectangle( 0, 0, 1, 1 );

    const is8dir = this._usedir8;
    const d = !is8dir ? ( this._direction - 2 ) / 2 :
      this._direction - ( ( this._direction || 0 ) >= 5 ? 2 : 1 );
    const w = src.width / this._frameData.frames;
    const h = src.height / ( is8dir == 'platformer' ? 1 : is8dir ? 8 : 4 );
    const x = w * index;
    const y = h * ( is8dir == 'platformer' ? 0 : d );

    const rect = new Rectangle( x, y, w, h );
    rect.index = index + 1;

    return rect;

  }

//=============================================================================
  setFrameScale()
  { // set the scale for the current frame.
//=============================================================================

    const src = this._src;
    const sprite = this._frameSprite;

    this._frameScale = -1;

    if ( src ) {
      src.addLoadListener( function() {
        let size = this._usedir8 == 'platformer' ? 2 : this._usedir8 ? 8 : 4;
        this._frameScale = sprite.height / ( src.height / size );
      }.bind( this ) );
    }

  }

//=============================================================================
  refreshFrameSprite()
  { // refresh the frame sprite.
//=============================================================================

    const bitmap = this._frameSprite.bitmap;

    bitmap.clear();
    this.refreshGrid();
    this.setFrameScale();

    if ( this._src ) {
      this._src.addLoadListener( function() {
        const src = this._src;
        const rect = this.getFrameFor( this._src, this._index );
        const { x:sx, y:sy, width:sw, height:sh } = rect;
        const ratio = sw / sh;
        const scale = this._frameScale;
        const frameData = this._frameData || {};
        let offset = new Point( -( frameData.offset.x || 0 ) * scale, -( frameData.offset.y || 0 ) * scale );
        let dh = this._frameSprite.height;
        let dw = dh * ratio;
        let dx = ( this._frameSprite.width - dw ) / 2;
        let dy = 0;

        this._frameSprite.position.copy( offset );

        if ( dw > sw && dh > sh ) {
          bitmap.bltCrisp( src, sx, sy,sw, sh, dx, dy, dw, dh );

        } else {
          bitmap.blt( src, sx, sy,sw, sh, dx, dy, dw, dh );

        }

      }.bind( this ) );
    }

  }

//=============================================================================
  createRectContainer()
  { // create a new container for rectangle colliders.
//=============================================================================

    const width = Graphics.width / 2 - 4;
    const height = Graphics.height / 2 - 4;

    this._rectSprite = new Sprite( new Bitmap( width, height ) );
    this._rectSprite.position.set( -2, -2 );
    this._rectSprite.anchor.set( 0.5, 1 );
    this.addChild( this._rectSprite );
  }

//=============================================================================
  update()
  { // update the sprite.
//=============================================================================

    const warning = SceneManager._scene._motionDataContainer._saveWarning;
    super.update();
    this.update8dir();

    if (  warning && warning.open ) return;
    this.updateZoom();
    this.updateScroll();
    this.updateMouse();
    this.updateRectangles();

  }

//=============================================================================
  update8dir()
  { // update whether this is 8 directional or not.
//=============================================================================

    const scene = SceneManager._scene;
    if ( this._usedir8 != scene._directionsContainer._usedir8 ) {
      this._usedir8 = scene._directionsContainer._usedir8
      this.refreshFrameSprite();

    }

  }

//=============================================================================
  updateZoom()
  { // update the zoom of the editor.
//=============================================================================

    const { x:tx, y:ty } = TouchInput;
    const scroll = TouchInput.wheelY;

    const x = Graphics.width / 4;
    const y = Graphics.height / 4;
    const width = Graphics.width / 2;
    const height = Graphics.height / 2;

    if ( tx > x && ty > y && tx < x + width && ty < y + height ) {
      if ( scroll < 0 ) {
        this.zoomIn();

      } else if ( scroll > 0 ) {
        this.zoomOut();

      }
    }

  }

//=============================================================================
  updateScroll()
  { // update the scroll of the editor.
//=============================================================================

    const x = Graphics.width / 4;
    const y = Graphics.height / 4;
    const width = Graphics.width / 2;
    const height = Graphics.height / 2;
    const { x:tx, y:ty } = TouchInput;

    if ( tx > x && ty > y && tx < x + width && ty < y + height ) {

      if ( TouchInput.isMiddleTriggered() ) {
        this._midPos = new Point( TouchInput._middleX, TouchInput._middleY );
      }
      if ( TouchInput.isMiddlePressed() && this._midPos ) {
        const scrollX = this._midPos.x - TouchInput.x;
        const scrollY = this._midPos.y - TouchInput.y;

        if ( scrollY < 0 ) {
          this.scrollUp( Math.abs( scrollY ) );
          this._midPos.y = TouchInput.y;

        } else if ( scrollY > 0 ) {
          this.scrollDown( Math.abs( scrollY ) );
          this._midPos.y = TouchInput.y;

        }

        if ( scrollX < 0 ) {
          this.scrollLeft( Math.abs( scrollX ) );
          this._midPos.x = TouchInput.x;

        } else if ( scrollX > 0 ) {
          this.scrollRight( Math.abs( scrollX ) );
          this._midPos.x = TouchInput.x;

        }

      } else if ( this._midPos ) {
        this._midPos = undefined;
      }

    }
  }

//=============================================================================
  scrollUp( value )
  { // scroll up.
//=============================================================================

    const center = Graphics.height / 2;
    const min = center + 0;
    const max = center + this.height * this.scale.y;
    this.y = ( this.y + value ).clamp( min, max );

  }

//=============================================================================
  scrollDown( value )
  { // scroll down.
//=============================================================================

    const center = Graphics.height / 2;
    const min = center + 0;
    const max = center + this.height * this.scale.y;
    this.y = ( this.y - value ).clamp( min, max );

  }

//=============================================================================
  scrollLeft( value )
  { // scroll the editor to the left.
//=============================================================================

    const center = Graphics.width / 2;
    const min = center - this.width * this.scale.x * 0.5;
    const max = center + this.width * this.scale.x * 0.5;

    this.x = ( this.x + value ).clamp( min, max );

  }

//=============================================================================
  scrollRight( value )
  { // scroll the editor to the left.
//=============================================================================

    const center = Graphics.width / 2;
    const min = center - this.width * this.scale.x * 0.5;
    const max = center + this.width * this.scale.x * 0.5;

    this.x = ( this.x - value ).clamp( min, max );

  }

//=============================================================================
  mouseInBounds()
  { // return if the mouse is in boiunds of the editor area.
//=============================================================================

    const { x:tx, y:ty } = TouchInput;
    const x = Graphics.width / 4;
    const w = Graphics.width - x;
    const y = Graphics.height / 4;
    const h = Graphics.height - y;


    return tx > x && tx < w && ty > y && ty < h;

  }

//=============================================================================
  createRect()
  { // create a rectangle at the mouses position.
//=============================================================================

    if ( !this._frameData || this._frameScale <= 0 ) return;
    if ( !this._frameData.filename ) return;

    const scale = this._frameScale;
    const x = Math.floor( ( TouchInput.x - this.x ) / scale / this.scale.x );
    const y = Math.floor( ( TouchInput.y - this.y ) / scale / this.scale.y );
    const width = 1;
    const height = 1;
    const rect = new Rect( x, y, width, height );
    rect.guard = false;
    rect.critical = false;
    rect.dmgMod = 1;
    const scene = SceneManager._scene;
    let target = scene._target;

    const boxes = this.getBoxesForCurrentFrame();

    rect._dragging = true;
    rect.index = boxes.length;

    if ( boxes ) boxes.push( rect );

  }

//=============================================================================
  isRectangleClicked()
  { // return if any rectangles are clicked.
//=============================================================================

    return this.children.some( sprite => sprite._dragging );

  }

//=============================================================================
  updateMouse()
  { // update the mouse clicking on the screen.
//=============================================================================

    if ( this.mouseInBounds() && TouchInput.isPressed() ) {

      if ( TouchInput.isTriggered() ) {
        if ( !this.isRectangleClicked() ) {
          this.createRect();
        }
      }

    }

  }

//=============================================================================
  getBoxesForFrame( index, direction, mode )
  { // return the boxes for the frame specified.
//=============================================================================

    let data = this._frameData || null;

    if ( !data ) return [];

    if ( !data[mode][direction][index] ) {
      data[mode][direction][index] = [];
    }

    return data[mode][direction][index];

  }

//=============================================================================
  getBoxesForCurrentFrame()
  { // return all hit/hurtboxes for the current frame.
//=============================================================================

    return this.getBoxesForFrame( this._index, this._direction, this._mode );

  }

//=============================================================================
  updateRectangles()
  { // update the rectangles.
//=============================================================================

    if ( this._frameScale <= 0 ) return;

    const scene = SceneManager._scene;

    const m = this._mode;
    const d = this._direction;
    const index = this._index;
    let target = scene._target;

    let color = this._mode === 'hitboxes' ? '#FF0000' : '#00FF00';

    const boxes = this.getBoxesForCurrentFrame();
    let changed = boxes.length != this.children.length;
    boxes.forEach( ( rect, i ) => { rect.index = i; } );

    this._realRectangles = boxes;

    while ( boxes.length < this._rectSprites.length ) {
      let rect = this._rectSprites.pop();
      this.removeChild( rect );
    }

    while ( boxes.length > this._rectSprites.length ) {
      const rect = boxes[this._rectSprites.length];
      const dragging = this.mouseInBounds();
      let spr = new Sprite_Rectangle( rect, color, dragging );
      spr._boxScale = this._frameScale;
      this._rectSprites.push( spr );
      if ( spr._dragging ) this.selected = rect.index;
      this.addChild( spr );
    }


    if ( changed ) {
      for ( let i = 0, l = boxes.length; i < l; i++ ) {
        this._rectSprites[i]._rect = boxes[i];
        this._rectSprites[i].index = i;
      };
    }

    const draggedSprite = this._rectSprites[this.selected];

    // if ( !!draggedSprite && this._frameScale > 0 ) {
    //   if ( draggedSprite._boxScale != this._frameScale ) {
    //     draggedSprite._boxScale = this._frameScale;
    //     draggedSprite.refresh();
    //   }
    // }

  }

}

//=============================================================================
window.Sprite_Editor = Sprite_Editor;
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

    const char = this._character;
    const data = char._motionData;
    return data ? data.dir8 === 'platformer' : false;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'is8DirSprite', function()
  { // return if the character is using 8 dir or not.
//-----------------------------------------------------------------------------

    if ( Imported['COLLISION ALTERING PLUGIN'] ) {
      if ( this._8dirSprite ) return this._8dirSprite;
    }

    const char = this._character;
    const data = char._motionData;

    return data ? data.dir8 === true : false;

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
