/*:============================================================================
*
* @target MZ
*
* @author Chaucer
*
* @plugindesc | Project Select Scene : Version - 1.0.0 | Create a project select scene.
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
  Imported['Project Select Scene'.toUpperCase()] = true;
//=============================================================================
  var Chaucer = Chaucer || {};
  Chaucer.projectSelect = {};
//=============================================================================

//=============================================================================
// Scene_ProjectSelect :
//=============================================================================

//=============================================================================
class Scene_ProjectSelect extends Scene_Base
{ // Scene_ProjectSelect

//=============================================================================
  constructor()
  { // Called on object creation.
//=============================================================================

    super();
    this._projectIndex = -1;

  }

//=============================================================================
  create()
  { // create the elemets of the scene.
//=============================================================================

    this.createTitleField();
    this.createProjectSelectList();
    this.createOptionsList();

  }

//=============================================================================
  createTitleField()
  { // create the title field.
//=============================================================================

    const x = 0;
    const y = 0;
    const width = Graphics.width;
    const height = 32;

    this._titleContainer = new ContainerField( new Rectangle( x, y, width, height ) );
    this.addChild( this._titleContainer );

    const label = new LabelField( 'Select or add a project.' );
    this._titleContainer.addElement( label );
    this._titleContainer._textLabel = label;
    label.position.set( 4, 4 );

  }

//=============================================================================
  createProjectSelectList()
  { // create the container for project select.
//=============================================================================

    this._projects = JsonEx.parse( localStorage.absProjects || '[]' );

    const x = this._titleContainer.x;
    const y = this._titleContainer.y + this._titleContainer.height;
    const w = Math.floor( Graphics.width * 0.66 );
    const h = Graphics.height - y;
    this._projectContainer = new ContainerField( new Rectangle( x, y, w, h ) );
    this.addChild( this._projectContainer );
    const list = new ProjectListField( w, 4, this._projects );

    list.y += 1;

    this._projectContainer.addElement( list );
    this._projectContainer._listField = list;
    list.setOkHandler( this.onListOk.bind( this ) )
  }

//=============================================================================
  onListOk( index )
  { // on selecting an item from the list.
//=============================================================================

    this._projectIndex = index;

  }

//=============================================================================
  createOptionsList()
  { // creat ea list for the options on what to do after selecting a project.
//=============================================================================

    const x = this._projectContainer.x + this._projectContainer.width;
    const y = this._projectContainer.y;
    const w = Graphics.width - x;
    const h = Graphics.height - y;
    const data = [
      { name: 'Import MV' },
      { name: 'Import MZ' },
      { name: 'Edit Character Hitboxes' },
      { name: 'Edit Projectile Patterns' },
      { name: 'Edit Enemy AI' },
      { name: 'Remove Project' },
      { name: 'Exit' },
    ]
    this._optionContainer = new ContainerField( new Rectangle( x, y, w, h ) );
    this.addChild( this._optionContainer );

    const list = new ButtonListField( w, 6, data );
    this._optionContainer.addElement( list );
    this._optionContainer._listField = list;
    // TODO: add resources list here again!
    list.setOkHandler( this.onOptionOk.bind( this ) );
  }

//=============================================================================
  onOptionOk( index )
  { // when choosing an option.
//=============================================================================

    // if ( this._projectIndex >= 0 ) {


      switch ( index ) {
        case 0: // import MV
          this.importProjectMV();
          break;
        case 1: // import MZ
          this.importProjectMZ();
          break;
        case 2: // Edit Character Hitboxes
          $gameTemp._project = this._projectContainer._listField.item();
          SceneManager.goto( Scene_CharacterEditor );
          break;
        case 3: // Projectile Editor
          $gameTemp._project = this._projectContainer._listField.item();
          // SceneManager.goto( Scene_ProjectileEditor );
          break;
        case 4: // Enemy AI
          $gameTemp._project = this._projectContainer._listField.item();
          // SceneManager.goto( Scene_EnemyAI );
          break;
        case 5: // Remove Project
          this.removeProject( this._projectContainer._listField.index );
          break;
        case 6: // Exit Tool
          SceneManager.pop();
          break;
        default:

      }
    // }

  }

//=============================================================================
  importProjectMV()
  { // import an rpg maker MV project.
//=============================================================================

    const dir = Chaucer.uiTools.documentsDir();
    const ext = '.rpgproject'
    Chaucer.uiTools.fileDialog( this.onImport.bind( this ), dir, ext )

  }

//=============================================================================
  importProjectMZ()
  { // import an rpg maker MZ project.
//=============================================================================

    const dir = Chaucer.uiTools.documentsDir();
    const ext = '.rmmzproject'
    Chaucer.uiTools.fileDialog( this.onImport.bind( this ), dir, ext )

  }

//=============================================================================
  getProjectName( directory )
  { // get the name of the project at the current directory.
//=============================================================================

    const fs = require( 'fs' );
    const path = require( 'path' );

    const nextDir = path.join( directory, 'data', 'System.json' );

    const system = JsonEx.parse( fs.readFileSync( nextDir, { encoding:'utf8', flag:'r' } ) );

    return system.gameTitle;

  }

//=============================================================================
  getProjectPluginInfo( directory )
  { // return the plugin version for the project in the directory specified.
//=============================================================================

    const fs = require( 'fs' );
    const path = require( 'path' );
    const pluginName = 'Rosedale_ABS.js';

    let nextDir = path.join( directory, 'js', 'plugins', pluginName );
    let pluginInfo = { name: 'Rosedale ABS', version: 'Not Installed' };

    if ( fs.existsSync( nextDir ) ) {

      let identifier =  /(Rosedale ABS) : Version - (\d+\.\d+\.\d+)/;
      let description = fs.readFileSync( nextDir, { encoding:'utf8', flag:'r' } ).split( '\n' )[6];

      if ( description.match( identifier ) ) pluginInfo.version = RegExp.$2;

    }

    return pluginInfo;

  }

//=============================================================================
  addProject( project )
  { // add the project to the scene.
//=============================================================================

    this._projects.push( project );
    localStorage.absProjects = JsonEx.stringify( this._projects );

    this._projectContainer._listField.data = this._projects;

  }

//=============================================================================
  onImport( files )
  { // Definition.
//=============================================================================

    const fs = require( 'fs' );
    const path = require( 'path' );

    if ( !files[0] ) return;

    const file = files[0].path;
    const directory = path.dirname( file );

    const name = this.getProjectName( directory );
    const pluginInfo = this.getProjectPluginInfo( directory );
    const engineData = fs.readFileSync( file, { encoding:'utf8', flag:'r' } ).split( ' ' );
    const engine = engineData[0] == 'RPGMZ' ? '\\I[3]\\I[4]' :
    engnieInfo[0] == 'RPGMV' ? '\\I[1]\\I[2]' : 'Unknown';
    const version = engineData[1];

    const project = { engine, version, pluginInfo, name, directory };

    this._optionContainer._listField.index = -1;
    this.addProject( project );

  }

//=============================================================================
  removeProject( index )
  { // remove the project at the index specified.
//=============================================================================

    if ( index < 0 ) return alert( 'No Project Selected.' );

    const name = this._projects[index].name;
    const remove = confirm( `Remove project ${name} from tool?( This does NOT delete your project, it just removes it from this tools list! )`)

    if ( remove ) {
      const project = this._projects.splice( index, 1 )[0];

      this._projectContainer._listField.data = this._projects;
      localStorage.absProjects = JsonEx.stringify( this._projects );

      alert( `${name} was removed the project list.`)
      this._optionContainer._listField.index = -1;
      this._projectContainer._listField.index = -1;

    }

  }

}

//=============================================================================
window.Scene_ProjectSelect = Scene_ProjectSelect;
//=============================================================================

//=============================================================================
// ProjectListField :
//=============================================================================

//=============================================================================
class ProjectListField extends ButtonListField
{ // ProjectListField

//=============================================================================
  constructor( width, maxRows, data )
  { // Called on object creation.
//=============================================================================

    super( width, maxRows, data );

  }

//=============================================================================
  itemHeight()
  { // return the height of each item in the list.
//=============================================================================

    return 171;

  }

//=============================================================================
  drawItem( index )
  { // Definition.
//=============================================================================

    const item = this.itemAt( index );
    const rect = this.itemRect( index );

    this.drawItemBackground( rect );

    if ( item ) {
      const height = this.bitmap.fontSize + 8;
      const x = 10 + rect.x;
      const y = 8 + rect.y;
      const width = rect.width - 20;

      const pluginName = item.pluginInfo.name + ': ' + item.pluginInfo.version;
      const engineName = `\\FS[${this.bitmap.fontSize + 4}]` + `\\PY[${y + 2}]|\\PY[${y + 3}]` + item.engine + `\\PY[${y + 2}]| \\PY[${y}]`;
      const engineVersion = `\\PY[${y + 2}]\\FS[${this.bitmap.fontSize + 8}]` + item.version;
      const engineSize = this.textSizeEx( engineName );
      const projectName = `\\FS[${this.bitmap.fontSize + 8}]` + item.name;
      const pathName = 'Location: ' + item.directory;

      this.drawTextEx( engineName, x, y, width, height );
      this.drawTextEx( engineVersion, x + engineSize.width, y, width, height );
      this.drawTextEx( projectName, x, y + 40, width, height );
      this.resetFontSettings();
      this.bitmap.fontSize += 4;
      // TODO: colorize this based on plugin version
      this.bitmap.drawText( pluginName, x, y + 90, width, height );
      this.resetFontSettings();
      this.bitmap.fontSize -= 2;
      this.bitmap.drawText( pathName, x, y + rect.height - this.lineHeight() - 16, width, height );
      this.resetFontSettings();

    }

  }

}

//=============================================================================
window.ProjectListField = ProjectListField;
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

    const identifier =  /(Project Select Scene) : Version - (\d+.\d+.\d+)/;
    // $._nameError = 'Project Select Scene was unable to load! Please revert any changes back to normal!';


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
// Scene_Boot :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Scene_Boot, 'startNormalGame', function()
  { // Aliased startNormalGame of class Scene_Boot.
//-----------------------------------------------------------------------------

    this.checkPlayerLocation();
    DataManager.setupNewGame();
    SceneManager.goto( Scene_ProjectSelect );
    Window_TitleCommand.initCommandPosition();


  }, false );

//=============================================================================
} )( Chaucer.projectSelect );
//=============================================================================
