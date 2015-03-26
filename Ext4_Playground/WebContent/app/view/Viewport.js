Ext.define('Application.view.Viewport', {
      extend : 'Ext.container.Viewport',
      // Layout configuration
      layout : {
        // Items inside will be aligned in a horizotal line
        type : 'hbox',
        // Stretch elements to fit the page size
        align : 'stretch'
      },
      requires : ['Ext.form.*', 'Ext.layout.container.Column', 'Ext.window.MessageBox', 'Ext.fx.target.Element'],
      // Enable scrolling of this container once
      // parent element (browser in this case) has
      // been resized below minimal values
      autoScroll : true,
      minWidth : 960,
      // Items array - contains all views attached to the viewport, eg.
      // categories list
      items : [{
            xtype : 'itemList',
            flex : 1
          }, {
            xtype : 'panel',
            header : false,
            id : 'vpanel-1',
            layout : {
              type : 'vbox',
              align : 'stretch'
            },
            flex : 5,
            items : [{
                  xtype : 'itemShow',
                  flex : 1
                }, {
                  xtype : 'itemDetailsPanel',
                  flex : 1
                }]
          }]
    });