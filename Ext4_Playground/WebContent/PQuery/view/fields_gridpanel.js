var getFieldGridPanel = function() {
  var fieldGridPanel = Ext.getCmp('fieldsGridPanelId');
  if (fieldGridPanel != null) {
    return fieldGridPanel;
  }
  fieldGridPanel = Ext.create('Ext.grid.Panel', {
        title : 'Fields List',
        tooltip : 'List of Fields with Ids',
        flex : 1,
        stripeRows : true,
        enableDragDrop : true,
        id : 'fieldsGridPanelId',
        autoExpandColumn : 'name',
        store : Ext.data.StoreManager.lookup('fieldsStore'),
        columns : [{
              text : 'ID',
              dataIndex : 'id',
              sortable : true
            }, {
              text : 'Name',
              dataIndex : 'name',
              sortable : true,
              flex : 1
            }],
        selModel : new Ext.selection.RowModel({
              singleSelect : true
            }),
        tools : [{
              type : 'refresh',
              tooltip : 'Reload Fields',
              scope : this,
              handler : function() {
                Ext.getCmp('fieldsGridPanelId').getStore().load();
              }
            }],
        viewConfig : {
          scrollOffset : 0,
          forceFit : true,
          plugins : {
            ddGroup : 'grid-to-query-form',
            ptype : 'gridviewdragdrop',
            enableDrop : false,
            enableDrag : true,
            copy : true
          }
        }
      });
  return fieldGridPanel;
}