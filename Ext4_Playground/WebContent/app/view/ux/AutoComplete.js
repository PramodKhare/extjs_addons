/*global console*/
/*
 * Plugin, which can be used with any class, which inherits from Ext.form.field.Text (xtype: textfield).
 * The plugin requires a HTML input or textarea.
 *
 * Note: This plugin is a generalisation of the combo-box auto-complete feature.
 */
Ext.define("Webmail.view.plugin.AutoComplete", {
    extend: 'Ext.AbstractPlugin',
    mixins: ['Ext.util.Observable'],
    uses: [
        'Ext.XTemplate',
        'Ext.view.BoundList',
        'Ext.view.BoundListKeyNav',
        'Ext.data.Store'
    ],
    alias: 'plugin.auto-complete',
    pageSize: 0,
    defaultListConfig: {
        emptyText: '',
        loadingText: 'Loading...',
        loadingHeight: 70,
        minWidth: 100,
        maxHeight: 300,
        shadow: 'sides'
    },
    init: function (component) {
        var store = Ext.data.StoreManager.get("SomeName");
        if (!store) {
          store = Ext.create("SomeName");
        }
        this.store = store; 
        // Store to auto complete against
        this.store = Ext.getStore(this.storeId);
        //  Field from store to show in pop-up list.
        this.displayField = this.displayField;
        this.valueField = this.valueField;

        if (!this.displayTpl) {
            this.displayTpl = Ext.create('Ext.XTemplate',
                '<tpl for=".">' +
                    '{[typeof values === "string" ? values : values.' + this.displayField + ']}' +
                    '<tpl if="xindex < xcount">' + this.delimiter + '</tpl>' +
                '</tpl>'
            );
        } else if (Ext.isString(this.displayTpl)) {
            this.displayTpl = Ext.create('Ext.XTemplate', this.displayTpl);
        }

        // Setup key event when component is rendered, so we have 'inputEl'.
        // Note: We bypass the 'enableKeyEvents' config of text fields.
        component.on('render', function (cmp, obj) {
            this.mon(this.cmp.inputEl, {
                scope: this,
                keyup: this.onKeyUp
            });
        }, this);
    },
    onKeyUp: function (component, event) {
        var me = this,
            keyNav = me.listKeyNav,
            selectOnTab = me.selectOnTab,
            picker = me.picker ? me.picker : me.getPicker();

        // Handle BoundList navigation from the input field. Insert a tab listener specially to enable selectOnTab.
        if (keyNav) {
            keyNav.enable();
        } else {
            keyNav = me.listKeyNav = Ext.create('Ext.view.BoundListKeyNav', me.cmp.inputEl, {
                boundList: picker,
                forceKeyDown: true,
                tab: function (e) {
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
        // While list is expanded, stop tab monitoring from Ext.form.field.Trigger so it doesn't short-circuit selectOnTab
        if (selectOnTab) {
            me.ignoreMonitorTab = true;
        }

        Ext.defer(keyNav.enable, 1, keyNav); //wait a bit so it doesn't react to the down arrow opening the picker
        me.cmp.inputEl.focus();
    },
    getPicker: function () {
        var me = this,
            picker,
            menuCls = Ext.baseCSSPrefix + 'menu',
            opts = Ext.apply({
                selModel: {
                    mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
                },
                floating: true,
                hidden: true,
                ownerCt: me.ownerCt,
                cls: me.cmp.el.up('.' + menuCls) ? menuCls : '',
                store: me.store,
                displayField: me.displayField,
                focusOnToFront: false,
                pageSize: me.pageSize
            }, me.listConfig, me.defaultListConfig);

        picker = me.picker = Ext.create('Ext.view.BoundList', opts);
        me.mon(picker, {
            itemclick: me.onItemClick,
            refresh: me.onListRefresh,
            scope: me
        });

        me.mon(picker.getSelectionModel(), {
            selectionChange: me.onListSelectionChange,
            scope: me
        });

        return picker;
    },

    onItemClick: function (picker, record) {
        /*
         * If we're doing single selection, the selection change events won't fire when
         * clicking on the selected element. Detect it here.
         */
        var me = this,
            lastSelection = me.lastSelection,
            valueField = me.valueField,
            selected;

        if (lastSelection) {
            selected = lastSelection[0];
            if (record.get(valueField) === selected.get(valueField)) {
                me.collapse();
            }
        }
        me.setValue(record);
    },

    onListRefresh: function (boundList) {
        var me = this;
        boundList.alignTo(me.cmp.inputEl, 'bl?');
        this.syncSelection();
    },
    /**
     * @protected
     * Aligns the picker to the element
     */
    alignPicker: function () {
        var me = this,
            picker, isAbove,
            aboveSfx = '-above';

        if (this.isExpanded) {
            picker = me.getPicker();
            if (me.matchFieldWidth) {
                // Auto the height (it will be constrained by min and max width) unless there are no records to display.
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
    onListSelectionChange: function (list, selectedRecords) {
        var me = this;
        // Only react to selection if it is not called from setValue, and if our list is
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
     * @private
     * Enables the key nav for the BoundList when it is expanded.
     */
    onExpand: function () {
        var me = this,
            keyNav = me.listKeyNav,
            selectOnTab = me.selectOnTab,
            picker = me.getPicker();

        // Handle BoundList navigation from the input field. Insert a tab listener specially to enable selectOnTab.
        if (keyNav) {
            keyNav.enable();
        } else {
            keyNav = me.listKeyNav = Ext.create('Ext.view.BoundListKeyNav', me.inputEl, {
                boundList: picker,
                forceKeyDown: true,
                tab: function (e) {
                    if (selectOnTab) {
                        me.selectHighlighted(e);
                        me.triggerBlur();
                    }
                    // Tab key event is allowed to propagate to field
                    return true;
                }
            });
        }

        // While list is expanded, stop tab monitoring from Ext.form.field.Trigger so it doesn't short-circuit selectOnTab
        if (selectOnTab) {
            me.ignoreMonitorTab = true;
        }

        Ext.defer(keyNav.enable, 1, keyNav); //wait a bit so it doesn't react to the down arrow opening the picker
        me.inputEl.focus();
    },

    /**
     * @private
     * Disables the key nav for the BoundList when it is collapsed.
     */
    onCollapse: function () {
        var me = this,
            keyNav = me.listKeyNav;
        if (keyNav) {
            keyNav.disable();
            me.ignoreMonitorTab = false;
        }
    },
    setValue: function (value, doSelect) {
        var me = this,
            valueNotFoundText = me.valueNotFoundText,
            inputEl = me.cmp.inputEl,
            i, len, record,
            models = [],
            displayTplData = [],
            processedValue = [];

        if (me.store.loading) {
            // Called while the Store is loading. Ensure it is processed by the onLoad method.
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
                // if valueNotFoundText is defined, display it, otherwise display nothing for this value
                if (Ext.isDefined(valueNotFoundText)) {
                    displayTplData.push(valueNotFoundText);
                }
                processedValue.push(value[i]);
            }
        }

        // Set the value of this field. If we are multiselecting, then that is an array.
        me.value = me.multiSelect ? processedValue : processedValue[0];
        if (!Ext.isDefined(me.value)) {
            me.value = null;
        }
        me.displayTplData = displayTplData; //store for getDisplayValue method
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
    collapse: function () {
        if (this.isExpanded && !this.isDestroyed) {
            var me = this,
                openCls = me.openCls,
                picker = me.picker,
                doc = Ext.getDoc(),
                collapseIf = me.collapseIf,
                aboveSfx = '-above';

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
    syncSelection: function () {
        var me = this,
            ExtArray = Ext.Array,
            picker = me.picker,
            selection, selModel;
        if (picker) {
            // From the value, find the Models that are in the store's current data
            selection = [];
            ExtArray.forEach(me.valueModels || [], function (value) {
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
     * @private
     */
    findRecord: function (field, value) {
        var ds = this.store,
            idx = ds.findExact(field, value);
        return idx !== -1 ? ds.getAt(idx) : false;
    },
    findRecordByValue: function (value) {
        return this.findRecord(this.valueField, value);
    },
    findRecordByDisplay: function (value) {
        return this.findRecord(this.displayField, value);
    },
    /**
     * @private Generate the string value to be displayed in the text field for the currently stored value
     */
    getDisplayValue: function () {
        return this.displayTpl.apply(this.displayTplData);
    }
});