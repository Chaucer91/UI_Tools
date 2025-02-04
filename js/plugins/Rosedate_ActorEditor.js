/*:============================================================================
*
* @target MZ
*
* @author Chaucer
*
* @plugindesc | Actor Editor : Version - 1.0.0 | Actor editor scene.
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
*  ● Date : 07/10/2024
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
  Imported['Actor Editor'.toUpperCase()] = true;
//=============================================================================
  var Chaucer = Chaucer || {};
  Chaucer.actorEditor = {};
//=============================================================================

//=============================================================================
// ActorsContainer :
//=============================================================================

//=============================================================================
class ActorsContainer extends ContainerField
{ // ActorsContainer

//=============================================================================
  constructor( rect )
  { // Called on object creation.
//=============================================================================

    super( rect );
    this.create();

  }

//=============================================================================
  create()
  { // create all elements of the container.
//=============================================================================

    this.createActorLabel();
    this.createActorList();

  }

//=============================================================================
  createActorLabel()
  { // create a label with the actor text.
//=============================================================================

    this._label = new LabelField( $gameTemp._characterMode );
    const width = this._label.width;
    const height = this._label.height;
    const x = Math.floor( ( this.width - width ) / 2 );
    const y = 1;
    this.addElement( this._label );

    this._label.position.set( x, y );

  }

//=============================================================================
  getProjectActors()
  { // return all actors in the current project.
//=============================================================================

    const fs = require( 'fs' );
    const path = require( 'path' );
    const base = $gameTemp._project.directory;
    const dir = path.join( base, 'data', 'Actors.json' )
    // let oldPlugins = $plugins;
    let string = fs.readFileSync( dir, { encoding:'utf8', flag:'r' } );
    const data = JsonEx.parse( string );

    data.shift();

    const extras = this.getActorExtras();

    for ( let i = 0, l = data.length; i < l; i++ ) {
      const actor = data[i];
      actor.extras  = extras[i] || {
        alliance: 'Actor',
        motionData: null,
        iframes: 24,
        flinchEnabled: true,
        flinchTolerance: 0,
        knockbackEnabled: true,
        knockbackTolerance: 0,
        aiMode: 0,
        sight: { fov: 90, distance: 6 },
        hearing: 4.5
      };
    };

    $gameTemp._actors = data;
    return data;

  }

//=============================================================================
  getActorExtras()
  { // get extras from the actors from the abs tool.
//=============================================================================

    const fs = require( 'fs' );
    const path = require( 'path' );
    const base = $gameTemp._project.directory;
    const dir = path.join( base, 'data', 'abs' )
    const fileDir = path.join( base, 'data', 'abs', 'Actors.json' )

    if ( !fs.existsSync( dir ) ) fs.mkdirSync( dir );
    if ( !fs.existsSync( fileDir ) ) {
      fs.writeFileSync( fileDir, JsonEx.stringify( [null] ) );
    }

    let string = fs.readFileSync( fileDir, { encoding:'utf8', flag:'r' } );
    const data = JsonEx.parse( string );
    data.shift();

    return data;

  }

//=============================================================================
  getProjectEnemies()
  { // return all actors in the current project.
//=============================================================================

    const fs = require( 'fs' );
    const path = require( 'path' );
    const base = $gameTemp._project.directory;
    const dir = path.join( base, 'data', 'Enemies.json' )
    // let oldPlugins = $plugins;
    let string = fs.readFileSync( dir, { encoding:'utf8', flag:'r' } );
    const data = JsonEx.parse( string );

    data.shift();

    const extras = this.getEnemyExtras();

    for ( let i = 0, l = data.length; i < l; i++ ) {
      const actor = data[i];
      actor.extras  = extras[i] || {
        alliance: 'Enemy',
        motionData: null,
        iframes: 24,
        flinchEnabled: true,
        flinchTolerance: 0,
        knockbackEnabled: true,
        knockbackTolerance: 0,
        aiMode: 0,
        sight: { fov: 90, distance: 6 },
        hearing: 4.5
      };
    };


    $gameTemp._enemies = data;
    return data;

  }

//=============================================================================
  getEnemyExtras()
  { // get extras from the actors from the abs tool.
//=============================================================================

    const fs = require( 'fs' );
    const path = require( 'path' );
    const base = $gameTemp._project.directory;
    const dir = path.join( base, 'data', 'abs' )
    const fileDir = path.join( base, 'data', 'abs', 'Enemies.json' )

    if ( !fs.existsSync( dir ) ) fs.mkdirSync( dir );
    if ( !fs.existsSync( fileDir ) ) {
      fs.writeFileSync( fileDir, JsonEx.stringify( [null] ) );
    }

    let string = fs.readFileSync( fileDir, { encoding:'utf8', flag:'r' } );
    const data = JsonEx.parse( string );
    data.shift();

    return data;

  }

//=============================================================================
  createActorList()
  { // create a list of all actors in the project.
//=============================================================================

    this._actors = $gameTemp._characterMode === 'Actors' ?
      this.getProjectActors() : this.getProjectEnemies();

    const width = this.width - 2;
    this._actorList = new ListField( width, 14, this._actors )

    this._actorList.x += 1;
    this._actorList.y += this.height - this._actorList.height - 1;

    this.addElement( this._actorList );

  }

}

//=============================================================================
window.ActorsContainer = ActorsContainer;
//=============================================================================

//=============================================================================
// MotionSettingsContainer :
//=============================================================================

//=============================================================================
class MotionSettingsContainer extends ContainerField
{ // MotionSettingsContainer

//=============================================================================
  constructor( rect )
  { // Called on object creation.
//=============================================================================

    super( rect );
    this._padding = 8;
    this.create();
  }

//=============================================================================
  create()
  { // create the elements of the container .
//=============================================================================

    this.createTitleField();
    this.createPreviewButton();
    this.createEditButton();

    this.addElement( this._previewButton );

  }

//=============================================================================
  createTitleField()
  { // create a label for the title.
//=============================================================================

    const x = this._padding;
    const y = this._padding;

    if ( this._titleLabel ) {
      this.removeElement( this._titleLabel );
    }
    this._titleLabel = new LabelField( 'Motion Settings:' );
    this._titleLabel.position.set( x, y );
    this.addElement( this._titleLabel );

  }

//=============================================================================
  createPreviewButton()
  { // create a button and label for preview mode.
//=============================================================================

    const p = this._padding;
    const x = p;
    const y = p * 4 + this._titleLabel.height;
    const actor = SceneManager._scene.actor();
    const data = actor && actor.extras.motionData ? actor.extras.motionData.motions : [null];

    this._previewLabel = new LabelField( 'Preview Motion:' );
    this.addElement( this._previewLabel );
    this._previewLabel.position.set( x, y );

    this._previewButton = new DropDownField( this.width  / 2, data, 4 );
    this.addElement( this._previewButton );
    this._previewButton.position.set( x + this._previewLabel.width + p, y - 6 );

  }

//=============================================================================
  createEditButton()
  { // create a label and button to allow editing.
//=============================================================================

    const p = this._padding;
    const x = p;
    const y = p * 4 + this._previewLabel.y + this._previewLabel.height;
    const actor = SceneManager._scene.actor();
    const data = actor && actor.extras.motionData ? actor.extras.motionData.motions : [null];
    const height = this._previewButton.height;
    const text = actor && actor.extras.motionData ? actor.extras.motionData.name : '...';

    this._editLabel = new LabelField( 'Edit Motions:' );
    this.addElement( this._editLabel );
    this._editLabel.position.set( x, y );

    this._editButton = new ButtonField( this.width  / 2, height, `${text}` );
    this.addElement( this._editButton );
    this._editButton.position.set( x + this._previewLabel.width + p, y - 6 );

  }

}

//=============================================================================
window.MotionSettingsContainer = MotionSettingsContainer;
//=============================================================================

//=============================================================================
// DamageSettingsContainer :
//=============================================================================

//=============================================================================
class DamageSettingsContainer extends ContainerField
{ // DamageSettingsContainer

//=============================================================================
  constructor( rect )
  { // Called on object creation.
//=============================================================================

    super( rect );

  }

//=============================================================================
  createElements()
  { // create the damage setttings...
//=============================================================================

    this._padding = 8;
    this.createTitle();
    this.createIframeField();
    this.createFlinchField();
    this.createKnockbackField();

  }

//=============================================================================
  createTitle()
  { // create the title.
//=============================================================================

    this._titleField = new LabelField( 'Damage Settings:' );
    this.addElement( this._titleField );
    this._titleField.x = this._padding;
    this._titleField.y = this._padding;

  }

//=============================================================================
  createIframeField()
  { // create field for iframe adjustment.
//=============================================================================

    const x = this._titleField.x;
    const y = this._titleField.y + this._titleField.height + this._padding * 3;
    const width = 64;

    this._iframeLabel = new LabelField( 'Knockback: ' );
    this.addElement( this._iframeLabel );
    this._iframeLabel.position.set( x, y );

    this._iframesInput = new NumberInputField( width )
    this._iframesInput.minValue = 0;
    this._iframesInput.maxValue = 999;
    this._iframesInput.value = 24;
    this.addElement( this._iframesInput );
    this._iframesInput.position.set( x + this._iframeLabel.width + this._padding, y - 6 );

    this._iframeLabel.text = 'I-Frames:'


    this._touchDmgLabel = new LabelField( 'Touch Dmg:' );
    this.addElement( this._touchDmgLabel );
    this._touchDmgLabel.position.set( Math.round( this.width / 2 ), y );

    this._touchDmgField = new CheckboxField( false );
    this.addElement( this._touchDmgField );
    this._touchDmgField.position.set( this._touchDmgLabel.x + this._touchDmgLabel.width + this._padding, y - 6 );

  }

//=============================================================================
  createFlinchField()
  { // create a field for flinch resistance..
//=============================================================================

    const x = this._iframeLabel.x;
    const y = this._iframeLabel.y + this._iframeLabel.height + this._padding * 3;
    const width = 64;

    this._flinchLabel = new LabelField( 'Knockback: ' );
    this.addElement( this._flinchLabel );
    this._flinchLabel.position.set( x, y );

    this._flinchToggle = new CheckboxField( true )
    this.addElement( this._flinchToggle );
    this._flinchToggle.position.set( x + this._flinchLabel.width + this._padding, y - 6 );
    this._flinchLabel.text = 'Flinch:'

    this._fToleranceLabel = new LabelField( 'Tolerance: ' );
    this.addElement( this._fToleranceLabel );
    this._fToleranceLabel.position.set( Math.round( this.width / 2 ) + this._padding, y );

    this._flinchInput = new NumberInputField( width )
    this._flinchInput.minValue = 0;
    this._flinchInput.maxValue = 100;
    this._flinchInput.value = 0;
    this.addElement( this._flinchInput );
    this._flinchInput.position.set( this._fToleranceLabel.x + this._fToleranceLabel.width + this._padding, y - 6 );
    this._flinchLabel.text = 'Flinch:'

  }

//=============================================================================
  createKnockbackField()
  { // create field for knockback resistance..
//=============================================================================

    const x = this._flinchLabel.x;
    const y = this._flinchLabel.y + this._flinchLabel.height + this._padding * 3;
    const width = 64;

    this._knockbackLabel = new LabelField( 'Knockback: ' );
    this.addElement( this._knockbackLabel );
    this._knockbackLabel.position.set( x, y );

    this._kbToggle = new CheckboxField( true )
    this.addElement( this._kbToggle );
    this._kbToggle.position.set( x + this._knockbackLabel.width + this._padding, y - 6 );

    this._kbToleranceLabel = new LabelField( 'Tolerance: ' );
    this.addElement( this._kbToleranceLabel );
    this._kbToleranceLabel.position.set( Math.round( this.width / 2 ) + this._padding, y );

    this._knockbackInput = new NumberInputField( width )
    this._knockbackInput.minValue = 0;
    this._knockbackInput.maxValue = 100;
    this._knockbackInput.value = 0;
    this.addElement( this._knockbackInput );
    this._knockbackInput.position.set( this._kbToleranceLabel.x + this._kbToleranceLabel.width + this._padding, y - 6 );

  }

}

//=============================================================================
window.DamageSettingsContainer = DamageSettingsContainer;
//=============================================================================

//=============================================================================
// AISettingsContainer :
//=============================================================================

//=============================================================================
class AISettingsContainer extends ContainerField
{ // AISettingsContainer

//=============================================================================
  constructor( rect )
  { // Called on object creation.
//=============================================================================

    super( rect );
    this._padding = 8;
    this.create();

  }

//=============================================================================
  create()
  { // create all ai setting elements.
//=============================================================================

    this.createTitle();
    this.createModeField();
    this.createSightFields();
    this.createhearingField();
    this.addElement( this._aiModeButton );
  }

//=============================================================================
  createTitle()
  { // Definition.
//=============================================================================

    const x = this._padding;
    const y = this._padding;

    if ( this._titleField ) {
      this.removeElement( this._titleField );
    }
    this._titleField = new LabelField( 'AI Settings:' );
    this.addElement( this._titleField );
    this._titleField.position.set( x, y );

  }

//=============================================================================
  createModeField()
  { // create the generic ai mode setting.
//=============================================================================

    const p = this._padding;
    const x = p;
    const y = this._titleField.y + this._titleField.height + p * 3;

    const data = [
      null,
      { name: 'Basic', value: 1 },
      { name: 'Smart', value: 2 },
    ]
    this._aiModeLabel = new LabelField( 'AI Mode:' );
    this._aiModeLabel.position.set( x, y );
    this.addElement( this._aiModeLabel );

    this._aiModeButton = new DropDownField( this.width  / 2, data, 3 );
    this.addElement( this._aiModeButton );
    this._aiModeButton.position.set( x + this._aiModeLabel.width + p, y - 6 );
    this._aiModeButton.index = 0

  }

//=============================================================================
  createSightFields()
  { // create the fields for sight fov and distance.
//=============================================================================

    const p = this._padding;
    const x = p;
    const y = this._aiModeLabel.y + this._aiModeLabel.height + p * 3;
    const width = 64;

    this._sightLabel = new LabelField( 'Sensory Settings:' );
    this.addElement( this._sightLabel );
    this._sightLabel.position.set( x, y );

    const x0 = p;
    const y0 = this._sightLabel.y + this._sightLabel.height + p * 3;

    this._fovLabel = new LabelField( 'Field of View:' );
    this.addElement( this._fovLabel );
    this._fovLabel.position.set( x0, y0 );

    const x1 = this._fovLabel.x + this._fovLabel.width + p;
    const y1 = this._sightLabel.y + this._sightLabel.height + p * 3;

    this._fovInput = new NumberInputField( width );
    this.addElement( this._fovInput );
    this._fovInput.position.set( x1, y1 - 6 );
    this._fovInput.minValue = 0.00;
    this._fovInput.maxValue = 180.00;
    this._fovInput.value = 90;

    const x2 = this.width / 2 + p;
    const y2 = this._sightLabel.y + this._sightLabel.height + p * 3;

    this._distanceLabel = new LabelField( 'Distance:' );
    this.addElement( this._distanceLabel );
    this._distanceLabel.position.set( x2, y2 );

    const x3 = this._distanceLabel.x + this._distanceLabel.width + p;
    const y3 = this._sightLabel.y + this._sightLabel.height + p * 3;

    this._distanceInput = new NumberInputField( width );
    this.addElement( this._distanceInput );
    this._distanceInput.position.set( x3, y3 - 6 );
    this._distanceInput.minValue = 0.00;
    this._distanceInput.maxValue = 20.00;
    this._distanceInput._decimals = 2;
    this._distanceInput.value = 6;
    this._distanceInput.index = 3;

  }

//=============================================================================
  createhearingField()
  { // create the field for hearing range.
//=============================================================================

    const p = this._padding;
    const x4 = p;
    const y4 = this._distanceLabel.y + this._distanceLabel.height + p * 4;
    const width = 64;

    this._hearingLabel = new LabelField( 'Hearing:' );
    this.addElement( this._hearingLabel );
    this._hearingLabel.position.set( x4, y4 );

    const x5 = this._fovLabel.x + this._fovLabel.width + p;
    const y5 = this._distanceLabel.y + this._distanceLabel.height + p * 4;

    this._hearingInput = new NumberInputField( width );
    this.addElement( this._hearingInput );
    this._hearingInput.position.set( x5, y5 - 6 );
    this._hearingInput.minValue = 0.00;
    this._hearingInput.maxValue = 20.00;
    this._hearingInput.value = 4.5;
    this._hearingInput._decimals = 2;


  }

}

//=============================================================================
window.AISettingsContainer = AISettingsContainer;
//=============================================================================

//=============================================================================
// AllianceSettingsContainer :
//=============================================================================

//=============================================================================
class AllianceSettingsContainer extends ContainerField
{ // AllianceSettingsContainer

//=============================================================================
  constructor( rect )
  { // Called on object creation.
//=============================================================================

    super( rect );

  }

//=============================================================================
  createElements()
  { // create the alliance field.
//=============================================================================

    this._padding = 8;
    this.createTitle();
    this.createAllianceButton();

  }

//=============================================================================
  createTitle()
  { // create the title of the window.
//=============================================================================

    const x = this._padding;
    const y = this._padding;

    this._titleField = new LabelField( 'Alliance Settings:' );
    this.addElement( this._titleField );
    this._titleField.position.set( x, y );

  }

//=============================================================================
  createAllianceButton()
  { // create the button to set the alliance of the character.
//=============================================================================

    const p = this._padding;
    const x = p;
    const y = this._titleField.y + this._titleField.height + p * 2;

    const data = [null];
    this._allianceLabel = new LabelField( 'Alliance:' );
    this.addElement( this._allianceLabel );
    this._allianceLabel.position.set( x, y );


    this._allianceButton = new DropDownField( this.width  / 2, data, 4 );
    this.addElement( this._allianceButton );
    this._allianceButton.position.set( x + this._allianceLabel.width + p, y - 6 );

  }

}

//=============================================================================
window.AllianceSettingsContainer = AllianceSettingsContainer;
//=============================================================================

//=============================================================================
// SaveExitContainer :
//=============================================================================

//=============================================================================
class SaveExitContainer extends ContainerField
{ // SaveExitContainer

//=============================================================================
  constructor( rect )
  { // Called on object creation.
//=============================================================================

    super( rect );

  }

//=============================================================================
  createElements()
  { // create all elements for this window.
//=============================================================================

    this._padding = 8;
    super.createElements();
    this.createSaveButton();
    this.createExitButton();

  }

//=============================================================================
  createSaveButton()
  { // create the button to allow saving extra actor/enemy data.
//=============================================================================

    const height = 18 + 8 * 2;
    const width = this.width / 2 - this._padding * 2;
    const x = this._padding;
    const y = ( this.height - height ) / 2;

    this._saveButton = new ButtonField( width, height, 'Save' );
    this._saveButton.position.set( x, y );

    this.addElement( this._saveButton );

  }

//=============================================================================
  createExitButton()
  { // create the exit button.
//=============================================================================

    const height = 18 + 8 * 2;
    const width = this.width / 2 - this._padding * 2;
    const x = this.width / 2 + this._padding;
    const y = ( this.height - height ) / 2;

    this._exitButton = new ButtonField( width, height, 'Exit' );
    this._exitButton.position.set( x, y );

    this.addElement( this._exitButton );

  }

}

//=============================================================================
window.SaveExitContainer = SaveExitContainer;
//=============================================================================

//=============================================================================
// Sprite_Sensory :
//=============================================================================

//=============================================================================
class Sprite_Sensory extends Sprite
{ // Sprite_Sensory

//=============================================================================
  constructor( rect, tileCount )
  { // Called on object creation.
//=============================================================================

    super( new Bitmap( rect.width, rect.height ) );
    this.position.set( rect.x, rect.y );
    this._tileCount = tileCount;
    this._fov = 0;
    this._distance = 0;
    this._hearing = 0;
    this._actor = null;

    this.refresh();

  }

//=============================================================================
  setActor( actor )
  { // set the actor.
//=============================================================================

    this._actor = actor;

  }

//=============================================================================
  refresh()
  { // refres hthe sprite.
//=============================================================================

    this.bitmap.clear();
    this.refreshGrid();
    this.refreshSight();
    this.refreshHearing();

  }

//=============================================================================
  refreshGrid()
  { // create the grid.
//=============================================================================

    const tw = Math.round( ( this.width - 1 ) / this._tileCount );
    const th = Math.round( ( this.height - 1 ) / this._tileCount );
    const bitmap = this.bitmap;

    bitmap.fillAll( '#55BB55' );

    for ( let x = 0, l0 = this._tileCount; x < l0; x++ ) {
      bitmap.fillRect( x * tw, 0, 1, bitmap.height, '#000000' );
      for ( let y = 0, l1 = this._tileCount; y < l1; y++ ) {
        bitmap.fillRect( 0, y * th, bitmap.width, 1, '#000000' );
      };
      ;
    };

  }

//=============================================================================
  refreshSight()
  { // Definition.
//=============================================================================

    const tw = Math.round( ( this.width - 1 ) / this._tileCount );
    const th = Math.round( ( this.height - 1 ) / this._tileCount );
    const bitmap = this.bitmap;

    const fov = ( this._fov / 360 ) * ( Math.PI * 2 );
    const radius = this._distance * tw;
    const x = this.bitmap.width / 2;
    const y = this.bitmap.height / 2;
    const start = 0 - Math.PI / 2 - fov / 2;
    const end = start + fov;
    bitmap.paintOpacity = 100;

    const context = bitmap.context;

    context.save();
    context.fillStyle = "#DD5555";
    context.beginPath();
    context.moveTo( x, y );
    context.arc(x, y, radius, start, end, false);
    context.fill();
    context.restore();
    bitmap._baseTexture.update();
    bitmap.paintOpacity = 255;

  }

//=============================================================================
  refreshHearing()
  { // refresh the hearing preview.
//=============================================================================

    const tw = Math.round( ( this.width - 1 ) / this._tileCount );
    const th = Math.round( ( this.height - 1 ) / this._tileCount );
    const bitmap = this.bitmap;

    const x = this.bitmap.width / 2;
    const y = this.bitmap.height / 2;
    const radius = this._hearing * tw;

    bitmap.paintOpacity = 100;
    bitmap.drawCircle( x, y, radius, '#BB55BB' );
    bitmap.paintOpacity = 255;

  }

//=============================================================================
  update()
  { // update the sprite.
//=============================================================================

    super.update();
    if ( this._actor ) {
      let changed = false;
      if ( this._hearing != this._actor.extras.hearing ) {
        this._hearing = this._actor.extras.hearing;
        changed = true;
      }
      if ( this._fov != this._actor.extras.sight.fov ) {
        this._fov = this._actor.extras.sight.fov;
        changed = true;
      }
      if ( this._distance != this._actor.extras.sight.distance ) {
        this._distance = this._actor.extras.sight.distance;
        changed = true;
      }
      if ( changed ) this.refresh();
    } else {
      if ( this._fov != 0 || this._hearing != 0 || this._distance != 0 ) {
        this._fov = this._hearing = this._distance = 0;
        this.refresh();
      }

    }

  }

}

//=============================================================================
window.Sprite_Sensory = Sprite_Sensory;
//=============================================================================

//=============================================================================
// Scene_ActorEditor :
//=============================================================================

//=============================================================================
class Scene_ActorEditor extends Scene_Base
{ // Scene_ActorEditor

//=============================================================================
  constructor()
  { // Called on object creation.
//=============================================================================

    super();

  }

//=============================================================================
  actor()
  { // retrun the current actor.
//=============================================================================

    return this._actorsContainer._actorList.item();

  }

//=============================================================================
  allActors()
  { // retrun the current actor.
//=============================================================================


    if ( $gameTemp._characterMode == 'Actors' ) {
      return $gameTemp._actors;
    } else {
      return $gameTemp._enemies;
    }

  }

//=============================================================================
  create()
  { // create the scene.
//=============================================================================

    this.createDirectionContainer();
    this.createActorsContainer();
    this.createMotionSettings();
    this.createDamageSettings();
    this.createAiSettings();
    this.createAllianceSettings();
    this.createSaveExitSettings();
    this.createSensoryPreview();
    this.createSaveModalWindow();
    this.addChild( this._motionSettingsContainer );
    this.addChild( this._allianceContianer );
    this._actorsContainer._actorList.index = 0;
    this.onActorSelect( 0 );

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
  createDirectionContainer()
  { // create a container for the direction buttons and character sprite.
//=============================================================================

    this._directionsContainer = new DirectionContainer();
    this.addChild( this._directionsContainer );

  }

//=============================================================================
  actorsContainerRect()
  { // return a rectangle for the actor container.
//=============================================================================

    const x = this._directionsContainer.x;
    const y = this._directionsContainer.y + this._directionsContainer.height;
    const width = this._directionsContainer.width;
    const height = Graphics.height - this._directionsContainer.height;

    return new Rectangle( x, y, width, height );

  }

//=============================================================================
  createActorsContainer()
  { // Definition.
//=============================================================================

    const rect = this.actorsContainerRect();

    this._actorsContainer = new ActorsContainer( rect );
    this.addChild( this._actorsContainer );

    this._actorsContainer._actorList.setOkHandler( this.onActorSelect.bind( this ) )
  }

//=============================================================================
  onActorSelect( index )
  { // when selecting an actor.
//=============================================================================

    const actor = this.actor();
    const data = actor.extras.motionData;
    const motions = this.getMotionsFromData( data );
    if ( motions.length == 0 ) motions.push( null );
    const isEnemy = $gameTemp._characterMode == 'Enemies'

    this._sensoryGrid.setActor( actor );

    // apply damage values properly.
    this._damageSettingsContainer._iframesInput.value = actor.extras.iframes;
    if ( isEnemy ) {
      this._damageSettingsContainer._touchDmgField.value = actor.extras.touchDmg;
      this._damageSettingsContainer._touchDmgField.disabled = false;
      this._damageSettingsContainer._touchDmgLabel.opacity = 255;
    } else {
      this._damageSettingsContainer._touchDmgField.value = actor.extras.touchDmg;
      this._damageSettingsContainer._touchDmgField.disabled = true;
      this._damageSettingsContainer._touchDmgLabel.opacity = 100;
    }
    this._damageSettingsContainer._flinchInput.value = actor.extras.flinchTolerance;
    this._damageSettingsContainer._knockbackInput.value = actor.extras.knockbackTolerance;
    this._damageSettingsContainer._kbToggle.value = actor.extras.knockbackEnabled;
    this._damageSettingsContainer._flinchToggle.value = actor.extras.flinchEnabled;

    // apply ai values properly.
    if ( isEnemy ) {
      this._aiSettingsContainer._aiModeButton.index = actor.extras.aiMode;
      this._aiSettingsContainer._fovInput.value = actor.extras.sight.fov;
      this._aiSettingsContainer._distanceInput.value = actor.extras.sight.distance;
      this._aiSettingsContainer._hearingInput.value = actor.extras.hearing;

    } else {
      this._aiSettingsContainer._aiModeButton.index = 0;
      this._aiSettingsContainer._aiModeButton.disabled = true;
      this._aiSettingsContainer._aiModeLabel.opacity = 100;
      this._aiSettingsContainer._fovInput.value = 90;
      this._aiSettingsContainer._fovInput.disabled = true;
      this._aiSettingsContainer._fovLabel.opacity = 100;
      this._aiSettingsContainer._distanceInput.value = 6;
      this._aiSettingsContainer._distanceInput.disabled = true;
      this._aiSettingsContainer._distanceLabel.opacity = 100;
      this._aiSettingsContainer._hearingInput.value = 4.5
      this._aiSettingsContainer._hearingInput.disabled = true;
      this._aiSettingsContainer._hearingLabel.opacity = 100;

    }

    // set the character in top corner & assign motions for preview.
    this._directionsContainer._character.setMotionData( data )
    this._motionSettingsContainer._previewButton._list.data = motions;
    this._motionSettingsContainer._previewButton.index = 1;

  }

//=============================================================================
  getMotionsFromData( data )
  { // return the motions in the data as an array.
//=============================================================================


    let array =  [];
    const object = data ? data.motions : {};

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
  motionSettingsRect()
  { // return rectangle for the motion settings container.
//=============================================================================

    const x = this._directionsContainer.x + this._directionsContainer.width;
    const y = 0;
    const width = Math.round( Graphics.width / 3 );
    const height = Math.round( this._directionsContainer.height / 2 );

    return new Rectangle( x, y, width, height );

  }

//=============================================================================
  createMotionSettings()
  { // create a container for motion settings.
//=============================================================================

    const rect = this.motionSettingsRect();

    this._motionSettingsContainer = new MotionSettingsContainer( rect );

    this.addChild( this._motionSettingsContainer );

    this._motionSettingsContainer._previewButton.setOkHandler( this.onPreviewMotion.bind( this ) );
    this._motionSettingsContainer._editButton.setClickHandler( this.onEditMotions.bind( this ) );

  }

//=============================================================================
  onPreviewMotion( item )
  { // when choosing a new motion to preview.
//=============================================================================

    if ( item ) this._directionsContainer._character.startMotion( item.name )

  }

//=============================================================================
  onEditMotions()
  { // when choosing to edit motions.
//=============================================================================

    this.onSave();
    $gameTemp._characterIndex = this._actorsContainer._actorList.index;
    SceneManager.push( Scene_MotionEditor );

  }

//=============================================================================
  damageSettingsRect()
  { // return a rectangle for the damage settings.
//=============================================================================

    let { x, y, width, height } = this.motionSettingsRect();
    y += height;
    height = Math.round( this._directionsContainer.height - 42 );

    return new Rectangle( x, y, width, height );

  }

//=============================================================================
  createDamageSettings()
  { // create settings for getting hit I.E. Iframes, knockback, flinch.
//=============================================================================

    const rect = this.damageSettingsRect();

    this._damageSettingsContainer = new DamageSettingsContainer( rect );

    this.addChild( this._damageSettingsContainer );

    this._damageSettingsContainer._iframesInput.setOkHandler( this.onIframeChange.bind( this ) );
    this._damageSettingsContainer._touchDmgField.setOkHandler( this.onTouchDmgChange.bind( this ) );
    this._damageSettingsContainer._flinchToggle.setOkHandler( this.onFlinchToggle.bind( this ) );
    this._damageSettingsContainer._flinchInput.setOkHandler( this.onFlinchChange.bind( this ) );
    this._damageSettingsContainer._kbToggle.setOkHandler( this.onKnockbackToggle.bind( this ) );
    this._damageSettingsContainer._knockbackInput.setOkHandler( this.onKnockbackChange.bind( this ) );


  }

//=============================================================================
  onIframeChange( value )
  { // when changing iframes.
//=============================================================================

    const actor = this.actor();

    if ( actor ) actor.extras.iframes = value;

  }

//=============================================================================
  onTouchDmgChange( value )
  { // when touch damage is toggled.
//=============================================================================

    const actor = this.actor();

    if ( actor ) actor.extras.touchDmg = value;


  }

//=============================================================================
  onFlinchToggle( value )
  { // when toggling flinch on/off.
//=============================================================================

    const actor = this.actor();

    if ( actor ) actor.extras.flinchEnabled = value;

  }

//=============================================================================
  onFlinchChange( value )
  { // when hanging flinch value.
//=============================================================================

    const actor = this.actor();

    if ( actor ) actor.extras.flinchTolerance = value;

  }

//=============================================================================
  onKnockbackToggle( value )
  { // when toggling flinch on/off.
//=============================================================================

    const actor = this.actor();

    if ( actor ) actor.extras.knockbackEnabled = value;

  }

//=============================================================================
  onKnockbackChange( value )
  { // when hanging flinch value.
//=============================================================================

    const actor = this.actor();

    if ( actor ) actor.extras.knockbackTolerance = value;

  }

//=============================================================================
  aiSettingsRect()
  { // return a rectangle for the ai settings container.
//=============================================================================

    let { x, y, width, height } = this.damageSettingsRect();

    y += height;

    return new Rectangle( x, y, width, height )

  }

//=============================================================================
  createAiSettings()
  { // create settings for sight and sound.
//=============================================================================

    const rect = this.aiSettingsRect();

    this._aiSettingsContainer = new AISettingsContainer( rect );

    this.addChild( this._aiSettingsContainer );

    this._aiSettingsContainer._aiModeButton.setOkHandler( this.onAiModeChange.bind( this ) );
    this._aiSettingsContainer._fovInput.setOkHandler( this.onFovChange.bind( this ) );
    this._aiSettingsContainer._distanceInput.setOkHandler( this.onDistanceChange.bind( this ) );
    this._aiSettingsContainer._hearingInput.setOkHandler( this.onHearingChange.bind( this ) );

  }
// TODO: add grapple enable.
// TODO: add grapple tolerance.
// TODO: read alliances.
// TODO: add skill extras tab..
// TODO: add item extras tab..


//=============================================================================
  onAiModeChange( item )
  { // when changing the ai mode.
//=============================================================================

    const actor = this.actor();
    if ( actor ) actor.extras.aiMode = item ? item.value : 0;

  }

//=============================================================================
  onFovChange( value )
  { // change the value of the fov of the enemy sight.
//=============================================================================

    const actor = this.actor();
    if ( actor ) actor.extras.sight.fov = value;

  }

//=============================================================================
  onDistanceChange( value )
  { // when changing the value of the sight distance.
//=============================================================================

    const actor = this.actor();
    if ( actor ) actor.extras.sight.distance = value;

  }

//=============================================================================
  onHearingChange( value )
  { // when changing the value of the sight distance.
//=============================================================================

    const actor = this.actor();
    if ( actor ) actor.extras.hearing = value;

  }

//=============================================================================
  allianceSettingsRect()
  { // return a rectangle for alliance settings.
//=============================================================================

    let { x, y, width, height } = this.motionSettingsRect();
    x += width;
    width = Graphics.width - x;
    height = ( Graphics.height - width ) / 2;

    return new Rectangle( x, y, width, height );

  }

//=============================================================================
  createAllianceSettings()
  { // create alliance settings.
//=============================================================================

    const rect = this.allianceSettingsRect();

    this._allianceContianer = new AllianceSettingsContainer( rect );

    this.addChild( this._allianceContianer );


  }

//=============================================================================
  saveExitRect()
  { // return a rectangle for the save and exit options.
//=============================================================================

    let { x, y, width, height } = this.allianceSettingsRect();
    y += height;
    return new Rectangle( x, y, width, height );

  }

//=============================================================================
  createSaveExitSettings()
  { // create an option to save and exit the mode.
//=============================================================================

    const rect = this.saveExitRect();

    this._saveExitContainer = new SaveExitContainer( rect );

    this.addChild( this._saveExitContainer );

    this._saveExitContainer._saveButton.setClickHandler( this.onSave.bind( this ) );
    this._saveExitContainer._exitButton.setClickHandler( this.onExit.bind( this ) );

  }

//=============================================================================
  onSave()
  { // save the data.
//=============================================================================

    const extras = this.allActors().map( n => n.extras );
    extras.unshift( null );

    const fs = require( 'fs' );
    const path = require( 'path' );
    const base = $gameTemp._project.directory;
    const dir = path.join( base, 'data', 'abs' )
    const fileDir = path.join( base, 'data', 'abs', $gameTemp._characterMode + '.json' )

    if ( !fs.existsSync( dir ) ) fs.mkdirSync( dir );
    fs.writeFileSync( fileDir, JsonEx.stringify( extras ) );

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
  { // on exiting the mode.
//=============================================================================


    if ( !this.isDataSaved() ) {
      return this._saveWarning.showModal();

    } else {
      SceneManager._scene.popScene();

    }

  }

//=============================================================================
  onSaveAndExit()
  { // save and exit.
//=============================================================================

    this.onSave();
    // this.onExit();
    SceneManager._scene.popScene();
    this._saveWarning.close();


  }

//=============================================================================
  onReturnToEditor()
  { // return to the editor in other words do nothing..
//=============================================================================

    this._saveWarning.close();

  }

//=============================================================================
  onDiscardAndExit()
  { // when discarding save data and exiting.
//=============================================================================

    SceneManager._scene.popScene();
    this._saveWarning.close();

  }

//=============================================================================
  sensoryGridRect()
  { // return a rectangle for the sensory grid preview.
//=============================================================================

    let { x, y, width, height } = this.saveExitRect();

    y += height;
    height = width;
    return new Rectangle( x, y, width, height )

  }

//=============================================================================
  createSensoryPreview()
  { // create  preview for sight and hearing.
//=============================================================================

    const rect = this.sensoryGridRect();

    this._sensoryGrid = new Sprite_Sensory( rect, 19 );

    this.addChild( this._sensoryGrid );
    this._actorsContainer._sensoryGrid = this._sensoryGrid;

  }

}

//=============================================================================
window.Scene_ActorEditor = Scene_ActorEditor;
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
        $.pluginName = [i].name;
        $.params = Chaucer.parse( [i].parameters );
        $.commands = {};
        $.alias = {};

      };

    };

  //============================================================================
    //Create plugin information.
  //============================================================================

    const identifier =  /(Actor Editor) : Version - (\d+.\d+.\d+)/;
    // $._nameError = 'Actor Editor was unable to load! Please revert any changes back to normal!';


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

    if ( $.alias[key] ) throw new Error( `$\{key} already aliased!` );

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
  } )( Chaucer.actorEditor );
//=============================================================================
