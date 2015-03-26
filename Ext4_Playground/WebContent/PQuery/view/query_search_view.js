/**
 * Query Search Tab Panel view
 */

var getQuerySearchTabPanel = function() {
  var querySearchTabPanel = Ext.getCmp('querySearchTabPanelContainerId');
  if (querySearchTabPanel != null) {
    return querySearchTabPanel;
  }
  querySearchTabPanel = Ext.create('Ext.panel.Panel', {
        id : 'querySearchPanelContainerId',
        border : false,
        layout : {
          type : 'hbox',
          align : 'stretch'
        },
        autoScroll : true,
        border : false,
        items : [getFieldGridPanel(), {
              xtype : 'panel',
              header : false,
              border : false,
              id : 'vpanel-1',
              layout : {
                type : 'vbox',
                align : 'stretch'
              },
              flex : 5,
              items : [getSearchQueryEditFormPanel(), getQuerySearchHistoryGridPanel()]
            }]
      });

  return querySearchTabPanel;
}