Ext.define('Application.view.item.DetailsPanel', {
      extend : 'Ext.panel.Panel',
      // Shorthand name for this object
      alias : 'widget.itemDetailsPanel',
      title : 'Details Panel',
      frame: true,
      // Layout configuration
      layout : {
        // Fully stretch this panel to
        // it's container size
        type : 'fit'
      },
      items : [{
            xtype : 'container',
            layout: 'hbox',
            // margin: '0 0 10',
            // Item id - used by Ext.getCmp() method for instance
            // selection
            id : 'item_details',
            // Html inside this component
            // html : 'This will be in south of center panel',
            // Since adding parameter "padding" to this item
            // doesn't work - we'll add some direct styles
            style : {
              padding : '10px'
            },
            items : [{
                  xtype : 'fieldset',
                  flex : 1,
                  title : 'Individual Checkboxes',
                  defaultType : 'checkbox', // each item will be a checkbox
                  layout : 'anchor',
                  defaults : {
                    anchor : '100%',
                    hideEmptyLabel : false
                  },
                  items : [{
                        xtype : 'textfield',
                        name : 'txt-test1',
                        fieldLabel : 'Alignment Test'
                      }, {
                        fieldLabel : 'Favorite Animals',
                        boxLabel : 'Dog',
                        name : 'fav-animal-dog',
                        inputValue : 'dog'
                      }, {
                        boxLabel : 'Cat',
                        name : 'fav-animal-cat',
                        inputValue : 'cat'
                      }, {
                        checked : true,
                        boxLabel : 'Monkey',
                        name : 'fav-animal-monkey',
                        inputValue : 'monkey'
                      }]
                }]
          }]
    });