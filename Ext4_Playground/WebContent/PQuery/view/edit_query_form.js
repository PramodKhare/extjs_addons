/**
 * Author : Pramod Khare Contains - source code for Patent Search Query Form
 * panel - with customized textarea
 */

Ext.define('Ext.form.field.ASMSHighlightedTextArea', {
      extend : 'Ext.form.field.TextArea',
      alias : 'widget.ASMSHighlightedTextArea',
      insertAtCursor : function(v) {
        var document_id = this.getFocusEl().id;
        var text_field = document.getElementById(document_id);
        var startPos = text_field.selectionStart;
        var endPos = text_field.selectionEnd;
        text_field.value = text_field.value.substring(0, startPos) + v + text_field.value.substring(endPos, text_field.value.length);

        this.el.focus();
        text_field.setSelectionRange(endPos + v.length, endPos + v.length);
      },
      getCursorSelectionStartPosition : function() {
        var document_id = this.getFocusEl().id;
        var text_field = document.getElementById(document_id);
        return text_field.selectionStart;
      },
      getCursorSelectionEndPosition : function() {
        var document_id = this.getFocusEl().id;
        var text_field = document.getElementById(document_id);
        return text_field.selectionEnd;
      }
    });

Ext.define('Ext.Msg.proximity.prompt', {
      extend : 'Ext.window.Window',
      height : 140,
      width : 320,
      title : 'Set Proximity Operator',
      layout : 'fit',
      id : 'proximitySearchOptionsWindowId',
      modal : true,
      autoDestroy : true,
      buttonAlign : 'center',
      closable : true,
      items : [{
            xtype : 'form',
            frame : true,
            border : false,
            layout : {
              type : 'hbox',
              align : 'middle'
            },
            items : [{
                  xtype : 'container',
                  flex : 1,
                  border : false,
                  padding : 5,
                  layout : {
                    type : 'vbox',
                    align : 'stretch'
                  },
                  items : [{
                        xtype : 'numberfield',
                        fieldLabel : 'Word X is up to a maximum of ',
                        id : 'maxWordProximityXId',
                        labelSeparator : "",
                        allowBlank : false,
                        labelWidth : 200,
                        flex : 1,
                        value : 1,
                        minValue : 1,
                        maxValue : 10
                      }, {
                        xtype : 'combo',
                        valueField : 'id',
                        id : 'wordsApartFromComboId',
                        fieldLabel : 'word(s) apart from word Y ',
                        labelSeparator : "",
                        labelWidth : 150,
                        flex : 1,
                        value : 0,
                        editable : false,
                        displayField : 'name',
                        store : new Ext.data.Store({
                              fields : ['id', 'name'],
                              data : [{
                                    id : 0,
                                    name : 'in the same order'
                                  }, {
                                    id : 1,
                                    name : 'order does not matter'
                                  }]
                            })
                      }]
                }]
          }],
      buttons : [{
            text : 'Insert in Query',
            handler : function() {
              var wordOrder = Ext.getCmp('wordsApartFromComboId').getValue();
              var proximity = Ext.getCmp('maxWordProximityXId').getValue();
              var field = Ext.getCmp('searchQueryTextAreaId');
              if (wordOrder == 0) {
                field.insertAtCursor(" +" + proximity + "W");
              } else {
                field.insertAtCursor(" /" + proximity + "W");
              }
              Ext.getCmp('proximitySearchOptionsWindowId').close();
              field.focus();
            }
          }, {
            text : 'Cancel',
            handler : function() {
              Ext.getCmp('proximitySearchOptionsWindowId').close();
              Ext.getCmp('searchQueryTextAreaId').focus();
            }
          }]
    });

var getEditQueryFormToolbar = function() {
  var editQueryFormToolbar = Ext.getCmp('');
  if (editQueryFormToolbar != null) {
    return editQueryFormToolbar;
  }
  editQueryFormToolbar = Ext.create('Ext.toolbar.Toolbar', {
        id : 'editQueryFormToolbarId',
        items : [{
              text : '=',
              tooltip : '"Equal to" operator',
              scope : this,
              handler : function() {
                // Append '=' sign to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                field.insertAtCursor(" =");
                field.focus();
              }
            }, '-', {
              text : '<',
              tooltip : '"Less than" operator<br/>Example : < 123456',
              scope : this,
              handler : function() {
                // Append '<' sign to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                field.insertAtCursor(" <");
                field.focus();
              }
            }, '-', {
              text : '>',
              tooltip : '"Greater than" operator<br/>Example : > 123456',
              scope : this,
              handler : function() {
                // Append '>' sign to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                field.insertAtCursor(" >");
                field.focus();
              }
            }, '-', {
              text : '<=',
              tooltip : '"Less than or Equal to" operator<br/>Example : <= 123456',
              scope : this,
              handler : function() {
                // Append '<=' sign to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                field.insertAtCursor(" <=");
                field.focus();
              }
            }, '-', {
              text : '>=',
              tooltip : '"Greater than or Equal to" operator<br/>Example : >= 123456',
              scope : this,
              handler : function() {
                // Append '>=' sign to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                field.insertAtCursor(" >=");
                field.focus();
              }
            }, '-', {
              text : '()',
              tooltip : 'Use parenthesis to clarify order of operation<br/>Example : z AND (x OR y)',
              scope : this,
              handler : function() {
                // Append '()' sign to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                var newCursorPos = field.getCursorSelectionStartPosition() + 2;
                field.insertAtCursor(" ()");
                field.selectText(newCursorPos, newCursorPos);
                field.focus();
              }
            }, '-', {
              text : '[]',
              tooltip : '"Range" operator<br/>Example : [1234, 15987]',
              scope : this,
              handler : function() {
                // Append '[]' sign to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                var newCursorPos = field.getCursorSelectionStartPosition() + 1;
                field.insertAtCursor("[, ]");
                field.selectText(newCursorPos, newCursorPos);
                field.focus();
              }
            }, '-', {
              text : '*',
              tooltip : '"Asterisk wildcard" operator',
              scope : this,
              handler : function() {
                // Append '*' sign to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                field.insertAtCursor("*");
                field.focus();
              }
            }, '-', {
              text : '#',
              tooltip : '"Hash wildcard" operator',
              scope : this,
              handler : function() {
                // Append '#' sign to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                field.insertAtCursor("#");
                field.focus();
              }
            }, '-', {
              text : '"',
              tooltip : 'Use double quotes to search for exact phrase<br/>Example : "test"',
              scope : this,
              handler : function() {
                // Append '""' sign to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                var newCursorPos = field.getCursorSelectionStartPosition() + 1;
                field.insertAtCursor("\"\"");
                field.selectText(newCursorPos, newCursorPos);
                field.focus();
              }
            }, '-', '-', {
              text : 'AND',
              tooltip : 'AND Operator',
              scope : this,
              handler : function() {
                // Append 'AND' to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                field.insertAtCursor(" AND ");
                field.focus();
              }
            }, '-', {
              text : 'OR',
              tooltip : 'OR Operator',
              scope : this,
              handler : function() {
                // Append 'OR' to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                field.insertAtCursor(" OR ");
                field.focus();
              }
            }, '-', {
              text : 'NOT',
              tooltip : 'NOT Operator',
              scope : this,
              handler : function() {
                // Append 'NOT' to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                field.insertAtCursor(" NOT ");
                field.focus();
              }
            }, '-', '-', {
              text : 'Proximity',
              tooltip : 'Use proximity search operator',
              scope : this,
              handler : function() {
                // Append '+/W<count>' or '/W<count>' to current cursor position
                var proximityOptionsWindow = Ext.getCmp('proximitySearchOptionsWindowId');
                if (proximityOptionsWindow == null) {
                  Ext.create('Ext.Msg.proximity.prompt').show();
                } else {
                  proximityOptionsWindow.show();
                }
              }
            }]
      });
  return editQueryFormToolbar;
}

// Search Patents Query Form Panel
var getSearchQueryEditFormPanel = function() {
  var searchQueryEditForm = Ext.getCmp('searchQueryEditFormId');
  if (searchQueryEditForm != null) {
    return searchQueryEditForm;
  }

  searchQueryEditForm = Ext.create('Ext.form.Panel', {
        // url: 'save-form.php',
        layout : 'anchor',
        defaults : {
          anchor : '100%'
        },
        frame : true,
        id : 'searchQueryEditFormId',
        defaultType : 'textfield',
        tbar : getEditQueryFormToolbar(),
        items : [{
              xtype : 'ASMSHighlightedTextArea',
              name : 'query',
              id : 'searchQueryTextAreaId',
              hideLabel : true,
              hideTrigger : true,
              grow : true,
              maxHeight : 200,
              emptyText : 'Write Search Query here e.g. TI=test',
              anchor : '100%'
            }],
        buttonAlign : 'center',
        formPanelDropTarget : null,
        listeners : {
          afterlayout : function(form, layout, eOpts) {
            var body = form.body;
            form.formPanelDropTarget = new Ext.dd.DropTarget(body, {
                  ddGroup : 'grid-to-query-form',
                  notifyEnter : function(ddSource, e, data) {
                    // Add some flare to invite drop.
                    body.stopAnimation();
                    body.highlight();
                  },
                  notifyDrop : function(ddSource, e, data) {
                    var selectedRecord = ddSource.dragData.records[0];
                    form.items.items[0].insertAtCursor(' ' + selectedRecord.get('id') + ' ');
                    return true;
                  }
                });
          },
          beforeDestroy : function(form, layout, eOpts) {
            var target = form.formPanelDropTarget;
            if (target) {
              target.unreg();
              form.formPanelDropTarget = null;
            }
          }
        },
        buttons : [{
              text : 'Search',
              formBind : true,
              disabled : true,
              handler : function() {
                // submit query value to backend url
              }
            }, {
              text : 'Reset',
              handler : function() {
                Ext.getCmp('searchQueryTextAreaId').setValue('');
              }
            }, {
              text : 'Save Query',
              handler : function() {
                // submit query value to backend url
              }
            }]
      });
  return searchQueryEditForm;
}

//
// {
// xtype : 'panel',
// header : false,
// border : false,
// // title : 'Query',
// // tooltip : 'Query Edit Zone',
// flex : 1,
// layout : 'fit',
// items : [{
// xtype : 'fieldset',
// flex : 1,
// frame : true,
// title : 'Query',
// layout : 'anchor',
// defaults : {
// anchor : '100%',
// hideEmptyLabel : false
// },
// items : [{
// xtype : 'combo',
// hideTrigger : true,
// id : 'AutoSuggestList',
// hideLabel : true,
// anchor : '100%',
// multiSelect : true,
// emptyText : "Select states",
// store : Ext.data.StoreManager.lookup('statesStore'),
// displayField : 'name',
// valueField : 'abbr',
// editable : true,
// queryMode : 'local',
// tpl : Ext.create('Ext.XTemplate', '<tpl for=".">', '<div
// class="x-boundlist-item"><img src="' + Ext.BLANK_IMAGE_URL + '"
// class="chkCombo-default-icon chkCombo" />{abbr} - {name}</div>', '</tpl>'),
// displayTpl : Ext.create('Ext.XTemplate', '<tpl for=".">', '{name} [{abbr}],
// ', '</tpl>')
// }]
// }]
// }

// +++++++++++++++++++++++++++++

// {
// // xtype : 'textareafield',
// name : 'query',
// hideLabel : true,
// xtype : 'combo',
// hideTrigger : true,
// grow : true,
// maxHeight : 200,
// multiSelect : true,
// emptyText : 'Write Search Query here e.g. TI=test',
// store : Ext.data.StoreManager.lookup('statesStore'),
// displayField : 'name',
// valueField : 'abbr',
// editable : true,
// queryMode : 'local',
// tpl : Ext.create('Ext.XTemplate', '<tpl for=".">', '<div
// class="x-boundlist-item"><img src="' + Ext.BLANK_IMAGE_URL + '"
// class="chkCombo-default-icon chkCombo" />{abbr} - {name}</div>', '</tpl>'),
// displayTpl : Ext.create('Ext.XTemplate', '<tpl for=".">', '{name} [{abbr}],',
// '</tpl>'),
// anchor : '100%',
// listeners : {
// render : initializeFieldsDropZone
// }
