/**
 * Query Search Tab Panel view
 */

var getQuerySearchTabPanel = function() {
  var querySearchTabPanel = Ext.getCmp('querySearchTabPanelContainerId');
  if (querySearchTabPanel != null) {
    return querySearchTabPanel;
  }
  querySearchTabPanel = Ext.create('Ext.tab.Panel', {
        xtype : 'tabpanel',
        activeTab : 0,
        id : 'querySearchTabPanelContainerId',
        border : false,
        items : [{
              title : 'Query Tab',
              tooltip : 'Query Patent Database',
              closable : false,
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
            }]
      });

  return querySearchTabPanel;
}