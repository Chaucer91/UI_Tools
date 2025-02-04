/*:============================================================================
*
* @target MZ
*
* @author Chaucer
*
* @plugindesc | Skill Tree Builder : Version - 1.0.2 | A GUI for building skill trees in Rosedale Skill Tree Plugin.
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

*   It is very important to read this fully to understand the full toolset
* of this plugin! Please be sure to read the following thoroughly!
*
*   Upon entering the editor mode, you will be automatically greeted with a
* class list. Select the class you wish to create a skill tree for, then at
* the very bottom of the list, you will see an arrow up, click this to hide
* the list, and begin building the skill tree.
*
*   To add nodes to the tree, click any tile in the grid, you will be
* prompted with a new node editor window. This window will allow you to
* specify what skill this node will give access to, as well as how much
* sp is required to learn the skill and even what level!
*
*   After you have created a few nodes, you can make one skill require
* another before it can be learned by clicking the parent skill, and drag
* your cursor the the child node! For example, if you want Node B to to
* only be learnable if Node A is learned then click and hold node A, and
* drag your mouse to Node B! Node B will bo locked unless Node A has been
* learned!
*
*   You can also remove connections by holding ctrl and clicking a node. For
* example, if Node B is child to Node A, you can ctrl + left click on Node
* A and all the child nodes of Node A will be removed!
*
*   After your done building your skill tree's it's IMPORTANT to REMOVE this
* plugin BEFORE exporting your game! If you do not remove this plugin before
* your game is deployed it WILL generate an error. So be warned.
*
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
*  ● Date : ${CURRENT_DATE}/$CURRENT_MONTH/$CURRENT_YEAR
*    ★ Release.

* ● Version : 1.0.1
* ● Date : 18/11/2023
*   ✩ Fix - issue with resizing grid.

* ● Version : 1.0.2
* ● Date : 21/02/2024
*   ✩ Fix - height of node editor window was not scaling properly


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
*  discord : chaucer#7538
*  skypeId : chaucer1991

*============================================================================

*/

//=============================================================================
// TextInputField :
//=============================================================================

/*
* Settings Object :
*
* backgroundColor: the color of the box.
* outlineColor: the color of the outline of the box.
* borderRadius: the radius of the rounded corners( 0 for non-rounded )
* textColor: the color of the text.
* fontSize: the size of the font.
* fontFace: tsans-serifhe name of the font used.
* maxCharacters: the maximum amount of characters allowed.
* minCharacters: the mminimum amount of characters allowed.
*
*/

//=============================================================================
class TextInputField extends Sprite
{ // TextInputField

//=============================================================================
  static get defaults()
  { // retrun default settings for text input field.
//=============================================================================

    return {
      backgroundColor: "#1b1d23",
      highlightColor: '#adafb3',
      outlineColor: '#4a505b',
      activeColor: '#3f7bc7',
      hoverColor: '#d6dadf',
      textColor: '#d6dadf',
      maxCharacters: 100,
      minCharacters: 0,
      borderRadius: 4,
      fontSize: 18,
      fontFace: 'sans-serif',
    }

  }

//=============================================================================
  constructor( width, settings = {} )
  { // Called on object creation.
//=============================================================================

    const defaults = Object.assign( {}, TextInputField.defaults );
    const padding = 8;

    settings = Object.assign( defaults, settings );

    super( new Bitmap( width, settings.fontSize + padding ) );
    this._previousField = null;
    this._nextField = null;
    this._highlighted = [-1, -1];
    this._padding = padding;
    this._hovered = false;
    this._caretIndex = 0;
    this._textX = 0;
    this.createCaret();
    this.createTextSrc();
    this.applySettings( settings );

  }

//=============================================================================
  get backgroundColor()
  { // return the background color.
//=============================================================================

    return this._backgroundColor || TextInputField.defaults.backgroundColor;

  }

//=============================================================================
  set backgroundColor( color )
  { // set the backlground color.
//=============================================================================

    this._backgroundColor = color;
    this.refresh();

  }

//=============================================================================
  get outlineColor()
  { // return the outline color.
//=============================================================================

    return this._outlineColor || TextInputField.defaults.outlineColor;
    this.refresh();

  }

//=============================================================================
  set outlineColor( color )
  { // set the outline color.
//=============================================================================

    this._outlineColor = color;

  }

//=============================================================================
  get highlightColor()
  { // return the highlighted color.
//=============================================================================

    return this._highlightColor || TextInputField.defaults.highlightColor;
    this.refresh();

  }

//=============================================================================
  set highlightColor( color )
  { // set the highlighted color.
//=============================================================================

    this._highlightColor = color;

  }

//=============================================================================
  get hoverColor()
  { // return the hover color.
//=============================================================================

    return this._hoverColor || TextInputField.defaults.hoverColor;
    this.refresh();

  }

//=============================================================================
  set hoverColor( color )
  { // set the hover color.
//=============================================================================

    this._hoverColor = color;

  }

//=============================================================================
  get activeColor()
  { // return the active color.
//=============================================================================

    return this._activeColor || TextInputField.defaults.activeColor;
    this.refresh();

  }

//=============================================================================
  set activeColor( color )
  { // set the active color.
//=============================================================================

    this._activeColor = color;

  }

//=============================================================================
  get borderRadius()
  { // retur nthe border radius.
//=============================================================================

    return this._borderRadius || TextInputField.defaults.borderRadius;
    this.refresh();

  }

//=============================================================================
  set borderRadius( pixels )
  { // set the size of the border radius in pixels.
//=============================================================================

    ths._borderRadius = pixels;

  }

//=============================================================================
  get textColor()
  { // return the current text color for the input field.
//=============================================================================

    return this.bitmap.textColor || TextInputField.defaults.textColor;

  }

//=============================================================================
  set textColor( color )
  { // set the text color.
//=============================================================================

    this._caret.bitmap.textColor = this.textColor;
    this._textSrc.textColor = color;
    this.bitmap.textColor = color;
    this.refreshCaret();
    this.refresh();

  }

//=============================================================================
  get fontSize()
  { // return the current font size for the input field.
//=============================================================================

    return this.bitmap.fontSize || TextInputField.defaults.fontSize;

  }

//=============================================================================
  set fontSize( size )
  { // set the font size.
//=============================================================================

    this.bitmap.fontSize = size;
    this._textSrc.fontSize = size;
    this._caret.bitmap.fontSize = size;

    this.refreshCaret();
    this.refresh();
  }

//=============================================================================
  get fontFace()
  { // return the current font for the input field.
//=============================================================================

    return this.bitmap.fontFace || TextInputField.defaults.fontFace;

  }

//=============================================================================
  set fontFace( font )
  { // set the font.
//=============================================================================

    this._caret.bitmap.fontFace = this.fontFace;
    this._textSrc.fontFace = font;
    this.bitmap.fontFace = font;
    this.refreshCaret();
    this.refresh();

  }

//=============================================================================
  get text()
  { // return the current text.
//=============================================================================

    return this._text || '';

  }

//=============================================================================
  set text( text )
  { // set the text.
//=============================================================================

    this._text = text;
    this.refresh();

  }

//=============================================================================
  get hovered()
  { // return if the box is hovered over.
//=============================================================================

    return this._hovered || false;

  }

//=============================================================================
  set hovered( value )
  { // set if the box is hovered over.
//=============================================================================

    if ( this._hovered != value ) {
      this._hovered = value;
      this.refresh();
    }

  }

//=============================================================================
  get caretIndex ()
  { // return the current index of the caret.
//=============================================================================

    return this._caretIndex || 0;
  }

//=============================================================================
  set caretIndex ( index )
  { // set teh index of the caret.
//=============================================================================

    this._caretIndex = index;
    const textToCaret = this.text.slice( 0, this._caretIndex );
    const tWidth = Math.ceil( this._textSrc.measureTextWidth( textToCaret ) );
    const maxWidth = this.width - this._padding * 2;
    const minWidth = 0;

    const p = this._padding;

    let cx = this._textSrc.measureTextWidth( textToCaret ) - this._textX;

    if ( cx >= maxWidth ) {
      this._textX += cx - maxWidth;

    } else if ( cx < minWidth ) {
      this._textX -=  minWidth - cx;

    }

  }

//=============================================================================
  setOkHandler( fn )
  { // set handler for when the okay button is pressed.
//=============================================================================

    this._okHandler = fn;

  }

//=============================================================================
  canActivate()
  { // retunr if we can activate.
//=============================================================================

    if ( Chaucer.treeBuilder._activeInputField ) {
      const previous = Chaucer.treeBuilder._activeInputField;
      const parent = Chaucer.treeBuilder._activeInputField.parent;
      if ( parent.constructor.name == 'DropDownField' ) {
        if ( previous.visible && previous._active ) {
          return !previous.mouseInBounds();
        }
      }
    }
    return true;

  }

//=============================================================================
  activate()
  { // activate the text input field.
//=============================================================================

    if ( !this._active && this.canActivate() ) {
      this._active = true;
      Chaucer.treeBuilder._activeInputField = this;
      this.refresh();
    }

  }

//=============================================================================
  deactivate()
  { // deactiveate the text input field.
//=============================================================================

    if ( this._active ) {
      this._active = false;
      if ( Chaucer.treeBuilder._activeInputField == this ) {
        Chaucer.treeBuilder._activeInputField = null;
      }
      this.refresh();
    }

  }

//=============================================================================
  applySettings( settings )
  { // apply settings to the sprite.
//=============================================================================

    this._highlightColor = settings.highlightColor;
    this._backgroundColor = settings.backgroundColor;
    this._hoverColor = settings.hoverColor;
    this._outlineColor = settings.outlineColor;
    this._borderRadius = settings.borderRadius;
    this.textColor = settings.textColor;
    this.fontFace = settings.fontFace || this.bitmap.fontFace;
    this.fontSize = settings.fontSize;
    this._minCharacters = settings.minCharacters;
    this._maxCharacters = settings.maxCharacters;

    this.refresh();
    this.refreshCaret();

  }

//=============================================================================
  createCaret()
  { // create the caret.
//=============================================================================

    this._caret = new Sprite( new Bitmap( 100, 100 ) );
    this._caret.bitmap.fontFace = 'sans-serif';
    this.addChild( this._caret );
    this._caret.visible = false;
    this._caret._timer = 0;
    this.refreshCaret();
    this._text = '';

  }

//=============================================================================
  createTextSrc()
  { // create a new bitmap used to contain text input.
//=============================================================================

    this._textSrc = new Bitmap( this.width, this.height );

  }

//=============================================================================
  refresh()
  { // refresh the text input field.
//=============================================================================

    this.refreshSize();
    this.bitmap.clear();
    this.refreshBackground();
    this.refreshText();

  }

//=============================================================================
  refreshSize()
  { // refresh the size of the text input field based on font size.
//=============================================================================

    const width = this.width;
    const height = this.bitmap.fontSize + this._padding * 2;

    this._textSrc.resize( 1000, height );
    this.bitmap.resize( width, height );
    this.height = height;
    this.width = width;


  }

//=============================================================================
  refreshBackground()
  { // refresh the background.
//=============================================================================

    const color1 = this.backgroundColor;
    const color0 = this._active ? this.activeColor : this._hovered ? this.outlineColor : this.hoveredColor;
    const radius = this.borderRadius;
    const height = this.height;
    const width = this.width;
    const circ = radius * 2;
    const p = 2;

    this.bitmap.clear();

    if ( radius ) { // if we have rounded corners.
      this.bitmap.drawRoundedRect( 0, 0, width, height, radius, color0 );
      this.bitmap.drawRoundedRect( p, p, width - p * 2, height - p * 2, radius, color1 );

    } else {
      this.bitmap.fillRect( 0, 0, width, height, color0 );
      this.bitmap.fillRect( p, p, width - p * 2, height - p * 2, color1 );

    }

    this.refreshHighlight();

  }

//=============================================================================
  refreshHighlight()
  { // refresh highlight if necessary.
//=============================================================================

    const [a, b] = this._highlighted;

    if ( a >= 0 && b >= 0 ) {

      const p = this._padding;
      const src = this._textSrc;
      const color = this.highlightColor;
      const min = Math.min( a, b );
      const max = Math.max( a, b );
      const text = this.text;
      const x = p + Math.floor( src.measureTextWidth( text.slice( 0, min ) ) );
      const y = p;
      const ox = this._textX;

      const width = Math.ceil( src.measureTextWidth( text.slice( min, max ) ) );
      const height = this.fontSize;

      this.bitmap.fillRect( x - ox, y, width, height, color );

    }

  }

//=============================================================================
  refreshText()
  { // refresh the text.
//=============================================================================


    if ( this.text ) {

      const width = Math.ceil( this._textSrc.measureTextWidth( this.text ) );
      const fontSize = this._textSrc.fontSize;
      const height = fontSize + this._padding * 2;
      const p = this._padding;

      const ox = this._textX;

      const dw = this.width - p * 2;
      const dh = height;
      const dx = p;
      const dy = 0;

      this._textSrc.clear();
      this._textSrc.fontFace = 'sans-serif';
      this._textSrc.drawText( this.text, 0, 0, width, height );

      this.bitmap.blt( this._textSrc, ox, 0, dw, height, dx, dy, dw, dh );

    }

  }

//=============================================================================
  refreshCaret()
  { // refresh the caret after font changes.
//=============================================================================

    this.refreshCaretSize();
    this.refreshCaretSprite();

  }

//=============================================================================
  refreshCaretSize()
  { // refresh the size of the caret.
//=============================================================================

    const width = Math.ceil( this.bitmap.measureTextWidth( '|' ) );
    const height = this.height;

    this._caret.bitmap.resize( width, height );
    this._caret.height = height;
    this._caret.width = width;

  }

//=============================================================================
  refreshCaretSprite()
  { // refresh the caret sprite.
//=============================================================================

    const width = this._caret.width;
    const height = this._caret.height;

    this._caret.bitmap.clear();
    this._caret.bitmap.drawText( '|', 0, 0, width, height );

  }

//=============================================================================
  update()
  { // update the sprite.
//=============================================================================

    super.update();
    this.updateCaret();
    this.updateHover();
    this.updateActivation();
  }

//=============================================================================
  updateCaret()
  { // update the caret.
//=============================================================================

    this.updateCaretVisible();
    this.updateCaretPosition();

  }

//=============================================================================
  updateCaretVisible()
  { // update if the caret is visible.
//=============================================================================

    if ( this._active ) {

      if ( this._caret._timer++ >= 30 ) {
        this._caret.visible = !this._caret.visible;
        this._caret._timer = 0;
      };

    } else {

      this._caret.visible = false;
      this._caret._timer = 0;

    }

  }

//=============================================================================
  updateCaretPosition()
  { // update the position of the caret.
//=============================================================================

    const textToCaret = this.text.slice( 0, this._caretIndex );
    let ox = this._textSrc.measureTextWidth( textToCaret ) - this._textX;

    this._caret.x = this._padding + ox;

  }

//=============================================================================
  updateInput( event )
  { // update the input from text.
//=============================================================================

      const { ctrlKey, shiftKey, key } = event;

      if ( key == 'Tab' ) {
        this.changeUiField( ctrlKey, shiftKey );

      }else if ( key == 'Home' ) {
        this.moveToStart( ctrlKey, shiftKey );

      } else if ( key == 'End' ) {
        this.moveToEnd( ctrlKey, shiftKey );

      } else if ( key == 'Delete' ) {
        this.deleteCharacter();

      } else if ( key == 'ArrowLeft' ) {
        this.moveCaretLeft( ctrlKey, shiftKey );

      } else if ( key == 'ArrowRight' ) {
        this.moveCaretRight( ctrlKey, shiftKey );

      }

      if ( key.length === 1 ) {

        if ( key === 'a' && ctrlKey ) {
          this.highlightAll();

        } else if ( key === 'v' && ctrlKey ) {
          this.pasteText();

        } else if ( key == 'c' && ctrlKey ) {
          this.copyText();

        } else if ( key == 'x' && ctrlKey ) {
          this.cutText();

        } else {
          this.addCharacter( key );

        }

      } else if (key === 'Backspace') {
        this.removeCharacter();

      } else if (key === 'Esc') {
        this.processCancel();

      } else if (key === 'Enter') {
        this.processOk();

      }

      this.refresh();

  }

//=============================================================================
  pasteText()
  { // print content from clipboard to log window.
//=============================================================================
    if (navigator.clipboard) {

      // Read from the clipboard
      navigator.clipboard.readText()
      .then(clipboardData => {
        if ( typeof clipboardData == 'string' ) {
          this.addCharacter( clipboardData );
        }
      }, this )

    }

  }

//=============================================================================
  getHighlightedText()
  { // return the highlighted text.
//=============================================================================

    const [a, b] = this._highlighted;

    if ( a >= 0 && b >= 0 ) {

      const min = Math.min( a, b );
      const max = Math.max( a, b );

      const len = this.text.length;
      const text = this.text;

      return  text.slice( min, max );


    }

    return '';

  }

//=============================================================================
  copyText()
  { // copy highlighted text to clipboard.
//=============================================================================

    // Write to the clipboard
    const text = this.getHighlightedText();
    if ( text.length > 0 ) {
      navigator.clipboard.writeText( text )
      .then(() => {
        console.log( 'Data copied to clipboard:', text );
      }, this );

    }


  }

//=============================================================================
  cutText()
  { // cut text.
//=============================================================================

    this.copyText();
    this.deleteHighlighted();

  }

//=============================================================================
  changeUiField( ctrl, shift )
  { // change to the next or previous input field via tab input.
//=============================================================================

    if ( shift && this._previousField ) {
      this.deactivate();
      this._previousField.activate();

    } else if ( this._nextField ) {
      this.deactivate();
      this._nextField.activate();

    }

  }

//=============================================================================
  moveToStart( ctrl, shift )
  { // omve the caret to the start of the line.
//=============================================================================

    const nextIndex = 0;

    if ( shift ) {
      if ( this._highlighted[0] < 0 ) this._highlighted[0] = this.caretIndex;
      this._highlighted[1] = nextIndex;
    }

    this.caretIndex = nextIndex;

  }

//=============================================================================
  moveToEnd( ctrl, shift )
  { // move the caret to the end of the line.
//=============================================================================

    const nextIndex = this.text.length;

    if ( shift ) {
      if ( this._highlighted[0] < 0 ) this._highlighted[0] = this.caretIndex;
      this._highlighted[1] = nextIndex;
    }

    this.caretIndex = nextIndex;

  }

//=============================================================================
  deleteCharacter()
  { // Definition.
//=============================================================================

    if ( this._highlighted[0] >= 0 && this._highlighted[1] >= 0 ) {
      this.deleteHighlighted();

    } else {
      const a = this.text.slice( 0, this._caretIndex );
      const b = this.text.slice( this._caretIndex );
      this.text = a + b.slice( 1 );

      if ( this._okHandler ) this._okHandler( this.text );

    }

  }

//=============================================================================
  moveCaretLeft( ctrl, shift )
  { // move the caret to the left.
//=============================================================================

    let nextIndex = this.caretIndex;

    if ( ctrl ) {

      const start = Math.min( this.caretIndex - 1, this.text.length );

      for ( let i = start, l = 0; i >= l; i-- ) {

        if ( this.text[i] == undefined ) continue;
        nextIndex = i;
        if ( this.text[i].match( /[\n\s*\n:-]/ ) ) break;

      };

      nextIndex = Math.min( nextIndex, this.text.length );

    } else {
      nextIndex = Math.max( this._caretIndex - 1, 0 );

    }

    if ( !shift ) {
      this._highlighted = [-1, -1];

    } else {
      if ( this._highlighted[0] < 0 ) this._highlighted[0] = this.caretIndex;
      this._highlighted[1] = nextIndex;
    }

    this.caretIndex = nextIndex;

  }

//=============================================================================
   moveCaretRight( ctrl, shift )
  { // move the caret to the right.
//=============================================================================

    let nextIndex = this.caretIndex;

    if ( ctrl ) {

      for ( let i = this.caretIndex + 1, l = this.text.length; i < l; i++ ) {
        if ( this.text[i].match( /[\n\s*\n:-]/ ) ) break;
        nextIndex = i + 1;
      };

      nextIndex = Math.min( nextIndex, this.text.length );

    } else {
      nextIndex = Math.min( this._caretIndex + 1, this.text.length );

    }

    if ( !shift ) {
      this._highlighted = [-1, -1];

    } else {
      if ( this._highlighted[0] < 0 ) this._highlighted[0] = this.caretIndex;
      this._highlighted[1] = nextIndex;
    }

    this.caretIndex = nextIndex;

  }

//=============================================================================
  deleteHighlighted()
  { // delete the highlighted text.
//=============================================================================

    const [a, b] = this._highlighted;

    if ( a >= 0 && b >= 0 ) {

      const min = Math.min( a, b );
      const max = Math.max( a, b );

      const len = this.text.length;
      const text = this.text;

      this.text = text.slice( 0, min ) + text.slice( max, len );
      this._highlighted = [-1, -1];
      this._caretIndex -= max - min;
      if ( this._okHandler ) this._okHandler( this.text );

    }

  }

//=============================================================================
  highlightAll()
  { // highlight the entire string.
//=============================================================================

    this._highlighted = [0, this.text.length];
    this.caretIndex = this.text.length;

  }

//=============================================================================
  addCharacter( char )
  { // add character to text.
//=============================================================================

    this.deleteHighlighted();

    const a = this.text.slice( 0, this._caretIndex );
    const b = this.text.slice( this._caretIndex );

    this.text = a + char + b;
    this.caretIndex += char.length;
    if ( this._okHandler ) this._okHandler( this.text );

  }

//=============================================================================
  removeCharacter()
  { // remove the character at the current index of the caret.
//=============================================================================

    if ( this._highlighted[0] >= 0 && this._highlighted[1] >= 0 ) {
      this.deleteHighlighted();

    } else {
      const a = this.text.slice( 0, this._caretIndex );
      const b = this.text.slice( this._caretIndex );

      this.text = a.slice(0, -1) + b;
      this.moveCaretLeft();

      if ( this._okHandler ) this._okHandler( this.text );

    }

  }

//=============================================================================
  processOk()
  { // update the handlers when pressing cancel or ok.
//=============================================================================

    if ( this._okHandler ) this._okHandler( this.text );
    this.deactivate();
    if ( this._nextField ) this._nextField.activate();

  }

//=============================================================================
  processCancel()
  { // Definition.
//=============================================================================

    this.deactivate();

  }

//=============================================================================
  mouseInBounds()
  { // return if the input field is clicked.
//=============================================================================

    if ( !this.canActivate() ) return false;

    const { x, y } = this.getGlobalPosition( new Point(), true )
    const { x:tx, y:ty } = TouchInput;
    const { width, height } = this;

    const cx = tx > x && tx < x + width;
    const cy = ty > y && ty < y + height;
    return cx && cy;

  }

//=============================================================================
  updateHover()
  { // update if the box is being hovered over.
//=============================================================================

    this.hovered = this.mouseInBounds();

  }

//=============================================================================
  updateActivation()
  { // update activation by click.
//=============================================================================

    if ( TouchInput.isTriggered() ) {

      if ( this.mouseInBounds() ) {
        this.activate();

      } else {
        this.deactivate();

      }

    }

  }

//=============================================================================
  setNextField( field )
  { // set the next UI object to be triggered when tab is pressed.
//=============================================================================

    this._nextField = field;
    field._previousField = this;

  }

}

//=============================================================================
class NumberInputField extends TextInputField
{ // NumberInputField

//=============================================================================
  static get defaults()
  { // retrun default settings for text input field.
//=============================================================================

    return {
      backgroundColor: "#1b1d23",
      highlightColor: '#adafb3',
      outlineColor: '#4a505b',
      activeColor: '#3f7bc7',
      hoverColor: '#d6dadf',
      textColor: '#d6dadf',
      maxCharacters: 100,
      minCharacters: 0,
      borderRadius: 4,
      fontSize: 18,
      fontFace: 'sans-serif',
      maxValue: 1000,
      minValue: 0,
    }

  }

//=============================================================================
  constructor( width, settings = {} )
  { // Called on object creation.
//=============================================================================

    const defaults = Object.assign( {}, NumberInputField.defaults );

    settings = Object.assign( defaults, settings );

    super( width, settings );
    this.value = this.minValue;
    this.caretIndex = this.text.length;
  }

//=============================================================================
  get value()
  { // return the value of the input field.
//=============================================================================

    return this._value || 0;

  }

//=============================================================================
  set value( value )
  { // set the value of the text input field.
//=============================================================================

    if ( !isNaN( value ) ) {
      this._value = value.clamp( this.minValue, this.maxValue );
      this.refresh();
    }

  }

//=============================================================================
  get text()
  { // return the text.
//=============================================================================

    return String( this.value ) || '0';

  }

//=============================================================================
  set text( value )
  { // set the text to the value specified.
//=============================================================================

    this.value = Number( value );

  }

//=============================================================================
  get maxValue()
  { // return the max value.
//=============================================================================

    return this._maxValue || 0;

  }

//=============================================================================
  set maxValue( value )
  { // return the max value.
//=============================================================================

    this._maxValue = value;
    this.value = value;

  }

//=============================================================================
  get minValue()
  { // retur nthe minimum value this field can go down to.
//=============================================================================

    return this._minValue || 0;

  }

//=============================================================================
  set minValue( value )
  { // set the minimum value this field can go to.
//=============================================================================

    this._minValue = value;
    this.value = value;

  }

//=============================================================================
  applySettings( settings )
  { // apply settings to the input field.
//=============================================================================

    this.maxValue = settings.maxValue;
    this.minValue = settings.minValue;
    super.applySettings( settings );
  }

//=============================================================================
  refreshBackground()
  { // refresh the nummber input field.
//=============================================================================

    super.refreshBackground();

  }

//=============================================================================
  updateInput( event )
  { // update input from keyboard.
//=============================================================================

    const { shiftKey, key } = event;

    if ( key == 'ArrowUp' ) {
      this.increaseValue( shiftKey );

    } else if ( key == 'ArrowDown' ) {
      this.decreaseValue( shiftKey );

    } else {
      super.updateInput( event );

    }

  }

//=============================================================================
  increaseValue( shift )
  { // increase the current value.
//=============================================================================

    const len = this.text.length;
    const atEnd = this.caretIndex === len;

    this.value += shift ? 10 : 1;
    if ( this._okHandler ) this._okHandler( this._value );

    if ( atEnd && len < this.text.length ) this.caretIndex++;

  }

//=============================================================================
  decreaseValue( shift )
  { // decrease the value.
//=============================================================================

    this.value -= shift ? 10 : 1;
    if ( this._okHandler ) this._okHandler( this._value );

  }

//=============================================================================
  addCharacter( character )
  { // add a character, but only accept numbers.
//=============================================================================

    if ( character.match( /[0-9]/ ) ) {
      super.addCharacter( character );
    }

  }

//=============================================================================
  removeCharacter()
  { // remove character.
//=============================================================================

    const isZero = this.value == 0;
    const lastIndex = this.caretIndex;

    super.removeCharacter();

    if ( isZero ) this.caretIndex = lastIndex;

  }

//=============================================================================
  update()
  { // update the input field.
//=============================================================================

    super.update();
    this.updateScrollWheel();

  }

//=============================================================================
  updateScrollWheel()
  { // update scroll wheel number change.
//=============================================================================

    if ( this.mouseInBounds() ) {

      if ( TouchInput.wheelY < 0 ) this.increaseValue();
      if ( TouchInput.wheelY > 0 ) this.decreaseValue();

    }

  }

}

//=============================================================================
class NoteInputField extends TextInputField
{ // NoteInputField

//=============================================================================
  constructor( width, lines, settings )
  { // Called on object creation.
//=============================================================================

    super( width, settings );
    this.lineCount = lines

  }

//=============================================================================
  get lineCount()
  { // return the amount of lines in this text input field.
//=============================================================================

    return this._lineCount || 1;

  }

//=============================================================================
  set lineCount( value )
  { // set the line count.
//=============================================================================

    if ( !isNaN( value ) ) {
      this._lineCount = value.clamp( 1, 100 );
      this.refresh();
    }

  }

//=============================================================================
  get caretIndex()
  { // return the caret index.
//=============================================================================

    return this._caretIndex;

  }

//=============================================================================
  set caretIndex ( index )
  { // set teh index of the caret.
//=============================================================================

    this._caretIndex = index;

    const lineIndex = this.caretIndexInCurrentLine();
    const currentLine = this.currentLine();

    const textToCaret = currentLine.slice( 0, lineIndex );
    const tWidth = Math.ceil( this._textSrc.measureTextWidth( textToCaret ) );
    const maxWidth = this.width - this._padding * 2;
    const minWidth = 0;

    const p = this._padding;

    let cx = this._textSrc.measureTextWidth( textToCaret ) - this._textX;

    if ( cx >= maxWidth ) {
      this._textX += cx - maxWidth;

    } else if ( cx < minWidth ) {
      this._textX -=  minWidth - cx;

    }

  }

//=============================================================================
  refreshSize()
  { // refresh the size of the text input field based on font size.
//=============================================================================

    const width = this.width;
    const lineCount = this.lineCount;
    const height = ( this.bitmap.fontSize * lineCount ) + this._padding * 2;

    this._textSrc.resize( 1000, height );
    this.bitmap.resize( width, height );
    this.height = height;
    this.width = width;


  }

//=============================================================================
  allLines()
  { // return all lines in an array.
//=============================================================================

    const text = this.text;
    const cIndex = this.caretIndex;
    return this.text.split( '\n' );

  }

//=============================================================================
  currentLineIndex()
  { // return the index of the current line.
//=============================================================================

    const text = this.text;
    const cIndex = this.caretIndex;
    const lines = this.text.split( '\n' );
    return ( text.slice( 0, cIndex ).match( /\n/g ) || [] ).length;

  }

//=============================================================================
  currentLine()
  { // return the current line.
//=============================================================================

    const text = this.text;
    const cIndex = this.caretIndex;
    const lines = this.text.split( '\n' );
    const lIndex = ( text.slice( 0, cIndex ).match( /\n/g ) || [] ).length;
    return lines[lIndex];

  }

//=============================================================================
  totalLines()
  { // return the total amount of lines in the note input field.
//=============================================================================

    return this.text.split( '\n' ).length;

  }

//=============================================================================
  caretIndexInCurrentLine()
  { // return the caret index in the current line.
//=============================================================================

    const text = this.text;
    const cIndex = this.caretIndex;
    const lines = this.text.split( '\n' );
    const lIndex = ( text.slice( 0, cIndex ).match( /\n/g ) || [] ).length;
    const line = lines[lIndex];
    let currentIndex = cIndex;

    for ( let i = 0, l = lIndex; i < l; i++ ) {
      currentIndex -= lines[i].length + 1;
    };

    return currentIndex;

  }

//=============================================================================
  updateCaretPosition()
  { // update the position of the caret.
//=============================================================================

    // const textToCaret = this.text.slice( 0, this._caretIndex );
    const index = ( this.text.slice( 0, this.caretIndex ).match( /\n/g ) || [] ).length;
    const fontSize = this._textSrc.fontSize;
    const line = this.text.split( '\n' )[index];
    const caretIndex = this.caretIndexInCurrentLine();
    const textToCaret = line.slice( 0, caretIndex );

    let ox = this._textSrc.measureTextWidth( textToCaret ) - this._textX;
    let oy = index * ( fontSize + 2 );

    this._caret.x = this._padding + ox;
    this._caret.y = oy;

  }

//=============================================================================
  updateInput( event )
  { // update input from keyboard.
//=============================================================================

    const { key, ctrlKey, shiftKey } = event;

    if ( key == 'ArrowUp' ) {
      this.moveCaretUp( ctrlKey, shiftKey );

    } else if ( key == 'ArrowDown' ) {
      this.moveCaretDown( ctrlKey, shiftKey );

    } else {
      super.updateInput( event );

    }

  }

//=============================================================================
  moveCaretUp( ctrl, shift )
  { // move the caret up a row.
//=============================================================================

    const lines = this.allLines();
    const index = ( this.currentLineIndex() - 1 );
    const previousLine = ( lines[index] || '' );
    let difference = this.caretIndexInCurrentLine();

    if ( index < 0 || index > lines.length ) return;

    difference += previousLine.slice( difference ).length + 1;
    this.caretIndex = this.caretIndex - difference;

  }

//=============================================================================
  moveCaretDown( ctrl, shift )
  { // move the caret down a row.
//=============================================================================

    const lines = this.allLines();
    const index = this.currentLineIndex() + 1;
    const lineCaretIndex = this.caretIndexInCurrentLine();
    let difference = ( lines[index - 1] || '' ).length + 1;

    if ( index < 0 || index >= lines.length ) return;

    this.caretIndex = this.caretIndex + difference;

  }

//=============================================================================
  moveToStart( ctrl, shift )
  { // return to line start rather than start of string.
//=============================================================================

    if ( ctrl ) {
      super.moveToStart( ctrl, shift );

    } else {
      const index = this.currentLineIndex();
      const lines = this.allLines()
      let homeIndex = 0;

      for ( let i = 0, l = index; i < l; i++ ) {
        homeIndex += lines[i].length + 1;
      };

      if ( shift ) {
        if ( this._highlighted[0] < 0 ) this._highlighted[0] = this.caretIndex;
        this._highlighted[1] = homeIndex;
      }

      this.caretIndex = homeIndex;

    }

  }

//=============================================================================
  moveToEnd( ctrl, shift )
  { // move to the end of the line.
//=============================================================================

    if ( ctrl ) {
      super.moveToEnd( ctrl, shift );

    } else {
      const index = this.currentLineIndex();
      const lines = this.allLines()
      let endIndex = 0;

      for ( let i = 0, l = index; i <= l; i++ ) {
        endIndex += lines[i].length + 1;
      };


      if ( shift ) {
        if ( this._highlighted[0] < 0 ) this._highlighted[0] = this.caretIndex;
        this._highlighted[1] = endIndex;
      }

      this.caretIndex = endIndex -1;

    }

  }

//=============================================================================
  processOk()
  { // process what happens when ok is pressed.
//=============================================================================

    if ( this.totalLines() < this._lineCount ) {
      this.addCharacter( '\n' );
    }

  }

//=============================================================================
  refreshHighlight()
  { // refresh highlight if necessary.
//=============================================================================

    const [a, b] = this._highlighted;

    if ( a >= 0 && b >= 0 ) {

      const p = this._padding;
      const src = this._textSrc;
      const color = this.highlightColor;

      const min = Math.min( a, b );
      const max = Math.max( a, b );

      const lines = this.allLines();
      const ox = this._textX;
      let total = 0;

      for ( let i = 0, l = lines.length; i < l; i++ ) {

        const line = lines[i];
        let lineMin = min - total;
        let lineMax = max - total;

        total += line.length + 1;
        if ( lineMin > line.length || lineMax < 0 ) continue

        lineMin = Math.max( lineMin, 0 );
        lineMax = Math.min( lineMax, line.length );

        const width = Math.ceil( src.measureTextWidth( line.slice( lineMin, lineMax ) ) );
        const height = this.fontSize;

        const x = p + Math.floor( src.measureTextWidth( line.slice( 0, lineMin ) ) );
        const y = p + i * height;

        this.bitmap.fillRect( x - ox, y, width, height, color );

      };

    }

  }

//=============================================================================
  refreshText()
  { // refresh the text.
//=============================================================================

    const width = Math.ceil( this._textSrc.measureTextWidth( this.text ) );
    const fontSize = this.fontSize;
    const height = fontSize + this._padding * 2;
    const p = this._padding;

    const ox = this._textX;

    const dw = this.width - p * 2;
    const dh = height;
    const dx = p;
    const dy = 0;

    const strings = this.text.split( '\n' );

    this._textSrc.clear();

    for ( let i = 0, l = strings.length; i < l; i++ ) {
      const y = fontSize * i;
      this._textSrc.drawText( strings[i], 0, y, width, height );
      this.bitmap.blt( this._textSrc, ox, y, dw, height, dx, dy + y, dw, dh );
    };

  }

}

//=============================================================================
class ButtonField extends Sprite
{ // ButtonField

//=============================================================================
  static get defaults()
  { // return the default settings for buttons.
//=============================================================================

    return {

      outlineColor: "#181a1f",
      backgroundColor: "#457fc9",
      hoverColor: "#5287cc",
      clickOutlineColor: "#448eec",
      clickColor: "#2b6ec2",
      textColor: '#d6dadf',
      fontSize: 18,
      fontFace: 'sans-serif',
      borderRadius: 4,

    }

  }

//=============================================================================
  constructor( width, height, text, settings = {} )
  { // Called on object creation.
//=============================================================================

    const defaults = ButtonField.defaults;

    settings = Object.assign( defaults, settings );

    super( new Bitmap( width, height ) );

    this._padding = 8;
    this._outlineWidth = 2;
    this._text = text;
    this._clickHandler = null;
    this._previousField = null;
    this._nextField = null;
    this._active = false;
    this._clicked = false;

    this.applySettings( settings );

  }

//=============================================================================
  get text()
  { // return the current text.
//=============================================================================

    return this._text;

  }

//=============================================================================
  set text( text )
  { // set the text.
//=============================================================================

    this._text = text;
    this.refresh();

  }

//=============================================================================
  get outlineColor()
  { // return the outline coloor.
//=============================================================================

    return this._outlineColor || ButtonField.defaults.outlineColor;

  }

//=============================================================================
  set outlineColor( value )
  { // set the outline color.
//=============================================================================

    this._outlineColor = value;
    this.refresh();

  }

//=============================================================================
  get backgroundColor()
  { // return the bakcground color.
//=============================================================================

    return this._backgroundColor || ButtonField.default.backgroundColors;

  }

//=============================================================================
  set backgroundColor( value )
  { // set the background color.
//=============================================================================

    this._backgroundColor = value;
    this.refresh();

  }

//=============================================================================
  get hoverColor()
  { // return the color when the button is hovered over.
//=============================================================================

    return this._hoverColor || ButtonField.defaults.hoverColor;

  }

//=============================================================================
  set hoverColor( value )
  { // set the hover color.
//=============================================================================

    this._hoverColor = value;
    ths.refresh();

  }

//=============================================================================
  get clickColor()
  { // return the color when the button is being clicked.
//=============================================================================

    return this._clickColor || ButtonField.defaults.clickColor;

  }

//=============================================================================
  set clickColor( value )
  { // set the color of the clicked button.
//=============================================================================

    this._clickColor = value;
    this.refresh();

  }

//=============================================================================
  get clickOutlineColor()
  { // get the outline color awfter utton is clicked.
//=============================================================================

    return this._clickOutlineColor || ButtonField.defaults.clickOutlineColor;

  }

//=============================================================================
  set clickOutlineColor( value )
  { // set the outline color when the button is clicked.
//=============================================================================

    this._clickOutlineColor = value;
    this.refresh();

  }

//=============================================================================
  get borderRadius()
  { // retrun the value for the border radius.
//=============================================================================

    return this._borderRadius || ButtonField.defaults.borderRadius;

  }

//=============================================================================
  set borderRadius( value )
  { // set the border radius value.
//=============================================================================

    this._borderRadius = values;
    this.refresh();

  }

//=============================================================================
  get textColor()
  { // get the color for text.
//=============================================================================

    return this.bitmap.textColor || ButtonField.defaults.textColor;

  }

//=============================================================================
  set textColor( value )
  { // set the text color.
//=============================================================================

    this.bitmap.textColor = value;
    this.refresh();

  }

//=============================================================================
  get fontFace()
  { // return the current font face.
//=============================================================================

    return this.bitmap.fontFace || ButtonField.defaults.fontFace;

  }

//=============================================================================
  set fontFace( value )
  { // set the font face.
//=============================================================================

    this.bitmap.fontFace = value;
    this.refresh();

  }

//=============================================================================
  get fontSize()
  { // retun the current font size.
//=============================================================================

    return this.bitmap.fontSize || ButtonField.defaults.fontSize;

  }

//=============================================================================
  set fontSize( value )
  { // set the font size.
//=============================================================================

    this.bitmap.fontSize = value;
    this.refresh();

  }

//=============================================================================
  get hovered()
  { // return if the box is hovered over.
//=============================================================================

    return this._hovered || false;

  }

//=============================================================================
  set hovered( value )
  { // set if the box is hovered over.
//=============================================================================

    if ( this._hovered != value ) {
      this._hovered = value;
      this.refresh();
    }

  }

//=============================================================================
  get clicked()
  { // return if the box is clicked over.
//=============================================================================

    return this._clicked || false;

  }

//=============================================================================
  set clicked( value )
  { // set if the box is clicked over.
//=============================================================================

    if ( this._clicked != value ) {
      this._clicked = value;
      this.refresh();
    }

  }

//=============================================================================
  canActivate()
  { // retunr if we can activate.
//=============================================================================

    if ( Chaucer.treeBuilder._activeInputField ) {
      const previous = Chaucer.treeBuilder._activeInputField;
      const parent = Chaucer.treeBuilder._activeInputField.parent;
      if ( parent.constructor.name == 'DropDownField' ) {
        if ( previous.visible && previous._active ) {
          return !previous.mouseInBounds();
        }
      }
    }
    return true;

  }

//=============================================================================
  setClickHandler( fn )
  { // set what happens when the button is clicked.
//=============================================================================
    this._clickHandler = fn;
  }

//=============================================================================
  activate()
  { // activate the button.
//=============================================================================

    if ( !this._active && this.canActivate() ) {
      Chaucer.treeBuilder._activeInputField = this;
      this._active = true;
      this.refresh();
    }

  }

//=============================================================================
  deactivate()
  { // deactivate teh button.
//=============================================================================

    if ( this._active ) {
      if ( Chaucer.treeBuilder._activeInputField == this ) {
        Chaucer.treeBuilder._activeInputField = null;
      }
      this._active = false;
      this.refresh();
    }

  }

//=============================================================================
  applySettings( settings )
  { // apply settings to the button.
//=============================================================================

    // color settings :
    this._outlineColor = settings.outlineColor;
    this._backgroundColor = settings.backgroundColor;
    this._hoverColor = settings.hoverColor;
    this._clickOutlineColor = settings.clickOutlineColor;
    this._clickColor = settings.clickColor;
    // font settings :
    this.bitmap.textColor = settings.textColor;
    this.bitmap.fontSize = settings.fontSize;
    this.bitmap.fontFace = settings.fontFace || this.bitmap.fontFace;
    // radius setting :
    this._borderRadius = settings.borderRadius;

    this.refresh();

  }

//=============================================================================
  mouseInBounds()
  { // return if the input field is clicked.
//=============================================================================

    const { x, y } = this.getGlobalPosition( new Point(), true )
    const { x:tx, y:ty } = TouchInput;
    const { width, height } = this;

    const cx = tx > x && tx < x + width;
    const cy = ty > y && ty < y + height;

    return cx && cy;

  }

//=============================================================================
  refresh()
  { // refresh the button.
//=============================================================================

    this.bitmap.clear();
    this.refreshBackground();
    this.refreshText();
  }

//=============================================================================
  refreshBackground()
  { // refresh the background.
//=============================================================================

    const radius = this.borderRadius;
    const active = ( this._active || this._clicked );
    const color0 = active ? this.clickOutlineColor : this.outlineColor
    const color1 = this._clicked ? this.clickColor : this.mouseInBounds() ? this.hoverColor : this.backgroundColor;

    const x1 = 0;
    const y1 = 0;
    const w1 = this.width;
    const h1 = this.height;

    const x2 = this._outlineWidth;
    const y2 = this._outlineWidth;
    const w2 = this.width - this._outlineWidth * 2;
    const h2 = this.height - this._outlineWidth * 2;


    if ( radius ) { // if we have rounded corners.
      this.bitmap.drawRoundedRect( x1, y1, w1, h1, radius, color0 );
      this.bitmap.drawRoundedRect( x2, y2, w2, h2, radius, color1 );

    } else { // no rounded corners
      this.bitmap.fillRect( x1, y1, w1, h1, color0 );
      this.bitmap.fillRect( x2, y2, w2, h2, color1 );

    }

  }

//=============================================================================
  refreshText()
  { // refresh the text on the button.
//=============================================================================

    const width = this.width;
    const height = this.height;

    const x = 0;
    const y = this._outlineWidth;

    this.bitmap.drawText( this.text, x, y, width, height, 'center' );

  }

//=============================================================================
  update()
  { // update the button.
//=============================================================================

    super.update();
    this.updateHover();
    this.updateClick();

  }

//=============================================================================
  updateInput( event )
  { // update input for buttons.
//=============================================================================

    const { key, ctrlKey, shiftKey } = event;

    if ( key === 'Enter' ) {
      if ( this._okHandler ) this._okHandler( this._value );

    }

  }

//=============================================================================
  updateHover()
  { // Definition.
//=============================================================================

    if ( this.hovered != this.mouseInBounds() ) {
      this.hovered = this.mouseInBounds();
    }

  }

//=============================================================================
  updateClick()
  { // update if the button is clicked.
//=============================================================================

    if ( TouchInput.isTriggered() ) {
      this.clicked = this.mouseInBounds();
      this.deactivate();
    }

    if ( this.clicked && !TouchInput.isPressed() ) {
      this.clicked = false;
      this.activate();
      if ( this._clickHandler ) this._clickHandler();
    }
  }

//=============================================================================
  setNextField( element )
  { // set the next field element that can be accessed via tab.
//=============================================================================

    this._nextField = element;
    element._previousField = this;

  }

}

//=============================================================================
class DropDownField extends ButtonField
{ // DropDownField

//=============================================================================
  static get defaults()
  { // return the default settings for buttons.
//=============================================================================

    return {

      outlineColor: "#181a1f",
      backgroundColor: "#343b44",
      hoverColor: "#393f4a",
      clickOutlineColor: "#181a1f",
      clickColor: "#393f4a",
      textColor: '#d6dadf',
      fontSize: 18,
      fontFace: 'sans-serif',
      borderRadius: 4,

    }
    // "#e2e3e4"
  }

//=============================================================================
  static get listDefaults()
  { // return the default settings for buttons.
//=============================================================================

    return {

      outlineColor: "#e2e3e4",
      backgroundColor: "#343b44",
      hoverColor: "#3f7bc7",
      clickColor: "#3f7bc7",
      textColor: '#d6dadf',
      outlineWidth: 1,
      fontSize: 18,
      fontFace: 'sans-serif',

    }

  }

//=============================================================================
  constructor( width, data, settings = {} )
  { // Called on object creation.
//=============================================================================

    settings = Object.assign( settings, DropDownField.defaults );

    let height = settings.fontSize + 8 * 2; // TODO: don't hard code padding...

    super( width, height, '...', settings );

    this.createListField();

    this._okHandler = null;
    this.data = data;
    this._index = 0;

  }

//=============================================================================
  get data()
  { // return the current data.
//=============================================================================

    return this._list ? ( this._list.data || [null] ) : [null];

  }

//=============================================================================
  set data( value )
  { // set the data to an array.
//=============================================================================

    this._list.data = value;
    this.refresh();

  }

//=============================================================================
  get index()
  { // return the current index of the selected item.
//=============================================================================

    return this._index;

  }

//=============================================================================
  set index( value )
  { // set the current index.
//=============================================================================

    this._index = value.clamp( 0, this.data.length )
    this.refresh();
  }

//=============================================================================
  get text()
  { // return the current text.
//=============================================================================

    const object = this.data[this.index];
    return object ? object.name : '...';

  }

//=============================================================================
  get fontFace()
  { // return the current font face.
//=============================================================================

    return this.bitmap.fontFace || ButtonField.defaults.fontFace;

  }

//=============================================================================
  set fontFace( value )
  { // set the font face.
//=============================================================================

    this.bitmap.fontFace = value;
    this.refreshSize();
    this.refresh();

  }

//=============================================================================
  get fontSize()
  { // retun the current font size.
//=============================================================================

    return this.bitmap.fontSize || ButtonField.defaults.fontSize;

  }

//=============================================================================
  set fontSize( value )
  { // set the font size.
//=============================================================================

    this.bitmap.fontSize = value;
    this.refreshSize();
    this.refresh();

  }

//=============================================================================
  activate()
  { // activate the button.
//=============================================================================

    if ( !this._active ) {

      this._active = true;
      this._list.visible = true;
      this._list.activate();
      this.refresh();

    }

  }

//=============================================================================
  deactivate()
  { // deactivate the button.
//=============================================================================

    if ( this._active ) {

      this._active = false;
      if ( !this._list.mouseInBounds() ) {
        this._list.visible = false;
        this._list.deactivate();
      }
      this.refresh();

    }

  }

//=============================================================================
  setOkHandler( fn )
  { // set the ok handler.
//=============================================================================

    this._okHandler = fn;

  }

//=============================================================================
  createListField()
  { // create a list field activated when the button is clicked.
//=============================================================================

    const defaults = DropDownField.listDefaults;

    this._list = new ListField( this.width, 10, this.data, defaults );
    this._list.y = this.height;

    this._list.visible = false;

    this.addChild( this._list );

    this._list.setOkHandler( this.onListChange.bind( this ) )

  }

//=============================================================================
  onListChange( index )
  { // when the list index is selected.
//=============================================================================

    this.index = index;
    this._list.deactivate();
    this._list.visible = false;

    if ( this._okHandler ) this._okHandler( index );

  }

//=============================================================================
  refreshSize()
  { // refresh the size of the window based on the font size.
//=============================================================================

    const width = this.width;
    const height = settings.fontSize + this._padding * 2;

    this.bitmap.resize( width, height );
    this.width = width;
    this.height = height;

    this._list.y = this.height;

  }

//=============================================================================
  refreshBackground()
  { // refresh the background.
//=============================================================================

    const radius = this.borderRadius;
    const active = ( this._active || this._clicked );
    const color0 = this.outlineColor
    const color1 = active || this.mouseInBounds() ? this.hoverColor : this.backgroundColor;

    const x1 = 0;
    const y1 = 0;
    const w1 = this.width;
    const h1 = this.height;

    const x2 = this._outlineWidth;
    const y2 = this._outlineWidth;
    const w2 = this.width - this._outlineWidth * 2;
    const h2 = this.height - this._outlineWidth * 2;


    if ( radius ) { // if we have rounded corners.
      this.bitmap.drawRoundedRect( x1, y1, w1, h1, radius, color0 );
      this.bitmap.drawRoundedRect( x2, y2, w2, h2, radius, color1 );

    } else { // no rounded corners
      this.bitmap.fillRect( x1, y1, w1, h1, color0 );
      this.bitmap.fillRect( x2, y2, w2, h2, color1 );

    }

  }

//=============================================================================
  refreshText()
  { // refresh the text on the button.
//=============================================================================

    const width = this.width - this._padding * 2;
    const height = this.height;
    const ow = Math.ceil( this.bitmap.measureTextWidth( '\u2304' ) );

    const x = this._padding;
    const y1 = this._outlineWidth;
    const y2 = y1 - ( this.fontSize ) / 2
    const width1 = width - ow;
    const width2 = width;

    this.bitmap.drawText( this.text, x, y1, width1, height, 'left' );
    this.bitmap.drawText( '\u2304', x, y2, width2, height, 'right' );

  }

//=============================================================================
  updateClick()
  { // update if the button is clicked.
//=============================================================================

    if ( TouchInput.isTriggered() ) {
      this.clicked = this.mouseInBounds();
      if ( !this.clicked ) this.deactivate();
    }

    if ( this.clicked && !TouchInput.isPressed() ) {
      this.clicked = false;
      this.activate();
      if ( this._clickHandler ) this._clickHandler();
    }
  }

}

//=============================================================================
class ListField extends Sprite
{ // ListField

//=============================================================================
  static get defaults()
  { // return the default settings for buttons.
//=============================================================================

    return {

      outlineColor: "#181a1f",
      backgroundColor: "#20252b",
      hoverColor: "#393f4a",
      clickColor: "#3f7bc7",
      textColor: '#d6dadf',
      fontSize: 18,
      fontFace: 'sans-serif',
      borderRadius: 0,
      outlineWidth: 1,

    }

  }

//=============================================================================
  constructor( width, maxRows, data, settings = {} )
  { // Called on object creation.
//=============================================================================

    settings = Object.assign( ListField.defaults, settings );

    const height = ( ( settings.fontSize + 8 ) * maxRows ) + settings.outlineWidth * 2;

    super( new Bitmap( width, height ) );

    this._okHandler = null;
    this._mouse = { x: -1, y: -1 };
    this._maxRows = maxRows;
    this._previousField = null;
    this._hoverable = true;
    this._nextField = null;
    this._topIndex = 0;
    this._padding = 8;
    this._data = data;

    this.createScrollbar();
    this.applySettings( settings );

  }

//=============================================================================
  get outlineColor()
  { // return the outline color.
//=============================================================================

    return this._outlineColor || ListField.defaults.outlineColor;
    this.refresh();

  }

//=============================================================================
  set outlineColor( pixels )
  { // set the outline color.
//=============================================================================

    ths._outlineColor = pixels;

  }

//=============================================================================
  get backgroundColor()
  { // return the background color.
//=============================================================================

    return this._backgroundColor || ListField.defaults.backgroundColor;
    this.refresh();

  }

//=============================================================================
  set backgroundColor( pixels )
  { // set the backgroiund color.
//=============================================================================

    ths._backgroundColor = pixels;

  }

//=============================================================================
  get hoverColor()
  { // return the hover color.
//=============================================================================

    return this._hoverColor || ListField.defaults.hoverColor;
    this.refresh();

  }

//=============================================================================
  set hoverColor( pixels )
  { // set hover color.
//=============================================================================

    ths._hoverColor = pixels;

  }

//=============================================================================
  get clickColor()
  { // return the click color.
//=============================================================================

    return this._clickColor || ListField.defaults.clickColor;
    this.refresh();

  }

//=============================================================================
  set clickColor( pixels )
  { // set the click color.
//=============================================================================

    ths._clickColor = pixels;

  }

//=============================================================================
  get outlineWidth()
  { // return the outline width.
//=============================================================================

    return this._outlineWidth || ListField.defaults.outlineWidth;
    this.refresh();

  }

//=============================================================================
  set outlineWidth( pixels )
  { // set the size of the outlineWidth in pixels.
//=============================================================================

    ths._outlineWidth = pixels;

  }

//=============================================================================
  get borderRadius()
  { // retur nthe border radius.
//=============================================================================

    return this._borderRadius || ListField.defaults.borderRadius;
    this.refresh();

  }

//=============================================================================
  set borderRadius( pixels )
  { // set the size of the border radius in pixels.
//=============================================================================

    ths._borderRadius = pixels;

  }

//=============================================================================
  get textColor()
  { // return the current text color for the input field.
//=============================================================================

    return this.bitmap.textColor || ListField.defaults.textColor;

  }

//=============================================================================
  set textColor( color )
  { // set the text color.
//=============================================================================

    this.bitmap.textColor = color;
    this.refresh();

  }

//=============================================================================
  get fontSize()
  { // return the current font size for the input field.
//=============================================================================

    return this.bitmap.fontSize || ListField.defaults.fontSize;

  }

//=============================================================================
  set fontSize( size )
  { // set the font size.
//=============================================================================

    this.bitmap.fontSize = size;
    this.refresh();

  }

//=============================================================================
  get topIndex()
  { // return the top most index.
//=============================================================================

    return this._topIndex;

  }

//=============================================================================
  set topIndex( value )
  { // set the top index.
//=============================================================================

    const min = 0;
    const max = Math.max( this.data.length - this.maxRows, 0 );

    this._topIndex = value.clamp( min, max );
    this._scrollbar.refresh();
    this.refresh();

  }

//=============================================================================
  get bottomIndex()
  { // set the bottom most index.
//=============================================================================

    return this._topIndex + this.maxRows - 1;

  }

//=============================================================================
  set bottomIndex( value )
  { // set the bottom index.
//=============================================================================

    this.topIndex = value - this.maxRows + 1;
    this.refresh();

  }

//=============================================================================
  get maxRows()
  { // return the max amount of rows.
//=============================================================================

    return this._maxRows;

  }

//=============================================================================
  set maxRows( value )
  { // set the max amount of rows visible.
//=============================================================================

    this._maxRows = value;
    this.refresh();

  }

//=============================================================================
  get data()
  { // return the data.
//=============================================================================

    return this._data || [null];

  }

//=============================================================================
  set data( value )
  { // set the data to the value specified.
//=============================================================================

    this._data = value;
    this._scrollbar.refresh();
    this.refresh();

  }

//=============================================================================
  get index()
  { // get the current index.
//=============================================================================

    return this._index || 0;

  }

//=============================================================================
  set index( value )
  { // set the current index.
//=============================================================================

    const min = 0;
    const max = this.data.length - 1;

    this._index = value.clamp( min, max );

    if ( this._index < this.topIndex ) {
      this.topIndex = this._index;

    } else if ( this._index > this.bottomIndex ) {
      this.bottomIndex = this._index;

    }

    this.refresh();

  }

//=============================================================================
  get maxScrollY()
  { // return the maximum height of the window scroll.
//=============================================================================

    return this.data.length * this.fontSize;

  }

//=============================================================================
  setOkHandler( fn )
  { // set the ok handler.
//=============================================================================

    this._okHandler = fn;

  }

//=============================================================================
  activate()
  { // activate the text inout field.
//=============================================================================

    if ( !this._active ) {
      this._active = true;
      Chaucer.treeBuilder._activeInputField = this;
      this.refresh();
    }

  }

//=============================================================================
  deactivate()
  { // deactiveate the text input field.
//=============================================================================

    if ( this._active ) {
      this._active = false;
      if ( Chaucer.treeBuilder._activeInputField == this ) {
        Chaucer.treeBuilder._activeInputField = null;
      }
      this.refresh();
    }

  }

//=============================================================================
  mouseInBounds()
  { // return if the input field is clicked.
//=============================================================================

    const { x, y } = this.getGlobalPosition( new Point(), true )
    const { x:tx, y:ty } = TouchInput;
    const { width, height } = this;

    const cx = tx > x && tx < x + width;
    const cy = ty > y && ty < y + height;
    return cx && cy;

  }

//=============================================================================
  calculateSize( size )
  { // return how tall the window will be with this many rows.
//=============================================================================

    return ( size * ( this.fontSize + this._padding ) ) + this.outlineWidth * 2;

  }

//=============================================================================
  refreshSize()
  { // refresh the size based on the max visible lines.
//=============================================================================

    const width = this.width;
    const height = this.calculateSize( this.maxRows );

    this.bitmap.resize( width, height );
    this._scrollbar.bitmap.resize( 8, height - this.outlineWidth * 2 );

    this.width = width;
    this.height = height;

    this._scrollbar.width = 8;
    this._scrollbar.height = height - this.outlineWidth * 2;
    this._scrollbar.refresh();

  }

//=============================================================================
  createScrollbar()
  { // create a scrollbar for this window.
//=============================================================================

    const width = 8;
    const ow = this.outlineWidth;

    this._scrollbar = new ScrollBarVert( width, this.height - ow * 2, this );
    this._scrollbar.x = this.width - ow - width;
    this._scrollbar.y = ow;

    this.addChild( this._scrollbar );

  }

//=============================================================================
  applySettings( settings )
  { // appy settings.
//=============================================================================

    // font settings :
    this.bitmap.textColor = settings.textColor;
    this.bitmap.fontSize = settings.fontSize;
    this.bitmap.fontFace = settings.fontFace || this.bitmap.fontFace;
    // border settings :
    this._outlineWidth = settings.outlineWidth;
    this._borderRadius = settings.borderRadius;
    // color settings :
    this._outlineColor = settings.outlineColor;
    this._backgroundColor = settings.backgroundColor;
    this._hoverColor = settings.hoverColor;
    this._clickColor = settings.clickColor;

    this.refresh();

  }

//=============================================================================
  refresh()
  { // refresh the element.
//=============================================================================

    this.refreshBackground();
    this.refreshCursor();
    this.refreshText();

  }

//=============================================================================
  refreshBackground()
  { // refresh the background or window.
//=============================================================================

    const radius = this.borderRadius;
    const color0 = this.outlineColor
    const color1 = this.backgroundColor;

    const x1 = 0;
    const y1 = 0;
    const w1 = this.width;
    const h1 = this.height;

    const x2 = this.outlineWidth;
    const y2 = this.outlineWidth;
    const w2 = this.width - this.outlineWidth * 2;
    const h2 = this.height - this.outlineWidth * 2;


    if ( radius ) { // if we have rounded corners.
      this.bitmap.drawRoundedRect( x1, y1, w1, h1, radius, color0 );
      this.bitmap.drawRoundedRect( x2, y2, w2, h2, radius, color1 );

    } else { // no rounded corners.
      this.bitmap.fillRect( x1, y1, w1, h1, color0 );
      this.bitmap.fillRect( x2, y2, w2, h2, color1 );

    }

  }

//=============================================================================
  getCursorRect()
  { // get the rectangle for the cursor.
//=============================================================================

    const p = this.outlineWidth;
    const width = this.width - p * 2 - this._scrollbar.width;
    const height = this.fontSize + this._padding;

    const x = p;
    const y = ( this.index - this.topIndex ) * height + p;

    return new Rectangle( x, y, width, height );

  }

//=============================================================================
  refreshCursor()
  { // refresh the cursor.
//=============================================================================

    const color = this._clicked ? this.clickColor : this.hoverColor;
    const { x, y, width, height } = this.getCursorRect();

    this.bitmap.fillRect( x, y, width, height, color );

  }

//=============================================================================
  itemRect( i )
  { // return item rectangle for the index specified.
//=============================================================================

    const ow = this.outlineWidth;
    const width = this.width - this._scrollbar.width - ow * 2;
    const height = this.fontSize + this._padding;
    const x = ow;
    const y = height * i;

    return new Rectangle( x, y, width, height );

  }

//=============================================================================
  refreshText()
  { // refresh the text that is displayed.
//=============================================================================

    const top = this.topIndex;
    let p = this._padding;

    for ( let i = 0, l = this.maxRows; i <= l; i++ ) {

      let { x, y, width, height } = this.itemRect( i );
      const object = this.data[top + i];
      const text = object ? object.name : object === null ? 'none' : '';

      this.bitmap.drawText( text, x + p, y, width - p * 2, height, 'left' );
    };

  }

//=============================================================================
  update()
  { // update the list.
//=============================================================================

    super.update();
    if ( this.visible ) {
      this.updateMouse();
    }

  }

//=============================================================================
  isScrollBarBusy()
  { // return if the scrolbar is being dragged or repeat scrolled.
//=============================================================================

    return this._scrollbar._dragging || this._scrollbar._repeatScroll;

  }

//=============================================================================
  updateMouse()
  { // update mouse features.
//=============================================================================

    if ( this.mouseInBounds() && !this.isScrollBarBusy() ) {

      this.updateMouseHover();
      this.updateMouseWheel();
      this.updateMouseClick();
      this.updateMousePostion();
    }

  }

//=============================================================================
  updateMouseHover()
  { // Definition.
//=============================================================================

    const { x:ox, y:oy } = this.getGlobalPosition( new Point(), true );
    const { x:tx, y:ty } = TouchInput;

    if ( !this._hoverable || ( this._mouse.x != tx || this._mouse.y != ty ) ) {

      let index = -1;

      for ( let i = 0, l = this.maxRows; i <= l; i++ ) {
        const { x, y, width, height } = this.itemRect( i );
        if ( tx < ox + x || tx > ox + x + width ) continue;
        if ( ty < oy + y || ty > oy + y + height ) continue;

        if ( this._hoverable || TouchInput.isTriggered() ) {
          index = this.topIndex + i;
        }

      };

      if ( index >= 0 && index != this.index ) this.index = index;

    }

  }

//=============================================================================
  updateMouseWheel()
  { // update mouse wheel scroll.
//=============================================================================

    const { wheelY } = TouchInput;

    if ( wheelY < 0 ) {
      this.topIndex--;

    } else if ( wheelY > 0 ) {
      this.topIndex++;

    }

  }

//=============================================================================
  updateMouseClick()
  { // update mouse click.
//=============================================================================

    if ( TouchInput.isTriggered() && this._okHandler ) {

      if ( !this._active ) this.activate();

      const { x:ox, y:oy } = this.getGlobalPosition( new Point(), true );
      const { x:tx, y:ty } = TouchInput;

      let index = -1;
      const { x, y, width, height } = this.itemRect( this.index - this.topIndex );

      const cx = ( tx > ox + x && tx < ox + x + width );
      const cy = ( ty > oy + y && ty < oy + y + height );

      if ( cx && cy ) this.processOk();

    }

  }

//=============================================================================
  updateMousePostion()
  { // update the mouses position.
//=============================================================================

    this._mouse = { x: TouchInput.x, y: TouchInput.y };

  }

//=============================================================================
  updateInput( event )
  { // update input from an event.
//=============================================================================

    const { key, ctrlKey, shiftKey } = event;

    if ( key == 'ArrowDown' ) {
      this.index += ctrlKey ? this.maxRows + 1 : 1;

    } else if ( key == 'ArrowUp' ) {
      this.index -= ctrlKey ? this.maxRows + 1 : 1;

    } else if ( key == 'Enter' ) {
      this.processOk();

    }

  }

//=============================================================================
  processOk()
  { // proocess what happens when okay is pressed.
//=============================================================================

    if ( this._okHandler ) this._okHandler( this.index );

  }

//=============================================================================
  setNextField( element )
  { // set the next element to be processed if tab is pressed.
//=============================================================================

    this._nextField = element;
    element._previousField = this;

  }

}

//=============================================================================
// ExpandingListField
//=============================================================================

//=============================================================================
class ExpandingListField extends ListField
{ // ExpandingListField

//=============================================================================
  constructor( width, maxRows, data, settings )
  { // Called on object creation.
//=============================================================================

    super( width, maxRows, data, settings );


  }

//=============================================================================
  refreshText()
  { // refresh the text that is displayed.
//=============================================================================

    const top = this.topIndex;
    let p = this._padding;

    for ( let i = 0, l = this.maxRows; i <= l; i++ ) {

      let { x, y, width, height } = this.itemRect( i );
      const object = this.data[top + i];
      const text = object ? object.name : object === null ? 'Add New' : '';

      this.bitmap.drawText( text, x + p, y, width - p * 2, height, 'left' );
    };

  }

}

//=============================================================================
window.ExpandingListField = ExpandingListField;
//=============================================================================

//=============================================================================
class ScrollBarVert extends Sprite
{ // ScrollBarVert

//=============================================================================
  static get defaults()
  { // retunr the default settings for this object.
//=============================================================================

    return {
      outlineColor: "#3a4047",
      backgroundColor: "#272c33",
      buttonColor: "#495361",
    }

  }

//=============================================================================
  constructor( width, height, parentWindow, settings = {} )
  { // Called on object creation.
//=============================================================================

    settings = Object.assign( ScrollBarVert.defaults, settings );

    super( new Bitmap( width, height ) );

    this._parent = parentWindow;
    this.applySettings( settings )

  }

//=============================================================================
  get borderRadius()
  { // return the border radius.
//=============================================================================

    return this.width / 2;

  }

//=============================================================================
  get outlineColor()
  { // return the outline color.
//=============================================================================

    return this._outlineColor || ScrollBarVert.defaults.outlineColor;

  }

//=============================================================================
  set outlineColor( value )
  { // set the outline color.
//=============================================================================

    return this._outlineColor = value;

  }

//=============================================================================
  get backgroundColor()
  { // return the background color.
//=============================================================================

    return this._backgroundColor || ScrollBarVert.defaults.backgroundColor;

  }

//=============================================================================
  set backgroundColor( value )
  { // set the background color.
//=============================================================================

    return this._backgroundColor = value;

  }

//=============================================================================
  get buttonColor()
  { // return the button color.
//=============================================================================

    return this._buttonColor || ScrollBarVert.defaults.buttonColor;

  }

//=============================================================================
  set buttonColor( value )
  { // set the button color.
//=============================================================================

    return this._buttonColor = value;

  }

//=============================================================================
  get value()
  { // return the value.
//=============================================================================

    return this._value || 0;

  }

//=============================================================================
  set value( value )
  { // set the value.
//=============================================================================

    this._value = value;

  }

//=============================================================================
  applySettings( settings)
  { // apply settings.
//=============================================================================

    this._outlineColor = settings.outlineColor;
    this._backgroundColor = settings.backgroundColor;
    this._buttonColor = settings.buttonColor;

    this.refresh();

  }

//=============================================================================
  refresh()
  { // refresh the scrollbar.
//=============================================================================

    this.bitmap.clear();
    this.refreshBackground();
    this.refreshButton();

  }

//=============================================================================
  refreshBackground()
  { // refresh the background of the scrollbar.
//=============================================================================

    const x1 = 0;
    const y1 = 0;
    const w1 = this.width;
    const h1 = this.height;

    const x2 = 1;
    const y2 = 1;
    const w2 = this.width - 2;
    const h2 = this.height - 2;

    const radius1 = w1 / 2;
    const radius2 = w2 / 2;

    const color0 = this.outlineColor;
    const color1 = this.backgroundColor;

    // outline
    this.bitmap.drawCircle( x1 + radius1, y1 + radius1, radius1, color0 );
    this.bitmap.drawCircle( x1 + radius1, y1 + h1 - radius1, radius1, color0 );
    this.bitmap.clearRect( x1, y1 + radius1, w1, h1 - radius1 * 2 );
    this.bitmap.fillRect( x1, y1 + radius1, w1, h1 - radius1 * 2, color0 );

    // fill
    this.bitmap.drawCircle( x2 + radius2, y2 + radius2, radius2, color1 );
    this.bitmap.drawCircle( x2 + radius2, y2 + h2 - radius2, radius2, color1 );
    this.bitmap.clearRect( x2, y2 + radius2, w2, h2 - radius2 * 2 );
    this.bitmap.fillRect( x2, y2 + radius2, w2, h2 - radius2 * 2, color1 );

  }

//=============================================================================
  buttonRect()
  { // return the rectangle for the button.
//=============================================================================

    const parent = this._parent;
    const sWidth = ( parent.height / parent.maxScrollY ).clamp( 0, 1 );
    const value = parent.topIndex / ( parent.data.length - parent.maxRows );

    const width = this.width - 2;
    const height = Math.floor( ( this.height - 2 ) * sWidth );
    const x = 1;
    const y = 1 + Math.floor( value * ( this.height - 2 - height ) );

    return new Rectangle( x, y, width, height );

  }

//=============================================================================
  refreshButton()
  { // redraw the button when it has moved.
//=============================================================================

    let { x, y, width, height } = this.buttonRect();

    const radius = width / 2;
    const color = this.buttonColor;

    if ( height < radius * 2 ) {
      this.bitmap.fillRect( x, y, width, height, color );

    } else {
      this.bitmap.drawCircle( x + radius, y + radius, radius, color );
      this.bitmap.drawCircle( x + radius, y + height - radius, radius, color );
      this.bitmap.clearRect( x, y + radius, width, height - radius * 2 );
      this.bitmap.fillRect( x, y + radius, width, height - radius * 2, color );

    }


  }

//=============================================================================
  update()
  { // update the scrollbar.
//=============================================================================

    super.update();
    if ( this._dragging ) {
      this.updateDragging();

    } else if ( this._repeatScroll ) {
      this.updateScrollRepeat();

    } else {
      this.updateScrollByClick();

    }

  }

//=============================================================================
  mouseInBounds()
  { // return if the input field is clicked.
//=============================================================================

    const { x, y } = this.getGlobalPosition( new Point(), true )
    const { x:tx, y:ty } = TouchInput;
    const { width, height } = this;

    const cx = tx > x && tx < x + width;
    const cy = ty > y && ty < y + height;

    return cx && cy;

  }

//=============================================================================
  isMouseOnButton()
  { // return if the mouse is over the button.
//=============================================================================

    const { x:ox, y:oy } = this.getGlobalPosition( new Point(), true );
    let { x, y, width, height } = this.buttonRect();
    const { x:tx, y:ty } = TouchInput;

    x += ox + 1;
    y += oy;

    return tx > x && tx <= x + width && ty > y && ty <= y + height;

  }

//=============================================================================
  updateScrollRepeat()
  { // update repeat scrolling.
//=============================================================================

    if ( TouchInput.isRepeated() ) {

      if ( !this.mouseInBounds() || this.isMouseOnButton() ) {
        return;

      } else if ( this._repeatScroll < 0 ) {
        this.parent.topIndex--;

      } else if ( this._repeatScroll > 0 ) {
        this.parent.topIndex++;

      }

    } else if ( !TouchInput.isPressed() ){
      this._repeatScroll = undefined;

    }

  }

//=============================================================================
  updateScrollByClick()
  { // update the scrollbar if it has been clicked( dragging ).
//=============================================================================

    if ( TouchInput.isTriggered() ) {

      const { x, y, width, height } = this.buttonRect();
      const { x:tx, y:ty } = TouchInput;

      const { x:ox, y:oy } = this.getGlobalPosition( new Point(), true );

      const x0 = x + ox + 1;
      const y0 = y + oy + 1;

      if ( tx > x0 && tx <= x0 + width && ty > y0 && ty <= y0 + height ) { // drag bar.

        this._offset = ty;
        this._origin = y;
        this._barSize = height;

        this._dragging = true;

      } else if ( tx > x0 && tx <= x0 + width ) { // jump index up/down.

        if ( ty < y0 ) {
          this._repeatScroll = -1;

        } else {
          this._repeatScroll = 1;

        }

      }

    }

  }

//=============================================================================
  updateDragging()
  { // update the dragging of the scrollbar.
//=============================================================================

    this._dragging = TouchInput.isPressed();

    if ( this._dragging ) {

      const min = 1;
      const max = this.height - 2 - this._barSize;
      const ty = TouchInput.y;
      const offset = ty - this._offset;

      const dy = this._origin + offset //).clamp( min, max ) - min;
      const scale = dy / max;


      const maxRows = this.parent.maxRows;
      const maxContent = this.parent.data.length;
      const maxScroll = Math.max( maxContent - maxRows, 0 )
      const index = Math.round( maxScroll * scale )

      if ( index != this.parent.topIndex ) {
        this.parent.topIndex = index;
      }

    }

  }

}

//=============================================================================
class CheckboxField extends TextInputField
{ // CheckboxField

//=============================================================================
  constructor( bool, settings )
  { // Called on object creation.
//=============================================================================

    super( 34, settings );
    this.value = bool || false;
  }

//=============================================================================
  refreshSize()
  { // refresh the size of the text input field based on font size.
//=============================================================================

    const height = this.bitmap.fontSize + this._padding * 2;

    this._textSrc.resize( 1000, height );
    this.bitmap.resize( height, height );
    this.height = height;
    this.width = height;


  }

//=============================================================================
  activate()
  { // activate the text input field.
//=============================================================================

    this.value = !this.value;
    this.text = this.value ? ' ✓' : ' ';
    if ( this._okHandler ) this._okHandler( this.value );

    if ( !this._active && this.canActivate() ) {
      this._active = true;
      Chaucer.treeBuilder._activeInputField = this;
      this.refresh();
    }

  }

//=============================================================================
  deactivate()
  { // deactiveate the text input field.
//=============================================================================

    if ( this._active ) {
      this._active = false;
      if ( Chaucer.treeBuilder._activeInputField == this ) {
        Chaucer.treeBuilder._activeInputField = null;
      }
      this.refresh();
    }

  }

//=============================================================================
  updateCaret()
  { // prevent update of caret.
//=============================================================================

  }

//=============================================================================
  updateInput( event )
  { // update input from an event.
//=============================================================================

    const { key, ctrlKey, shiftKey } = event;

    if ( key == ' ' ) {
      this.value = !this.value;
      this.text = this.value ? ' ✓' : ' ';
      if ( this._okHandler ) this._okHandler( this.value );

    }

  }
}

//=============================================================================
window.CheckboxField = CheckboxField;
//=============================================================================

//=============================================================================
window.ScrollBarVert = ScrollBarVert;
//=============================================================================

//=============================================================================
window.ListField = ListField;
//=============================================================================

//=============================================================================
window.DropDownField = DropDownField;
//=============================================================================

//=============================================================================
window.ButtonField = ButtonField;
//=============================================================================

//=============================================================================
window.NoteInputField = NoteInputField;
//=============================================================================

//=============================================================================
window.NumberInputField = NumberInputField;
//=============================================================================

//=============================================================================
window.TextInputField = TextInputField;
//=============================================================================

//=============================================================================
// Skill_TreeBox
//=============================================================================

//=============================================================================
class Skill_TreeBox extends Sprite
{ // Skill_TreeBox

//=============================================================================
  constructor()
  { // Called on object creation.
//=============================================================================

    super( new Bitmap( Graphics.width / 2, Graphics.height + 32 ) );
    this._tabSize = { width: 32, height: 32 };
    this._data = $dataSkillTrees[0];
    this.x = Graphics.width / 4;
    this.drawBackground();
    this.drawLabels();
    this.createElements();

  }

//=============================================================================
  drawBackground()
  { // draw the background.
//=============================================================================

    const x0 = 0;
    const y0 = 0;
    const w0 = Graphics.width;
    const h0 = Graphics.height;

    const x1 = 2;
    const y1 = 2;
    const w1 = Graphics.width - 4;
    const h1 = Graphics.height - 4

    const radius = 4;

    const color0 = "#181a1f";
    const color1 = "#20252b";

    this.bitmap.drawRoundedRect( x0, y0, w0, h0, radius, color0 );
    this.bitmap.drawRoundedRect( x1, y1, w1, h1, radius, color1 );

    const cx = this.width / 2;
    const cy = Graphics.height;
    const cRadius = this._tabSize.height;

    this.bitmap.drawCircle( cx, cy, cRadius, color0 );

    const tx = cx - cRadius / 3;
    const ty = cy - 6;
    this.bitmap.drawText( "\u2303  ", tx, ty - cRadius / 2, cRadius, cRadius, 'center' );
    this.bitmap.drawText( "\u2304  ", tx, ty, cRadius, cRadius, 'center' );

  }

//=============================================================================
  drawLabels()
  { // draw the labels for stuff.
//=============================================================================

    // this.bitmap.drawText( 'Tree Name :', 620, 22, 180, 32 );
    // this.bitmap.drawText( 'Tree Width :', 620, 22 + 56, 180, 32 );
    // this.bitmap.drawText( 'Tree Height :', 620, 22 + 56 * 2, 180, 32 );

  }

//=============================================================================
  createElements()
  { // Definition.
//=============================================================================

    this.createTreeSelector();
    // this.createNameEditor();
    // this.createTreeWidthModifier();
    // this.createTreeHeightModifier();

    // this.refreshTreeName();
    // this.refreshTreeWidth();
    // this.refreshTreeHeight();

  }

//=============================================================================
  createTreeSelector()
  { // create the drop down list to select a skill tree.
//=============================================================================

    this._treeList = new ListField( Graphics.width / 2, 1, $dataClasses, { hoverColor: "#3f7bc7", fontSize: 23 } );
    this._treeList._hoverable = false;
    this._treeList.x += 2;
    this._treeList.y += 3;

    let size = 1;
    let height = this._treeList.height;
    let max = this.height - this._tabSize.height * 2;

    while ( height < max ) {
      size += 1;
      height = this._treeList.calculateSize( size );

    }

    this._treeList.maxRows = size - 1;
    this._treeList.refreshSize();
    this._treeList.refresh();

    this.addChild( this._treeList );

    this._treeList.setOkHandler( this.onTreeListOk.bind( this ) );


  }

//=============================================================================
  onTreeListOk( index )
  { // when clicking an item.
//=============================================================================

    if ( !$dataSkillTrees[index] ) {
      this.addNewTree( index )
      SceneManager._scene.requestSave();

    } else {
      this._treeList.activate();
      let width = Math.floor( ( Graphics.width / 2 ) / ( Chaucer.skillTree.params.gridSize ) );

      if ( width % 2 == 0 ) width--;

      $dataSkillTrees[index].width = width;

      // this._treeName.activate();
    }

    this.parent._currentTree = $dataSkillTrees[index];
    this._data = $dataSkillTrees[index];
    this._treeList.refresh();
    // this.refreshTreeName();
    // this.refreshTreeWidth();
    // this.refreshTreeHeight();
    this._skillTreeSprite.setData( this._data, true );


  }

//=============================================================================
  addNewTree( index )
  { // add a new tree at the index specified.
//=============================================================================

    let width = Math.floor( ( Graphics.width / 2 ) / ( Chaucer.skillTree.params.gridSize ) );
    let height = 5;

    if ( width % 2 == 0 ) width--;

    $dataSkillTrees[index] = {
      width: width,
      height: height,
      tree: []
    };

  }

//=============================================================================
  createNameEditor()
  { // create the name edit field.
//=============================================================================

    this._treeName = new TextInputField( 300 );
    this._treeName.x += 730;
    this._treeName.y += 20;

    this.refreshTreeName();

    this.addChild( this._treeName );

    this._treeName.setOkHandler( this.onNameChange.bind( this ) );
    this._treeList.setNextField( this._treeName );

  }

//=============================================================================
  refreshTreeName()
  { // refresh the tree name based on the current data.
//=============================================================================

    this._treeName.text = this._data ? this._data.name : '';
    this._treeName.refresh();

  }

//=============================================================================
  onNameChange( name )
  { // when the name gets changed.
//=============================================================================

    if ( this._data ) {
      this._data.name = name;
      this._treeList.refresh();

      SceneManager._scene.requestSave();

    }

  }

//=============================================================================
  createTreeWidthModifier()
  { // create the tree width modifier.
//=============================================================================

    this._treeWidth = new NumberInputField( 300 );

    this._treeWidth.x += 730;
    this._treeWidth.y += 20 + 56;

    this.addChild( this._treeWidth );

    this._treeWidth.setOkHandler( this.onWidthChange.bind( this ) );
    this._treeName.setNextField( this._treeWidth );
    this.refreshTreeWidth();

  }

//=============================================================================
  refreshTreeWidth()
  { // refresh the tree width.
//=============================================================================

    this._treeWidth.value = Number( this._data ? this._data.width : 0 );
    this._treeWidth.refresh();

  }

//=============================================================================
  onWidthChange( width )
  { // when changing the width of the tree.
//=============================================================================

    if ( this._data ) {
      const oldWidth = this._data.width;

      this._data.width = width;

      this.refreshTreeSize();

      this.updateNodeIds( oldWidth, width );

      SceneManager._scene.requestSave();

    }

  }

//=============================================================================
  updateNodeIds( last, current )
  { // update the node ids based on the width change.
//=============================================================================

    const nodes = this.parent._skillTree.allNodes();


    for ( let i = 0, l = nodes.length; i < l; i++ ) {

      const row = Math.floor( nodes[i].id / last );
      const col = ( nodes[i].id % last );

      nodes[i].id = ( row * current ) + col;

      for ( let j = 0, l = nodes[i].parents.length; j < l; j++ ) {

        const row = Math.floor( nodes[i].parents[j] / last );
        const col = ( nodes[i].parents[j] % last );
        nodes[i].parents[j] = ( row * current ) + col;

      };

    };

    this.parent._skillTree.refresh();

  }

//=============================================================================
  createTreeHeightModifier()
  { // create the tree height modifier.
//=============================================================================

    this._treeHeight = new NumberInputField( 300 );

    this._treeHeight.x += 730;
    this._treeHeight.y += 20 + 56 * 2;

    this.addChild( this._treeHeight );

    this._treeHeight.setOkHandler( this.onHeightChange.bind( this ) );
    this._treeWidth.setNextField( this._treeHeight );
    this._treeHeight.setNextField( this._treeList );
    this.refreshTreeHeight();

  }

//=============================================================================
  refreshTreeHeight()
  { // refresh the tree height.
//=============================================================================

    this._treeHeight.value = Number( this._data ? this._data.height : 0 );
    this._treeHeight.refresh();

  }

//=============================================================================
  onHeightChange( value )
  { // when changing the height of the tree.
//=============================================================================

    if ( this._data ) {
      this._data.height = value;
      this.refreshTreeSize();

      SceneManager._scene.requestSave();

    }

  }

//=============================================================================
  refreshTreeSize()
  { // refresh the tree size.
//=============================================================================

    const { width, height, tree } = this._data;


    for ( let i = 0, l = height; i < l; i++ ) {

      tree[i] = tree[i] || [];

      while( tree[i].length < width ) { tree[i].push( null ) };
      while( tree[i].length > width ) { tree[i].pop() };

    };

    this._skillTreeSprite.setData( this._data, true );

  }

//=============================================================================
  update()
  { // update the sprite.
//=============================================================================

    super.update();
    this.updateTab();
    this.updateMove();
  }

//=============================================================================
  isMoving()
  { // return if the window is moving.
//=============================================================================

    return this._lerp;

  }

//=============================================================================
  updateTab()
  { // update if the tab is clicked.
//=============================================================================

    if ( TouchInput.isTriggered() && !this._lerp ) {

      const { x:tx, y:ty } = TouchInput;
      const x = tx - ( this.x + this.width / 2 );
      const y = ty - ( this.y + this.height - 32 );

      const radius = this._tabSize.height;
      const distance = Math.sqrt( x * x + y * y )

      if ( distance < radius ) {

        if ( this.y == 0 ) {
          this._lerp = {
            start: new Point( this.x, this.y ),
            end: new Point( Graphics.width / 4, -Graphics.height ),
            speed: 1 / 20,
            value: 0
          }

        } else if ( this.y == -Graphics.height ) {
          this._lerp = {
            start: new Point( this.x, this.y ),
            end: new Point( Graphics.width / 4, 0 ),
            speed: 1 / 20,
            value: 0
          }

        }

      }

    }

  }

//=============================================================================
  updateMove()
  { // update the movement of the window if we have a target position.
//=============================================================================

    if ( this._lerp ) {

      const { start, end, speed } = this._lerp;

      this._lerp.value = ( this._lerp.value + speed ).clamp( 0, 1 );

      const x = start.x + ( end.x - start.x ) * this._lerp.value;
      const y = start.y + ( end.y - start.y ) * this._lerp.value;
      this.position.set( x, y );

      if ( this._lerp.value == 1 ) this._lerp = undefined;
    }

  }

}

//=============================================================================
// NodeBox :
//=============================================================================

//=============================================================================
class NodeBox extends Sprite
{ // NodeBox

//=============================================================================
  constructor()
  { // Called on object creation.
//=============================================================================
    const width = Math.max( Graphics.width / 2, 500 );
    const y = 22 + 56 * 2 + 32;
    const rows = SceneManager._scene.descriptionWindowRows()
    const height = y + ( 18 * rows ) + 8 * 2 + 64 + 16;

    super( new Bitmap( width, height ) );
    this.drawBackground();
    this.drawLabels();
    this.createElements();

  }

//=============================================================================
  setNode( node = {} )
  { // set the current node.
//=============================================================================

    this._orgNode = JsonEx.parse( JsonEx.stringify( node ) );
    this._node = node;

    this._lerp = {
      start: new Point( this.x, this.y ),
      end: new Point( 0, this.y ),
      speed: 1 / 20,
      value: 0
    }

    this.refreshElements();

  }

//=============================================================================
  refreshElements()
  { // refresh all elements after a node has been changed.
//=============================================================================

    this._skillButton.index = this._node.skillId || 0;
    this._pointsButton.value = this._node.cost || 0;
    this._levelButton.value = this._node.level || 0;
    this._descriptionField.text = this._node.description || '';

    this._skillButton.refresh();
    this._pointsButton.refresh();
    this._levelButton.refresh();
    this._descriptionField.refresh();

    this.refreshNodeIcon();

  }

//=============================================================================
  drawBackground()
  { // draw the background.
//=============================================================================

    const x0 = 0;
    const y0 = 0;
    const w0 = this.width;
    const h0 = this.height;

    const x1 = 2;
    const y1 = 2;
    const w1 = this.width - 4;
    const h1 = this.height - 4

    const radius = 4;

    const color0 = "#181a1f";
    const color1 = "#20252b";

    this.bitmap.drawRoundedRect( x0, y0, w0, h0, radius, color0 );
    this.bitmap.drawRoundedRect( x1, y1, w1, h1, radius, color1 );

  }

//=============================================================================
  drawLabels()
  { // create labels for ui elements.
//=============================================================================

    this.bitmap.fontFace = 'sans-serif';
    this.bitmap.fontSize = 18;
    this.createEventLabel();
    this.createPointsLabel();
    this.createLevelLabel();
    this.createDescriptionLabel();

  }

//=============================================================================
  createEventLabel()
  { // create labbel for common event id.
//=============================================================================

    this.bitmap.drawText( 'Skill : ', 0, 22, 150, 36, 'right' )

  }

//=============================================================================
  createPointsLabel()
  { // create a label for the icon index.
//=============================================================================

    let points = Chaucer.skillTree.params.pointsName;
    this.bitmap.drawText( `Required ${points} : `, 0, 22 + 56, 150, 36, 'right' );
    this.refreshNodeIcon();

  }

//=============================================================================
  refreshNodeIcon()
  { // refresh the current icon.
//=============================================================================

    const color0 = "#e2e3e4";
    const color1 = "#20252b";

    const width = ( ImageManager.iconWidth || Window_Base._iconWidth ) + 4;
    const height = ( ImageManager.iconHeight || Window_Base._iconHeight ) + 4;
    const x = 160;
    const y = 18;
    this.bitmap.clearRect( x, y, width, height )
    this.bitmap.fillRect( x, y, width, height, color0 )
    this.bitmap.clearRect( x + 1, y + 1, width - 2, height - 2 )
    this.bitmap.fillRect( x + 1, y + 1, width - 2, height - 2, color1 )

    if ( this._node && this._node.skillId ) {

      const src = ImageManager.loadSystem( 'IconSet' );
      const index = Number( $dataSkills[this._node.skillId].iconIndex );
      const sw = ImageManager.iconWidth || Window_Base._iconWidth;
      const sh = ImageManager.iconHeight || Window_Base._iconHeight;
      const sx = ( index % 16 ) * sw;
      const sy = Math.floor( index / 16 ) * sh;

      const dx = x + 2
      const dy = y + 2

      this.bitmap.blt( src, sx, sy, sw, sh, dx, dy );

    }

  }

//=============================================================================
  createLevelLabel()
  { // create a loabel for the currency cost.
//=============================================================================

    const text = 'Required Level : ';
    const width = 64;
    this.bitmap.drawText( text, 0, 22 + 56, this.width - width - 22, 36, 'right' );

  }

//=============================================================================
  createDescriptionLabel()
  { // create a label for description.
//=============================================================================

    this.bitmap.drawText( 'Description : ', 0, 22 + 56 * 2, 150, 36, 'right' );

  }

//=============================================================================
  eraseNode( node )
  { // erase the node from the tree.
//=============================================================================

    const { width, tree } = this._skillTreeSprite._data;
    const allNodes = this._skillTreeSprite.allNodes();
    const id = node.id;

    const x = ( id % width );
    const y = Math.floor( id / width );

    tree[y][x] = null;

    // remove all attachments to the node.
    allNodes.forEach( node => {
      node.parents = node.parents.filter( n => n != id );
    } );

  }

//=============================================================================
  isMoving()
  { // retrun if the window is moving.
//=============================================================================

    return this._lerp;

  }

//=============================================================================
  createElements()
  { // create all UI elements.
//=============================================================================

    this.createCancelButton();
    this.createConfirmButton();
    this.createDescriptionField();
    this.createLevelButton();
    this.createPointsButton();
    this.createSkillId();

  }

//=============================================================================
  createCancelButton()
  { // create the cancel button.
//=============================================================================

    const settings = {
      backgroundColor: "#d97fc9",
      hoverColor: "#db8f99",
      clickOutlineColor: "#db9f87",
      clickColor: "#cb6ec2"
    };

    this._cancelButton = new ButtonField( 100, 32, 'Cancel', settings );

    this._cancelButton.x = ( this.width - 100 ) / 2 + 60
    this._cancelButton.y = this.height - this._cancelButton.height - 22;

    this.addChild( this._cancelButton );

    this._cancelButton.setClickHandler( this.onCancel.bind( this ) );

  }

//=============================================================================
  onCancel()
  { // when the cancel button is clicked.
//=============================================================================

    Object.assign( this._node, this._orgNode );

    this.parent._descriptionWindow.setText( this._node.description );
    this.parent._requirementsWindow.setNode( this._node );
    this._skillTreeSprite.refresh();

    this._lerp = {
      start: new Point( this.x, this.y ),
      end: new Point( -this.width, this.y ),
      speed: 1 / 20,
      value: 0
    }

    if ( this._node.skillId == 0 ) {
      this.eraseNode( this._node );
    }

    this._skillTreeSprite.refresh();

  }

//=============================================================================
  createConfirmButton()
  { // create the confirm button.
//=============================================================================

    this._confirmButton = new ButtonField( 100, 32, 'Confirm' );

    this._confirmButton.x = ( this.width - 100 ) / 2 - 60
    this._confirmButton.y = this.height - this._confirmButton.height - 22;

    this._confirmButton.setNextField( this._cancelButton );
    this.addChild( this._confirmButton );

    this._confirmButton.setClickHandler( this.onConfirm.bind( this ) );

  }

//=============================================================================
  refreshSize()
  { // refresh the size of the tree after changes are made.
//=============================================================================

    let bottom = 0;
    const data = SceneManager._scene._skillTreeSelectBox._data;

    for ( let i = 0, l = data.height; i < l; i++ ) {
      if ( data.tree[i] ) {
        if ( data.tree[i].some( n => !!n ) ) {
          bottom = i;
          continue;
        }
      };

    };

    data.height = bottom + 5;
    SceneManager._scene._skillTreeSelectBox.refreshTreeSize();

  }

//=============================================================================
  onConfirm()
  { // when the cancel button is clicked.
//=============================================================================

    this.refreshSize();

    this.parent._descriptionWindow.setText( this._node.description );
    this.parent._requirementsWindow.setNode( this._node );

    this._skillTreeSprite.refresh();

    this._lerp = {
      start: new Point( this.x, this.y ),
      end: new Point( -this.width, this.y ),
      speed: 1 / 20,
      value: 0
    }

    if ( this._node.skillId == 0 ) {
      this.eraseNode( this._node );
      this.refreshSize();
    }

    SceneManager._scene.saveSkillTrees();

  }

//=============================================================================
  createLevelButton()
  { // create a input for points.
//=============================================================================

    const width = 64

    this._levelButton = new NumberInputField( width )
    this._levelButton.x = this.width - 22 - width;
    this._levelButton.y = 20 + 56;

    this.addChild( this._levelButton );

    this._levelButton.setNextField( this._descriptionField );
    this._levelButton.setOkHandler( this.onLevelChange.bind( this ) );


  }

//=============================================================================
  onLevelChange( value )
  { // after cuyrrencyt requirement changes.
//=============================================================================

    this._node.level = Number( value );
    this.parent._requirementsWindow.setNode( this._node );

  }

//=============================================================================
  createPointsButton()
  { // create a number input field for the icon index.
//=============================================================================

    this._pointsButton = new NumberInputField( 64 )
    this._pointsButton.x = 170;
    this._pointsButton.y = 20 + 56;

    this.addChild( this._pointsButton );

    this._pointsButton.setNextField( this._levelButton );
    this._cancelButton.setNextField( this._pointsButton );
    this._pointsButton.setOkHandler( this.onPointsChange.bind( this ) );

  }

//=============================================================================
  onPointsChange( value )
  { // after cuyrrencyt requirement changes.
//=============================================================================

    this._node.cost = Number( value );
    this.parent._requirementsWindow.setNode( this._node );

  }

//=============================================================================
  createSkillId()
  { // create a common event drop down list.
//=============================================================================

    const x = 170 + 32 + 12;
    this._skillButton = new DropDownField( this.width - x - 22, $dataSkills );
    this._skillButton.x = x;
    this._skillButton.y = 20;

    this.addChild( this._skillButton );

    this._skillButton.setNextField( this._pointsButton );
    this._cancelButton.setNextField( this._skillButton );
    this._skillButton.setOkHandler( this.onSkillChange.bind( this ) );

  }

//=============================================================================
  onSkillChange( skillId )
  { // after the event is changed.
//=============================================================================

    this._node.skillId = Number( skillId );
    this.parent._nameWindow.setNode( this._node );
    this._skillTreeSprite.refresh();
    this.refreshNodeIcon();
  }

//=============================================================================
  createDescriptionField()
  { // create a field for description input.
//=============================================================================

    const y = 22 + 56 * 2 + 32;
    const x = 22;
    const width = this.width - x * 2;
    const rows = SceneManager._scene.descriptionWindowRows()
    this._descriptionField = new NoteInputField( width, rows );

    this._descriptionField.x = x;
    this._descriptionField.y = y;

    this.addChild( this._descriptionField );

    this._descriptionField.setNextField( this._confirmButton );
    this._descriptionField.setOkHandler( this.onDescriptionChange.bind( this ) );

  }

//=============================================================================
  onDescriptionChange( text )
  { // when the description has changed.
//=============================================================================

    this.parent._descriptionWindow.setText( text );
    this._node.description = text;

  }

//=============================================================================
  update()
  { // update the box.
//=============================================================================

    super.update();
    this.updateMove();

  }

//=============================================================================
  updateMove()
  { // update the movement of the window if we have a target position.
//=============================================================================

    if ( this._lerp ) {

      const { start, end, speed } = this._lerp;

      this._lerp.value = ( this._lerp.value + speed ).clamp( 0, 1 );

      const x = start.x + ( end.x - start.x ) * this._lerp.value;
      const y = start.y + ( end.y - start.y ) * this._lerp.value;
      this.position.set( x, y );

      if ( this._lerp.value == 1 ) this._lerp = undefined;
    }

  }

}

//=============================================================================
window.NodeBox = NodeBox;
//=============================================================================

//=============================================================================
window.Skill_TreeBox = Skill_TreeBox;
//=============================================================================

//=============================================================================
  var Imported = Imported || {};
  Imported['Skill Tree Builder'.toUpperCase()] = true;
//=============================================================================
  var Chaucer = Chaucer || {};
  Chaucer.treeBuilder = {};
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
        $._activeInputField = null;

      };

    };

  //============================================================================
    //Create plugin information.
  //============================================================================

    const identifier =  /(Skill Tree Builder) : Version - (\d+.\d+.\d+)/;
    // $._nameError = 'Skill Tree Builder was unable to load! Please revert any changes back to normal!';


    Chaucer.makePluginInfo( $, identifier );

    if ( !$.name ) throw new Error( $._nameError );

//=============================================================================

//-----------------------------------------------------------------------------
  $.processKeyInput = function ( event )
  { // compare the current version with the target version.
//-----------------------------------------------------------------------------

    if ( $._activeInputField && $._activeInputField.updateInput ) {

      if ( event.key == 'Tab' ) {

        const nextField = $._activeInputField._nextField;
        const previousField = $._activeInputField._previousField;

        if ( event.shiftKey ) {

          if ( previousField ) {
            $._activeInputField.deactivate();
            previousField.activate();
          }

        } else {
          if ( nextField ) {
            $._activeInputField.deactivate();
            nextField.activate();
          }

        }
      } else {
        $._activeInputField.updateInput( event );

      }
    }

  };

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
// Scene_SkillTree :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Scene_SkillTree, 'initialize', function()
  { // Aliased initialize of class Scene_SkillTree.
//-----------------------------------------------------------------------------

    $.alias();
    this._editorMode = true;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Scene_SkillTree, 'create', function()
  { // Aliased create of class Scene_SkillTree.
//-----------------------------------------------------------------------------

    $.alias();
    this.createSkillTreeSelectBox();
    this.createNodeBox();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Scene_SkillTree, 'createSkillTreeSelectBox', function()
  { // create a box which lets you select/add skill trees.
//-----------------------------------------------------------------------------

    this._skillTreeSelectBox = new Skill_TreeBox();
    this.addChild( this._skillTreeSelectBox );

    this._skillTreeSelectBox._skillTreeSprite = this._skillTree;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Scene_SkillTree, 'createNodeBox', function()
  { // create the node editor box.
//-----------------------------------------------------------------------------

    this._nodeEditorBox = new NodeBox();
    this.addChild( this._nodeEditorBox );

    this._nodeEditorBox.x = -this._nodeEditorBox.width;
    this._nodeEditorBox.y = ( Graphics.height - this._nodeEditorBox.height ) / 2;

    this._nodeEditorBox._skillTreeSprite = this._skillTree;
    this._nodeEditorBox.alpha = 1;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Scene_SkillTree, 'updateLeftClickCancel', function()
  { // Aliased updateLeftClickCancel of class Scene_SkillTree.
//-----------------------------------------------------------------------------

    // $.alias();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Scene_SkillTree, 'requestSave', function()
  { // requst that the data be saved.
//-----------------------------------------------------------------------------

    this._saveTimer = 45;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Scene_SkillTree, 'saveSkillTrees', function()
  { // Aliased saveSkillTrees of class Sprite_SkillTree.
//-----------------------------------------------------------------------------

    const fs = require( 'fs' );

    const folder = 'data/skilltree/'
    const dir = folder + 'SkillTree.json';
    const data = JSON.stringify( $dataSkillTrees );

    fs.writeFileSync( dir, data );

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Scene_SkillTree, 'update', function()
  { // Aliased update of class Scene_SkillTree.
//-----------------------------------------------------------------------------

    $.alias();
    this.updatesaveRequest();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Scene_SkillTree, 'updatesaveRequest', function()
  { // update the save reuqest.
//-----------------------------------------------------------------------------

    if ( this._saveTimer > 0 ) {
      this._saveTimer--;
      if ( this._saveTimer == 0 ) this.saveSkillTrees();
    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Scene_SkillTree, 'updateExit', function()
  { // Aliased updateExit of class Scene_SkillTree.
//-----------------------------------------------------------------------------

    // $.alias();

  }, false );

//=============================================================================
// Sprite_SkillTree :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Sprite_SkillTree, 'initialize', function( bitmap )
  { // Aliased initialize of class Sprite_SkillTree.
//-----------------------------------------------------------------------------

    $.alias( bitmap );

    this._editorMode = true;
    this._gridId = -1;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_SkillTree, 'updateMouse', function()
  { // Aliased updateMouse of class Sprite_SkillTree.
//-----------------------------------------------------------------------------

    // $.alias();
    if ( !this.parent._nodeEditorBox.isMoving() ) {
      if ( !this.parent._skillTreeSelectBox.isMoving() ) {
        this.updateEditorClick();
        this.updateScrollWheel();
      }
    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_SkillTree, 'updateScrollWheel', function()
  { // Aliased updateScrollWheel of class Sprite_SkillTree.
//-----------------------------------------------------------------------------

    if ( !this.parent._nodeEditorBox.isMoving() ) {
      if ( !this.parent._skillTreeSelectBox.isMoving() ) {
        if ( this.parent._nodeEditorBox.x != 0 ) {
          if ( this.parent._skillTreeSelectBox.y != 0 ) {
            $.alias();
          }
        }
      }
    }


  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_SkillTree, 'updateInput', function()
  { // Aliased updateInput of class Sprite_SkillTree.
//-----------------------------------------------------------------------------

    // $.alias();


  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_SkillTree, 'updateCursor', function()
  { // Aliased updateCursor of class Sprite_SkillTree.
//-----------------------------------------------------------------------------

    // $.alias();
    this._cursor.visible = false;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_SkillTree, 'createBlankNode', function( id )
  { // create a new blank node.
//-----------------------------------------------------------------------------

    return {
      id: id,
      skillId: 0,
      cost: 0,
      level: 0,
      description: '',
      parents: []
    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_SkillTree, 'getNodeAtIndex', function( index )
  { // return the node at the index specified.
//-----------------------------------------------------------------------------

    const { width, height } = this._data;
    const x = ( index % width );
    const y = Math.floor( index / width );

    if ( !this._data.tree[y] ) {
      this._data.tree[y] = [];
      while ( this._data.tree[y].length < width ) {
        this._data.tree[y].push( null );
      }
    }

    if ( !this._data.tree[y][x] ) {
      const id = ( y * width ) + x;
      this._data.tree[y][x] = this.createBlankNode( id );
    }

    return this._data.tree[y][x];

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_SkillTree, 'updateEditorClick', function()
  { // update click from debug.
//-----------------------------------------------------------------------------

    if ( this._data ) {

      if ( this.parent._skillTreeSelectBox.y == 0 ) return;
      if ( this.parent._nodeEditorBox.x == 0 ) return;

      const { x:tx, y:ty } = TouchInput;
      const { x, y } = this;
      const { width, height, tileSize } = this._data;

      const w = width * tileSize;
      const h = height * tileSize;

      let id = -1;

      if ( tx > x && tx < x + w && ty > y && ty < y + h ) {

        const ox = tx - x;
        const oy = ty - y;

        const tileX = Math.floor( ox / tileSize );
        const tileY = Math.floor( oy / tileSize );

        id = ( tileY * width ) + tileX

      }

      if ( this._gridId != id ) {
        this._gridId = id;
        this.refresh();
      }

      if ( this._gridId >= 0 && TouchInput.isTriggered() ) {

        if ( Input.isPressed( 'control' ) ) {
          this.removeChildrenNodes( this.nodeFromId( this._gridId ) );

        } else {
          $._clickId = this._gridId;

        }

      }

      if ( !TouchInput.isPressed() && $._clickId >= 0 ) {

        if ( $._clickId == this._gridId ) {
          const node = this.getNodeAtIndex( $._clickId );
          this.parent._nodeEditorBox.setNode( node );

        } else if ( this._gridId >= 0 ) {
          const parent = this.nodeFromId( $._clickId );
          const node = this.nodeFromId( this._gridId );
          if ( parent && node ) {
            if ( !node.parents.includes( parent.id ) ) {
              if ( !parent.parents.includes( node.id ) ) {
                node.parents.push( parent.id );
                SceneManager._scene.saveSkillTrees();
              }
            }
          }

        }

        $._clickId = -1;
        this.refresh();

      }
    }


  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_SkillTree, 'drawConnectors', function()
  { // Aliased drawConnectors of class Sprite_SkillTree.
//-----------------------------------------------------------------------------

    $.alias();
    if ( this.nodeFromId( $._clickId ) ) {
      this.drawDragConnection( this.nodeFromId( $._clickId ) );
    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_SkillTree, 'drawDragConnection', function( parent )
  { // draw connection from dragging via mouse.
//-----------------------------------------------------------------------------

    const node = this.nodeFromId( this._gridId );

    if ( parent == node || parent == null || this._gridId == -1 ) return;

    let enabled = true;

    if ( node == null ) enabled = false;
    if ( enabled && node.parents.includes( parent.id ) ) enabled = false;
    if ( enabled && parent.parents.includes( node.id ) ) enabled = false;

    const color0 = !enabled ? '#773333' : '#ff7700'
    const color1 = !enabled ? '#b50000' : '#cfb634'

    const p0 = this.getNodePosition( this._gridId );

    const iw = ( ImageManager.iconWidth || Window_Base._iconWidth ) / 2 + 8;
    const ih = ( ImageManager.iconHeight || Window_Base._iconHeight ) / 2 + 8;

    const radius = Math.sqrt( iw * iw, ih * ih );

    const p1 = this.getNodePosition( parent.id );

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

    this.bitmap.paintOpacity = 100;
    this.bitmap.drawArrow( x0, y0, x1, y1, width, color0 );

    const x2 = x0 + uVec.x;
    const y2 = y0 + uVec.y;
    const x3 = x1 - uVec.x * 2;
    const y3 = y1 - uVec.y * 2;

    this.bitmap.drawArrow( x2, y2, x3, y3, width - 2, color1 );
    this.bitmap.paintOpacity = 255;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_SkillTree, 'removeChildrenNodes', function( parent )
  { // remove the children nodes.
//-----------------------------------------------------------------------------

    if ( !parent ) return;

    const allNodes = this.allNodes()
    allNodes.forEach( node => {
      node.parents = node.parents.filter( id => id != parent.id );
    } );

    this.refresh();

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_SkillTree, 'refreshWindows', function()
  { // Aliased refreshWindows of class Sprite_SkillTree.
//-----------------------------------------------------------------------------

    // $.alias();
    if ( this.parent && this._data ) {
      const node = this.nodeFromId( this._gridId );
      this.parent._nameWindow.setNode( node );
      this.parent._requirementsWindow.setNode( node );
      this.parent._descriptionWindow.setText( node ? node.description : '' );
    }


  }, false );

//=============================================================================
// Bitmap :
//=============================================================================

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

  window.addEventListener('keydown', $.processKeyInput.bind( $ ) );

//=============================================================================
// Scene_Boot :
//=============================================================================

if ( Utils.RPGMAKER_NAME == 'MV' ) {

//-----------------------------------------------------------------------------
  $.alias( Scene_Boot, 'start', function()
  { // Aliased start of class Scene_Boot.
//-----------------------------------------------------------------------------

    $.alias();
    this.checkPlayerLocation();
    DataManager.setupNewGame();
    SceneManager.goto( Scene_SkillTree );
    Window_TitleCommand.initCommandPosition();


  }, false );

}
//-----------------------------------------------------------------------------
  $.alias( Scene_Boot, 'startNormalGame', function()
  { // Aliased startNormalGame of class Scene_Boot.
//-----------------------------------------------------------------------------

    // $.alias();

    this.checkPlayerLocation();
    DataManager.setupNewGame();
    SceneManager.goto( Scene_SkillTree );
    Window_TitleCommand.initCommandPosition();

    if ( !$gameTemp.isPlaytest() ) {
      throw new Error( 'Please remove Rosedale Skill Tree Builder before deploying!' )
    }


  }, false );

//=============================================================================

//=============================================================================
} )( Chaucer.treeBuilder );
//=============================================================================
