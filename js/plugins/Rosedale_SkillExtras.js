/*:============================================================================
*
* @target MZ
*
* @author Chaucer
*
* @plugindesc | Scene Skill Extras : Version - 1.0.0 | Scene for extra skill variables.
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
*  ● Date : 22/11/2024
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
  Imported['Scene Skill Extras'.toUpperCase()] = true;
//=============================================================================
  var Chaucer = Chaucer || {};
  Chaucer.skillExtras = {};
//=============================================================================

//=============================================================================
// Scene_SkillExtras :
//=============================================================================

//=============================================================================
class Scene_SkillExtras extends Scene_Base
{ // Scene_SkillExtras

//=============================================================================
  constructor()
  { // Called on object creation.
//=============================================================================

    super();

  }

//=============================================================================
  create()
  { // create all elemets of the scene here.
//=============================================================================

    super.create();
    this.createSaveModalWindow();
    this.createSkillsPanel();
    this.createSaveExitPanel();
    this.createEffectsPanel();
    this.createGeneralPanel();
    this.createTimingsPanel();


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

    this.onSave();
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
  skillContainerRect()
  { // return a rectangle for the skill container .
//=============================================================================

    const x = 0;
    const y = 0;
    const width = Graphics.width / 4;
    const height = Graphics.height - 52;

    return new Rectangle( x, y, width, height )

  }

//=============================================================================
  createSkillsPanel()
  { // create the panel that lists all skills.
//=============================================================================

    const rect = this.skillContainerRect();

    this._skillContainer = new ContainerField( rect );
    this.addChild( this._skillContainer );

    this.createSkillList();

  }

//=============================================================================
  getProjectSkills()
  { // return all actors in the current project.
//=============================================================================

    const fs = require( 'fs' );
    const path = require( 'path' );
    const base = $gameTemp._project.directory;
    const dir = path.join( base, 'data', 'Skills.json' )
    let string = fs.readFileSync( dir, { encoding:'utf8', flag:'r' } );
    const data = JsonEx.parse( string );

    data.shift();

    const extras = this.getSkillExtras();

    for ( let i = 0, l = data.length; i < l; i++ ) {
      const skill = data[i];
      skill.extras  = extras[i] || {
        motion: 'skill',
        type: 'melee',
        projectile: null,
        object: null,
        beam: null,
        summon: null,
        interuption: false,
        cooldown: 0,
        actionDelay: 0,
        castTime:0,
        knockback: {
          enabled: false,
          pressure: 0,
          distance: 0,
          duration: 0,
        },
        flinch: {
          enabled: false,
          pressure: 0,
        },

      };
    };

    $gameTemp._skills = data;
    return data;

  }

//=============================================================================
  getSkillExtras()
  { // get extras from the actors from the abs tool.
//=============================================================================

    const fs = require( 'fs' );
    const path = require( 'path' );
    const base = $gameTemp._project.directory;
    const dir = path.join( base, 'data', 'abs' )
    const fileDir = path.join( base, 'data', 'abs', 'Skills.json' )

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
  createSkillList()
  { // create the list of all skills in the database.
//=============================================================================

    this._skills = this.getProjectSkills();

    const container = this._skillContainer;
    const width = container.width - 2;

    this._skillLabel = new LabelField( 'SKILLS' );

    this._skillLabel.x = Math.round( width - this._skillLabel.width ) / 2;
    this._skillLabel.y = 8;

    this._skillList = new ListField( width, 24, this._skills  )

    this._skillList.x += 1;
    this._skillList.y += container.height - this._skillList.height - 1;

    container.addElement( this._skillLabel );
    container.addElement( this._skillList );

    this._skillList.setOkHandler( this.onSkillSelect.bind( this ) );

  }

//=============================================================================
  onSkillSelect( index )
  { // create the list of all skills in the database.
//=============================================================================

    this.refreshEffects();

  }

//=============================================================================
  refreshEffects()
  { // refresh the effects panel.
//=============================================================================

    this.refreshGeneralSettings();
    this.refreshFlinchSettings();
    this.refreshInteruptSettings();
    this.refreshKnockbackSettings();
    this.refreshTimings();

  }

//=============================================================================
  refreshTimings()
  { // refresh the timing of skills.
//=============================================================================

    const extras = this.item().extras;

    this._cooldownLabel.opacity = 255;
    this._castTimeLabel.opacity = 255;
    this._enemyDelayLabel.opacity = 255;

    this._cooldownField.disabled = false;
    this._castTimeField.disabled = false;
    this._actionDelayField.disabled = false;

    this._cooldownField.value = extras.cooldown || 0;
    this._actionDelayField.value = extras.actionDelay || 0;
    this._castTimeField.value = extras.castTime || 0;

  }

//=============================================================================
  refreshGeneralSettings()
  { // refresh the geeral settings based on the item selected.
//=============================================================================

    const extras = this.item().extras;
    const data = this._typeField.data;
    const type = data.type;
    let index = 0;

    for ( let i = 0, l = data.length; i < l; i++ ) {
      if ( data[i].name === extras.type ) index = i;
    };

    this._motionLabel.opacity = 255;
    this._typeLabel.opacity = 255;

    this._motionField.disabled = false;
    this._typeField.disabled = false;

    this._motionField.text = extras.motion;
    this._typeField.index = index;

  }

//=============================================================================
  refreshFlinchSettings()
  { // refresh the settings for the current items flinch values.
//=============================================================================

    const extras = this.item().extras;

    this._flinchToggleLabel.opacity = 255;
    this._flinchToggleField.disabled = false;

    this._flinchToggleField.value = extras.flinch.enabled;
    this._flinchPressureField.value = extras.flinch.pressure;

    this._flinchPressureLabel.opacity = extras.flinch.enabled ? 255 : 100;
    this._flinchPressureField.disabled = !extras.flinch.enabled;

  }

//=============================================================================
  refreshInteruptSettings()
  { // refresh the interupt settings.
//=============================================================================

    const extras = this.item().extras;

    this._interuptToggleField.disabled = false;
    this._interuptToggleLabel.opacity = 255;

    this._interuptToggleField.value = extras.interuption;

  }

//=============================================================================
  refreshKnockbackSettings()
  { // refresh the knockback settings.
//=============================================================================

    const extras = this.item().extras;
    const enabled = extras.knockback.enabled;

    this._kbToggleField.disabled = false;
    this._kbToggleLabel.opacity = 255;

    this._kbToggleField.value = extras.knockback.enabled;

    this._kbPressureField.value = extras.knockback.pressure;
    this._kbDistanceField.value = extras.knockback.distance;
    this._kbDurationField.value = extras.knockback.duration;

    this._kbPressureLabel.opacity = enabled ? 255 : 100;
    this._kbDistanceLabel.opacity = enabled ? 255 : 100;
    this._kbDurationLabel.opacity = enabled ? 255 : 100;

    this._kbPressureField.disabled = !enabled;
    this._kbDistanceField.disabled = !enabled;
    this._kbDurationField.disabled = !enabled;

  }

//=============================================================================
  saveExitRect()
  { // return a new rectangle for the saven adn exit button.
//=============================================================================

    const x = 0;
    const y = Graphics.height - 52;
    const width = Graphics.width / 4;
    const height = Graphics.height - y;

    return new Rectangle( x, y, width, height );

  }

//=============================================================================
  createSaveExitPanel()
  { // create the panel for the save and xit button.
//=============================================================================

    const rect = this.saveExitRect();

    this._saveExitContainer = new ContainerField( rect );

    this.addChild( this._saveExitContainer );

    this.createSaveButton();
    this.createExitButton();

  }

//=============================================================================
  createSaveButton()
  { // create the save button for the save exit panel.
//=============================================================================

    const p = 8;
    const width =  ( Graphics.width / 4 ) / 2 - p * 2;
    const height = 36;
    const text = 'Save';

    this._saveButton = new ButtonField( width, height, text );
    this._saveButton.position.set( p, p );

    this._saveExitContainer.addElement( this._saveButton );

    this._saveButton.setClickHandler( this.onSave.bind( this ) );

  }

//=============================================================================
  onSave()
  { // when saving the data.
//=============================================================================

    const extras = this.allSkills().map( n => n.extras );
    extras.unshift( null );

    const fs = require( 'fs' );
    const path = require( 'path' );
    const base = $gameTemp._project.directory;
    const dir = path.join( base, 'data', 'abs' )
    const fileDir = path.join( base, 'data', 'abs', 'Skills.json' )

    if ( !fs.existsSync( dir ) ) fs.mkdirSync( dir );
    fs.writeFileSync( fileDir, JsonEx.stringify( extras ) );

  }

//=============================================================================
  createExitButton()
  { // create the exit button for the save exit panel.
//=============================================================================

    const p = 8;
    const width =  ( Graphics.width / 4 ) / 2 - p * 2;
    const height = 36;
    const text = 'Exit';

    this._exitButton = new ButtonField( width, height, text );
    this._exitButton.position.set( p + ( Graphics.width / 4 ) / 2 , p );

    this._saveExitContainer.addElement( this._exitButton );

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
    let directory = path.join( folder, 'Skills.json' );


    const data = ( $gameTemp._skills ).map( n => n.extras );
    data.unshift( null );
    const str1 = JsonEx.stringify( data );
    const str2 = fs.readFileSync( directory, { encoding: 'utf8' } )

    return str1 === str2;

  }

//=============================================================================
  onExit()
  { // when exiting the scene.
//=============================================================================


    const isSaved = this.isDataSaved();

    if ( !isSaved ) {
      return this._saveWarning.showModal();
    }

    SceneManager.pop();

  }

//=============================================================================
  timingsContaineRect()
  { // return a rectangle for the timings panel.
//=============================================================================

    const x = Graphics.width / 2;
    const y = 0;
    const width = Graphics.width / 4;
    const height = Graphics.height / 4;

    return new Rectangle( x, y, width, height );

  }

//=============================================================================
  createTimingsPanel()
  { // create the timings settings panel.
//=============================================================================

    const rect = this.timingsContaineRect();

    this._timingsContainer = new ContainerField( rect );

    this.addChild( this._timingsContainer );

    this.createTimingsContents();

  }

//=============================================================================
  createTimingsContents()
  { // createte contents for the timings panel.
//=============================================================================

    this.createTimingsLabel();
    this.createCooldownField();
    this.createEnemyDelayField();
    this.createCastTimeField();

  }

//=============================================================================
  createTimingsLabel()
  { // create the timings label field title.
//=============================================================================

    const p = 8;

    this._timingsLabel = new LabelField( 'Timings:' );
    this._timingsLabel.position.set( p, p );

    this._timingsContainer.addElement( this._timingsLabel );

  }

//=============================================================================
  createCooldownField()
  { // create the field for .
//=============================================================================

    const p = 8;
    const lh = 42;

    this._cooldownLabel = new LabelField( 'Cooldown:' );
    this._cooldownLabel.position.set( p * 2, p + lh );
    this._timingsContainer.addElement( this._cooldownLabel );
    this._cooldownLabel.opacity = 100;

    const x = this._timingsContainer.width / 2;
    const y = p + lh - p / 2;
    const width = 56;

    this._cooldownField = new NumberInputField( width );
    this._cooldownField.disabled = true;
    this._cooldownField.position.set( x, y );
    this._cooldownField.minValue = 0;
    this._cooldownField.maxValue = 999;
    this._cooldownField.value = 0;

    this._timingsContainer.addElement( this._cooldownField );

    this._cooldownField.setOkHandler( this.onCooldownChange.bind( this ) );

  }

//=============================================================================
  onCooldownChange( value )
  { // when the cooldown value is changed for the current skill.
//=============================================================================

    const item = this.item();
    if ( item && item.extras ) item.extras.cooldown = value;

  }

//=============================================================================
  createEnemyDelayField()
  { // create the enemy action delay field.
//=============================================================================

    const p = 8;
    const lh = 42;

    this._enemyDelayLabel = new LabelField( 'Enemy Delay:' );
    this._enemyDelayLabel.position.set( p * 2, p + lh * 2 );
    this._timingsContainer.addElement( this._enemyDelayLabel );
    this._enemyDelayLabel.opacity = 100;

    const x = this._timingsContainer.width / 2;
    const y = p + lh * 2 - p / 2;
    const width = 56;

    this._actionDelayField = new NumberInputField( width );
    this._actionDelayField.disabled = true;
    this._actionDelayField.position.set( x, y );
    this._actionDelayField.minValue = 0;
    this._actionDelayField.maxValue = 999;
    this._actionDelayField.value = 0;

    this._timingsContainer.addElement( this._actionDelayField );

    this._actionDelayField.setOkHandler( this.onActionDelayChange.bind( this ) );

  }

//=============================================================================
  onActionDelayChange( value )
  { // when the action delay value is changed for the current skill.
//=============================================================================

    const item = this.item();
    if ( item && item.extras ) item.extras.actionDelay = value;

  }

//=============================================================================
  createCastTimeField()
  { // creat ethe field for the cast time of the skill/item.
//=============================================================================

    const p = 8;
    const lh = 42;

    this._castTimeLabel = new LabelField( 'Cast Time:' );
    this._castTimeLabel.position.set( p * 2, p + lh * 3 );
    this._timingsContainer.addElement( this._castTimeLabel );
    this._castTimeLabel.opacity = 100;

    const x = this._timingsContainer.width / 2;
    const y = p + lh * 3 - p / 2;
    const width = 56;

    this._castTimeField = new NumberInputField( width );
    this._castTimeField.disabled = true;
    this._castTimeField.position.set( x, y );
    this._castTimeField.minValue = 0;
    this._castTimeField.maxValue = 999;
    this._castTimeField.value = 0;

    this._timingsContainer.addElement( this._castTimeField );
    this._castTimeField.setOkHandler( this.onCastTimeChange.bind( this ) );

  }

//=============================================================================
  onCastTimeChange( value )
  { // when the cast time value is changed for the current skill.
//=========1====================================================================

    const item = this.item();
    if ( item && item.extras ) item.extras.castTime = value;

  }

//=============================================================================
  generalContaineRect()
  { // return a rectangle for the general panel.
//=============================================================================

    const x = Graphics.width / 4;
    const y = 0;
    const width = Graphics.width / 4;
    const height = Graphics.height / 4;

    return new Rectangle( x, y, width, height );

  }

//=============================================================================
  createGeneralPanel()
  { // create the general settings panel.
//=============================================================================

    const rect = this.generalContaineRect();

    this._generalContainer = new ContainerField( rect );

    this.addChild( this._generalContainer );

    this.createGeneralContents();

  }

//=============================================================================
  item()
  { // return the currently selected item/skills.
//=============================================================================

    return this._skillList.item();

  }

//=============================================================================
  createGeneralContents()
  { // createte contents for the general panel.
//=============================================================================

    this.createGeneralLabel();
    this.createMotionField();
    this.createTypeField();

  }

//=============================================================================
  createGeneralLabel()
  { // create the general label field title.
//=============================================================================

    const p = 8;

    this._generalLabel = new LabelField( 'General:' );
    this._generalLabel.position.set( p, p );

    this._generalContainer.addElement( this._generalLabel );

  }

//=============================================================================
  createMotionField()
  { // create the motion field.
//=============================================================================

    const p = 8;
    const lh = 42;

    const width = this._generalContainer.width;

    this._motionLabel = new LabelField( 'Motion:' );
    this._motionLabel.position.set( p, lh + p );
    this._motionLabel.opacity = 100;
    this._generalContainer.addElement( this._motionLabel );

    this._motionField = new TextInputField( Math.round( width / 1.5 ) - p * 2 );
    this._motionField.disabled = true;
    this._motionField.text = 'skill';
    this._motionField.position.set( p + Math.round( width / 3 ), lh + p / 2 );
    this._generalContainer.addElement( this._motionField );

    this._motionField.setOkHandler( this.onMotionChange.bind( this ) );

  }

//=============================================================================
  onMotionChange( value )
  { // when the motion is changed.
//=============================================================================

    if ( this.item() ) this.item().extras.motion = value;

  }

//=============================================================================
  createTypeField()
  { // create the type field.
//=============================================================================

    const p = 8;
    const lh = 42;

    const width = this._generalContainer.width;
    const w = Math.round( width / 1.5 ) - p * 2;
    const data = [{ name: "self" }, { name: "direct" }, { name: "melee" }];

    this._typeLabel = new LabelField( 'Type:' );
    this._typeLabel.position.set( p, p + lh * 2 );
    this._typeLabel.opacity = 100;

    this._generalContainer.addElement( this._typeLabel );

    this._typeField = new DropDownField( w, data, 3 );
    this._typeField.position.set( p + Math.round( width / 3 ), lh * 2 + p / 2 );
    this._typeField.disabled = true;
    this._generalContainer.addElement( this._typeField );

    this._typeField.setOkHandler( this.onTypeChange.bind( this ) );

  }

//=============================================================================
  onTypeChange( value )
  { // when the type gets changed.
//=============================================================================

    if ( this.item() ) this.item().extras.type = value.name || 'self';

  }

//=============================================================================
  effectsContainerRect()
{ // return the rectangle for the effects rectangle.
//=============================================================================

    const x = Graphics.width / 4;
    const y = Graphics.height / 4;
    const width = Graphics.width / 4;
    const height = Math.round( Graphics.height * 0.75 );
    return new Rectangle( x, y, width, height );

}

//=============================================================================
  createEffectsPanel()
  { // create the pael that   .
//=============================================================================

    const rect = this.effectsContainerRect();

    this._effectsContainer = new ContainerField( rect );
    this.addChild( this._effectsContainer );

    this.createEffectsContents();

  }

//=============================================================================
  createEffectsContents()
  { // create the contents of the effects window.
//=============================================================================

    this.createEffectsLabel();
    this.createFlinchFields();
    this.createInteruptFields();
    this.createKnockbackFields();

  }

//=============================================================================
  createEffectsLabel()
  { // create the title for the panel.
//=============================================================================

    const p = 8;

    this._effectsLabel = new LabelField( 'Effects:' );
    this._effectsLabel.position.set( p, p );

    this._effectsContainer.addElement( this._effectsLabel );

  }

//=============================================================================
  createFlinchFields()
  { // create the flinch input fields.
//=============================================================================

    this.createFlinchToggle();
    this.createFlinchPressure();

  }

//=============================================================================
  createFlinchToggle()
  { // create the toggle for the flinch effect to be enabled.
//=============================================================================

    const p = 8;
    const lh = 42;

    const x1 = p;
    const y1 = p + lh * 2;

    const x2 = Math.round( this._effectsContainer.width * 0.66 );
    const y2 = y1 - p / 2;

    this._flinchToggleLabel = new LabelField( 'Flinch Enabled: ' );
    this._flinchToggleLabel.position.set( x1, y1 );
    this._flinchToggleLabel.opacity = 100;

    this._effectsContainer.addElement( this._flinchToggleLabel );

    this._flinchToggleField = new CheckboxField( false );
    this._flinchToggleField.position.set( x2, y2 );
    this._flinchToggleField.disabled = true;

    this._effectsContainer.addElement( this._flinchToggleField );

    this._flinchToggleField.setOkHandler( this.onFlinchChange.bind( this ) )

  }

//=============================================================================
  onFlinchChange( value )
  { // when toggling the flinch setting.
//=============================================================================

    if ( this.item() ) this.item().extras.flinch.enabled = value;
    this._flinchPressureLabel.opacity = value ? 255 : 100;
    this._flinchPressureField.disabled = !value;

  }

//=============================================================================
  createFlinchPressure()
  { // create the pressure value for the flinch effect.
//=============================================================================

    const p = 8;
    const lh = 42;

    const x1 = p * 2;
    const y1 = p + lh * 3;

    this._flinchPressureLabel = new LabelField( 'Flinch Pressure: ' );
    this._flinchPressureLabel.position.set( x1, y1 );
    this._flinchPressureLabel.opacity = 100;

    this._effectsContainer.addElement( this._flinchPressureLabel );

    const x2 = Math.round( this._effectsContainer.width * 0.66 );
    const y2 = y1 - p / 2;
    const width = 58;

    this._flinchPressureField = new NumberInputField( width );
    this._flinchPressureField.disabled = true
    this._flinchPressureField.minValue = 0;
    this._flinchPressureField.maxValue = 100;
    this._flinchPressureField.value = 100;
    this._flinchPressureField.caretIndex = 3;

    this._flinchPressureField.position.set( x2, y2 );

    this._effectsContainer.addElement( this._flinchPressureField );

    this._flinchPressureField.setOkHandler( this.onfPressureChange.bind( this ) );

  }

//=============================================================================
  onfPressureChange( value )
  { // when the value of the flincpressure s changed.
//=============================================================================

    if ( this.item() ) this.item().extras.flinch.pressure = value;

  }

//=============================================================================
  createInteruptFields()
  { // create the flinch input fields.
//=============================================================================

    this.createInteruptToggle();

  }

//=============================================================================
  createInteruptToggle()
  { // create the toggle for the interupt effect to be enabled.
//=============================================================================

    const p = 8;
    const lh = 42;

    const x1 = p;
    const y1 = p + lh * 5;

    const x2 = Math.round( this._effectsContainer.width * 0.66 );
    const y2 = y1 - p / 2;

    this._interuptToggleLabel = new LabelField( 'Interupt Enabled: ' );
    this._interuptToggleLabel.position.set( x1, y1 );
    this._interuptToggleLabel.opacity = 100;

    this._effectsContainer.addElement( this._interuptToggleLabel );

    this._interuptToggleField = new CheckboxField( false );
    this._interuptToggleField.position.set( x2, y2 );
    this._interuptToggleField.disabled = true;

    this._effectsContainer.addElement( this._interuptToggleField );

    this._interuptToggleField.setOkHandler( this.onInteruptChange.bind( this ) );

  }

//=============================================================================
  onInteruptChange( value )
  { // when the interup field is toggled.
//=============================================================================

    if ( this.item() ) this.item().extras.interuption = value;

  }

//=============================================================================
  createKnockbackFields()
  { // create the fields for knoback.
//=============================================================================

    this.createKnockbackToggle();
    this.createKnockbackPressure();
    this.createKnockbackDistance();
    this.createKnockbackDuration();

  }

//=============================================================================
  createKnockbackToggle()
  { // create the toggle for the knock back effect to be enabled.
//=============================================================================

    const p = 8;
    const lh = 42;

    const x1 = p;
    const y1 = p + lh * 7;

    const x2 = Math.round( this._effectsContainer.width * 0.66 );
    const y2 = y1 - p / 2;

    this._kbToggleLabel = new LabelField( 'Knockback Enabled: ' );
    this._kbToggleLabel.position.set( x1, y1 );
    this._kbToggleLabel.opacity = 100;

    this._effectsContainer.addElement( this._kbToggleLabel );

    this._kbToggleField = new CheckboxField( false );
    this._kbToggleField.position.set( x2, y2 );
    this._kbToggleField.disabled = true;

    this._effectsContainer.addElement( this._kbToggleField );

    this._kbToggleField.setOkHandler( this.onKbChange.bind( this ) );

  }

//=============================================================================
  onKbChange( value )
  { // when the knock back effect is toggled.
//=============================================================================

    if ( this.item() ) this.item().extras.knockback.enabled = value;

    this._kbPressureLabel.opacity = value ? 255 : 100;
    this._kbPressureField.disabled = !value;

    this._kbDistanceLabel.opacity = value ? 255 : 100;
    this._kbDistanceField.disabled = !value;

    this._kbDurationLabel.opacity = value ? 255 : 100;
    this._kbDurationField.disabled = !value;

  }

//=============================================================================
  createKnockbackPressure()
  { // create the pressure value for the knock back effect.
//=============================================================================

    const p = 8;
    const lh = 42;

    const x1 = p * 2;
    const y1 = p + lh * 8;

    this._kbPressureLabel = new LabelField( 'Knockback Pressure: ' );
    this._kbPressureLabel.position.set( x1, y1 );
    this._kbPressureLabel.opacity = 100;

    this._effectsContainer.addElement( this._kbPressureLabel );

    const x2 = Math.round( this._effectsContainer.width * 0.66 );
    const y2 = y1 - p / 2;
    const width = 58;

    this._kbPressureField = new NumberInputField( width );
    this._kbPressureField.minValue = 0;
    this._kbPressureField.maxValue = 100;
    this._kbPressureField.value = 100;
    this._kbPressureField.caretIndex = 3;
    this._kbPressureField.disabled = true;

    this._kbPressureField.position.set( x2, y2 );

    this._effectsContainer.addElement( this._kbPressureField );

    this._kbPressureField.setOkHandler( this.onKbPressureChange.bind( this ) );

  }

//=============================================================================
  onKbPressureChange( value )
  { // when the pressure of hte knockback is changed.
//=============================================================================

    if ( this.item() ) this.item().extras.knockback.pressure = value;

  }

//=============================================================================
  createKnockbackDistance()
  { // create the distance value for the knock back effect.
//=============================================================================

    const p = 8;
    const lh = 42;

    const x1 = p * 2;
    const y1 = p + lh * 9;

    this._kbDistanceLabel = new LabelField( 'Knockback Distance: ' );
    this._kbDistanceLabel.position.set( x1, y1 );
    this._kbDistanceLabel.opacity = 100;

    this._effectsContainer.addElement( this._kbDistanceLabel );

    const x2 = Math.round( this._effectsContainer.width * 0.66 );
    const y2 = y1 - p / 2;
    const width = 58;

    this._kbDistanceField = new NumberInputField( width, 2 );
    this._kbDistanceField.minValue = 0.01;
    this._kbDistanceField.maxValue = 5.00;
    this._kbDistanceField.value = 1.00;
    this._kbDistanceField.caretIndex = 3;
    this._kbDistanceField.disabled = true;

    this._kbDistanceField.position.set( x2, y2 );

    this._effectsContainer.addElement( this._kbDistanceField );

    this._kbDistanceField.setOkHandler( this.onKbDistanceChange.bind( this ) );

  }

//=============================================================================
  onKbDistanceChange( value )
  { // when the distance of the knockback is changed.
//=============================================================================

    if ( this.item() ) this.item().extras.knockback.distance = value;

  }

//=============================================================================
  createKnockbackDuration()
  { // create the duration value for the knock back effect.
//=============================================================================

    const p = 8;
    const lh = 42;

    const x1 = p * 2;
    const y1 = p + lh * 10;

    this._kbDurationLabel = new LabelField( 'Knockback Duration: ' );
    this._kbDurationLabel.position.set( x1, y1 );
    this._kbDurationLabel.opacity = 100;

    this._effectsContainer.addElement( this._kbDurationLabel );

    const x2 = Math.round( this._effectsContainer.width * 0.66 );
    const y2 = y1 - p / 2;
    const width = 58;

    this._kbDurationField = new NumberInputField( width );
    this._kbDurationField.minValue = 0;
    this._kbDurationField.maxValue = 100;
    this._kbDurationField.value = 100;
    this._kbDurationField.caretIndex = 3;
    this._kbDurationField.disabled = true;

    this._kbDurationField.position.set( x2, y2 );

    this._effectsContainer.addElement( this._kbDurationField );

    this._kbDurationField.setOkHandler( this.onKbDurationChange.bind( this ) );

  }

//=============================================================================
  onKbDurationChange( value )
  { // when the duration of the knockback is changed.
//=============================================================================

    if ( this.item() ) this.item().extras.knockback.duration = value;

  }

//=============================================================================
  allSkills()
  { // retrun the current actor.
//=============================================================================

    return $gameTemp._skills;

  }

}

//=============================================================================
window.Scene_SkillExtras = Scene_SkillExtras;
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

    const identifier =  /(Scene Skill Extras) : Version - (\d+.\d+.\d+)/;
    // $._nameError = 'Scene Skill Extras was unable to load! Please revert any changes back to normal!';


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
  } )( Chaucer.skillExtras );
//=============================================================================
