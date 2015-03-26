Ext.require(['Ext.form.field.ComboBox', 'Ext.window.MessageBox', 'Ext.form.FieldSet', 'Ext.tip.QuickTipManager', 'Ext.data.*']);

// Define the model for a State
Ext.define('Application.model.State', {
      extend : 'Ext.data.Model',
      fields : ['abbr', 'name', 'slogan']
    });

// The data for all states
var states = [{
      "abbr" : "AL",
      "name" : "Alabama",
      "slogan" : "The Heart of Dixie"
    }, {
      "abbr" : "AK",
      "name" : "Alaska",
      "slogan" : "The Land of the Midnight Sun"
    }, {
      "abbr" : "AZ",
      "name" : "Arizona",
      "slogan" : "The Grand Canyon State"
    }, {
      "abbr" : "AR",
      "name" : "Arkansas",
      "slogan" : "The Natural State"
    }, {
      "abbr" : "CA",
      "name" : "California",
      "slogan" : "The Golden State"
    }, {
      "abbr" : "CO",
      "name" : "Colorado",
      "slogan" : "The Mountain State"
    }, {
      "abbr" : "CT",
      "name" : "Connecticut",
      "slogan" : "The Constitution State"
    }, {
      "abbr" : "DE",
      "name" : "Delaware",
      "slogan" : "The First State"
    }, {
      "abbr" : "DC",
      "name" : "District of Columbia",
      "slogan" : "The Nation's Capital"
    }, {
      "abbr" : "FL",
      "name" : "Florida",
      "slogan" : "The Sunshine State"
    }, {
      "abbr" : "GA",
      "name" : "Georgia",
      "slogan" : "The Peach State"
    }, {
      "abbr" : "HI",
      "name" : "Hawaii",
      "slogan" : "The Aloha State"
    }, {
      "abbr" : "ID",
      "name" : "Idaho",
      "slogan" : "Famous Potatoes"
    }, {
      "abbr" : "IL",
      "name" : "Illinois",
      "slogan" : "The Prairie State"
    }, {
      "abbr" : "IN",
      "name" : "Indiana",
      "slogan" : "The Hospitality State"
    }, {
      "abbr" : "IA",
      "name" : "Iowa",
      "slogan" : "The Corn State"
    }, {
      "abbr" : "KS",
      "name" : "Kansas",
      "slogan" : "The Sunflower State"
    }, {
      "abbr" : "KY",
      "name" : "Kentucky",
      "slogan" : "The Bluegrass State"
    }, {
      "abbr" : "LA",
      "name" : "Louisiana",
      "slogan" : "The Bayou State"
    }, {
      "abbr" : "ME",
      "name" : "Maine",
      "slogan" : "The Pine Tree State"
    }, {
      "abbr" : "MD",
      "name" : "Maryland",
      "slogan" : "Chesapeake State"
    }, {
      "abbr" : "MA",
      "name" : "Massachusetts",
      "slogan" : "The Spirit of America"
    }, {
      "abbr" : "MI",
      "name" : "Michigan",
      "slogan" : "Great Lakes State"
    }, {
      "abbr" : "MN",
      "name" : "Minnesota",
      "slogan" : "North Star State"
    }, {
      "abbr" : "MS",
      "name" : "Mississippi",
      "slogan" : "Magnolia State"
    }, {
      "abbr" : "MO",
      "name" : "Missouri",
      "slogan" : "Show Me State"
    }, {
      "abbr" : "MT",
      "name" : "Montana",
      "slogan" : "Big Sky Country"
    }, {
      "abbr" : "NE",
      "name" : "Nebraska",
      "slogan" : "Beef State"
    }, {
      "abbr" : "NV",
      "name" : "Nevada",
      "slogan" : "Silver State"
    }, {
      "abbr" : "NH",
      "name" : "New Hampshire",
      "slogan" : "Granite State"
    }, {
      "abbr" : "NJ",
      "name" : "New Jersey",
      "slogan" : "Garden State"
    }, {
      "abbr" : "NM",
      "name" : "New Mexico",
      "slogan" : "Land of Enchantment"
    }, {
      "abbr" : "NY",
      "name" : "New York",
      "slogan" : "Empire State"
    }, {
      "abbr" : "NC",
      "name" : "North Carolina",
      "slogan" : "First in Freedom"
    }, {
      "abbr" : "ND",
      "name" : "North Dakota",
      "slogan" : "Peace Garden State"
    }, {
      "abbr" : "OH",
      "name" : "Ohio",
      "slogan" : "The Heart of it All"
    }, {
      "abbr" : "OK",
      "name" : "Oklahoma",
      "slogan" : "Oklahoma is OK"
    }, {
      "abbr" : "OR",
      "name" : "Oregon",
      "slogan" : "Pacific Wonderland"
    }, {
      "abbr" : "PA",
      "name" : "Pennsylvania",
      "slogan" : "Keystone State"
    }, {
      "abbr" : "RI",
      "name" : "Rhode Island",
      "slogan" : "Ocean State"
    }, {
      "abbr" : "SC",
      "name" : "South Carolina",
      "slogan" : "Nothing Could be Finer"
    }, {
      "abbr" : "SD",
      "name" : "South Dakota",
      "slogan" : "Great Faces, Great Places"
    }, {
      "abbr" : "TN",
      "name" : "Tennessee",
      "slogan" : "Volunteer State"
    }, {
      "abbr" : "TX",
      "name" : "Texas",
      "slogan" : "Lone Star State"
    }, {
      "abbr" : "UT",
      "name" : "Utah",
      "slogan" : "Salt Lake State"
    }, {
      "abbr" : "VT",
      "name" : "Vermont",
      "slogan" : "Green Mountain State"
    }, {
      "abbr" : "VA",
      "name" : "Virginia",
      "slogan" : "Mother of States"
    }, {
      "abbr" : "WA",
      "name" : "Washington",
      "slogan" : "Green Tree State"
    }, {
      "abbr" : "WV",
      "name" : "West Virginia",
      "slogan" : "Mountain State"
    }, {
      "abbr" : "WI",
      "name" : "Wisconsin",
      "slogan" : "America's Dairyland"
    }, {
      "abbr" : "WY",
      "name" : "Wyoming",
      "slogan" : "Like No Place on Earth"
    }];

var statesStore = Ext.create('Ext.data.Store', {
      autoDestroy : true,
      autoLoad : true,
      sortOnLoad : true,
      storeId : 'myStatesStoreId',
      model : 'Application.model.State',
      data : states
    });

/* global console */
/*
 * Plugin, which can be used with any class, which inherits from
 * Ext.form.field.Text (xtype: textfield). The plugin requires a HTML input or
 * textarea.
 * 
 * Note: This plugin is a generalisation of the combo-box auto-complete feature.
 */
Ext.define("Webmail.view.plugin.AutoComplete", {
      extend : 'Ext.AbstractPlugin',
      mixins : ['Ext.util.Observable'],
      uses : ['Ext.XTemplate', 'Ext.view.BoundList', 'Ext.view.BoundListKeyNav', 'Ext.data.Store'],
      alias : 'plugin.auto-complete',
      pageSize : 0,
      defaultListConfig : {
        emptyText : '',
        loadingText : 'Loading...',
        loadingHeight : 70,
        minWidth : 100,
        maxHeight : 300,
        shadow : 'sides'
      },
      init : function(component) {
        // Store to auto complete against
        this.store = Ext.getStore(this.storeId);
        // Field from store to show in pop-up list.
        this.displayField = this.displayField;
        this.valueField = this.valueField;

        if (!this.displayTpl) {
          this.displayTpl = Ext.create('Ext.XTemplate', '<tpl for=".">' + '{[typeof values === "string" ? values : values.' + this.displayField + ']}' + '<tpl if="xindex < xcount">' + this.delimiter + '</tpl>' + '</tpl>');
        } else if (Ext.isString(this.displayTpl)) {
          this.displayTpl = Ext.create('Ext.XTemplate', this.displayTpl);
        }

        // Setup key event when component is rendered, so we have 'inputEl'.
        // Note: We bypass the 'enableKeyEvents' config of text fields.
        component.on('render', function(cmp, obj) {
              this.mon(this.cmp.inputEl, {
                    scope : this,
                    keyup : this.onKeyUp
                  });
            }, this);
      },
      onKeyUp : function(component, event) {
        var me = this, keyNav = me.listKeyNav, selectOnTab = me.selectOnTab, picker = me.picker ? me.picker : me.getPicker();

        // Handle BoundList navigation from the input field. Insert a tab
        // listener specially to enable selectOnTab.
        if (keyNav) {
          keyNav.enable();
        } else {
          keyNav = me.listKeyNav = Ext.create('Ext.view.BoundListKeyNav', me.cmp.inputEl, {
                boundList : picker,
                forceKeyDown : true,
                tab : function(e) {
                  if (selectOnTab) {
                    me.selectHighlighted(e);
                    me.triggerBlur();
                  }
                  // Tab key event is allowed to propagate to field
                  return true;
                }
              });
        }

        console.log('Selection model', picker.getSelectionModel());

        picker.enable();
        picker.show(true);
        me.picker = picker;
        // While list is expanded, stop tab monitoring from
        // Ext.form.field.Trigger so it doesn't short-circuit selectOnTab
        if (selectOnTab) {
          me.ignoreMonitorTab = true;
        }

        Ext.defer(keyNav.enable, 1, keyNav); // wait a bit so it doesn't react
        // to the down arrow opening the
        // picker
        me.cmp.inputEl.focus();
      },
      getPicker : function() {
        var me = this, picker, menuCls = Ext.baseCSSPrefix + 'menu', opts = Ext.apply({
              selModel : {
                mode : me.multiSelect ? 'SIMPLE' : 'SINGLE'
              },
              floating : true,
              hidden : true,
              ownerCt : me.ownerCt,
              cls : me.cmp.el.up('.' + menuCls) ? menuCls : '',
              store : me.store,
              displayField : me.displayField,
              focusOnToFront : false,
              pageSize : me.pageSize
            }, me.listConfig, me.defaultListConfig);

        picker = me.picker = Ext.create('Ext.view.BoundList', opts);
        me.mon(picker, {
              itemclick : me.onItemClick,
              refresh : me.onListRefresh,
              scope : me
            });

        me.mon(picker.getSelectionModel(), {
              selectionChange : me.onListSelectionChange,
              scope : me
            });

        return picker;
      },

      onItemClick : function(picker, record) {
        /*
         * If we're doing single selection, the selection change events won't
         * fire when clicking on the selected element. Detect it here.
         */
        var me = this, lastSelection = me.lastSelection, valueField = me.valueField, selected;

        if (lastSelection) {
          selected = lastSelection[0];
          if (record.get(valueField) === selected.get(valueField)) {
            me.collapse();
          }
        }
        me.setValue(record);
      },

      onListRefresh : function(boundList) {
        var me = this;
        boundList.alignTo(me.cmp.inputEl, 'bl?');
        this.syncSelection();
      },
      /**
       * @protected Aligns the picker to the element
       */
      alignPicker : function() {
        var me = this, picker, isAbove, aboveSfx = '-above';

        if (this.isExpanded) {
          picker = me.getPicker();
          if (me.matchFieldWidth) {
            // Auto the height (it will be constrained by min and max width)
            // unless there are no records to display.
            picker.setSize(me.bodyEl.getWidth(), picker.store && picker.store.getCount() ? null : 0);
          }
          if (picker.isFloating()) {
            picker.alignTo(me.cmp.inputEl, me.pickerAlign, me.pickerOffset);

            // add the {openCls}-above class if the picker was aligned above
            // the field due to hitting the bottom of the viewport
            isAbove = picker.el.getY() < me.inputEl.getY();
            me.bodyEl[isAbove ? 'addCls' : 'removeCls'](me.openCls + aboveSfx);
            picker.el[isAbove ? 'addCls' : 'removeCls'](picker.baseCls + aboveSfx);
          }
        }
      },
      onListSelectionChange : function(list, selectedRecords) {
        var me = this;
        // Only react to selection if it is not called from setValue, and if our
        // list is
        // expanded (ignores changes to the selection model triggered elsewhere)
        if (!me.ignoreSelection && me.isExpanded) {
          if (!me.multiSelect) {
            Ext.defer(me.collapse, 1, me);
          }
          me.setValue(selectedRecords, false);
          if (selectedRecords.length > 0) {
            me.fireEvent('select', me, selectedRecords);
          }
          me.inputEl.focus();
        }
      },

      /**
       * @private Enables the key nav for the BoundList when it is expanded.
       */
      onExpand : function() {
        var me = this, keyNav = me.listKeyNav, selectOnTab = me.selectOnTab, picker = me.getPicker();

        // Handle BoundList navigation from the input field. Insert a tab
        // listener specially to enable selectOnTab.
        if (keyNav) {
          keyNav.enable();
        } else {
          keyNav = me.listKeyNav = Ext.create('Ext.view.BoundListKeyNav', me.inputEl, {
                boundList : picker,
                forceKeyDown : true,
                tab : function(e) {
                  if (selectOnTab) {
                    me.selectHighlighted(e);
                    me.triggerBlur();
                  }
                  // Tab key event is allowed to propagate to field
                  return true;
                }
              });
        }

        // While list is expanded, stop tab monitoring from
        // Ext.form.field.Trigger so it doesn't short-circuit selectOnTab
        if (selectOnTab) {
          me.ignoreMonitorTab = true;
        }

        Ext.defer(keyNav.enable, 1, keyNav); // wait a bit so it doesn't react
        // to the down arrow opening the
        // picker
        me.inputEl.focus();
      },

      /**
       * @private Disables the key nav for the BoundList when it is collapsed.
       */
      onCollapse : function() {
        var me = this, keyNav = me.listKeyNav;
        if (keyNav) {
          keyNav.disable();
          me.ignoreMonitorTab = false;
        }
      },
      setValue : function(value, doSelect) {
        var me = this, valueNotFoundText = me.valueNotFoundText, inputEl = me.cmp.inputEl, i, len, record, models = [], displayTplData = [], processedValue = [];

        if (me.store.loading) {
          // Called while the Store is loading. Ensure it is processed by the
          // onLoad method.
          me.value = value;
          return me;
        }

        // This method processes multi-values, so ensure value is an array.
        value = Ext.Array.from(value);

        // Loop through values
        for (i = 0, len = value.length; i < len; i += 1) {
          record = value[i];
          if (!record || !record.isModel) {
            record = me.findRecordByValue(record);
          }
          // record found, select it.
          if (record) {
            models.push(record);
            displayTplData.push(record.data);
            processedValue.push(record.get(me.valueField));
          }
          // record was not found, this could happen because
          // store is not loaded or they set a value not in the store
          else {
            // if valueNotFoundText is defined, display it, otherwise display
            // nothing for this value
            if (Ext.isDefined(valueNotFoundText)) {
              displayTplData.push(valueNotFoundText);
            }
            processedValue.push(value[i]);
          }
        }

        // Set the value of this field. If we are multiselecting, then that is
        // an array.
        me.value = me.multiSelect ? processedValue : processedValue[0];
        if (!Ext.isDefined(me.value)) {
          me.value = null;
        }
        me.displayTplData = displayTplData; // store for getDisplayValue method
        me.lastSelection = me.valueModels = models; // TODO: Which models..?

        if (inputEl && me.emptyText && !Ext.isEmpty(value)) {
          inputEl.removeCls(me.emptyCls);
        }

        // Calculate raw value from the collection of Model data
        me.cmp.setRawValue(me.cmp.getRawValue() + ', ' + me.getDisplayValue());
        me.cmp.checkChange();

        if (doSelect !== false) {
          me.syncSelection();
        }
        me.cmp.applyEmptyText();

        return me;
      },
      /**
       * Collapse this field's picker dropdown.
       */
      collapse : function() {
        if (this.isExpanded && !this.isDestroyed) {
          var me = this, openCls = me.openCls, picker = me.picker, doc = Ext.getDoc(), collapseIf = me.collapseIf, aboveSfx = '-above';

          // hide the picker and set isExpanded flag
          picker.hide();
          me.isExpanded = false;

          // remove the openCls
          me.bodyEl.removeCls([openCls, openCls + aboveSfx]);
          picker.el.removeCls(picker.baseCls + aboveSfx);

          // remove event listeners
          doc.un('mousewheel', collapseIf, me);
          doc.un('mousedown', collapseIf, me);
          Ext.EventManager.removeResizeListener(me.alignPicker, me);
          me.fireEvent('collapse', me);
          me.onCollapse();
        }
      },
      syncSelection : function() {
        var me = this, ExtArray = Ext.Array, picker = me.picker, selection, selModel;
        if (picker) {
          // From the value, find the Models that are in the store's current
          // data
          selection = [];
          ExtArray.forEach(me.valueModels || [], function(value) {
                if (value && value.isModel && me.store.indexOf(value) >= 0) {
                  selection.push(value);
                }
              });

          // Update the selection to match
          me.ignoreSelection += 1;
          selModel = picker.getSelectionModel();
          selModel.deselectAll();
          if (selection.length) {
            selModel.select(selection);
          }
          me.ignoreSelection -= 1;
        }
      },
      /**
       * Find the record by searching for a specific field/value combination
       * Returns an Ext.data.Record or false
       * 
       * @private
       */
      findRecord : function(field, value) {
        var ds = this.store, idx = ds.findExact(field, value);
        return idx !== -1 ? ds.getAt(idx) : false;
      },
      findRecordByValue : function(value) {
        return this.findRecord(this.valueField, value);
      },
      findRecordByDisplay : function(value) {
        return this.findRecord(this.displayField, value);
      },
      /**
       * @private Generate the string value to be displayed in the text field
       *          for the currently stored value
       */
      getDisplayValue : function() {
        return this.displayTpl.apply(this.displayTplData);
      }
    });

var toolbar1 = Ext.create('Ext.toolbar.Toolbar', {
      height : 30,
      id : 'my_toolbar_',
      items : [{
            xtype : 'checkbox',
            // creating unique id because we need handle of this checkbox later
            id : 'my_toolbar_selectAllChkBox',
            style : 'padding:-1px 0px 0px 1px;',
            boxLabel : 'Select All',
            width : 100,
            handler : function(chkBox, isChecked) {
              var selectAll = (chkBox.boxLabel == "Select All") ? true : false;
              var combo = Ext.getCmp('StatesComboList');
              var totalCount = 0;
              var store = combo.getStore();
              var totalRecords = store.getRange().length;
              if (selectAll) {
                for (var i = 0; i < totalRecords; i++) {
                  combo.select(store.getAt(i));
                }
                totalCount = totalRecords;
                chkBox.setBoxLabel("Deselect All");
              } else {
                // else condition means, not all of them are selected
                combo.clearValue();
                totalCount = 0;
                chkBox.setBoxLabel("Select All");
              }
            }
          }, '-', {
            xtype : 'textfield',
            enableKeyEvents : true,
            id : 'my_toolbar_filter-field',
            emptyText : 'enter search text',
            listeners : {
              keyup : function(field, e) {
              }
            }
          }, '->', {
            xtype : 'tbtext',
            text : 'Selected : 2',
            qtip : 'Total selected items',
            id : 'my_toolbar_total-count'
          }]
    });

/**
 * Reference Link -
 * http://stackoverflow.com/questions/6600919/extjs-4-combobox-with-checkboxes
 */
Ext.define('Application.view.item.Show', {
      extend : 'Ext.panel.Panel',
      alias : 'widget.itemShow',
      title : 'Item data',
      frame : true,
      // Layout configuration
      layout : {
        type : 'fit'
      },
      items : [{
            xtype : 'container',
            layout : {
              type : 'vbox',
              align : 'stretch'
            },
            margin : '0 0 10',
            // Item id - used by Ext.getCmp() method for instance
            // selection
            id : 'item_show',
            // Html inside this component
            // html : 'This will be in south of center panel',
            // Since adding parameter "padding" to this item
            // doesn't work - we'll add some direct styles
            style : {
              padding : '10px'
            },
            items : [{
                  xtype : 'combo',
                  id : 'StatesComboList',
                  fieldLabel : 'Choose State',
                  // maxHeight : 150,
                  // width : 210,
                  multiSelect : true,
                  emptyText : "Select states",
                  store : statesStore,
                  displayField : 'name',
                  valueField : 'abbr',
                  editable : false,
                  queryMode : 'local',
                  // getInnerTpl : function() {
                  // return '<div class="x-combo-list-item"><img src="' +
                  // Ext.BLANK_IMAGE_URL + '" class="chkCombo-default-icon
                  // chkCombo" />{abbr} - {name}</div>';
                  // },
                  tpl : Ext.create('Ext.XTemplate', '<div id="my_combo_toolbar_holder"></div>', '<tpl for=".">', '<div class="x-boundlist-item"><img src="' + Ext.BLANK_IMAGE_URL + '" class="chkCombo-default-icon chkCombo" />{abbr} - {name}</div>', '</tpl>'),
                  displayTpl : Ext.create('Ext.XTemplate', '<tpl for=".">', '{name} [{abbr}], ', '</tpl>'),
                  listeners : {
                    expand : function(thisComp, eOpts) {
                      if (Ext.get('my_combo_toolbar_container') == null) {
                        var dropdown = Ext.get('my_combo_toolbar_holder').dom.parentElement;
                        var container = Ext.DomHelper.insertBefore(dropdown, '<div id="my_combo_toolbar_container"></div>', true);
                        Ext.getCmp('my_toolbar_').render(container);
                      }
                    }
                  }
                }, {
                  xtype : 'textareafield',
                  name : 'query',
                  id : 'searchQueryTextAreaId',
                  hideLabel : true,
                  hideTrigger : true,
                  grow : true,
                  maxHeight : 200,
                  emptyText : 'Write Search Query here e.g. TI=test',
                  flex : 1,
                  fieldLabel : 'TextAreafield with auto-complete',
                  plugins : [{
                        ptype : 'auto-complete',
                        storeId : 'myStatesStoreId',
                        displayField : 'name',
                        valueField : 'abbr'
                      }]
                }]
          }]
    });