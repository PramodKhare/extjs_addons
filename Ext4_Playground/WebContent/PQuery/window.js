Ext.require(['Ext.tip.*', 'Ext.Button', 'Ext.window.MessageBox', 'Ext.form.*', 'Ext.layout.container.Column', 'Ext.window.MessageBox', 'Ext.fx.target.Element', 'Ext.window.Window', 'Ext.tab.*', 'Ext.toolbar.Spacer', 'Ext.layout.container.Card', 'Ext.layout.container.Border']);

Ext.onReady(function() {
      Ext.QuickTips.init();
      Ext.create('Ext.Window', {
            title : 'Query Window',
            plain : true,
            height : 300,
            width : 400,
            minimizable : true,
            maximizable : true,
            maximized : true,
            autoScroll : true,
            renderTo : Ext.getBody(),
            layout : 'fit',
            items : [getQuerySearchTabPanel()]
          }).show();
    });
