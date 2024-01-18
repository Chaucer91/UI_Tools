/*:============================================================================
*
* @target MZ
*
* @author Chaucer
*
* @plugindesc | Rosedale Skill Tree : Version - 1.1.0 | A simple skill tree.
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
*
*   This Plugin may be used commercially, or non commercially. This plugin may
*  be extended upon, and or shared ONLY with permission from it's owner,
*  ZServ. This plugin is the sole property of ZServ, and may not be
*  without his/her permission!.
*
*============================================================================
*  Version History :
*============================================================================

*  ● Version : 0.1.0
*  ● Date : 04/11/2023
*    ★ Beta Release.

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

* @command start_skill_tree
* @text Start Skill Scene
* @desc Start the tree scene for the actor specified, and with the tree specified.

* @arg actor
* @text Actor
* @desc The actor that the scene will start for.
* @default 1
* @type actor

* @param menuName
* @text Menu Name
* @desc The name of the skill tree in the menu.
* @default Skill Tree
* @type text

* @param inMenu
* @text Enable In Menu
* @desc Should the skill tree be enabled in the menu.
* @default true
* @type boolean

* @param enableSwitch
* @text Enabled Switch
* @desc Skill tree will be enabled in menu only when this switch is on( leave 0 if always enabled ).
* @default 0
* @type switch

* @param treeBackground
* @text Skill Scene Background
* @desc The backgriund Image used for the Skill Tree Scene.
* @default
* @type file
* @dir img/system/
* @require 1

* @param pointsName
* @text Points Name
* @desc The name of the points that are used to purchase skills.
* @default SP
* @type text

* @param pointsPerLevel
* @text Points Per Level
* @desc how many points are gained per level.
* @default 1
* @type number
* @min 1
* @max 10

* @param bonusPointLevels
* @text Bonus Point Levels
* @desc On every level that is divisible by this number, bonus points( x2 ) will be granted( set to 0  to disable ).
* @default 5
* @type number
* @min 0
* @max 10

* @param gridSize
* @text Tree Grid Size
* @desc How large are the tiles in the grid.
* @default 36
* @type number
* @min 32

* @param lockIcon
* @text Lock Icon
* @desc The icon that will be used for the lock icon.
* @default 0
* @type icon

* @param learnedIcon
* @text Learned Icon
* @desc The icon that will be used for the learned icon.
* @default 0
* @type icon

* @param learnSe
* @text Learn Sound Effect
* @desc Specify the sound effect when a skill is learned.
* @default {"name":"","volume":"90","pitch":"100","pan":"0"}
* @type struct<Audio>

* @param learnAnime
* @text Learn Animation
* @desc Specify the animation that will be played when a skill is learned.
* @default 0
* @type animation

* @param cursorSprite
* @text Tree Cursor Sprite
* @desc The sprite used for the cursor in the tree tree.
* @default
* @type file
* @dir img/system/
* @require 1

* @param cursorFlashSpeed
* @text Cursor Flash Speed
* @desc Set the speed that the cursor flashes at.
* @default 0.10
* @type number
* @min 0.01
* @max 6.28
* @decimals 2
* @parent cursorSprite

* @param arrowColors
* @text Arrow Colors
* @desc Specify the arrow colors here.
* @default {"colorEnabled":"#cfb634","outlineEnabled":"#ff7700","colorDisabled":"#666666","outlineDisabled":"#444444"}
* @type struct<Colors>

*/

/*~struct~Colors:

  * @param colorEnabled
  * @text Enabled Color
  * @desc Set the color of arrows pointing to unlocked skills here.
  * @default #cfb634
  * @type text

  * @param outlineEnabled
  * @text Enabled Outline Color
  * @desc Set the color for the outline of arrows pointing to unlocked skills.
  * @default #ff7700
  * @type text


  * @param colorDisabled
  * @text Disabled Color
  * @desc Set the color of arrows pointing to locked skills here.
  * @default #666666
  * @type text

  * @param outlineDisabled
  * @text Disabled Outline Color
  * @desc Set the color for the outline of arrows pointing to locked skills.
  * @default #444444
  * @type text

*/

/*~struct~Audio:

* @param name
* @text Name
* @desc The name of the audio file to play.
* @default
* @type file
* @dir audio/se
* @require 1

* @param volume
* @text Volume
* @desc The volume level of the audio.
* @default 90
* @type number
* @min 0
* @max 100

* @param pitch
* @text Pitch
* @desc The pitch of the audio.
* @default 100
* @type number
* min 50
* @max 150

* @param pan
* @text Pan
* @desc The pan of the audio.
* @default 0
* @type number
* @min -100
* @max 100

*/

//=============================================================================
  var Imported = Imported || {};
  Imported['Skill Tree'.toUpperCase()] = true;
//=============================================================================
  var Chaucer = Chaucer || {};
  Chaucer.skillTree = {};
//=============================================================================

//=============================================================================
// Sprite_SkillTree :
//=============================================================================

//=============================================================================
class Sprite_SkillTree extends Sprite
{ // Sprite_SkillTree

//=============================================================================
  constructor( data, editorMode )
  { // Called on object creation.
//=============================================================================

    super( new Bitmap( 100, 100 ) );


    this.createGrid();
    this.setData( data );
    this.index = 0;

    this._animationTarget = new Sprite();
    this.addChild( this._animationTarget );

  }

//=============================================================================
  get index()
  { // return the current index.
//=============================================================================

    return this._index || 0;

  }

//=============================================================================
  set index( value )
  { // set the index to the value specified.
//=============================================================================

    this._index = value;
    this.refreshWindows();

  }

//=============================================================================
  createGrid()
  { // create a grid.
//=============================================================================

    this._grid = new PIXI.Graphics();
    this.addChild( this._grid );

  }

//=============================================================================
  setData( data )
  { // set the data.
//=============================================================================

    this._data = data;
    if ( data ) {
      // this._data.tileSize = ImageManager.iconWidth * 2;
      this._data.tileSize = Chaucer.skillTree.params.gridSize;
      this.resize( data.width * data.tileSize, data.height * data.tileSize );
    }
    this.initializeIndex();
    this.refresh();

  }

//=============================================================================
  initializeIndex()
  { // initialize the index to top center( or closest node to it ).
//=============================================================================

    if ( this._data ) {

      const { tree, width, height } = this._data;

      for ( let y = 0, l = height; y < l; y++ ) {
        if ( !tree[y] ) continue;
        for ( let x = 0, l2 = width; x < l2; x++ ) {
          if ( tree[y][x] ) {
            this.index = tree[y][x].id;
            y = height;
            x = width;
            break;
          };
        };
      };

    }

  }

//=============================================================================
  resize( width, height )
  { // resize.
//=============================================================================

    this.bitmap.resize( width, height )
    this.width = width;
    this.height = height;

  }

//=============================================================================
  refresh()
  { // refresh the tree tree.
//=============================================================================

    if ( this.parent && this._data ) {
      this.refreshWindows();
      this.bitmap.clear();
      this.refreshPosition();
      if ( this._editorMode ) this.drawGrid()
      this.drawConnectors();
      this.drawNodes();
    }

  }

//=============================================================================
  refreshWindows()
  { // refresh the windows.
//=============================================================================

    if ( this.parent ) {

      const node = this.nodeFromId( this.index );
      this.parent._nameWindow.setNode( node );
      this.parent._requirementsWindow.setNode( node );
      this.parent._descriptionWindow.setText( node ? node.description : '' );

    }

  }

//=============================================================================
  drawConnectors()
  { // draw all the connectors between the nodes.
//=============================================================================

    const { width, height, tileSize, tree } = this._data;

    for ( let i = 0, l = height; i < l; i++ ) {
      const y = height - i - 1;
      if ( !tree[y] ) continue;

      for ( let j = 0, l = width; j < l; j++ ) {
        const x = j;
        if ( !tree[y][x] ) continue;
        if ( tree[y][x].parents.length == 0 ) continue;

        this.drawConnections( tree[y][x] );

      };

    };


  }

//=============================================================================
  allNodes()
  { // return all nodes in the current tree.
//=============================================================================

    if ( !this._data ) return [];
    const data = [].concat.apply([], this._data.tree );
    return data.filter( node => !!node );

  }

//=============================================================================
  nodeFromId( id )
  { // retrun the node from the id provided.
//=============================================================================

    return this.allNodes().find( node => node.id == id ) || null;

  }

//=============================================================================
  getNodePosition( nodeId )
  { // retrun the position the node is currently at.
//=============================================================================

    const { width, height, tileSize } = this._data;
    const id = isNaN( nodeId ) ? nodeId.id : nodeId;

    const x = ( id % width ) * tileSize + tileSize / 2;
    const y = Math.floor( id / width ) * tileSize + tileSize / 2;

    return new Point( x, y );

  }

//=============================================================================
  isLearned( node )
  { // return if the node is learned.
//=============================================================================

    if ( !node ) return false;

    const actor = this.parent._actor || $gameParty.leader();
    return actor.isLearnedSkill( node.skillId );

  }

//=============================================================================
  isLocked( node )
  { // retrun if the current node is locked behind another node.
//=============================================================================

    if ( !node ) return true;

    const parents = node.parents;

    if ( parents.length == 0 ) return false;

    return parents.every( id => !this.isLearned( this.nodeFromId( id ) ) );

  }

//=============================================================================
  canLearnNode( node )
  { // return the the current actor is capable of learning the node.
//=============================================================================

    if ( !node ) return false;
    const { itemId, parents, level, cost } = node;

    if ( this.isLocked( node ) ) return false;
    if ( SceneManager._scene._actor.unusedSp() < cost ) return false;
    if ( SceneManager._scene._actor.level < level ) return false;

    return !this.isLearned( node );

  }

//=============================================================================
  drawConnections( node )
  { // draw all connections for the node provided.
//=============================================================================

    const p0 = this.getNodePosition( node );

    const iw = ( ImageManager.iconWidth || Window_Base._iconWidth  ) / 2 + 6;
    const ih = ( ImageManager.iconHeight || Window_Base._iconHeight ) / 2 + 6;

    const radius = Math.sqrt( iw * iw, ih * ih );
    const locked = this._editorMode ? false : this.isLocked( node );
    const colors = Chaucer.skillTree.params.arrowColors;

    const color0 = locked ? colors.outlineDisabled : colors.outlineEnabled;
    const color1 = locked ? colors.colorDisabled : colors.colorEnabled;

    for ( let i = 0, l = node.parents.length; i < l; i++ ) {

      const parent = this.nodeFromId( node.parents[i] );
      const p1 = this.getNodePosition( node.parents[i] );

      const dist = new Point( p0.x - p1.x, p0.y - p1.y );
      const mag = Math.sqrt( dist.x * dist.x + dist.y * dist.y );
      const uVec = new Point( dist.x / mag, dist.y / mag );
      const width = 6;

      const ox = uVec.x * radius;
      const oy = uVec.y * radius;

      const x0 = p1.x + ox;
      const y0 = p1.y + oy;
      const x1 = p0.x - ox;
      const y1 = p0.y - oy;

      this.bitmap.drawArrow( x0, y0, x1, y1, width, color0 );

      const x2 = x0 + uVec.x;
      const y2 = y0 + uVec.y;
      const x3 = x1 - uVec.x * 2;
      const y3 = y1 - uVec.y * 2;

      this.bitmap.drawArrow( x2, y2, x3, y3, width - 2, color1 );

    };

  }

//=============================================================================
  drawNodes()
  { // draw all nodes in the tree.
//=============================================================================

    if ( this._data ) {

      const { width, height, tileSize, tree } = this._data;


      for ( let i = 0, l = height; i < l; i++ ) {
        if ( !tree[i] ) continue;
        for ( let j = 0, l2 = width; j < l2; j++ ) {
          if ( !tree[i][j] ) continue;
          this.drawNode( j * tileSize, i * tileSize, tree[i][j] );

        };
      };

    }

  }

//=============================================================================
  drawNode( x, y, node )
  { // Definition.
//=============================================================================

    const src = ImageManager.loadSystem( 'IconSet' );
    const item = $dataSkills[node.skillId];
    const iconIndex = item ? item.iconIndex : 0;
    const iw = ImageManager.iconWidth || Window_Base._iconWidth;
    const ih = ImageManager.iconHeight || Window_Base._iconHeight;
    const ox = ( this._data.tileSize - iw ) / 2;
    const oy = ( this._data.tileSize - ih ) / 2;
    const sw = iw;
    const sh = ih;
    const sx = ( iconIndex % 16 ) * sw
    const sy = Math.floor( iconIndex / 16 ) * sh;

    const dx = x + ox;
    const dy = y + oy;

    this.bitmap.blt( src, sx, sy, sw, sh, dx, dy );

    if ( !this._editorMode && this.isLocked( node ) ) {
      const iconIndex = Chaucer.skillTree.params.lockIcon;
      const sx = ( iconIndex % 16 ) * sw
      const sy = Math.floor( iconIndex / 16 ) * sh;

      this.bitmap.blt( src, sx, sy, sw, sh, dx, dy );

    } else if ( !this._editorMode && this.isLearned( node ) ) {
      const iconIndex = Chaucer.skillTree.params.learnedIcon;
      const sx = ( iconIndex % 16 ) * sw
      const sy = Math.floor( iconIndex / 16 ) * sh;

      this.bitmap.blt( src, sx, sy, sw, sh, dx, dy );

    }

  }

//=============================================================================
  refreshPosition()
  { // refresh the position to be centered.
//=============================================================================

    const width = this._data.width * this._data.tileSize;

    this.x = ( Graphics.boxWidth - this.windowWidth() - width ) / 2

  }

//=============================================================================
  drawGrid()
  { // draw the grid.
//=============================================================================

    const { tileSize, width, height } = this._data;

    this._grid.clear()

    if ( this._gridId >= 0 ) {

      const rx = ( this._gridId % width ) * tileSize;
      const ry = Math.floor( this._gridId / width ) * tileSize;
      const rw = tileSize;
      const rh = tileSize;

      this._grid.beginFill( 0xffff00, 0.5 );
      this._grid.drawRect( rx, ry, rw, rh );
      this._grid.endFill();

    }

    this._grid.lineStyle(2, 0xFFFFFF, 1);

    for ( let i = 0, l = width; i <= l; i++ ) {

      const x0 = i * tileSize;
      const y0 = 0;
      const x1 = x0
      const y1 = height * tileSize;

      this._grid.moveTo( x0, y0 );
      this._grid.lineTo( x1, y1 );

    };

    for ( let i = 0, l = height; i <= l; i++ ) {

      const x0 = 0;
      const y0 = i * tileSize;
      const x1 = width * tileSize
      const y1 = y0;

      this._grid.moveTo( x0, y0 );
      this._grid.lineTo( x1, y1 );

    };

  }

//=============================================================================
  currentNode()
  { // return the currently selected node.
//=============================================================================

    return this.nodeFromId( this.index );

  }

//=============================================================================
  update()
  { // update the grid.
//=============================================================================

    super.update();
    if ( !this.updateAnimation() && !this.parent.isEventRunning() ) {
      this.updateMouse();
      this.updateInput();
      this.updateCursor();
    }
    this.updateInterpreter();

  }

//=============================================================================
  updateCursor()
  { // update the cursor position.
//=============================================================================

    const node = this.currentNode();

    if ( this._cursor && this._data ) {

      const { x, y } = this.getNodePosition( this.index );
      const tileSize = this._data.tileSize;
      const { width, height } = this._cursor;

      const ox = this.x - width / 2;
      const oy = this.y - height / 2;

      this._cursor.position.set( x + ox, y + oy );
      this.updateCursorOpacity();

    }

    this._cursor.visible = !!node;

  }

//=============================================================================
  updateCursorOpacity()
  { // update the opacity of the cursor.
//=============================================================================

    const speed = Chaucer.skillTree.params.cursorFlashSpeed || 0.10;
    const pi2 = Math.PI * 2;
    const angle = ( this._cursor._opacityAngle + speed ) % pi2;

    this._cursor.alpha = ( 0.75 + Math.cos( angle ) * 0.25 );
    this._cursor._opacityAngle = angle;

  }

//=============================================================================
  updateAnimation()
  { // return if we are updating the animation.
//=============================================================================

    if ( !this._animeSprite ) return false;

    if ( !this._animeSprite.isPlaying() ) {
      const node = this.currentNode();
      this._animeSprite.parent.removeChild( this._animeSprite );
      this.parent.startEvent( $dataCommonEvents[node.eventId] );
      this._animeSprite = null;
      this.refresh();
    }

    return true;
  }

//=============================================================================
  updateInterpreter()
  { // update the interpreter.
//=============================================================================

    this.parent._interpreter.update();

  }

//=============================================================================
  mouseOverNode( node )
  { // return if the mode is over a node.
//=============================================================================

    let { x, y } = this.getNodePosition( node.id );

    const width = ImageManager.iconWidth || Window_Base._iconWidth;
    const height = ImageManager.iconHeight || Window_Base._iconHeight;

    let tx = this._mouseX;
    let ty = this._mouseY;

    x -= width / 2;
    y -= height / 2;
    tx -= this.x;
    ty -= this.y;

    if ( this.mouseOverWindows( tx, ty ) ) return false;

    return tx > x  && tx < x + width && ty > y && ty < y + width;

  }

//=============================================================================
  mouseOverWindows( tx, ty )
  { // return if the mouse is over any window.
//=============================================================================

    const windows = [
      this.parent._descriptionWindow,
      this.parent._requirementsWindow,
      this.parent._nameWindow,
    ];


    for ( let i = 0, l = windows.length; i < l; i++ ) {

      const window = windows[i];

      if ( !window.parent ) continue;

      const { x,y } = window.getGlobalPosition( new Point(), true );
      const { width, height } = window;

      if ( tx > x && tx < x + width && ty > y && ty < y + height ) return true;

    };

    return false;

  }

//=============================================================================
  updateMouse()
  { // update the mouse hovering over a tile.
//=============================================================================

    this.updateMousePostion();
    this.updateMouseClick();
    this.updateScrollWheel();
  }

//=============================================================================
  mouseMoved()
  { // return if the mouse moved.
//=============================================================================

    return TouchInput.x != this._mouseX || TouchInput.y != this._mouseY;

  }

//=============================================================================
  updateMousePostion()
  { // update the mouses position.
//=============================================================================

    const allNodes = this.allNodes();

    if ( this.mouseMoved() ) {

      for ( let i = 0, l = allNodes.length; i < l; i++ ) {

        const node = allNodes[i];

        if ( this.mouseOverNode( node ) ) {
          if ( this.index != node.id ) {
            SoundManager.playCursor();
            this.index = node.id;
          }
        };
      };

      if ( TouchInput.x && TouchInput.y ) {
        this._mouseX = TouchInput.x;
        this._mouseY = TouchInput.y;
      }

    }

  }

//=============================================================================
  updateMouseClick()
  { // updateMouseClick.
//=============================================================================

    if ( TouchInput.isTriggered() ) {

      const allNodes = this.allNodes();

      for ( let i = 0, l = allNodes.length; i < l; i++ ) {
        if ( this.mouseOverNode( allNodes[i] ) ) {
          this.processOk();
        };
      };

    }

  }

//=============================================================================
  windowWidth()
  { // return the width of the windows.
//=============================================================================

    return Graphics.boxWidth / 2;

  }

//=============================================================================
  scrollPadding()
  { // return the control constraints.
//=============================================================================

    const padding = this.parent._descriptionWindow.height;

    return padding + Chaucer.skillTree.params.scrollPadding;

  }

//=============================================================================
  updateScrollWheel()
  { // update scroll wheel.
//=============================================================================

    const sign = Math.sign( TouchInput.wheelY );
    const scrollSpeed = ( TouchInput.wheelY / TouchInput.wheelY ) * sign;
    const n = 30;

    const padding = 0; // this.scrollPadding();
    const min = Math.max( this.height - Graphics.boxHeight - padding, 0 );
    const max = 0;

    if ( scrollSpeed ) {
      this.y = ( this.y - scrollSpeed * n ).clamp( -min, max );
    }

  }

//=============================================================================
  nodesLeft( size = 1 )
  { // return the node directly left of this one.
//=============================================================================

    const { tree, width, height } = this._data;

    const row = Math.floor( this.index / width );
    const col = ( this.index % width );

    if ( col <= 0 ) return null;

    const startRow = row - Math.floor( size / 2 );
    const endRow = startRow + size;
    const list = [];

    for ( let i = startRow, l = endRow; i < l; i++ ) {
      if ( !tree[i] ) {
        list.push( null );

      } else {
        list.push( tree[i][col - 1] );

      }
    };

    return list.filter( n => !!n ).sort( ( a, b ) => {
      const c = Math.floor( a.id / width );
      const d = Math.floor( b.id / width );

      return Math.abs( a - row ) - Math.abs( b - row )

    } )[0];

  }

//=============================================================================
  nodesRight( size = 1 )
  { // return the node directly right of this one.
//=============================================================================

    const { tree, width, height } = this._data;

    const row = Math.floor( this.index / width );
    const col = ( this.index % width );

    if ( col >= width - 1 ) return null;

    const startRow = row - Math.floor( size / 2 );
    const endRow = startRow + size;
    const list = [];

    for ( let i = startRow, l = endRow; i < l; i++ ) {
      if ( !tree[i] ) {
        list.push( null );

      } else {
        list.push( tree[i][col + 1] );

      }
    };

    return list.filter( n => !!n ).sort( ( a, b ) => {
      const c = Math.floor( a.id / width );
      const d = Math.floor( b.id / width );

      return Math.abs( a - row ) - Math.abs( b - row )

    } )[0];

  }

//=============================================================================
  nodesDown( size = 1 )
  { // return the node directly below this one.
//=============================================================================

    const { tree, width, height } = this._data;

    const row = Math.floor( this.index / width );
    const col = ( this.index % width );

    if ( row >= height - 1 ) return null;

    const startCol = col - Math.floor( size / 2 );
    const endCol = startCol + size;
    const list = [];

    for ( let i = startCol, l = endCol; i < l; i++ ) {
      list.push( tree[row + 1][i] );
    };

    return list.filter( n => !!n ).sort( ( a, b ) => {
      const c = ( a.id % width );
      const d = ( b.id % width );

      return Math.abs( a - col ) - Math.abs( b - col )

    } )[0];

  }

//=============================================================================
  nodesUp( size = 1 )
  { // return the node directly above this one.
//=============================================================================

    const { tree, width, height } = this._data;

    const row = Math.floor( this.index / width );
    const col = ( this.index % width );

    if ( row <= 0 ) return null;

    const startCol = col - Math.floor( size / 2 );
    const endCol = startCol + size;
    const list = [];

    for ( let i = startCol, l = endCol; i < l; i++ ) {
      list.push( tree[row - 1][i] );
    };

    return list.filter( n => !!n ).sort( ( a, b ) => {
      const c = ( a.id % width );
      const d = ( b.id % width );

      return Math.abs( a - col ) - Math.abs( b - col )

    } )[0];

  }

//=============================================================================
  updateInput()
  { // update input from keyboard/controller.
//=============================================================================

    this.updateUpKey();
    this.updateDownKey();
    this.updateLeftKey();
    this.updateRightKey();
    this.updateOkKey();

  }

//=============================================================================
  getChildrenNodes( node )
  { // find any children nodes attached to this node.
//=============================================================================

    const allNodes = this.allNodes();

    return allNodes.filter( n => n.parents.includes( node.id ) );

  }

//=============================================================================
  getParentNodes( node )
  { // return all parent nodes.
//=============================================================================

    return node.parents.map( id => this.nodeFromId( id ) );

  }

//=============================================================================
  findNodeAbove( node, list )
  { // find any nodes in the list that are ABOVE the node provided.
//=============================================================================

    const pos0 = this.getNodePosition( node.id );
    const positions = [];
    let result = null;

    for ( let i = 0, l = list.length; i < l; i++ ) {
      const pos1 = this.getNodePosition( list[i] );
      if ( ( pos0.y - pos1.y ) > 0 ) {
        if ( !result || result && ( pos0.x - pos1.x ) == 0 ) result = list[i];
      }
    };

    return result;

  }

//=============================================================================
  findNodeBelow( node, list )
  { // find any nodes in the list that are BELOW the node provided.
//=============================================================================

    const pos0 = this.getNodePosition( node.id );
    const positions = [];
    let result = null;

    for ( let i = 0, l = list.length; i < l; i++ ) {
      const pos1 = this.getNodePosition( list[i] );
      if ( ( pos0.y - pos1.y ) < 0 ) {
        if ( !result || result && ( pos0.x - pos1.x ) == 0 ) result = list[i];
      }
    };

    return result;

  }

//=============================================================================
  findNodeLeft( node, list )
  { // find any nodes in the list that are too the LEFT the node provided.
//=============================================================================

    const pos0 = this.getNodePosition( node.id );
    const positions = [];
    let result = null;

    for ( let i = 0, l = list.length; i < l; i++ ) {
      const pos1 = this.getNodePosition( list[i] );
      if ( ( pos0.x - pos1.x ) > 0 ) {
        if ( !result || result && ( pos0.y - pos1.y ) == 0 ) result = list[i];
      }
    };

    return result;

  }

//=============================================================================
  findNodeRight( node, list )
  { // find any nodes in the list that are too the LEFT the node provided.
//=============================================================================

    const pos0 = this.getNodePosition( node.id );
    const positions = [];
    let result = null;

    for ( let i = 0, l = list.length; i < l; i++ ) {
      const pos1 = this.getNodePosition( list[i] );
      if ( ( pos0.x - pos1.x ) < 0 ) {
        if ( !result || result && ( pos0.y - pos1.y ) == 0 ) result = list[i];
      }
    };

    return result;

  }

//=============================================================================
  updateUpKey()
  { // update when up is pressed.
//=============================================================================

    if ( Input.isTriggered( 'up' ) ) {

      let next = this.nodesUp( 1 );
      if ( !next ) {
        let node = this.currentNode();
        next = this.findNodeAbove( node, this.getChildrenNodes( node ) );
        if ( !next ) {
          next = this.findNodeAbove( node, this.getParentNodes( node ) );
          if ( !next ) {
            next = this.nodesUp( 3 );
          }
        }
      }

      if ( next && this.index != next.id ) {
        this.index = next.id;
        SoundManager.playCursor();
        this.keepNodeInFrame();
      }

    }

  }

//=============================================================================
  updateDownKey()
  { // update when down is pressed.
//=============================================================================

    if ( Input.isTriggered( 'down' ) ) {

      let next = this.nodesDown( 1 );
      if ( !next ) {
        let node = this.currentNode();
        next = this.findNodeBelow( node, this.getChildrenNodes( node ) );
        if ( !next ) {
          next = this.findNodeBelow( node, this.getParentNodes( node ) );
          if ( !next ) {
            next = this.nodesDown( 3 );
          }
        }
      }

      if ( next && this.index != next.id ) {
        this.index = next.id;
        SoundManager.playCursor();
        this.keepNodeInFrame();
      }

    }

  }

//=============================================================================
  updateLeftKey()
  { // update left key.
//=============================================================================

    if ( Input.isTriggered( 'left' ) ) {

      let next = this.nodesLeft( 1 );
      if ( !next ) {
        let node = this.currentNode();
        next = this.findNodeLeft( node, this.getChildrenNodes( node ) );
        if ( !next ) {
          next = this.findNodeLeft( node, this.getParentNodes( node ) );
          if ( !next ) {
            next = this.nodesLeft( 3 );
          }
        }
      }

      if ( next && this.index != next.id ) {
        this.index = next.id;
        SoundManager.playCursor();
        this.keepNodeInFrame();
      }

    }

  }

//=============================================================================
  updateRightKey()
  { // update right key press.
//=============================================================================

    if ( Input.isTriggered( 'right' ) ) {

      let next = this.nodesRight( 1 );
      if ( !next ) {
        let node = this.currentNode();
        next = this.findNodeRight( node, this.getChildrenNodes( node ) );
        if ( !next ) {
          next = this.findNodeRight( node, this.getParentNodes( node ) );
          if ( !next ) {
            next = this.nodesRight( 3 );
          }
        }
      }

      if ( next && this.index != next.id ) {
        this.index = next.id;
        SoundManager.playCursor();
        this.keepNodeInFrame()
      }

    }

  }

//=============================================================================
  updateOkKey()
  { // update when the ok key is pressed.
//=============================================================================

    if ( Input.isTriggered( 'ok' ) ) this.processOk();

  }

//=============================================================================
  processOk()
  { // process when ok is pressed/node is clicked.
//=============================================================================

    const node = this.currentNode();
    if ( this.canLearnNode( node ) ) {
      this.learnNode( node );
      this.keepNodeInFrame();
    } else {
      SoundManager.playBuzzer();
    }

  }

//=============================================================================
  keepNodeInFrame()
  { // ensure the current node is in frame!.
//=============================================================================

    const position = this.getNodePosition( this.currentNode() );
    const { x:ox, y:oy } = this.getGlobalPosition( new Point(), true );
    const tileSize = this._data.tileSize;

    const realY = oy + position.y

    const padding = 0; //this.scrollPadding();

    const limit = Graphics.boxHeight - padding;
    if ( realY + tileSize / 2 > limit ) {
      this.y += limit - ( realY + tileSize / 2 );

    } else if ( realY - tileSize < 0 ) {
      this.y -= ( realY - tileSize / 2 );

    }

    this.y = this.y.clamp( -this.height, 0 );

  }

//=============================================================================
  learnNode( node )
  { // learn the node, and start the event.
//=============================================================================

    this.parent._actor.learnSkill( node.skillId );
    this.payNodeCost( node );
    this.playLearnAnime( node );
    AudioManager.playSe( this.learnNodeSe() );

  }

//=============================================================================
  playLearnAnime( nodeId )
  { // play animation for learning a node.
//=============================================================================

    const { x, y } = this.getNodePosition( nodeId );
    const animeId = Chaucer.skillTree.params.learnAnime || 0;
    const animation = $dataAnimations[animeId];

    if ( animeId ) {
      this._animeSprite = animation._isMVAnimation ?
      new Sprite_AnimationMV() : new Sprite_Animation();
      this._animationTarget.position.set( x, y );
      if ( Utils.RPGMAKER_NAME == 'MZ' ) {
        this._animeSprite.setup( [this._animationTarget], animation, false, 0 );

      } else {
        this._animeSprite.setup( this._animationTarget, animation, false, 0 );

      }

      this.addChild( this._animeSprite );

    }

  }

//=============================================================================
  learnNodeSe()
  { // return the learn node sound effect.
//=============================================================================

    return Chaucer.skillTree.params.learnSe || {
      name: "", volume: 90, pitch: 100, pan: 0
    }

  }

//=============================================================================
  payNodeCost( node )
  { // pay cost for node to be learned.
//=============================================================================

    SceneManager._scene._actor._usedSp += Number( node.cost );

  }

}

//=============================================================================
window.Sprite_SkillTree = Sprite_SkillTree;
//=============================================================================

//=============================================================================
// Window_SkillName :
//=============================================================================

//=============================================================================
class Window_SkillName extends Window_Base
{ // Window_SkillName

//=============================================================================
  constructor( rectangle )
  { // Called on object creation.
//=============================================================================

    super( rectangle );

  }

//=============================================================================
  setNode( node )
  { // set the current node to read requirements.
//=============================================================================

    this._node = node;
    this.refresh();

  }

//=============================================================================
  refresh()
  { // r3efresh the window.
//=============================================================================

    this.contents.clear();
    const x = 8;
    const y = 0;
    const width = this.contentsWidth() - x * 2;

    this.drawNode( this._node, x, y, width );

  }

//=============================================================================
  drawNode( node, x, y, width )
  { // draw the node at the position specified.
//=============================================================================

    if ( !node ) return;

    const { skillId } = node;
    const item = $dataSkills[skillId];
    const name = item ? item.name : '';
    const iconIndex = item ? item.iconIndex : 0;

    const tWidth = this.textWidth( name );
    this.drawItemName( item, x, y, width, this.lineHeight() );

    // this.drawTextEx( name, x, y, width, 'right' );
    //
    // const src = ImageManager.loadSystem( 'IconSet' );
    //
    // const dx = x + width - tWidth - ImageManager.iconWidth - 8;
    // const dy = y ;
    //
    // this.drawIcon( iconIndex, dx, dy );

  }

}

//=============================================================================
window.Window_SkillName = Window_SkillName;
//=============================================================================

//=============================================================================
class Window_SkillRequirements extends Window_Base
{ // Window_SkillRequirements

//=============================================================================
  constructor( rectangle )
  { // Called on object creation.
//=============================================================================

    super( rectangle );

  }

//=============================================================================
  setNode( node )
  { // set the current node to read requirements.
//=============================================================================

    this._node = node;
    this.refresh();

  }

//=============================================================================
  refresh()
  { // r3efresh the window.
//=============================================================================

    this.contents.clear();
    this.drawRequirements();

  }

//=============================================================================
  drawRequirements()
  { // draw the requirements for the window.
//=============================================================================

    if ( this._node ) {
      const index = this.drawLevelRequirements( 0 );
      this.drawPointsRequirement( index );
    }

  }

//=============================================================================
  drawLevelRequirements( index )
  { // draw the item at the position specified.
//=============================================================================


    if ( this._node.level ) {

      const actor = SceneManager._scene._actor;
      const current = actor ? actor.level : 0;
      const required = this._node.level;
      const color = current < required ? 18 : 0;
      const text0 = `Required Level : `
      const text1 = `${current}`
      const text2 = `/${required}`
      const width0 = this.textWidth( text0 );
      const width1 = this.textWidth( text1 );
      const width2 = this.textWidth( text2 );
      const x = 8;
      const y = 0;

      this.drawTextEx( text0, x, y, width0, 'right' );
      this.drawTextEx( `\\C[${color}]` + text1, x + width0, y, width1, 'right' );
      this.drawTextEx( text2, x + width0 + width1, y, width2, 'right' );

      return index + 1;

    }

    return index;

  }

//=============================================================================
  drawPointsRequirement( index )
  { // draw the cost of currency.
//=============================================================================

    if ( this._node.cost ) {

      const x = 8;
      const y = this.lineHeight() * index;
      const actor = SceneManager._scene._actor;
      const width = this.contentsWidth() - x * 2;
      const current = actor ? actor.unusedSp() : 0;
      const required = this._node.cost;
      const points = Chaucer.skillTree.params.pointsName;
      const text0 = `Required ${points} : `;
      const text1 = String( current );
      const text2 = '/' + String( required );
      const width0 = this.textWidth( text0 );
      const width1 = this.textWidth( text1 );
      const width2 = this.textWidth( text2 );
      const color = current < required ? 18 : 0
      this.drawTextEx( text0, x, y, width0, 'right' );
      this.drawTextEx( `\\C[${color}]` + text1, x + width0, y, width1, 'right' );
      this.drawTextEx( text2, x + width0 + width1, y, width2, 'right' );

    }

  }

}

//=============================================================================
window.Window_SkillRequirements = Window_SkillRequirements;
//=============================================================================

//=============================================================================
// Window_SkillDescription :
//=============================================================================

//=============================================================================
class Window_SkillDescription extends Window_Base
{ // Window_SkillDescription

//=============================================================================
  constructor( rectangle )
  { // Called on object creation.
//=============================================================================

    super( rectangle );

  }

//=============================================================================
  setText( text )
  { // set the current text.
//=============================================================================

    this._text = text;
    this.refresh();

  }

//=============================================================================
  refresh()
  { // refresh the window.
//=============================================================================

    this.contents.clear();
    this.drawDescription();

  }

//=============================================================================
  drawDescription()
  { // draw the current text.
//=============================================================================

    const strings = this._text.split( '\n' );

    this.contents.clear();

    const width = this.contentsWidth() - 8 * 2;

    for ( let i = 0, l = strings.length; i < l; i++ ) {

      const x = 8;
      const y = this.lineHeight() * i;
      this.drawTextEx( strings[i], x, y, width );
    };


  }

}

//=============================================================================
window.Window_SkillDescription = Window_SkillDescription;
//=============================================================================

//=============================================================================
// Sprite_NodeConnector :
//=============================================================================

//=============================================================================
class Sprite_NodeConnector extends Sprite
{ // Sprite_NodeConnector

//=============================================================================
  constructor()
  { // Called on object creation.
//=============================================================================

  }

}

//=============================================================================
window.Sprite_NodeConnector = Sprite_NodeConnector;
//=============================================================================

//=============================================================================
// Scene_SkillTree :
//=============================================================================

//=============================================================================
class Scene_SkillTree extends Scene_MenuBase
{ // Scene_SkillTree

//=============================================================================
  constructor()
  { // Called on object creation.
//=============================================================================

    super();
    this.createInterpreter();

  }

//=============================================================================
  calcWindowHeight( numLines, selectable )
  { // return the height of a window with x amount of lines.
//=============================================================================

    return Window_Base.prototype.fittingHeight( numLines );

  }

//=============================================================================
  isEventRunning()
  { // return if an event is running.
//=============================================================================

    return this._interpreter.isRunning();

  }

//=============================================================================
  startEvent( event )
  { // start a common event.
//=============================================================================

    if ( event ) {
      this._interpreter.setup( event.list );
    }

  }

//=============================================================================
  createInterpreter()
  { // create the interpreter.
//=============================================================================

    this._interpreter = new Game_Interpreter();

  }

//=============================================================================
  initialize()
  { // initialize variables.
//=============================================================================

    super.initialize();
    this._actor = $gameActors.actor( $gameParty._menuActorId );
    this._tree = $dataSkillTrees[this._actor ? this._actor._classId : 0];
    this._editorMode = false;

  }

//=============================================================================
  updateActor()
  { // update the acor.
//=============================================================================

    super.updateActor();
    this._tree = $dataSkillTrees[this._actor ? this._actor._classId : 0];

  }

//=============================================================================
  create()
  { // create the elements of the scene.
//=============================================================================

    super.create();
    this.createBackgroundSprite();
    this.createSkillTree();
    this.createSkillTreeCursor();

    this.createWindowLayer();
    this.createAllWindows();

    this._skillTree.initializeIndex();
    this._skillTree.refresh();

  }

//=============================================================================
  createBackgroundSprite()
  { // create the background spirte.
//=============================================================================

    const url = Chaucer.skillTree.params.treeBackground;

    let bitmap = new Bitmap( Graphics.width, Graphics.height );
    const x = 2;
    const y = 2;
    const width = Math.floor( bitmap.width / 2 ) - 4;
    const height = bitmap.height - 4;
    // bitmap.fillAll( '#1b1d23' );
    bitmap.drawRoundedRect( x, y, width, height, 6, '#adafb3' );
    bitmap.drawRoundedRect( x + 1, y + 1, width - 2, height - 2, 6, '#317c7c' );
    bitmap.drawRoundedRect( x + 1, y + 1, width - 2, height / 2, 6, '#8c6cc0' );
    bitmap.gradientFillRect( x + 1, y + 1 + 6, width - 2, height - 2 - 12, '#8c6cc0', '#317c7c', true );
    if ( url ) {
      let bitmap = ImageManager.loadSystem( url );
    }


    this._treeBackgroundSprite = new Sprite( bitmap );
    this.addChild( this._treeBackgroundSprite );

  }

//=============================================================================
  createSkillTreeCursor()
  { // create the cursor for the tree tree.
//=============================================================================

    const filename = Chaucer.skillTree.params.cursorSprite;

    const width = ( ImageManager.iconWidth || Window_Base._iconWidth ) + 6;
    const height = ( ImageManager.iconHeight || Window_Base._iconHeight ) + 6;

    const backup = new Bitmap( width, height );
    backup.drawRoundedRect( 0, 0, width, height, 5, '#ffffff' );
    backup.clearRoundedRect( 1, 1, width - 2, height - 2, 5 );

    const bitmap = filename ? ImageManager.loadSystem( filename ) : backup;

    this._cursor = new Sprite( bitmap );
    this._cursor.visible = false;
    this._cursor._opacityAngle = 0;
    this._skillTree._cursor = this._cursor;

    this.addChild( this._cursor );

  }

//=============================================================================
  createSkillTree()
  { // create the sprites for all nodes.
//=============================================================================

    this._skillTree = new Sprite_SkillTree( this._tree, this._editorMode );

    this.addChild( this._skillTree );

  }

//=============================================================================
  createAllWindows()
  { // create all windows associated with this scene.
//=============================================================================

    this.createNameWindow();
    this.createDescriptionWindow();
    this.createRequirementsWindow();
    // super.createAllWindows();

  }

//=============================================================================
  nameWindowRect()
  { // return rectangle for the name window.
//=============================================================================

    const height = this.calcWindowHeight( 1 );
    const width = this._skillTree.windowWidth();
    const x = Graphics.boxWidth - width;
    const y = 0;

    return new Rectangle( x, y, width, height );

  }

//=============================================================================
  createNameWindow()
  { // create a window that will display the nodes name.
//=============================================================================

    const rect = this.nameWindowRect();

    this._nameWindow = new Window_SkillName( rect );

    this.addWindow( this._nameWindow );

  }

//=============================================================================
  requirementsWindowRect()
  { // retuirn the rectangle for the requirements window.
//=============================================================================


    let requirementsHeight = Chaucer.skillTree.params.requirementsLineAmount || 2;

    const height = this.calcWindowHeight( requirementsHeight );
    const width = this._skillTree.windowWidth();
    const x = Graphics.boxWidth - width;
    const y = this.calcWindowHeight( 1 );

    return new Rectangle( x, y, width, height );

  }

//=============================================================================
  createRequirementsWindow()
  { // create teh window that displays a nodes cost.
//=============================================================================

    const rect = this.requirementsWindowRect();

    this._requirementsWindow = new Window_SkillRequirements( rect );

    this.addWindow( this._requirementsWindow );

  }

//=============================================================================
  descriptionWindowRect()
  { // return the rectangle for the description window.
//=============================================================================

    const rect = this.requirementsWindowRect();

    const width = this._skillTree.windowWidth();
    const height = Graphics.boxHeight - rect.y - rect.height;
    const x = Graphics.boxWidth - width;
    const y = rect.y + rect.height;

    return new Rectangle( x, y, width, height );

  }

//=============================================================================
  descriptionWindowRows()
  { // return how many rows fit in the description window.
//=============================================================================

    const max = this._descriptionWindow.height;
    let height = 0;
    let n = 0;
    while ( height < max ) {

      n += 1;
      height = this.calcWindowHeight( n );

    }

    return n - 1;
  }

//=============================================================================
  createDescriptionWindow()
  { // create the description window.
//=============================================================================

    const rect = this.descriptionWindowRect();

    this._descriptionWindow = new Window_SkillDescription( rect );

    this.addWindow( this._descriptionWindow );

  }

//=============================================================================
  updateLeftClickCancel()
  { // update cancelling of lef tclick.
//=============================================================================


  }

//=============================================================================
  update()
  { // update the scene.
//=============================================================================

    super.update();
    this.updateExit();

  }

//=============================================================================
  updateExit()
  { // allow exiting the scene via input.
//=============================================================================

    if ( this.isEventRunning() ) return false;
    if ( this._skillTree._animeSprite ) return false;

    if ( Input.isTriggered( 'cancel' ) || TouchInput.isCancelled() ) {
      SoundManager.playCancel();
      this.popScene();
    }

  }

}

//=============================================================================
window.Scene_SkillTree = Scene_SkillTree;
//=============================================================================

  $dataSkillTrees = null;

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

    const identifier =  /(Rosedale Skill Tree) : Version - (\d+.\d+.\d+)/;
    // $._nameError = 'Rosedale Skill Tree was unable to load! Please revert any changes back to normal!';


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

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'start_skill_tree', function( args )
  { // register command for start_skill_tree.
//-----------------------------------------------------------------------------

    $gameParty._menuActorId = Number( args.actor );
    SceneManager.push( Scene_SkillTree );

  } );

//=============================================================================
// Game_Actor :
//=============================================================================

Object.defineProperties( Game_Actor.prototype, {
  sp: {
    get: function() {
      return this._sp + this._bonusSp;
    },
    configurable: true
  }
} );

//-----------------------------------------------------------------------------
  $.alias( Game_Actor, 'initMembers', function()
  { // Aliased initMembers of class Game_Actor.
//-----------------------------------------------------------------------------

    $.alias();
    this._sp = 0;
    this._usedSp = 0;
    this._bonusSp = 0;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Actor, 'skillTree', function()
  { // return the currently associated skill tree.
//-----------------------------------------------------------------------------

    return $dataSkillTrees[this._classId] || null;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Actor, 'totalSp', function()
  { // return the total amount of sp this actor has.
//-----------------------------------------------------------------------------

    return this.sp;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Actor, 'usedSp', function()
  { // return the total amount of USED sp.
//-----------------------------------------------------------------------------

    return this._usedSp;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Actor, 'unusedSp', function()
  { // return the amount of sp that is NOT used.
//-----------------------------------------------------------------------------

    return this.sp - this._usedSp;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Actor, 'setup', function( actorId )
  { // Aliased setup of class Game_Actor.
//-----------------------------------------------------------------------------

    $.alias( actorId );
    this.initSp();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Actor, 'initSp', function()
  { // initialize SP amount.
//-----------------------------------------------------------------------------

    let params = Chaucer.skillTree.params;
    let points = params.pointsPerLevel;

    if ( this.level % params.bonusPointLevels == 0 ) {
      points += params.pointsPerLevel;
    }

    this._sp = Math.max(  points, this._sp );

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Actor, 'levelUp', function()
  { // Aliased levelUp of class Game_Actor.
//-----------------------------------------------------------------------------

    $.alias();
    let params = Chaucer.skillTree.params;
    let points = params.pointsPerLevel * this.level;

    if ( this.level % params.bonusPointLevels == 0 ) {
      points += params.pointsPerLevel;
    }

    this._sp = Math.max(  points, this._sp );

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Actor, 'isSkillInCurrentTree', function( id )
  { // return if the provided skill id is in the current skill tree.
//-----------------------------------------------------------------------------

    const tree = this.skillTree();

    if ( tree ) {
      tree.flat().filter( node => !!node ).some( n => n.skillId == id );
    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Actor, 'removeUsedSp', function( id )
  { // remove the used sp from the skilll being removed.
//-----------------------------------------------------------------------------

    const tree = this.skillTree();

    if ( tree ) {
      const node = tree.flat().filter( node => !!node ).find( n => n.skillId == id );
      if ( node ) this._usedSp -= Number( node.cost );
    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Actor, 'forgetSkill', function( skillId )
  { // Aliased forgetSkill of class Game_Actor.
//-----------------------------------------------------------------------------

    $.alias( skillId );
    if ( this.isSkillInCurrentTree( skillId ) ) {
      this.removeUsedSp( skillId );
    }

  }, false );

//=============================================================================
// Bitmap :
//=============================================================================

//-----------------------------------------------------------------------------
  $.expand( Bitmap, 'clearCircle', function( x, y, radius )
  { // clear a circle.
//-----------------------------------------------------------------------------

    const context = this.context;

    context.save();
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc( x, y, radius, 0, 2 * Math.PI );
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
    context.restore();

    context.globalCompositeOperation = 'source-over';

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Bitmap, 'clearRoundedRect', function( x, y, width, height, radius )
  { // Aliased drawRoundedRect of class Bitmap.
//-----------------------------------------------------------------------------

      const circ = radius * 2;

      for ( let i = 0, l = 4; i < l; i++ ) {
        const ox = radius + ( width - circ ) * ( i % 2 );
        const oy = radius + Math.floor( i / 2 ) * ( height - circ );

        this.clearCircle( x + ox, y + oy, radius );

      };

      this.clearRect( x + radius, y, width - circ, height );
      this.clearRect( x, y + radius, width, height - circ );

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Bitmap, 'drawRoundedRect', function( x, y, width, height, radius, color )
  { // Aliased drawRoundedRect of class Bitmap.
//-----------------------------------------------------------------------------

      const circ = radius * 2;

      for ( let i = 0, l = 4; i < l; i++ ) {
        const ox = radius + ( width - circ ) * ( i % 2 );
        const oy = radius + Math.floor( i / 2 ) * ( height - circ );

        this.drawCircle( x + ox, y + oy, radius, color );

      };

      this.clearRect( radius, y, width - circ, height );
      this.clearRect( x, radius, width, height - circ );
      this.fillRect( radius, y, width - circ, height, color );
      this.clearRect( x, radius, width, height - circ );
      this.fillRect( x, radius, width, height - circ, color );

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Bitmap, 'drawArrow', function( fromX, fromY, toX, toY, width, color = '#ff0000' )
  { // Definition.
//-----------------------------------------------------------------------------

    const context = this.context
    const headSize = 4;
    var angle = Math.atan2( toY - fromY, toX - fromX );

    toX -= Math.cos( angle ) * ( ( width*1.15 ) );
    toY -= Math.sin( angle ) * ( ( width*1.15 ) );

    context.save();

    context.strokeStyle = color;
    context.lineWidth = width;
    context.fillStyle = color;

    context.beginPath();
    context.moveTo( fromX, fromY );
    context.lineTo( toX, toY );
    context.stroke();

    context.beginPath();

    const x0 = toX - headSize * Math.cos( angle - Math.PI / 7 );
    const y0 = toY - headSize * Math.sin( angle - Math.PI / 7 );

    const x1 = toX - headSize * Math.cos( angle + Math.PI / 7 );
    const y1 = toY - headSize * Math.sin( angle + Math.PI / 7 );

    context.moveTo(toX, toY);
    context.lineTo( x0, y0 );
    context.lineTo( x1, y1);
    context.lineTo( toX, toY );
    context.lineTo( x0, y0 );

    context.stroke();
    context.fill();

    context.restore();

    this._baseTexture.update();

  }, false );

//=============================================================================
// DataManager :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( DataManager, 'loadDatabase', function()
  { // Aliased loadDatabase of class DataManager.
//-----------------------------------------------------------------------------

    $.alias();
    const name = "$dataSkillTrees";
    const src = "skilltree/SkillTree.json";

    this.loadDataFile( name, src );

  }, true );

//-----------------------------------------------------------------------------
  $.alias( DataManager, 'onXhrError', function( name, src, url )
  { // Aliased onXhrError of class DataManager.
//-----------------------------------------------------------------------------

    if ( src == 'skilltree/SkillTree.json' ) {
      const fs = require( 'fs' );

      if ( fs ) {
        if ( !fs.existsSync( 'data/skilltree' ) ) fs.mkdirSync( 'data/skilltree');
        fs.writeFileSync( `data/${src}`, JsonEx.stringify( [null] ) );

        this.loadDataFile( name, src );
      }

    } else {
      $.alias();

    }


  }, true );

if ( Utils.RPGMAKER_NAME == 'MV' ) {

  DataManager.loadDataFile = function( name, src ) {
    var xhr = new XMLHttpRequest();
    var url = 'data/' + src;
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = function() {
      if (xhr.status < 400) {
        window[name] = JSON.parse(xhr.responseText);
        DataManager.onLoad(window[name]);
      }
    };

    xhr.onerror = this._mapLoader || function() {

      if ( src == 'skilltree/SkillTree.json' ) {
        const fs = require( 'fs' );
        if ( fs ) {
          if ( !fs.existsSync( 'data/skilltree' ) ) fs.mkdirSync( 'data/skilltree');
          fs.writeFileSync( `data/${src}`, JsonEx.stringify( [null] ) );

          DataManager.loadDataFile( name, src );

        }

      } else {
        DataManager._errorUrl = DataManager._errorUrl || url;

      }

    };

    window[name] = null;
    xhr.send();

  }

}

//=============================================================================
// Scene_Menu :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Scene_Menu, 'createCommandWindow', function()
  { // Aliased createCommandWindow of class Scene_Menu.
//-----------------------------------------------------------------------------

    $.alias();
    this._commandWindow.setHandler( 'skill_tree', this.commandPersonal.bind( this ) );

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Scene_Menu, 'onPersonalOk', function()
  { // Aliased onPersonalOk of class Scene_Menu.
//-----------------------------------------------------------------------------

    if ( this._commandWindow.currentSymbol() == 'skill_tree' ) {
      SceneManager.push( Scene_SkillTree );
    } else {
      $.alias();

    }

  }, false );

//=============================================================================
// Window_Base :
//=============================================================================

if ( Utils.RPGMAKER_NAME === 'MV' ) {

//-----------------------------------------------------------------------------
  $.alias( Window_Base, 'initialize', function( x, y, width, height )
  { // Aliased initialize of class Window_Base.
//-----------------------------------------------------------------------------

    if ( typeof x === 'object' ) {
      height = x.height;
      width = x.width;
      y = x.y;
      x = x.x;
    }

    $.alias( x, y, width, height );


  }, false );

}

//=============================================================================
// Window_MenuCommand :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Window_MenuCommand, 'addOriginalCommands', function()
  { // Aliased addOriginalCommands of class Window_MenuCommand.
//-----------------------------------------------------------------------------

    $.alias();
    if ( this.needsCommand( 'skill_tree' ) ) {
      const enabled = this.isSkillTreeEnabled();
      const name = $.params.menuName;

      this.addCommand( name, 'skill_tree', enabled );
    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Window_MenuCommand, 'isSkillTreeEnabled', function()
  { // return if the skill tree is enabled.
//-----------------------------------------------------------------------------

    const switchId = $.params.enableSwitch;

    if ( switchId ) return $gameSwitches.value( switchId );
    return true;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Window_MenuCommand, 'needsCommand', function( name )
  { // Aliased needsCommand of class Window_MenuCommand.
//-----------------------------------------------------------------------------

    if ( name == 'skill_tree' ) {
      return $.params.inMenu;
    }

    return $.alias( name );

  }, false );

//=============================================================================
} )( Chaucer.skillTree );
//=============================================================================
